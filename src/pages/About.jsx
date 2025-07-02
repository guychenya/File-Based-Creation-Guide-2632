import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGlobe, FiUsers, FiTarget, FiHeart, FiStar, FiTrendingUp, FiShield } = FiIcons;

const About = () => {
  const features = [
    {
      icon: FiGlobe,
      title: 'Curated Collection',
      description: 'Every website is carefully reviewed and curated to ensure quality and relevance.'
    },
    {
      icon: FiUsers,
      title: 'Community Driven',
      description: 'Built by the community, for the community. Users can submit and rate websites.'
    },
    {
      icon: FiTarget,
      title: 'Easy Discovery',
      description: 'Find exactly what you need with our intuitive search and category system.'
    },
    {
      icon: FiHeart,
      title: 'User Focused',
      description: 'Designed with user experience in mind, making website discovery enjoyable.'
    }
  ];

  const stats = [
    { icon: FiGlobe, number: '1000+', label: 'Websites Listed' },
    { icon: FiUsers, number: '50K+', label: 'Monthly Users' },
    { icon: FiStar, number: '10K+', label: 'User Reviews' },
    { icon: FiTrendingUp, number: '100K+', label: 'Page Views' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiGlobe} className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About WebDirectory
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make the web more discoverable by creating the most 
              comprehensive and user-friendly directory of amazing websites and digital resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              In an increasingly vast digital landscape, discovering quality websites and tools 
              can be overwhelming. WebDirectory was created to solve this problem by providing 
              a carefully curated collection of the best websites across all categories, making 
              it easy for users to find exactly what they need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Growing Every Day
            </h2>
            <p className="text-gray-600">
              Our community continues to grow, helping more people discover amazing websites.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={stat.icon} className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600">
              The principles that guide everything we do at WebDirectory.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                <SafeIcon icon={FiShield} className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We believe in quality over quantity. Every website in our directory is 
                  carefully reviewed to ensure it meets our high standards.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                <SafeIcon icon={FiUsers} className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Powered</h3>
                <p className="text-gray-600">
                  Our users are at the heart of everything we do. The directory grows and 
                  improves through community contributions and feedback.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                <SafeIcon icon={FiHeart} className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User Experience</h3>
                <p className="text-gray-600">
                  We're committed to providing an intuitive, fast, and enjoyable experience 
                  for everyone who uses WebDirectory.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Help us build the most comprehensive web directory by submitting your favorite websites 
              and sharing your discoveries with others.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Submit a Website
              </Link>
              <Link
                to="/directory"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Explore Directory
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;