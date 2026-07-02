function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// sections.jsx — About, Sokolus, Education, Awards, Contact, Footer.

function SectionHead({
  num,
  label
}) {
  return /*#__PURE__*/React.createElement(Reveal, {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, num), /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    className: "line"
  }));
}

// ── Mini shell ────────────────────────────────────────────────────────────────
const SHELL_COMMANDS = {
  help: () => ['  whoami          who is Luka', '  about           background & mission', '  projects        Sokolus + TripVice', '  contact         get in touch', '  skills          tech stack', '  sudo hire-luka  (self-explanatory)', '  clear           reset terminal'],
  whoami: () => ['Luka Đelošević — MSc ECE, co-founder, innovator.'],
  about: () => ["Master's student @ FTN Pristina, Serbia.", 'Erasmus exchange @ Universidad de Vigo, Spain.', '1st place — InnovNation Serbia 2025.', 'Speaker @ Web Summit Qatar 2026.', 'Co-founder of Sokolus & BLDxp.'],
  projects: () => ['→ Sokolus    sokolus.rs', '  Award-winning platform (ikuDev, team of 3).', '→ TripVice   tripvice.net', '  Smart trip finder (BLDxp: Bogdan, Luka, Djordje).'],
  contact: () => ['email      djelosevicluka002@gmail.com', 'linkedin   luka-djelosevic', 'github     lukaftnkm'],
  skills: () => ['languages   Python · JavaScript · C · Java', 'web         React · HTML · CSS · Node.js', 'tools       Git · Linux · Figma'],
  'sudo hire-luka': () => ({
    slow: true,
    lines: ['[sudo] password for recruiter: ****', 'Verifying credentials ...', '✓ Authorization granted.', '✓ Luka added to your team.', '→  djelosevicluka002@gmail.com']
  })
};
function MiniShell() {
  const INIT = [{
    id: 0,
    type: 'cmd',
    text: 'whoami'
  }, {
    id: 1,
    type: 'out',
    text: 'Luka Đelošević'
  }, {
    id: 2,
    type: 'blank'
  }, {
    id: 3,
    type: 'cmd',
    text: 'ls projects/'
  }, {
    id: 4,
    type: 'out',
    text: 'sokolus/    tripvice/'
  }, {
    id: 5,
    type: 'blank'
  }, {
    id: 6,
    type: 'hint',
    text: '# try: help | projects | sudo hire-luka'
  }];
  const [lines, setLines] = React.useState(INIT);
  const [input, setInput] = React.useState('');
  const [history, setHistory] = React.useState([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const uid = React.useRef(INIT.length);
  const alive = React.useRef(true);
  React.useEffect(() => () => {
    alive.current = false;
  }, []);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines.length]);
  function nextId() {
    return uid.current++;
  }
  function run(raw) {
    const trimmed = raw.trim();
    const cmd = trimmed.toLowerCase();
    if (!trimmed) return;
    setInput('');
    setHistIdx(-1);
    setHistory(h => [trimmed, ...h].slice(0, 50));
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    const entry = [{
      id: nextId(),
      type: 'cmd',
      text: trimmed
    }];
    const handler = SHELL_COMMANDS[cmd];
    if (handler) {
      const result = handler();
      if (Array.isArray(result)) {
        result.forEach(t => entry.push({
          id: nextId(),
          type: 'out',
          text: t
        }));
        entry.push({
          id: nextId(),
          type: 'blank'
        });
        setLines(l => [...l, ...entry]);
      } else {
        setLines(l => [...l, ...entry]);
        result.lines.forEach((t, i) => {
          setTimeout(() => {
            if (!alive.current) return;
            const isLast = i === result.lines.length - 1;
            const type = t.startsWith('✓') ? 'ok' : 'out';
            setLines(l => [...l, {
              id: uid.current++,
              type,
              text: t
            }, ...(isLast ? [{
              id: uid.current++,
              type: 'blank'
            }] : [])]);
          }, 110 * (i + 1));
        });
      }
    } else {
      entry.push({
        id: nextId(),
        type: 'err',
        text: `bash: ${cmd}: command not found — try 'help'`
      });
      entry.push({
        id: nextId(),
        type: 'blank'
      });
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
      setInput(next === -1 ? '' : history[next] || '');
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => inputRef.current?.focus(),
    style: {
      cursor: 'text'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      maxHeight: 220,
      overflowY: 'auto',
      scrollbarWidth: 'none'
    }
  }, lines.map(l => /*#__PURE__*/React.createElement("span", {
    key: l.id,
    className: "term-line"
  }, l.type === 'cmd' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "$"), ' ', /*#__PURE__*/React.createElement("span", {
    className: "arg"
  }, l.text)), l.type === 'out' && /*#__PURE__*/React.createElement("span", {
    className: "out"
  }, l.text), l.type === 'ok' && /*#__PURE__*/React.createElement("span", {
    className: "ok"
  }, l.text), l.type === 'err' && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger)'
    }
  }, l.text), l.type === 'hint' && /*#__PURE__*/React.createElement("span", {
    className: "comment"
  }, l.text), l.type === 'blank' && ' '))), /*#__PURE__*/React.createElement("span", {
    className: "term-line",
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "prompt"
  }, "$"), ' ', /*#__PURE__*/React.createElement("span", {
    className: "arg"
  }, input), /*#__PURE__*/React.createElement("span", {
    className: "term-cursor",
    style: {
      opacity: focused ? undefined : 0.4
    }
  }), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: onKeyDown,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      position: 'absolute',
      opacity: 0,
      inset: 0,
      cursor: 'text',
      fontSize: 16
    },
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    "aria-label": "terminal input"
  })));
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "about",
    "data-screen-label": "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    num: "03",
    label: "// About"
  }), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "section-title",
    delay: 1
  }, "Engineering meets ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "entrepreneurship"), "."), /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "about-prose",
    delay: 2
  }, /*#__PURE__*/React.createElement("p", null, "I'm a ", /*#__PURE__*/React.createElement("strong", null, "Master's student in Electrical & Computer Engineering"), " at the Faculty of Technical Sciences, University of Pristina, with a focus on software development and modern web technologies."), /*#__PURE__*/React.createElement("p", null, "My path took me through an ", /*#__PURE__*/React.createElement("strong", null, "Erasmus year at Universidad de Vigo"), " in Spain, then to ", /*#__PURE__*/React.createElement("strong", null, "winning Serbia's national innovation competition"), ", and onto the global stage as a speaker at ", /*#__PURE__*/React.createElement("strong", null, "Web Summit Qatar 2026"), "."), /*#__PURE__*/React.createElement("p", null, "Today I'm a ", /*#__PURE__*/React.createElement("strong", null, "co-founder & CPO at Sokolus"), ", turning our award-winning idea into a real product alongside two engineers, and a", /*#__PURE__*/React.createElement("strong", null, " co-founder of BLDxp"), ", the team behind TripVice. I believe engineering talent plus entrepreneurial thinking builds things that matter.")), /*#__PURE__*/React.createElement(Reveal, {
    className: "term",
    delay: 3
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
  }, "luka@portfolio:~ \u2014 interactive")), /*#__PURE__*/React.createElement("div", {
    className: "term-body"
  }, /*#__PURE__*/React.createElement(MiniShell, null)))), /*#__PURE__*/React.createElement("div", {
    className: "stats"
  }, [{
    num: 1,
    suffix: 'st',
    label: 'National Innovation Competition'
  }, {
    num: 3,
    suffix: '',
    label: 'Countries Studied / Worked In'
  }, {
    num: 5,
    suffix: '+',
    label: 'Programming Languages'
  }, {
    num: 1,
    suffix: '',
    label: 'v1 Prototype Shipped'
  }].map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    className: "stat",
    delay: Math.min(i + 1, 4)
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, /*#__PURE__*/React.createElement(Counter, {
    to: s.num,
    suffix: s.suffix
  })), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, s.label))))));
}

