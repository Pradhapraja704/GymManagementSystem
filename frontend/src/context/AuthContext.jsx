import { createContext, useContext, useState } from "react";
import authService from "../services/authService";
import { saveToken, getToken, removeToken } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());

  const login = async (username, email, password) => {
    const response = await authService.login(username, email, password);

    if (response.success && response.data?.token) {
      saveToken(response.data.token);
      setToken(response.data.token);
    }

    return response;
  };

  const logout = () => {
    removeToken();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};