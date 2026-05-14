// sections.jsx — About, Sokolus, Education, Awards, Contact, Footer.

function SectionHead({ num, label }) {
  return (
    <Reveal className="section-head">
      <span className="num">{num}</span>
      <span>{label}</span>
      <span className="line" />
    </Reveal>
  );
}

// ── Mini shell ────────────────────────────────────────────────────────────────
const SHELL_COMMANDS = {
  help: () => [
    '  whoami          who is Luka',
    '  about           background & mission',
    '  projects        Sokolus + TripVice',
    '  contact         get in touch',
    '  skills          tech stack',
    '  sudo hire-luka  (self-explanatory)',
    '  clear           reset terminal',
  ],
  whoami: () => ['Luka Đelošević — MSc ECE, co-founder, innovator.'],
  about: () => [
    "Master's student @ FTN Pristina, Serbia.",
    'Erasmus exchange @ Universidad de Vigo, Spain.',
    '1st place — InnovNation Serbia 2025.',
    'Speaker @ Web Summit Qatar 2026.',
    'Co-founder of Sokolus & BLDxp.',
  ],
  projects: () => [
    '→ Sokolus    sokolus.rs',
    '  Award-winning platform (ikuDev, team of 3).',
    '→ TripVice   tripvice.net',
    '  Smart trip finder (BLDxp: Bogdan, Luka, Djordje).',
  ],
  contact: () => [
    'email      djelosevicluka002@gmail.com',
    'linkedin   luka-djelosevic',
    'github     lukaftnkm',
  ],
  skills: () => [
    'languages   Python · JavaScript · C · Java',
    'web         React · HTML · CSS · Node.js',
    'tools       Git · Linux · Figma',
  ],
  'sudo hire-luka': () => ({ slow: true, lines: [
    '[sudo] password for recruiter: ****',
    'Verifying credentials ...',
    '✓ Authorization granted.',
    '✓ Luka added to your team.',
    '→  djelosevicluka002@gmail.com',
  ]}),
};

