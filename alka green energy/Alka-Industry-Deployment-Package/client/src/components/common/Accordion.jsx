import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items, allowMultiple = false }) {
  const [openIndices, setOpenIndices] = useState([0]); // First open by default

  const toggleIndex = (index) => {
    if (allowMultiple) {
      if (openIndices.includes(index)) {
        setOpenIndices(openIndices.filter((i) => i !== index));
      } else {
        setOpenIndices([...openIndices, index]);
      }
    } else {
      setOpenIndices(openIndices.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={item.id || index}
            className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200 shadow-sm hover:border-emerald-200"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full px-5 py-4 text-left font-medium text-slate-800 flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                {item.question || item.title}
              </span>
              <div className={`p-1.5 rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-100 text-emerald-700' : ''}`}>
                <ChevronDown className="w-5 h-5 shrink-0" />
              </div>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-slate-600 leading-relaxed text-sm sm:text-base border-t border-slate-100 bg-slate-50/50">
                {item.answer || item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
