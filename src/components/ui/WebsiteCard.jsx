import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiStar, FiEye, FiExternalLink, FiCheckCircle } = FiIcons;

const WebsiteCard = ({ website, index = 0 }) => {
  const handleVisit = (e) => {
    e.preventDefault();
    window.open(website.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={website.image}
          alt={website.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handleVisit}
            className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
            <span>Visit Site</span>
          </button>
        </div>
        {website.featured && (
          <div className="absolute top-3 left-3 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        {website.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full">
            <SafeIcon icon={FiCheckCircle} className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Link to={`/website/${website.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1">
              {website.title}
            </h3>
          </Link>
          <Link
            to={`/category/${website.category.toLowerCase()}`}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-primary-100 hover:text-primary-700 transition-colors"
          >
            {website.category}
          </Link>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {website.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {website.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {website.tags.length > 3 && (
            <span className="text-gray-400 text-xs">
              +{website.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400" />
              <span>{website.rating.toFixed(1)}</span>
              <span className="text-gray-400">({website.votes})</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiEye} className="h-4 w-4" />
              <span>{website.views.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={handleVisit}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Visit →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WebsiteCard;