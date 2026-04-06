"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const BOARDS = ["Inspiration", "Mood Board", "Projects", "Design", "Travel"];

export default function PinCreate() {
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    board: "",
  });
  
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 20 * 1024 * 1024) {
      alert("File must be under 20MB.");
      return;
    }
    setImage(URL.createObjectURL(file));
  }, []);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePublish = () => {
    if (!image) return alert("Please upload an image.");
    if (!form.title.trim()) return alert("Please add a title.");
    console.log("Publishing pin:", { image, ...form });
  };

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-10 bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-100">
      {/* LEFT: Upload Area */}
      <div
        className={`w-full md:w-[44%] min-h-[500px] relative flex items-center justify-center cursor-pointer transition-colors duration-200 ${
          isDragging ? "bg-zinc-200" : "bg-zinc-50"
        } md:border-r border-zinc-100`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !image && fileInputRef.current?.click()}
      >
        {!image ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center select-none">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
              <Upload className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-800 font-serif">
                Drop your image here
              </p>
              <p className="text-xs text-zinc-400 mt-1">or click to browse</p>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              High-quality .jpg under 20MB
              <br />
              recommended for best results
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <>
            <Image
              src={image}
              alt="Pin preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 44vw"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 transition-colors text-sm shadow-sm"
              aria-label="Remove image"
            >
              ✕
            </button>
          </>
        )}
      </div>

      {/* RIGHT: Form */}
      <div className="w-full md:w-[56%] flex flex-col px-8 py-9 gap-6">
        {/* Title */}
        <div>
          <label className="block text-[10px] tracking-widest uppercase font-semibold text-zinc-400 mb-1">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={handleFormChange("title")}
            placeholder="Add a title"
            className="w-full border-0 border-b-[1.5px] border-zinc-200 focus:border-zinc-900 bg-transparent text-xl font-serif text-zinc-900 placeholder:text-zinc-300 py-2 outline-none transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[10px] tracking-widest uppercase font-semibold text-zinc-400 mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={handleFormChange("description")}
            placeholder="Add a detailed description"
            rows={3}
            className="w-full border-0 border-b-[1.5px] border-zinc-200 focus:border-zinc-900 bg-transparent text-sm text-zinc-600 placeholder:text-zinc-300 py-2 outline-none transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-[10px] tracking-widest uppercase font-semibold text-zinc-400 mb-1">
            Link
          </label>
          <input
            type="url"
            value={form.link}
            onChange={handleFormChange("link")}
            placeholder="https://example.com"
            className="w-full border-0 border-b-[1.5px] border-zinc-200 focus:border-zinc-900 bg-transparent text-sm text-zinc-600 placeholder:text-zinc-300 py-2 outline-none transition-colors"
          />
        </div>

        {/* Board */}
        <div>
          <label className="block text-[10px] tracking-widest uppercase font-semibold text-zinc-400 mb-2">
            Board
          </label>
          <select
            value={form.board}
            onChange={handleFormChange("board")}
            className="w-full px-3 py-2.5 border-[1.5px] border-zinc-200 focus:border-zinc-900 rounded-xl text-sm text-zinc-600 bg-white outline-none transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
            }}
          >
            <option value="">Choose a board</option>
            {BOARDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
          <span className="text-xs text-zinc-300">Draft saved</span>
          <button
            onClick={handlePublish}
            className="bg-[#e60023] hover:bg-[#c0001d] active:scale-95 text-white font-semibold text-sm px-7 py-3 rounded-full transition-all duration-150"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
