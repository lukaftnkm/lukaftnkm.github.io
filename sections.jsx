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
              award-winning idea into a real product alongside two engineers. I believe
              engineering talent plus entrepreneurial thinking builds things that matter.
            </p>
          </Reveal>
          <Reveal className="term" delay={3}>
            <div className="term-head">
              <span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" />
              <span className="term-title">luka@portfolio:~</span>
            </div>
            <div className="term-body">
              <span className="term-line"><span className="prompt">$</span> whoami</span>
              <span className="term-line"><span className="out">Luka Đelošević</span></span>
              <span className="term-line"><span className="comment">&nbsp;</span></span>
              <span className="term-line"><span className="prompt">$</span> cat status.json</span>
              <span className="term-line"><span className="out">{'{'}</span></span>
              <span className="term-line">&nbsp;&nbsp;<span className="key">"role"</span>: <span className="ok">"MSc ECE @ FTN Pristina"</span>,</span>
              <span className="term-line">&nbsp;&nbsp;<span className="key">"working_on"</span>: <span className="ok">"Sokolus v1"</span>,</span>
              <span className="term-line">&nbsp;&nbsp;<span className="key">"based_in"</span>: <span className="ok">"Serbia 🇷🇸"</span>,</span>
              <span className="term-line">&nbsp;&nbsp;<span className="key">"open_to"</span>: <span className="ok">["full-time","collabs"]</span></span>
              <span className="term-line"><span className="out">{'}'}</span></span>
              <span className="term-line"><span className="comment">&nbsp;</span></span>
              <span className="term-line"><span className="prompt">$</span> tail -n 3 wins.log</span>
              <span className="term-line"><span className="ok">✓</span> <span className="out">InnovNation 2025 — 1st place</span></span>
              <span className="term-line"><span className="ok">✓</span> <span className="out">Web Summit Qatar 2026 — speaker</span></span>
              <span className="term-line"><span className="ok">✓</span> <span className="out">Sokolus v1 prototype shipped</span></span>
              <span className="term-line"><span className="prompt">$</span><span className="term-cursor" /></span>
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
  return (
    <section className="section" id="projects" data-screen-label="projects">
      <div className="container">
        <SectionHead num="02" label="// Projects" />
        <Reveal as="h2" className="section-title" delay={1}>
          Building things that <span className="accent">matter</span>.
        </Reveal>
        <div className="projects-grid">

          {/* ── Sokolus ── */}
          <Reveal className="project-card" delay={2}>
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
            <a className="btn btn-ghost" href="https://sokolus.rs" target="_blank" rel="noopener">
              <span>sokolus.rs</span>
              <span className="arrow">→</span>
            </a>
          </Reveal>

          {/* ── TripVice ── */}
          <Reveal className="project-card" delay={3}>
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
              + hotel combos, activities, eSIMs and more in one place. Built by <strong>BLDxp</strong>
              to radically speed up the process of planning any trip.
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
              <a className="btn btn-ghost" href="https://www.tripvice.net/" target="_blank" rel="noopener">
                <span>tripvice.net</span>
                <span className="arrow">→</span>
              </a>
              <a className="btn btn-ghost" href="https://bldxp.pages.dev/" target="_blank" rel="noopener">
                <span>bldxp.pages.dev</span>
                <span className="arrow">→</span>
              </a>
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
  return (
    <section className="section" id="awards" data-screen-label="awards">
      <div className="container">
        <SectionHead num="04" label="// Recognition" />
        <Reveal as="h2" className="section-title" delay={1}>
          Awards &amp; <span className="accent">languages</span>.
        </Reveal>

        <Reveal className="award-card" delay={2}>
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
                <a key={c.key} className="channel" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
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
