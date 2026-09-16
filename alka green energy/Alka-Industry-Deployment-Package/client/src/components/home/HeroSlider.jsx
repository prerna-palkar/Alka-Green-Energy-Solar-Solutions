import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    category: "Residential Solar",
    title: "Power Your Home With Clean Solar Energy",
    subtitle: "Eliminate high monthly power bills with rooftop solar power systems engineered specifically for residential homes.",
    ctaText: "Explore Home Solar",
    ctaPath: "/services/residential",
    secondaryCta: "Get Free Quote",
    secondaryPath: "/contact",
    bgImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80",
    badge: "Residential Solutions"
  },
  {
    id: 2,
    category: "Commercial Solar",
    title: "Reduce Your Business Energy Costs",
    subtitle: "Protect your commercial enterprise from rising grid tariffs with turnkey rooftop solar installations.",
    ctaText: "Commercial Solutions",
    ctaPath: "/services/commercial",
    secondaryCta: "Contact Sales",
    secondaryPath: "/contact",
    bgImage: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1600&q=80",
    badge: "Commercial Power"
  },
  {
    id: 3,
    category: "Industrial Solar",
    title: "Smart Solar Solutions for Industry",
    subtitle: "High-capacity solar plants designed for factories, processing units, and warehouses with heavy daytime power demands.",
    ctaText: "Industrial Plants",
    ctaPath: "/services/industrial",
    secondaryCta: "Schedule Site Visit",
    secondaryPath: "/contact",
    bgImage: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1600&q=80",
    badge: "Industrial Scale"
  },
  {
    id: 4,
    category: "General Consultation",
    title: "Switch to Solar With Alka Green Energy",
    subtitle: "From site survey and technical feasibility to net metering and commissioning in Beed & surrounding districts.",
    ctaText: "Talk to an Expert",
    ctaPath: "/contact",
    secondaryCta: "View Govt Schemes",
    secondaryPath: "/government-schemes",
    bgImage: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1600&q=80",
    badge: "Expert Guidance"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = SLIDES.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      }, 5000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentSlide, isPaused, slideCount]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  return (
    <div
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] bg-slate-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Dark Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-10000 ease-out"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />

          {/* Slide Content */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-2xl space-y-4 sm:space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{slide.badge}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-light">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to={slide.ctaPath}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to={slide.secondaryPath}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
                >
                  <span>{slide.secondaryCta}</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Controls */}
      <div className="absolute z-30 bottom-6 left-4 sm:left-8 right-4 sm:right-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        
        {/* Indicators */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-700 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-700 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
