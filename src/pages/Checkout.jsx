import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Loader2, Navigation, CheckCircle2, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = total;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod' // default
  });

  const [detectingLocation, setDetectingLocation] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          if (data.address) {
            const addr = data.address;
            const streetAddress = [
              addr.house_number,
              addr.road,
              addr.suburb,
              addr.neighbourhood
            ].filter(Boolean).join(', ');

            setFormData(prev => ({
              ...prev,
              address: streetAddress || data.display_name,
              city: addr.city || addr.town || addr.village || addr.state || '',
              zipCode: addr.postcode || ''
            }));
          }
        } catch (err) {
          console.error("Location detection error:", err);
          alert("Could not detect address. Please enter it manually.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        setDetectingLocation(false);
        alert("Location access denied or unavailable.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (via printilofy.com)`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails,
        source: 'printilofy.com',
        notes: `Order from printilofy.com | ${formData.notes || ''}`
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-50 font-['Heebo'] text-center">
        <div className="h-32 w-32 bg-white flex items-center justify-center mb-8 border border-slate-200">
          <Package size={48} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">No hardware in session</h2>
        <p className="text-slate-500 font-medium text-sm mb-12 max-w-md mx-auto">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="px-12 py-5 bg-[#1447E6] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 active:scale-95">Return to catalog</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-50 font-['Heebo'] text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="h-32 w-32 bg-emerald-50 text-emerald-500 flex items-center justify-center mb-8 border border-emerald-100"
        >
          <CheckCircle2 size={56} strokeWidth={2.5} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Order confirmed</h1>
        <p className="text-slate-500 font-medium text-sm md:text-base mb-12 max-lg mx-auto">Your hardware is scheduled for immediate dispatch to your location.</p>
        <div className="bg-white p-10 border border-slate-200 mb-12 max-w-md w-full shadow-sm">
          <p className="text-[10px] font-black text-[#1447E6] uppercase tracking-[0.3em] mb-3">Order reference</p>
          <p className="text-3xl font-bold text-slate-900 uppercase tracking-widest">#PTP-{orderId || 'PENDING'}</p>
        </div>
        <Link to="/" className="px-12 py-5 bg-[#1447E6] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 active:scale-95">
          Return to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-['Heebo'] text-slate-900 pb-20">

      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <Link to="/cart" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-slate-900 transition-colors group uppercase tracking-widest">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to cart
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Secure checkout
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 border border-slate-200">
            <div className={`h-11 w-11 flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 1 ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-300'}`}>1</div>
            <div className={`h-0.5 w-8 transition-all ${step >= 2 ? 'bg-slate-900' : 'bg-slate-200'}`} />
            <div className={`h-11 w-11 flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 2 ? 'bg-[#1447E6] border-[#1447E6] text-white' : 'border-slate-200 text-slate-300'}`}>2</div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Main Module */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12 bg-white p-8 md:p-12 border border-slate-200 shadow-sm">

            {step === 1 ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <Mail size={20} className="text-[#1447E6]" strokeWidth={2.5} />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Contact information</h3>
                  </div>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email address for order updates" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>

                <div className="space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <MapPin size={20} className="text-[#1447E6]" strokeWidth={2.5} />
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Shipping details</h3>
                    </div>
                    <button
                      type="button" onClick={detectLocation} disabled={detectingLocation}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1447E6]/10 text-[#1447E6] text-[9px] font-black uppercase tracking-widest border border-[#1447E6]/20 hover:bg-[#1447E6] hover:text-white transition-all disabled:opacity-50"
                    >
                      {detectingLocation ? <Loader2 className="animate-spin" size={14} /> : <Navigation size={14} />}
                      {detectingLocation ? 'Locating...' : 'Auto-detect address'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                  </div>
                  <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete street address" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City / Region" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Postal code" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                  </div>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Mobile phone number" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-sm font-bold text-slate-900 transition-all placeholder:text-slate-400 placeholder:font-medium" />
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <CreditCard size={20} className="text-[#1447E6]" strokeWidth={2.5} />
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Payment selection</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-8 border-2 transition-all cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-[#1447E6] bg-blue-50/50 shadow-sm' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className={`h-7 w-7 border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-[#1447E6]' : 'border-slate-300'}`}>
                          {formData.paymentMethod === 'cod' && <div className="h-3 w-3 bg-[#1447E6]" />}
                        </div>
                        <Truck size={32} className={formData.paymentMethod === 'cod' ? 'text-[#1447E6]' : 'text-slate-300'} />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Cash on delivery</h4>
                      <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">Pay upon hardware arrival</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                      className={`p-8 border-2 transition-all cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-[#1447E6] bg-blue-50/50 shadow-sm' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className={`h-7 w-7 border-2 flex items-center justify-center ${formData.paymentMethod === 'paypal' ? 'border-[#1447E6]' : 'border-slate-300'}`}>
                          {formData.paymentMethod === 'paypal' && <div className="h-3 w-3 bg-[#1447E6]" />}
                        </div>
                        <div className="text-slate-900 font-extrabold text-2xl italic tracking-tighter">PayPal</div>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">PayPal express</h4>
                      <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">Instant encrypted payment</p>
                    </div>
                  </div>

                  {formData.paymentMethod === 'paypal' && (
                    <div className="space-y-8 pt-8 mt-8 border-t border-slate-100">
                      <div className="p-8 bg-slate-900 text-white text-center border border-slate-800">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-slate-400">Secured with SSL Encryption.</p>
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 text-[11px] font-bold uppercase tracking-widest border border-white/20">
                          <ShieldCheck size={18} className="text-[#1447E6]" /> Protected checkout
                        </div>
                      </div>
                      <div className="relative z-0">
                        <PayPalButtons
                          style={{ layout: "vertical", shape: "rect", height: 55 }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [{
                                amount: { value: finalTotal.toString() },
                                description: `HP Hardware Procurement - ${cartCount} Units`,
                              }],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            await handleOrderSuccess(details);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex gap-6 pt-10 border-t border-slate-100 mt-12">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="px-10 h-16 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-sm">Back</button>
              )}
              {formData.paymentMethod === 'cod' || step === 1 ? (
                <button
                  type="submit" disabled={loading}
                  className="flex-1 h-16 bg-[#1447E6] text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 active:scale-95 disabled:opacity-50 group"
                >
                  {loading ? 'Finalizing...' : (step === 1 ? 'Go to payment' : 'Complete purchase')}
                  {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              ) : null}
            </div>
          </div>

          {/* Summary Module */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-10 border border-slate-200 sticky top-32 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1447E6] block mb-10">Order contents</span>

              <div className="space-y-6 mb-10 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-6 group items-center">
                    <div className="h-20 w-20 bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 group-hover:border-[#1447E6]/30 transition-all">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-[70%] max-h-[70%] object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[12px] font-bold text-slate-900 truncate group-hover:text-[#1447E6] transition-colors leading-tight">{item.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                        <span className="text-[13px] font-bold text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-slate-100 pt-8">
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900 text-[13px]">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Logistics</span>
                  <span className="text-[#1447E6] text-[13px]">Free delivery</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-slate-100">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Grand total</span>
                  <span className="text-3xl font-bold text-[#1447E6] leading-none tracking-tight">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-12 p-6 bg-slate-50 border border-slate-100 flex items-center gap-4">
                <Lock size={20} className="text-[#1447E6] shrink-0" />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Hardware-secured encryption.</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
