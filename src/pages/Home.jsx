import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWebsites } from '../context/WebsiteContext';
import WebsiteCard from '../components/ui/WebsiteCard';
import CategoryGrid from '../components/ui/CategoryGrid';

const { FiSearch, FiTrendingUp, FiStar, FiClock, FiArrowRight } = FiIcons;

const Home = () => {
  const { 
    websites, 
    categories, 
    getFeaturedWebsites, 
    getPopularWebsites, 
    getRecentWebsites 
  } = useWebsites();

  const featuredWebsites = getFeaturedWebsites().slice(0, 3);
  const popularWebsites = getPopularWebsites().slice(0, 6);
  const recentWebsites = getRecentWebsites().slice(0, 6);

  // Calculate website counts per category
  const websiteCounts = categories.reduce((acc, category) => {
    acc[category] = websites.filter(site => site.category === category).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing
              <span className="block text-primary-200">Websites</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Explore thousands of carefully curated websites and digital resources. 
              Find the perfect tools for your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/directory"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiSearch} className="h-5 w-5" />
                <span>Browse Directory</span>
              </Link>
              <Link
                to="/submit"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Submit Website</span>
                <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {websites.length}+
              </div>
              <div className="text-gray-600">Websites Listed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600">Categories</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {websites.reduce((sum, site) => sum + site.views, 0).toLocaleString()}+
              </div>
              <div className="text-gray-600">Total Views</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Websites */}
      {featuredWebsites.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                  <SafeIcon icon={FiStar} className="h-8 w-8 text-yellow-400" />
                  <span>Featured Websites</span>
                </h2>
                <p className="text-gray-600 mt-2">
                  Hand-picked websites that stand out from the crowd
                </p>
              </div>
              <Link
                to="/directory?featured=true"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredWebsites.map((website, index) => (
                <WebsiteCard key={website.id} website={website} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover websites organized by category to find exactly what you're looking for
            </p>
          </div>
          <CategoryGrid categories={categories} websiteCounts={websiteCounts} />
        </div>
      </section>

      {/* Popular Websites */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <SafeIcon icon={FiTrendingUp} className="h-8 w-8 text-green-500" />
                <span>Popular Websites</span>
              </h2>
              <p className="text-gray-600 mt-2">
                Most visited websites in our directory
              </p>
            </div>
            <Link
              to="/directory?sort=views"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularWebsites.map((website, index) => (
              <WebsiteCard key={website.id} website={website} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Additions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="h-8 w-8 text-blue-500" />
                <span>Recently Added</span>
              </h2>
              <p className="text-gray-600 mt-2">
                Fresh websites added to our directory
              </p>
            </div>
            <Link
              to="/directory?sort=recent"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <SafeIcon icon={FiArrowRight} className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentWebsites.map((website, index) => (
              <WebsiteCard key={website.id} website={website} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Have a Great Website to Share?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Submit your website to our directory and help others discover amazing resources.
            </p>
            <Link
              to="/submit"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center space-x-2"
            >
              <span>Submit Your Website</span>
              <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;