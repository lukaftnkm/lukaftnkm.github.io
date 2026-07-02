// app.jsx — Nav + Hero + App composition.

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const progress = useScrollProgress();
  const links = [{
    id: 'projects',
    n: '01',
    label: 'projects'
  }, {
    id: 'awards',
    n: '02',
    label: 'awards'
  }, {
    id: 'about',
    n: '03',
    label: 'about'
  }, {
    id: 'education',
    n: '04',
    label: 'education'
  }, {
    id: 'certificates',
    n: '05',
    label: 'certs'
  }, {
    id: 'contact',
    n: '06',
    label: 'contact'
  }];
  const active = useActiveSection(['hero', ...links.map(l => l.id)]);
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-brand",
    href: "#hero"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "luka", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "."), "dev")), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    className: "nav-link",
    href: `#${l.id}`,
    "data-active": active === l.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, l.n), /*#__PURE__*/React.createElement("span", null, l.label)))), /*#__PURE__*/React.createElement("div", {
    className: "nav-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "live"
  }, "available"), /*#__PURE__*/React.createElement(LiveClock, null))), /*#__PURE__*/React.createElement("div", {
    className: "nav-progress",
    style: {
      width: `${progress * 100}%`
    }
  }));
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const rotating = ['Engineer.', 'Innovator.', 'Founder.', 'Speaker.'];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % rotating.length), 2200);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    id: "hero",
    "data-screen-label": "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-meta reveal in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "v2026"), /*#__PURE__*/React.createElement("span", null, "Electrical & Computer Engineer \xB7 CPO @ Sokolus")), /*#__PURE__*/React.createElement("h1", {
    className: "hero-name reveal in"
  }, "Luka \u0110", /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, ".")), /*#__PURE__*/React.createElement("div", {
    className: "reveal in",
    style: {
      minHeight: '1.5em',
      marginBottom: 18,
      fontSize: 'clamp(20px, 2.4vw, 30px)',
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-dim)'
    }
  }, '> '), /*#__PURE__*/React.createElement(Scramble, {
    text: rotating[idx],
    style: {
      color: 'var(--accent)'
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "hero-tag reveal in"
  }, "Master's student, ", /*#__PURE__*/React.createElement("strong", null, "award-winning innovator"), ", and co-founder building the future at the intersection of engineering and entrepreneurship."), /*#__PURE__*/React.createElement("div", {
    className: "hero-chips reveal in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "InnovNation '25 Winner"), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "Web Summit Qatar '26"), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "TripVice \xB7 BLDxp"), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, "MSc ECE \u2014 In Progress")), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta reveal in"
  }, /*#__PURE__*/React.createElement(Magnetic, {
    as: "a",
    className: "btn btn-primary",
    href: "#projects"
  }, /*#__PURE__*/React.createElement("span", null, "./explore_work"), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192")), /*#__PURE__*/React.createElement(Magnetic, {
    as: "a",
    className: "btn btn-ghost",
    href: "https://drive.google.com/file/d/1vByHZg0N65Y7Sa9Znm7YcFszSULQ6peN/view?usp=sharing",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", null, "my_cv.pdf"), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2197")), /*#__PURE__*/React.createElement(Magnetic, {
    as: "a",
    className: "btn btn-ghost",
    href: "#contact"
  }, /*#__PURE__*/React.createElement("span", null, "contact()"), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192")))), /*#__PURE__*/React.createElement("div", {
    className: "term reveal in",
    "data-delay": "2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "term-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-dot r"
  }), /*#__PURE__*/React.createElement("span", {
    className: "term-dot y"
  }), /*#__PURE__*/React.createElement("span", {
    className: "term-dot g"
  }), /*#__PURE__*/React.createElement("span", {
    className: "term-title"
  }, "luka@portfolio:~/2026")), /*#__PURE__*/React.createElement("div", {
    className: "term-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "$"), " ", /*#__PURE__*/React.createElement(Typewriter, {
    text: "whoami",
    speed: 60
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement(Typewriter, {
    text: "Luka \u0110elo\u0161evi\u0107",
    speed: 30,
    startDelay: 500
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "$"), " ", /*#__PURE__*/React.createElement(Typewriter, {
    text: "cat status.txt",
    speed: 45,
    startDelay: 1100
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement(Typewriter, {
    text: "MSc ECE @ FTN Pristina",
    speed: 20,
    startDelay: 1900
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement(Typewriter, {
    text: "Co-founder & CPO @ Sokolus",
    speed: 20,
    startDelay: 2400
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "$"), " ", /*#__PURE__*/React.createElement(Typewriter, {
    text: "cat achievements.log",
    speed: 45,
    startDelay: 3000
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement(Typewriter, {
    text: "\u2713 InnovNation 2025 \u2014 1st Place",
    speed: 18,
    startDelay: 3900
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement(Typewriter, {
    text: "\u2713 Web Summit Qatar 2026",
    speed: 18,
    startDelay: 4500
  })), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, "\xA0"), /*#__PURE__*/React.createElement("span", {
    className: "term-line"
  }, /*#__PURE__*/React.createElement(Typewriter, {
    text: "Building Sokolus v1...",
    speed: 22,
    startDelay: 5100,
    cursor: true
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      padding: '14px 0',
      fontSize: 11,
      color: 'var(--text-dimmer)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u25CF"), " ONLINE"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-dim)'
    }
  }, "SERBIA \xB7 GMT+1")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", null, "scroll", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u2193")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-dim)'
    }
  }, "007 \xB7 sections")))));
}

