import {
  ExternalLink,
  Globe as Github,
  ArrowUpRight,
  Star,
  Zap,
  Eye,
} from "lucide-react";
import { useState } from "react";

// ─── VARIANT 1: Flip Card (Roll Front / Roll Back) ───────────────────────────
function FlipCard({
  title,
  description,
  image,
  technologies,
  demoLink,
  githubLink,
  stats,
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ perspective: "1200px", height: 360, cursor: "pointer" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 20,
            overflow: "hidden",
            background: "linear-gradient(145deg, #0f0030, #1a0040)",
            border: "1px solid rgba(245, 158, 11,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{ position: "relative", height: 200, overflow: "hidden" }}
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
                background:
                  "linear-gradient(to bottom, transparent 50%, #0f0030 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(245, 158, 11,0.8)",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 700,
                color: "white",
                backdropFilter: "blur(8px)",
              }}
            >
              Hover to Flip →
            </div>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {technologies?.slice(0, 4).map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#FCD34D",
                    background: "rgba(252, 211, 77,0.12)",
                    border: "1px solid rgba(252, 211, 77,0.2)",
                    borderRadius: 6,
                    padding: "3px 8px",
                  }}
                >
                  {t}
                </span>
              ))}
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
            borderRadius: 20,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, #1a0040 0%, #2d0060 50%, #1a0030 100%)",
            border: "1px solid rgba(244,114,182,0.35)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 28,
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), inset 0 0 60px rgba(245, 158, 11,0.1)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "#FCD34D",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            Project Details
          </div>
          <h3
            style={{
              margin: "0 0 12px",
              fontSize: "1.3rem",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              lineHeight: 1.7,
              margin: "0 0 20px",
            }}
          >
            {description}
          </p>

          {stats && (
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              {stats.map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "#FCD34D",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            {demoLink && (
              <a
                href={demoLink}
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
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: 10,
                }}
              >
                <Eye size={14} /> Live Demo
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
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
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "10px",
                  borderRadius: 10,
                }}
              >
                <Github size={14} /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VARIANT 2: Spotlight Hover Card ─────────────────────────────────────────
function SpotlightCard({
  title,
  description,
  image,
  technologies,
  demoLink,
  githubLink,
  featured,
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const ref = useState(null);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "#0a001a",
        border: `1px solid ${hovering ? "rgba(244,114,182,0.4)" : "rgba(245, 158, 11,0.2)"}`,
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        transform: hovering ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovering
          ? "0 24px 60px rgba(217, 119, 6,0.3)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
    >
      {/* Spotlight */}
      {hovering && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            zIndex: 1,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245, 158, 11,0.15) 0%, transparent 70%)",
            left: pos.x - 150,
            top: pos.y - 150,
            transition: "left 0.05s, top 0.05s",
          }}
        />
      )}

      {featured && (
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 3,
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 10,
            fontWeight: 800,
            color: "white",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Star size={10} fill="white" /> Featured
        </div>
      )}

      <div style={{ height: 200, overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovering ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 200,
            background:
              "linear-gradient(to bottom, transparent 40%, #0a001a 100%)",
          }}
        />
      </div>

      <div
        style={{ padding: "20px 22px 22px", position: "relative", zIndex: 2 }}
      >
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: "1.1rem",
            fontWeight: 800,
            color: "white",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: "0 0 14px",
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            lineHeight: 1.65,
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 16,
          }}
        >
          {technologies?.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#e879f9",
                background: "rgba(232,121,249,0.1)",
                border: "1px solid rgba(232,121,249,0.2)",
                borderRadius: 20,
                padding: "3px 10px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {demoLink && (
            <a
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "white",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
                background: "linear-gradient(135deg, #D97706, #F59E0B)",
                padding: "8px 16px",
                borderRadius: 8,
                transition: "opacity 0.2s",
              }}
            >
              <ExternalLink size={13} /> View Live
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
                padding: "8px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "color 0.2s",
              }}
            >
              <Github size={13} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── VARIANT 3: Horizontal Wide Card ─────────────────────────────────────────
function WideCard({
  title,
  description,
  image,
  technologies,
  demoLink,
  githubLink,
  number,
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(135deg, #08001a, #110025)",
        border: `1px solid ${hov ? "rgba(245, 158, 11,0.5)" : "rgba(245, 158, 11,0.15)"}`,
        transition: "all 0.3s ease",
        transform: hov ? "translateX(6px)" : "translateX(0)",
        boxShadow: hov
          ? "-6px 0 40px rgba(217, 119, 6,0.25), 0 8px 32px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hov ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 50%, #08001a 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            fontSize: "2.5rem",
            fontWeight: 900,
            color: "rgba(255,255,255,0.06)",
            fontFamily: "monospace",
            lineHeight: 1,
          }}
        >
          {String(number || 1).padStart(2, "0")}
        </div>
      </div>

      <div
        style={{
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h3>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(245, 158, 11,0.2)",
                  border: "1px solid rgba(245, 158, 11,0.3)",
                  color: "#FCD34D",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <ArrowUpRight size={15} />
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>

        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.45)",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {technologies?.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#7dd3fc",
                background: "rgba(125,211,252,0.08)",
                border: "1px solid rgba(125,211,252,0.18)",
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
  );
}

