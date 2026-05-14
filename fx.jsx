// fx.jsx — motion + interaction primitives.

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

// Text scramble: cycles random chars then resolves to target.
function useScramble(target, { active = true, speed = 30, settle = 0.55 } = {}) {
  const [out, setOut] = React.useState(target);
  const rafRef = React.useRef(0);
  const frameRef = React.useRef(0);
  const queueRef = React.useRef([]);

  React.useEffect(() => {
    if (!active) { setOut(target); return; }
    const oldText = out;
    const length = Math.max(oldText.length, target.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = target[i] || '';
      const start = Math.floor(Math.random() * 8);
      const end = start + Math.floor(Math.random() * 16) + 4;
      queue.push({ from, to, start, end, char: '' });
    }
    queueRef.current = queue;
    frameRef.current = 0;

    const tick = () => {
      let complete = 0;
      let result = '';
      for (let i = 0; i < queueRef.current.length; i++) {
        const item = queueRef.current[i];
        if (frameRef.current >= item.end) {
          complete++;
          result += item.to;
        } else if (frameRef.current >= item.start) {
          if (!item.char || Math.random() < settle) {
            item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          result += item.char;
        } else {
          result += item.from;
        }
      }
      setOut(result);
      if (complete < queueRef.current.length) {
        frameRef.current++;
        rafRef.current = setTimeout(tick, 1000 / speed);
      }
    };
    tick();
    return () => clearTimeout(rafRef.current);
    // eslint-disable-next-line
  }, [target, active]);

  return out;
}

// Hover-scramble wrapper. Plays scramble once on mount, then re-plays on hover.
function Scramble({ text, as = 'span', once = false, ...rest }) {
  const Tag = as;
  const [trigger, setTrigger] = React.useState(0);
  const [target, setTarget] = React.useState(text);
  React.useEffect(() => { setTarget(text); }, [text]);
  const display = useScramble(target, { active: true, speed: 40 });
  const keyed = React.useMemo(() => display, [display, trigger]);
  const onEnter = () => { if (!once) setTrigger(t => t + 1); };
  return <Tag {...rest} onMouseEnter={onEnter}>{display}</Tag>;
}

// Typewriter — types `text` character by character, then optionally calls onDone.
function Typewriter({ text, speed = 28, startDelay = 0, cursor = false, onDone }) {
  const [out, setOut] = React.useState('');
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    let i = 0;
    let active = true;
    let tid;
    const start = setTimeout(() => {
      const step = () => {
        if (!active) return;
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          setDone(true);
          onDone && onDone();
          return;
        }
        tid = setTimeout(step, speed + Math.random() * speed * 0.5);
      };
      step();
    }, startDelay);
    return () => { active = false; clearTimeout(start); clearTimeout(tid); };
    // eslint-disable-next-line
  }, [text]);
  return (
    <>
      {out}
      {cursor && !done && <span className="term-cursor" />}
    </>
  );
}

// Reveal-on-scroll. Wraps children, applies .in class when intersecting.
function Reveal({ children, delay = 0, as = 'div', className = '', innerRef, ...rest }) {
  const ref = React.useRef(null);
  const setRef = React.useCallback((node) => {
    ref.current = node;
    if (typeof innerRef === 'function') innerRef(node);
    else if (innerRef) innerRef.current = node;
  }, [innerRef]);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={setRef}
         data-delay={delay || undefined}
         className={`reveal ${className}`.trim()}
         {...rest}>
      {children}
    </Tag>
  );
}

// Animated counter. Counts from 0 to target on intersect.
function Counter({ to, suffix = '', duration = 1400 }) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(el);
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(to * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// Boot sequence overlay. Once per session.
function BootSequence({ onDone }) {
  const lines = [
    { t: '$ ./init luka.dev', delay: 0 },
    { t: '> mounting [██████████] 100%', delay: 140, ok: true },
    { t: '> loading identity ......... ok', delay: 280, ok: true },
    { t: '> connecting to InnovNation ... ok', delay: 420, ok: true },
    { t: '> handshake @ Web Summit Qatar ... ok', delay: 560, ok: true },
    { t: '$ ready_', delay: 760 },
  ];
  const [shown, setShown] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [exit, setExit] = React.useState(false);

  React.useEffect(() => {
    const timers = lines.map((l, i) => setTimeout(() => setShown(i + 1), l.delay));
    const prog = setInterval(() => {
      setProgress((p) => Math.min(100, p + 6 + Math.random() * 10));
    }, 80);
    const finish = setTimeout(() => {
      setProgress(100);
      setExit(true);
      setTimeout(() => onDone(), 400);
    }, 1200);
    return () => { timers.forEach(clearTimeout); clearTimeout(finish); clearInterval(prog); };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`boot ${exit ? 'exit' : ''}`}>
      <div className="boot-inner">
        {lines.slice(0, shown).map((l, i) => (
          <span key={i} className="boot-line">
            <span className={l.ok ? 'ok' : 'label'}>{l.t}</span>
          </span>
        ))}
        <div className="boot-bar"><i style={{ width: `${progress}%` }} /></div>
      </div>
    </div>
  );
}

// Live clock — UTC HH:MM:SS.
function LiveClock() {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  const utc = `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())} UTC`;
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{utc}</span>;
}

// Active-section spy. Returns id of section currently in view.
function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const onScroll = () => {
      let best = ids[0];
      let bestDist = Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top - 120);
        if (r.top < window.innerHeight * 0.5 && dist < bestDist) {
          bestDist = dist; best = id;
        }
      }
      setActive(best);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join(',')]);
  return active;
}

// ── Pointer FX ────────────────────────────────────────────────────────────────
// Honors the Tweaks "Calm" motion level and OS reduced-motion preference.
function motionAllowed() {
  if (document.body.getAttribute('data-motion') === 'calm') return false;
  return !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

// Magnetic — element drifts toward the pointer, springs back on leave.
function useMagnetic(strength = 0.28) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      if (!motionAllowed()) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const onLeave = () => { cancelAnimationFrame(raf); el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}

// Card FX — 3D tilt toward the pointer + a spotlight glow that tracks it.
// Spotlight (--mx/--my) runs even in calm mode; only the tilt transform is gated.
function useCardFx(maxTilt = 7) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      if (!motionAllowed()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform =
          `perspective(900px) rotateX(${(0.5 - py) * maxTilt}deg) rotateY(${(px - 0.5) * maxTilt}deg)`;
      });
    };
    const onLeave = () => { cancelAnimationFrame(raf); el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxTilt]);
  return ref;
}

// Magnetic — drop-in wrapper that makes any element magnetic.
function Magnetic({ as = 'a', strength = 0.28, children, ...rest }) {
  const ref = useMagnetic(strength);
  const Tag = as;
  return <Tag ref={ref} {...rest}>{children}</Tag>;
}

Object.assign(window, { useScramble, Scramble, Typewriter, Reveal, Counter, BootSequence, LiveClock, useActiveSection, useMagnetic, useCardFx, Magnetic });
