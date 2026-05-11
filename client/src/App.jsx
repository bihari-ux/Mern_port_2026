import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TargetCursor from "./components/TargetCursor";

// ── Loader Screen ─────────────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const steps = [10, 25, 45, 65, 80, 95, 100];
    let i = 0;
    const id = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(id);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 600);
        }, 500);
      }
    }, 150);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)",
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23F59E0B\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* BGMI Style Logo / Badge */}
      <div style={{ position: "relative", width: 120, height: 120 }}>
        {/* Outer Spinning Ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px dashed rgba(245, 158, 11, 0.4)",
            animation: "spin 8s linear infinite",
          }}
        />
        {/* Inner Spinning Ring (Reverse) */}
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "#F59E0B",
            borderBottomColor: "#F59E0B",
            animation: "spin 3s linear infinite reverse",
          }}
        />
        {/* Hexagon Shield */}
        <div
          style={{
            position: "absolute",
            inset: 20,
            background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.05))",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            border: "2px solid #F59E0B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              color: "#FCD34D",
              fontFamily: "'DM Sans', sans-serif",
              textShadow: "0 0 10px rgba(245, 158, 11, 0.8)",
            }}
          >
            B
          </span>
        </div>
      </div>

      {/* Title Text */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 900,
            letterSpacing: "0.15em",
            color: "white",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          Bihari<span style={{ color: "#F59E0B" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#FCD34D",
            marginTop: 8,
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            textShadow: "0 0 8px rgba(245,158,11,0.5)",
          }}
        >
          Battleground Portfolio
        </div>
      </div>

      {/* Progress Bar Container */}
      <div style={{ width: 280 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          <span>Loading Resources...</span>
          <span style={{ color: "#F59E0B" }}>{progress}%</span>
        </div>
        <div
          style={{
            height: 6,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              background: "linear-gradient(90deg, #D97706, #F59E0B, #FFFBEB)",
              width: `${progress}%`,
              transition: "width 0.2s ease-out",
              boxShadow: "0 0 12px rgba(245,158,11,0.9)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Scroll Progress Bar ───────────────────────────────────────────────────────
function ScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setProg((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9998,
        background: "transparent",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #D97706, #F59E0B, #FCD34D)",
          width: `${prog}%`,
          transition: "width 0.1s ease",
          boxShadow: "0 0 10px rgba(245,158,11,0.6)",
        }}
      />
    </div>
  );
}

// ── Scroll to Top on Route Change ─────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// ── Page Transition Wrapper ───────────────────────────────────────────────────
function PageTransition({ children }) {
  const { pathname } = useLocation();

  return (
    <div
      key={pathname}
      style={{
        animation: "pageFadeIn 0.5s ease forwards",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {children}
    </div>
  );
}

// ── Floating Back-to-Top ───────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 1000,
        width: 46,
        height: 46,
        borderRadius: 13,
        background: "linear-gradient(135deg, #D97706, #F59E0B)",
        border: "none",
        color: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 900,
        boxShadow: "0 8px 24px rgba(245,158,11,0.45)",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        opacity: show ? 1 : 0,
        transform: show
          ? "translateY(0) scale(1)"
          : "translateY(12px) scale(0.85)",
        pointerEvents: show ? "all" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
        e.currentTarget.style.boxShadow = "0 14px 36px rgba(245,158,11,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,158,11,0.45)";
      }}
      title="Back to top"
    >
      ↑
    </button>
  );
}

// ── Route-based page title updater ────────────────────────────────────────────
function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles = {
      "/": "Bihari Kumar Rawat | MERN Stack Developer",
      "/about": "About | Bihari Kumar Rawat",
      "/projects": "Projects | Bihari Kumar Rawat",
      "/services": "Services | Bihari Kumar Rawat",
      "/contact": "Contact | Bihari Kumar Rawat",
      "/admin": "Admin Dashboard | Bihari Kumar Rawat",
    };
    document.title = titles[pathname] || "Bihari Kumar Rawat Portfolio";
  }, [pathname]);
  return null;
}

// ── Inner App (needs Router context) ─────────────────────────────────────────
function AppInner() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <PageTitle />
      <ScrollProgress />
      <TargetCursor
        targetSelector="button, a, .cursor-target, [role='button'], input[type='button'], input[type='submit'], input[type='reset'], summary, label[for]"
        spinDuration={2}
        hideDefaultCursor
        hoverDuration={0.2}
        parallaxOn
      />

      {/* Fixed navbar */}
      <Navbar />

      {/* Page content with top padding for fixed navbar */}
      <main style={{ flex: 1, paddingTop: 68, display: "flex", flexDirection: "column" }}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        html {
          scroll-behavior: smooth;
          cursor: none;
        }

        body {
          margin: 0;
          padding: 0;
          background: #060010;
          color: white;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          cursor: none;
        }

        a, button, input, summary, label { cursor: none; }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(#D97706, #F59E0B);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #FCD34D; }

        /* Text selection */
        ::selection {
          background: rgba(245, 158, 11, 0.28);
          color: white;
        }

        /* Remove default outline, add custom */
        :focus-visible {
          outline: 2px solid #F59E0B;
          outline-offset: 3px;
          border-radius: 4px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Smooth image loading */
        img {
          display: block;
          max-width: 100%;
        }

        @media (max-width: 767px) {
          html, body, a, button, input, summary, label {
            cursor: auto;
          }
        }
      `}</style>

      {loading && <Loader onDone={() => setLoading(false)} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.4s ease 0.1s",
        }}
      >
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
