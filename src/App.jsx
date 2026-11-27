import { useEffect, useRef, useState } from "react";
import { studio, services, formats, materials, process, gallery, logs, GOOGLE_FORM } from "./data.js";

function Mark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <polygon points="20,2 36,11 20,20" fill="#d6ad60" />
      <polygon points="20,20 36,11 36,29" fill="#c89b3c" opacity=".45" />
      <polygon points="20,20 36,29 20,38" fill="#9e151b" opacity=".85" />
      <polygon points="4,11 20,2 20,20" fill="#fff" opacity=".95" />
      <polygon points="4,11 20,20 4,29" fill="#fff" opacity=".55" />
      <polygon points="4,29 20,20 20,38" fill="#cc1f26" opacity=".8" />
    </svg>
  );
}

function Reveal({ children, className = "", d = 0 }) {
  const r = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), o.disconnect()), { threshold: 0.12 });
    o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return <div ref={r} style={{ transitionDelay: `${d}ms` }} className={`rv ${on ? "in" : ""} ${className}`}>{children}</div>;
}

function Loader() {
  const [h, setH] = useState(() => sessionStorage.getItem("3ds-loader-seen") === "1");
  useEffect(() => {
    if (h) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("3ds-loader-seen", "1");
      setH(true);
    }, 2400);
    return () => clearTimeout(t);
  }, [h]);
  return (
    <div className={`loader ${h ? "hide" : ""}`} aria-hidden="true">
      <div className="printer-loader">
        <div className="printer-frame"><span className="printer-rail" /><span className="printer-head"><i /></span></div>
        <div className="printer-build">
          {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ "--layer": i }} />)}
        </div>
        <div className="printer-bed" />
      </div>
      <p className="printer-status">Preparing your build<span>...</span></p>
      <div className="lbar" />
    </div>
  );
}

