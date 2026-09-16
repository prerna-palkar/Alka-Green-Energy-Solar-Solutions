import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, Calendar, ArrowRight } from 'lucide-react';
import { MOCK_PROJECTS } from '../../data/mockProjects';

export default function ProjectsPreview() {
  // Show first 3 projects on homepage preview
  const previewProjects = MOCK_PROJECTS.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Installation Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Featured Solar Installations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-2">
              Representative rooftop solar projects across residential, commercial, and industrial sites in Beed.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
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
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
