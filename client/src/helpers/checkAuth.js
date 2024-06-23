import axios from "axios";

export const checkAuth = async () => {
  axios.defaults.withCredentials = true;
  const res = await axios.get("http://localhost:8000/api/checkAuth", {
    withCredentials: true,
  });
  const data = await res.data;
  return data.success;
};
