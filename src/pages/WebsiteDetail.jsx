import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWebsites } from '../context/WebsiteContext';
import WebsiteCard from '../components/ui/WebsiteCard';

const { 
  FiExternalLink, 
  FiStar, 
  FiEye, 
  FiCalendar, 
  FiTag, 
  FiCheckCircle,
  FiArrowLeft,
  FiShare2,
  FiHeart
} = FiIcons;

const WebsiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getWebsiteById, websites, updateWebsite } = useWebsites();
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const website = getWebsiteById(id);

  if (!website) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Not Found</h2>
          <p className="text-gray-600 mb-6">The website you're looking for doesn't exist.</p>
          <Link
            to="/directory"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Directory
          </Link>
        </div>
      </div>
    );
  }

  // Get related websites (same category, excluding current)
  const relatedWebsites = websites
    .filter(site => site.category === website.category && site.id !== website.id)
    .slice(0, 3);

  const handleVisit = () => {
    // Update view count
    updateWebsite(website.id, { views: website.views + 1 });
    window.open(website.url, '_blank', 'noopener,noreferrer');
  };

  const handleRating = (rating) => {
    if (!hasRated) {
      setUserRating(rating);
      setHasRated(true);
      
      // Update website rating
      const newVotes = website.votes + 1;
      const newRating = ((website.rating * website.votes) + rating) / newVotes;
      
      updateWebsite(website.id, {
        rating: newRating,
        votes: newVotes
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: website.title,
          text: website.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="h-4 w-4" />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-gray-300"></div>
            <Link
              to={`/category/${website.category.toLowerCase()}`}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {website.category}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Website Image */}
              <div className="relative">
                <img
                  src={website.image}
                  alt={website.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button
                    onClick={handleVisit}
                    className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiExternalLink} className="h-5 w-5" />
                    <span>Visit Website</span>
                  </button>
                </div>
                {website.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                {website.verified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                    <SafeIcon icon={FiCheckCircle} className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {website.title}
                    </h1>
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 break-all"
                    >
                      {website.url}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={handleShare}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Share"
                    >
                      <SafeIcon icon={FiShare2} className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Add to favorites"
                    >
                      <SafeIcon icon={FiHeart} className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {website.description}
                </p>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <SafeIcon icon={FiTag} className="h-5 w-5" />
                    <span>Tags</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {website.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating Section */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Rate this website
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          disabled={hasRated}
                          className={`h-8 w-8 ${
                            star <= (hasRated ? userRating : 0)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors ${
                            hasRated ? 'cursor-not-allowed' : 'cursor-pointer'
                          }`}
                        >
                          <SafeIcon icon={FiStar} className="h-full w-full fill-current" />
                        </button>
                      ))}
                    </div>
                    {hasRated && (
                      <span className="text-green-600 font-medium">
                        Thanks for rating!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiStar} className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-600">Rating</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{website.rating.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">({website.votes} votes)</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiEye} className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">Views</span>
                  </div>
                  <div className="font-semibold">{website.views.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">Added</span>
                  </div>
                  <div className="font-semibold">
                    {format(new Date(website.dateAdded), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visit Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={handleVisit}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiExternalLink} className="h-5 w-5" />
                <span>Visit {website.title}</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Related Websites */}
        {relatedWebsites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More in {website.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedWebsites.map((relatedWebsite, index) => (
                <WebsiteCard 
                  key={relatedWebsite.id} 
                  website={relatedWebsite} 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WebsiteDetail;