import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiFilter, FiX } = FiIcons;

const SearchFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange,
  showFilters,
  onToggleFilters 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Rating' },
    { value: 'views', label: 'Views' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
          <SafeIcon icon={FiFilter} className="h-5 w-5" />
          <span>Filters</span>
        </h3>
        <button
          onClick={onToggleFilters}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <SafeIcon icon={showFilters ? FiX : FiFilter} className="h-5 w-5" />
        </button>
      </div>

      <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || sortBy !== 'relevance') && (
          <button
            onClick={() => {
              onCategoryChange('');
              onSortChange('relevance');
            }}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;