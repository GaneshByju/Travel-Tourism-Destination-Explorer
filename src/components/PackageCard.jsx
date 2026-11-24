import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSaved } from '../context/SavedContext';

export default function PackageCard({ pkg }) {
  const { isSaved, toggleSave } = useSaved();
  const bookmarked = isSaved(pkg.id);

  const imageList = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (imageList.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % imageList.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [imageList.length, isPaused]);

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % imageList.length);
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-[#e8ded4] shadow-[0_2px_12px_rgba(50,40,30,0.04)] hover:shadow-[0_16px_36px_rgba(50,40,30,0.09)] transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Thumbnail Carousel Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 select-none">
        {/* Sliding images */}
        <div 
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {imageList.map((imgUrl, i) => (
            <div key={i} className="min-w-full h-full shrink-0 relative">
              <img
                src={imgUrl}
                alt={`${pkg.title} - photo ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>

        {/* Carousel Prev/Next */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 backdrop-blur-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 backdrop-blur-sm cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Indicator dots */}
        {imageList.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-stone-900/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {imageList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIdx(dotIdx);
                }}
                aria-label={`Go to image ${dotIdx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  dotIdx === currentIdx
                    ? 'w-3.5 h-1.5 bg-[#fbf9f6]'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 left-3 bg-[#fbf9f6]/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-stone-800 shadow-sm z-10 tracking-tight">
          {pkg.category}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSave(pkg.id, pkg.title);
          }}
          aria-label={bookmarked ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm z-10 cursor-pointer ${
            bookmarked
              ? 'bg-terracotta-600 text-white hover:bg-terracotta-700 scale-105'
              : 'bg-[#fbf9f6]/90 text-stone-700 hover:bg-white hover:text-terracotta-600 hover:scale-105'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-white' : ''}`} />
        </button>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 text-[11px] font-medium text-stone-100 z-10">
          <Clock className="w-3 h-3 text-stone-300" />
          <span>{pkg.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-stone-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-sage-600" />
              <span>{pkg.location}</span>
            </div>
            <div className="flex items-center gap-1 text-stone-900 font-bold">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{pkg.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-sage-700 transition-colors line-clamp-2">
            {pkg.title}
          </h3>

          {/* Summary */}
          <p className="text-stone-600 text-xs mt-2 line-clamp-2 leading-relaxed">
            {pkg.summary}
          </p>

          {/* Highlights tags */}
          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {pkg.highlights.slice(0, 2).map((h, i) => (
                <span
                  key={i}
                  className="bg-stone-50 border border-stone-200/60 text-stone-700 text-[11px] px-2 py-0.5 rounded-md truncate max-w-[200px]"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-stone-600 block font-semibold uppercase tracking-wider">Per Person</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-extrabold text-stone-900">
                ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <Link
            to={`/package/${pkg.id}`}
            className="inline-flex items-center gap-1.5 bg-sage-800 hover:bg-sage-900 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
