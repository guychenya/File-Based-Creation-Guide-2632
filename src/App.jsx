import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Directory from './pages/Directory';
import Submit from './pages/Submit';
import About from './pages/About';
import Contact from './pages/Contact';
import WebsiteDetail from './pages/WebsiteDetail';
import Category from './pages/Category';
import Search from './pages/Search';
import { WebsiteProvider } from './context/WebsiteContext';

function App() {
  return (
    <WebsiteProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/website/:id" element={<WebsiteDetail />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </WebsiteProvider>
  );
}

export default App;