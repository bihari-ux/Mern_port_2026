import {
  Code2,
  Palette,
  Zap,
  Award,
  Download,
  MapPin,
  Coffee,
  Briefcase,
  GraduationCap,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Layers,
  Terminal,
  Globe as Github,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else setCount(start);
        }, 20);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ── Skill bar ─────────────────────────────────────────────────────────────────
function SkillBar({ name, level, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth(level), 200);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {name}
        </span>
        <span style={{ fontSize: 12, color: color, fontWeight: 700 }}>
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 4,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            width: `${width}%`,
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: `0 0 10px ${color}50`,
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState("skills");
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const stats = [
    { value: 3, suffix: "+", label: "Years Experience", icon: "🚀" },
    { value: 50, suffix: "+", label: "Projects Completed", icon: "💼" },
    { value: 20, suffix: "+", label: "Happy Clients", icon: "😊" },
    { value: 99, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
  ];

  const skillBars = [
    { name: "React / Next.js", level: 92, color: "#61dafb" },
    { name: "TypeScript", level: 85, color: "#3178c6" },
    { name: "Node.js / Express", level: 80, color: "#68a063" },
    { name: "Tailwind CSS", level: 95, color: "#FCD34D" },
    { name: "PostgreSQL / MongoDB", level: 75, color: "#f59e0b" },
    { name: "Docker / AWS", level: 65, color: "#ff9900" },
    { name: "UI / UX Design", level: 78, color: "#e879f9" },
    { name: "GraphQL", level: 68, color: "#e535ab" },
  ];

  const techStack = {
    Frontend: [
      { name: "React", icon: "⚛️", level: "Expert" },
      { name: "Next.js", icon: "▲", level: "Expert" },
      { name: "TypeScript", icon: "📘", level: "Advanced" },
      { name: "Tailwind CSS", icon: "🎨", level: "Expert" },
      { name: "Redux", icon: "🔄", level: "Advanced" },
      { name: "Framer Motion", icon: "✨", level: "Intermediate" },
    ],
    Backend: [
      { name: "Node.js", icon: "🟢", level: "Expert" },
      { name: "Express", icon: "⚡", level: "Expert" },
      { name: "NestJS", icon: "🐱", level: "Advanced" },
      { name: "PostgreSQL", icon: "🐘", level: "Advanced" },
      { name: "MongoDB", icon: "🍃", level: "Advanced" },
      { name: "GraphQL", icon: "🔗", level: "Intermediate" },
    ],
    DevOps: [
      { name: "Docker", icon: "🐳", level: "Advanced" },
      { name: "AWS", icon: "☁️", level: "Intermediate" },
      { name: "GitHub CI/CD", icon: "🔄", level: "Advanced" },
      { name: "Vercel", icon: "▲", level: "Expert" },
      { name: "Linux", icon: "🐧", level: "Advanced" },
      { name: "Nginx", icon: "🌐", level: "Intermediate" },
    ],
    Design: [
      { name: "Figma", icon: "🎭", level: "Advanced" },
      { name: "Framer", icon: "🖼️", level: "Intermediate" },
      { name: "Adobe XD", icon: "🎨", level: "Intermediate" },
      { name: "Photoshop", icon: "📷", level: "Intermediate" },
    ],
  };

  const experience = [
    {
      role: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      period: "2023 – Present",
      type: "Full-time",
      desc: "Leading frontend architecture for SaaS products. Built component library used by 10+ teams, improved load time by 40%.",
      tags: ["React", "TypeScript", "AWS"],
      color: "#FCD34D",
    },
    {
      role: "MERN Stack Developer",
      company: "Digital Agency XYZ",
      period: "2022 – 2023",
      type: "Full-time",
      desc: "Delivered 15+ client projects end-to-end from design to deployment. Specialized in e-commerce and dashboard builds.",
      tags: ["Next.js", "Node.js", "PostgreSQL"],
      color: "#FCD34D",
    },
    {
      role: "Frontend Developer",
      company: "StartupHub India",
      period: "2021 – 2022",
      type: "Contract",
      desc: "Built responsive React interfaces for 3 funded startups. Integrated REST APIs and improved UX across mobile & desktop.",
      tags: ["React", "Tailwind", "REST API"],
      color: "#FCD34D",
    },
    {
      role: "Web Developer Intern",
      company: "CodeNest Technologies",
      period: "2020 – 2021",
      type: "Internship",
      desc: "Learned full-stack fundamentals, contributed to live projects, and developed strong problem-solving skills.",
      tags: ["HTML/CSS", "JavaScript", "MySQL"],
      color: "#F59E0B",
    },
  ];

  const education = [
    {
      degree: "B.Tech Computer Science",
      school: "NIT Trichy",
      period: "2017 – 2021",
      grade: "8.4 CGPA",
      icon: "🎓",
      color: "#FCD34D",
    },
    {
      degree: "Full Stack Web Dev",
      school: "The Odin Project",
      period: "2021",
      grade: "Completed",
      icon: "💻",
      color: "#FCD34D",
    },
    {
      degree: "AWS Solutions Architect",
      school: "Amazon Web Services",
      period: "2022",
      grade: "Certified",
      icon: "☁️",
      color: "#F59E0B",
    },
  ];

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      desc: "Maintainable, scalable code following SOLID principles & best practices.",
      color: "#FCD34D",
    },
    {
      icon: Palette,
      title: "Modern Design",
      desc: "Pixel-perfect UIs with attention to micro-interactions and accessibility.",
      color: "#FCD34D",
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Lighthouse 95+ scores with optimized bundles, lazy loading & caching.",
      color: "#F59E0B",
    },
    {
      icon: Award,
      title: "Quality",
      desc: "TDD approach with 80%+ test coverage ensuring reliable, bug-free releases.",
      color: "#FCD34D",
    },
    {
      icon: Globe,
      title: "Responsive",
      desc: "Mobile-first designs that look stunning on every screen and device.",
      color: "#FCD34D",
    },
    {
      icon: Layers,
      title: "Scalable Arch",
      desc: "Microservices, monorepos, and component-driven development at scale.",
      color: "#e879f9",
    },
  ];

  const levelColor = {
    Expert: "#FCD34D",
    Advanced: "#FCD34D",
    Intermediate: "#FCD34D",
  };
  const tabs = ["skills", "experience", "education"];

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        background: "#060010",
        color: "white",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: "100px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* bg blobs */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(245, 158, 11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(245, 158, 11,0.12)",
              border: "1px solid rgba(245, 158, 11,0.25)",
              borderRadius: 100,
              padding: "5px 16px",
              marginBottom: 20,
              fontSize: 11,
              color: "#FCD34D",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ✦ Get to know me
          </div>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
          >
            About{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Me
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "1.05rem",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            A passionate MERN Stack Developer crafting practical digital
            experiences from India 🇮🇳
          </p>
        </div>

        {/* ── BIO + PHOTO ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 56,
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          {/* Photo side */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              {/* Outer glow ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: 28,
                  background:
                    "linear-gradient(135deg, #D97706, #F59E0B, #f97316)",
                  zIndex: 0,
                  animation: "spin 8s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -1,
                  borderRadius: 27,
                  background: "#060010",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: 300,
                  height: 360,
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid rgba(245, 158, 11,0.3)",
                  boxShadow: "0 32px 80px rgba(217, 119, 6,0.3)",
                }}
              >
                <img
                  src="/image/bihari_kumar_rawat1.jpeg"
                  alt="About me"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(6,0,16,0.7) 0%, transparent 50%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    background: "rgba(6,0,16,0.85)",
                    border: "1px solid rgba(245, 158, 11,0.3)",
                    borderRadius: 12,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <MapPin size={14} color="#FCD34D" />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    Based in India
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 11,
                      color: "#FCD34D",
                      fontWeight: 700,
                    }}
                  >
                    ● Open to MERN Roles
                  </span>
                </div>
              </div>

              {/* Floating coffee badge */}
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -20,
                  zIndex: 3,
                  background: "rgba(6,0,16,0.9)",
                  border: "1px solid rgba(251,146,60,0.4)",
                  borderRadius: 14,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  animation: "floatA 3.5s ease-in-out infinite",
                }}
              >
                <Coffee size={16} color="#fb923c" />
                <div>
                  <div
                    style={{ fontSize: 11, fontWeight: 800, color: "white" }}
                  >
                    Coffee Driven
                  </div>
                  <div
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}
                  >
                    Developer ☕
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio text side */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <h3
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Hi, I'm <span style={{ color: "#FCD34D" }}>Bihari Kumar Rawat</span> 👋
              </h3>
              <p
                style={{
                  color: "#FCD34D",
                  fontWeight: 600,
                  fontSize: "1rem",
                  margin: 0,
                }}
              >
                MERN Stack Developer
              </p>
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              I'm a passionate{" "}
              <strong style={{ color: "rgba(167,139,250,0.9)" }}>
                MERN Stack Developer
              </strong>{" "}
              with 1 year of experience building scalable web applications. I
              specialize in the React ecosystem and love turning complex
              problems into clean, elegant solutions.
            </p>

            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              My journey started with pure curiosity about how the web works.
              Today, I build everything from pixel-perfect frontends to robust
              REST APIs and deployed cloud infrastructure. I believe great
              software is equal parts{" "}
              <strong style={{ color: "rgba(244,114,182,0.9)" }}>
                engineering and design
              </strong>
              .
            </p>

            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "1 year professional MERN experience",
                "Built multiple real-world portfolio and app projects",
                "Open source contributor (200+ stars)",
                "AWS Certified Solutions Architect",
              ].map((item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <CheckCircle2
                    size={16}
                    color="#FCD34D"
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.65)",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Info chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { icon: MapPin, text: "India 🇮🇳" },
                { icon: Briefcase, text: "3+ Yrs Exp" },
                { icon: Coffee, text: "Open to Remote" },
                { icon: Terminal, text: "Full Stack" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Icon size={13} color="#FCD34D" />
                  {text}
                </div>
              ))}
            </div>

            <a
              href="/image/Bihari_kumar_rawat_2026.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                background: "linear-gradient(135deg, #D97706, #F59E0B)",
                color: "white",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: 50,
                boxShadow: "0 0 24px rgba(217, 119, 6,0.4)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(217, 119, 6,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(217, 119, 6,0.4)";
              }}
            >
              <Download size={15} /> Download Resume
            </a>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 2,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20,
            padding: 4,
            marginBottom: 80,
            overflow: "hidden",
          }}
        >
          {stats.map(({ value, suffix, label, icon }) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                padding: "28px 16px",
                borderRadius: 18,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(245, 158, 11,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div style={{ fontSize: "2rem", marginBottom: 6 }}>{icon}</div>
              <div
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <Counter target={value} suffix={suffix} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ── TABS: Skills / Experience / Education ── */}
        <div style={{ marginBottom: 80 }}>
          {/* Tab buttons */}
          <div
            style={{
              display: "flex",
              gap: 4,
              marginBottom: 36,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: 4,
              width: "fit-content",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 24px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "capitalize",
                  background:
                    activeTab === tab
                      ? "linear-gradient(135deg, #D97706, #F59E0B)"
                      : "transparent",
                  color: activeTab === tab ? "white" : "rgba(255,255,255,0.4)",
                  transition: "all 0.25s ease",
                  boxShadow:
                    activeTab === tab
                      ? "0 4px 16px rgba(217, 119, 6,0.35)"
                      : "none",
                }}
              >
                {tab === "skills"
                  ? "🛠 Skills"
                  : tab === "experience"
                    ? "💼 Experience"
                    : "🎓 Education"}
              </button>
            ))}
          </div>

          {/* SKILLS TAB */}
          {activeTab === "skills" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 40,
              }}
            >
              {/* Skill bars */}
              <div>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#FCD34D",
                    marginBottom: 24,
                    marginTop: 0,
                  }}
                >
                  Proficiency
                </h4>
                {skillBars.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>

              {/* Tech stack grid */}
              <div>
                {Object.entries(techStack).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom: 28 }}>
                    <h4
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.35)",
                        marginBottom: 12,
                        marginTop: 0,
                      }}
                    >
                      {cat}
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {items.map(({ name, icon, level }) => (
                        <div
                          key={name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 10,
                            padding: "7px 12px",
                            transition: "all 0.2s ease",
                            cursor: "default",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(245, 158, 11,0.12)";
                            e.currentTarget.style.borderColor =
                              "rgba(245, 158, 11,0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.08)";
                          }}
                        >
                          <span style={{ fontSize: 14 }}>{icon}</span>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.75)",
                            }}
                          >
                            {name}
                          </span>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: levelColor[level],
                              background: levelColor[level] + "20",
                              borderRadius: 4,
                              padding: "2px 6px",
                            }}
                          >
                            {level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <div style={{ position: "relative" }}>
              {/* Timeline line */}
              <div
                style={{
                  position: "absolute",
                  left: 20,
                  top: 24,
                  bottom: 24,
                  width: 2,
                  background:
                    "linear-gradient(to bottom, #D97706, #F59E0B, transparent)",
                  borderRadius: 2,
                }}
              />
              <div
                style={{ display: "flex", flexDirection: "column", gap: 28 }}
              >
                {experience.map((exp, i) => (
                  <div key={i} style={{ display: "flex", gap: 28 }}>
                    {/* Dot */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: `${exp.color}20`,
                        border: `2px solid ${exp.color}60`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 0 16px ${exp.color}30`,
                        zIndex: 1,
                      }}
                    >
                      <Briefcase size={16} color={exp.color} />
                    </div>

                    {/* Card */}
                    <div
                      style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${exp.color}25`,
                        borderRadius: 16,
                        padding: "20px 24px",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${exp.color}08`;
                        e.currentTarget.style.borderColor = `${exp.color}50`;
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.03)";
                        e.currentTarget.style.borderColor = `${exp.color}25`;
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: 12,
                          flexWrap: "wrap",
                          marginBottom: 8,
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              margin: "0 0 4px",
                              fontSize: "1rem",
                              fontWeight: 800,
                              color: "white",
                            }}
                          >
                            {exp.role}
                          </h4>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              color: exp.color,
                              fontWeight: 600,
                            }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div
                            style={{
                              fontSize: 12,
                              color: "rgba(255,255,255,0.4)",
                              fontWeight: 600,
                            }}
                          >
                            {exp.period}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: exp.color,
                              marginTop: 3,
                            }}
                          >
                            {exp.type}
                          </div>
                        </div>
                      </div>
                      <p
                        style={{
                          margin: "0 0 12px",
                          fontSize: 13,
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.7,
                        }}
                      >
                        {exp.desc}
                      </p>
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        {exp.tags.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: exp.color,
                              background: exp.color + "15",
                              border: `1px solid ${exp.color}30`,
                              borderRadius: 6,
                              padding: "3px 9px",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === "education" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 20,
              }}
            >
              {education.map((edu, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${edu.color}25`,
                    borderRadius: 20,
                    padding: "28px 24px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${edu.color}08`;
                    e.currentTarget.style.borderColor = `${edu.color}50`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = `${edu.color}25`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>
                    {edu.icon}
                  </div>
                  <h4
                    style={{
                      margin: "0 0 6px",
                      fontSize: "1rem",
                      fontWeight: 800,
                      color: "white",
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: 13,
                      color: edu.color,
                      fontWeight: 700,
                    }}
                  >
                    {edu.school}
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 6,
                        padding: "3px 9px",
                        fontWeight: 600,
                      }}
                    >
                      {edu.period}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: edu.color,
                        background: edu.color + "15",
                        border: `1px solid ${edu.color}30`,
                        borderRadius: 6,
                        padding: "3px 9px",
                        fontWeight: 700,
                      }}
                    >
                      {edu.grade}
                    </span>
                  </div>
                  {/* bg number */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -10,
                      right: 12,
                      fontSize: "5rem",
                      fontWeight: 900,
                      color: "rgba(255,255,255,0.03)",
                      fontFamily: "monospace",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FEATURE CARDS ── */}
        <div style={{ marginBottom: 0 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "0 0 10px",
              }}
            >
              What I <span style={{ color: "#FCD34D" }}>Bring</span> to the
              Table
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              Core values that drive every line of code I write
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  background:
                    hoveredFeature === i
                      ? `${color}08`
                      : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredFeature === i ? color + "40" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 20,
                  padding: "26px 24px",
                  transition: "all 0.3s ease",
                  transform:
                    hoveredFeature === i ? "translateY(-4px)" : "translateY(0)",
                  boxShadow:
                    hoveredFeature === i ? `0 16px 48px ${color}18` : "none",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    marginBottom: 18,
                    background: color + "18",
                    border: `1px solid ${color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={24} color={color} />
                </div>
                <h4
                  style={{
                    margin: "0 0 8px",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
                {/* corner accent */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: color + "10",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floatA {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
