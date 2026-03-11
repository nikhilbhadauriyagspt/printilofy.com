import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, Send, ArrowRight, Loader2, CheckCircle2, Headphones, ChevronDown, Clock, Globe, ChevronRight } from 'lucide-react';
import API_BASE_URL from '../config';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen font-['Heebo'] text-slate-900 pb-20">
      <SEO
        title="Contact Us | Expert Technical Support"
        description="Connect with the Printilofy team for technical support, bulk orders, or hardware inquiries."
      />

      {/* --- Page Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14 mb-10">
        <div className="w-full px-4 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
              <Link to="/" className="hover:text-[#4B4DED] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900">Contact</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Get In Touch
            </h1>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-6"></div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-[#4B4DED] rounded-full border border-blue-100">
            <Headphones size={16} />
            <span className="text-[11px] font-black uppercase tracking-widest">Expert Support Active</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="p-8 md:p-12 bg-white border border-slate-200 rounded-[2rem] group hover:border-[#4B4DED]/30 transition-all shadow-xl shadow-blue-900/5 relative overflow-hidden">
              <div className="h-16 w-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-10 text-[#4B4DED] group-hover:bg-[#4B4DED] group-hover:text-white transition-all duration-500">
                <Mail size={28} />
              </div>
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Email Support</h4>
              <p className="text-xl font-black text-slate-900 tracking-tight">info@printilofy.com</p>
              <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-emerald-600 uppercase">
                 <Clock size={12} />
                 <span>Response under 24 hours</span>
              </div>
              <div className="absolute -bottom-6 -right-6 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <Mail size={120} />
              </div>
            </div>

            <div className="p-8 md:p-12 bg-white border border-slate-200 rounded-[2rem] group hover:border-[#4B4DED]/30 transition-all shadow-xl shadow-blue-900/5 relative overflow-hidden">
              <div className="h-16 w-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-10 text-[#4B4DED] group-hover:bg-[#4B4DED] group-hover:text-white transition-all duration-500">
                <MapPin size={28} />
              </div>
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Main Logistics</h4>
              <p className="text-xl font-black text-slate-900 tracking-tight leading-tight">Columbia, SC <br/> <span className="text-slate-400 text-lg font-bold">MM, 1614 Gervais St, 29201</span></p>
              <div className="mt-6 flex items-center gap-2 text-[11px] font-bold text-[#4B4DED] uppercase">
                 <Globe size={12} />
                 <span>United States Delivery</span>
              </div>
              <div className="absolute -bottom-6 -right-6 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <MapPin size={120} />
              </div>
            </div>
          </div>

          {/* Contact Form Stage */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-900/5">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="h-24 w-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-100 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Message Transmitted</h2>
                  <p className="text-slate-500 font-medium text-lg mb-12 max-w-md mx-auto leading-relaxed">A specialist has been assigned to your case and will be in contact shortly.</p>
                  <button onClick={() => setStatus(null)} className="px-12 py-5 bg-[#4B4DED] text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all rounded-full shadow-lg shadow-blue-900/20">New Inquiry</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                      <input
                        required type="text" placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-full focus:bg-white focus:border-[#4B4DED] outline-none text-[14px] font-bold text-slate-900 transition-all placeholder:text-slate-300 placeholder:font-medium shadow-inner"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                      <input
                        required type="email" placeholder="Email for reply"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-full focus:bg-white focus:border-[#4B4DED] outline-none text-[14px] font-bold text-slate-900 transition-all placeholder:text-slate-300 placeholder:font-medium shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                      <input
                        type="tel" placeholder="Mobile or office number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-full focus:bg-white focus:border-[#4B4DED] outline-none text-[14px] font-bold text-slate-900 transition-all placeholder:text-slate-300 placeholder:font-medium shadow-inner"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Inquiry Subject</label>
                      <div className="relative">
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-full focus:bg-white focus:border-[#4B4DED] outline-none text-[14px] font-bold text-slate-900 transition-all appearance-none cursor-pointer shadow-inner"
                        >
                          <option>General Inquiry</option>
                          <option>Technical Support</option>
                          <option>Order Tracking</option>
                          <option>Bulk Hardware Quotes</option>
                          <option>Warranty Assistance</option>
                        </select>
                        <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Message Details</label>
                    <textarea
                      required rows="6" placeholder="Describe your technical request or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:border-[#4B4DED] outline-none text-[14px] font-bold text-slate-900 transition-all resize-none placeholder:text-slate-300 placeholder:font-medium shadow-inner"
                    ></textarea>
                  </div>

                  <button
                    disabled={loading}
                    className="w-full h-20 bg-[#4B4DED] text-white flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-slate-900 transition-all active:scale-[0.98] disabled:opacity-50 group shadow-xl shadow-blue-900/20"
                  >
                    {loading ? <Loader2 className="animate-spin" size={28} /> : <><Send size={20} /> Transmit Message <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" /></>}
                  </button>
                  {status === 'error' && <p className="text-center text-red-500 text-[11px] font-black uppercase tracking-widest">Transmission error. Please check your connection.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
