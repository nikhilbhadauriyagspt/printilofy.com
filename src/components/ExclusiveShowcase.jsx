import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Zap, Layers, ShieldCheck, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const exclusiveProducts = [
  {
    name: "Enterprise Color LaserJet Pro",
    label: "Professional Choice",
    desc: "Next-generation laser technology with integrated security and ultra-fast output for high-demand business environments.",
    price: "$1,299",
    image: "/products/image_110.png",
    accent: "bg-[#1447E6]",
    stats: [
      { label: "Speed", value: "45 PPM" },
      { label: "Security", value: "Level 4" }
    ]
  },
  {
    name: "Precision Ink Tank System",
    label: "Cost Efficient",
    desc: "Revolutionary ink system with enough capacity to print thousands of pages before your first refill. True color precision.",
    price: "$549",
    image: "/products/image_115.png",
    accent: "bg-[#4B4DED]",
    stats: [
      { label: "Yield", value: "18k Pages" },
      { label: "Resolution", value: "4800 DPI" }
    ]
  }
];

export default function ExclusiveShowcase() {
  return (
    <section className="w-full py-24 bg-white font-['Heebo'] overflow-hidden">
      <div className="w-full px-4 lg:px-12">
        
        {/* ARCHITECTURAL HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8 border-b border-slate-100 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#1447E6]"></div>
              <span className="text-[#1447E6] text-[10px] font-black uppercase tracking-[0.3em]">The Elite Collection</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase italic">
              Performance <br /> 
              <span className="text-slate-300 not-italic">Refined.</span>
            </h2>
          </div>
          <div className="hidden lg:block">
            <p className="text-slate-500 text-sm max-w-xs font-medium leading-relaxed">
              Curated selection of our most powerful and efficient printing systems for modern enterprises.
            </p>
          </div>
        </div>

        {/* GRID LAYOUT - HIGH-LOW STYLE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-100 border border-slate-100 overflow-hidden shadow-2xl">
          {exclusiveProducts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white group relative overflow-hidden flex flex-col"
            >
              {/* Image Showcase Container */}
              <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-12">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={p.image} 
                    className="max-w-full max-h-full object-contain drop-shadow-2xl" 
                    alt={p.name}
                    onError={(e) => { e.target.src = '/logo/fabicon.png'; }}
                  />
                </motion.div>
                
                {/* Product Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-black text-slate-200/40 select-none pointer-events-none uppercase whitespace-nowrap">
                   {p.label.split(' ')[0]}
                </div>
              </div>

              {/* Content Box */}
              <div className="p-10 lg:p-14 flex flex-col flex-1 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-8 h-[2px] ${p.accent}`}></span>
                  <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">{p.label}</span>
                </div>

                <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tight">
                  {p.name}
                </h3>

                <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium max-w-md italic">
                  "{p.desc}"
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-slate-50 py-8">
                  {p.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-xl font-black text-slate-900">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#1447E6] uppercase tracking-[0.2em] mb-1">Price Starts At</span>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">{p.price}</span>
                  </div>

                  <Link
                    to="/shop"
                    className={`group relative flex items-center justify-center w-16 h-16 rounded-full ${p.accent} text-white transition-all hover:scale-110 active:scale-95`}
                  >
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
