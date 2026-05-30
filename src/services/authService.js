import { registerApi, loginApi, getMeApi } from "../api/authApi";

const authService = {
  register: async (userData) => {
    try {
      const data = await registerApi(userData);

      if (data.token) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    const data = await loginApi(credentials);

    if (data.token) {
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  },

  getMe: async () => {
    return await getMeApi();
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
