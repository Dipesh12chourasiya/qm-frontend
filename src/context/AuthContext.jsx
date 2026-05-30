import { createContext, useContext, useEffect, useState } from "react";

import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /*
   * Load current user on refresh
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await authService.getMe();

        setUser(response.user);

        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);

        authService.logout();

        setUser(null);

        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /*
   * Login
   */
  const login = async (credentials) => {
    const response = await authService.login(credentials);

    setUser(response.user);

    setIsAuthenticated(true);

    return response;
  };

  /*
   * Register
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      setUser(response.user);
      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw error;
    }
  };

  /*
   * Logout
   */
  const logout = () => {
    authService.logout();

    setUser(null);

    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,

    login,
    register,
    logout,

    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;
