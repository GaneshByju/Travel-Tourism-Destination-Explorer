import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('saved_trips_ids');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse saved trips from localStorage', e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('saved_trips_ids', JSON.stringify(savedIds));
    } catch (e) {
      console.error('Failed to save trips to localStorage', e);
    }
  }, [savedIds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleSave = (id, packageTitle = '') => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        showToast(`Removed "${packageTitle || 'Trip'}" from your wishlist`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved "${packageTitle || 'Trip'}" to your wishlist`);
        return [...prev, id];
      }
    });
  };

  const isSaved = (id) => savedIds.includes(id);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved, savedCount: savedIds.length }}>
      {children}

      {/* Modern floating toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 animate-fadeIn pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
