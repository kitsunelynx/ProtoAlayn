import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, icon, delay, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl w-full cursor-pointer transition-all duration-300 h-full"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-200 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}