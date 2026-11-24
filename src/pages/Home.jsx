import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, Compass } from 'lucide-react';
import packagesData from '../data/packages.json';
import PackageCard from '../components/PackageCard';

const CATEGORIES = ['All', 'Hill Station', 'Beach', 'Heritage', 'Adventure'];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Filter & Sort Logic
  const filteredPackages = useMemo(() => {
    return packagesData
      .filter((pkg) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          pkg.title.toLowerCase().includes(query) ||
          pkg.location.toLowerCase().includes(query);

        const matchesCategory =
          selectedCategory === 'All' || pkg.category.toLowerCase() === selectedCategory.toLowerCase();

        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.pricePerPerson - b.pricePerPerson;
        } else if (sortBy === 'price-high') {
          return b.pricePerPerson - a.pricePerPerson;
        } else if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#fbf9f6]">
      {/* Warm, Organic Hero + Command Search Bar */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 bg-gradient-to-b from-[#f5f0eb]/70 via-[#fbf9f6] to-[#fbf9f6] border-b border-[#ece5dd]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Typography */}
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-widest text-sage-700 uppercase">
              Curated Travel Explorer
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.18] mt-2">
              Unwind in South India's Most Inspiring Corners.
            </h1>
            <p className="mt-3 text-stone-700 text-sm sm:text-base leading-relaxed">
              Misty tea plantations in Munnar, backwater houseboats in Alleppey, and sunlit ruins across Hampi and Coonoor.
            </p>
          </div>

          {/* Warm Sand & Sage Search Bar */}
          <div className="mt-8 bg-white rounded-2xl border border-[#e5ded5] shadow-[0_4px_24px_rgba(70,55,40,0.05)] p-2 sm:p-2.5 transition-all">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
              {/* Search input */}
              <div className="flex-1 relative flex items-center">
                <Search className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by destination or place (e.g. Munnar, Alleppey, Hampi)..."
                  className="w-full pl-11 pr-4 py-3 bg-transparent rounded-xl text-sm placeholder:text-stone-400 text-stone-800 focus:outline-none focus:bg-stone-50/50 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mr-3 text-xs text-stone-400 hover:text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-stone-200" />

              {/* Sort selector */}
              <div className="flex items-center gap-2 px-2 sm:px-3">
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent py-2.5 text-xs sm:text-sm font-semibold text-stone-700 focus:outline-none cursor-pointer pr-3"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="pt-2.5 mt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2 px-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        active
                          ? 'bg-sage-800 text-white shadow-sm'
                          : 'bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Counter indicator */}
              <div className="text-xs text-stone-700 font-medium px-2 py-1">
                Showing <strong className="text-stone-900 font-bold">{filteredPackages.length}</strong> {filteredPackages.length === 1 ? 'trip' : 'trips'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Grid Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Results title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              {selectedCategory === 'All' ? 'All Handcrafted Packages' : `${selectedCategory} Escapes`}
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-0.5">
              Curated experiences with real-time browser calculation
            </p>
          </div>

          {(searchQuery || selectedCategory !== 'All' || sortBy !== 'featured') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSortBy('featured');
              }}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 underline underline-offset-4 transition"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Responsive Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center my-6 shadow-sm max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-800">No destinations found</h3>
            <p className="text-xs text-stone-500 mt-1">
              No packages match "{searchQuery}" under "{selectedCategory}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 inline-flex items-center px-4 py-2 bg-sage-800 text-white text-xs font-semibold rounded-xl hover:bg-sage-900 transition"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
