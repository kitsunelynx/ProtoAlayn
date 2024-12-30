'use client';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaClock, FaUser } from 'react-icons/fa';
import { useNavigation } from '../NavigationContext';

export default function TeleHealth() {
  const { goBack } = useNavigation();
  
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
      
      <form className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-100">Select Doctor</label>
          <select className="w-full p-3 rounded-lg border border-blue-400 bg-white/10 text-white">
            <option>Dr. Sarah Johnson - Psychiatrist</option>
            <option>Dr. Michael Chen - Therapist</option>
            <option>Dr. Emily Brown - Counselor</option>
          </select>
        </div>
        
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
  );
} 