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
            className="bg-white/10 p-4 rounded-lg border border-blue-400 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleCard(index)}>
              <div>
                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                <p className="text-sm text-gray-300"><FaUser className="inline mr-1" /> {doctor.speciality}</p>
              </div>
              {expandedDoctor === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            
            <p className="text-sm text-gray-300 mb-2"><FaMapMarkerAlt className="inline mr-1" /> {doctor.location}</p>
            <p className="text-sm text-gray-300 mb-4">{doctor.description}</p>

            <AnimatePresence>
              {expandedDoctor === index && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2"
                >
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-100">Date</label>
                      <input type="date" className="w-full p-3 rounded-lg border border-blue-400 bg-white/10 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-100">Time Slot</label>
                      <select className="w-full p-3 rounded-lg border border-blue-400 bg-white/10 text-white">
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                      </select>
                    </div>
                    
                    <button className="w-full bg-white text-blue-900 py-3 rounded-lg hover:bg-blue-50">
                      Book Appointment
                    </button>
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