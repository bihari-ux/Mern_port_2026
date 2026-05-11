import {
  Send,
  Mail,
  MapPin,
  Phone,
  Globe as Github,
  AtSign as Linkedin,
  Bird as Twitter,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  MessageCircle,
  Zap,
  Globe,
  Coffee,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: open ? "rgba(245, 158, 11,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${open ? "rgba(245, 158, 11,0.35)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14,
        padding: "16px 20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: open ? "white" : "rgba(255,255,255,0.7)",
          }}
        >
          {q}
        </span>
        <span
          style={{
            fontSize: 18,
            color: "#FCD34D",
            flexShrink: 0,
            lineHeight: 1,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          style={{
            margin: "12px 0 0",
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    budget: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1800);
    setTimeout(() => setSent(false), 5000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const contactCards = [
    {
      icon: Mail,
      label: "Email Me",
      value: "biharikumarrawat123@gmail.com",
      sub: "Typically replies in 2–4 hours",
      href: "mailto:biharikumarrawat123@gmail.com",
      color: "#FCD34D",
    },
    {
      icon: Phone,
      label: "Call / WhatsApp",
      value: "+91 9262645718",
      sub: "Mon–Fri, 10am–7pm IST",
      href: "tel:+919262645718",
      color: "#FCD34D",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India 🇮🇳",
      sub: "Open to remote worldwide",
      href: "#",
      color: "#FCD34D",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "< 24 Hours",
      sub: "Guaranteed first reply",
      href: "#",
      color: "#F59E0B",
    },
  ];

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
      color: "#e2e8f0",
      user: "Profile available on request",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
      color: "#60a5fa",
      user: "Bihari Kumar Rawat",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com",
      color: "#FCD34D",
      user: "Updates coming soon",
    },
  ];

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      desc: "Full-stack apps with React, Next.js, Node.js",
    },
    {
      icon: Sparkles,
      title: "UI/UX Design",
      desc: "Figma designs, prototypes, design systems",
    },
    {
      icon: Zap,
      title: "Performance Audit",
      desc: "Lighthouse, Core Web Vitals optimization",
    },
    {
      icon: Coffee,
      title: "Consultation",
      desc: "Tech stack advice, code reviews, mentoring",
    },
  ];

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "Small projects take 1–2 weeks. Mid-size web apps usually 4–8 weeks. Larger products are scoped after an initial call.",
    },
    {
      q: "Do you work with international clients?",
      a: "Absolutely! I work with clients across Europe, USA, Middle East, and Asia. I'm comfortable with async communication and flexible scheduling.",
    },
    {
      q: "What is your development process?",
      a: "Discovery → Design → Development → Testing → Launch → Support. I keep you in the loop at every step with regular demos and updates.",
    },
    {
      q: "Do you offer post-launch support?",
      a: "Yes! I offer 1-month free bug fixes post-launch, and optional monthly maintenance packages for ongoing support.",
    },
    {
      q: "What are your payment terms?",
      a: "Typically 50% upfront, 50% on delivery. For larger projects I offer milestone-based billing. I accept bank transfer, PayPal, and UPI.",
    },
  ];

  const projectTypes = [
    "Web App",
    "E-Commerce",
    "Portfolio",
    "Dashboard",
    "Mobile App",
    "API / Backend",
    "UI/UX Design",
    "Other",
  ];
  const budgets = [
    "< ₹25,000",
    "₹25k – ₹75k",
    "₹75k – ₹2L",
    "₹2L – ₹5L",
    "₹5L+",
    "Let's Discuss",
  ];

  const fadeUp = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  });

  const inputStyle = (name) => ({
    width: "100%",
    boxSizing: "border-box",
    background:
      focused === name ? "rgba(245, 158, 11,0.07)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === name ? "rgba(245, 158, 11,0.5)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 12,
    padding: "13px 16px",
    color: "white",
    fontSize: 14,
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  });

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #081923 0%, #0c2634 100%)",
        color: "white",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: "100px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Mouse glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.1) 0%, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          pointerEvents: "none",
          transition: "left 0.4s ease, top 0.4s ease",
          zIndex: 0,
        }}
      />

      {/* Static blobs */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "-6%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-6%",
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
        <div style={{ textAlign: "center", marginBottom: 72, ...fadeUp(0) }}>
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
            <MessageCircle size={11} /> Let's Connect
          </div>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: "0 0 16px",
            }}
          >
            Get In{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #F59E0B, #D97706, #FCD34D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Touch
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
            Have a project in mind? Let's build something amazing together. I
            respond to every message personally.
          </p>
        </div>

        {/* ── CONTACT CARDS ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginBottom: 64,
            ...fadeUp(100),
          }}
        >
          {contactCards.map(
            ({ icon: Icon, label, value, sub, href, color }) => (
              <a
                key={label}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "16px 18px",
                  textDecoration: "none",
                  color: "white",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = color + "10";
                  e.currentTarget.style.borderColor = color + "40";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 12px 32px ${color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    flexShrink: 0,
                    background: color + "18",
                    border: `1px solid ${color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} color={color} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "white",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      marginTop: 2,
                    }}
                  >
                    {sub}
                  </div>
                </div>
              </a>
            ),
          )}
        </div>

        {/* ── MAIN GRID: Form + Sidebar ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 32,
            marginBottom: 72,
            alignItems: "start",
          }}
        >
          {/* FORM */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: 36,
              backdropFilter: "blur(20px)",
              ...fadeUp(150),
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  margin: "0 0 6px",
                }}
              >
                Send a Message
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 13,
                  margin: 0,
                }}
              >
                Fill in the details below and I'll get back to you within 24
                hours.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              {/* Name + Email row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                {[
                  {
                    name: "name",
                    label: "Your Name",
                    placeholder: "Rahul Sharma",
                  },
                  {
                    name: "email",
                    label: "Email Address",
                    placeholder: "rahul@email.com",
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color:
                          focused === f.name
                            ? "#FCD34D"
                            : "rgba(255,255,255,0.4)",
                        marginBottom: 7,
                        transition: "color 0.2s",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      placeholder={f.placeholder}
                      value={formData[f.name]}
                      onChange={handleChange}
                      onFocus={() => setFocused(f.name)}
                      onBlur={() => setFocused(null)}
                      style={inputStyle(f.name)}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Project Type */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color:
                      focused === "type" ? "#FCD34D" : "rgba(255,255,255,0.4)",
                    marginBottom: 7,
                    transition: "color 0.2s",
                  }}
                >
                  Project Type
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {projectTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, type: t }))}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "7px 14px",
                        borderRadius: 8,
                        border: `1px solid ${formData.type === t ? "rgba(245, 158, 11,0.6)" : "rgba(255,255,255,0.08)"}`,
                        background:
                          formData.type === t
                            ? "rgba(245, 158, 11,0.18)"
                            : "rgba(255,255,255,0.03)",
                        color:
                          formData.type === t
                            ? "#FCD34D"
                            : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color:
                      focused === "budget"
                        ? "#FCD34D"
                        : "rgba(255,255,255,0.4)",
                    marginBottom: 7,
                  }}
                >
                  Budget Range
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, budget: b }))}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "7px 14px",
                        borderRadius: 8,
                        border: `1px solid ${formData.budget === b ? "rgba(244,114,182,0.6)" : "rgba(255,255,255,0.08)"}`,
                        background:
                          formData.budget === b
                            ? "rgba(244,114,182,0.12)"
                            : "rgba(255,255,255,0.03)",
                        color:
                          formData.budget === b
                            ? "#f9a8d4"
                            : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color:
                      focused === "message"
                        ? "#FCD34D"
                        : "rgba(255,255,255,0.4)",
                    marginBottom: 7,
                    transition: "color 0.2s",
                  }}
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project — the problem you're solving, timeline, any tech preferences..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{ ...inputStyle("message"), resize: "vertical" }}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || sent}
                style={{
                  padding: "15px 24px",
                  borderRadius: 12,
                  border: "none",
                  cursor: sent || sending ? "default" : "pointer",
                  background: sent
                    ? "linear-gradient(135deg, #FCD34D, #059669)"
                    : sending
                      ? "rgba(245, 158, 11,0.3)"
                      : "linear-gradient(135deg, #D97706, #D97706)",
                  color: "white",
                  fontSize: 15,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "all 0.3s ease",
                  boxShadow: sent
                    ? "0 8px 24px rgba(252, 211, 77,0.3)"
                    : "0 8px 24px rgba(217, 119, 6,0.3)",
                }}
                onMouseEnter={(e) => {
                  if (!sent && !sending) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 36px rgba(217, 119, 6,0.45)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={18} /> Message Sent! I'll reply soon 🎉
                  </>
                ) : sending ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        animation: "spin 0.8s linear infinite",
                      }}
                    >
                      ⟳
                    </span>{" "}
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={17} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* SIDEBAR */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              ...fadeUp(200),
            }}
          >
            {/* Services I offer */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "24px 22px",
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.35)",
                  margin: "0 0 16px",
                }}
              >
                Services I Offer
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {services.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        background: "rgba(245, 158, 11,0.15)",
                        border: "1px solid rgba(245, 158, 11,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} color="#FCD34D" />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "white",
                          marginBottom: 2,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.35)",
                          lineHeight: 1.5,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              style={{
                background: "rgba(252, 211, 77,0.07)",
                border: "1px solid rgba(252, 211, 77,0.2)",
                borderRadius: 16,
                padding: "18px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      width: 9,
                      height: 9,
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
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#FCD34D" }}
                >
                  Available for New Projects
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                }}
              >
                Currently accepting freelance & full-time opportunities. Next
                available slot:{" "}
                <strong style={{ color: "#FCD34D" }}>Immediately</strong>
              </p>
            </div>

            {/* Social links */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "20px 22px",
              }}
            >
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.35)",
                  margin: "0 0 14px",
                }}
              >
                Find Me On
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {socials.map(({ icon: Icon, label, href, color, user }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = color + "12";
                      e.currentTarget.style.borderColor = color + "40";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                    }}
                  >
                    <Icon size={16} color={color} />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {user}
                      </div>
                    </div>
                    <ArrowUpRight size={14} color="rgba(255,255,255,0.2)" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: 72, ...fadeUp(250) }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                margin: "0 0 10px",
              }}
            >
              Frequently Asked{" "}
              <span style={{ color: "#FCD34D" }}>Questions</span>
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              Everything you need to know before reaching out
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
              gap: 10,
              maxWidth: 1320,
              margin: "0 auto",
              width: "100%",
            }}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>

        {/* ── FINAL CTA BANNER ── */}
        <div
          style={{
            ...fadeUp(300),
            background:
              "linear-gradient(135deg, rgba(217, 119, 6,0.2) 0%, rgba(245, 158, 11,0.15) 100%)",
            border: "1px solid rgba(245, 158, 11,0.25)",
            borderRadius: 28,
            padding: "52px 40px",
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
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245, 158, 11,0.3) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(245, 158, 11,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>🤝</div>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                margin: "0 0 12px",
              }}
            >
              Ready to Start Your Project?
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "1rem",
                maxWidth: 500,
                margin: "0 auto 28px",
                lineHeight: 1.7,
              }}
            >
              Don't wait — let's schedule a free 30-minute discovery call. No
              commitment, just a conversation about your vision.
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
                href="mailto:biharikumarrawat123@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "linear-gradient(135deg, #D97706, #D97706)",
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
                <Mail size={15} /> Email Me Now
              </a>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  padding: "13px 28px",
                  borderRadius: 50,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
              >
                <ArrowUpRight size={15} /> Book a Free Call
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(1.6); } }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
      `}</style>
    </section>
  );
}
