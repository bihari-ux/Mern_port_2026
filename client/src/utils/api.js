const DEFAULT_API_BASE = "https://mern-port-20265.onrender.com";

export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE;

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("adminToken");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (typeof data === "object" && data?.message) ||
      "Request failed";
    throw new Error(message);
  }

  return data;
}
