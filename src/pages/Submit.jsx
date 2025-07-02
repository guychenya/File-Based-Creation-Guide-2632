import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWebsites } from '../context/WebsiteContext';

const { FiGlobe, FiCheck, FiX } = FiIcons;

const Submit = () => {
  const navigate = useNavigate();
  const { addWebsite, categories } = useWebsites();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const watchedUrl = watch('url');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newWebsite = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        image: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=200&fit=crop`
      };
      
      const website = addWebsite(newWebsite);
      
      toast.success('Website submitted successfully!');
      reset();
      
      // Redirect to the new website page after a short delay
      setTimeout(() => {
        navigate(`/website/${website.id}`);
      }, 1500);
      
    } catch (error) {
      toast.error('Failed to submit website. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiGlobe} className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit Your Website
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your amazing website with our community. All submissions are reviewed 
            before being added to the directory.
          </p>
        </motion.div>

        {/* Submission Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8"
        >
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
            <SafeIcon icon={FiCheck} className="h-5 w-5" />
            <span>Submission Guidelines</span>
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Website must be functional and accessible</li>
            <li>• Provide accurate and detailed information</li>
            <li>• Choose the most appropriate category</li>
            <li>• Add relevant tags to help users discover your site</li>
            <li>• No adult content, spam, or malicious websites</li>
          </ul>
        </motion.div>

        {/* Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Website Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Title *
              </label>
              <input
                type="text"
                {...register('title', { 
                  required: 'Website title is required',
                  minLength: { value: 3, message: 'Title must be at least 3 characters' }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your website title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL *
              </label>
              <input
                type="url"
                {...register('url', { 
                  required: 'Website URL is required',
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: 'Please enter a valid URL starting with http:// or https://'
                  }
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com"
              />
              {errors.url && (
                <p className="text-red-600 text-sm mt-1">{errors.url.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register('description', { 
                  required: 'Description is required',
                  minLength: { value: 20, message: 'Description must be at least 20 characters' },
                  maxLength: { value: 500, message: 'Description must not exceed 500 characters' }
                })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Describe what your website does and why it's useful..."
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register('category', { required: 'Please select a category' })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                {...register('tags')}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., design, tools, productivity (comma-separated)"
              />
              <p className="text-gray-500 text-sm mt-1">
                Add relevant tags separated by commas to help users find your website
              </p>
            </div>

            {/* URL Preview */}
            {watchedUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <h4 className="font-medium text-gray-900 mb-2">URL Preview:</h4>
                <a
                  href={watchedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 break-all"
                >
                  {watchedUrl}
                </a>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiCheck} className="h-4 w-4" />
                    <span>Submit Website</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 sm:flex-initial bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiX} className="h-4 w-4" />
                <span>Clear Form</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 text-gray-600"
        >
          <p>
            Your submission will be reviewed within 24-48 hours. 
            We'll notify you once it's approved and live in the directory.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Submit;