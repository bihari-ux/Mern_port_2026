import { useState, useEffect, useRef } from "react";
import {
  Code,
  Smartphone,
  Globe,
  Database,
  Paintbrush,
  Rocket,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Zap,
  Star,
  Clock,
  Users,
  Award,
  ChevronRight,
  Mail,
  MessageCircle,
} from "lucide-react";

// ── Animated number ───────────────────────────────────────────────────────────
function AnimatedNum({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let s = 0;
        const step = Math.max(1, Math.ceil(target / 55));
        const id = setInterval(() => {
          s += step;
          if (s >= target) {
            setVal(target);
            clearInterval(id);
          } else setVal(s);
        }, 22);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// ── Main Services Page ────────────────────────────────────────────────────────
export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const pageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (!pageRef.current) return;
      const r = pageRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const services = [
    {
      icon: Code,
      color: "#FCD34D",
      bgGlow: "#D97706",
      title: "Web Development",
      tagline: "Fast · Scalable · Modern",
      description:
        "Production-ready web applications built with React, Next.js, and TypeScript. From simple landing pages to complex enterprise SaaS platforms with full CI/CD pipelines.",
      features: [
        "React 18 & Next.js 14",
        "TypeScript & Clean Code",
        "SEO & Core Web Vitals",
        "PWA & Offline Support",
        "Lighthouse 95+ Score",
      ],
      deliverables: [
        "Source code + docs",
        "Deployed on Vercel/AWS",
        "3 revision rounds",
        "1 month free support",
      ],
      timeline: "2–6 weeks",
      price: "From ₹25,000",
      popular: false,
    },
    {
      icon: Smartphone,
      color: "#FCD34D",
      bgGlow: "#F59E0B",
      title: "Mobile Development",
      tagline: "iOS · Android · Cross-platform",
      description:
        "Beautiful, native-feeling mobile apps with React Native & Expo. Full lifecycle from concept to App Store submission with push notifications and offline support.",
      features: [
        "React Native + Expo",
        "iOS & Android Builds",
        "Push Notifications",
        "Offline & Local Storage",
        "App Store Submission",
      ],
      deliverables: [
        "App Store ready build",
        "Source code + CI setup",
        "2 platform support",
        "1 month post-launch",
      ],
      timeline: "4–10 weeks",
      price: "From ₹50,000",
      popular: false,
    },
    {
      icon: Globe,
      color: "#FCD34D",
      bgGlow: "#059669",
      title: "Full Stack Solutions",
      tagline: "End-to-End · Complete · Deployed",
      description:
        "Complete digital products from database schema to deployed frontend. REST & GraphQL APIs, auth flows, payment integration, admin dashboards, and real-time features.",
      features: [
        "Full REST / GraphQL APIs",
        "Auth (OAuth, JWT, MFA)",
        "Stripe / Razorpay Payments",
        "Real-time WebSockets",
        "Admin CMS Dashboard",
      ],
      deliverables: [
        "Full product delivery",
        "Staging + Production",
        "Infra setup & docs",
        "2 months support",
      ],
      timeline: "6–14 weeks",
      price: "From ₹75,000",
      popular: true,
    },
    {
      icon: Database,
      color: "#FCD34D",
      bgGlow: "#0284c7",
      title: "Backend Development",
      tagline: "Secure · Fast · Reliable",
      description:
        "Robust, scalable server-side systems. REST APIs, microservices, database design, caching strategies, and cloud infrastructure with Docker + AWS.",
      features: [
        "Node.js / NestJS APIs",
        "PostgreSQL & MongoDB",
        "Redis Caching Layer",
        "Docker + AWS Deploy",
        "API Rate Limiting & Security",
      ],
      deliverables: [
        "API docs (Swagger)",
        "Postman collection",
        "Docker configs",
        "Load test report",
      ],
      timeline: "3–8 weeks",
      price: "From ₹35,000",
      popular: false,
    },
    {
      icon: Paintbrush,
      color: "#e879f9",
      bgGlow: "#a21caf",
      title: "UI / UX Design",
      tagline: "Beautiful · Intuitive · Accessible",
      description:
        "User-first design that converts. Figma design systems, interactive prototypes, user journey mapping, A/B test designs, and WCAG 2.1 accessibility compliance.",
      features: [
        "Figma Design System",
        "Interactive Prototyping",
        "User Research & Testing",
        "WCAG 2.1 Accessibility",
        "Mobile-first Responsive",
      ],
      deliverables: [
        "Figma source files",
        "Design tokens",
        "Dev handoff ready",
        "2 revision rounds",
      ],
      timeline: "1–4 weeks",
      price: "From ₹15,000",
      popular: false,
    },
    {
      icon: Rocket,
      color: "#F59E0B",
      bgGlow: "#d97706",
      title: "Tech Consulting",
      tagline: "Strategy · Architecture · Growth",
      description:
        "Expert technical guidance for startups and growing teams. Architecture reviews, tech stack selection, code audits, performance deep-dives, and developer mentoring.",
      features: [
        "Architecture Design Review",
        "Tech Stack Selection",
        "Code & Security Audit",
        "Performance Optimization",
        "Team Mentoring & Training",
      ],
      deliverables: [
        "Written audit report",
        "Roadmap document",
        "Action item checklist",
        "Follow-up session",
      ],
      timeline: "1–2 weeks",
      price: "From ₹10,000",
      popular: false,
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Discovery Call",
      desc: "30-min free call to understand your vision, goals, and requirements.",
      icon: MessageCircle,
      color: "#FCD34D",
    },
    {
      num: "02",
      title: "Proposal & Quote",
      desc: "Detailed scope document with timeline, milestones, and fixed pricing.",
      icon: Award,
      color: "#FCD34D",
    },
    {
      num: "03",
      title: "Design & Build",
      desc: "Iterative development with weekly demos and open communication throughout.",
      icon: Code,
      color: "#FCD34D",
    },
    {
      num: "04",
      title: "Launch & Support",
      desc: "Deployment, handoff, documentation, and 1-month free bug fixes.",
      icon: Rocket,
      color: "#F59E0B",
    },
  ];

  const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered", icon: "💼" },
    { value: 20, suffix: "+", label: "Happy Clients", icon: "😊" },
    { value: 99, suffix: "%", label: "On-time Delivery", icon: "⚡" },
    { value: 5, suffix: "★", label: "Avg Rating", icon: "⭐" },
  ];

  const faqs = [
    {
      q: "Do you work with international clients?",
      a: "Yes! I work with clients across Europe, USA, UAE, and Asia. Fully async-friendly with flexible timezone scheduling.",
    },
    {
      q: "What's your payment structure?",
      a: "50% upfront, 50% on final delivery. For larger projects I offer milestone-based billing to reduce risk on both sides.",
    },
    {
      q: "Can you work with my existing team?",
      a: "Absolutely. I integrate smoothly into existing teams, follow your coding standards, and can work within your Jira/Linear/Notion workflow.",
    },
    {
      q: "Do you offer ongoing maintenance?",
      a: "Yes — I offer monthly retainer plans starting at ₹8,000/month for ongoing updates, bug fixes, and feature additions.",
    },
  ];

  const fu = (d = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${d}ms, transform 0.6s ease ${d}ms`,
  });

  const active = services[activeService];

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: "100vh",
        background: "#060010",
        color: "white",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Mouse glow */}
      <div
        style={{
          position: "fixed",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.07) 0%, transparent 65%)",
          left: mousePos.x - 350,
          top: mousePos.y - 350,
          pointerEvents: "none",
          zIndex: 0,
          transition: "left 0.5s ease, top 0.5s ease",
        }}
      />

      {/* BG blobs */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          right: "-8%",
          width: 520,
          height: 520,
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
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245, 158, 11,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Grid */}
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

      <section
        id="services"
        style={{ padding: "100px 24px 80px", position: "relative", zIndex: 1 }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* ── HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: 72, ...fu(0) }}>
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
              <Sparkles size={11} /> What I Offer
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
                Services
              </span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.05rem",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              From pixel-perfect UIs to bulletproof backends — I build complete
              digital products that users love and businesses rely on.
            </p>
          </div>

          {/* ── STATS ROW ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: 4,
              marginBottom: 80,
              overflow: "hidden",
              ...fu(80),
            }}
          >
            {stats.map(({ value, suffix, label, icon }) => (
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
                <div style={{ fontSize: "1.7rem", marginBottom: 6 }}>
                  {icon}
                </div>
                <div
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <AnimatedNum target={value} suffix={suffix} />
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

          {/* ── SERVICE CARDS GRID ── */}
          <div style={{ marginBottom: 80, ...fu(150) }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 32,
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
                ✦ All Services
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
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 16,
              }}
            >
              {services.map((svc, i) => {
                const Icon = svc.icon;
                const isHov = hoveredCard === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActiveService(i)}
                    style={{
                      background: isHov
                        ? `${svc.color}08`
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isHov ? svc.color + "45" : "rgba(255,255,255,0.07)"}`,
                      borderRadius: 22,
                      padding: "28px 26px",
                      transition: "all 0.3s ease",
                      transform: isHov ? "translateY(-5px)" : "translateY(0)",
                      boxShadow: isHov ? `0 20px 60px ${svc.color}18` : "none",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Popular badge */}
                    {svc.popular && (
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          background:
                            "linear-gradient(135deg, #f59e0b, #ef4444)",
                          borderRadius: 20,
                          padding: "4px 12px",
                          fontSize: 10,
                          fontWeight: 800,
                          color: "white",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Star size={9} fill="white" /> Most Popular
                      </div>
                    )}

                    {/* Corner glow */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: -24,
                        right: -24,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: svc.color + "12",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Icon */}
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        marginBottom: 20,
                        background: `${svc.color}18`,
                        border: `1px solid ${svc.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.3s ease",
                        transform: isHov
                          ? "scale(1.1) rotate(-4deg)"
                          : "scale(1) rotate(0deg)",
                        boxShadow: isHov ? `0 8px 24px ${svc.color}30` : "none",
                      }}
                    >
                      <Icon size={26} color={svc.color} />
                    </div>

                    {/* Title + tagline */}
                    <div style={{ marginBottom: 12 }}>
                      <h3
                        style={{
                          margin: "0 0 5px",
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: isHov ? "white" : "rgba(255,255,255,0.9)",
                          transition: "color 0.2s",
                        }}
                      >
                        {svc.title}
                      </h3>
                      <div
                        style={{
                          fontSize: 11,
                          color: svc.color,
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {svc.tagline}
                      </div>
                    </div>

                    <p
                      style={{
                        margin: "0 0 18px",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.48)",
                        lineHeight: 1.75,
                      }}
                    >
                      {svc.description}
                    </p>

                    {/* Features */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 7,
                        marginBottom: 20,
                      }}
                    >
                      {svc.features.map((f) => (
                        <div
                          key={f}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 9,
                          }}
                        >
                          <CheckCircle2
                            size={13}
                            color={svc.color}
                            style={{ flexShrink: 0 }}
                          />
                          <span
                            style={{
                              fontSize: 12.5,
                              color: "rgba(255,255,255,0.6)",
                              fontWeight: 500,
                            }}
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer — price + timeline */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 16,
                        borderTop: `1px solid ${svc.color}18`,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "rgba(255,255,255,0.3)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 2,
                          }}
                        >
                          Starting at
                        </div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 800,
                            color: svc.color,
                          }}
                        >
                          {svc.price}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: 10,
                            color: "rgba(255,255,255,0.3)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 2,
                          }}
                        >
                          Timeline
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {svc.timeline}
                        </div>
                      </div>
                    </div>

                    {/* Hover CTA */}
                    {isHov && (
                      <div
                        style={{
                          marginTop: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          background: `linear-gradient(135deg, ${svc.bgGlow}, ${svc.color})`,
                          borderRadius: 10,
                          padding: "10px",
                          fontSize: 13,
                          fontWeight: 700,
                          color: "white",
                          animation: "fadeIn 0.2s ease",
                        }}
                      >
                        Get a Quote <ArrowUpRight size={14} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── DETAILED SERVICE VIEWER ── */}
          <div style={{ marginBottom: 80, ...fu(200) }}>
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
                  color: active.color,
                }}
              >
                🔍 Service Deep Dive
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            </div>

            {/* Tab pills */}
            <div
              style={{
                display: "flex",
                gap: 6,
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              {services.map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveService(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: 50,
                      border: "none",
                      cursor: "pointer",
                      background:
                        activeService === i
                          ? `linear-gradient(135deg, ${svc.bgGlow}, ${svc.color})`
                          : "rgba(255,255,255,0.05)",
                      color:
                        activeService === i
                          ? "white"
                          : "rgba(255,255,255,0.45)",
                      fontSize: 12,
                      fontWeight: 700,
                      border: `1px solid ${activeService === i ? "transparent" : "rgba(255,255,255,0.08)"}`,
                      transition: "all 0.2s ease",
                      boxShadow:
                        activeService === i
                          ? `0 4px 16px ${svc.color}35`
                          : "none",
                    }}
                  >
                    <Icon size={13} /> {svc.title.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* Active service detail */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                background: `${active.color}07`,
                border: `1px solid ${active.color}30`,
                borderRadius: 24,
                padding: 32,
                boxShadow: `0 0 60px ${active.color}10`,
              }}
            >
              {/* Left */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        background: `${active.color}20`,
                        border: `1px solid ${active.color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <active.icon size={22} color={active.color} />
                    </div>
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.2rem",
                          fontWeight: 900,
                          color: "white",
                        }}
                      >
                        {active.title}
                      </h3>
                      <div
                        style={{
                          fontSize: 11,
                          color: active.color,
                          fontWeight: 700,
                        }}
                      >
                        {active.tagline}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.8,
                    }}
                  >
                    {active.description}
                  </p>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: 12,
                    }}
                  >
                    What's Included
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {active.features.map((f) => (
                      <div
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            background: `${active.color}18`,
                            border: `1px solid ${active.color}30`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <CheckCircle2 size={12} color={active.color} />
                        </div>
                        <span
                          style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.65)",
                            fontWeight: 500,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: 12,
                    }}
                  >
                    Deliverables
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {active.deliverables.map((d, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: 10,
                          padding: "10px 14px",
                        }}
                      >
                        <ChevronRight size={13} color={active.color} />
                        <span
                          style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.6)",
                            fontWeight: 500,
                          }}
                        >
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 14,
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <Clock
                      size={18}
                      color={active.color}
                      style={{ marginBottom: 8 }}
                    />
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 4,
                      }}
                    >
                      Timeline
                    </div>
                    <div
                      style={{ fontSize: 15, fontWeight: 800, color: "white" }}
                    >
                      {active.timeline}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 14,
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <Zap
                      size={18}
                      color={active.color}
                      style={{ marginBottom: 8 }}
                    />
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 4,
                      }}
                    >
                      Starting
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: active.color,
                      }}
                    >
                      {active.price}
                    </div>
                  </div>
                </div>

                <a
                  href="#contact"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: `linear-gradient(135deg, ${active.bgGlow}, ${active.color})`,
                    color: "white",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "14px",
                    borderRadius: 14,
                    boxShadow: `0 8px 28px ${active.color}35`,
                    transition: "all 0.25s ease",
                    marginTop: 4,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 16px 40px ${active.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 8px 28px ${active.color}35`;
                  }}
                >
                  <Mail size={15} /> Get a Custom Quote{" "}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* ── PROCESS STEPS ── */}
          <div style={{ marginBottom: 80, ...fu(250) }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: "0 0 10px",
                }}
              >
                How I{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Work
                </span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.95rem",
                  margin: 0,
                }}
              >
                A transparent, collaborative process from day one
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
                position: "relative",
              }}
            >
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${step.color}25`,
                      borderRadius: 20,
                      padding: "28px 24px",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${step.color}08`;
                      e.currentTarget.style.borderColor = `${step.color}45`;
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = `${step.color}25`;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Big number bg */}
                    <div
                      style={{
                        position: "absolute",
                        top: -10,
                        right: 10,
                        fontSize: "5rem",
                        fontWeight: 900,
                        color: "rgba(255,255,255,0.03)",
                        fontFamily: "monospace",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {step.num}
                    </div>
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 13,
                        background: `${step.color}18`,
                        border: `1px solid ${step.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <Icon size={20} color={step.color} />
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: step.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 8,
                      }}
                    >
                      Step {step.num}
                    </div>
                    <h4
                      style={{
                        margin: "0 0 8px",
                        fontSize: "1rem",
                        fontWeight: 800,
                        color: "white",
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div style={{ marginBottom: 80, ...fu(300) }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: "0 0 10px",
                }}
              >
                Common{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #FCD34D, #FCD34D)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Questions
                </span>
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
                gap: 10,
                maxWidth: 1000,
                margin: "0 auto",
              }}
            >
              {faqs.map((f, i) => (
                <FAQItem key={i} {...f} />
              ))}
            </div>
          </div>

          {/* ── CTA BANNER ── */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(217, 119, 6,0.2) 0%, rgba(245, 158, 11,0.15) 100%)",
              border: "1px solid rgba(245, 158, 11,0.25)",
              borderRadius: 28,
              padding: "60px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              ...fu(350),
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
                  "radial-gradient(circle, rgba(245, 158, 11,0.3) 0%, transparent 70%)",
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
                  "radial-gradient(circle, rgba(245, 158, 11,0.2) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "2.8rem", marginBottom: 16 }}>🚀</div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: "0 0 12px",
                }}
              >
                Ready to Start Your Project?
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "1rem",
                  maxWidth: 520,
                  margin: "0 auto 32px",
                  lineHeight: 1.8,
                }}
              >
                Book a free 30-min discovery call. No commitment — just a
                conversation about your goals. I'll tell you exactly what's
                possible and how long it'll take.
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
                    background: "linear-gradient(135deg, #D97706, #F59E0B)",
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
                  <Mail size={16} /> Book Free Call
                </a>
                <a
                  href="#projects"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 700,
                    padding: "14px 28px",
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
                  View My Work <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

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
          maxHeight: open ? 160 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          style={{
            margin: "12px 0 0",
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

const processSteps = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "30-min free call to understand your vision, goals, and requirements.",
    icon: MessageCircle,
    color: "#FCD34D",
  },
  {
    num: "02",
    title: "Proposal & Quote",
    desc: "Detailed scope document with timeline, milestones, and fixed pricing.",
    icon: Award,
    color: "#FCD34D",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Iterative development with weekly demos and open communication throughout.",
    icon: Code,
    color: "#FCD34D",
  },
  {
    num: "04",
    title: "Launch & Support",
    desc: "Deployment, handoff, documentation, and 1-month free bug fixes.",
    icon: Rocket,
    color: "#F59E0B",
  },
];
