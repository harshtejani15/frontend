import { Link, useNavigate } from 'react-router-dom';
import { Image, BookOpen, Settings, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const adminMenuItems = [
    {
      title: 'Manage Photos',
      icon: <Image size={24} />,
      path: '/admin/photos',
      description: 'Upload, edit and delete photos in your portfolio',
    },
    {
      title: 'Manage Blogs',
      icon: <BookOpen size={24} />,
      path: '/admin/blogs',
      description: 'Create and edit blog posts and articles',
    },
    {
      title: 'Site Settings',
      icon: <Settings size={24} />,
      path: '/admin/settings',
      description: 'Update website configuration and preferences',
    },
    {
      title: 'User Management',
      icon: <Users size={24} />,
      path: '/admin/users',
      description: 'Manage admin users and permissions',
    },
    {
      title: 'Testimonials',
      icon: <MessageSquare size={24} />,
      path: '/admin/testimonials',
      description: 'Add and edit client testimonials',
    },
    {
      title: 'Analytics',
      icon: <BarChart3 size={24} />,
      path: '/admin/analytics',
      description: 'View site traffic and engagement metrics',
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username && !formData.password) {
      toast.error('Please provide a new username or password');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/auth/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Admin credentials updated successfully! Please log in again.');
      localStorage.removeItem('token');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 text-center mb-10">Manage your photography website content and settings</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:bg-gray-750 transition-colors group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4 text-white group-hover:bg-blue-500 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <div className="bg-gray-750 text-blue-400 py-3 px-6 text-center text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  Manage →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-750 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Photos</p>
                <p className="text-white text-2xl font-bold">124</p>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Blog Posts</p>
                <p className="text-white text-2xl font-bold">38</p>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Testimonials</p>
                <p className="text-white text-2xl font-bold">56</p>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Monthly Views</p>
                <p className="text-white text-2xl font-bold">1.4k</p>
              </div>
            </div>
          </div>

          {/* Change Admin Credentials Form */}
          <div className="mt-10 bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Change Admin Credentials</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="username">New Username (optional)</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-750 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="password">New Password (optional)</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-750 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Update Credentials
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;