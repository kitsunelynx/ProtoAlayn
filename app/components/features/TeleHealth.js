'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaCalendar, FaClock, FaUser, FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigation } from '../NavigationContext';

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    speciality: "Psychiatrist",
    location: "Mumbai, India",
    description: "Specializes in adult psychiatry with a focus on anxiety and depression."
  },
  {
    name: "Dr. Michael Chen",
    speciality: "Therapist",
    location: "Bangalore, India",
    description: "Experienced in cognitive behavioral therapy, particularly for stress management."
  },
  {
    name: "Dr. Emily Brown",
    speciality: "Counselor",
    location: "Delhi, India",
    description: "Focuses on family therapy and child psychology."
  }
];

export default function TeleHealth() {
  const { goBack } = useNavigation();
  const [expandedDoctor, setExpandedDoctor] = useState(null);

  // Function to toggle expansion of doctor card
  const toggleCard = (index) => {
    setExpandedDoctor(expandedDoctor === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-4 text-white"
    >
      <button onClick={goBack} className="mb-6 flex items-center gap-2 text-white hover:text-gray-200">
        <FaArrowLeft /> Back
      </button>
      
      <h2 className="text-2xl font-bold mb-6">Schedule Appointment</h2>
      
      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.map((doctor, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.02 }}
            className="card-gradient p-6 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleCard(index)}>
              <div>
                <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                <p className="text-sm text-white/80"><FaUser className="inline mr-2" /> {doctor.speciality}</p>
              </div>
              <motion.div
                animate={{ rotate: expandedDoctor === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="text-white/80" />
              </motion.div>
            </div>
            
            <p className="text-sm text-white/80 mb-2"><FaMapMarkerAlt className="inline mr-2" /> {doctor.location}</p>
            <p className="text-sm text-white/80 mb-4">{doctor.description}</p>

            <AnimatePresence>
              {expandedDoctor === index && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/90">Date</label>
                      <input 
                        type="date" 
                        className="w-full p-3 rounded-xl glass-button text-white" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white/90">Time Slot</label>
                      <select className="w-full p-3 rounded-xl glass-button text-white">
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                      </select>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold
                        hover:bg-white/90 transition-all duration-300"
                    >
                      Book Appointment
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}