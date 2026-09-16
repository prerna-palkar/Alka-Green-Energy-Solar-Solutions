import React, { useState } from 'react';
import { MOCK_FAQS } from '../data/mockFaqs';
import Accordion from '../components/common/Accordion';
import { Search, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = MOCK_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 space-y-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Knowledge Base & Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-base">
          Find clear answers regarding rooftop solar systems, grid net metering, and installation workflows.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions (e.g. maintenance, net metering, roof suitability)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
        />
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {['all', 'general', 'residential', 'commercial', 'government', 'installation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      {filteredFaqs.length > 0 ? (
        <Accordion items={filteredFaqs} allowMultiple={true} />
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-slate-700 font-medium">No matching questions found.</p>
          <p className="text-xs text-slate-500">Try searching for a different keyword or view all categories.</p>
        </div>
      )}

    </div>
  );
}
