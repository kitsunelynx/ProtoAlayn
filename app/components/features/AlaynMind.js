'use client';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.button
          onClick={goBack}
          className="mb-8 flex items-center gap-2 text-white/90 hover:text-white"
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft /> Back
        </motion.button>

        <div className="flex sm:flex-row gap-4 mb-8">
          <motion.button
            onClick={() => setActiveTab('books')}
            className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-3 ${
              activeTab === 'books' 
                ? 'bg-white text-indigo-900 shadow-lg font-bold' 
                : 'glass-button'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaBook className="text-lg" /> Books
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('articles')}
            className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-3 ${
              activeTab === 'articles' 
                ? 'bg-white text-indigo-900 shadow-lg font-bold' 
                : 'glass-button'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaNewspaper className="text-lg" /> Articles
          </motion.button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'books' ? (
              books.map((book, index) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-gradient p-6 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{book.title}</h3>
                  <p className="text-white/80">by {book.author}</p>
                </motion.div>
              ))
            ) : (
              articles.map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-gradient p-6 rounded-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-white/80">Source: {article.source}</p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}