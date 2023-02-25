import axios from "../api";

const register = async (username, email, hashed_password) => {
  const res = await axios.post(`/api/users`, {
    username,
    email,
    hashed_password,
  });
  if (res.data.access_token) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const login = async (email, password) => {
  const res = await axios.post(
    `/api/token`,
    `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (res.data.access_token) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
