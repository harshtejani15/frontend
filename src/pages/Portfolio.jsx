import { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCard from '../components/PhotoCard';

function Portfolio() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchPhotos();
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Our Portfolio</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;