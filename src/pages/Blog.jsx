import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
        setBlogs(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-12 text-white">Loading...</div>;

  return (
    <div className="py-12 bg-[#0f172a] text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
