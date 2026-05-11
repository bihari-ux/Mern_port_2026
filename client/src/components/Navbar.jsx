import { Menu, X, Code2, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRef = useRef(null);
  const linkRefs = useRef({});

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const moveIndicator = (name) => {
    const el = linkRefs.current[name];
    const nav = navRef.current;
    if (!el || !nav) return;
    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    setActiveIndicator({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  };

  const hideIndicator = () => setActiveIndicator((p) => ({ ...p, opacity: 0 }));

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(6,0,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(245, 158, 11,0.15)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "linear-gradient(135deg, #D97706, #D97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(217, 119, 6,0.5)",
                flexShrink: 0,
              }}
            >
              <Code2 size={17} color="white" />
            </div>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "white",
              }}
            >
              Bihari<span style={{ color: "#F59E0B" }}>.</span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div
            ref={navRef}
            style={{
              display: "none",
              alignItems: "center",
              gap: 4,
              position: "relative",
            }}
            className="desktop-nav"
            onMouseLeave={hideIndicator}
          >
            {/* Hover indicator */}
            <div
              style={{
                position: "absolute",
                bottom: -2,
                height: 2,
                borderRadius: 2,
                background: "linear-gradient(90deg, #F59E0B, #D97706)",
                left: activeIndicator.left,
                width: activeIndicator.width,
                opacity: activeIndicator.opacity,
                transition:
                  "left 0.25s ease, width 0.25s ease, opacity 0.2s ease",
                pointerEvents: "none",
              }}
            />

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                ref={(el) => (linkRefs.current[link.name] = el)}
                onMouseEnter={() => moveIndicator(link.name)}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#FCD34D" : "rgba(255,255,255,0.6)",
                  padding: "8px 14px",
                  borderRadius: 8,
                  transition: "color 0.2s ease",
                  position: "relative",
                })}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: -14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: "#F59E0B",
                          boxShadow: "0 0 8px #F59E0B",
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side — CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="/image/bihari_kumar_rawat.jpeg"
              alt="Bihari"
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                objectFit: "cover",
                border: "2px solid rgba(245,158,11,0.18)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                flexShrink: 0,
              }}
            />
            {/* Hire Me badge — desktop only */}
            <a
              href="/contact"
              className="hire-btn"
              style={{
                display: "none",
                alignItems: "center",
                gap: 6,
                background: "linear-gradient(135deg, #D97706, #D97706)",
                color: "white",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.02em",
                padding: "8px 18px",
                borderRadius: 50,
                boxShadow: "0 0 20px rgba(217, 119, 6,0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(217, 119, 6,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(217, 119, 6,0.35)";
              }}
            >
              <Sparkles size={13} />
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hamburger-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245, 158, 11,0.2)";
                e.currentTarget.style.borderColor = "rgba(245, 158, 11,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
              aria-label="Toggle menu"
            >
              <div
                style={{
                  transition: "transform 0.3s ease, opacity 0.2s ease",
                  position: "absolute",
                  opacity: isOpen ? 0 : 1,
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                <Menu size={20} />
              </div>
              <div
                style={{
                  transition: "transform 0.3s ease, opacity 0.2s ease",
                  position: "absolute",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                }}
              >
                <X size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? 400 : 0,
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: "rgba(6,0,16,0.97)",
          borderTop: isOpen ? "1px solid rgba(245, 158, 11,0.15)" : "none",
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ padding: "16px 24px 24px" }}>
          {/* Mobile header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#FCD34D",
                boxShadow: "0 0 8px #FCD34D",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Navigation
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map((link, i) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 10,
                  color: isActive ? "#FCD34D" : "rgba(255,255,255,0.6)",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 15,
                  background: isActive
                    ? "rgba(245, 158, 11,0.12)"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(245, 158, 11,0.25)"
                    : "1px solid transparent",
                  transition: "all 0.2s ease",
                  animationDelay: `${i * 60}ms`,
                })}
              >
                {({ isActive }) => (
                  <>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: isActive
                          ? "#F59E0B"
                          : "rgba(255,255,255,0.2)",
                        boxShadow: isActive ? "0 0 8px #F59E0B" : "none",
                        transition: "all 0.2s",
                      }}
                    />
                    {link.name}
                    {isActive && (
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: 11,
                          color: "#F59E0B",
                          background: "rgba(245, 158, 11,0.15)",
                          padding: "2px 8px",
                          borderRadius: 20,
                          fontWeight: 600,
                        }}
                      >
                        Current
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile CTA */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg, #D97706, #D97706)",
                color: "white",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 700,
                padding: "13px",
                borderRadius: 12,
                width: "100%",
                boxShadow: "0 8px 24px rgba(217, 119, 6,0.35)",
              }}
            >
              <Sparkles size={15} />
              Let's Work Together
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hire-btn { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
