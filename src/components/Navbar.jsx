import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Camera, ChevronDown } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '#', hasDropdown: true },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceLinks = [
    'Portrait Photography',
    'Event Coverage',
    'Product Photography',
    'Wedding Photography',
    'Real Estate Photography',
    'Fashion Photography',
    'Photo Restoration'
  ];

  return (
    <nav className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Camera size={24} className="text-blue-400 mr-2" />
            <span className="text-2xl font-bold text-white">Photo Studio</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleNav} 
              className="focus:outline-none text-gray-300 hover:text-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center space-x-6">
            {navLinks.map((link, index) => (
              <div key={index} className="relative">
                {link.hasDropdown ? (
                  <div>
                    <button 
                      onClick={toggleServicesDropdown}
                      className="flex items-center hover:text-blue-400 transition-colors focus:outline-none"
                    >
                      {link.name}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    {isServicesDropdownOpen && (
                      <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-gray-800 z-50">
                        <div className="py-1">
                          {serviceLinks.map((service, idx) => (
                            <Link
                              key={idx}
                              to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-blue-400 transition-colors"
                            >
                              {service}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to={link.path}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Login/Logout Button */}
            {token ? (
              <>
                <Link to="/admin/dashboard" className="hover:text-blue-400 transition-colors">
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/admin" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.hasDropdown ? (
                    <div>
                      <button 
                        onClick={toggleServicesDropdown}
                        className="flex items-center justify-between w-full hover:text-blue-400 transition-colors focus:outline-none py-2"
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={16} />
                      </button>
                      {isServicesDropdownOpen && (
                        <div className="pl-4 mt-2 space-y-2">
                          {serviceLinks.map((service, idx) => (
                            <Link
                              key={idx}
                              to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block py-1 hover:text-blue-400 transition-colors text-sm"
                            >
                              {service}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={link.path}
                      className="block hover:text-blue-400 transition-colors py-2"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Login/Logout Button Mobile */}
              {token ? (
                <div className="space-y-3 pt-2">
                  <Link 
                    to="/admin/dashboard" 
                    className="block hover:text-blue-400 transition-colors py-2"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/admin" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-center mt-2"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;