import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Globe as Github,
  AtSign as Linkedin,
  Bird as Twitter,
  Download,
  Sparkles,
  Code2,
  Palette,
  Zap,
  Award,
  Globe,
  Layers,
  Star,
  CheckCircle2,
  ExternalLink,
  Eye,
  ChevronRight,
  Terminal,
  Database,
  Cloud,
  Smartphone,
  GitBranch,
  Coffee,
  Rocket,
  Heart,
} from "lucide-react";
import ElectricBorder from "../components/ElectricBorder";

// ── Typewriter Hook ────────────────────────────────────────────────────────────
const ROLES = [
  "MERN Stack Developer",
  "React Specialist",
  "UI/UX Designer",
  "Problem Solver",
  "Open Source Contributor",
];
function useTypewriter() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  useEffect(() => {
    const cur = ROLES[roleIdx];
    let t;
    if (!deleting && charIdx <= cur.length) {
      t = setTimeout(() => {
        setText(cur.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 80);
    } else if (!deleting) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx >= 0) {
      t = setTimeout(() => {
        setText(cur.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, 40);
    } else {
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);
  return text;
}

// ── Counter ────────────────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const id = setInterval(() => {
          s += step;
          if (s >= target) {
            setCount(target);
            clearInterval(id);
          } else setCount(s);
        }, 20);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ── Electric Skill Card ───────────────────────────────────────────────────────
function FlipSkillCard({ icon, title, level, desc, techs, color, backColor }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <ElectricBorder
      color={color}
      speed={1}
      chaos={0.1}
      thickness={2}
      borderRadius={24}
      style={{ borderRadius: 24 }}
    >
      <div
        style={{
          perspective: "1200px",
          width: "100%",
          minHeight: 278,
          cursor: "pointer",
        }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: 278,
            transformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              borderRadius: 24,
              padding: 24,
              background: `linear-gradient(160deg, rgba(10,20,30,0.94), rgba(14,36,50,0.92), ${backColor}12)`,
              border: `1px solid ${color}30`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              backdropFilter: "blur(18px)",
              boxShadow: `0 18px 45px ${color}12`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 18,
                  background: `linear-gradient(145deg, ${color}28, rgba(255,255,255,0.08))`,
                  border: `1px solid ${color}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 12px 28px ${color}18`,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: color,
                  fontWeight: 800,
                  background: `${color}14`,
                  border: `1px solid ${color}28`,
                  borderRadius: 999,
                  padding: "7px 12px",
                  whiteSpace: "nowrap",
                }}
              >
                {level}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "1.06rem",
                  fontWeight: 900,
                  color: "white",
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.62)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>

            <div style={{ marginTop: "auto", color: color, fontSize: 11, fontWeight: 700 }}>
              Hover to explore →
            </div>

            <div
              style={{
                position: "absolute",
                right: -20,
                bottom: -24,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `${color}15`,
                filter: "blur(8px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 20,
                width: 70,
                height: 1,
                background: `linear-gradient(90deg, ${color}, transparent)`,
                opacity: 0.75,
                pointerEvents: "none",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: 24,
              padding: 24,
              background: `linear-gradient(160deg, rgba(8,16,26,0.97), ${backColor}18, rgba(9,26,34,0.95))`,
              border: `1px solid ${color}36`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 16,
              backdropFilter: "blur(18px)",
              boxShadow: `0 18px 45px ${color}12`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.66)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {techs.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10.5,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.92)",
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${color}28`,
                    borderRadius: 999,
                    padding: "6px 10px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
}

// ── Project Flip Card ──────────────────────────────────────────────────────────
function ProjectFlipCard({
  title,
  desc,
  image,
  tech,
  demo,
  github,
  tag,
  color,
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{ perspective: "1100px", height: 340, cursor: "pointer" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 20,
            overflow: "hidden",
            background: "linear-gradient(145deg, #0f0030, #1a0040)",
            border: "1px solid rgba(245, 158, 11,0.2)",
          }}
        >
          <div
            style={{ height: 200, position: "relative", overflow: "hidden" }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 40%, #0f0030 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: `${color}30`,
                border: `1px solid ${color}60`,
                borderRadius: 8,
                padding: "3px 10px",
                fontSize: 10,
                fontWeight: 800,
                color,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {tag}
            </div>
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(0,0,0,0.5)",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 10,
                color: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(8px)",
              }}
            >
              Hover →
            </div>
          </div>
          <div style={{ padding: "14px 18px" }}>
            <h4
              style={{
                margin: "0 0 6px",
                fontSize: "1rem",
                fontWeight: 800,
                color: "white",
              }}
            >
              {title}
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#FCD34D",
                    background: "rgba(252, 211, 77,0.12)",
                    border: "1px solid rgba(252, 211, 77,0.2)",
                    borderRadius: 5,
                    padding: "2px 7px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 20,
            background: "linear-gradient(135deg, #1a0040, #2d0060, #1a0030)",
            border: `1px solid ${color}40`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 26,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: color,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            {tag}
          </div>
          <h4
            style={{
              margin: "0 0 10px",
              fontSize: "1.2rem",
              fontWeight: 900,
              color: "white",
            }}
          >
            {title}
          </h4>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
            }}
          >
            {desc}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              marginBottom: 18,
            }}
          >
            {tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color,
                  background: `${color}15`,
                  border: `1px solid ${color}25`,
                  borderRadius: 5,
                  padding: "2px 7px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "linear-gradient(135deg, #D97706, #F59E0B)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "9px",
                  borderRadius: 10,
                }}
              >
                <Eye size={13} /> Demo
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "9px",
                  borderRadius: 10,
                }}
              >
                <Github size={13} /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({ name, role, company, avatar, text, rating }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(245, 158, 11,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? "rgba(245, 158, 11,0.35)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20,
        padding: "24px 22px",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? "0 16px 48px rgba(217, 119, 6,0.15)" : "none",
      }}
    >
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
        ))}
      </div>
      <p
        style={{
          margin: "0 0 18px",
          fontSize: 13.5,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.75,
          fontStyle: "italic",
        }}
      >
        "{text}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D97706, #F59E0B)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          {avatar}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "white" }}>
            {name}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
            {role} @ {company}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  delay = 0,
  mounted,
}) {
  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: 56,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(245, 158, 11,0.12)",
          border: "1px solid rgba(245, 158, 11,0.25)",
          borderRadius: 100,
          padding: "5px 16px",
          marginBottom: 18,
          fontSize: 11,
          color: "#FCD34D",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {badge}
      </div>
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          margin: "0 0 14px",
        }}
      >
        {title}{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {highlight}
        </span>
      </h2>
      {subtitle && (
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "1rem",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── MAIN HOME ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const role = useTypewriter();
  const canvasRef = useRef(null);
  const techTicker = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "GraphQL",
    "Tailwind",
    "Prisma",
    "Redis",
    "Figma",
    "GitHub Actions",
    "Vercel",
  ];

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y,
            d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245, 158, 11,${0.07 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const skillTabs = {
    Frontend: [
      {
        icon: <span style={{ fontSize: 22 }}>⚛️</span>,
        title: "React / Next.js",
        level: "Expert",
        desc: "5+ years building SPAs, SSR apps, custom hooks, context, and complex state management.",
        techs: ["React 18", "Next.js 14", "Zustand", "React Query", "Vite"],
        color: "#61dafb",
        backColor: "#61dafb",
      },
      {
        icon: <span style={{ fontSize: 22 }}>📘</span>,
        title: "TypeScript",
        level: "Advanced",
        desc: "Type-safe development with generics, utility types, strict mode, and declaration merging.",
        techs: ["Generics", "Decorators", "Type Guards", "Utility Types"],
        color: "#3178c6",
        backColor: "#3178c6",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🎨</span>,
        title: "CSS / Tailwind",
        level: "Expert",
        desc: "Pixel-perfect responsive layouts, animations, design systems, and CSS custom properties.",
        techs: ["Tailwind CSS", "CSS Modules", "Framer Motion", "GSAP", "Sass"],
        color: "#FCD34D",
        backColor: "#FCD34D",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🔄</span>,
        title: "State Management",
        level: "Advanced",
        desc: "Complex app state with Redux, Zustand, Jotai, React Query, and optimistic updates.",
        techs: ["Redux Toolkit", "Zustand", "Jotai", "SWR", "React Query"],
        color: "#764abc",
        backColor: "#764abc",
      },
      {
        icon: <span style={{ fontSize: 22 }}>✨</span>,
        title: "Animations",
        level: "Intermediate",
        desc: "Smooth, performant animations using CSS, Framer Motion, and GSAP for web magic.",
        techs: ["Framer Motion", "GSAP", "CSS Animations", "Lottie"],
        color: "#ff6b9d",
        backColor: "#ff6b9d",
      },
      {
        icon: <span style={{ fontSize: 22 }}>📦</span>,
        title: "Build Tools",
        level: "Advanced",
        desc: "Modern build pipelines with Vite, Webpack, Turbopack, and CI/CD automation.",
        techs: ["Vite", "Webpack 5", "ESBuild", "Turbopack", "Rollup"],
        color: "#F59E0B",
        backColor: "#F59E0B",
      },
      {
        icon: <span style={{ fontSize: 22 }}>♿</span>,
        title: "Accessibility",
        level: "Advanced",
        desc: "Semantic UI, keyboard navigation, contrast tuning, and inclusive interactions built from the start.",
        techs: ["WCAG", "ARIA", "Semantic HTML", "Keyboard UX", "Screen Readers"],
        color: "#22c55e",
        backColor: "#22c55e",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🧪</span>,
        title: "Frontend Testing",
        level: "Advanced",
        desc: "Reliable interfaces with unit, integration, and end-to-end coverage across critical user flows.",
        techs: ["Vitest", "Jest", "RTL", "Playwright", "Cypress"],
        color: "#fb7185",
        backColor: "#fb7185",
      },
    ],
    Backend: [
      {
        icon: <span style={{ fontSize: 22 }}>🟢</span>,
        title: "Node.js / Express",
        level: "Expert",
        desc: "RESTful APIs, middleware, authentication, rate limiting, and WebSocket servers.",
        techs: ["Express", "Fastify", "JWT", "Passport.js", "Socket.io"],
        color: "#68a063",
        backColor: "#68a063",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🐱</span>,
        title: "NestJS",
        level: "Advanced",
        desc: "Enterprise-grade backend with decorators, dependency injection, guards, and interceptors.",
        techs: ["NestJS", "TypeORM", "GraphQL", "Swagger", "Microservices"],
        color: "#e0234e",
        backColor: "#e0234e",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🐘</span>,
        title: "PostgreSQL",
        level: "Advanced",
        desc: "Complex queries, indexing, transactions, stored procedures, and performance tuning.",
        techs: ["PostgreSQL", "Prisma", "TypeORM", "Sequelize", "pgAdmin"],
        color: "#336791",
        backColor: "#336791",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🍃</span>,
        title: "MongoDB",
        level: "Advanced",
        desc: "Schema design, aggregation pipelines, indexing strategies, and Atlas cloud deployments.",
        techs: ["MongoDB", "Mongoose", "Atlas", "Aggregation", "Redis"],
        color: "#47a248",
        backColor: "#47a248",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🔗</span>,
        title: "GraphQL",
        level: "Intermediate",
        desc: "Schema-first API design with resolvers, subscriptions, dataloaders, and federation.",
        techs: ["Apollo Server", "type-graphql", "Hasura", "Subscriptions"],
        color: "#e535ab",
        backColor: "#e535ab",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🔐</span>,
        title: "Auth & Security",
        level: "Advanced",
        desc: "OAuth2, JWT, session management, RBAC, CORS, rate limiting, and security best practices.",
        techs: ["OAuth2", "JWT", "bcrypt", "Helmet", "Auth0", "Firebase Auth"],
        color: "#f59e0b",
        backColor: "#f59e0b",
      },
    ],
    DevOps: [
      {
        icon: <span style={{ fontSize: 22 }}>🐳</span>,
        title: "Docker",
        level: "Advanced",
        desc: "Containerization, multi-stage builds, Docker Compose for full dev environments.",
        techs: ["Docker", "Docker Compose", "Multi-stage", "Docker Hub"],
        color: "#2496ed",
        backColor: "#2496ed",
      },
      {
        icon: <span style={{ fontSize: 22 }}>☁️</span>,
        title: "AWS",
        level: "Intermediate",
        desc: "EC2, S3, Lambda, RDS, CloudFront, and IAM for scalable cloud infrastructure.",
        techs: ["EC2", "S3", "Lambda", "RDS", "CloudFront", "IAM"],
        color: "#ff9900",
        backColor: "#ff9900",
      },
      {
        icon: <span style={{ fontSize: 22 }}>▲</span>,
        title: "Vercel / Netlify",
        level: "Expert",
        desc: "Zero-config deployments, edge functions, preview environments, and CI/CD pipelines.",
        techs: ["Vercel", "Netlify", "Edge Functions", "Preview Deploy"],
        color: "#e2e8f0",
        backColor: "#e2e8f0",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🔄</span>,
        title: "CI/CD",
        level: "Advanced",
        desc: "Automated testing, deployment pipelines, GitHub Actions, and quality gates.",
        techs: ["GitHub Actions", "Jenkins", "CircleCI", "GitLab CI"],
        color: "#FCD34D",
        backColor: "#FCD34D",
      },
    ],
    Design: [
      {
        icon: <span style={{ fontSize: 22 }}>🎭</span>,
        title: "Figma",
        level: "Advanced",
        desc: "Component libraries, auto-layout, variants, prototyping, and design handoff.",
        techs: [
          "Components",
          "Auto-layout",
          "Variants",
          "Prototyping",
          "Dev Mode",
        ],
        color: "#a259ff",
        backColor: "#a259ff",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🖼️</span>,
        title: "UI/UX Design",
        level: "Advanced",
        desc: "User research, wireframing, usability testing, and accessibility-first design.",
        techs: ["Wireframing", "A/B Testing", "WCAG 2.1", "User Research"],
        color: "#FCD34D",
        backColor: "#FCD34D",
      },
      {
        icon: <span style={{ fontSize: 22 }}>🌈</span>,
        title: "Design Systems",
        level: "Intermediate",
        desc: "Scalable component libraries, token-based theming, and Storybook documentation.",
        techs: ["Storybook", "Tokens", "Component Library", "Style Guide"],
        color: "#fb923c",
        backColor: "#fb923c",
      },
    ],
  };

  const projects = [
    {
      title: "AI SaaS Platform",
      desc: "Full-featured AI tool with streaming, credits system, multi-model support, billing, and admin dashboard.",
      image:
        "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "OpenAI", "Stripe", "PostgreSQL", "TypeScript"],
      demo: "#",
      github: "#",
      tag: "AI / SaaS",
      color: "#FCD34D",
    },
    {
      title: "E-Commerce Store",
      desc: "End-to-end storefront with cart, checkout, Stripe payments, admin panel, inventory & order management.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Prisma", "Stripe", "Tailwind", "AWS S3"],
      demo: "#",
      github: "#",
      tag: "E-Commerce",
      color: "#FCD34D",
    },
    {
      title: "Analytics Dashboard",
      desc: "Real-time data visualization with interactive charts, custom filters, CSV export, and multi-tenant support.",
      image:
        "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "D3.js", "FastAPI", "Redis", "PostgreSQL"],
      demo: "#",
      github: "#",
      tag: "Dashboard",
      color: "#FCD34D",
    },
    {
      title: "Social Media App",
      desc: "Instagram-style app with real-time feeds, stories, DMs, image uploads, likes, comments, and explore page.",
      image:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React Native", "Firebase", "Expo", "Redux", "Socket.io"],
      demo: "#",
      github: "#",
      tag: "Mobile App",
      color: "#F59E0B",
    },
    {
      title: "DevOps Pipeline Tool",
      desc: "Visual CI/CD pipeline builder with drag-and-drop stages, GitHub webhooks, deploy logs, and rollback.",
      image:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "Docker", "GitHub API", "WebSockets"],
      demo: "#",
      github: "#",
      tag: "DevOps",
      color: "#FCD34D",
    },
    {
      title: "Real-Estate Platform",
      desc: "Property listing site with map search, virtual tours, mortgage calculator, and agent contact system.",
      image:
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Mapbox", "Node.js", "MongoDB", "Cloudinary"],
      demo: "#",
      github: "#",
      tag: "Web App",
      color: "#e879f9",
    },
    {
      title: "Job Portal Platform",
      desc: "A modern hiring platform with recruiter dashboards, candidate profiles, advanced search filters, and application tracking.",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      demo: "#",
      github: "#",
      tag: "Career Tech",
      color: "#F59E0B",
    },
    {
      title: "Learning Management System",
      desc: "An online LMS with course modules, video lessons, quizzes, progress tracking, and secure student authentication.",
      image:
        "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "MongoDB", "Express", "Tailwind", "Cloudinary"],
      demo: "#",
      github: "#",
      tag: "EdTech",
      color: "#D97706",
    },
  ];

  const testimonials = [
    {
      name: "Arjun Mehta",
      role: "CTO",
      company: "TechFlow India",
      avatar: "👨‍💼",
      text: "Bihari delivered clean frontend work with strong attention to structure, responsiveness, and practical implementation. Great experience working together.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Product Manager",
      company: "Startup UK",
      avatar: "👩‍💼",
      text: "She understood our vision immediately and translated it into a beautiful, fast UI. Communication was flawless and she always delivered ahead of schedule.",
      rating: 5,
    },
    {
      name: "Ahmed Al-Hassan",
      role: "Founder",
      company: "DigitalEdge UAE",
      avatar: "👨‍💻",
      text: "Best developer I've worked with. Built our complete e-commerce platform from scratch — the checkout flow she designed increased conversions by 35%.",
      rating: 5,
    },
    {
      name: "Priya Nair",
      role: "Lead Designer",
      company: "PixelCraft",
      avatar: "👩‍🎨",
      text: "Finally a developer who actually cares about design details! Every pixel was right, every animation was smooth. Our Figma files translated perfectly.",
      rating: 5,
    },
  ];

  const stats = [
    { value: 3, suffix: "+", label: "Years Exp.", icon: "🚀" },
    { value: 50, suffix: "+", label: "Projects", icon: "💼" },
    { value: 20, suffix: "+", label: "Clients", icon: "🌍" },
    { value: 99, suffix: "%", label: "Satisfaction", icon: "⭐" },
  ];

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      desc: "SOLID principles, DRY, 80%+ test coverage",
      color: "#FCD34D",
    },
    {
      icon: Palette,
      title: "Pixel Perfect",
      desc: "Figma-to-code with zero compromise",
      color: "#FCD34D",
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Lighthouse 95+, Core Web Vitals optimized",
      color: "#F59E0B",
    },
    {
      icon: Globe,
      title: "Responsive",
      desc: "Mobile-first, all screen sizes supported",
      color: "#FCD34D",
    },
    {
      icon: Award,
      title: "Quality First",
      desc: "Tested, documented, production-ready",
      color: "#FCD34D",
    },
    {
      icon: Layers,
      title: "Scalable Arch",
      desc: "Microservices, monorepos, component-driven",
      color: "#e879f9",
    },
  ];

  const skillTabList = ["Frontend", "Backend", "DevOps", "Design"];

  const f = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  });

  const S = {
    page: {
      background: "#060010",
      color: "white",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
    },
    section: {
      padding: "100px clamp(24px, 3vw, 40px)",
      position: "relative",
      zIndex: 1,
    },
    inner: { maxWidth: 1440, margin: "0 auto", width: "100%" },
  };

  return (
    <div style={S.page}>
      {/* Grid bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(245, 158, 11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245, 158, 11,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section
        id="home"
        style={{
          ...S.section,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "80px 24px 60px",
          position: "relative",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "-5%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245, 158, 11,0.13) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{ ...S.inner, width: "100%", position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={f(0)}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(245, 158, 11,0.12)",
                    border: "1px solid rgba(245, 158, 11,0.3)",
                    borderRadius: 100,
                    padding: "7px 16px",
                    fontSize: 12,
                    color: "#FCD34D",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#FCD34D",
                      boxShadow: "0 0 8px #FCD34D",
                      display: "inline-block",
                    }}
                  />
                  Available for Hire <Sparkles size={12} />
                </div>
              </div>
              <div
                style={{
                  ...f(100),
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(0.85rem,1.5vw,1rem)",
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  👋 Hello, World!
                </div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(2.8rem,7vw,5.5rem)",
                    fontWeight: 900,
                  }}
                >
                  I'm{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg,#FCD34D 0%,#FCD34D 50%,#fb923c 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Bihari Kumar Rawat
                  </span>
                </h1>
              </div>
              <div
                style={{
                  ...f(180),
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(1rem,2.5vw,1.4rem)",
                    fontWeight: 700,
                    color: "#FCD34D",
                  }}
                >
                  {role}
                  <span
                    style={{
                      borderRight: "2px solid #FCD34D",
                      marginLeft: 2,
                      animation: "blink 0.8s step-end infinite",
                    }}
                  />
                </span>
              </div>
              <p
                style={{
                  ...f(250),
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  maxWidth: 480,
                  margin: 0,
                }}
              >
                Passionate about building{" "}
                <span
                  style={{ color: "rgba(196,132,252,0.9)", fontWeight: 600 }}
                >
                  fast, beautiful & accessible
                </span>{" "}
                web experiences. I turn complex problems into clean, elegant
                solutions.
              </p>
              <div
                style={{ ...f(320), display: "flex", gap: 8, flexWrap: "wrap" }}
              >
                {[
                  { icon: Terminal, text: "Full Stack" },
                  { icon: Palette, text: "Pixel Perfect" },
                  { icon: Zap, text: "Fast Delivery" },
                  { icon: Coffee, text: "Remote Friendly" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    style={{
                      display: "inline-flex",
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
                    <Icon size={12} color="#FCD34D" />
                    {text}
                  </div>
                ))}
              </div>
              <div
                style={{
                  ...f(390),
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(135deg,#D97706,#F59E0B)",
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "13px 26px",
                    borderRadius: 50,
                    boxShadow: "0 0 28px rgba(217, 119, 6,0.35)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 36px rgba(217, 119, 6,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 28px rgba(217, 119, 6,0.35)";
                  }}
                >
                  Get In Touch <ArrowRight size={16} />
                </a>
                <a
                  href="#projects"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "transparent",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "13px 26px",
                    borderRadius: 50,
                    border: "1.5px solid rgba(245, 158, 11,0.4)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245, 158, 11,0.8)";
                    e.currentTarget.style.background = "rgba(245, 158, 11,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245, 158, 11,0.4)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  View Projects
                </a>
                <a
                  href="/image/Bihari_kumar_rawat_2026.pdf"
                  download
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.05)",
                    border: "1.5px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    padding: "13px 20px",
                    borderRadius: 50,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  <Download size={14} /> Resume
                </a>
              </div>
              <div
                style={{
                  ...f(460),
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Follow
                </span>
                <div
                  style={{
                    height: 1,
                    width: 20,
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
                {[
                  { icon: Github, href: "#", color: "#e2e8f0" },
                  { icon: Linkedin, href: "#", color: "#60a5fa" },
                  { icon: Twitter, href: "#", color: "#FCD34D" },
                ].map(({ icon: Icon, href, color }, i) => (
                  <a
                    key={i}
                    href={href}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.borderColor = color + "50";
                      e.currentTarget.style.background = color + "15";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            {/* Right — photo + stats */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
                ...f(200),
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: "50%",
                    background:
                      "conic-gradient(from 0deg,#D97706,#F59E0B,#f97316,#D97706)",
                    animation: "spin 7s linear infinite",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -9,
                    borderRadius: "50%",
                    background: "#060010",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    width: 270,
                    height: 270,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid rgba(245, 158, 11,0.4)",
                    boxShadow: "0 0 60px rgba(217, 119, 6,0.4)",
                  }}
                >
                  <img
                    src="/image/bihari_kumar_rawat.jpeg"
                    alt="Bihari Kumar Rawat"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: -22,
                    zIndex: 3,
                    background: "rgba(6,0,16,0.9)",
                    border: "1px solid rgba(245, 158, 11,0.35)",
                    borderRadius: 12,
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    animation: "floatA 3s ease-in-out infinite",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <span style={{ fontSize: 18 }}>💻</span>
                  <div>
                    <div
                      style={{ fontSize: 11, fontWeight: 700, color: "white" }}
                    >
                      Full Stack
                    </div>
                    <div
                      style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}
                    >
                      Developer
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: -26,
                    zIndex: 3,
                    background: "rgba(6,0,16,0.9)",
                    border: "1px solid rgba(245, 158, 11,0.35)",
                    borderRadius: 12,
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    animation: "floatB 3.5s ease-in-out infinite",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  }}
                >
                  <span style={{ fontSize: 18 }}>🎨</span>
                  <div>
                    <div
                      style={{ fontSize: 11, fontWeight: 700, color: "white" }}
                    >
                      UI / UX
                    </div>
                    <div
                      style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}
                    >
                      Designer
                    </div>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 2,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 18,
                  padding: "4px",
                  width: "100%",
                  maxWidth: 320,
                  overflow: "hidden",
                }}
              >
                {stats.map(({ value, suffix, label, icon }) => (
                  <div
                    key={label}
                    style={{
                      textAlign: "center",
                      padding: "14px 6px",
                      borderRadius: 14,
                      cursor: "default",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(245, 158, 11,0.12)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div style={{ fontSize: "1.2rem", marginBottom: 3 }}>
                      {icon}
                    </div>
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 900,
                        background: "linear-gradient(135deg,#FCD34D,#FCD34D)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      <Counter target={value} suffix={suffix} />
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "rgba(255,255,255,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600,
                        marginTop: 2,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
            color: "rgba(255,255,255,0.2)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <span>Scroll</span>
          <div
            style={{
              width: 20,
              height: 33,
              border: "1.5px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              display: "flex",
              justifyContent: "center",
              padding: "4px 0",
            }}
          >
            <div
              style={{
                width: 3,
                height: 7,
                borderRadius: 2,
                background: "rgba(167,139,250,0.7)",
                animation: "scrollDot 1.8s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════ WHAT I DO ══════════════════════════════ */}
      <section style={S.section}>
        <div style={S.inner}>
          <SectionHeader
            badge="✦ What I Do"
            title="My Core"
            highlight="Strengths"
            subtitle="Every project I take on reflects these core principles and values."
            mounted={mounted}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 16,
            }}
          >
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${color}20`,
                  borderRadius: 20,
                  padding: "26px 22px",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color + "09";
                  e.currentTarget.style.borderColor = color + "45";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 16px 48px ${color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = color + "20";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: color + "18",
                    border: `1px solid ${color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <Icon size={24} color={color} />
                </div>
                <h4
                  style={{
                    margin: "0 0 7px",
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
      </section>

      {/* ══════════════════════════ SKILLS ═════════════════════════════════ */}
      <section
        id="skills"
        style={{
          ...S.section,
          background:
            "radial-gradient(circle at top, rgba(217, 119, 6,0.18), transparent 32%), linear-gradient(180deg, #16112b 0%, #21173b 46%, #16243b 100%)",
        }}
      >
        <div
          style={{
            ...S.inner,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 32,
            padding: "42px clamp(18px, 4vw, 36px)",
            boxShadow: "0 24px 80px rgba(5, 8, 20, 0.28)",
            backdropFilter: "blur(20px)",
          }}
        >
          <SectionHeader
            badge="🛠 Skills"
            title="My Tech"
            highlight="Stack"
            subtitle="Hover over each card to see what I can do. Flip it!"
            mounted={mounted}
          />
          {/* Tab buttons */}
          <div
            style={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {skillTabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSkillTab(tab)}
                style={{
                  padding: "9px 22px",
                  borderRadius: 50,
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  background:
                    activeSkillTab === tab
                      ? "linear-gradient(135deg,#fb7185,#F59E0B,#FCD34D)"
                      : "rgba(255,255,255,0.06)",
                  color:
                    activeSkillTab === tab ? "white" : "rgba(255,255,255,0.6)",
                  borderColor:
                    activeSkillTab === tab
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(255,255,255,0.08)",
                  transition: "all 0.25s ease",
                  boxShadow:
                    activeSkillTab === tab
                      ? "0 12px 30px rgba(245, 158, 11,0.28)"
                      : "none",
                }}
              >
                {tab === "Frontend"
                  ? "⚛️ Frontend"
                  : tab === "Backend"
                    ? "🟢 Backend"
                    : tab === "DevOps"
                      ? "🐳 DevOps"
                      : "🎨 Design"}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: 18,
            }}
          >
            {skillTabs[activeSkillTab].map((s, i) => (
              <FlipSkillCard key={i} {...s} />
            ))}
          </div>
          {/* Tech logos row */}
          <div
            style={{
              marginTop: 48,
              padding: "24px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: 11,
                textAlign: "center",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 20,
                fontWeight: 700,
              }}
            >
              Technologies I Work With Daily
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "max-content",
                  animation: "techTicker 24s linear infinite",
                  padding: "2px 0",
                }}
              >
                {[...techTicker, ...techTicker].map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 999,
                      padding: "7px 14px",
                      transition: "all 0.2s ease",
                      cursor: "default",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#FCD34D";
                      e.currentTarget.style.borderColor =
                        "rgba(245, 158, 11,0.35)";
                      e.currentTarget.style.background = "rgba(245, 158, 11,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ PROJECTS ═════════════════════════════════ */}
      <section id="projects" style={S.section}>
        <div style={S.inner}>
          <SectionHeader
            badge="💼 Projects"
            title="Selected"
            highlight="Works"
            subtitle="Hover cards to flip and explore each project in detail."
            mounted={mounted}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: 20,
            }}
          >
            {projects.map((p, i) => (
              <ProjectFlipCard key={i} {...p} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                padding: "13px 28px",
                borderRadius: 50,
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245, 158, 11,0.12)";
                e.currentTarget.style.borderColor = "rgba(245, 158, 11,0.4)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              <Rocket size={15} /> Have a project? Let's build it{" "}
              <ChevronRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ═════════════════════════════ */}
      <section style={{ ...S.section, background: "rgba(245, 158, 11,0.03)" }}>
        <div style={S.inner}>
          <SectionHeader
            badge="💬 Testimonials"
            title="What Clients"
            highlight="Say"
            subtitle="Don't just take my word for it — hear from the people I've worked with."
            mounted={mounted}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 16,
            }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ CTA BANNER ═══════════════════════════════ */}
      <section style={S.section}>
        <div style={S.inner}>
          <div
            style={{
              background:
                "linear-gradient(135deg,rgba(217, 119, 6,0.2) 0%,rgba(245, 158, 11,0.15) 100%)",
              border: "1px solid rgba(245, 158, 11,0.25)",
              borderRadius: 28,
              padding: "64px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(245, 158, 11,0.3) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: -40,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(245, 158, 11,0.2) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "2.8rem", marginBottom: 16 }}>🚀</div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem,3.5vw,2.6rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: "0 0 14px",
                }}
              >
                Ready to Build Something{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#FCD34D,#FCD34D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Incredible?
                </span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "1rem",
                  maxWidth: 520,
                  margin: "0 auto 32px",
                  lineHeight: 1.75,
                }}
              >
                I'm currently open to new projects, full-time roles, and
                exciting collaborations. Let's turn your idea into reality.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(135deg,#D97706,#F59E0B)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 800,
                    padding: "14px 32px",
                    borderRadius: 50,
                    boxShadow: "0 8px 28px rgba(217, 119, 6,0.4)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 40px rgba(217, 119, 6,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Heart size={16} fill="white" /> Let's Work Together
                </a>
                <a
                  href="/image/Bihari_kumar_rawat_2026.pdf"
                  download
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 700,
                    padding: "14px 28px",
                    borderRadius: 50,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255,255,255,0.14)")
                  }
                  onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255,255,255,0.08)")
                  }
                >
                  <Download size={15} /> Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes spin { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
        @keyframes floatA { 0%,100% { transform:translateY(0) rotate(-1deg) } 50% { transform:translateY(-9px) rotate(1deg) } }
        @keyframes floatB { 0%,100% { transform:translateY(0) rotate(1deg) } 50% { transform:translateY(-11px) rotate(-1deg) } }
        @keyframes scrollDot { 0% { transform:translateY(0); opacity:1 } 100% { transform:translateY(14px); opacity:0 } }
        @keyframes techTicker { from { transform:translateX(0) } to { transform:translateX(-50%) } }
      `}</style>
    </div>
  );
}
