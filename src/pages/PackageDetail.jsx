import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, MapPin, Clock, CheckCircle2, XCircle, 
  Bookmark, ShieldCheck, Compass, Eye, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import packagesData from '../data/packages.json';
import { useSaved } from '../context/SavedContext';

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSaved();

  const pkg = packagesData.find((p) => p.id === id);
  const bookmarked = pkg ? isSaved(pkg.id) : false;

  const galleryImages = pkg?.images && pkg.images.length > 0 ? pkg.images : (pkg ? [pkg.image] : []);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
          <Compass className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Destination Not Found</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-md">
          The travel package you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Explorer</span>
          </button>

          <button
            onClick={() => toggleSave(pkg.id, pkg.title)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              bookmarked
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{bookmarked ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title & Metadata */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px]">
              {pkg.category}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {pkg.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {pkg.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-bold text-slate-800">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {pkg.rating.toFixed(1)} Rating
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {pkg.title}
          </h1>
        </div>

        {/* Interactive Photo Gallery with Main Stage & Thumbnails */}
        <div className="mb-10 space-y-3">
          {/* Main Stage Image */}
          <div 
            onClick={() => setLightboxOpen(true)}
            className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] max-h-[500px] bg-slate-900 group cursor-pointer shadow-md"
          >
            <img
              src={galleryImages[selectedImgIdx]}
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 sm:left-6 sm:bottom-6 flex items-center justify-between right-4 sm:right-6 text-white">
              <div className="max-w-lg hidden sm:block">
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {pkg.summary}
                </p>
              </div>
              <button 
                type="button"
                className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Expand Photos ({galleryImages.length})</span>
              </button>
            </div>
          </div>

          {/* Gallery Thumbnails Strip */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIdx(idx)}
                  className={`aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImgIdx === idx
                      ? 'border-slate-900 ring-2 ring-slate-900/20 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Left Details Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-2">Trip Overview</h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {pkg.summary}
              </p>

              {/* Highlights List */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Experience Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-bold text-teal-800">✓</span>
                      <span className="font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day-Wise Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Day-Wise Itinerary</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Step-by-step trip plan</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                    {pkg.duration}
                  </span>
                </div>

                <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pl-5">
                  {pkg.itinerary.map((dayItem, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center ring-4 ring-white shadow">
                        {dayItem.day}
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                          Day {dayItem.day}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                          {dayItem.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                          {dayItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-sm">Included in Package</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {pkg.inclusions?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-rose-800">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <h3 className="font-bold text-sm">Excluded</h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {pkg.exclusions?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sticky Booking Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Starting Price</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ person</span>
                </div>
                <p className="text-xs text-emerald-700 font-medium mt-1">
                  ✓ Base stay, sightseeing transfers & guide included
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-semibold text-slate-800">{pkg.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-slate-800">{pkg.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-slate-800">{pkg.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confirmation:</span>
                  <span className="font-semibold text-emerald-600">Instant e-voucher</span>
                </div>
              </div>

              {/* Requirement: "Book This Trip" button redirects to /book/:id */}
              <Link
                to={`/book/${pkg.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all text-xs sm:text-sm group"
              >
                <span>Book This Trip</span>
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-800" />
                <span>Zero reservation fees • Client-side calculation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedImgIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setSelectedImgIdx((prev) => (prev + 1) % galleryImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden">
            <img
              src={galleryImages[selectedImgIdx]}
              alt={pkg.title}
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-xl"
            />
            <div className="text-center text-xs text-white/70 mt-3">
              Photo {selectedImgIdx + 1} of {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
