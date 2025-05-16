import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { toast } from 'react-toastify';

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', author: 'Admin' });
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (editMode) {
        await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${editBlogId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Blog updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/blogs`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Blog created successfully!');
      }
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error('Blog submission error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditBlogId(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', author: 'Admin' });
    setEditMode(false);
    setEditBlogId(null);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Manage Blogs</h1>

        {/* Blog Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-12"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block font-medium text-gray-700 mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write the blog content..."
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="author" className="block font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editMode ? 'Update Blog' : 'Create Blog'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Blog List */}
        {loading ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found. Start by creating one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBlogs;