// ── TripVice globe art ────────────────────────────────────────────────────────
function TripViceArt() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "136",
    height: "136",
    viewBox: "0 0 136 136",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "tvGlow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#c5ff36",
    stopOpacity: "0.18"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#c5ff36",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "68",
    cy: "68",
    r: "68",
    fill: "url(#tvGlow)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "68",
    cy: "68",
    rx: "54",
    ry: "54",
    stroke: "#c5ff36",
    strokeOpacity: "0.1",
    strokeWidth: "0.75",
    fill: "none"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "68",
    cy: "68",
    rx: "54",
    ry: "30",
    stroke: "#c5ff36",
    strokeOpacity: "0.08",
    strokeWidth: "0.75",
    fill: "none"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "68",
    cy: "68",
    rx: "54",
    ry: "11",
    stroke: "#c5ff36",
    strokeOpacity: "0.05",
    strokeWidth: "0.75",
    fill: "none"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "68",
    cy: "68",
    rx: "30",
    ry: "54",
    stroke: "#c5ff36",
    strokeOpacity: "0.07",
    strokeWidth: "0.75",
    fill: "none"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "68",
    y1: "14",
    x2: "68",
    y2: "122",
    stroke: "#c5ff36",
    strokeOpacity: "0.07",
    strokeWidth: "0.75"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "68",
    x2: "122",
    y2: "68",
    stroke: "#c5ff36",
    strokeOpacity: "0.07",
    strokeWidth: "0.75"
  }), /*#__PURE__*/React.createElement("path", {
    id: "tv-flight",
    d: "M 28 94 Q 68 22 112 68",
    stroke: "#c5ff36",
    strokeWidth: "1.5",
    strokeDasharray: "5 4",
    strokeOpacity: "0.65",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "28",
    cy: "94",
    r: "4.5",
    fill: "#c5ff36",
    fillOpacity: "0.9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "28",
    cy: "94",
    r: "4.5",
    fill: "none",
    stroke: "#c5ff36",
    strokeWidth: "1"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "r",
    values: "4.5;14",
    dur: "2.6s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    values: "0.7;0",
    dur: "2.6s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("text", {
    x: "28",
    y: "112",
    textAnchor: "middle",
    style: {
      fill: '#c5ff36',
      fontSize: '8px',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600
    }
  }, "BEG"), /*#__PURE__*/React.createElement("circle", {
    cx: "112",
    cy: "68",
    r: "4",
    fill: "#c5ff36",
    fillOpacity: "0.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "112",
    cy: "68",
    r: "4",
    fill: "none",
    stroke: "#c5ff36",
    strokeWidth: "1"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "r",
    values: "4;12",
    dur: "2.6s",
    begin: "1.3s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    values: "0.6;0",
    dur: "2.6s",
    begin: "1.3s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/React.createElement("text", {
    x: "112",
    y: "86",
    textAnchor: "middle",
    style: {
      fill: '#c5ff36',
      fontSize: '8px',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 600,
      opacity: 0.75
    }
  }, "DOH"), /*#__PURE__*/React.createElement("text", {
    textAnchor: "middle",
    dominantBaseline: "middle",
    style: {
      fill: '#c5ff36',
      fontSize: '13px'
    }
  }, "\u2708", /*#__PURE__*/React.createElement("animateMotion", {
    dur: "4s",
    repeatCount: "indefinite",
    rotate: "auto"
  }, /*#__PURE__*/React.createElement("mpath", {
    href: "#tv-flight"
  }))), /*#__PURE__*/React.createElement("text", {
    x: "69",
    y: "47",
    textAnchor: "middle",
    style: {
      fill: '#c5ff36',
      fontSize: '11px',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
      opacity: 0.9
    }
  }, "$189"));
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Sokolus() {
  const sokolusCard = useCardFx();
  const tripviceCard = useCardFx();
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "projects",
    "data-screen-label": "projects"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    num: "01",
    label: "// Projects"
  }), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "section-title",
    delay: 1
  }, "Building things that ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "matter"), "."), /*#__PURE__*/React.createElement("div", {
    className: "projects-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "project-card",
    delay: 2,
    innerRef: sokolusCard
  }, /*#__PURE__*/React.createElement("div", {
    className: "project-card-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sokolus-art project-art",
    style: {
      maxWidth: 160,
      width: 160,
      height: 160,
      margin: '0 auto 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sokolus-orbit"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sokolus-logo",
    style: {
      fontSize: 'clamp(36px,6vw,64px)'
    }
  }, "S", /*#__PURE__*/React.createElement("small", null, "by ikuDev"))), /*#__PURE__*/React.createElement("div", {
    className: "sokolus-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sokolus-status"
  }, "Building v1"), /*#__PURE__*/React.createElement("span", null, "\xB7 Team of 3 \xB7 ikuDev")), /*#__PURE__*/React.createElement("h3", {
    className: "project-name"
  }, "Sokolus.")), /*#__PURE__*/React.createElement("p", {
    className: "sokolus-desc"
  }, "Award-winning digital solution from ", /*#__PURE__*/React.createElement("strong", null, "ikuDev"), ". Took ", /*#__PURE__*/React.createElement("strong", null, "1st place at InnovNation Serbia 2025"), ", shipped a working prototype, and pitched to global investors at ", /*#__PURE__*/React.createElement("strong", null, "Web Summit Qatar 2026"), "."), /*#__PURE__*/React.createElement("div", {
    className: "sokolus-pillars"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pillar-icon"
  }, "01"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "National 1st Place"), /*#__PURE__*/React.createElement("p", null, "InnovNation Serbia 2025 \u2014 Student Teams Category."))), /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pillar-icon"
  }, "02"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Web Summit Qatar"), /*#__PURE__*/React.createElement("p", null, "Pitched to global investors and tech leaders, 2026."))), /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pillar-icon"
  }, "03"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Prototype v1 Complete"), /*#__PURE__*/React.createElement("p", null, "Working MVP built and demonstrated live.")))), /*#__PURE__*/React.createElement(Magnetic, {
    as: "a",
    className: "btn btn-ghost",
    href: "https://sokolus.rs",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", null, "sokolus.rs"), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192"))), /*#__PURE__*/React.createElement(Reveal, {
    className: "project-card",
    delay: 3,
    innerRef: tripviceCard
  }, /*#__PURE__*/React.createElement("div", {
    className: "project-card-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tripvice-art project-art",
    style: {
      margin: '0 auto 24px'
    }
  }, /*#__PURE__*/React.createElement(TripViceArt, null)), /*#__PURE__*/React.createElement("div", {
    className: "sokolus-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sokolus-status"
  }, "Live"), /*#__PURE__*/React.createElement("span", null, "\xB7 BLDxp \u2014 Bogdan, Luka, Djordje")), /*#__PURE__*/React.createElement("h3", {
    className: "project-name"
  }, "TripVice.")), /*#__PURE__*/React.createElement("p", {
    className: "sokolus-desc"
  }, "Smart trip finder for ", /*#__PURE__*/React.createElement("strong", null, "budget travelers"), " \u2014 finds the cheapest flight + hotel combos, activities, eSIMs and more in one place. Built by", ' ', /*#__PURE__*/React.createElement("strong", null, "BLDxp"), " to radically speed up the process of planning any trip."), /*#__PURE__*/React.createElement("div", {
    className: "sokolus-pillars"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pillar-icon"
  }, "01"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "All-in-One Search"), /*#__PURE__*/React.createElement("p", null, "Flights, hotels, activities, eSIMs \u2014 one flow."))), /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pillar-icon"
  }, "02"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Budget-First"), /*#__PURE__*/React.createElement("p", null, "Optimized for travelers who want the best price."))), /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pillar-icon"
  }, "03"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Live Product"), /*#__PURE__*/React.createElement("p", null, "tripvice.net \u2014 deployed and running.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Magnetic, {
    as: "a",
    className: "btn btn-ghost",
    href: "https://www.tripvice.net/",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", null, "tripvice.net"), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192")), /*#__PURE__*/React.createElement(Magnetic, {
    as: "a",
    className: "btn btn-ghost",
    href: "https://bldxp.pages.dev/",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", null, "bldxp.pages.dev"), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192")))))));
}

