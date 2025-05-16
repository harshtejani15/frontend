import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminPhotos from './pages/AdminPhotos';
import AdminBlogs from './pages/AdminBlogs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/photos"
            element={
              <ProtectedRoute>
                <AdminPhotos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;