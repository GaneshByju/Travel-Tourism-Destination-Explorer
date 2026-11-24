import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Users, CheckCircle2, 
  MapPin, Clock, Receipt, Home as HomeIcon, Printer, AlertCircle, Download
} from 'lucide-react';
import jsPDF from 'jspdf';
import packagesData from '../data/packages.json';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getAssetUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    return `${import.meta.env.BASE_URL}${cleanUrl}`;
  };

  const pkg = packagesData.find((p) => p.id === id);

  // Form states
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [leadGuestName, setLeadGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Validation errors state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Confirmation screen state
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Client-side PDF Generation Function
  const generateAndDownloadPDF = (booking) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Styling Constants
      const primaryColor = [28, 25, 23];      // #1c1917 (charcoal stone)
      const accentColor = [61, 86, 61];       // #3d563d (sage)
      const lightBg = [251, 249, 246];        // #fbf9f6
      const borderColor = [232, 222, 212];    // #e8ded4
      const textMuted = [120, 113, 108];      // stone-500

      // Top Header Banner
      doc.setFillColor(...lightBg);
      doc.rect(0, 0, 210, 42, 'F');
      doc.setDrawColor(...borderColor);
      doc.line(0, 42, 210, 42);

      // Brand Logo & Title
      doc.setFillColor(...primaryColor);
      doc.roundedRect(15, 12, 12, 12, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('times', 'bold');
      doc.setFontSize(16);
      doc.text('R', 21, 20.5, { align: 'center' });

      doc.setTextColor(...primaryColor);
      doc.setFont('times', 'bold');
      doc.setFontSize(20);
      doc.text('ROAM & CO.', 32, 19);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...accentColor);
      doc.text('BESPOKE SOUTH INDIA TRAVEL • OFFICIAL RESERVATION VOUCHER', 32, 24);

      // Booking Reference Pill (Top Right)
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...borderColor);
      doc.roundedRect(125, 12, 70, 18, 2, 2, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textMuted);
      doc.text('BOOKING REFERENCE', 130, 18);

      doc.setFont('courier', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...primaryColor);
      doc.text(booking.referenceId, 130, 25);

      let currentY = 54;

      // Section 1: Itinerary Summary
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...primaryColor);
      doc.text('1. ITINERARY SCHEDULE', 15, currentY);
      doc.setDrawColor(...borderColor);
      doc.line(15, currentY + 2, 195, currentY + 2);

      currentY += 10;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, currentY - 4, 180, 28, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...primaryColor);
      doc.text(booking.packageTitle, 20, currentY + 3);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textMuted);
      doc.text(`Location: ${booking.packageLocation}`, 20, currentY + 11);
      doc.text(`Duration: ${booking.duration}`, 20, currentY + 17);
      doc.text(`Departure Date: ${booking.travelDate}`, 110, currentY + 11);
      doc.text(`Travelers: ${booking.travelers} Guest(s)`, 110, currentY + 17);

      currentY += 40;

      // Section 2: Traveler Information
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...primaryColor);
      doc.text('2. PRIMARY GUEST INFORMATION', 15, currentY);
      doc.setDrawColor(...borderColor);
      doc.line(15, currentY + 2, 195, currentY + 2);

      currentY += 10;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, currentY - 4, 180, 24, 2, 2, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textMuted);
      doc.text('Lead Guest Name:', 20, currentY + 3);
      doc.text('Contact Email:', 20, currentY + 10);
      doc.text('Phone Number:', 110, currentY + 10);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text(booking.leadGuestName, 55, currentY + 3);
      doc.text(booking.email, 55, currentY + 10);
      doc.text(booking.phone, 138, currentY + 10);

      currentY += 34;

      // Section 3: Financial & Fare Breakdown
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...primaryColor);
      doc.text('3. FARE & TAX BREAKDOWN', 15, currentY);
      doc.setDrawColor(...borderColor);
      doc.line(15, currentY + 2, 195, currentY + 2);

      currentY += 10;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(15, currentY - 4, 180, 40, 2, 2, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...textMuted);
      doc.text(`Base Fare (Rs. ${booking.pricePerPerson.toLocaleString('en-IN')} x ${booking.travelers} traveler(s))`, 20, currentY + 4);
      doc.text('Goods & Services Tax (GST 5%)', 20, currentY + 12);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text(`Rs. ${booking.subtotal.toLocaleString('en-IN')}`, 185, currentY + 4, { align: 'right' });
      doc.text(`Rs. ${booking.gst.toLocaleString('en-IN')}`, 185, currentY + 12, { align: 'right' });

      doc.setDrawColor(...borderColor);
      doc.line(20, currentY + 18, 190, currentY + 18);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('TOTAL AMOUNT PAID / PAYABLE', 20, currentY + 26);
      doc.setFontSize(14);
      doc.setTextColor(...accentColor);
      doc.text(`Rs. ${booking.grandTotal.toLocaleString('en-IN')}`, 185, currentY + 26, { align: 'right' });

      currentY += 52;

      // Notice Box
      doc.setFillColor(...lightBg);
      doc.setDrawColor(...borderColor);
      doc.roundedRect(15, currentY, 180, 26, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...accentColor);
      doc.text('IMPORTANT: NO ACCOUNT / ZERO SERVER STORAGE NOTICE', 20, currentY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textMuted);
      doc.text('Because ROAM & CO. requires no login, personal booking data is NOT retained on any server.', 20, currentY + 11);
      doc.text('Please preserve this downloaded PDF receipt safely as your sole proof of reservation.', 20, currentY + 15);
      doc.text('Present this voucher upon check-in. Destination host will coordinate arrival logistics via phone.', 20, currentY + 19);

      // Footer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...textMuted);
      doc.text(`Generated on ${booking.bookingTime} • ROAM & CO. Travel • www.roamandco.com`, 105, 285, { align: 'center' });

      // Save PDF to device automatically
      doc.save(`ROAM_Receipt_${booking.referenceId}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
  };

  if (!pkg) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-bold text-stone-900">Destination Not Found</h2>
        <p className="text-stone-500 text-sm mt-1">Cannot initiate booking for an unknown package.</p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </Link>
      </div>
    );
  }

  // Cost calculation
  const baseCost = pkg.pricePerPerson * travelers;
  const gstCost = Math.round(baseCost * 0.05);
  const grandTotal = baseCost + gstCost;

  // Strict Validation Rules
  const validateField = (name, value) => {
    switch (name) {
      case 'leadGuestName': {
        const trimmed = value.trim();
        if (!trimmed) {
          return 'Please enter the lead traveler full name.';
        }
        const nameRegex = /^[A-Za-z\s.'-]{3,50}$/;
        if (!nameRegex.test(trimmed)) {
          return 'Name must contain at least 3 letters (alphabetic characters only).';
        }
        if (!trimmed.includes(' ') && trimmed.length < 4) {
          return 'Please provide both first and last name.';
        }
        return '';
      }

      case 'email': {
        const trimmed = value.trim();
        if (!trimmed) {
          return 'Email address is required.';
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return 'Please enter a valid email address (e.g., name@domain.com).';
        }
        return '';
      }

      case 'phone': {
        const cleaned = value.replace(/[\s\-()]/g, '');
        if (!cleaned) {
          return 'Phone number is required.';
        }
        const phoneRegex = /^(\+?[1-9]\d{9,13}|\d{10})$/;
        if (!phoneRegex.test(cleaned)) {
          return 'Please enter a valid 10-digit mobile number (e.g. 9876543210).';
        }
        return '';
      }

      case 'travelDate': {
        if (!value) return 'Departure date is required.';
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          return 'Departure date must be today or in the future.';
        }
        return '';
      }

      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val = '';
    if (field === 'leadGuestName') val = leadGuestName;
    if (field === 'email') val = email;
    if (field === 'phone') val = phone;
    if (field === 'travelDate') val = travelDate;

    const errorMsg = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    setTouched({
      leadGuestName: true,
      email: true,
      phone: true,
      travelDate: true,
    });

    const nameError = validateField('leadGuestName', leadGuestName);
    const emailError = validateField('email', email);
    const phoneError = validateField('phone', phone);
    const dateError = validateField('travelDate', travelDate);

    const validationErrors = {
      leadGuestName: nameError,
      email: emailError,
      phone: phoneError,
      travelDate: dateError,
    };

    setErrors(validationErrors);

    if (nameError || emailError || phoneError || dateError) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    const bookingRef = `ROAM-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const bookingData = {
      referenceId: bookingRef,
      packageId: pkg.id,
      packageTitle: pkg.title,
      packageLocation: pkg.location,
      duration: pkg.duration,
      travelers,
      travelDate,
      leadGuestName: leadGuestName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      pricePerPerson: pkg.pricePerPerson,
      subtotal: baseCost,
      gst: gstCost,
      grandTotal: grandTotal,
      bookingTime: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setConfirmedBooking(bookingData);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // AUTOMATIC PDF DOWNLOAD: Triggers instant PDF generation
    setTimeout(() => {
      generateAndDownloadPDF(bookingData);
    }, 450);
  };

  // If booking is confirmed, render confirmation summary screen
  if (confirmedBooking) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Confirmed Banner with PDF Download Notification (Hidden in print) */}
          <div className="no-print bg-stone-900 rounded-3xl p-7 text-white text-center shadow-lg mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-md">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-sage-200">
              Reservation Confirmed
            </span>
            <h1 className="text-xl sm:text-2xl font-bold mt-1">
              {confirmedBooking.packageTitle}
            </h1>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-white/15 px-3.5 py-1.5 rounded-full text-xs text-stone-200">
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official PDF Voucher downloaded automatically</span>
            </div>

            {/* Crucial Data Persistence Warning */}
            <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs text-left flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-semibold mb-0.5">Please save your downloaded receipt voucher</strong>
                <span>Because this platform requires no login or user accounts, your reservation details are not saved on any database. Ensure you keep this PDF file or print a copy for your travel check-in.</span>
              </div>
            </div>
          </div>

          {/* Reference Receipt Card (Print Target ONLY) */}
          <div id="printable-receipt" className="bg-white rounded-3xl border border-[#e8ded4] shadow-sm overflow-hidden mb-6">
            {/* Print-only brand header */}
            <div className="hidden print-only p-6 border-b border-[#ece5dd] bg-[#faf8f5]">
              <div className="text-2xl font-serif font-black text-stone-900">ROAM & CO.</div>
              <div className="text-xs text-stone-500 uppercase tracking-widest mt-0.5">Official Trip Reservation Voucher</div>
            </div>

            <div className="p-6 bg-[#faf8f5] border-b border-[#ece5dd] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block tracking-wider">Booking ID</span>
                <span className="text-xl font-mono font-bold tracking-wider text-stone-900">
                  {confirmedBooking.referenceId}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 block tracking-wider uppercase font-bold">Booking Date</span>
                <span className="text-xs font-semibold text-stone-700">{confirmedBooking.bookingTime}</span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-6">
              {/* Trip Info summary */}
              <div>
                <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2.5">Trip Schedule</h3>
                <div className="bg-[#fbf9f6] rounded-2xl p-4 border border-[#ece5dd] space-y-2 text-xs">
                  <div className="text-sm font-bold text-stone-900">{confirmedBooking.packageTitle}</div>
                  <div className="flex flex-wrap gap-4 text-stone-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sage-600" />
                      {confirmedBooking.packageLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {confirmedBooking.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sage-600" />
                      Date: <strong>{confirmedBooking.travelDate}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-sage-600" />
                      Party: <strong>{confirmedBooking.travelers} Guests</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div>
                <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2.5">Verified Traveler Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ece5dd]">
                    <span className="text-stone-400 block text-[10px]">Lead Guest</span>
                    <span className="font-bold text-stone-800">{confirmedBooking.leadGuestName}</span>
                  </div>
                  <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ece5dd]">
                    <span className="text-stone-400 block text-[10px]">Email</span>
                    <span className="font-semibold text-stone-800 truncate block">{confirmedBooking.email}</span>
                  </div>
                  <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ece5dd]">
                    <span className="text-stone-400 block text-[10px]">Mobile</span>
                    <span className="font-semibold text-stone-800">{confirmedBooking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Cost Math Breakdown */}
              <div>
                <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2.5">Fare Summary</h3>
                <div className="border border-[#ece5dd] rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Base Fare (Rs. {confirmedBooking.pricePerPerson.toLocaleString('en-IN')} x {confirmedBooking.travelers} persons)</span>
                    <span className="font-medium text-stone-800">Rs. {confirmedBooking.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span className="flex items-center gap-1">
                      <span>GST (5%)</span>
                      <span className="text-[9px] bg-stone-100 px-1 py-0.2 rounded font-semibold text-stone-600">Taxes</span>
                    </span>
                    <span className="font-medium text-stone-800">Rs. {confirmedBooking.gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2.5 border-t border-stone-200 flex justify-between items-baseline text-sm font-extrabold text-stone-900">
                    <span>Total Amount</span>
                    <span className="text-xl text-stone-900">Rs. {confirmedBooking.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions (Hidden in Print) */}
            <div className="no-print p-5 bg-[#faf8f5] border-t border-[#ece5dd] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => generateAndDownloadPDF(confirmedBooking)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-700" />
                  <span>Download PDF Again</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs font-semibold hover:bg-stone-50 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  to={`/package/${pkg.id}`}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#d7c7b8] bg-white text-stone-700 text-xs font-semibold hover:bg-stone-50 text-center transition"
                >
                  Package Info
                </Link>
                <Link
                  to="/"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition shadow-sm"
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Back Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Booking Form
  return (
    <div className="min-h-screen bg-[#fbf9f6] pb-24">
      {/* Top back bar */}
      <div className="bg-white border-b border-[#ece5dd]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <Link
            to={`/package/${pkg.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {pkg.title}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <span className="text-[11px] font-bold tracking-wider uppercase text-sage-800">
            Instant Direct Reservation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
            Trip Booking & Cost Calculation
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            No login or user accounts required. Please ensure you keep the downloaded receipt as no data is stored on any server.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Booking Inputs Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#e8ded4] shadow-sm">
            <form onSubmit={handleBookingSubmit} noValidate className="space-y-6">
              <div>
                <h2 className="text-sm font-bold text-stone-900 mb-1">1. Schedule & Traveler Count</h2>
                <p className="text-xs text-stone-400 mb-4">Select departure date and party size.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Travel Date Selector */}
                  <div>
                    <label htmlFor="travel-date" className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Departure Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="travel-date"
                        type="date"
                        value={travelDate}
                        min={new Date().toISOString().split('T')[0]}
                        onBlur={() => handleBlur('travelDate')}
                        onChange={(e) => {
                          setTravelDate(e.target.value);
                          if (touched.travelDate) {
                            setErrors((prev) => ({ ...prev, travelDate: validateField('travelDate', e.target.value) }));
                          }
                        }}
                        className={`w-full pl-10 pr-3 py-2.5 bg-stone-50/60 border rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:bg-white transition ${
                          touched.travelDate && errors.travelDate
                            ? 'border-rose-400 ring-2 ring-rose-100'
                            : 'border-stone-200 focus:border-stone-900'
                        }`}
                      />
                    </div>
                    {touched.travelDate && errors.travelDate && (
                      <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.travelDate}</span>
                      </p>
                    )}
                  </div>

                  {/* Travelers Counter */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Travelers *
                    </label>
                    <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50/60">
                      <button
                        type="button"
                        onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                        disabled={travelers <= 1}
                        className="w-10 h-9 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent transition text-base cursor-pointer"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center font-bold text-stone-900 text-xs">
                        {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}
                      </div>
                      <button
                        type="button"
                        onClick={() => setTravelers((prev) => Math.min(20, prev + 1))}
                        disabled={travelers >= 20}
                        className="w-10 h-9 flex items-center justify-center font-bold text-stone-600 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent transition text-base cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="pt-5 border-t border-stone-100">
                <h2 className="text-sm font-bold text-stone-900 mb-1">2. Primary Traveler Details</h2>
                <p className="text-xs text-stone-400 mb-4">Required to print on your automated reservation voucher.</p>

                <div className="space-y-4">
                  {/* Lead Traveler Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anand Varma"
                      value={leadGuestName}
                      onBlur={() => handleBlur('leadGuestName')}
                      onChange={(e) => {
                        setLeadGuestName(e.target.value);
                        if (touched.leadGuestName) {
                          setErrors((prev) => ({ ...prev, leadGuestName: validateField('leadGuestName', e.target.value) }));
                        }
                      }}
                      className={`w-full px-3.5 py-2.5 bg-stone-50/60 border rounded-xl text-xs text-stone-800 focus:outline-none focus:bg-white transition ${
                        touched.leadGuestName && errors.leadGuestName
                          ? 'border-rose-400 ring-2 ring-rose-100'
                          : 'border-stone-200 focus:border-stone-900'
                      }`}
                    />
                    {touched.leadGuestName && errors.leadGuestName && (
                      <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.leadGuestName}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. anand.varma@example.com"
                        value={email}
                        onBlur={() => handleBlur('email')}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (touched.email) {
                            setErrors((prev) => ({ ...prev, email: validateField('email', e.target.value) }));
                          }
                        }}
                        className={`w-full px-3.5 py-2.5 bg-stone-50/60 border rounded-xl text-xs text-stone-800 focus:outline-none focus:bg-white transition ${
                          touched.email && errors.email
                            ? 'border-rose-400 ring-2 ring-rose-100'
                            : 'border-stone-200 focus:border-stone-900'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onBlur={() => handleBlur('phone')}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (touched.phone) {
                            setErrors((prev) => ({ ...prev, phone: validateField('phone', e.target.value) }));
                          }
                        }}
                        className={`w-full px-3.5 py-2.5 bg-stone-50/60 border rounded-xl text-xs text-stone-800 focus:outline-none focus:bg-white transition ${
                          touched.phone && errors.phone
                            ? 'border-rose-400 ring-2 ring-rose-100'
                            : 'border-stone-200 focus:border-stone-900'
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Meal preferences, accessibility needs, pickup landmarks..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50/60 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-stone-900 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-stone-900 hover:bg-stone-800 shadow-sm transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Confirm & Download PDF Receipt Voucher</span>
                </button>
                <p className="text-center text-[11px] text-stone-400 mt-2">
                  ✓ Instant reservation • Official PDF voucher downloads automatically
                </p>
              </div>
            </form>
          </div>

          {/* Dynamic Cost Math Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-[#e8ded4] shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 mb-3 pb-2.5 border-b border-stone-100">
                Package Summary
              </h3>

              <div className="flex gap-3.5 items-center mb-5">
                <img
                  src={getAssetUrl(pkg.image)}
                  alt={pkg.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                    {pkg.category}
                  </span>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm mt-1 leading-snug">
                    {pkg.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-sage-600" />
                    <span>{pkg.location}</span>
                  </div>
                </div>
              </div>

              {/* Live Cost Computation breakdown */}
              <div className="bg-[#fbf9f6] rounded-2xl p-4 border border-[#ece5dd] space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-stone-600">
                  <span>Price per traveler</span>
                  <span className="font-semibold text-stone-800">
                    Rs. {pkg.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-600">
                  <span>Travelers count</span>
                  <span className="font-semibold text-stone-800">x {travelers}</span>
                </div>

                <div className="pt-2 border-t border-stone-200/80 flex justify-between items-center text-stone-700">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-stone-900">
                    Rs. {baseCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-600">
                  <span>GST (5%)</span>
                  <span className="font-medium text-stone-800">
                    Rs. {gstCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-stone-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-stone-900 block">Grand Total</span>
                    <span className="text-[10px] text-stone-400">Includes all taxes</span>
                  </div>
                  <span className="text-xl font-black text-stone-900">
                    Rs. {grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-[11px] text-stone-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>No login or signup required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Official PDF receipt voucher saved automatically</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