function Progress() {
  const r = useRef(null);
  useEffect(() => {
    const f = () => { const h = document.documentElement; r.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`; };
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return <div className="progress" ref={r} />;
}

function Cursor() {
  const d = useRef(null), o = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    let x = -100, y = -100, rx = -100, ry = -100, id;
    const m = (e) => {
      x = e.clientX; y = e.clientY;
      d.current.style.transform = `translate(${x}px,${y}px)`;
      o.current.classList.toggle("big", !!e.target.closest("a,button,.card,.tile"));
    };
    const loop = () => { rx += (x - rx) * 0.15; ry += (y - ry) * 0.15; o.current.style.transform = `translate(${rx}px,${ry}px)`; id = requestAnimationFrame(loop); };
    window.addEventListener("mousemove", m); loop();
    return () => { window.removeEventListener("mousemove", m); cancelAnimationFrame(id); };
  }, []);
  return <><div className="cdot" ref={d} /><div className="cring" ref={o} /></>;
}

function Words({ text }) {
  return text.split(" ").map((w, i) => (
    <span key={i}><span className="w"><span style={{ animationDelay: `${1.6 + i * 0.09}s` }}>{w}</span></span>{" "}</span>
  ));
}

function Marquee() {
  const t = services.map((x) => x.t);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">{[...t, ...t].map((x, i) => <span key={i}>{x}<i>✦</i></span>)}</div>
    </div>
  );
}

function Tilt({ children, className = "" }) {
  const r = useRef(null);
  const mv = (e) => {
    const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height, st = r.current.style;
    st.setProperty("--rx", `${(0.5 - y) * 10}deg`); st.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    st.setProperty("--sx", `${x * 100}%`); st.setProperty("--sy", `${y * 100}%`);
  };
  const lv = () => { r.current.style.setProperty("--rx", "0deg"); r.current.style.setProperty("--ry", "0deg"); };
  return <div ref={r} className={`tilt ${className}`} onMouseMove={mv} onMouseLeave={lv}>{children}</div>;
}

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`nav ${s ? "solid" : ""}`}>
      <a href="#top" className="brand"><Mark /><span>{studio.name}</span></a>
      <nav>
        <a href="#services">Services</a><a href="#work">Work</a><a href="#logs">Logs</a><a href="#contact">Contact</a>
      </nav>
      <a href={GOOGLE_FORM.action} target="_blank" rel="noreferrer" className="btn small">Get a quote</a>
    </header>
  );
}

function PrintStack() {
  return (
    <div className="hero-printer" role="img" aria-label="A 3D printer crafting 3D'S STUDIO">
      <div className="hero-printer-frame">
        <span className="hero-printer-rail" />
        <span className="hero-printer-head"><i /></span>
      </div>

      <svg className="hero-letter-print" viewBox="0 0 500 220" aria-hidden="true">
        <g className="printed-layers">
          <text x="250" y="100" textAnchor="middle" className="print-layer print-shadow">3D'S</text>
          <text x="250" y="100" textAnchor="middle" className="print-layer print-layer-mid">3D'S</text>
          <text x="250" y="100" textAnchor="middle" className="print-layer print-face">3D'S</text>
          <text x="250" y="174" textAnchor="middle" className="print-studio print-studio-shadow">STUDIO</text>
          <text x="250" y="174" textAnchor="middle" className="print-studio print-studio-face">STUDIO</text>
        </g>
        <path className="print-trace trace-one" d="M78 100 H422" />
        <path className="print-trace trace-two" d="M142 174 H358" />
        <g className="print-nozzle">
          <circle cx="78" cy="100" r="7" />
          <circle cx="78" cy="100" r="15" />
        </g>
      </svg>

      <div className="hero-build-grid" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => <i key={i} />)}
      </div>
      <div className="hero-printer-bed" />
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const move = (e) => {
    const b = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - b.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - b.top}px`);
  };
  return (
    <section id="top" className="hero" ref={ref} onMouseMove={move}>
      <div className="glow" />
      <div className="hero-copy">
        <p className="steps">{studio.steps.map((s, i) => <span key={s}>{s}{i < 2 && <b> ✦ </b>}</span>)}</p>
        <h1><Words text="From a file on your screen to a part in your hand." /></h1>
        <p className="lead">CAD design, prototyping and 3D printing for gifts, miniatures, models, spare parts and small production runs.</p>
        <div className="cta"><a href={GOOGLE_FORM.action} target="_blank" rel="noreferrer" className="btn">Get a quote</a><a href="#work" className="btn ghost">See our work</a></div>
        <div className="chips"><em>Send files as</em>{formats.map((f) => <span key={f}>{f}</span>)}</div>
      </div>
      <div className="hero-art"><PrintStack /></div>
      <div className="cue" />
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="sec">
      <Reveal><h2>What we make</h2><p className="sub">Nine ways we can help, from a single prototype to a repeat batch.</p></Reveal>
      <div className="grid">
        {services.map((s, i) => (
          <Reveal key={s.t} className="cell" d={(i % 3) * 90}>
            <a href={`/service/${s.slug}`} className="service-link" aria-label={`View ${s.t}`}>
              <Tilt className="card">
                <div className="service-mark" aria-hidden="true"><Mark size={54} /></div>
                <h3>{s.t}</h3><p>{s.d}</p><span className="explore-link">Explore service →</span>
              </Tilt>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal className="mats"><em>Materials</em>{materials.map((m) => <span key={m}>{m}</span>)}</Reveal>
    </section>
  );
}

function Process() {
  return (
    <section className="sec flow">
      <Reveal><h2>How a job moves</h2></Reveal>
      <Reveal className="steps-row">
        {process.map((p, i) => (
          <Reveal key={p.t} className="step" d={300 + i * 350}><span className="dot">{i + 1}</span><h3>{p.t}</h3><p>{p.d}</p></Reveal>
        ))}
      </Reveal>
    </section>
  );
}

function Gallery() {
  return (
    <section id="work" className="sec">
      <Reveal><h2>Recent work</h2><p className="sub">Drop photos into <code>public/images</code> and set each <code>src</code> in <code>data.js</code>.</p></Reveal>
      <div className="gal">
        {gallery.map((g, i) => (
          <Reveal key={g.title} d={(i % 3) * 140} className={`tile t${i % 3}`}>
            {g.src ? <img src={g.src} alt={g.title} loading="lazy" /> : <div className="ph"><Mark size={46} /></div>}
            <div className="cap"><strong>{g.title}</strong><span>{g.tag}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Logs() {
  return (
    <section id="logs" className="sec">
      <Reveal><h2>Studio logs</h2><p className="sub">A running record of jobs, builds and design notes.</p></Reveal>
      <ol className="timeline">
        {logs.map((l, i) => (
          <Reveal key={i} d={i * 150} className="log">
            <time>{l.date}</time><h3>{l.title}</h3><p>{l.note}</p><span className="status">{l.status}</span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Query() {
  return (
    <section id="query" className="sec query">
      <Reveal className="quote-panel">
        <div>
          <p className="eyebrow">Start your project</p>
          <h2>Get a custom quote</h2>
          <p className="sub">Tell us what you want to create using our quick Google Form. You can share the details and required files directly.</p>
        </div>
        <a
          href={GOOGLE_FORM.action}
          target="_blank"
          rel="noreferrer"
          className="btn quote-button"
        >
          Click to get a quote <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="sec contact">
      <Reveal><h2>Contact</h2><p className="sub">{studio.owner}, {studio.name}</p></Reveal>
      <Reveal className="clist">
        <a href={`tel:${studio.tel}`}><small>Call or text</small>{studio.phone}</a>
        <a href={`mailto:${studio.email}`}><small>Email</small>{studio.email}</a>
        <a href={studio.youtube} target="_blank" rel="noreferrer"><small>YouTube</small>@3Ds_Design_Studio</a>
        <a href={studio.instagram} target="_blank" rel="noreferrer"><small>Instagram</small>{studio.instagramHandle}</a>
      </Reveal>
    </section>
  );
}

function ServiceDetail({ service }) {
  useEffect(() => { window.scrollTo(0, 0); }, [service]);
  return (
    <>
      <Nav />
      <main>
        <section className="service-hero">
          <div className="detail-art" aria-hidden="true">
            <div className="detail-orbit orbit-one" />
            <div className="detail-orbit orbit-two" />
            <Mark size={150} />
          </div>
          <div className="service-hero-shade" />
          <div className="service-hero-copy">
            <a href="/" className="back-link">← Back to services</a>
            <p className="eyebrow">3D’s Design Studio</p>
            <h1>{service.t}</h1>
            <p className="lead">{service.info}</p>
            <a href={GOOGLE_FORM.action} target="_blank" rel="noreferrer" className="btn">Get a quote for this service</a>
          </div>
        </section>
        <section className="sec service-details">
          <Reveal>
            <p className="eyebrow">Why choose this service</p>
            <h2>Designed around your goal</h2>
            <p className="sub">{service.d}</p>
          </Reveal>
          <div className="benefits">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit} d={i * 120} className="benefit">
                <span>{String(i + 1).padStart(2, "0")}</span><h3>{benefit}</h3>
              </Reveal>
            ))}
          </div>
          <Reveal className="detail-cta">
            <div><p className="eyebrow">Ready to begin?</p><h2>Bring your idea to life</h2></div>
            <a href={GOOGLE_FORM.action} target="_blank" rel="noreferrer" className="btn">Click to get a quote <span>→</span></a>
          </Reveal>
        </section>
      </main>
    </>
  );
}

export default function App() {
  const match = window.location.pathname.match(/^\/service\/([^/]+)\/?.*$/);
  if (match) {
    const service = services.find((item) => item.slug === match[1]);
    if (service) return <><Loader /><Progress /><Cursor /><ServiceDetail service={service} /></>;
  }

  return (
    <>
      <Loader /><Progress /><Cursor /><Nav /><main><Hero /><Marquee /><Services /><Process /><Gallery /><Logs /><Query /><Contact /></main>
      <footer><Mark size={22} /><span>© {new Date().getFullYear()} {studio.name}. {studio.steps.join(" ✦ ")}</span></footer>
    </>
  );
}