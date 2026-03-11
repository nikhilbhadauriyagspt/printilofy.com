import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import API_BASE_URL from "../config";

import 'swiper/css';
import 'swiper/css/navigation';

export default function BrandStripSlider() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/brands`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setBrands(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setLoading(false);
      });
  }, []);

  if (loading || brands.length === 0) return null;

  return (
    <section className="font-['Heebo'] py-16 md:py-20 bg-white">
      <div className="w-full mx-auto px-4 lg:px-12">

        {/* Heading matched with other components */}
        <div className="flex items-end justify-between mb-10 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-[28px] md:text-[38px] font-bold text-slate-900 leading-none">
              Parts By Brand
            </h2>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-4 absolute"></div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="brand-prev"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#4B4DED] hover:border-[#4B4DED] transition-all shadow-sm cursor-pointer z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              id="brand-next"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#4B4DED] hover:border-[#4B4DED] transition-all shadow-sm cursor-pointer z-10"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Strip using Swiper for smooth auto-sliding */}
        <div className="border border-slate-200 bg-white overflow-hidden rounded-xl ">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={0}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              prevEl: '#brand-prev',
              nextEl: '#brand-next',
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 }
            }}
            className="brand-swiper"
          >
            {brands.map((brand, idx) => (
              <SwiperSlide key={brand.id || idx}>
                <Link
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  className="h-[100px] md:h-[140px] flex flex-col items-center justify-center p-6 md:p-10 border-r border-slate-100 hover:bg-slate-50 transition-all group"
                >
                  <img
                    src={brand.logo ? (brand.logo.startsWith('http') ? brand.logo : `/${brand.logo}`) : `https://ui-avatars.com/api/?name=${brand.name}&background=ffffff&color=4B4DED&bold=true`}
                    alt={brand.name}
                    className="max-h-full max-w-[120px] object-contain opacity-50 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=ffffff&color=4B4DED&bold=true`; }}
                  />
                  <span className="mt-4 text-[9px] font-black text-slate-300 group-hover:text-[#4B4DED] uppercase tracking-[0.2em] transition-colors opacity-0 group-hover:opacity-100">
                    {brand.name}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
