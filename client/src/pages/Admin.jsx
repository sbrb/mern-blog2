import { useContext, useEffect } from "react";
import BlogContext from "../context/BlogContext";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import toast from "react-hot-toast";
import { checkAuth } from "../helpers/checkAuth";
import CreateBlog from "../components/CreateBlog";

const Admin = () => {
  const { isAuth, setIsAuth } = useContext(BlogContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      });
      console.log(1);
      const data = await res.data;
      console.log(data);
      toast.success(data.message);
      setIsAuth(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkAuth()
      .then((data) => setIsAuth(data))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      {!isAuth ? (
        <div className="h-screen flex justify-center items-center">
          {/* ADMIN LOGIN */}
          <form
            onSubmit={handleLogin}
            className="grid grid-cols-1 gap-3 bg-white w-[80vw] md:w-[20vw] p-3 rounded-lg"
          >
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-lg font-semibold text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                required
                className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-lg font-semibold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                className="rounded-2xl px-3 py-1 text-lg outline-none bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 rounded-2xl px-3 py-1 text-gray-100 font-semibold hover:bg-purple-600 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <AdminNavbar />
          <CreateBlog />
        </div>
      )}
    </div>
  );
};

export default Admin;
