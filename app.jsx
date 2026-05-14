// app.jsx — Nav + Hero + App composition.

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const progress = useScrollProgress();
  const links = [
    { id: 'about', n: '01', label: 'about' },
    { id: 'projects', n: '02', label: 'projects' },
    { id: 'education', n: '03', label: 'education' },
    { id: 'awards', n: '04', label: 'awards' },
    { id: 'contact', n: '05', label: 'contact' },
  ];
  const active = useActiveSection(['hero', ...links.map((l) => l.id)]);
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#hero">
          <span className="dot" />
          <span>luka<span style={{ color: 'var(--accent)' }}>.</span>dev</span>
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.id} className="nav-link" href={`#${l.id}`} data-active={active === l.id}>
              <span className="num">{l.n}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </div>
        <div className="nav-meta">
          <span className="live">available</span>
          <LiveClock />
        </div>
      </div>
      <div className="nav-progress" style={{ width: `${progress * 100}%` }} />
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const rotating = ['Engineer.', 'Innovator.', 'Founder.', 'Speaker.'];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="hero" id="hero" data-screen-label="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-meta reveal in">
            <span className="badge">v2026</span>
            <span>Electrical &amp; Computer Engineer · CPO @ Sokolus</span>
          </div>
          <h1 className="hero-name reveal in">
            Luka Đ<span className="dot">.</span>
          </h1>
          <div className="reveal in" style={{ minHeight: '1.5em', marginBottom: 18, fontSize: 'clamp(20px, 2.4vw, 30px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
            <span style={{ color: 'var(--text-dim)' }}>{'> '}</span>
            <Scramble text={rotating[idx]} style={{ color: 'var(--accent)' }} />
          </div>
          <p className="hero-tag reveal in">
            Master's student, <strong>award-winning innovator</strong>, and co-founder
            building the future at the intersection of engineering and entrepreneurship.
          </p>
          <div className="hero-chips reveal in">
            <span className="chip">InnovNation '25 Winner</span>
            <span className="chip">Web Summit Qatar '26</span>
            <span className="chip">TripVice · BLDxp</span>
            <span className="chip">MSc ECE — In Progress</span>
          </div>
          <div className="hero-cta reveal in">
            <Magnetic as="a" className="btn btn-primary" href="#projects">
              <span>./explore_work</span>
              <span className="arrow">→</span>
            </Magnetic>
            <Magnetic as="a" className="btn btn-ghost" href="#contact">
              <span>contact()</span>
              <span className="arrow">→</span>
            </Magnetic>
          </div>
        </div>

        <div className="term reveal in" data-delay="2">
          <div className="term-head">
            <span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" />
            <span className="term-title">luka@portfolio:~/2026</span>
          </div>
          <div className="term-body">
            <span className="term-line">
              <span className="prompt">$</span> <Typewriter text="whoami" speed={60} />
            </span>
            <span className="term-line">
              <Typewriter text="Luka Đelošević" speed={30} startDelay={500} />
            </span>
            <span className="term-line">&nbsp;</span>
            <span className="term-line">
              <span className="prompt">$</span> <Typewriter text="cat status.txt" speed={45} startDelay={1100} />
            </span>
            <span className="term-line">
              <Typewriter text="MSc ECE @ FTN Pristina" speed={20} startDelay={1900} />
            </span>
            <span className="term-line">
              <Typewriter text="Co-founder & CPO @ Sokolus" speed={20} startDelay={2400} />
            </span>
            <span className="term-line">&nbsp;</span>
            <span className="term-line">
              <span className="prompt">$</span> <Typewriter text="cat achievements.log" speed={45} startDelay={3000} />
            </span>
            <span className="term-line">
              <Typewriter text="✓ InnovNation 2025 — 1st Place" speed={18} startDelay={3900} />
            </span>
            <span className="term-line">
              <Typewriter text="✓ Web Summit Qatar 2026" speed={18} startDelay={4500} />
            </span>
            <span className="term-line">&nbsp;</span>
            <span className="term-line">
              <Typewriter text="Building Sokolus v1..." speed={22} startDelay={5100} cursor={true} />
            </span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', padding: '14px 0', fontSize: 11, color: 'var(--text-dimmer)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span><span style={{ color: 'var(--accent)' }}>●</span> ONLINE</span>
            <span style={{ color: 'var(--text-dim)' }}>SERBIA · GMT+1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span>scroll<span style={{ color: 'var(--accent)' }}>↓</span></span>
            <span style={{ color: 'var(--text-dim)' }}>006 · sections</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Tweak defaults ────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c5ff36",
  "motion": "max",
  "scanlines": true,
  "grid": true,
  "font": "JetBrains Mono",
  "boot": true
}/*EDITMODE-END*/;

const FONT_STACKS = {
  'JetBrains Mono': "'JetBrains Mono', ui-monospace, monospace",
  'IBM Plex Mono': "'IBM Plex Mono', ui-monospace, monospace",
  'Geist Mono': "'Geist Mono', ui-monospace, monospace",
};

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [bootDone, setBootDone] = React.useState(() => {
    try { return !TWEAK_DEFAULTS.boot || sessionStorage.getItem('luka-booted') === '1'; }
    catch { return false; }
  });

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--mono', FONT_STACKS[t.font] || FONT_STACKS['JetBrains Mono']);
    document.body.setAttribute('data-motion', t.motion);
    const grid = document.getElementById('gridBg');
    if (grid) grid.style.display = t.grid ? '' : 'none';
    const scan = document.getElementById('scanlines');
    if (scan) scan.style.display = t.scanlines ? '' : 'none';
    try { localStorage.setItem('luka-tweaks', JSON.stringify({ accent: t.accent, font: FONT_STACKS[t.font], motion: t.motion })); } catch {}
  }, [t.accent, t.font, t.motion, t.grid, t.scanlines]);

  const onBootDone = React.useCallback(() => {
    setBootDone(true);
    try { sessionStorage.setItem('luka-booted', '1'); } catch {}
  }, []);

  return (
    <>
      {!bootDone && <BootSequence onDone={onBootDone} />}
      <div className="shell">
        <Nav />
        <Hero />
        <About />
        <Sokolus />
        <Education />
        <Awards />
        <Contact />
        <Footer />
      </div>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Identity">
          <TweakColor label="Accent" value={t.accent}
                      options={['#c5ff36', '#ffb13b', '#ff3ec9', '#4ddff5']}
                      onChange={(v) => setTweak('accent', v)} />
          <TweakSelect label="Mono font" value={t.font}
                       options={['JetBrains Mono', 'IBM Plex Mono', 'Geist Mono']}
                       onChange={(v) => setTweak('font', v)} />
        </TweakSection>
        <TweakSection label="Motion">
          <TweakRadio label="Intensity" value={t.motion}
                      options={[
                        { value: 'calm', label: 'Calm' },
                        { value: 'std', label: 'Standard' },
                        { value: 'max', label: 'Max' },
                      ]}
                      onChange={(v) => setTweak('motion', v)} />
          <TweakToggle label="Scanlines" value={t.scanlines}
                       onChange={(v) => setTweak('scanlines', v)} />
          <TweakToggle label="Grid background" value={t.grid}
                       onChange={(v) => setTweak('grid', v)} />
        </TweakSection>
        <TweakSection label="Session">
          <TweakButton label="Replay boot sequence" onClick={() => {
            try { sessionStorage.removeItem('luka-booted'); } catch {}
            setBootDone(false);
          }} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
