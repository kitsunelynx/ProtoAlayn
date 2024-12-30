'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { NavigationProvider, useNavigation } from './components/NavigationContext';
import FeatureCard from './components/FeatureCard';
import TeleHealth from './components/features/TeleHealth';
import SelfAnalysis from './components/features/SelfAnalysis';
import AlaynMind from './components/features/AlaynMind';
import { FaVideo, FaChartLine, FaBrain } from 'react-icons/fa';

function MainContent() {
  const { currentView, navigate } = useNavigation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      id: 'telehealth',
      title: "Telehealth Services",
      description: "Connect with licensed therapists through secure video sessions.",
      icon: <FaVideo className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      delay: 0.2
    },
    {
      id: 'selfanalysis',
      title: "Self Analysis",
      description: "Track your mental well-being with AI-powered tools.",
      icon: <FaChartLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      delay: 0.4
    },
    {
      id: 'alaynmind',
      title: "Alayn Your Mind",
      description: "Discover curated resources for mental wellness.",
      icon: <FaBrain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      delay: 0.6
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'telehealth':
        return <TeleHealth />;
      case 'selfanalysis':
        return <SelfAnalysis />;
      case 'alaynmind':
        return <AlaynMind />;
      default:
        return (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                onClick={() => navigate(feature.id)}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 60%)`,
            transition: 'background-position 0.3s ease',
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          className="relative z-10 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {currentView === 'home' ? (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
              <motion.div
                className="text-center space-y-6 md:space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white animate-shine">
                  Alayn
                </h1>
                <p className="text-base md:text-lg text-gray-200 max-w-lg mx-auto">
                  Your journey to mental wellness begins here
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 bg-white bg-opacity-10 backdrop-blur-sm text-white rounded-full font-semibold shadow-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
                  onClick={() => navigate('features')}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </div>
          ) : (
            renderContent()
          )}
        </motion.div>
      </AnimatePresence>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shine {
          from {
            background-position: 200% center;
          }
          to {
            background-position: -200% center;
          }
        }

        .animate-shine {
          background-size: 200% auto;
          animation: shine 6s linear infinite;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
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