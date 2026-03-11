import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Heart, Globe, Award, Printer, Package, Wrench, Leaf, ChevronRight, CheckCircle2, Headphones, Sparkles, Target, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import banner1 from "@/assets/bannerr/about.png";

export default function About() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen font-['Heebo'] text-slate-900 pb-20">
      <SEO
        title="About Us | Our Mission"
        description="Learn about our commitment to HP excellence, our journey, and the core pillars that drive our specialized hardware services."
      />

      {/* --- Page Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14 mb-10">
        <div className="w-full px-4 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
              <Link to="/" className="hover:text-[#4B4DED] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900">Our Story</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Hardware Excellence
            </h1>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-6"></div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-[#4B4DED] rounded-full border border-blue-100">
            <CheckCircle2 size={16} />
            <span className="text-[11px] font-black uppercase tracking-widest">Premium Hardware Partner</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-12 space-y-20 mt-10">

        {/* --- Section 1: The Vision --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5">
          <div className="lg:col-span-7 bg-white p-8 md:p-16 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-px bg-[#4B4DED]"></div>
                 <span className="text-[10px] font-black text-[#4B4DED] uppercase tracking-[0.3em]">The Vision</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Built on trust <br/> <span className="text-slate-300">and precision.</span></h2>
            </div>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
              Founded in 2026, Printilofy was established to solve a singular challenge: making the acquisition of high-performance printing infrastructure simple, transparent, and absolutely authentic. As a new generation partner, we bridge the gap between complex industrial technology and a seamless, personalized experience.
            </p>
            <div className="pt-4">
               <Link to="/shop" className="inline-flex items-center gap-3 bg-[#4B4DED] text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-900/20">
                  Browse Catalog <ArrowRight size={16} />
               </Link>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white flex items-center justify-center p-8 md:p-12">
            <div className="relative w-full aspect-square overflow-hidden rounded-2xl group bg-slate-50 border border-slate-100">
              <img src={banner1} alt="Hardware Distribution" className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#4B4DED]/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>

        {/* --- Section 2: Core Capabilities --- */}
        <section className="space-y-12">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-[10px] font-black text-[#4B4DED] uppercase tracking-[0.3em]">Operational scope</span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">Our core capabilities.</h2>
            <div className="w-16 h-[3px] bg-[#4B4DED] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Printer, title: "Hardware deployment", desc: "Expert selection of LaserJet, All-in-One, and high-volume industrial systems tailored for your business needs." },
              { icon: Package, title: "Supply chain excellence", desc: "Source for 100% genuine HP ink, toner, and certified replacement parts with rapid nationwide delivery." },
              { icon: Headphones, title: "Specialist support", desc: "Factory-trained technicians providing troubleshooting, installation guidance, and long-term hardware maintenance." }
            ].map((item, i) => (
              <div
                key={i}
                className="p-10 bg-white border border-slate-200 rounded-3xl group hover:border-[#4B4DED]/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="h-16 w-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-[#4B4DED] group-hover:bg-[#4B4DED] group-hover:text-white transition-all duration-500 mb-8 relative z-10">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight relative z-10">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed relative z-10">{item.desc}</p>
                
                {/* Decorative background accent */}
                <div className="absolute -bottom-4 -right-4 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110">
                   <item.icon size={120} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 3: Values Module --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-12 md:p-20 bg-slate-900 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Target className="text-blue-400" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">Our mission</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black leading-tight uppercase">The customer <span className="text-blue-500">standard.</span></h3>
              <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-md">
                To empower professionals with reliable, efficient, and sustainable hardware solutions through original products and certified advice. We believe in technology that works as hard as you do.
              </p>
            </div>
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#4B4DED] opacity-20 blur-[120px] rounded-full" />
          </div>

          <div className="p-12 md:p-20 bg-white border border-slate-200 rounded-[2.5rem] text-slate-900 space-y-8 relative overflow-hidden shadow-xl shadow-blue-900/5">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Users className="text-[#4B4DED]" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Our community</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight uppercase tracking-tight">Nationwide <span className="text-slate-300">reach.</span></h2>
              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-md">
                Expanding across the United States to deliver professional HP technology with unmatched logistics and long-term service value. Our network ensures you are never without technical support.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-slate-50 rounded-tl-full -mr-10 -mb-10"></div>
          </div>
        </div>

        {/* --- Section 4: Advantage Grid --- */}
        <div className="bg-white p-10 md:p-16 border border-slate-200 rounded-[3rem] shadow-xl shadow-blue-900/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-100 pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[2.5px] bg-[#4B4DED]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4B4DED]">Certified ecosystem</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">The Printilofy Advantage</h2>
            </div>
            <Link to="/shop" className="text-[11px] font-black uppercase tracking-widest text-[#4B4DED] border-b-2 border-blue-100 pb-1 hover:border-[#4B4DED] transition-all flex items-center gap-2">
              Explore products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { title: "Verified status", icon: ShieldCheck },
              { title: "Genuine supplies", icon: Package },
              { title: "Hardware service", icon: Zap },
              { title: "Safe logistics", icon: Globe },
              { title: "Original hardware", icon: CheckCircle2 },
              { title: "Technical center", icon: Headphones },
              { title: "Sustainable tech", icon: Leaf },
              { title: "Professional hub", icon: Wrench }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className="h-14 w-14 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 flex items-center justify-center shrink-0 group-hover:text-white group-hover:bg-[#4B4DED] group-hover:border-[#4B4DED] group-hover:shadow-lg group-hover:shadow-blue-900/20 transition-all duration-500">
                  <item.icon size={22} />
                </div>
                <h4 className="text-[14px] font-black text-slate-700 group-hover:text-[#4B4DED] transition-colors uppercase tracking-tight">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
