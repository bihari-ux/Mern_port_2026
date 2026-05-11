import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Globe as Github,
  Eye,
  Star,
  Zap,
  ArrowUpRight,
  Filter,
  Search,
  Code2,
  Globe,
  Smartphone,
  BarChart3,
  ShoppingCart,
  Brain,
  Dumbbell,
  Cloud,
  ChevronRight,
  Rocket,
} from "lucide-react";

// ── 3D Flip Card ─────────────────────────────────────────────────────────────
function FlipProjectCard({
  title,
  desc,
  image,
  tech,
  demo,
  github,
  tag,
  color,
  year,
  stars,
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{ perspective: "1200px", height: 380, cursor: "pointer" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 22,
            overflow: "hidden",
            background: "linear-gradient(160deg, #0e0025 0%, #18003a 100%)",
            border: `1px solid ${color}30`,
            boxShadow: `0 4px 30px rgba(0,0,0,0.4), 0 0 0 1px ${color}10`,
          }}
        >
          {/* Image */}
          <div
            style={{ position: "relative", height: 210, overflow: "hidden" }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, transparent 35%, #0e0025 100%)`,
              }}
            />
            {/* Tag */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: `${color}25`,
                border: `1px solid ${color}60`,
                backdropFilter: "blur(8px)",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 10,
                fontWeight: 800,
                color,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {tag}
            </div>
            {/* Year */}
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                fontWeight: 600,
              }}
            >
              {year}
            </div>
            {/* Flip hint */}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                right: 14,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Hover to flip →
            </div>
          </div>
          {/* Content */}
          <div style={{ padding: "16px 20px 20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h3>
              {stars && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 11,
                    color: "#F59E0B",
                    fontWeight: 700,
                  }}
                >
                  <Star size={11} fill="#F59E0B" />
                  {stars}
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color,
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                    borderRadius: 6,
                    padding: "2px 8px",
                  }}
                >
                  {t}
                </span>
              ))}
              {tech.length > 4 && (
                <span
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    padding: "2px 6px",
                  }}
                >
                  +{tech.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 22,
            overflow: "hidden",
            background: `linear-gradient(135deg, #1a0040 0%, #2d0060 50%, #1a0030 100%)`,
            border: `1px solid ${color}50`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 28,
            boxShadow: `0 0 60px ${color}20, inset 0 0 60px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Decorative corner */}
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: `${color}15`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `${color}10`,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: 10,
                color,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              {tag} · {year}
            </div>
            <h3
              style={{
                margin: "0 0 12px",
                fontSize: "1.25rem",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                margin: "0 0 20px",
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
              }}
            >
              {desc}
            </p>

            {/* All tech */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                marginBottom: 24,
              }}
            >
              {tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color,
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    borderRadius: 6,
                    padding: "3px 8px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Buttons */}
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
                    gap: 7,
                    background: "linear-gradient(135deg, #D97706, #F59E0B)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "11px",
                    borderRadius: 12,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Eye size={14} /> Live Demo
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
                    gap: 7,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "11px",
                    borderRadius: 12,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)")
                  }
                >
                  <Github size={14} /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Featured Wide Card ────────────────────────────────────────────────────────
function FeaturedCard({
  title,
  desc,
  image,
  tech,
  demo,
  github,
  tag,
  color,
  year,
  stars,
  highlights,
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderRadius: 24,
        overflow: "hidden",
        background: "linear-gradient(135deg, #0e0025, #1a0038)",
        border: `1px solid ${hov ? color + "55" : color + "25"}`,
        transition: "all 0.35s ease",
        boxShadow: hov
          ? `0 24px 64px ${color}20, 0 0 0 1px ${color}15`
          : "0 8px 32px rgba(0,0,0,0.3)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      {/* Image side */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 300 }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hov ? "scale(1.06)" : "scale(1)",
            filter: hov ? "brightness(0.85)" : "brightness(0.75)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to right, transparent 50%, #0e0025 95%)`,
          }}
        />
        {/* Featured badge */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            borderRadius: 8,
            padding: "5px 12px",
            fontSize: 10,
            fontWeight: 800,
            color: "white",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 5,
            boxShadow: "0 4px 12px rgba(245,158,11,0.4)",
          }}
        >
          <Star size={10} fill="white" /> Featured
        </div>
        {/* Year */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
            fontWeight: 600,
          }}
        >
          {year}
        </div>
      </div>

      {/* Content side */}
      <div
        style={{
          padding: "32px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              color,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            {tag}
          </div>
          <h3
            style={{
              margin: "0 0 10px",
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75,
            }}
          >
            {desc}
          </p>
        </div>

        {/* Highlights */}
        {highlights && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {highlights.map((h) => (
              <div
                key={h}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                    boxShadow: `0 0 6px ${color}`,
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.55)",
                    fontWeight: 500,
                  }}
                >
                  {h}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 700,
                color,
                background: `${color}12`,
                border: `1px solid ${color}25`,
                borderRadius: 7,
                padding: "3px 9px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stars + links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {stars && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 13,
                color: "#F59E0B",
                fontWeight: 700,
              }}
            >
              <Star size={14} fill="#F59E0B" /> {stars} stars
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginLeft: "auto" }}>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "linear-gradient(135deg, #D97706, #F59E0B)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "9px 16px",
                  borderRadius: 10,
                }}
              >
                <ExternalLink size={13} /> View
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "9px 16px",
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

