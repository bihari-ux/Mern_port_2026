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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ROLES = [
  "Full Stack Developer",
  "UI/UX Designer",
  "React Specialist",
  "Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  // Mount animation
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, 40);
    } else {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

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

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.alpha})`;
        ctx.fill();
      });
      // Draw faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245, 158, 11,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
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

  const socials = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
      color: "#e2e8f0",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "#60a5fa",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "#FCD34D",
    },
  ];

  const stats = [
    { value: "2+", label: "Years Exp." },
    { value: "30+", label: "Projects" },
    { value: "15+", label: "Clients" },
    { value: "99%", label: "Satisfaction" },
  ];

  const chips = [
    { icon: Code2, text: "Clean Code" },
    { icon: Palette, text: "Pixel Perfect" },
    { icon: Zap, text: "Fast Delivery" },
  ];

  const fadeUp = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: "#060010",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 60px",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "white",
      }}
    >
      {/* Particle canvas */}
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

      {/* Background blobs */}
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
            "radial-gradient(circle, rgba(245, 158, 11,0.14) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(245, 158, 11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Badge */}
            <div style={fadeUp(0)}>
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
                Available for Hire
                <Sparkles size={12} />
              </div>
            </div>

            {/* Heading */}
            <div
              style={{
                ...fadeUp(100),
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.1rem)",
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 500,
                  marginBottom: 8,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                👋 Hello, World!
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                }}
              >
                I'm{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #FCD34D 0%, #FCD34D 50%, #fb923c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Bihari Kumar Rawat
                </span>
              </h1>
            </div>

            {/* Typewriter role */}
            <div
              style={{
                ...fadeUp(200),
                height: 36,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontWeight: 700,
                  color: "#FCD34D",
                }}
              >
                {displayed}
                <span
                  style={{
                    borderRight: "2px solid #FCD34D",
                    marginLeft: 2,
                    animation: "blink 0.8s step-end infinite",
                  }}
                ></span>
              </span>
            </div>

            {/* Bio */}
            <p
              style={{
                ...fadeUp(300),
                color: "rgba(255,255,255,0.45)",
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: 480,
                margin: 0,
              }}
            >
              Passionate about building{" "}
              <span style={{ color: "rgba(196,132,252,0.9)", fontWeight: 600 }}>
                fast, beautiful & accessible
              </span>{" "}
              web experiences. I turn complex problems into clean, elegant
              solutions that users actually love.
            </p>

            {/* Chips */}
            <div
              style={{
                ...fadeUp(380),
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {chips.map(({ icon: Icon, text }) => (
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
                  <Icon size={13} style={{ color: "#FCD34D" }} />
                  {text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                ...fadeUp(460),
                display: "flex",
                gap: 14,
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
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "13px 28px",
                  borderRadius: 50,
                  boxShadow: "0 0 32px rgba(217, 119, 6,0.35)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 40px rgba(217, 119, 6,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 0 32px rgba(217, 119, 6,0.35)";
                }}
              >
                Get In Touch <ArrowRight size={17} />
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
                  fontSize: 15,
                  padding: "13px 28px",
                  borderRadius: 50,
                  border: "1.5px solid rgba(245, 158, 11,0.4)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11,0.8)";
                  e.currentTarget.style.background = "rgba(245, 158, 11,0.1)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(245, 158, 11,0.4)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }}
              >
                View Projects
              </a>
              <a
                href="/image/Bihari_kumar_rawat_2026.pdf"
                target="_blank"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
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
                <Download size={15} /> Resume
              </a>
            </div>

            {/* Socials */}
            <div
              style={{
                ...fadeUp(540),
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 12,
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
                  width: 24,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: 40,
                    height: 40,
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
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Profile + Stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              ...fadeUp(200),
            }}
          >
            {/* Profile Image */}
            <div style={{ position: "relative" }}>
              {/* Spinning ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -12,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 0deg, #D97706, #F59E0B, #f97316, #D97706)",
                  animation: "spin 6s linear infinite",
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

              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(245, 158, 11,0.4), transparent 70%)",
                  filter: "blur(24px)",
                  zIndex: 0,
                }}
              />

              {/* Image */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid rgba(245, 158, 11,0.4)",
                  boxShadow:
                    "0 0 60px rgba(217, 119, 6,0.4), inset 0 0 30px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Bihari Kumar Rawat"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Overlay shimmer */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(245, 158, 11,0.1) 0%, transparent 50%, rgba(245, 158, 11,0.08) 100%)",
                  }}
                />
              </div>

              {/* Floating badge — top right */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: -24,
                  zIndex: 3,
                  background: "rgba(10,0,24,0.9)",
                  border: "1px solid rgba(245, 158, 11,0.3)",
                  borderRadius: 12,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(12px)",
                  animation: "floatA 3s ease-in-out infinite",
                }}
              >
                <span style={{ fontSize: 18 }}>💻</span>
                <div>
                  <div
                    style={{ fontSize: 11, fontWeight: 700, color: "white" }}
                  >
                    Full Stack
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                    Developer
                  </div>
                </div>
              </div>

              {/* Floating badge — bottom left */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: -28,
                  zIndex: 3,
                  background: "rgba(10,0,24,0.9)",
                  border: "1px solid rgba(245, 158, 11,0.3)",
                  borderRadius: 12,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(12px)",
                  animation: "floatB 3.5s ease-in-out infinite",
                }}
              >
                <span style={{ fontSize: 18 }}>🎨</span>
                <div>
                  <div
                    style={{ fontSize: 11, fontWeight: 700, color: "white" }}
                  >
                    UI / UX
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                    Designer
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                padding: "4px",
                overflow: "hidden",
                width: "100%",
                maxWidth: 340,
              }}
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    textAlign: "center",
                    padding: "14px 8px",
                    borderRadius: 14,
                    background:
                      i === 0 ? "rgba(245, 158, 11,0.12)" : "transparent",
                    transition: "background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(245, 158, 11,0.12)")
                  }
                  onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    i === 0 ? "rgba(245, 158, 11,0.12)" : "transparent")
                  }
                >
                  <div
                    style={{
                      fontSize: "1.3rem",
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
                      fontSize: 10,
                      color: "rgba(255,255,255,0.4)",
                      fontWeight: 600,
                      marginTop: 2,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
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
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(255,255,255,0.25)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          animation: "fadeInUp 1s ease 1.5s both",
          zIndex: 1,
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: 22,
            height: 36,
            border: "1.5px solid rgba(255,255,255,0.15)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            padding: "5px 0",
          }}
        >
          <div
            style={{
              width: 3,
              height: 8,
              borderRadius: 2,
              background: "rgba(167,139,250,0.7)",
              animation: "scrollDot 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  );
}
