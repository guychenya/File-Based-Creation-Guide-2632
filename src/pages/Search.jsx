import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWebsites } from '../context/WebsiteContext';
import WebsiteCard from '../components/ui/WebsiteCard';
import SearchFilters from '../components/ui/SearchFilters';

const { FiSearch, FiX } = FiIcons;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchWebsites, categories } = useWebsites();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    
    let results = searchWebsites(query);
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(site => 
        site.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort results
    const sorted = [...results].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        case 'recent':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default: // relevance
          // Simple relevance scoring based on title match
          const aScore = a.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
          const bScore = b.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
          return bScore - aScore;
      }
    });
    
    return sorted;
  }, [query, selectedCategory, sortBy, searchWebsites]);

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Websites
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for websites, tools, resources..."
                className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg"
              />
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" 
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <SafeIcon icon={FiX} className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
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
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Search Results for "{query}"
                    </h2>
                    <p className="text-gray-600">
                      {searchResults.length} website{searchResults.length !== 1 ? 's' : ''} found
                      {selectedCategory && ` in ${selectedCategory}`}
                    </p>
                  </div>
                </div>

                {/* Results */}
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map((website, index) => (
                      <WebsiteCard 
                        key={website.id} 
                        website={website} 
                        index={index} 
                      />
                    ))}
                  </div>
                ) : query ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try different keywords or browse our categories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => {
                          setSelectedCategory('');
                          setSortBy('relevance');
                        }}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Clear Filters
                      </button>
                      <Link
                        to="/directory"
                        className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        Browse All Websites
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Start your search
                    </h3>
                    <p className="text-gray-600">
                      Enter keywords to find amazing websites and resources.
                    </p>
                  </motion.div>
                )}
              </main>
            </div>
          </motion.div>
        )}

        {/* Popular Searches */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Searches
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['design tools', 'productivity', 'coding', 'photography', 'marketing'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    setSearchParams({ q: term });
                  }}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;