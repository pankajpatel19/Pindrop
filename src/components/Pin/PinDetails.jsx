"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  Heart,
  MoreHorizontal,
  Share2,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/utils/axios";

function PinDetail({ pin }) {
  const router = useRouter();

  const handleSave = async () => {
    try {
      const res = await api.post(`/pins/save/${pin._id}`);
      const data = await res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!pin)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        Loading Pin...
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4 md:px-10">
      {/* Top Navigation */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors p-2 rounded-full hover:bg-zinc-200"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-semibold">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-[32px] overflow-hidden shadow-xl border border-zinc-100 flex flex-col md:flex-row"
      >
        {/* Left: Image Section */}
        <div className="w-full md:w-[55%] relative bg-zinc-100 min-h-[400px]">
          <Image
            src={pin?.image}
            alt={pin?.altText || pin?.title}
            width={1000}
            height={1500}
            className="w-full h-full object-contain md:object-cover"
            priority
          />
        </div>

        {/* Right: Content Section */}
        <div className="w-full md:w-[45%] flex flex-col p-8 md:p-12">
          {/* Action Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <IconButton icon={<Share2 size={20} />} />
              <IconButton icon={<MoreHorizontal size={20} />} />
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 font-semibold text-zinc-900 px-4 py-3 rounded-full hover:bg-zinc-100 transition-colors">
                <span>Profile</span>
                <ChevronDown size={16} />
              </button>
              <button
                className="bg-[#e60023] hover:bg-[#c0001d] text-white font-semibold py-3 px-8 rounded-full transition-transform active:scale-95 shadow-md"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2">
            {pin?.website && (
              <a
                href={pin.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border-b-2 border-zinc-900 pb-0.5 mb-6 hover:opacity-70 transition-opacity"
              >
                <span className="truncate max-w-[200px]">
                  {new URL(pin.website).hostname}
                </span>
                <ExternalLink size={14} />
              </a>
            )}

            <h1 className="text-4xl font-bold text-zinc-900 leading-tight mb-4 tracking-tight">
              {pin?.title || "Untitled Pin"}
            </h1>

            <p className="text-zinc-600 text-lg leading-relaxed mb-10">
              {pin?.description}
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {pin?.category && (
                <span className="px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold tracking-wide uppercase">
                  {pin.category}
                </span>
              )}
              {pin?.tags && (
                <span className="px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold tracking-wide uppercase">
                  Tags: {pin.tags}
                </span>
              )}
            </div>

            {/* Creator Info */}
            <div className="flex items-center justify-between py-6 border-t border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden flex items-center justify-center text-zinc-500 font-bold">
                  {pin?.user?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">User</h4>
                  <p className="text-zinc-500 text-sm">Followers placeholder</p>
                </div>
              </div>
              <button className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-3 px-6 rounded-full transition-colors">
                Follow
              </button>
            </div>

            {/* Alt Text Box */}
            {pin?.altText && (
              <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                <h5 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">
                  Alt Text
                </h5>
                <p className="text-sm text-zinc-500 italic">{pin.altText}</p>
              </div>
            )}
          </div>

          {/* Comment Placeholder */}
          <div className="mt-6 pt-6 border-t border-zinc-100 text-center">
            <button className="text-zinc-400 text-sm font-semibold hover:text-zinc-900 transition-colors">
              Add a comment...
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IconButton({ icon }) {
  return (
    <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-900 hover:bg-zinc-100 transition-all active:scale-90">
      {icon}
    </button>
  );
}

export default PinDetail;
