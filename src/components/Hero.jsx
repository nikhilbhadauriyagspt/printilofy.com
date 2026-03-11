import React, { useState, useEffect } from "react";
import { ArrowRight, MoveRight, Target, Cpu, ChevronRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from "framer-motion";
import API_BASE_URL from '../config';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import the banner images
import banner1 from "@/assets/bannerr/banner-1.jpg";
import banner2 from "@/assets/bannerr/banner-2.jpg";
import banner3 from "@/assets/bannerr/banner-3.jpg";
import banner4 from "@/assets/bannerr/banner-4.jpg";
import banner5 from "@/assets/bannerr/banner-5.jpg";
import banner6 from "@/assets/bannerr/banner-6.jpg";
import banner7 from "@/assets/bannerr/banner-7.jpg";
import banner8 from "@/assets/bannerr/banner-8.jpg";
import banner9 from "@/assets/bannerr/banner-9.jpg";
import banner10 from "@/assets/bannerr/banner-10.jpg";

const mainBanners = [
  {
    image: banner5,
    title: "Premium Printers for Every Workspace",
    subtitle: "Home, office, and business ready",
    description:
      "Shop reliable printers with fast performance, clean output, and modern features designed for everyday printing needs.",
    label: "Printer Collection",
    cta: "Shop Printers"
  },
  {
    image: banner6,
    title: "Original Ink & Toner Supplies",
    subtitle: "Sharp results with every print",
    description:
      "Browse genuine ink and toner cartridges made for consistent quality, smooth performance, and long-lasting output.",
    label: "Printer Supplies",
    cta: "Buy Cartridges"
  },
  {
    image: banner8,
    title: "Wireless & Smart Printing Made Easy",
    subtitle: "Print faster, smarter, better",
    description:
      "Find smart printers with wireless connectivity, mobile printing support, and efficient features for modern workspaces.",
    label: "Smart Printers",
    cta: "Explore Now"
  },
  {
    image: banner10,
    title: "Business Printing That Keeps You Moving",
    subtitle: "Powerful devices for growing teams",
    description:
      "Choose office-ready printers and multifunction solutions built for speed, productivity, and dependable daily use.",
    label: "Office Solutions",
    cta: "View Range"
  },
];

export default function Hero() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children);
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full font-['Heebo'] overflow-hidden">
      {/* FLAT ARCHITECTURAL GRID */}
      <div className="w-full px-4 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-6">

          {/* CATEGORY SIDEBAR - OPEN BY DEFAULT */}
          <div className="hidden lg:block w-[16%] shrink-0 border border-slate-100 bg-white">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
              <Menu size={18} className="text-[#1447E6]" />
              <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">All Categories</span>
            </div>
            <div className="py-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="flex items-center justify-between px-5 py-4 text-[14px] text-slate-700 hover:text-[#1447E6] hover:bg-slate-50 transition-colors group"
                >
                  <span className="font-medium">{cat.name}</span>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-[#1447E6] transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
              {categories.length === 0 && (
                <div className="px-5 py-4 space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className="h-4 bg-slate-100 animate-pulse rounded"></div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 1. THE MAIN SHOWCASE (Sharp Edges, No Shadow) */}
          <div className="flex-1 relative w-full lg:w-[82%] h-[400px] md:h-[500px] lg:h-[600px] border border-slate-100 bg-white">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              speed={1000}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !w-10 !h-0.5 !bg-slate-200 !rounded-none !opacity-100 transition-all duration-500',
                bulletActiveClass: '!bg-[#1447E6] !w-14'
              }}
              className="h-full w-full"
            >
              {mainBanners.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[12000ms] group-hover:scale-110"
                    />

                    {/* Subtle Darkener for the whole image (very light) */}
                    <div className="absolute inset-0 bg-black/5 z-10" />

                    {/* Floating Architectural Card */}
                    <div className="absolute inset-0 z-20 flex items-center px-4 md:px-12">
                      <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="bg-white/40 backdrop-blur-xl p-6 md:p-12 max-w-full md:max-w-2xl border-l-[4px] md:border-l-[6px] border-[#1447E6]  border-white/20 "
                      >
                        <div className="inline-block px-2 py-1 bg-[#1447E6] text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-3 md:mb-6 shadow-sm">
                          {item.label}
                        </div>

                        <h2 className="text-xl md:text-3xl lg:text-[58px] font-black text-slate-900 mb-3 md:mb-6 leading-tight">
                          {item.title}
                        </h2>

                        <p className="text-slate-800 text-[11px] md:text-sm mb-6 md:mb-10 leading-relaxed font-semibold line-clamp-3 md:line-clamp-none">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-8">
                          <Link
                            to="/shop"
                            className="group flex items-center gap-3 text-[#1447E6] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all"
                          >
                            <span>{item.cta}</span>
                            <div className="w-8 md:w-10 h-[2px] md:h-[2.5px] bg-[#1447E6] group-hover:w-12 md:group-hover:w-16 transition-all duration-300"></div>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
