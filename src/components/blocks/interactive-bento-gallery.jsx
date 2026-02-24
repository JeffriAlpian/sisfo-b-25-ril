"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// --- 1. Komponen Media (Sederhana & Cepat) ---
const MediaElement = ({ item, isModal = false }) => {
  if (item.type === "video") {
    return (
      <video
        className="w-full h-full object-cover"
        autoPlay={isModal} // Hanya auto-play di dalam modal
        muted
        loop
        playsInline
        preload={isModal ? "auto" : "metadata"}
      >
        <source src={item.url} type="video/mp4" />
      </video>
    );
  }
  return (
    <img
      src={item.url}
      alt={item.title}
      className="w-full h-full object-cover"
    />
  );
};

// --- 2. Komponen Utama ---
const SimpleBentoGallery = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">

      {/* Bento Grid (Tanpa Drag) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
        {mediaItems.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedItem(item)}
            className={`relative rounded-2xl overflow-hidden cursor-pointer bg-gray-100 ${item.span}`}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
          >
            <MediaElement item={item} />

            {/* Overlay Hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm font-medium">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Konten Modal */}
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              className="relative bg-white rounded-3xl overflow-hidden w-full max-w-4xl z-10 shadow-2xl"
            >
              <div className="aspect-video w-full bg-black">
                <MediaElement item={selectedItem} isModal={true} />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                <p className="text-gray-600 mt-2">{selectedItem.desc}</p>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );2
};

export default SimpleBentoGallery;
