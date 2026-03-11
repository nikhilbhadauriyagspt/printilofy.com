import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config";

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[1001] shadow-2xl flex flex-col font-['Heebo'] border-l border-slate-200"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Shopping cart</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1447E6] mt-1">{cartCount} items selected</p>
              </div>
              <button
                onClick={closeCartDrawer}
                className="h-10 w-10 bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all border border-slate-200 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item) => {
                    const getImagePath = (images) => {
                      try {
                        const imgs = typeof images === "string" ? JSON.parse(images) : images;
                        const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
                        if (!first) return "https://via.placeholder.com/150";
                        const cleaned = String(first).replaceAll("\\", "/");
                        return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
                      } catch {
                        return "https://via.placeholder.com/150";
                      }
                    };

                    return (
                      <div key={item.id} className="flex gap-5 group pb-6 border-b border-slate-100 last:border-0 relative">
                        <div className="h-24 w-24 bg-slate-50 p-2 flex items-center justify-center flex-shrink-0 border border-slate-100 transition-colors group-hover:border-[#1447E6]/30 group-hover:bg-white">
                          <img
                            src={getImagePath(item.images)}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/100x100?text=No+Image"; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div className="relative pr-8">
                            <p className="text-[9px] font-black text-[#1447E6] uppercase tracking-widest mb-1">{item.brand_name || 'Official Brand'}</p>
                            <h3 className="text-[13px] font-bold text-slate-900 leading-tight line-clamp-2 mb-1 group-hover:text-[#1447E6] transition-colors">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="absolute top-0 right-0 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4 bg-slate-50 px-2 py-1 border border-slate-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-slate-400 hover:text-[#1447E6] transition-colors p-1"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} strokeWidth={3} />
                              </button>
                              <span className="text-[12px] font-bold min-w-[20px] text-center text-slate-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-slate-400 hover:text-[#1447E6] transition-colors p-1"
                              >
                                <Plus size={14} strokeWidth={3} />
                              </button>
                            </div>
                            <span className="text-[14px] font-black text-slate-900">
                              ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-24 w-24 bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 text-slate-300 shadow-sm">
                    <ShoppingBag size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Your cart is empty</h3>
                  <p className="text-sm font-medium text-slate-500 max-w-[250px] mb-8">Looks like you haven't added anything to your cart yet.</p>
                  <button
                    onClick={closeCartDrawer}
                    className="px-10 py-4 bg-[#1447E6] text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95"
                  >
                    Explore catalog
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-3xl font-bold text-slate-900 leading-none tracking-tight">${total.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white text-slate-900 border border-slate-200 flex items-center justify-center font-black text-[11px] uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm"
                  >
                    View shopping cart
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-[#1447E6] text-white flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 group"
                  >
                    Proceed to checkout
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6">
                  Taxes and logistics calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
