import { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCard from '../components/PhotoCard';
import { toast } from 'react-toastify';

function AdminPhotos() {
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', image: null });
  const [editMode, setEditMode] = useState(false);
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/photos`);
      setPhotos(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const token = localStorage.getItem('token');
      if (editMode) {
        // Update existing photo
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/photos/${editPhotoId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Photo updated successfully!');
      } else {
        // Create new photo
        await axios.post(`${import.meta.env.VITE_API_URL}/photos`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Photo uploaded successfully!');
      }
      fetchPhotos();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || (editMode ? 'Update failed' : 'Upload failed'));
    }
  };

  const handleEdit = (photo) => {
    setEditMode(true);
    setEditPhotoId(photo._id);
    setFormData({
      title: photo.title,
      description: photo.description || '',
      category: photo.category || '',
      image: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/photos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Photo deleted successfully!');
      fetchPhotos();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', category: '', image: null });
    setEditMode(false);
    setEditPhotoId(null);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="py-12 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 sm:px-12">
        <h1 className="text-5xl font-bold text-center text-white mb-8">Manage Photos</h1>

        {/* Upload/Edit Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md mb-12">
          <div className="mb-6">
            <label className="block text-gray-300 text-lg mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 text-white border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-lg mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 text-white border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-lg mb-2" htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 text-white border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-lg mb-2" htmlFor="image">Image {editMode && '(optional)'}</label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 text-white border rounded"
              required={!editMode}
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-4 rounded hover:bg-indigo-500 transition duration-300"
            >
              {editMode ? 'Update Photo' : 'Upload Photo'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-600 text-white p-4 rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Photo List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <PhotoCard
              key={photo._id}
              photo={photo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPhotos;
