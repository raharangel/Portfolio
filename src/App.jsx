import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Moon,
  MousePointer2,
  Phone,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const projects = [
  {
    slug: "travista",
    number: "01",
    title: "Travista",
    subtitle: "AI-powered travel planning platform",
    type: "Product design · 2025",
    description:
      "Turning the chaos of trip planning into one calm, intelligent journey.",
    color: "#9a7bff",
    accent: "#ddceff",
    preview: "travel",
    external: null,
    role: "Product Designer",
    duration: "6 weeks",
    tools: "Figma, Maze, FigJam",
    overview:
      "Travel planning is fragmented across tabs, tools, and conversations. Travista brings discovery, itinerary building, and smart budgeting into a single AI-powered workspace.",
    challenge:
      "Young travelers struggled to make confident choices while juggling inspiration, budgets, bookings, and group preferences across multiple platforms. The problem was not access to information. It was turning that information into a plan.",
    process: [
      ["Discover", "Interviewed travelers and mapped the moments where planning became overwhelming."],
      ["Define", "Synthesized insights into a focused problem statement and primary persona."],
      ["Ideate", "Used affinity mapping, SCAMPER, and an idea evaluation matrix to prioritize flows."],
      ["Validate", "Tested the core itinerary builder and refined hierarchy around budget signals."],
    ],
    outcome:
      "A focused travel companion that creates personalized itineraries, keeps budgets visible, and helps users move from inspiration to a bookable plan with less friction.",
    insight:
      "The strongest AI experiences do not ask users to surrender control. They make complex decisions easier to understand.",
  },
  {
    slug: "rishi-sphere",
    number: "02",
    title: "Rishi Sphere",
    subtitle: "One calendar for every campus event",
    type: "UX strategy · Frontend · 2025",
    description:
      "A clearer way for campus communities to discover what is happening next.",
    color: "#ff718e",
    accent: "#ffd0d9",
    preview: "calendar",
    external: "https://rishi-sphere.vercel.app/",
    role: "UI/UX Designer & Frontend Contributor",
    duration: "4 weeks",
    tools: "Figma, React, Tailwind",
    overview:
      "Rishi Sphere is a centralized event ecosystem designed for students, organizers, and campus administrators. It brings official announcements, club events, and registrations into one clear calendar.",
    challenge:
      "Campus opportunities were scattered across chat groups, posters, and informal networks. Students missed events, organizers struggled with reach, and admins lacked a reliable overview of campus activity.",
    process: [
      ["Research", "Mapped student discovery habits and the information organizers need to publish."],
      ["User flow", "Designed a path from browsing to event details and low-friction enrollment."],
      ["Wireframes", "Reduced the calendar interface to the decisions students make most often."],
      ["UI system", "Built a warm, accessible interface with clear status and event hierarchy."],
    ],
    outcome:
      "A responsive platform concept that makes campus events easier to find, understand, and manage while giving administrators a system-level view.",
    insight:
      "When information is time-sensitive, clarity beats cleverness. A good calendar interface should make the next useful action obvious.",
  },
  {
    slug: "playra",
    number: "03",
    title: "Playra",
    subtitle: "A playful Pokémon discovery experience",
    type: "Interaction design · Frontend · 2025",
    description:
      "Reframing a familiar universe through a crisp, collectible interface.",
    color: "#ffc54d",
    accent: "#fff0b9",
    preview: "pokemon",
    external: "https://playra-pokemon.vercel.app/",
    role: "UI/UX Designer & Frontend Contributor",
    duration: "3 weeks",
    tools: "Figma, React, REST API",
    overview:
      "Playra is an expressive Pokémon browsing concept built around discovery, collection, and quick visual comparison. It balances a playful tone with structured product thinking.",
    challenge:
      "The product needed to present a large content library without feeling dense. Browsing had to feel energetic, while search, filtering, and detail views stayed fast and intuitive.",
    process: [
      ["Explore", "Studied patterns from collectible apps and content-heavy discovery products."],
      ["Journey", "Created a browse-search-detail loop that rewards curiosity."],
      ["Visual language", "Used confident color, modular cards, and generous whitespace."],
      ["Implementation", "Translated the interface into responsive React components."],
    ],
    outcome:
      "A polished discovery experience with a distinctive visual personality, clear navigation, and a responsive card system.",
    insight:
      "Playful interfaces work best when the underlying interaction model stays disciplined.",
  },
  {
    slug: "portfolio-research",
    number: "04",
    title: "Portfolio research",
    subtitle: "Storytelling for digital designers",
    type: "Design research · 2025",
    description:
      "Exploring how structure, motion, and restraint shape a stronger portfolio.",
    color: "#66d9e8",
    accent: "#c2f8ff",
    preview: "portfolio",
    external: null,
    role: "Design Researcher",
    duration: "Ongoing",
    tools: "Figma, Framer, Notion",
    overview:
      "An ongoing study of modern portfolio patterns, project storytelling, responsive systems, and the small presentation choices that make digital work feel considered.",
    challenge:
      "A portfolio needs to communicate personality and rigor at the same time. The goal was to understand how designers establish trust quickly without creating visual noise.",
    process: [
      ["Audit", "Compared portfolio structures across product, brand, and frontend disciplines."],
      ["Patterns", "Documented how typography, rhythm, and motion shape first impressions."],
      ["Narrative", "Studied project storytelling from overview through outcome."],
      ["Apply", "Translated findings into a personal design language."],
    ],
    outcome:
      "A reusable framework for presenting work with clearer hierarchy, stronger project narratives, and more intentional motion.",
    insight:
      "Presentation quality is part of the design work. The interface should make the thinking easier to see.",
  },
];

