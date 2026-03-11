import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-50 font-['Heebo'] text-center">
        <div className="h-32 w-32 bg-white flex items-center justify-center mb-8 border border-slate-200">
          <Heart size={48} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Your wishlist is empty</h2>
        <p className="text-slate-500 font-medium text-sm mb-12 max-w-md">Save your favorite hardware units here for future acquisition.</p>
        <Link to="/shop" className="px-12 py-5 bg-[#1447E6] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 active:scale-95">
          Explore catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Heebo'] text-slate-900 pb-20">

      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#1447E6]">
              <div className="w-10 h-[2px] bg-[#1447E6]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Saved hardware</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Your favorites
            </h1>
          </div>
          <p className="text-[13px] font-bold text-slate-500 bg-slate-50 px-5 py-2.5 border border-slate-200 shadow-sm">
            <span className="text-slate-900 font-black">{wishlistCount}</span> reserved units
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          <AnimatePresence>
            {wishlist.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col bg-white border border-slate-200 p-5 hover:border-[#1447E6]/30 hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="relative aspect-square flex items-center justify-center mb-5 overflow-hidden bg-slate-50">
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-2 right-2 h-8 w-8 bg-white text-slate-300 border border-slate-100 flex items-center justify-center z-10 hover:text-red-500 hover:border-red-100 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-4 group-hover:scale-105 transition-transform duration-700">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                    />
                  </Link>

                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full h-12 bg-slate-900 text-white flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#1447E6] transition-all"
                    >
                      <ShoppingCart size={16} /> Add to cart
                    </button>
                  </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-[#1447E6] uppercase tracking-widest">{p.brand_name || 'HP Supply'}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-bold text-slate-900 group-hover:text-[#1447E6] transition-colors leading-snug line-clamp-2 mb-1">{p.name}</h3>
                  </Link>
                  <p className="text-sm font-black text-slate-900 mt-auto">${parseFloat(p.price).toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-200">
          <Link to="/shop" className="inline-flex items-center gap-3 text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all group uppercase tracking-widest">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
