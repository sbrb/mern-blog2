import BlogCard from "./BlogCard";
import { useEffect, useContext } from "react";
import BlogContext from "../context/BlogContext";
import { getBlogs } from "../helpers/getBlogs";
import { convertDate } from "../helpers/convertDate";

const BlogSection = () => {
  const { blogs, setBlogs } = useContext(BlogContext);

  useEffect(() => {
    getBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-20 mx-10 md:mx-auto w-fit flex flex-col md:flex-row gap-3 lg:gap-8 justify-center items-center">
      {/* SECOND BLOG WILL BE HERE */}
      <div className="py-3 flex mb-4 flex-col gap-3 w-fit rounded-2xl shadow-md mx-auto bg-white">
        <h3 className="text-3xl font-bold mx-5">
          {blogs[1]?.title.length > 23
            ? blogs[1]?.title.slice(0, 23) + "..."
            : blogs[1]?.title}
        </h3>
        <img
          src={blogs[1]?.thumbnail}
          alt="blogs thumbnail"
          className="md:w-[30vw] rounded-3xl shadow-lg"
        />
        <div className="flex gap-3 mx-5 py-2">
          {blogs[1]?.tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-2 text-gray-600 text-xs md:text-sm bg-white rounded-full font-semibold shadow-md capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        <hr className="mx-5" />
        <div className="mx-5 flex justify-start items-center gap-3">
          <img
            src="/logo.jpg"
            alt=""
            className="rounded-full w-[40px] h-[40px]"
          />
          <div>
            <h4 className="font-bold">{blogs[1]?.author}</h4>
            <p className="font-bold">{convertDate(blogs[1]?.createdAt)}</p>
          </div>
        </div>
      </div>
      {/* REST ALL BLOGS WILL BE HERE */}
      <div className="grid gird-cols-1 gap-3 md:h-[80vh] md:overflow-y-scroll md:px-3 md:pb-2 scoll-hide">
        {blogs?.slice(2).map((blog) => (
          <BlogCard key={blog._id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
