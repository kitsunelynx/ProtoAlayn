'use client';
import { motion } from 'framer-motion';

export default function Background() {
  return (
    <>
      <div 
        className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>
    </>
  );
} 