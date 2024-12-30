import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, icon, delay, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      onClick={onClick}
      className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl w-full cursor-pointer transition-all duration-300"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/[0.15] to-transparent opacity-50"
        style={{
          maskImage: 'radial-gradient(circle at 50% 0%, black, transparent 70%)'
        }}
      />
      
      <div className="relative z-10">
        <motion.div 
          className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 border border-white/30"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>

        <motion.h3 
          className="text-2xl font-bold mb-3 text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        >
          {title}
        </motion.h3>

        <motion.p 
          className="text-gray-200 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}