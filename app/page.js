'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { NavigationProvider, useNavigation } from './components/NavigationContext';
import { FaVideo, FaChartLine, FaBrain, FaSmile, FaUserCircle } from 'react-icons/fa';
import TeleHealth from './components/features/TeleHealth';
import SelfAnalysis from './components/features/SelfAnalysis';
import AlaynMind from './components/features/AlaynMind';
import MoodCheckIn from './components/features/MoodCheckIn';

const menuOptions = [
  {
    id: 'telehealth',
    title: 'Telehealth',
    description: 'Connect with mental health professionals through video or text',
    gradient: 'from-purple-500 to-blue-500',
    icon: <FaVideo className="w-5 h-5 text-white/80" />
  },
  {
    id: 'alaynmind',
    title: 'Alayn-Your-Mind',
    description: 'AI-powered mental health companion',
    gradient: 'from-purple-400 to-blue-400',
    icon: <FaBrain className="w-5 h-5 text-white/80" />
  },
  {
    id: 'moodcheckin',
    title: 'Mood CheckIn',
    description: 'Daily mood check-in to track your feelings',
    gradient: 'from-green-400 to-blue-500',
    icon: <FaSmile className="w-5 h-5 text-white/80" />
  },
  {
    id: 'personalityanalysis',
    title: 'Personality Analysis',
    description: 'Analyze your personality traits and tendencies',
    gradient: 'from-red-400 to-yellow-500',
    icon: <FaUserCircle className="w-5 h-5 text-white/80" />
  }
];

function Button({ onClick, className = '', children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full px-8 py-3 rounded-full text-white font-medium 
        transition duration-200 ease-in-out
        hover:brightness-110 active:brightness-90 ${className}`}
    >
      {children}
    </motion.button>
  );
}

function MainContent() {
  const { currentView, navigate } = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const renderContent = () => {
    switch (currentView) {
      case 'telehealth':
        return <TeleHealth />;
      case 'selfanalysis':
        return <SelfAnalysis />;
      case 'alaynmind':
        return <AlaynMind />;
      case 'moodcheckin':
        return <MoodCheckIn />;
      case 'personalityanalysis':
        return <SelfAnalysis />;
      case 'features':
        return (
          <motion.div
            key="options-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto p-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <button
                    onClick={() => navigate(option.id)}
                    className={`w-full p-6 bg-gradient-to-r ${option.gradient} 
                      rounded-xl text-left space-y-2 backdrop-blur-lg
                      shadow-lg transition-colors duration-200
                      hover:brightness-110 active:brightness-90`}
                  >
                    <div className="flex items-center gap-3">
                      {option.icon}
                      <h3 className="text-xl font-bold text-white">{option.title}</h3>
                    </div>
                    <p className="text-white/80 text-sm">{option.description}</p>
                  </button>
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => navigate('home')}
              className="mt-8 text-white/60 hover:text-white flex items-center gap-2"
              whileHover={{ x: -5 }}
            >
              ← Back to main menu
            </motion.button>
          </motion.div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <motion.div
              className="text-center space-y-6 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Alayn
              </h1>
              <p className="text-gray-300 max-w-md mx-auto">
                Your journey to mental wellness begins in this safe space
              </p>
              <div className="flex flex-col space-y-4 w-full">
                <Button 
                  onClick={() => navigate('features')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  Start Your Journey
                </Button>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          className="relative z-10 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <NavigationProvider>
      <MainContent />
    </NavigationProvider>
  );
}