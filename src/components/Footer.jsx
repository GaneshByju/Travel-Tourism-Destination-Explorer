import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f5f0eb] text-stone-700 border-t border-[#e8ded4] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#e2d7cc]">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-stone-900 text-[#fbf9f6] flex items-center justify-center font-black text-sm tracking-tighter">
                R
              </div>
              <div>
                <span className="text-xl font-black text-stone-900 tracking-tight font-serif">
                  ROAM & CO.
                </span>
                <span className="text-[10px] font-bold text-sage-800 uppercase block tracking-widest">
                  Bespoke South India Getaways
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-sm leading-relaxed">
              Curating exceptional slow travel journeys across tea highlands, emerald lagoons, and timeless stone monuments.
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Explorer
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-stone-600 hover:text-stone-900 transition-colors inline-flex items-center gap-1 group">
                  <span>Curated Packages</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-stone-800 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/saved" className="text-stone-600 hover:text-stone-900 transition-colors inline-flex items-center gap-1 group">
                  <span>Saved Wishlist</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-stone-800 transition-colors" />
                </Link>
              </li>
              <li>
                <button 
                  onClick={scrollToTop} 
                  className="text-stone-500 hover:text-stone-900 transition-colors cursor-pointer text-left"
                >
                  Back to Top ↑
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Featured Circuits
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Munnar Tea Hills',
                'Alleppey Houseboats',
                'Wayanad Rainforests',
                'Hampi Boulder Trails',
                'Varkala Cliff Coast',
                'Nilgiri Toy Train',
                'Dandeli Kali River',
                'Great Living Temples'
              ].map((region, idx) => (
                <span
                  key={idx}
                  className="bg-white/90 border border-[#e2d7cc] text-stone-800 text-[11px] px-2.5 py-1 rounded-lg font-medium"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} ROAM & CO. Travel. All rights reserved.</p>
          <p className="text-[11px] text-stone-400">
            Handcrafted luxury itineraries across South India
          </p>
        </div>
      </div>
    </footer>
  );
}
