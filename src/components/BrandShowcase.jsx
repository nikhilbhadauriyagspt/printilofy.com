import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo.startsWith('http') ? brand.logo : `/${brand.logo}`;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=ffffff&color=4B4DED&bold=true`;
  };

  if (brands.length === 0) return null;

  return (
    <section className="w-full py-16 md:py-24 font-['Heebo'] bg-white border-t border-slate-100">
      <div className="w-full px-4 lg:px-12">

        {/* Heading matched with other components */}
        <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-[28px] md:text-[38px] font-bold text-slate-900 leading-none">
              Shop By Brand
            </h2>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-4 absolute"></div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <ShieldCheck size={18} className="text-[#4B4DED]" />
            <span className="text-xs font-black uppercase tracking-widest">Authorized Dealer</span>
          </div>
        </div>

        {/* Premium Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/5">
          {brands.map((brand, i) => (
            <Link
              key={brand.id}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group relative bg-white p-8 lg:p-14 flex flex-col items-center justify-center transition-all duration-500 hover:z-10 hover:bg-slate-50"
            >
              {/* Corner accent revealed on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight size={18} className="text-[#4B4DED]" />
              </div>

              {/* Brand Logo with Grayscale to Color transition */}
              <div className="relative h-12 lg:h-16 w-full flex items-center justify-center">
                <img
                  src={getBrandLogo(brand)}
                  alt={brand.name}
                  className="max-h-full max-w-[140px] object-contain transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=ffffff&color=4B4DED&bold=true`; }}
                />
              </div>

              {/* Brand Name Indicator */}
              <div className="mt-6">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#4B4DED] uppercase tracking-[0.2em] transition-colors">
                  {brand.name}
                </span>
              </div>

              {/* Bottom Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#4B4DED] group-hover:w-full transition-all duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Bottom trust indicator */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left border-t border-slate-50 pt-12">
          <div className="flex flex-col items-center md:items-start max-w-xs">
            <span className="text-[11px] font-black text-[#4B4DED] uppercase tracking-widest mb-2">Original Parts</span>
            <p className="text-slate-500 text-xs font-medium">We only stock 100% genuine parts directly from these certified manufacturers.</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-100"></div>
          <div className="flex flex-col items-center md:items-start max-w-xs">
            <span className="text-[11px] font-black text-[#4B4DED] uppercase tracking-widest mb-2">Global Shipping</span>
            <p className="text-slate-500 text-xs font-medium">Fast and secure worldwide delivery for all major printer brands listed above.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
