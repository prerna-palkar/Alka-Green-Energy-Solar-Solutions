import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Menu, X, ChevronDown, Phone, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../utils/config';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{BUSINESS_CONFIG.landmark}, {BUSINESS_CONFIG.street}, {BUSINESS_CONFIG.city}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-emerald-400 font-medium">Clean Energy for Beed & Beyond</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`bg-white/95 backdrop-blur-md transition-all duration-200 border-b border-emerald-100 ${scrolled ? 'shadow-md py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 bg-clip-text text-transparent block leading-tight">
                ALKA GREEN ENERGY
              </span>
              <span className="text-[10px] tracking-wider font-bold text-amber-600 uppercase block">
                SOLAR SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                return (
                  <div key={link.label} className="relative group">
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        isActive('/services')
                          ? 'text-emerald-700 bg-emerald-50 font-semibold'
                          : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                      }`}
                      aria-expanded={servicesDropdownOpen}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl rounded-xl">
                      <div className="bg-white rounded-xl border border-slate-100 shadow-lg py-2 overflow-hidden">
                        {link.children.map((subLink) => (
                          <Link
                            key={subLink.path}
                            to={subLink.path}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              location.pathname === subLink.path
                                ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isActive(link.path)
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Get Consultation</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-in">
            <div className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.label} className="py-1">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                        Services
                      </div>
                      {link.children.map((subLink) => (
                        <Link
                          key={subLink.path}
                          to={subLink.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block px-5 py-2 text-sm rounded-lg ${
                            location.pathname === subLink.path
                              ? 'bg-emerald-50 text-emerald-700 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 text-base font-medium rounded-lg ${
                      isActive(link.path)
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-md active:scale-98"
              >
                Get Free Consultation
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
