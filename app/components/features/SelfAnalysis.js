'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { useNavigation } from '../NavigationContext';

export default function SelfAnalysis() {
  const { goBack } = useNavigation();
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your mental wellness assistant. How are you feeling today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thank you for sharing. Would you like to tell me more about what's on your mind?",
        isBot: true
      }]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen"
    >
      <div className="glass-panel border-b p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <motion.button 
            onClick={goBack} 
            className="flex items-center gap-2 text-white/90 hover:text-white"
            whileHover={{ x: -5 }}
          >
            <FaArrowLeft /> Back
          </motion.button>
          <h1 className="text-xl font-bold text-white">Self Analysis</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-xl shadow-lg ${
                  message.isBot 
                    ? 'card-gradient text-white' 
                    : 'bg-white text-indigo-900'
                }`}
              >
                <p className="text-sm md:text-base">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <form onSubmit={sendMessage} className="glass-panel border-t p-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl glass-button focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white text-indigo-900 rounded-xl hover:bg-white/90 transition-colors"
          >
            <FaPaperPlane className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}