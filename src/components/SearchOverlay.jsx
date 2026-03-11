import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, History, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=10`);
          const data = await res.json();
          if (data.status === 'success') {
            setSuggestions(data.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setSearchQuery('');
    }
  };

  const handleQuickSearch = (query) => {
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    closeSearch();
    setSearchQuery('');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Search Drawer (Half Screen) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[1001] w-full max-w-[500px] bg-white shadow-2xl flex flex-col font-['Heebo'] border-l border-slate-200"
          >
            {/* Header Area */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Search catalog</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1447E6] mt-1">Find your hardware</p>
              </div>
              <button
                onClick={closeSearch}
                className="h-10 w-10 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all border border-slate-200 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Search Input */}
              <div className="p-6 md:p-8 border-b border-slate-100">
                <form onSubmit={handleSearch} className="relative group">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for printers, ink..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 px-5 py-4 pl-12 text-sm font-bold text-slate-900 outline-none border border-slate-200 focus:border-[#1447E6] focus:bg-white transition-all placeholder:font-medium placeholder:text-slate-400"
                  />
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1447E6] transition-colors"
                  />
                </form>
              </div>

              <div className="p-6 md:p-8">
                {searchQuery.length > 1 ? (
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      {isSearching ? 'Searching...' : 'Search results'}
                    </h3>

                    <div className="space-y-4">
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            navigate(`/product/${product.slug}`);
                            closeSearch();
                          }}
                          className="flex items-center gap-4 p-4 hover:bg-slate-50 border border-slate-100 transition-all text-left group w-full"
                        >
                          <div className="w-16 h-16 bg-white border border-slate-100 p-1.5 flex items-center justify-center shrink-0 group-hover:border-[#1447E6]/30 transition-colors">
                            <img
                              src={product.images ? (typeof product.images === 'string' ? JSON.parse(product.images)[0] : product.images[0]) : ''}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-[13px] leading-tight line-clamp-2 group-hover:text-[#1447E6] transition-colors mb-1">
                              {product.name}
                            </h4>
                            <p className="text-[#1447E6] font-black text-sm">${product.price}</p>
                          </div>
                        </button>
                      ))}

                      {!isSearching && suggestions.length === 0 && (
                        <div className="text-center py-10 border border-slate-100 bg-slate-50">
                          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest text-[10px]">No results found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {/* Recent / Popular */}
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <TrendingUp size={14} /> Popular searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['HP LaserJet', 'Ink Tank', 'Smart Tank', 'Color LaserJet', 'Wireless Printer'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleQuickSearch(tag)}
                            className="px-4 py-2.5 bg-slate-50 hover:bg-blue-50 hover:border-[#1447E6] hover:text-[#1447E6] text-[11px] font-black uppercase tracking-widest text-slate-600 transition-all border border-slate-200"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <History size={14} /> Quick categories
                      </h3>
                      <div className="space-y-2">
                        {['All-in-One Printers', 'LaserJet Printers', 'Inkjet Printers', 'Toner & Supplies'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleQuickSearch(cat)}
                            className="flex items-center justify-between w-full p-4 hover:bg-slate-50 group transition-all border border-slate-100 hover:border-[#1447E6]/30"
                          >
                            <span className="font-bold text-slate-700 text-sm group-hover:text-[#1447E6] transition-colors">{cat}</span>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-[#1447E6] transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Support Promo */}
                    <div className="p-6 bg-slate-900 border border-slate-800 text-white">
                      <h4 className="font-bold text-lg mb-2">Not sure what you need?</h4>
                      <p className="text-[13px] text-slate-400 mb-6 font-medium leading-relaxed">Our printer experts are available 24/7 to help you choose the right model for your office or home.</p>
                      <button
                        onClick={() => { navigate('/contact'); closeSearch(); }}
                        className="w-full py-4 bg-[#1447E6] text-white font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-[#1447E6]/20"
                      >
                        Chat with expert
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
