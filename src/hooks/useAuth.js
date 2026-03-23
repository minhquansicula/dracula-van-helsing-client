// src/hooks/useAuth.js (Cập nhật lại để sử dụng authService)
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import authService from "../services/authService";

export const useAuth = () => {
  const {
    user,
    login,
    logout,
    loading: isContextLoading,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(credentials);
      login(data.token);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Lời nguyền thất bại. Sai danh tính hoặc mật ngữ.";
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.register(userData);
      login(data.token);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Triệu hồi thất bại. Kẻ này đã tồn tại hoặc nghi lễ bị lỗi.";
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isContextLoading,
    isLoading,
    error,
    loginUser,
    registerUser,
    logout,
  };
};
