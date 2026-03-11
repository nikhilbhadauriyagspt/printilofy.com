import { Truck, Headset, ShieldCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceHighlights() {
  const items = [
    {
      title: "Express Delivery",
      desc: "Worldwide shipping in 7 days",
      icon: Truck,
      num: "01"
    },
    {
      title: "Premium Quality",
      desc: "Top-tier products guaranteed",
      icon: Award,
      num: "02"
    },
    {
      title: "Expert Support",
      desc: "24/7 technical assistance",
      icon: Headset,
      num: "03"
    },
    {
      title: "Secure Payment",
      desc: "Enterprise grade protection",
      icon: ShieldCheck,
      num: "04"
    },
  ];

  return (
    <section className="w-full bg-slate-900 font-['Heebo'] py-12 lg:py-0 border-y border-slate-800 overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative flex items-center gap-6 p-10 lg:py-14 lg:px-12 transition-all duration-500 hover:bg-slate-800/50 cursor-default border-slate-800 ${
                  idx !== items.length - 1 ? "lg:border-r" : ""
                } ${idx < 2 ? "border-b md:border-b" : ""} ${idx === 1 ? "md:border-r-0 lg:border-r" : ""} ${idx >= 2 ? "border-t md:border-t-0" : ""}`}
              >
                {/* Background Number Watermark */}
                <span className="absolute top-4 right-6 text-4xl font-black text-slate-800 select-none opacity-40 group-hover:text-[#1447E6] group-hover:opacity-100 transition-all duration-500">
                  {item.num}
                </span>

                {/* ICON CONTAINER */}
                <div className="relative">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-800 group-hover:bg-[#1447E6] transition-colors duration-500">
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      className="text-slate-400 group-hover:text-white transition-colors"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="text-[13px] font-black text-white uppercase tracking-[0.2em] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                    {item.desc}
                  </p>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#1447E6] group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
