import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Printer,
  ChevronRight
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children.slice(0, 6));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className="w-full bg-white font-['Heebo'] border-t border-slate-100">
      
      {/* 1. ARCHITECTURAL TOP SECTION */}
      <div className="w-full bg-slate-900 py-16 md:py-20 overflow-hidden relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4B4DED] opacity-10 blur-[120px] rounded-full -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4B4DED] opacity-5 blur-[100px] rounded-full -ml-32 -mb-32" />

        <div className="w-full px-4 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Brand Module */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-6">
                <Link to="/" className="flex items-center gap-2">
                  <img 
                    src="/logo/logo.png" 
                    alt="Printilofy" 
                    className="h-10 object-contain invert brightness-0 invert" 
                  />
                </Link>
                <p className="text-slate-400 text-base font-medium leading-relaxed max-w-sm">
                  Premium hardware synchronization for modern enterprises. We deliver certified printing infrastructure with absolute authenticity.
                </p>
              </div>
            </div>

            {/* Links Module */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">
                
                {/* Deployment categories */}
                <div className="space-y-8">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="w-6 h-px bg-[#4B4DED]"></span>
                    Deployment
                  </h4>
                  <ul className="space-y-4">
                    {categories.map(cat => (
                      <li key={cat.id}>
                        <Link to={`/shop?category=${cat.slug}`} className="text-slate-400 hover:text-white transition-colors text-[14px] font-bold flex items-center group">
                          <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#4B4DED] mr-2" />
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company links */}
                <div className="space-y-8">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="w-6 h-px bg-[#4B4DED]"></span>
                    Structure
                  </h4>
                  <ul className="space-y-4">
                    {[
                      { name: "Hardware Catalog", path: "/shop" },
                      { name: "Our Journey", path: "/about" },
                      { name: "Help Center", path: "/faq" },
                      { name: "Contact Unit", path: "/contact" },
                      { name: "Procurement History", path: "/orders" }
                    ].map(link => (
                      <li key={link.name}>
                        <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-[14px] font-bold flex items-center group">
                          <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#4B4DED] mr-2" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal / Policy */}
                <div className="space-y-8">
                  <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                    <span className="w-6 h-px bg-[#4B4DED]"></span>
                    Compliance
                  </h4>
                  <ul className="space-y-4">
                    {[
                      { name: "Privacy Protocol", path: "/privacy-policy" },
                      { name: "Terms of Service", path: "/terms-and-conditions" },
                      { name: "Shipping Logic", path: "/shipping-policy" },
                      { name: "Return Warranty", path: "/return-policy" },
                      { name: "Cookie Policy", path: "/cookie-policy" }
                    ].map(link => (
                      <li key={link.name}>
                        <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-[14px] font-bold flex items-center group">
                          <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#4B4DED] mr-2" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY CONTACT BAND */}
      <div className="w-full bg-white py-12 border-b border-slate-100">
        <div className="w-full px-4 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
               <div className="flex items-center gap-5 group cursor-default">
                  <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[#4B4DED] group-hover:bg-[#4B4DED] group-hover:text-white transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Protocol</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight">info@printilofy.com</p>
                  </div>
               </div>

               <div className="flex items-center gap-5 group cursor-default">
                  <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[#4B4DED] group-hover:bg-[#4B4DED] group-hover:text-white transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logistics Unit</p>
                    <p className="text-lg font-black text-slate-900 tracking-tight">Little Rock, AR 72207</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BASELINE LEGAL */}
      <div className="w-full bg-white py-10">
        <div className="w-full px-4 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[13px] font-bold text-slate-400 uppercase tracking-tight">
              &copy; {new Date().getFullYear()} <span className="text-slate-900">Printilofy LLC.</span> All assets synchronized.
            </p>
            
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 border-r border-slate-100 pr-8">
                 <img src="/logo/PayPal.svg.webp" alt="PayPal" className="h-5 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                 <div className="flex items-center gap-2 opacity-40">
                    <div className="h-6 w-10 bg-slate-200 rounded-md"></div>
                    <div className="h-6 w-10 bg-slate-200 rounded-md"></div>
                 </div>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-600">
                <ShieldCheck size={18} /> <span className="text-[11px] font-black uppercase tracking-widest">PCI Synchronized</span>
              </div>
              <div className="flex items-center gap-2.5 text-blue-600">
                <Globe size={18} /> <span className="text-[11px] font-black uppercase tracking-widest">US Regional Unit</span>
              </div>
              <div className="flex items-center gap-2.5 text-amber-500">
                <Zap size={18} /> <span className="text-[11px] font-black uppercase tracking-widest">Encrypted Stream</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
