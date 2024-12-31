import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaPaperPlane, FaTrash } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

export default function SelfAnalysis() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load conversation history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('conversationHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initialize with a welcome message if no history exists
      setMessages([
        { text: "Hi! I'm your AI-powered mental wellness assistant. How are you feeling today?", isBot: true }
      ]);
    }
  }, []);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('conversationHistory', JSON.stringify(messages));
  }, [messages]);

  const analyzeMessage = async (userMessage) => {
    try {
      const prompt = `<system>You are Athena. As a mental wellness assistant, provide a thoughtful and empathetic response to: <user>"${userMessage}</user>". 
                     Focus on understanding emotions, offering support, and encouraging self-reflection. 
                     Keep the response concise and conversational. Avoid clinical terminology. Dont assist with anything else. </system>`;
      
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('AI Generation Error:', error);
      return "I apologize, but I'm having trouble processing that right now. Could you rephrase or try again?";
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    
    setIsLoading(true);
    const typingMessage = { text: "...", isBot: true, isTyping: true };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const aiResponse = await analyzeMessage(userMessage);
      
      // Remove typing indicator and add AI response
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [...prev, { text: aiResponse, isBot: true }]);
    } catch (error) {
      console.error('Message Processing Error:', error);
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([
      { text: "Hi! I'm your AI-powered mental wellness assistant. How are you feeling today?", isBot: true }
    ]);
    localStorage.removeItem('conversationHistory');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-gradient-to-br from-indigo-900 to-purple-900"
    >
      <div className="glass-panel border-b border-white/10 p-4 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <motion.button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-white/90 hover:text-white"
            whileHover={{ x: -5 }}
          >
            <FaArrowLeft /> Back
          </motion.button>
          <h1 className="text-xl font-bold text-white">Athena</h1>
          <motion.button
            onClick={clearHistory}
            className="flex items-center gap-2 text-white/90 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTrash /> Clear
          </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode='popLayout'>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] p-4 rounded-xl shadow-lg ${
                    message.isBot 
                      ? 'bg-white/10 backdrop-blur-md text-white' 
                      : 'bg-white/90 backdrop-blur-md text-indigo-900'
                  } ${message.isTyping ? 'animate-pulse' : ''}`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <form onSubmit={sendMessage} className="glass-panel border-t border-white/10 p-4 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts..."
            disabled={isLoading}
            className="flex-1 p-3 rounded-xl bg-white/10 text-white placeholder-white/50 
                     focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white text-indigo-900 rounded-xl hover:bg-white/90 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}