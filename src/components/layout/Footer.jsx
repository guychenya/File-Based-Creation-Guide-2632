import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiGlobe, FiMail, FiTwitter, FiGithub, FiLinkedin } = FiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <SafeIcon icon={FiGlobe} className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">WebDirectory</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover amazing websites and digital resources. Submit your favorite sites 
              and help others find the best tools and content on the web.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <SafeIcon icon={FiTwitter} className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <SafeIcon icon={FiGithub} className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <SafeIcon icon={FiLinkedin} className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-gray-300 hover:text-white transition-colors">
                  Browse Directory
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-gray-300 hover:text-white transition-colors">
                  Submit Website
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/development" className="text-gray-300 hover:text-white transition-colors">
                  Development
                </Link>
              </li>
              <li>
                <Link to="/category/design" className="text-gray-300 hover:text-white transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link to="/category/productivity" className="text-gray-300 hover:text-white transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link to="/category/photography" className="text-gray-300 hover:text-white transition-colors">
                  Photography
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} WebDirectory. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;