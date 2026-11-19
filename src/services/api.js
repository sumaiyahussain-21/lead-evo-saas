const API_BASE_URL = "/api";
class ApiClientError extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiClientError";
  }
}
async function request(endpoint, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("lead_evo_jwt") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });
  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  if (!response.ok) {
    const errorMsg =
      data?.message || `API request failed with status ${response.status}`;
    throw new ApiClientError(response.status, errorMsg, data);
  }
  return data;
}
export const authApi = {
  login: async (credentials) => {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  register: async (payload) => {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  getMe: async () => {
    return request("/auth/me");
  },
  updateMe: async (updates) => {
    return request("/auth/me", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },
  updateProfile: async (updates) => {
    return request("/user/profile", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },
};
export const leadsApi = {
  getAll: async (params) => {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.status && params.status !== "All")
      query.append("status", params.status);
    if (params?.verifiedWA && params.verifiedWA !== "all")
      query.append("verifiedWA", params.verifiedWA);
    if (params?.industry && params.industry !== "All")
      query.append("industry", params.industry);
    const qs = query.toString() ? `?${query.toString()}` : "";
    return request(`/leads${qs}`);
  },
  getById: async (id) => {
    return request(`/leads/${encodeURIComponent(id)}`);
  },
  create: async (lead) => {
    return request("/leads", {
      method: "POST",
      body: JSON.stringify(lead),
    });
  },
  update: async (id, updates) => {
    return request(`/leads/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },
  delete: async (id) => {
    return request(`/leads/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },
  batchOutreach: async (payload) => {
    return request("/leads/batch-outreach", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  importCsv: async () => {
    return request("/leads/import-csv", {
      method: "POST",
    });
  },
  batchCreate: async (leads) => {
    return request("/leads/batch-create", {
      method: "POST",
      body: JSON.stringify({ leads }),
    });
  },
};
export const prospectsApi = {
  discover: async (query) => {
    return request("/prospects/discover", {
      method: "POST",
      body: JSON.stringify(query),
    });
  },
};
export const meetingsApi = {
  getAll: async () => {
    return request("/meetings");
  },
  book: async (meetingData) => {
    return request("/meetings/book", {
      method: "POST",
      body: JSON.stringify(meetingData),
    });
  },
};
export const seoApi = {
  getHistory: async () => {
    return request("/seo/history");
  },
  runAudit: async (url, targetType = "homepage") => {
    return request("/seo/audit", {
      method: "POST",
      body: JSON.stringify({ url, targetType }),
    });
  },
};
export const analyticsApi = {
  getRealtime: async () => {
    return request("/analytics/realtime");
  },
};
export const dbApi = {
  getStatus: async () => {
    return request("/db/status");
  },
  connect: async (uri) => {
    return request("/db/connect", {
      method: "POST",
      body: JSON.stringify({ uri }),
    });
  },
};
export default {
  auth: authApi,
  leads: leadsApi,
  prospects: prospectsApi,
  meetings: meetingsApi,
  seo: seoApi,
  analytics: analyticsApi,
  db: dbApi,
};