// ─── VARIANT 4: Glassmorphism Minimal Card ────────────────────────────────────
function GlassCard({
  title,
  description,
  image,
  technologies,
  demoLink,
  githubLink,
  category,
}) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(24px)",
        background: hov ? "rgba(245, 158, 11,0.1)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(245, 158, 11,0.4)" : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.3s ease",
        transform: hov ? "scale(1.02)" : "scale(1)",
        boxShadow: hov ? "0 20px 60px rgba(217, 119, 6,0.2)" : "none",
        cursor: "pointer",
      }}
    >
      {category && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 3,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#FCD34D",
            background: "rgba(245, 158, 11,0.15)",
            border: "1px solid rgba(245, 158, 11,0.3)",
            borderRadius: 20,
            padding: "4px 10px",
          }}
        >
          {category}
        </div>
      )}

      <div style={{ height: 180, overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: hov ? "brightness(0.85)" : "brightness(0.7)",
            transition: "all 0.4s ease",
            transform: hov ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      <div style={{ padding: "20px 22px" }}>
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: "1rem",
            fontWeight: 800,
            color: "white",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: "0 0 14px",
            color: "rgba(255,255,255,0.4)",
            fontSize: 12.5,
            lineHeight: 1.65,
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            marginBottom: 16,
          }}
        >
          {technologies?.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 4,
                padding: "3px 7px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              fontWeight: 600,
            }}
          >
            View Project
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #D97706, #F59E0B)",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={13} />
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                }}
              >
                <Github size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DEMO PAGE ────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart, checkout, Stripe payments, and admin dashboard built with Next.js.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind"],
    demoLink: "#",
    githubLink: "#",
    featured: true,
    category: "Web App",
    stats: [
      { value: "4.9★", label: "Rating" },
      { value: "2k+", label: "Users" },
      { value: "99%", label: "Uptime" },
    ],
  },
  {
    title: "AI Chat Interface",
    description:
      "Real-time AI chat with streaming responses, conversation memory, and markdown rendering.",
    image:
      "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "Node.js", "OpenAI API", "Socket.io"],
    demoLink: "#",
    githubLink: "#",
    featured: false,
    category: "AI / ML",
    stats: [
      { value: "50ms", label: "Latency" },
      { value: "∞", label: "Messages" },
      { value: "GPT-4", label: "Model" },
    ],
  },
  {
    title: "Portfolio Dashboard",
    description:
      "Analytics dashboard for tracking portfolio performance with real-time data, charts, and export.",
    image:
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "D3.js", "FastAPI", "PostgreSQL"],
    demoLink: "#",
    githubLink: "#",
    featured: false,
    category: "Dashboard",
    stats: [
      { value: "12", label: "Charts" },
      { value: "Live", label: "Data" },
      { value: "CSV", label: "Export" },
    ],
  },
  {
    title: "Social Media App",
    description:
      "Instagram-style app with image uploads, stories, real-time likes, follows, and direct messaging.",
    image:
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React Native", "Firebase", "Expo", "Redux"],
    demoLink: "#",
    githubLink: "#",
    featured: true,
    category: "Mobile",
    stats: [
      { value: "10k+", label: "Downloads" },
      { value: "4.8★", label: "Rating" },
    ],
  },
];

export default function ProjectShowcase() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060010",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "white",
        padding: "80px 24px",
      }}
    >
      {/* BG */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          right: "5%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(245, 158, 11,0.12)",
              border: "1px solid rgba(245, 158, 11,0.25)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 18,
              fontSize: 11,
              color: "#FCD34D",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <Zap size={11} /> Selected Works
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: "0 0 14px",
            }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projects
            </span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "1rem",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Four different card styles — hover to see the magic ✨
          </p>
        </div>

        {/* Section 1 — Flip Cards */}
        <div style={{ marginBottom: 64 }}>
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
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FCD34D",
              }}
            >
              Style 01
            </span>
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
              }}
            >
              3D Flip Cards
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {PROJECTS.slice(0, 2).map((p, i) => (
              <FlipCard key={i} {...p} />
            ))}
          </div>
        </div>

        {/* Section 2 — Spotlight Cards */}
        <div style={{ marginBottom: 64 }}>
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
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FCD34D",
              }}
            >
              Style 02
            </span>
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
              }}
            >
              Spotlight Hover Cards
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {PROJECTS.slice(2, 4).map((p, i) => (
              <SpotlightCard key={i} {...p} />
            ))}
          </div>
        </div>

        {/* Section 3 — Wide Cards */}
        <div style={{ marginBottom: 64 }}>
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
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#7dd3fc",
              }}
            >
              Style 03
            </span>
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
              }}
            >
              Horizontal Wide Cards
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PROJECTS.slice(0, 3).map((p, i) => (
              <WideCard key={i} number={i + 1} {...p} />
            ))}
          </div>
        </div>

        {/* Section 4 — Glass Cards */}
        <div>
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
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#FCD34D",
              }}
            >
              Style 04
            </span>
            <span
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
              }}
            >
              Glassmorphism Cards
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {PROJECTS.map((p, i) => (
              <GlassCard key={i} {...p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
