import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockWebsites } from '../data/mockData';

const WebsiteContext = createContext();

export const useWebsites = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsites must be used within a WebsiteProvider');
  }
  return context;
};

export const WebsiteProvider = ({ children }) => {
  const [websites, setWebsites] = useState(mockWebsites);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract unique categories from websites
    const uniqueCategories = [...new Set(websites.map(site => site.category))];
    setCategories(uniqueCategories);
  }, [websites]);

  const addWebsite = (website) => {
    const newWebsite = {
      ...website,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      rating: 0,
      votes: 0,
      views: 0,
      featured: false,
      verified: false
    };
    setWebsites(prev => [newWebsite, ...prev]);
    return newWebsite;
  };

  const updateWebsite = (id, updates) => {
    setWebsites(prev => 
      prev.map(site => 
        site.id === id ? { ...site, ...updates } : site
      )
    );
  };

  const deleteWebsite = (id) => {
    setWebsites(prev => prev.filter(site => site.id !== id));
  };

  const getWebsiteById = (id) => {
    return websites.find(site => site.id === id);
  };

  const getWebsitesByCategory = (category) => {
    return websites.filter(site => 
      site.category.toLowerCase() === category.toLowerCase()
    );
  };

  const searchWebsites = (query) => {
    const searchTerm = query.toLowerCase();
    return websites.filter(site => 
      site.title.toLowerCase().includes(searchTerm) ||
      site.description.toLowerCase().includes(searchTerm) ||
      site.category.toLowerCase().includes(searchTerm) ||
      site.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  const getFeaturedWebsites = () => {
    return websites.filter(site => site.featured);
  };

  const getPopularWebsites = () => {
    return [...websites].sort((a, b) => b.views - a.views);
  };

  const getRecentWebsites = () => {
    return [...websites].sort((a, b) => 
      new Date(b.dateAdded) - new Date(a.dateAdded)
    );
  };

  const value = {
    websites,
    categories,
    loading,
    addWebsite,
    updateWebsite,
    deleteWebsite,
    getWebsiteById,
    getWebsitesByCategory,
    searchWebsites,
    getFeaturedWebsites,
    getPopularWebsites,
    getRecentWebsites
  };

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
};