// ── Education ─────────────────────────────────────────────────────────────────
function Education() {
  const tlRef = React.useRef(null);
  React.useEffect(() => {
    const el = tlRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('drawn');
        io.disconnect();
      }
    }, {
      threshold: 0.1
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const items = [{
    year: '2025 — PRESENT',
    title: 'MSc Electrical & Computer Engineering',
    place: 'Faculty of Technical Sciences, University of Pristina',
    tag: 'Software Engineering · CS Focus',
    current: true
  }, {
    year: '2025',
    title: 'Erasmus Exchange — Universidad de Vigo',
    place: 'International project work across multicultural teams · Spain',
    tag: 'International Experience'
  }, {
    year: '2021 — 2025',
    title: 'BSc Electrical & Computer Engineering',
    place: 'Faculty of Technical Sciences, University of Pristina',
    tag: 'Module: CS & Informatics'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "education",
    "data-screen-label": "education"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    num: "04",
    label: "// Education"
  }), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "section-title",
    delay: 1
  }, "Academic ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "journey"), "."), /*#__PURE__*/React.createElement("div", {
    className: "timeline",
    ref: tlRef
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Reveal, {
    className: "tl-item",
    key: i,
    delay: Math.min(i + 1, 4),
    "data-current": it.current || undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-year"
  }, it.year), /*#__PURE__*/React.createElement("h3", {
    className: "tl-title"
  }, it.title), /*#__PURE__*/React.createElement("p", {
    className: "tl-place"
  }, it.place), /*#__PURE__*/React.createElement("span", {
    className: "tl-tag"
  }, it.tag))))));
}

