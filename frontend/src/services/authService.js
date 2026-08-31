import api from "./api";

const login = async (username, email, password) => {
  const response = await api.post("/auth/login", {
    username,
    email,
    password,
  });

  return response.data;
};

const authService = {
  login,
};

export default authService;