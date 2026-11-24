import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';
import { useSaved } from '../context/SavedContext';

export default function Navbar() {
  const { savedCount } = useSaved();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#ece5dd] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* High-End Brandmark: ROAM & CO. */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-[#fbf9f6] flex items-center justify-center font-black tracking-tighter text-base shadow-sm group-hover:bg-sage-900 transition-colors">
              R
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black tracking-tight text-stone-900 font-serif">
                  ROAM & CO.
                </span>
                <span className="text-[10px] font-bold tracking-widest text-sage-800 uppercase">
                  Travel
                </span>
              </div>
              <span className="text-[10px] font-semibold tracking-widest text-stone-600 uppercase block font-mono">
                Journeys Across South India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Curated Trips
            </Link>

            <Link
              to="/saved"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                isActive('/saved')
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-current text-terracotta-500' : ''}`} />
              <span>Wishlist</span>
              {savedCount > 0 && (
                <span
                  className={`ml-1 text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive('/saved')
                      ? 'bg-stone-800 text-white'
                      : 'bg-stone-900 text-white'
                  }`}
                >
                  {savedCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/saved"
              className="relative p-2 text-stone-700 hover:text-stone-900"
              aria-label="Wishlist"
            >
              <Bookmark className={`w-5 h-5 ${savedCount > 0 ? 'fill-terracotta-500 text-terracotta-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ece5dd] bg-[#fbf9f6] px-4 pt-3 pb-5 space-y-2 shadow-lg animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
              location.pathname === '/'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Curated Trips
          </Link>
          <Link
            to="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
              location.pathname === '/saved'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'fill-current' : ''}`} />
              <span>Saved Wishlist</span>
            </div>
            {savedCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-stone-200 text-stone-900">
                {savedCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