// ── Awards ────────────────────────────────────────────────────────────────────
function Awards() {
  const awardCard = useCardFx(5);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "awards",
    "data-screen-label": "awards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    num: "02",
    label: "// Recognition"
  }), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "section-title",
    delay: 1
  }, "Awards & ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "languages"), "."), /*#__PURE__*/React.createElement(Reveal, {
    className: "award-card",
    delay: 2,
    innerRef: awardCard
  }, /*#__PURE__*/React.createElement("div", {
    className: "award-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "award-rank"
  }, "1", /*#__PURE__*/React.createElement("sup", null, "st")), /*#__PURE__*/React.createElement("div", {
    className: "award-body"
  }, /*#__PURE__*/React.createElement("h3", null, "InnovNation Competition Serbia 2025"), /*#__PURE__*/React.createElement("p", null, "Student Teams Category \u2014 national innovation competition. Project advanced to ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--accent)'
    }
  }, "Web Summit Qatar 2026"), " and pitched to global investors and industry leaders.")), /*#__PURE__*/React.createElement("div", {
    className: "award-meta"
  }, /*#__PURE__*/React.createElement("span", null, "WINNER"), /*#__PURE__*/React.createElement("b", null, "1st PLACE"), /*#__PURE__*/React.createElement("span", null, "NATIONAL \xB7 2025")))), /*#__PURE__*/React.createElement("div", {
    className: "langs"
  }, [{
    name: 'Serbian',
    level: 'Native',
    pct: 100
  }, {
    name: 'English',
    level: 'Fluent',
    pct: 92
  }, {
    name: 'Spanish',
    level: 'Basic',
    pct: 35
  }].map((l, i) => /*#__PURE__*/React.createElement(Reveal, {
    className: "lang",
    key: l.name,
    delay: Math.min(i + 1, 4)
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-name"
  }, l.name), /*#__PURE__*/React.createElement(AnimatedBar, {
    pct: l.pct
  }), /*#__PURE__*/React.createElement("div", {
    className: "lang-level"
  }, l.level))))));
}

