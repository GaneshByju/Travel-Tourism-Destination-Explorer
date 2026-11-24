import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SavedProvider } from './context/SavedContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PackageDetail from './pages/PackageDetail';
import Booking from './pages/Booking';
import SavedTrips from './pages/SavedTrips';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <SavedProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Route 1: Home & Explore */}
              <Route path="/" element={<Home />} />
              {/* Route 2: Package Detail */}
              <Route path="/package/:id" element={<PackageDetail />} />
              {/* Route 3: Trip Booking & Confirmation */}
              <Route path="/book/:id" element={<Booking />} />
              {/* Route 4: Saved Trips Wishlist */}
              <Route path="/saved" element={<SavedTrips />} />
              {/* Catch-all fallback redirects to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SavedProvider>
  );
}

export default App;
