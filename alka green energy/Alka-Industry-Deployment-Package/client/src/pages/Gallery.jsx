import React, { useState } from 'react';
import { MOCK_GALLERY } from '../data/mockGallery';
import Modal from '../components/common/Modal';
import { Eye, MapPin, Tag } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const filteredImages = filter === 'all'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((img) => img.category === filter);

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Installation Photos
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
          Solar Gallery
        </h1>
        <p className="text-slate-600 text-base">
          Visual glimpses of rooftop structures, monocrystalline arrays, and electrical distribution boxes.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {['all', 'residential', 'commercial', 'industrial', 'equipment'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              filter === cat
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'All Photos' : cat}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-slate-600 font-medium">No images found in this category.</p>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setActiveImage(img)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">{img.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-600" />
                  {img.categoryLabel}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {img.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Preview Modal */}
      {activeImage && (
        <Modal
          isOpen={!!activeImage}
          onClose={() => setActiveImage(null)}
          title={activeImage.title}
        >
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden max-h-[60vh]">
              <img src={activeImage.url} alt={activeImage.title} className="w-full h-full object-contain max-h-[60vh] mx-auto bg-slate-950" />
            </div>
            <div className="space-y-2">
              <p className="text-slate-700 text-sm">{activeImage.caption}</p>
              <div className="flex gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>Location: <strong>{activeImage.location}</strong></span>
                <span>Category: <strong>{activeImage.categoryLabel}</strong></span>
                {activeImage.capacity !== 'N/A' && <span>Capacity: <strong>{activeImage.capacity}</strong></span>}
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