const skills = {
  "UX craft": ["User research", "Empathy mapping", "User personas", "Wireframing", "Usability testing"],
  "Visual design": ["Design systems", "Typography", "Branding", "Color theory", "Interaction design"],
  Tools: ["Figma", "Photoshop", "Illustrator", "Adobe XD", "Canva"],
  Development: ["React", "Next.js", "TypeScript", "HTML & CSS", "GitHub"],
};

const process = [
  ["01", "Discover", "Listen closely before drawing conclusions."],
  ["02", "Define", "Turn signals into the right problem."],
  ["03", "Ideate", "Explore widely, then choose deliberately."],
  ["04", "Prototype", "Make ideas tangible enough to question."],
  ["05", "Test", "Learn from real interactions."],
  ["06", "Iterate", "Refine until the experience feels obvious."],
];

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("angel-theme") || "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("angel-theme", theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === "dark" ? "light" : "dark"))];
}

function App() {
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>{!ready && <Loader />}</AnimatePresence>
      <ScrollProgress />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

function Loader() {
  return (
    <motion.div
      className="loader"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="loader-mark"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <span>A</span>
        <motion.i
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        />
      </motion.div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function CustomCursor() {
  const [point, setPoint] = useState({ x: -50, y: -50 });

  useEffect(() => {
    const move = (event) => setPoint({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <motion.div className="cursor" animate={point} transition={{ type: "spring", damping: 24, stiffness: 500 }} />;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const links = ["About", "Work", "Process", "Contact"];

  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <Link className="logo" to="/">
          AR<span>.</span>
        </Link>
        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {links.map((item) => (
            <a key={item} href={`/#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="icon-button" aria-label="Toggle color theme" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="nav-cta" href="/#contact">
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Portfolio() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Work />
      <DesignProcess />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="hero-grid" />
      <div className="shell hero-inner">
        <motion.div initial="hidden" animate="show" variants={fade}>
          <p className="eyebrow"><span /> Product designer · Frontend thinker</p>
          <h1>Designing experiences<br /><em>people love.</em></h1>
          <p className="hero-copy">
            I&apos;m Angel Rahar, a UI/UX designer crafting intuitive digital
            products through research, visual clarity, and thoughtful code.
          </p>
          <div className="hero-buttons">
            <a className="button primary" href="#work">Explore my work <ArrowRight size={17} /></a>
            <a className="button secondary" href="#contact">Start a conversation</a>
          </div>
        </motion.div>
        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 1 }}
        >
          <div className="portrait-frame">
            <div className="portrait-noise" />
            <div className="portrait-monogram">A</div>
            <div className="portrait-caption"><span>Based in Gurugram</span><MapPin size={14} /></div>
          </div>
          <motion.div className="floating-card card-one" animate={{ y: [-8, 8, -8] }} transition={{ duration: 5, repeat: Infinity }}>
            <div className="mini-dots"><i /><i /><i /></div>
            <strong>Human-centered</strong>
            <small>Every pixel with a purpose</small>
          </motion.div>
          <motion.div className="floating-card card-two" animate={{ y: [8, -8, 8] }} transition={{ duration: 4.5, repeat: Infinity }}>
            <Sparkles size={17} />
            <div><strong>Available</strong><small>for collaborations</small></div>
          </motion.div>
        </motion.div>
        <a className="scroll-hint" href="#about"><MousePointer2 size={15} /> Scroll to explore <ChevronDown size={15} /></a>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, copy }) {
  return (
    <motion.div className="section-title" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fade}>
      <p className="eyebrow"><span /> {kicker}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section className="section shell about" id="about">
      <SectionTitle kicker="About me" title={<>Curiosity is my<br /><em>favorite tool.</em></>} />
      <motion.div className="about-grid" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
        <div className="about-copy">
          <p className="lead">I turn complex ideas into digital experiences that feel simple, useful, and distinctly human.</p>
          <p>I&apos;m a Computer Science undergraduate at Newton School of Technology with a passion for solving real-world problems through design. My approach brings together user research, design thinking, visual craft, and frontend development.</p>
          <p>I care about the details users notice and the systems they should never have to think about.</p>
          <div className="about-actions">
            <a href="mailto:angelrahar83@gmail.com">Let&apos;s work together <ArrowUpRight size={16} /></a>
            <a href="/angel-rahar-resume.html" download>Download résumé <Download size={15} /></a>
          </div>
        </div>
        <div className="about-stat-grid">
          <div><strong>03</strong><span>Shipped product concepts</span></div>
          <div><strong>02</strong><span>Disciplines: design + code</span></div>
          <div><strong>∞</strong><span>Questions worth asking</span></div>
          <div className="quote"><Sparkles size={17} /><span>Make it clear.<br />Then make it memorable.</span></div>
        </div>
      </motion.div>
      <div className="skills">
        {Object.entries(skills).map(([group, items], index) => (
          <motion.div
            key={group}
            className="skill-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <span>0{index + 1}</span><h3>{group}</h3>
            <div>{items.map((item) => <small key={item}>{item}</small>)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="work-section" id="work">
      <div className="shell section">
        <SectionTitle
          kicker="Selected work"
          title={<>A few things I&apos;ve<br /><em>designed with care.</em></>}
          copy="From product strategy to polished interface, each project began with a real question."
        />
        <div className="project-list">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
    >
      <Link className="project-preview" to={`/projects/${project.slug}`} style={{ "--project": project.color, "--project-soft": project.accent }}>
        <ProjectVisual type={project.preview} />
        <span className="project-number">{project.number}</span>
        <span className="view-project">View case study <ArrowUpRight size={15} /></span>
      </Link>
      <div className="project-info">
        <p>{project.type}</p>
        <Link to={`/projects/${project.slug}`}><h3>{project.title}</h3></Link>
        <h4>{project.subtitle}</h4>
        <span>{project.description}</span>
        <Link className="text-link" to={`/projects/${project.slug}`}>Read case study <ArrowRight size={16} /></Link>
      </div>
    </motion.article>
  );
}

function ProjectVisual({ type }) {
  if (type === "calendar") {
    return <div className="visual-device calendar-ui"><header><b>rishi<span>sphere</span></b><i /></header><div className="calendar-top"><small>April 2025</small><strong>Campus calendar</strong></div><div className="calendar-grid">{Array.from({ length: 21 }).map((_, i) => <i className={[4, 9, 13, 18].includes(i) ? "active" : ""} key={i}>{i + 1}</i>)}</div></div>;
  }
  if (type === "pokemon") {
    return <div className="pokemon-ui"><div className="poke-top"><b>Playra</b><Search size={14} /></div><strong>Choose your<br /><em>favorite.</em></strong><div className="poke-row"><i /><i /><i /></div><div className="poke-ball"><span /></div></div>;
  }
  if (type === "portfolio") {
    return <div className="portfolio-ui"><div className="folio-nav"><b>PORTFOLIO</b><i /></div><strong>Build with<br /><em>purpose.</em></strong><small>Digital design · creative development</small><div className="folio-lines"><i /><i /><i /></div></div>;
  }
  return <div className="travel-ui"><div className="travel-nav"><b>travista.</b><i /><i /></div><div className="travel-copy"><small>Your next escape</small><strong>Design your<br /><em>perfect journey.</em></strong></div><div className="travel-search"><Search size={13} /><span>Where do you want to go?</span></div><div className="travel-pills"><i /><i /><i /></div></div>;
}

function DesignProcess() {
  return (
    <section className="section shell" id="process">
      <SectionTitle kicker="My approach" title={<>Good design begins<br /><em>before the pixels.</em></>} />
      <div className="process-grid">
        {process.map(([number, title, text], index) => (
          <motion.div
            className="process-card"
            key={title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <span>{number}</span><h3>{title}</h3><p>{text}</p><i />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-section">
      <div className="section shell experience" id="experience">
        <SectionTitle kicker="Experience" title={<>Learning by making,<br /><em>every single day.</em></>} />
        <div className="timeline">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <div className="timeline-meta"><span>2025 — present</span><i /></div>
            <div className="timeline-copy">
              <h3>UI/UX Designer</h3>
              <h4>Personal projects & product design</h4>
              <p>Designing end-to-end experiences from research and early concepts through high-fidelity prototypes and frontend implementation.</p>
              <div className="highlight-list">
                {["User interviews & usability testing", "Wireframes & interactive prototypes", "Design systems & visual hierarchy", "Frontend collaboration & implementation"].map((item) => <span key={item}><CheckCircle2 size={15} />{item}</span>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section shell" id="contact">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
        <p className="eyebrow"><span /> Get in touch</p>
        <h2>Have an idea?<br /><em>Let&apos;s make it real.</em></h2>
        <p>I&apos;m always open to thoughtful conversations, ambitious projects, and opportunities to create something meaningful.</p>
        <a className="contact-mail" href="mailto:angelrahar83@gmail.com">angelrahar83@gmail.com <ArrowUpRight size={25} /></a>
        <div className="contact-links">
          <a href="tel:+918569846632"><Phone size={15} /> +91 85698 46632</a>
          <a href="https://linkedin.com/in/angel-rahar-231b48376" target="_blank" rel="noreferrer"><ExternalLink size={15} /> LinkedIn</a>
          <a href="mailto:angelrahar83@gmail.com"><Mail size={15} /> Email</a>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return <footer><div className="shell"><span>© 2026 Angel Rahar</span><span>Designed with curiosity · Built with care</span><a href="#top">Back to top ↑</a></div></footer>;
}

function CaseStudy() {
  const slug = window.location.pathname.split("/").pop();
  const project = projects.find((item) => item.slug === slug) || projects[0];

  return (
    <>
      <Navigation />
      <section className="case-hero" style={{ "--project": project.color, "--project-soft": project.accent }}>
        <div className="shell">
          <Link className="back-link" to="/#work"><ArrowLeft size={16} /> All projects</Link>
          <motion.div initial="hidden" animate="show" variants={fade}>
            <p className="eyebrow"><span /> {project.type}</p>
            <h1>{project.title}<em>.</em></h1>
            <p>{project.subtitle}</p>
          </motion.div>
          <div className="case-meta">
            <div><small>Role</small><strong>{project.role}</strong></div>
            <div><small>Timeline</small><strong>{project.duration}</strong></div>
            <div><small>Toolkit</small><strong>{project.tools}</strong></div>
            {project.external && <a href={project.external} target="_blank" rel="noreferrer">Visit live site <ExternalLink size={15} /></a>}
          </div>
        </div>
      </section>
      <section className="case-showcase shell" style={{ "--project": project.color, "--project-soft": project.accent }}>
        <ProjectVisual type={project.preview} />
      </section>
      <section className="case-content shell">
        <CaseBlock number="01" label="Overview" title="The opportunity" text={project.overview} />
        <CaseBlock number="02" label="Challenge" title="A problem worth solving" text={project.challenge} />
        <section className="case-process">
          <div><span>03</span><small>Design process</small><h2>From questions<br />to clarity.</h2></div>
          <div className="case-process-list">
            {project.process.map(([title, text], i) => <motion.article key={title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}><b>0{i + 1}</b><div><h3>{title}</h3><p>{text}</p></div></motion.article>)}
          </div>
        </section>
        <section className="outcome-card" style={{ "--project": project.color }}>
          <small>04 · Final outcome</small><h2>{project.outcome}</h2>
        </section>
        <section className="learning"><Sparkles size={22} /><small>Key learning</small><h2>{project.insight}</h2></section>
      </section>
      <NextProject current={project} />
      <Footer />
    </>
  );
}

function CaseBlock({ number, label, title, text }) {
  return <motion.section className="case-block" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}><div><span>{number}</span><small>{label}</small></div><div><h2>{title}</h2><p>{text}</p></div></motion.section>;
}

function NextProject({ current }) {
  const next = projects[(projects.indexOf(current) + 1) % projects.length];
  return <section className="next-project"><div className="shell"><small>Next case study</small><Link to={`/projects/${next.slug}`}><h2>{next.title}<em>.</em></h2><ArrowRight size={38} /></Link></div></section>;
}

export default App;