// ── Certificates ──────────────────────────────────────────────────────────────
function CertCard({
  item,
  idx,
  pos
}) {
  const fx = useCardFx(6);
  const body = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cert-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cert-type"
  }, item.type), /*#__PURE__*/React.createElement("span", {
    className: "cert-idx"
  }, String(idx).padStart(2, '0'))), /*#__PURE__*/React.createElement("h4", {
    className: "cert-title"
  }, item.title), /*#__PURE__*/React.createElement("div", {
    className: "cert-foot"
  }, item.issuer && /*#__PURE__*/React.createElement("span", {
    className: "cert-issuer"
  }, item.issuer), item.date && /*#__PURE__*/React.createElement("span", {
    className: "cert-date"
  }, item.date), item.href && /*#__PURE__*/React.createElement("span", {
    className: "cert-link"
  }, item.cta || 'view certificate', " ", /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2197"))));
  const common = {
    className: 'cert-card',
    innerRef: fx,
    delay: Math.min(pos % 3 + 1, 4)
  };
  return item.href ? /*#__PURE__*/React.createElement(Reveal, _extends({
    as: "a",
    href: item.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, common), body) : /*#__PURE__*/React.createElement(Reveal, common, body);
}
function Certificates() {
  // To attach a certificate, fill in `href` (Drive/PDF/image link). Empty href
  // renders a plain card. `issuer` and `date` are optional and only show if set.
  const groups = [{
    tag: 'A',
    label: 'Certificates & Trainings',
    items: [{
      type: 'Training',
      title: 'Inclusive UX Design for Human–Machine Interaction in Industry 5.0: Robotics, AI, LLMs, and XR',
      issuer: 'EIT Higher Education Initiative',
      date: 'Oct–Dec 2025',
      href: 'certificates/eit-inclusive-ux-hmi.pdf'
    }, {
      type: 'Training',
      title: 'Setting Up Shared Entrepreneurial and Research Infrastructures and Test Beds',
      issuer: 'EIT Higher Education Initiative',
      date: 'Oct–Dec 2025',
      href: 'certificates/eit-shared-infrastructures.pdf'
    }, {
      type: 'Training',
      title: 'Entrepreneurial Transformation',
      issuer: 'EIT Higher Education Initiative',
      date: 'Oct–Dec 2025',
      href: 'certificates/eit-entrepreneurial-transformation.pdf'
    }, {
      type: 'Certificate',
      title: 'Programming Basics with JavaScript',
      issuer: 'SoftUni · 71% assessment',
      date: 'Apr 2024',
      href: 'certificates/softuni-js-basics.pdf'
    }, {
      type: 'Diploma',
      title: 'BSc — Electrical & Computer Engineering',
      issuer: 'University of Pristina · FTN · GPA 8.09',
      date: '2025',
      href: 'certificates/bsc-diploma.pdf',
      cta: 'view diploma'
    }]
  }, {
    tag: 'B',
    label: 'Programs & Participations',
    items: [{
      type: 'Program',
      title: 'InteRussia Program — AI in Medicine',
      issuer: 'Novosibirsk, Russia',
      date: '',
      href: ''
    }]
  }];
  let running = 0;
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "certificates",
    "data-screen-label": "certificates"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    num: "05",
    label: "// Certificates"
  }), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "section-title",
    delay: 1
  }, "Credentials & ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "programs"), "."), groups.map(g => /*#__PURE__*/React.createElement("div", {
    className: "cert-group",
    key: g.tag
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "cert-group-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gtag"
  }, g.tag), /*#__PURE__*/React.createElement("span", null, g.label), /*#__PURE__*/React.createElement("span", {
    className: "gline"
  }), /*#__PURE__*/React.createElement("span", {
    className: "gcount"
  }, String(g.items.length).padStart(2, '0'), " ", g.items.length === 1 ? 'item' : 'items')), /*#__PURE__*/React.createElement("div", {
    className: "cert-grid"
  }, g.items.map((item, i) => {
    running += 1;
    return /*#__PURE__*/React.createElement(CertCard, {
      key: running,
      item: item,
      idx: running,
      pos: i
    });
  }))))));
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const channels = [{
    key: 'email',
    val: 'djelosevicluka002@gmail.com',
    href: 'mailto:djelosevicluka002@gmail.com'
  }, {
    key: 'phone',
    val: '+381 65 861 0815',
    href: 'tel:+381658610815'
  }, {
    key: 'linkedin',
    val: 'luka-djelosevic',
    href: 'https://linkedin.com/in/luka-djelosevic'
  }, {
    key: 'github',
    val: 'lukaftnkm',
    href: 'https://github.com/lukaftnkm'
  }, {
    key: 'startup',
    val: 'sokolus.rs',
    href: 'https://sokolus.rs'
  }, {
    key: 'startup',
    val: 'bldxp.pages.dev',
    href: 'https://bldxp.pages.dev/'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "contact",
    "data-screen-label": "contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    num: "06",
    label: "// Contact"
  }), /*#__PURE__*/React.createElement(Reveal, {
    as: "h2",
    className: "section-title",
    delay: 1
  }, "Let's ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "connect"), "."), /*#__PURE__*/React.createElement("div", {
    className: "contact-grid"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 2
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--text-dim)',
      maxWidth: '46ch',
      margin: '0 0 20px'
    }
  }, "Open to ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, "full-time roles"), ", ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text)'
    }
  }, "research collaborations"), ", and conversations about Sokolus, engineering, and what comes next."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--text-dimmer)',
      margin: 0,
      fontFamily: 'var(--mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "// "), "Usually replies within 24h.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 3
  }, /*#__PURE__*/React.createElement("div", {
    className: "channels"
  }, channels.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.href,
    className: "channel",
    href: c.href,
    target: c.href.startsWith('http') ? '_blank' : undefined,
    rel: "noopener",
    onClick: e => window.fireConfetti && window.fireConfetti(e.clientX, e.clientY)
  }, /*#__PURE__*/React.createElement("span", {
    className: "channel-key"
  }, c.key), /*#__PURE__*/React.createElement("span", {
    className: "channel-val"
  }, c.val), /*#__PURE__*/React.createElement("span", {
    className: "channel-arrow"
  }, "\u2192"))))))));
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, "Designed & built by Luka \u0110elo\u0161evi\u0107")), /*#__PURE__*/React.createElement("div", null, "\xA9 2026 \xB7 luka.dev \xB7 ", /*#__PURE__*/React.createElement(LiveClock, null)));
}
Object.assign(window, {
  About,
  Sokolus,
  Education,
  Awards,
  Certificates,
  Contact,
  Footer
});