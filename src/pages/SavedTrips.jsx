import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Bookmark, ArrowRight, ArrowLeft } from 'lucide-react';
import packagesData from '../data/packages.json';
import { useSaved } from '../context/SavedContext';
import PackageCard from '../components/PackageCard';

export default function SavedTrips() {
  const { savedIds } = useSaved();

  const savedPackages = packagesData.filter((pkg) => savedIds.includes(pkg.id));

  return (
    <div className="min-h-screen bg-[#fbf9f6] pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-[#ece5dd]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sage-800 bg-sage-50 px-2.5 py-1 rounded-lg mb-2">
                <Bookmark className="w-3.5 h-3.5 fill-current text-terracotta-500" />
                Persistent Wishlist
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Saved Trips Wishlist
              </h1>
              <p className="text-xs sm:text-sm text-stone-700 mt-1">
                Your bookmarked destinations are saved locally in your browser across sessions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Explore Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {savedPackages.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs sm:text-sm font-medium text-stone-600">
                You have <span className="font-bold text-stone-900">{savedPackages.length}</span> saved {savedPackages.length === 1 ? 'trip' : 'trips'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {savedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#e5ded5] p-12 text-center max-w-lg mx-auto shadow-sm my-12">
            <div className="w-14 h-14 bg-sage-50 text-sage-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Compass className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-stone-900">Your Wishlist is Empty</h2>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              Browse destinations and click the bookmark button on any trip card to save it here.
            </p>
            <div className="mt-5">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs transition shadow-sm"
              >
                <span>Browse Destinations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
