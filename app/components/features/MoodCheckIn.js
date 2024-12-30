'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigation } from '../NavigationContext';

export default function MoodCheckIn() {
  const { goBack } = useNavigation();
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodSubmit = (e) => {
    e.preventDefault();
    if (mood) {
      setMoodHistory([...moodHistory, mood]);
      setMood('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4"
    >
      <button onClick={goBack} className="mb-4 flex items-center gap-2 text-white hover:text-gray-200">
        <FaArrowLeft /> Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Daily Mood Check-In</h2>
      <form onSubmit={handleMoodSubmit} className="flex gap-4">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling today?"
          className="flex-1 p-3 rounded-xl border border-gray-300"
        />
        <button type="submit" className="p-3 bg-blue-500 text-white rounded-xl">
          Submit
        </button>
      </form>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Mood History:</h3>
        <ul>
          {moodHistory.map((mood, index) => (
            <li key={index} className="text-gray-700">{mood}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
} 