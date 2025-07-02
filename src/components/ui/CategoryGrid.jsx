import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCode, FiPenTool, FiTrendingUp, FiCamera, FiBook, FiPlay, FiBriefcase, FiHeart, FiCpu, FiGlobe } = FiIcons;

const categoryIcons = {
  'Development': FiCode,
  'Design': FiPenTool,
  'Marketing': FiTrendingUp,
  'Photography': FiCamera,
  'Education': FiBook,
  'Entertainment': FiPlay,
  'Business': FiBriefcase,
  'Health': FiHeart,
  'Technology': FiCpu,
  'Productivity': FiGlobe
};

const CategoryGrid = ({ categories, websiteCounts = {} }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category] || FiGlobe;
        const count = websiteCounts[category] || 0;
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              to={`/category/${category.toLowerCase()}`}
              className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="bg-primary-100 group-hover:bg-primary-200 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors">
                <SafeIcon 
                  icon={IconComponent} 
                  className="h-6 w-6 text-primary-600" 
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                {category}
              </h3>
              <p className="text-sm text-gray-500">
                {count} {count === 1 ? 'site' : 'sites'}
              </p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;