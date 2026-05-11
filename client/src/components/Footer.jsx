import {
  Globe as Github,
  AtSign as Linkedin,
  Bird as Twitter,
  Mail,
  Heart,
  ArrowUpRight,
  Code2,
  Sparkles,
  Coffee,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { API_BASE } from "../utils/api";

export default function Footer() {
  const [year] = useState(new Date().getFullYear());
  const [scrollTop, setScrollTop] = useState(false);
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subMessage, setSubMessage] = useState("");
  const footerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // (Removed padding logic as footer is no longer fixed)
  useEffect(() => {
    try {
      document.body.style.paddingBottom = "";
    } catch (e) { }
  }, []);

  const socialLinks = [
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
    {
      icon: Mail,
      href: "mailto:biharikumarrawat123@gmail.com",
      label: "Email",
      color: "#FCD34D",
    },
  ];

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    "Frontend Development",
    "UI / UX Design",
    "React & Next.js",
    "API Integration",
    "Performance Optimization",
  ];

  const techStack = [
    "React",
    "Next.js",
    "Tailwind",
    "Node.js",
    "TypeScript",
    "Figma",
  ];

  return (
    <footer
      ref={footerRef}
      style={{
        position: "relative",
        width: "100%",
        zIndex: 999,
        background: "linear-gradient(to bottom, #081923, #0d2632)",
        borderTop: "1px solid rgba(245, 158, 11,0.16)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* BG glow blobs */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: "10%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          right: "5%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* CTA Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(217, 119, 6,0.2) 0%, rgba(245, 158, 11,0.15) 100%)",
          borderBottom: "1px solid rgba(245, 158, 11,0.2)",
          padding: "40px 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(245, 158, 11,0.15)",
              border: "1px solid rgba(245, 158, 11,0.3)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 16,
              fontSize: 12,
              color: "#FCD34D",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <Sparkles size={11} /> Open to Opportunities
          </div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
              background:
                "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Got a Project in Mind?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "1rem",
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Bihari Kumar Rawat is available for MERN stack projects and junior developer roles. Let's build something practical and fast together.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #D97706, #D97706)",
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              padding: "12px 28px",
              borderRadius: 50,
              letterSpacing: "0.02em",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(217, 119, 6,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Let's Talk <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* Main Footer Grid (full-bleed) */}
      <div style={{ width: "100%", padding: "48px 24px 24px", boxSizing: "border-box" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Brand Col */}
          <div style={{ gridColumn: "span 1" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #D97706, #D97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={18} color="white" />
              </div>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Bihari Rawat<span style={{ color: "#F59E0B" }}>.</span>
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                lineHeight: 1.75,
                marginBottom: 20,
              }}
            >
              Full-stack developer & designer crafting modern, high-performance
              web experiences that users love.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
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
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = color;
                    e.currentTarget.style.borderColor = color + "40";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#F59E0B";
                      e.currentTarget.style.paddingLeft = "6px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#D97706",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Services
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {services.map((s) => (
                <li
                  key={s}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 14,
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#F59E0B",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack + Status */}
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.35)",
                marginBottom: 20,
                marginTop: 0,
              }}
            >
              Tech Stack
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 28,
              }}
            >
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(245, 158, 11,0.12)",
                    border: "1px solid rgba(245, 158, 11,0.2)",
                    color: "#c4b5fd",
                    borderRadius: 8,
                    padding: "4px 10px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Status */}
            <div
              style={{
                background: "rgba(252, 211, 77,0.07)",
                border: "1px solid rgba(252, 211, 77,0.2)",
                borderRadius: 12,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#FCD34D",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -3,
                    borderRadius: "50%",
                    background: "rgba(252, 211, 77,0.3)",
                    animation: "pulse 2s infinite",
                  }}
                />
              </div>
              <div>
                <div
                  style={{ fontSize: 12, fontWeight: 600, color: "#FCD34D" }}
                >
                  Available for Work
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 1,
                  }}
                >
                  Freelance & Full-time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter (simple) */}
        <div
          style={{
            width: "100%",
            padding: "12px 24px",
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        >
          <div style={{ flex: "1 1 320px", minWidth: 220 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Join the Newsletter
            </div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
              Subscribe for updates about projects and availability.
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSubMessage("");
              if (!subscriberEmail) {
                setSubMessage("Please enter your email");
                return;
              }
              setSubmitting(true);
              try {
                const res = await fetch(`${API_BASE}/subscriptions`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: subscriberName, email: subscriberEmail }),
                });
                const data = await res.json();
                if (res.ok) {
                  setSubMessage(data.message || "Subscribed successfully");
                  setSubscriberName("");
                  setSubscriberEmail("");
                  // show preview URL if available (dev Ethereal)
                  if (data.previewUrls && data.previewUrls.length) {
                    const urls = data.previewUrls.map((p) => `${p.type}: ${p.url}`).join("\n");
                    console.info("Email preview URLs:\n", urls);
                    setSubMessage((prev) => prev + " (email preview in server logs)");
                  }
                } else {
                  setSubMessage(data.message || "Subscription failed");
                }
              } catch (err) {
                setSubMessage("Subscription failed");
              } finally {
                setSubmitting(false);
              }
            }}
            style={{ display: "flex", gap: 8, alignItems: "center", flex: "0 1 420px" }}
          >
            <input
              type="text"
              placeholder="Your name (optional)"
              value={subscriberName}
              onChange={(e) => setSubscriberName(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "white",
                minWidth: 140,
                flex: "1 1 160px",
              }}
            />
            <input
              type="email"
              placeholder="Email address"
              value={subscriberEmail}
              onChange={(e) => setSubscriberEmail(e.target.value)}
              required
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "white",
                flex: "1 1 200px",
              }}
            />
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg, #D97706, #D97706)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {submitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <div style={{ width: "100%", marginTop: 8, color: "#a5f3fc" }}>
            {subMessage && <span style={{ color: "#bae6fd" }}>{subMessage}</span>}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 28,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            © {year} Bihari Kumar Rawat. Made with
            <Heart size={13} style={{ color: "#FCD34D", display: "inline" }} />
            and{" "}
            <Coffee size={13} style={{ color: "#fb923c", display: "inline" }} />
            in India 🇮🇳
          </p>

          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 12,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F59E0B")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                }
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      {scrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 99,
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, #D97706, #D97706)",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            boxShadow: "0 8px 24px rgba(217, 119, 6,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-3px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
          title="Back to top"
        >
          ↑
        </button>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.6); }
        }
      `}</style>
    </footer>
  );
}
