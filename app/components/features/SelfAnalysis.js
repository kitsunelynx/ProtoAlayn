'use client';
import { motion } from 'framer-motion';
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
    
    // Simulate bot response
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
      className="flex flex-col h-screen bg-white"
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={goBack} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" /> Back
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Self Analysis</h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                  message.isBot 
                    ? 'bg-white border border-gray-100' 
                    : 'bg-blue-600 text-white'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border-t border-gray-100">
        <form onSubmit={sendMessage} className="max-w-4xl mx-auto p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <FaPaperPlane className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}