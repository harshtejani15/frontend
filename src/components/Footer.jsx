import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Camera, 
  ChevronUp 
} from 'lucide-react';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const currentYear = new Date().getFullYear();
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // In a real app, you would send this to your API
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      
      // Reset subscription message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <Camera size={24} className="text-blue-400 mr-2" />
              <h3 className="text-2xl font-bold text-white">Photo Studio</h3>
            </div>
            <p className="mb-6 text-gray-400 leading-relaxed">
              We capture moments that last a lifetime. Our professional photography services 
              bring your visions to life with stunning imagery and creative concepts.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ArrowRight size={16} className="mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Portrait Photography',
                'Event Coverage',
                'Product Photography',
                'Wedding Photography',
                'Real Estate Photography',
                'Fashion Photography',
                'Photo Restoration'
              ].map((service, index) => (
                <li key={index}>
                  <Link 
                    to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ArrowRight size={16} className="mr-2" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info and Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Contact Us</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-blue-400 flex-shrink-0" />
                <span>123 Photography Lane, Creative District, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-blue-400 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-blue-400 flex-shrink-0" />
                <span>info@photostudio.com</span>
              </li>
            </ul>
            
            <h4 className="text-lg font-semibold text-white mb-3">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">Subscribe to get photography tips and exclusive offers.</p>
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="bg-gray-800 border border-gray-700 rounded-l-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-200"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg px-4 py-2 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-sm mt-2">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Photo Studio. All rights reserved.
          </div>
          <div className="flex items-center">
            <nav className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">Sitemap</Link>
            </nav>
            <button 
              onClick={scrollToTop}
              className="ml-6 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;