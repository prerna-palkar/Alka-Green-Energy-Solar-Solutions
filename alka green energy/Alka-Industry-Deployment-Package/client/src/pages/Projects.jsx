import React, { useState } from 'react';
import { MOCK_PROJECTS } from '../data/mockProjects';
import { MapPin, Calendar, Zap, Filter } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all'
    ? MOCK_PROJECTS
    : MOCK_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Portfolio & Case Studies
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
          Solar Installation Portfolio
        </h1>
        <p className="text-slate-600 text-base">
          Explore representative rooftop solar power installations across Beed.
        </p>

        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800 max-w-xl mx-auto">
          <strong>Note:</strong> Displayed project entries are representative editable defaults until verified client project logs are published.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filter === 'all'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Projects ({MOCK_PROJECTS.length})
        </button>
        <button
          onClick={() => setFilter('residential')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filter === 'residential'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Residential
        </button>
        <button
          onClick={() => setFilter('commercial')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filter === 'commercial'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Commercial
        </button>
        <button
          onClick={() => setFilter('industrial')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            filter === 'industrial'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Industrial
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-xs px-3 py-1 rounded-full border border-slate-700">
                {p.capacity}
              </div>
              <div className="absolute top-3 left-3 bg-emerald-600 text-white font-semibold text-[11px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                {p.categoryLabel}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {p.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {p.installationDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