// ── Tweak defaults ────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c5ff36",
  "motion": "max",
  "scanlines": true,
  "grid": true,
  "font": "JetBrains Mono",
  "boot": true
} /*EDITMODE-END*/;
const FONT_STACKS = {
  'JetBrains Mono': "'JetBrains Mono', ui-monospace, monospace",
  'IBM Plex Mono': "'IBM Plex Mono', ui-monospace, monospace",
  'Geist Mono': "'Geist Mono', ui-monospace, monospace"
};

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [bootDone, setBootDone] = React.useState(() => {
    try {
      return !TWEAK_DEFAULTS.boot || sessionStorage.getItem('luka-booted') === '1';
    } catch {
      return false;
    }
  });
  const [konamiActive, setKonamiActive] = React.useState(false);

  // Tab title trick + pause all ambient loops when the tab is hidden.
  React.useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? 'come back... :(' : original;
      if (document.hidden) document.body.setAttribute('data-paused', '');else document.body.removeAttribute('data-paused');
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.title = original;
      document.body.removeAttribute('data-paused');
    };
  }, []);

  // Konami code
  const triggerKonami = React.useCallback(() => setKonamiActive(true), []);
  useKonami(triggerKonami);
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--mono', FONT_STACKS[t.font] || FONT_STACKS['JetBrains Mono']);
    document.body.setAttribute('data-motion', t.motion);
    const grid = document.getElementById('gridBg');
    if (grid) grid.style.display = t.grid ? '' : 'none';
    const scan = document.getElementById('scanlines');
    if (scan) scan.style.display = t.scanlines ? '' : 'none';
    try {
      localStorage.setItem('luka-tweaks', JSON.stringify({
        accent: t.accent,
        font: FONT_STACKS[t.font],
        motion: t.motion
      }));
    } catch {}
  }, [t.accent, t.font, t.motion, t.grid, t.scanlines]);
  const onBootDone = React.useCallback(() => {
    setBootDone(true);
    try {
      sessionStorage.setItem('luka-booted', '1');
    } catch {}
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !bootDone && /*#__PURE__*/React.createElement(BootSequence, {
    onDone: onBootDone
  }), konamiActive && /*#__PURE__*/React.createElement(KonamiEgg, {
    onDone: () => setKonamiActive(false)
  }), /*#__PURE__*/React.createElement(ConfettiCanvas, null), /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Sokolus, null), /*#__PURE__*/React.createElement(Awards, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Education, null), /*#__PURE__*/React.createElement(Certificates, null), /*#__PURE__*/React.createElement(Contact, null), /*#__PURE__*/React.createElement(Footer, null)), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Identity"
  }, /*#__PURE__*/React.createElement(TweakColor, {
    label: "Accent",
    value: t.accent,
    options: ['#c5ff36', '#ffb13b', '#ff3ec9', '#4ddff5'],
    onChange: v => setTweak('accent', v)
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Mono font",
    value: t.font,
    options: ['JetBrains Mono', 'IBM Plex Mono', 'Geist Mono'],
    onChange: v => setTweak('font', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Motion"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Intensity",
    value: t.motion,
    options: [{
      value: 'calm',
      label: 'Calm'
    }, {
      value: 'std',
      label: 'Standard'
    }, {
      value: 'max',
      label: 'Max'
    }],
    onChange: v => setTweak('motion', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Scanlines",
    value: t.scanlines,
    onChange: v => setTweak('scanlines', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Grid background",
    value: t.grid,
    onChange: v => setTweak('grid', v)
  })), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Session"
  }, /*#__PURE__*/React.createElement(TweakButton, {
    label: "Replay boot sequence",
    onClick: () => {
      try {
        sessionStorage.removeItem('luka-booted');
      } catch {}
      setBootDone(false);
    }
  }))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));