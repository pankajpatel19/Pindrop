"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function ShowPins({ pins }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-6 space-y-6"
      >
        {pins?.pins?.map((pin) => (
          <motion.div
            key={pin._id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="break-inside-avoid mb-6 group h-fit"
          >
            <div className="relative overflow-hidden rounded-3xl bg-zinc-50 shadow-sm border border-zinc-100 transition-all cursor-pointer">
              <Link href={`/home/pin-creation/${pin._id}`}>
                <Image
                  src={pin?.image}
                  alt={pin?.title}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover rounded-3xl transition-all duration-500 group-hover:brightness-90"
                  loading="lazy"
                />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ShowPins;
