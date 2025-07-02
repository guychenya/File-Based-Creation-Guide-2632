import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWebsites } from '../context/WebsiteContext';
import WebsiteCard from '../components/ui/WebsiteCard';

const { FiArrowLeft, FiFilter } = FiIcons;

const Category = () => {
  const { category } = useParams();
  const { getWebsitesByCategory } = useWebsites();
  const [sortBy, setSortBy] = useState('rating');

  const categoryWebsites = getWebsitesByCategory(category);
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  const sortedWebsites = useMemo(() => {
    const sorted = [...categoryWebsites].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        case 'recent':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return b.rating - a.rating;
      }
    });
    return sorted;
  }, [categoryWebsites, sortBy]);

  if (categoryWebsites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No websites found in {categoryTitle}
          </h2>
          <p className="text-gray-600 mb-6">
            This category doesn't have any websites yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/directory"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse All Categories
            </Link>
            <Link
              to="/submit"
              className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Submit a Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/directory"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="h-4 w-4" />
              <span>Back to Directory</span>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {categoryTitle} Websites
            </h1>
            <p className="text-gray-600">
              Discover {sortedWebsites.length} amazing websites in the {categoryTitle.toLowerCase()} category
            </p>
          </motion.div>
        </div>

        {/* Sort Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="views">Most Viewed</option>
              <option value="recent">Recently Added</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </motion.div>

        {/* Website Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sortedWebsites.map((website, index) => (
            <WebsiteCard 
              key={website.id} 
              website={website} 
              index={index} 
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-primary-600 text-white rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            Know a great {categoryTitle.toLowerCase()} website?
          </h2>
          <p className="text-primary-100 mb-6">
            Help others discover amazing {categoryTitle.toLowerCase()} resources by submitting your favorite websites.
          </p>
          <Link
            to="/submit"
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block"
          >
            Submit a Website
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Category;