import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-8 transition-all duration-300">
        <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">Admin Portal</h1>
        <p className="text-sm text-gray-300 text-center mb-8">Enter your credentials to manage the site</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="admin@example"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium tracking-wide transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-xs text-center text-gray-500">© {new Date().getFullYear()} Photography Admin Panel</p>
      </div>
    </div>
  );
}

export default AdminLogin;
