"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";

const concepts = [
  { text: "weeknight dinner idea", color: "#c28b00" },
  { text: "home decor idea", color: "#618c03" },
  { text: "garden project", color: "#0076d3" },
  { text: "style inspiration", color: "#407a57" },
  { text: "DIY project", color: "#c28b00" },
];

export default function LandingContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % concepts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden font-sans">
      {/* Dynamic Background Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="columns-2 sm:columns-3 md:columns-5 lg:columns-7 gap-4 p-4">
          {[...Array(21)].map((_, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className="mb-4 rounded-3xl bg-gray-100 overflow-hidden shadow-sm aspect-[3/4]"
            >
              <img 
                src={`https://images.unsplash.com/photo-${1500000000000 + (i * 1234567) % 1000000000}?auto=format&fit=crop&q=60&w=400`} 
                alt="inspiration" 
                className="w-full h-full object-cover grayscale-[0.2]"
              />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-white/10" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen">
        <section className="flex-1 flex flex-col items-center justify-center pt-20 px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] max-w-4xl"
          >
            Get your next <br />
            <div className="h-[1.2em] relative overflow-hidden flex justify-center mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute"
                  style={{ color: concepts[index].color }}
                >
                  {concepts[index].text}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-lg sm:text-2xl text-gray-600 font-medium max-w-xl"
          >
             Explore thousands of ideas to find yours on Pinterest.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 w-full max-w-lg relative group"
          >
             <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
               <Search className="w-6 h-6 text-gray-400 group-focus-within:text-gray-700 transition-colors" />
             </div>
             <input 
                type="text" 
                className="w-full h-16 bg-gray-50 border-2 border-transparent focus:border-red-100 rounded-full pl-16 pr-8 text-xl text-gray-800 placeholder:text-gray-400 focus:outline-none shadow-md transition-all cursor-default"
                placeholder={`Search for ${concepts[index].text.split(" ").slice(-2).join(" ")}...`}
                readOnly
             />
             <div className="absolute right-3 top-3 bottom-3 bg-[#e60023] hover:bg-[#ad081b] text-white px-6 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-colors shadow-sm active:scale-95">
                Explore
             </div>
          </motion.div>
        </section>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Scroll to Explore</span>
        <ChevronDown size={20} />
      </motion.div>
    </div>
  );
}
