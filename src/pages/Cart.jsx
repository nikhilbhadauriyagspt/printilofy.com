import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, ShieldCheck, ChevronLeft, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-50 font-['Heebo'] text-center">
        <div className="h-32 w-32 bg-white flex items-center justify-center mb-8 border border-slate-200">
          <ShoppingCart size={48} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Your cart is empty</h2>
        <p className="text-slate-500 font-medium text-sm mb-12 max-w-md">You haven't added any hardware to your selection yet.</p>
        <Link to="/shop" className="px-12 py-5 bg-[#1447E6] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 active:scale-95">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Heebo'] text-slate-900 pb-20">

      {/* --- Breadcrumbs --- */}
      <div className="bg-white border-b border-slate-200 py-8 md:py-12 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#1447E6]">
              <div className="w-10 h-[2px] bg-[#1447E6]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Order review</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Your shopping cart
            </h1>
          </div>
          <p className="text-[13px] font-bold text-slate-500 bg-slate-50 px-5 py-2.5 border border-slate-200 shadow-sm">
            <span className="text-slate-900 font-black">{cartCount}</span> items in cart
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16">

          {/* Cart Items */}
          <div className="xl:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-xl hover:border-[#1447E6]/30 transition-all duration-300"
                >
                  <Link to={`/product/${item.slug}`} className="h-40 w-40 bg-slate-50 p-6 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors duration-500 border border-slate-100">
                    <img
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150?text=Hardware"; }}
                    />
                  </Link>

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col mb-6">
                      <span className="text-[10px] font-black text-[#1447E6] uppercase tracking-widest">{item.brand_name || 'HP Supply'}</span>
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="text-lg font-bold text-slate-900 hover:text-[#1447E6] transition-colors leading-tight line-clamp-2">{item.name}</h3>
                      </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6 border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-8">
                        <div className="h-12 px-3 bg-slate-50 border border-slate-200 flex items-center gap-6">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-[#1447E6] transition-colors"><Minus size={16} strokeWidth={3} /></button>
                          <span className="text-sm font-bold text-slate-900 w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-[#1447E6] transition-colors"><Plus size={16} strokeWidth={3} /></button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Unit price</span>
                          <span className="text-xl font-bold text-slate-900 leading-none">${item.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="space-y-1 text-right">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total</span>
                          <span className="text-2xl font-black text-[#1447E6] leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <div className="h-10 w-px bg-slate-200 hidden sm:block" />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-10 w-10 text-slate-300 flex items-center justify-center hover:text-red-500 transition-all border border-transparent hover:border-red-100 hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-[11px] font-black text-slate-400 hover:text-slate-900 transition-all pt-10 group uppercase tracking-widest">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Continue shopping
            </Link>
          </div>

          {/* Summary Module */}
          <div className="xl:col-span-4">
            <div className="bg-white p-10 lg:p-12 text-slate-900 border border-slate-200 shadow-sm sticky top-32">
              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-[#1447E6] flex items-center justify-center">
                  <Package size={22} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Order summary</h3>
                  <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Verified purchase</p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center pb-6 border-b border-slate-50">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
                  <span className="text-lg font-bold text-slate-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-6 border-b border-slate-50">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Logistics</span>
                  <span className="text-[10px] font-black text-[#1447E6] uppercase bg-[#1447E6]/10 px-3 py-1">Calculated Next</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-[12px] font-black uppercase tracking-widest text-slate-900">Grand total</span>
                  <span className="text-4xl font-bold text-[#1447E6] leading-none tracking-tight">${total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full h-16 bg-[#1447E6] hover:bg-slate-900 text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/10 active:scale-95 group"
              >
                Proceed to checkout
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-12 pt-8 border-t border-slate-100 space-y-6">
                <div className="flex items-center gap-4 text-slate-500">
                  <ShieldCheck size={24} className="text-[#1447E6] shrink-0" />
                  <p className="text-[11px] font-medium leading-relaxed">
                    Secure Merchant. Your purchase is protected by brand warranty.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
