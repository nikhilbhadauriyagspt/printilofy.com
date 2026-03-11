import { Link } from "react-router-dom";
import { ArrowRight, MoveRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Promotions collage:
 * - Redesigned to show only two high-impact banners in a 2-column grid.
 * - Sharp architecture, no gradients, no shadows.
 */
export default function SpecialsPromotions() {
  const IMG = {
    left: "/banner/promo-left.jpg",
    right: "/banner/promo-top-right.jpg",
  };

  return (
    <section className="font-['Heebo'] py-24 bg-slate-50">
      <div className="w-full mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#1447E6]"></span>
              <span className="text-[#1447E6] text-[10px] font-black uppercase tracking-[0.3em]">Limited time offers</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
              Specials & promotions
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-slate-200 pb-2 hover:border-[#1447E6] transition-all">
            View all offers <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-white border border-slate-100 overflow-hidden">
          {/* BANNER 1 */}
          <PromoCard
            className="min-h-[450px] md:min-h-[550px]"
            image={IMG.left}
          >
            <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 border-l-4 border-[#1447E6] max-w-lg">
              <span className="inline-block text-[#1447E6] text-[10px] font-black uppercase tracking-widest mb-4">
                Season sale
              </span>

              <h3 className="text-slate-900 text-3xl md:text-5xl font-bold leading-tight mb-6">
                Clearance event
              </h3>

              <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed font-medium">
                Up to <span className="text-[#1447E6] font-bold">60% off</span> on select premium HP printers and authentic supplies.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all hover:bg-[#1447E6] group/btn"
              >
                Shop the sale
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </PromoCard>

          {/* BANNER 2 */}
          <PromoCard
            className="min-h-[450px] md:min-h-[550px]"
            image={IMG.right}
          >
            <div className="bg-[#1447E6]/95 backdrop-blur-md p-8 md:p-12 border-l-4 border-white max-w-lg">
              <span className="inline-block text-blue-200 text-[10px] font-black uppercase tracking-widest mb-4">
                Exclusive access
              </span>

              <h3 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-6">
                Business solutions
              </h3>

              <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed font-medium">
                Empower your workspace with high-performance <span className="text-white font-bold underline decoration-2 underline-offset-4">LaserJet managed systems</span>.
              </p>

              <Link
                to="/shop?category=laser-printers"
                className="inline-flex items-center gap-4 bg-white text-[#1447E6] px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white group/btn"
              >
                Explore business tech
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </PromoCard>
        </div>
      </div>
    </section>
  );
}

function PromoCard({ image, children, className = "" }) {
  return (
    <div className={`relative overflow-hidden group border-r border-slate-100 last:border-0 ${className}`}>
      {/* Background Image - Pure, No Overlay by default */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content - Shifted to bottom for "Card in Card" look */}
      <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-end items-start">
        {children}
      </div>
    </div>
  );
}
