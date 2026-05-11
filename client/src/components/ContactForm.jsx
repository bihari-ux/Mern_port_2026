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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

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
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "biharikumarrawat123@gmail.com",
      href: "mailto:biharikumarrawat123@gmail.com",
      color: "#FCD34D",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9262645718",
      href: "tel:+919262645718",
      color: "#FCD34D",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India 🇮🇳",
      href: "#",
      color: "#FCD34D",
    },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  ];

  const fields = [
    {
      name: "name",
      label: "Your Name",
      type: "input",
      placeholder: "Rahul Sharma",
    },
    {
      name: "email",
      label: "Email Address",
      type: "input",
      placeholder: "rahul@example.com",
    },
    {
      name: "subject",
      label: "Subject",
      type: "input",
      placeholder: "Project Collaboration / Freelance / Just Hello",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder:
        "Tell me about your project, idea or just say hi! I read every message...",
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        background: "#060010",
        color: "white",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px",
      }}
    >
      {/* Animated glow that follows cursor */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.12) 0%, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          pointerEvents: "none",
          transition: "left 0.3s ease, top 0.3s ease",
          zIndex: 0,
        }}
      />

      {/* Static BG blobs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          left: -80,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Noise grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
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
              gap: 8,
              background: "rgba(245, 158, 11,0.15)",
              border: "1px solid rgba(245, 158, 11,0.3)",
              borderRadius: 100,
              padding: "6px 16px",
              marginBottom: 20,
              fontSize: 13,
              color: "#FCD34D",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <Sparkles size={13} />
            Available for Work
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "0 0 20px",
            }}
          >
            Let's Build Something{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #FCD34D 0%, #FCD34D 50%, #fb923c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Amazing Together
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "1.1rem",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Whether it's a freelance project, full-time opportunity, or just a
            conversation — my inbox is always open.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* LEFT PANEL */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Contact Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {contactLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 16,
                      padding: "16px 20px",
                      textDecoration: "none",
                      color: "white",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.07)";
                      e.currentTarget.style.borderColor = item.color + "40";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.07)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: item.color + "15",
                        border: `1px solid ${item.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={item.color} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: 2,
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>
                        {item.value}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      style={{
                        marginLeft: "auto",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    />
                  </a>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Find me on
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                }}
              />
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(245, 158, 11,0.15)";
                      e.currentTarget.style.borderColor =
                        "rgba(245, 158, 11,0.4)";
                      e.currentTarget.style.color = "#FCD34D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    }}
                  >
                    <Icon size={17} />
                    <span>{s.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Response time badge */}
            <div
              style={{
                background: "rgba(252, 211, 77,0.08)",
                border: "1px solid rgba(252, 211, 77,0.2)",
                borderRadius: 12,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
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
                  style={{ fontSize: 13, fontWeight: 600, color: "#FCD34D" }}
                >
                  Usually responds within 24 hours
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 2,
                  }}
                >
                  Currently open to new projects
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: 32,
              backdropFilter: "blur(20px)",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                marginBottom: 6,
                marginTop: 0,
              }}
            >
              Send a Message
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                marginBottom: 28,
                marginTop: 0,
              }}
            >
              Fill in the form and I'll get back to you ASAP.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              {fields.map((field) => {
                const isActive = focused === field.name;
                const hasVal = formData[field.name]?.length > 0;
                const inputStyle = {
                  width: "100%",
                  boxSizing: "border-box",
                  background: isActive
                    ? "rgba(245, 158, 11,0.06)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? "rgba(245, 158, 11,0.5)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 12,
                  padding: "13px 16px",
                  color: "white",
                  fontSize: 15,
                  outline: "none",
                  transition: "all 0.2s ease",
                  resize: "vertical",
                };
                return (
                  <div key={field.name} style={{ position: "relative" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: isActive ? "#FCD34D" : "rgba(255,255,255,0.5)",
                        marginBottom: 7,
                        transition: "color 0.2s",
                      }}
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        rows={5}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                        style={{ ...inputStyle, fontFamily: "inherit" }}
                      />
                    ) : (
                      <input
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field.name)}
                        onBlur={() => setFocused(null)}
                        style={inputStyle}
                      />
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                style={{
                  marginTop: 6,
                  padding: "15px 24px",
                  background: sent
                    ? "linear-gradient(135deg, #FCD34D, #059669)"
                    : "linear-gradient(135deg, #D97706, #F59E0B)",
                  border: "none",
                  borderRadius: 12,
                  color: "white",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "all 0.3s ease",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (!sent)
                    e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(217, 119, 6,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {sent ? (
                  <>✓ Message Sent! Talk soon 🎉</>
                ) : (
                  <>
                    <Send size={17} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        * { box-sizing: border-box; }
      `}</style>
    </section>
  );
}