function MiniShell() {
  const INIT = [
    { id: 0, type: 'cmd',  text: 'whoami' },
    { id: 1, type: 'out',  text: 'Luka Đelošević' },
    { id: 2, type: 'blank' },
    { id: 3, type: 'cmd',  text: 'ls projects/' },
    { id: 4, type: 'out',  text: 'sokolus/    tripvice/' },
    { id: 5, type: 'blank' },
    { id: 6, type: 'hint', text: '# try: help | projects | sudo hire-luka' },
  ];

  const [lines,   setLines]   = React.useState(INIT);
  const [input,   setInput]   = React.useState('');
  const [history, setHistory] = React.useState([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const [focused, setFocused] = React.useState(false);
  const inputRef  = React.useRef(null);
  const scrollRef = React.useRef(null);
  const uid       = React.useRef(INIT.length);
  const alive     = React.useRef(true);

  React.useEffect(() => () => { alive.current = false; }, []);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines.length]);

  function nextId() { return uid.current++; }

  function run(raw) {
    const trimmed = raw.trim();
    const cmd = trimmed.toLowerCase();
    if (!trimmed) return;

    setInput('');
    setHistIdx(-1);
    setHistory(h => [trimmed, ...h].slice(0, 50));

    if (cmd === 'clear') { setLines([]); return; }

    const entry = [{ id: nextId(), type: 'cmd', text: trimmed }];
    const handler = SHELL_COMMANDS[cmd];

    if (handler) {
      const result = handler();
      if (Array.isArray(result)) {
        result.forEach(t => entry.push({ id: nextId(), type: 'out', text: t }));
        entry.push({ id: nextId(), type: 'blank' });
        setLines(l => [...l, ...entry]);
      } else {
        setLines(l => [...l, ...entry]);
        result.lines.forEach((t, i) => {
          setTimeout(() => {
            if (!alive.current) return;
            const isLast = i === result.lines.length - 1;
            const type = t.startsWith('✓') ? 'ok' : 'out';
            setLines(l => [
              ...l,
              { id: uid.current++, type, text: t },
              ...(isLast ? [{ id: uid.current++, type: 'blank' }] : []),
            ]);
          }, 110 * (i + 1));
        });
      }
    } else {
      entry.push({ id: nextId(), type: 'err', text: `bash: ${cmd}: command not found — try 'help'` });
      entry.push({ id: nextId(), type: 'blank' });
      setLines(l => [...l, ...entry]);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      run(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      if (history[next] !== undefined) setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : (history[next] || ''));
    }
  }

  return (
    <div onClick={() => inputRef.current?.focus()} style={{ cursor: 'text' }}>
      <div ref={scrollRef} style={{ maxHeight: 220, overflowY: 'auto', scrollbarWidth: 'none' }}>
        {lines.map(l => (
          <span key={l.id} className="term-line">
            {l.type === 'cmd'   && <><span className="prompt">$</span>{' '}<span className="arg">{l.text}</span></>}
            {l.type === 'out'   && <span className="out">{l.text}</span>}
            {l.type === 'ok'    && <span className="ok">{l.text}</span>}
            {l.type === 'err'   && <span style={{ color: 'var(--danger)' }}>{l.text}</span>}
            {l.type === 'hint'  && <span className="comment">{l.text}</span>}
            {l.type === 'blank' && ' '}
          </span>
        ))}
      </div>
      <span className="term-line" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span className="prompt">$</span>{' '}
        <span className="arg">{input}</span>
        <span className="term-cursor" style={{ opacity: focused ? undefined : 0.4 }} />
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ position: 'absolute', opacity: 0, inset: 0, cursor: 'text' }}
          autoComplete="off" autoCorrect="off" spellCheck={false}
          aria-label="terminal input"
        />
      </span>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section" id="about" data-screen-label="about">
      <div className="container">
        <SectionHead num="01" label="// About" />
        <Reveal as="h2" className="section-title" delay={1}>
          Engineering meets <span className="accent">entrepreneurship</span>.
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-prose" delay={2}>
            <p>
              I'm a <strong>Master's student in Electrical &amp; Computer Engineering</strong> at
              the Faculty of Technical Sciences, University of Pristina, with a focus on
              software development and modern web technologies.
            </p>
            <p>
              My path took me through an <strong>Erasmus year at Universidad de Vigo</strong> in
              Spain, then to <strong>winning Serbia's national innovation competition</strong>,
              and onto the global stage as a speaker at <strong>Web Summit Qatar 2026</strong>.
            </p>
            <p>
              Today I'm a <strong>co-founder &amp; CPO at Sokolus</strong>, turning our
              award-winning idea into a real product alongside two engineers, and a
              <strong> co-founder of BLDxp</strong>, the team behind TripVice. I believe
              engineering talent plus entrepreneurial thinking builds things that matter.
            </p>
          </Reveal>
          <Reveal className="term" delay={3}>
            <div className="term-head">
              <span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" />
              <span className="term-title">luka@portfolio:~ — interactive</span>
            </div>
            <div className="term-body">
              <MiniShell />
            </div>
          </Reveal>
        </div>

        <div className="stats">
          {[
            { num: 1, suffix: 'st', label: 'National Innovation Competition' },
            { num: 3, suffix: '', label: 'Countries Studied / Worked In' },
            { num: 5, suffix: '+', label: 'Programming Languages' },
            { num: 1, suffix: ' v', label: 'Working Prototype Built' },
          ].map((s, i) => (
            <Reveal key={i} className="stat" delay={Math.min(i + 1, 4)}>
              <div className="stat-num"><Counter to={s.num} suffix={s.suffix} /></div>
              <div className="stat-lbl">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Sokolus() {
  const sokolusCard = useCardFx();
  const tripviceCard = useCardFx();
  return (
    <section className="section" id="projects" data-screen-label="projects">
      <div className="container">
        <SectionHead num="02" label="// Projects" />
        <Reveal as="h2" className="section-title" delay={1}>
          Building things that <span className="accent">matter</span>.
        </Reveal>
        <div className="projects-grid">

          {/* ── Sokolus ── */}
          <Reveal className="project-card" delay={2} innerRef={sokolusCard}>
            <div className="project-card-head">
              <div className="sokolus-art project-art" style={{ maxWidth: 160, width: 160, height: 160, margin: '0 auto 24px' }}>
                <div className="sokolus-orbit" />
                <div className="sokolus-logo" style={{ fontSize: 'clamp(36px,6vw,64px)' }}>
                  S<small>by ikuDev</small>
                </div>
              </div>
              <div className="sokolus-meta">
                <span className="sokolus-status">Building v1</span>
                <span>· Team of 3 · ikuDev</span>
              </div>
              <h3 className="project-name">Sokolus.</h3>
            </div>
            <p className="sokolus-desc">
              Award-winning digital solution from <strong>ikuDev</strong>. Took <strong>1st place at
              InnovNation Serbia 2025</strong>, shipped a working prototype, and pitched to global
              investors at <strong>Web Summit Qatar 2026</strong>.
            </p>
            <div className="sokolus-pillars">
              <div className="pillar">
                <span className="pillar-icon">01</span>
                <div>
                  <h4>National 1st Place</h4>
                  <p>InnovNation Serbia 2025 — Student Teams Category.</p>
                </div>
              </div>
              <div className="pillar">
                <span className="pillar-icon">02</span>
                <div>
                  <h4>Web Summit Qatar</h4>
                  <p>Pitched to global investors and tech leaders, 2026.</p>
                </div>
              </div>
              <div className="pillar">
                <span className="pillar-icon">03</span>
                <div>
                  <h4>Prototype v1 Complete</h4>
                  <p>Working MVP built and demonstrated live.</p>
                </div>
              </div>
            </div>
            <Magnetic as="a" className="btn btn-ghost" href="https://sokolus.rs" target="_blank" rel="noopener">
              <span>sokolus.rs</span>
              <span className="arrow">→</span>
            </Magnetic>
          </Reveal>

          {/* ── TripVice ── */}
          <Reveal className="project-card" delay={3} innerRef={tripviceCard}>
            <div className="project-card-head">
              <div className="tripvice-art project-art" style={{ margin: '0 auto 24px' }}>
                <div className="tripvice-logo">TV</div>
                <div className="tripvice-tagline">smart trip finder</div>
              </div>
              <div className="sokolus-meta">
                <span className="sokolus-status">Live</span>
                <span>· BLDxp — Bogdan, Luka, Djordje</span>
              </div>
              <h3 className="project-name">TripVice.</h3>
            </div>
            <p className="sokolus-desc">
              Smart trip finder for <strong>budget travelers</strong> — finds the cheapest flight
              + hotel combos, activities, eSIMs and more in one place. Built by{' '}
              <strong>BLDxp</strong> to radically speed up the process of planning any trip.
            </p>
            <div className="sokolus-pillars">
              <div className="pillar">
                <span className="pillar-icon">01</span>
                <div>
                  <h4>All-in-One Search</h4>
                  <p>Flights, hotels, activities, eSIMs — one flow.</p>
                </div>
              </div>
              <div className="pillar">
                <span className="pillar-icon">02</span>
                <div>
                  <h4>Budget-First</h4>
                  <p>Optimized for travelers who want the best price.</p>
                </div>
              </div>
              <div className="pillar">
                <span className="pillar-icon">03</span>
                <div>
                  <h4>Live Product</h4>
                  <p>tripvice.net — deployed and running.</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Magnetic as="a" className="btn btn-ghost" href="https://www.tripvice.net/" target="_blank" rel="noopener">
                <span>tripvice.net</span>
                <span className="arrow">→</span>
              </Magnetic>
              <Magnetic as="a" className="btn btn-ghost" href="https://bldxp.pages.dev/" target="_blank" rel="noopener">
                <span>bldxp.pages.dev</span>
                <span className="arrow">→</span>
              </Magnetic>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

// ── Education ─────────────────────────────────────────────────────────────────
function Education() {
  const items = [
    {
      year: '2025 — PRESENT',
      title: 'MSc Electrical & Computer Engineering',
      place: 'Faculty of Technical Sciences, University of Pristina',
      tag: 'Software Engineering · CS Focus',
      current: true,
    },
    {
      year: '2025',
      title: 'Erasmus Exchange — Universidad de Vigo',
      place: 'International project work across multicultural teams · Spain',
      tag: 'International Experience',
    },
    {
      year: '2021 — 2025',
      title: 'BSc Electrical & Computer Engineering',
      place: 'Faculty of Technical Sciences, University of Pristina',
      tag: 'Module: CS & Informatics',
    },
  ];
  return (
    <section className="section" id="education" data-screen-label="education">
      <div className="container">
        <SectionHead num="03" label="// Education" />
        <Reveal as="h2" className="section-title" delay={1}>
          Academic <span className="accent">journey</span>.
        </Reveal>
        <div className="timeline">
          {items.map((it, i) => (
            <Reveal className="tl-item" key={i} delay={Math.min(i + 1, 4)} data-current={it.current || undefined}>
              <div className="tl-year">{it.year}</div>
              <h3 className="tl-title">{it.title}</h3>
              <p className="tl-place">{it.place}</p>
              <span className="tl-tag">{it.tag}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Awards ────────────────────────────────────────────────────────────────────
function Awards() {
  const awardCard = useCardFx(5);
  return (
    <section className="section" id="awards" data-screen-label="awards">
      <div className="container">
        <SectionHead num="04" label="// Recognition" />
        <Reveal as="h2" className="section-title" delay={1}>
          Awards &amp; <span className="accent">languages</span>.
        </Reveal>

        <Reveal className="award-card" delay={2} innerRef={awardCard}>
          <div className="award-grid">
            <div className="award-rank">1<sup>st</sup></div>
            <div className="award-body">
              <h3>InnovNation Competition Serbia 2025</h3>
              <p>
                Student Teams Category — national innovation competition. Project
                advanced to <b style={{ color: 'var(--accent)' }}>Web Summit Qatar 2026</b> and pitched to global
                investors and industry leaders.
              </p>
            </div>
            <div className="award-meta">
              <span>WINNER</span>
              <b>1st PLACE</b>
              <span>NATIONAL · 2025</span>
            </div>
          </div>
        </Reveal>

        <div className="langs">
          {[
            { name: 'Serbian', level: 'Native', pct: 100 },
            { name: 'English', level: 'Fluent', pct: 92 },
            { name: 'Spanish', level: 'Basic', pct: 35 },
          ].map((l, i) => (
            <Reveal className="lang" key={l.name} delay={Math.min(i + 1, 4)}>
              <div className="lang-name">{l.name}</div>
              <div className="lang-bar"><i style={{ width: `${l.pct}%` }} /></div>
              <div className="lang-level">{l.level}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const channels = [
    { key: 'email', val: 'djelosevicluka002@gmail.com', href: 'mailto:djelosevicluka002@gmail.com' },
    { key: 'phone', val: '+381 65 861 0815', href: 'tel:+381658610815' },
    { key: 'linkedin', val: 'luka-djelosevic', href: 'https://linkedin.com/in/luka-djelosevic' },
    { key: 'github', val: 'lukaftnkm', href: 'https://github.com/lukaftnkm' },
    { key: 'startup', val: 'sokolus.rs', href: 'https://sokolus.rs' },
    { key: 'startup', val: 'bldxp.pages.dev', href: 'https://bldxp.pages.dev/' },
  ];
  return (
    <section className="section" id="contact" data-screen-label="contact">
      <div className="container">
        <SectionHead num="05" label="// Contact" />
        <Reveal as="h2" className="section-title" delay={1}>
          Let's <span className="accent">connect</span>.
        </Reveal>
        <div className="contact-grid">
          <Reveal delay={2}>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--text-dim)', maxWidth: '46ch', margin: '0 0 20px' }}>
              Open to <strong style={{ color: 'var(--text)' }}>full-time roles</strong>, <strong style={{ color: 'var(--text)' }}>research collaborations</strong>,
              and conversations about Sokolus, engineering, and what comes next.
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-dimmer)', margin: 0, fontFamily: 'var(--mono)' }}>
              <span style={{ color: 'var(--accent)' }}>// </span>
              Usually replies within 24h.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="channels">
              {channels.map((c) => (
                <a key={c.href} className="channel" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                  <span className="channel-key">{c.key}</span>
                  <span className="channel-val">{c.val}</span>
                  <span className="channel-arrow">→</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer container">
      <div className="left">
        <span className="dot" />
        <span>Designed &amp; built by Luka Đelošević</span>
      </div>
      <div>© 2026 · luka.dev · <LiveClock /></div>
    </footer>
  );
}

Object.assign(window, { About, Sokolus, Education, Awards, Contact, Footer });
