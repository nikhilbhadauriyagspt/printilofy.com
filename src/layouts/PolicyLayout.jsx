import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-slate-50 min-h-screen font-['Heebo'] text-slate-900 pb-20">

      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#1447E6] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900">Policies</span>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900">{title}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 shrink-0">
            <Clock size={16} className="text-[#1447E6]" />
            <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Revised: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* --- Main Content Stage --- */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar Nav (Optional) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <FileText size={20} className="text-[#1447E6]" />
                  <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-widest">Policy index</h3>
                </div>
                <div className="space-y-1">
                  {[
                    { label: "Privacy Policy", path: "/privacy-policy" },
                    { label: "Terms & Conditions", path: "/terms-and-conditions" },
                    { label: "Return Policy", path: "/return-policy" },
                    { label: "Shipping Policy", path: "/shipping-policy" },
                    { label: "Cookie Policy", path: "/cookie-policy" }
                  ].map((p) => (
                    <Link
                      key={p.path} to={p.path}
                      className={`block px-4 py-3 text-[13px] font-bold transition-all border ${title === p.label ? 'bg-[#1447E6] text-white border-[#1447E6]' : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-slate-900 text-white relative overflow-hidden border border-slate-800">
                <h4 className="text-lg font-bold mb-3 relative z-10 tracking-tight">Need assistance?</h4>
                <p className="text-slate-400 text-xs font-medium mb-6 leading-relaxed relative z-10">Our specialists are available to explain any of our legal terms or policies.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-[10px] font-black text-blue-400 hover:text-white relative z-10 uppercase tracking-widest transition-colors">
                  Contact center
                </Link>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1447E6]/10 blur-3xl rounded-full pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-16 border border-slate-200 shadow-sm"
            >
              {subtitle && (
                <div className="mb-12 pb-8 border-b border-slate-100">
                  <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-3xl">
                    {subtitle}
                  </p>
                </div>
              )}

              <article className="prose prose-slate max-w-none 
                prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-6
                prose-p:text-slate-600 prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 prose-p:font-medium
                prose-li:text-slate-600 prose-li:text-sm md:prose-li:text-base prose-li:mb-2 prose-li:font-medium
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-a:text-[#1447E6] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-hr:border-slate-100 prose-hr:my-16"
              >
                {children}
              </article>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
