import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useWebsites } from '../context/WebsiteContext';
import WebsiteCard from '../components/ui/WebsiteCard';
import SearchFilters from '../components/ui/SearchFilters';

const Directory = () => {
  const { websites, categories } = useWebsites();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedWebsites = useMemo(() => {
    let filtered = websites;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(site => 
        site.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort websites
    const sorted = [...filtered].sort((a, b) => {
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
  }, [websites, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Website Directory
          </h1>
          <p className="text-gray-600">
            Discover {websites.length} amazing websites across {categories.length} categories
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <SearchFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedWebsites.length} website{filteredAndSortedWebsites.length !== 1 ? 's' : ''}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Website Grid */}
            {filteredAndSortedWebsites.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAndSortedWebsites.map((website, index) => (
                  <WebsiteCard 
                    key={website.id} 
                    website={website} 
                    index={index} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No websites found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or browse all categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSortBy('rating');
                  }}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Directory;