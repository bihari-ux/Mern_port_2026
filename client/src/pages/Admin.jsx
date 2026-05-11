import { useEffect, useMemo, useState } from "react";
import {
  FolderKanban,
  Mail,
  ShieldCheck,
  Wrench,
  LogOut,
  Save,
  Trash2,
  Pencil,
  CheckCircle2,
  RefreshCw,
  LayoutDashboard,
  Users
} from "lucide-react";
import { apiRequest } from "../utils/api";

const shell = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #071822 0%, #0a2230 48%, #0f2b3b 100%)",
  color: "white",
  fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  padding: "110px clamp(20px, 3vw, 38px) 60px",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 24,
  backdropFilter: "blur(18px)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.18)",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "12px 14px",
  color: "white",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
};

const buttonBase = {
  border: "none",
  borderRadius: 12,
  padding: "11px 16px",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
};

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "rgba(245, 158, 11,0.12)",
            border: "1px solid rgba(245, 158, 11,0.24)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} color="#FCD34D" />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{title}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

function parseCsv(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function Admin() {
  const [mode, setMode] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("adminUser");
    return raw ? JSON.parse(raw) : null;
  });
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState("");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    githubLink: "",
    liveLink: "",
    techStack: "",
    tag: "",
    color: "#F59E0B",
    year: "",
    stars: "",
    featured: false,
    highlights: "",
  });
  const [skillForm, setSkillForm] = useState({
    name: "",
    level: "",
    icon: "",
    category: "Frontend",
    description: "",
    techs: "",
    color: "#F59E0B",
  });

  const isAuthed = useMemo(() => Boolean(token), [token]);

  const setSession = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem("adminToken", nextToken);
    localStorage.setItem("adminUser", JSON.stringify(nextUser));
  };

  const clearSession = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  };

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const requests = [apiRequest("/projects"), apiRequest("/skills"), apiRequest("/messages")];
      if (isAuthed) requests.push(apiRequest("/subscriptions"));
      const results = await Promise.all(requests);
      const [projectData, skillData, messageData, subsData] = results;
      setProjects(projectData || []);
      setSkills(skillData || []);
      setMessages(messageData || []);
      if (isAuthed) setSubscriptions(subsData || []);
    } catch (error) {
      setFlash(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      loadDashboard();
    }
  }, [isAuthed]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login"
          ? { email: authForm.email, password: authForm.password }
          : authForm;
      const result = await apiRequest(path, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (mode === "register") {
        setMode("login");
        setFlash("Admin registered successfully. Please login now.");
      } else {
        setSession(result.token, result.user);
        setFlash("Admin login successful.");
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...projectForm,
      techStack: parseCsv(projectForm.techStack),
      highlights: parseCsv(projectForm.highlights),
    };

    const path = editingProjectId
      ? `/projects/${editingProjectId}`
      : "/projects";
    const method = editingProjectId ? "PUT" : "POST";

    try {
      await apiRequest(path, {
        method,
        body: JSON.stringify(payload),
      });
      setFlash(editingProjectId ? "Project updated." : "Project created.");
      setEditingProjectId(null);
      setProjectForm({
        title: "",
        description: "",
        image: "",
        githubLink: "",
        liveLink: "",
        techStack: "",
        tag: "",
        color: "#F59E0B",
        year: "",
        stars: "",
        featured: false,
        highlights: "",
      });
      loadDashboard();
    } catch (error) {
      setFlash(error.message);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...skillForm,
      techs: parseCsv(skillForm.techs),
    };

    const path = editingSkillId ? `/skills/${editingSkillId}` : "/skills";
    const method = editingSkillId ? "PUT" : "POST";

    try {
      await apiRequest(path, {
        method,
        body: JSON.stringify(payload),
      });
      setFlash(editingSkillId ? "Skill updated." : "Skill created.");
      setEditingSkillId(null);
      setSkillForm({
        name: "",
        level: "",
        icon: "",
        category: "Frontend",
        description: "",
        techs: "",
        color: "#F59E0B",
      });
      loadDashboard();
    } catch (error) {
      setFlash(error.message);
    }
  };

  const editProject = (project) => {
    setEditingProjectId(project._id);
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
      techStack: (project.techStack || []).join(", "),
      tag: project.tag || "",
      color: project.color || "#F59E0B",
      year: project.year || "",
      stars: project.stars || "",
      featured: Boolean(project.featured),
      highlights: (project.highlights || []).join(", "),
    });
    setTab("projects");
  };

  const editSkill = (skill) => {
    setEditingSkillId(skill._id);
    setSkillForm({
      name: skill.name || "",
      level: skill.level || "",
      icon: skill.icon || "",
      category: skill.category || "Frontend",
      description: skill.description || "",
      techs: (skill.techs || []).join(", "),
      color: skill.color || "#F59E0B",
    });
    setTab("skills");
  };

  const deleteItem = async (path, label) => {
    if (!window.confirm(`Delete this ${label}?`)) return;
    try {
      await apiRequest(path, { method: "DELETE" });
      setFlash(`${label} deleted.`);
      loadDashboard();
    } catch (error) {
      setFlash(error.message);
    }
  };

  const markMessageRead = async (id) => {
    try {
      await apiRequest(`/messages/${id}/read`, { method: "PATCH" });
      setFlash("Message marked as read.");
      loadDashboard();
    } catch (error) {
      setFlash(error.message);
    }
  };

  if (!isAuthed) {
    return (
      <section style={shell}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ ...card, padding: 32 }}>
            <SectionTitle
              icon={ShieldCheck}
              title="Admin Access"
              subtitle="Login or create the admin account to manage projects, skills, and contacts."
            />

            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {["login", "register"].map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  style={{
                    ...buttonBase,
                    background:
                      mode === item
                        ? "linear-gradient(135deg, #D97706, #F59E0B)"
                        : "rgba(255,255,255,0.08)",
                    color: "white",
                    flex: 1,
                  }}
                >
                  {item === "login" ? "Login" : "Register Admin"}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleAuthSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {mode === "register" && (
                <input
                  placeholder="Admin name"
                  value={authForm.name}
                  onChange={(e) =>
                    setAuthForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  style={inputStyle}
                  required
                />
              )}
              <input
                placeholder="Admin email"
                type="email"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, email: e.target.value }))
                }
                style={inputStyle}
                required
              />
              <input
                placeholder="Password"
                type="password"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, password: e.target.value }))
                }
                style={inputStyle}
                required
              />
              {authError && (
                <div style={{ color: "#fca5a5", fontSize: 13 }}>{authError}</div>
              )}
              {flash && (
                <div style={{ color: "#86efac", fontSize: 13 }}>{flash}</div>
              )}
              <button
                type="submit"
                style={{
                  ...buttonBase,
                  background: "linear-gradient(135deg, #D97706, #F59E0B)",
                  color: "white",
                }}
              >
                {authLoading
                  ? "Please wait..."
                  : mode === "login"
                    ? "Login to Dashboard"
                    : "Create Admin"}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={shell}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div
          style={{
            ...card,
            padding: "24px 26px",
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>
              Admin Dashboard
            </div>
            <div style={{ color: "rgba(255,255,255,0.58)", fontSize: 14 }}>
              Logged in as {user?.name || user?.email || "Admin"}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={loadDashboard}
              style={{
                ...buttonBase,
                background: "rgba(255,255,255,0.08)",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <RefreshCw size={15} /> Refresh
            </button>
            <button
              onClick={clearSession}
              style={{
                ...buttonBase,
                background: "rgba(245, 158, 11,0.14)",
                color: "#FCD34D",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {flash && (
          <div
            style={{
              ...card,
              padding: "14px 18px",
              marginBottom: 18,
              color: "white",
              fontSize: 14,
            }}
          >
            {flash}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "projects", label: "Projects", icon: FolderKanban },
            { id: "skills", label: "Skills", icon: Wrench },
            { id: "messages", label: "Messages", icon: Mail },
            { id: "subscriptions", label: "Subscriptions", icon: Users },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                ...buttonBase,
                background:
                  tab === id
                    ? "linear-gradient(135deg, #D97706, #F59E0B)"
                    : "rgba(255,255,255,0.08)",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {/* Stats Cards */}
            <div style={{ ...card, padding: 24, borderLeft: "4px solid #F59E0B" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                Total Projects <FolderKanban size={18} color="#F59E0B" />
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>{projects.length}</div>
            </div>
            
            <div style={{ ...card, padding: 24, borderLeft: "4px solid #F59E0B" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                Total Skills <Wrench size={18} color="#F59E0B" />
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>{skills.length}</div>
            </div>

            <div style={{ ...card, padding: 24, borderLeft: "4px solid #F59E0B" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                Unread Messages <Mail size={18} color="#F59E0B" />
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>{messages.filter(m => m.status !== "read").length}</div>
            </div>

            <div style={{ ...card, padding: 24, borderLeft: "4px solid #F59E0B" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                Subscribers <Users size={18} color="#F59E0B" />
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>{subscriptions.length}</div>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(320px, 420px) 1fr",
              gap: 22,
            }}
          >
            <div style={{ ...card, padding: 24 }}>
              <SectionTitle
                icon={FolderKanban}
                title={editingProjectId ? "Edit Project" : "Add Project"}
                subtitle="Create and manage project entries saved in MongoDB."
              />
              <form
                onSubmit={handleProjectSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  ["title", "Project title"],
                  ["description", "Description"],
                  ["image", "Image URL"],
                  ["githubLink", "GitHub URL"],
                  ["liveLink", "Live URL"],
                  ["techStack", "Tech stack (comma separated)"],
                  ["tag", "Tag"],
                  ["color", "Accent color"],
                  ["year", "Year"],
                  ["stars", "Stars / rating"],
                  ["highlights", "Highlights (comma separated)"],
                ].map(([key, placeholder]) =>
                  key === "description" ? (
                    <textarea
                      key={key}
                      placeholder={placeholder}
                      value={projectForm[key]}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
                      required
                    />
                  ) : (
                    <input
                      key={key}
                      placeholder={placeholder}
                      value={projectForm[key]}
                      onChange={(e) =>
                        setProjectForm((prev) => ({
                          ...prev,
                          [key]:
                            key === "featured"
                              ? e.target.checked
                              : e.target.value,
                        }))
                      }
                      style={inputStyle}
                      required={key === "title" || key === "description"}
                    />
                  )
                )}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 14,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                  />
                  Featured project
                </label>
                <button
                  type="submit"
                  style={{
                    ...buttonBase,
                    background: "linear-gradient(135deg, #D97706, #F59E0B)",
                    color: "white",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Save size={15} />
                  {editingProjectId ? "Update Project" : "Save Project"}
                </button>
              </form>
            </div>

            <div style={{ ...card, padding: 24 }}>
              <SectionTitle
                icon={FolderKanban}
                title="All Projects"
                subtitle={loading ? "Loading..." : `${projects.length} projects found`}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {projects.map((project) => (
                  <div
                    key={project._id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, marginBottom: 6 }}>
                          {project.title}
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,0.56)",
                            fontSize: 13,
                            lineHeight: 1.6,
                          }}
                        >
                          {project.description}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => editProject(project)}
                          style={{
                            ...buttonBase,
                            background: "rgba(245, 158, 11,0.14)",
                            color: "#FCD34D",
                            padding: "9px 12px",
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteItem(`/projects/${project._id}`, "project")}
                          style={{
                            ...buttonBase,
                            background: "rgba(245, 158, 11,0.14)",
                            color: "#FCD34D",
                            padding: "9px 12px",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!projects.length && !loading && (
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>
                    No projects saved yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "skills" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(320px, 420px) 1fr",
              gap: 22,
            }}
          >
            <div style={{ ...card, padding: 24 }}>
              <SectionTitle
                icon={Wrench}
                title={editingSkillId ? "Edit Skill" : "Add Skill"}
                subtitle="Manage stack cards and skills saved in MongoDB."
              />
              <form
                onSubmit={handleSkillSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {[
                  ["name", "Skill name"],
                  ["level", "Level"],
                  ["icon", "Icon / emoji"],
                  ["category", "Category"],
                  ["description", "Description"],
                  ["techs", "Techs (comma separated)"],
                  ["color", "Accent color"],
                ].map(([key, placeholder]) =>
                  key === "description" ? (
                    <textarea
                      key={key}
                      placeholder={placeholder}
                      value={skillForm[key]}
                      onChange={(e) =>
                        setSkillForm((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
                    />
                  ) : (
                    <input
                      key={key}
                      placeholder={placeholder}
                      value={skillForm[key]}
                      onChange={(e) =>
                        setSkillForm((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      style={inputStyle}
                      required={key === "name" || key === "level"}
                    />
                  )
                )}
                <button
                  type="submit"
                  style={{
                    ...buttonBase,
                    background: "linear-gradient(135deg, #D97706, #F59E0B)",
                    color: "white",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Save size={15} />
                  {editingSkillId ? "Update Skill" : "Save Skill"}
                </button>
              </form>
            </div>

            <div style={{ ...card, padding: 24 }}>
              <SectionTitle
                icon={Wrench}
                title="All Skills"
                subtitle={loading ? "Loading..." : `${skills.length} skills found`}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, marginBottom: 6 }}>
                          {skill.icon ? `${skill.icon} ` : ""}
                          {skill.name}
                        </div>
                        <div style={{ color: skill.color || "#FCD34D", fontSize: 12 }}>
                          {skill.level} · {skill.category}
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,0.56)",
                            fontSize: 13,
                            lineHeight: 1.6,
                            marginTop: 6,
                          }}
                        >
                          {skill.description}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => editSkill(skill)}
                          style={{
                            ...buttonBase,
                            background: "rgba(245, 158, 11,0.14)",
                            color: "#FCD34D",
                            padding: "9px 12px",
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteItem(`/skills/${skill._id}`, "skill")}
                          style={{
                            ...buttonBase,
                            background: "rgba(245, 158, 11,0.14)",
                            color: "#FCD34D",
                            padding: "9px 12px",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {!skills.length && !loading && (
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>
                    No skills saved yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div style={{ ...card, padding: 24 }}>
            <SectionTitle
              icon={Mail}
              title="Contact Messages"
              subtitle={loading ? "Loading..." : `${messages.length} messages found`}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {messages.map((message) => (
                <div
                  key={message._id}
                  style={{
                    background:
                      message.status === "read"
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(245, 158, 11,0.08)",
                    border:
                      message.status === "read"
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(245, 158, 11,0.18)",
                    borderRadius: 18,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800 }}>{message.name}</div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.58)",
                          fontSize: 13,
                          marginTop: 2,
                        }}
                      >
                        {message.email}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {message.status !== "read" && (
                        <button
                          onClick={() => markMessageRead(message._id)}
                          style={{
                            ...buttonBase,
                            background: "rgba(245, 158, 11,0.14)",
                            color: "#FCD34D",
                            padding: "9px 12px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <CheckCircle2 size={14} /> Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteItem(`/messages/${message._id}`, "message")}
                        style={{
                          ...buttonBase,
                          background: "rgba(245, 158, 11,0.14)",
                          color: "#FCD34D",
                          padding: "9px 12px",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 10,
                    }}
                  >
                    {message.type && (
                      <span
                        style={{
                          fontSize: 11,
                          borderRadius: 999,
                          padding: "5px 10px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        Type: {message.type}
                      </span>
                    )}
                    {message.budget && (
                      <span
                        style={{
                          fontSize: 11,
                          borderRadius: 999,
                          padding: "5px 10px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        Budget: {message.budget}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 11,
                        borderRadius: 999,
                        padding: "5px 10px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      Status: {message.status}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.7,
                      fontSize: 14,
                    }}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {!messages.length && !loading && (
                <div style={{ color: "rgba(255,255,255,0.5)" }}>
                  No contact messages saved yet.
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "subscriptions" && (
          <div style={{ ...card, padding: 24 }}>
            <SectionTitle
              icon={Mail}
              title="Newsletter Subscriptions"
              subtitle={loading ? "Loading..." : `${subscriptions.length} subscribers`}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {subscriptions.map((s) => (
                <div
                  key={s._id}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800 }}>{s.name || "—"}</div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{s.email}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{new Date(s.createdAt).toLocaleString()}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => deleteItem(`/subscriptions/${s._id}`, "subscription")}
                      style={{
                        ...buttonBase,
                        background: "rgba(245, 158, 11,0.14)",
                        color: "#FCD34D",
                        padding: "9px 12px",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {!subscriptions.length && !loading && (
                <div style={{ color: "rgba(255,255,255,0.5)" }}>No subscribers yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
