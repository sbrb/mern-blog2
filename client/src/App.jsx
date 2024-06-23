import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import BlogContext from "./context/BlogContext";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  return (
    <BlogContext.Provider
      value={{
        isAuth,
        setIsAuth,
        blogs,
        setBlogs,
        userAuthenticated,
        setUserAuthenticated,
        userName,
        setUserName,
        userImage,
        setUserImage,
        currentUserId,
        setCurrentUserId,
      }}
    >
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </BlogContext.Provider>
  );
}
