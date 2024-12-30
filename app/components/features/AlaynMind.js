'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaBook, FaNewspaper } from 'react-icons/fa';
import { useNavigation } from '../NavigationContext';

export default function AlaynMind() {
  const { goBack } = useNavigation();
  const [activeTab, setActiveTab] = useState('books');

  const books = [
    { title: "The Body Keeps the Score", author: "Bessel van der Kolk" },
    { title: "Atomic Habits", author: "James Clear" },
    { title: "The Power of Now", author: "Eckhart Tolle" }
  ];

  const articles = [
    { title: "Understanding Anxiety in the Modern World", source: "Psychology Today" },
    { title: "Mindfulness Techniques for Daily Life", source: "Healthline" },
    { title: "The Science of Sleep and Mental Health", source: "Scientific American" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900" />
      
      {/* Animated Pattern Overlay */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 max-w-4xl mx-auto">
        <motion.button
          onClick={goBack}
          className="mb-8 flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-sm" /> Back
        </motion.button>

        <div className="flex gap-3 mb-8">
          <motion.button
            onClick={() => setActiveTab('books')}
            className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${
              activeTab === 'books' 
                ? 'bg-white text-blue-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaBook className="text-lg" /> Books
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('articles')}
            className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${
              activeTab === 'articles' 
                ? 'bg-white text-blue-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaNewspaper className="text-lg" /> Articles
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {activeTab === 'books' ? (
            books.map((book, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{book.title}</h3>
                <p className="text-sm text-blue-100">by {book.author}</p>
              </motion.div>
            ))
          ) : (
            articles.map((article, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                <p className="text-sm text-blue-100">Source: {article.source}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}