// ── Minimal List Card ─────────────────────────────────────────────────────────
function ListCard({ title, desc, tech, demo, github, tag, color, number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: hov ? `${color}06` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? color + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16,
        padding: "18px 22px",
        transition: "all 0.25s ease",
        transform: hov ? "translateX(5px)" : "translateX(0)",
        boxShadow: hov ? `-4px 0 24px ${color}18` : "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: 900,
          color: `${color}30`,
          fontFamily: "monospace",
          lineHeight: 1,
          flexShrink: 0,
          width: 36,
          textAlign: "center",
        }}
      >
        {String(number).padStart(2, "0")}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 5,
          }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "white",
            }}
          >
            {title}
          </h4>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color,
              background: `${color}15`,
              border: `1px solid ${color}25`,
              borderRadius: 4,
              padding: "2px 6px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              flexShrink: 0,
            }}
          >
            {tag}
          </span>
        </div>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.5,
          }}
        >
          {desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 4,
                padding: "2px 7px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${color}18`,
              border: `1px solid ${color}30`,
              color,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <ArrowUpRight size={15} />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            <Github size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const categories = [
    "All",
    "Web App",
    "Mobile",
    "Dashboard",
    "AI/ML",
    "E-Commerce",
    "Tool",
  ];

  const allProjects = [
    {
      title: "AI SaaS Platform",
      desc: "Full-featured AI productivity tool with streaming chat, multi-model support (GPT-4, Claude), credits system, Stripe billing, team workspaces, and admin analytics dashboard.",
      image:
        "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: [
        "Next.js 14",
        "OpenAI API",
        "Stripe",
        "PostgreSQL",
        "TypeScript",
        "Prisma",
        "Redis",
      ],
      demo: "#",
      github: "#",
      tag: "AI/ML",
      color: "#FCD34D",
      year: "2024",
      stars: "342",
      featured: true,
      highlights: [
        "35% increase in user retention",
        "50ms avg API response time",
        "99.9% uptime SLA",
      ],
    },
    {
      title: "E-Commerce Platform",
      desc: "End-to-end online store with product catalog, cart, Stripe payments, order tracking, inventory management, and a full CMS admin panel.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Prisma", "Stripe", "Tailwind", "AWS S3", "PostgreSQL"],
      demo: "#",
      github: "#",
      tag: "E-Commerce",
      color: "#FCD34D",
      year: "2024",
      stars: "218",
      featured: true,
      highlights: [
        "$120k+ monthly transactions processed",
        "40% conversion rate improvement",
        "10k+ active users",
      ],
    },
    {
      title: "Analytics Dashboard",
      desc: "Real-time multi-source analytics with interactive D3.js charts, custom date filters, CSV/PDF export, and multi-tenant organization support.",
      image:
        "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "D3.js", "FastAPI", "Redis", "PostgreSQL", "WebSockets"],
      demo: "#",
      github: "#",
      tag: "Dashboard",
      color: "#FCD34D",
      year: "2023",
      stars: "156",
    },
    {
      title: "Social Media App",
      desc: "Instagram-inspired mobile app with real-time feeds, stories, DMs, image uploads, likes, comments, explore page, and push notifications.",
      image:
        "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: [
        "React Native",
        "Firebase",
        "Expo",
        "Redux",
        "Socket.io",
        "Cloudinary",
      ],
      demo: "#",
      github: "#",
      tag: "Mobile",
      color: "#F59E0B",
      year: "2023",
      stars: "204",
    },
    {
      title: "Task Management App",
      desc: "Collaborative project tool with kanban boards, Gantt charts, real-time sync, deadline tracking, team roles, and Slack integration.",
      image:
        "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io", "Prisma"],
      demo: "#",
      github: "#",
      tag: "Web App",
      color: "#FCD34D",
      year: "2023",
      stars: "189",
    },
    {
      title: "DevOps Pipeline Tool",
      desc: "Visual CI/CD pipeline builder with drag-and-drop workflow stages, GitHub webhooks, deployment logs, rollback, and health monitoring.",
      image:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: [
        "React",
        "Node.js",
        "Docker",
        "GitHub API",
        "WebSockets",
        "PostgreSQL",
      ],
      demo: "#",
      github: "#",
      tag: "Tool",
      color: "#e879f9",
      year: "2023",
      stars: "97",
    },
    {
      title: "Weather Forecast App",
      desc: "Real-time weather with location-based 7-day forecasts, interactive Mapbox maps, hourly trends, UV index, and severe weather alerts.",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "OpenWeather API", "Mapbox", "Tailwind CSS", "PWA"],
      demo: "#",
      github: "#",
      tag: "Web App",
      color: "#FCD34D",
      year: "2022",
      stars: "143",
    },
    {
      title: "Portfolio CMS",
      desc: "Headless CMS-powered portfolio builder with drag-and-drop sections, live preview, custom domains, and one-click Vercel deployments.",
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Sanity", "TypeScript", "Vercel", "Tailwind"],
      demo: "#",
      github: "#",
      tag: "Tool",
      color: "#fb923c",
      year: "2022",
      stars: "88",
    },
    {
      title: "Fitness Tracker",
      desc: "Mobile fitness app for logging workouts, tracking nutrition macros, visualizing progress charts, setting goals, and scheduling rest days.",
      image:
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React Native", "Firebase", "Redux", "Chart.js", "Expo"],
      demo: "#",
      github: "#",
      tag: "Mobile",
      color: "#4ade80",
      year: "2022",
      stars: "75",
    },
  ];

  const featured = allProjects.filter((p) => p.featured);
  const filtered = allProjects.filter((p) => {
    const matchCat = filter === "All" || p.tag === filter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });
  const nonFeatured = filtered.filter((p) => !p.featured);

  const stats = [
    { value: "9+", label: "Projects Built", icon: "💼" },
    { value: "15+", label: "Technologies", icon: "🛠" },
    { value: "5⭐", label: "Avg Rating", icon: "⭐" },
    { value: "3+", label: "Years Exp.", icon: "🚀" },
  ];

  const fu = (d = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${d}ms, transform 0.6s ease ${d}ms`,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060010",
        color: "white",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(245, 158, 11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "5%",
          right: "-8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "5%",
          left: "-6%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <section
        id="projects"
        style={{ padding: "100px 24px 80px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: 64, ...fu(0) }}>
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
              <Code2 size={11} /> Selected Works
            </div>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                margin: "0 0 16px",
              }}
            >
              My{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FCD34D, #FCD34D, #fb923c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Projects
              </span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.05rem",
                maxWidth: 540,
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              A curated collection of real-world applications — from AI SaaS to
              e-commerce platforms. Each project shipped with ❤️
            </p>
          </div>

          {/* ── STATS ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 2,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: 4,
              marginBottom: 64,
              overflow: "hidden",
              ...fu(80),
            }}
          >
            {stats.map(({ value, label, icon }) => (
              <div
                key={label}
                style={{
                  textAlign: "center",
                  padding: "22px 12px",
                  borderRadius: 17,
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(245, 158, 11,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>
                  {icon}
                </div>
                <div
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                    marginTop: 3,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* ── FEATURED ── */}
          <div style={{ marginBottom: 72, ...fu(150) }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#F59E0B",
                }}
              >
                ⭐ Featured
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {featured.map((p, i) => (
                <FeaturedCard key={i} {...p} />
              ))}
            </div>
          </div>

          {/* ── SEARCH + FILTER ── */}
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 32,
              ...fu(200),
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.3)",
                }}
              />
              <input
                placeholder="Search by name or tech..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "11px 14px 11px 38px",
                  color: "white",
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(245, 158, 11,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
              />
            </div>
            {/* Filter pills */}
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Filter size={13} color="rgba(255,255,255,0.3)" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "7px 14px",
                    borderRadius: 20,
                    border: `1px solid ${filter === cat ? "rgba(245, 158, 11,0.6)" : "rgba(255,255,255,0.08)"}`,
                    background:
                      filter === cat
                        ? "rgba(245, 158, 11,0.18)"
                        : "rgba(255,255,255,0.03)",
                    color: filter === cat ? "#FCD34D" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow:
                      filter === cat ? "0 0 12px rgba(245, 158, 11,0.2)" : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── FLIP CARDS GRID ── */}
          {nonFeatured.length > 0 && (
            <div style={{ marginBottom: 64, ...fu(250) }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#FCD34D",
                  }}
                >
                  🃏 All Projects
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.3)",
                    fontWeight: 600,
                  }}
                >
                  {nonFeatured.length} projects — hover to flip
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 20,
                }}
              >
                {nonFeatured.map((p, i) => (
                  <FlipProjectCard key={i} {...p} />
                ))}
              </div>
            </div>
          )}

          {/* ── LIST VIEW (Open Source / Mini projects) ── */}
          <div style={{ marginBottom: 64, ...fu(300) }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#FCD34D",
                }}
              >
                📋 Other Works
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                {
                  title: "React Hook Library",
                  desc: "25+ custom React hooks for common patterns — auth, media query, local storage, debounce.",
                  tech: ["React", "TypeScript", "npm"],
                  demo: "#",
                  github: "#",
                  tag: "OSS",
                  color: "#61dafb",
                },
                {
                  title: "CLI Scaffold Tool",
                  desc: "Node.js CLI to scaffold full-stack projects with chosen tech stack in under 30 seconds.",
                  tech: ["Node.js", "Commander.js", "npm"],
                  demo: "#",
                  github: "#",
                  tag: "Tool",
                  color: "#68a063",
                },
                {
                  title: "CSS Component Kit",
                  desc: "Pure CSS component library with 50+ components, dark/light modes, zero dependencies.",
                  tech: ["CSS", "HTML", "Sass"],
                  demo: "#",
                  github: "#",
                  tag: "UI",
                  color: "#FCD34D",
                },
                {
                  title: "API Rate Limiter",
                  desc: "Express middleware for advanced rate limiting with Redis, sliding window, and JWT-aware rules.",
                  tech: ["Node.js", "Redis", "Express"],
                  demo: "#",
                  github: "#",
                  tag: "Package",
                  color: "#f59e0b",
                },
              ].map((p, i) => (
                <ListCard key={i} number={i + 1} {...p} />
              ))}
            </div>
          </div>

          {/* ── BOTTOM CTA ── */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(217, 119, 6,0.18) 0%, rgba(245, 158, 11,0.13) 100%)",
              border: "1px solid rgba(245, 158, 11,0.25)",
              borderRadius: 24,
              padding: "52px 36px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              ...fu(350),
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 180,
                height: 180,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(245, 158, 11,0.25) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 140,
                height: 140,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(245, 158, 11,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>🤝</div>
              <h3
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: "0 0 12px",
                }}
              >
                Have a Project Idea?
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.95rem",
                  maxWidth: 460,
                  margin: "0 auto 28px",
                  lineHeight: 1.75,
                }}
              >
                I'm open to freelance, full-time opportunities, and exciting
                collaborations. Let's build the next big thing together.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
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
                    background: "linear-gradient(135deg, #D97706, #F59E0B)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "13px 28px",
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
                  <Rocket size={15} /> Start a Project
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 700,
                    padding: "13px 28px",
                    borderRadius: 50,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.13)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.07)")
                  }
                >
                  <Github size={15} /> View GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`input::placeholder { color: rgba(255,255,255,0.2); }`}</style>
    </div>
  );
}
