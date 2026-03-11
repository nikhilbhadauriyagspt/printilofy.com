import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye,
  Heart,
  Expand,
  Star,
} from 'lucide-react';
import API_BASE_URL from '../config';
import { useCart } from '../context/CartContext';

import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySpotlight({
  categorySlug = "laser-printers",
  title = "Accessories",
  bannerImage = "/banner/promo-bottom-right.jpg",
  imagePosition = "left"
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?category=${categorySlug}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categorySlug]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "/logo/fabicon.png";
    } catch {
      return "/logo/fabicon.png";
    }
  };

  const getOldPrice = (price) => {
    const numeric = Number(price || 0);
    if (!numeric) return null;
    return (numeric * 1.25).toFixed(2);
  };

  const renderStars = (rating = 4) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={15}
        className={i < rating ? 'fill-[#F6B800] text-[#F6B800]' : 'fill-[#d1d5db] text-[#d1d5db]'}
      />
    ));
  };

  if (loading || products.length === 0) return null;

  const prevClass = `prev-${categorySlug}`;
  const nextClass = `next-${categorySlug}`;

  return (
    <section className="w-full py-10 md:py-14 font-['Heebo']">
      <div className="w-full px-4 lg:px-8 xl:px-16">
        {/* Heading */}
        <div className="flex items-end justify-between mb-8 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-[28px] md:text-[38px] font-bold text-slate-900 leading-none">
              {title}
            </h2>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-4 absolute absolute"></div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`${prevClass} w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#4B4DED] hover:border-[#4B4DED] transition-all shadow-sm cursor-pointer z-10`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className={`${nextClass} w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#4B4DED] hover:border-[#4B4DED] transition-all shadow-sm cursor-pointer z-10`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={`flex flex-col lg:flex-row gap-7 ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>
          {/* Left Banner */}
          <div className="w-full lg:w-[16%] shrink-0">
            <Link
              to={`/shop?category=${categorySlug}`}
              className="block h-full rounded-xl overflow-hidden bg-[#f1ecec] min-h-[380px] md:h-[432px]"
            >
              <img
                src={bannerImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          {/* Right Products */}
          <div className="w-full lg:w-[84%] relative">
            <Swiper
              key={categorySlug}
              modules={[Navigation]}
              navigation={{
                nextEl: `.${nextClass}`,
                prevEl: `.${prevClass}`,
              }}
              spaceBetween={22}
              slidesPerView={1.15}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1100: { slidesPerView: 4 },
                1400: { slidesPerView: 6 },
              }}
              className="category-spotlight-swiper"
            >
              {products.map((p, index) => {
                const oldPrice = getOldPrice(p.price);
                const showSale = index === 0;

                return (
                  <SwiperSlide key={p.id}>
                    <div className="group h-full">
                      <div className="relative mb-4 rounded-xl border border-slate-200 bg-[#f8f8f8] overflow-hidden">


                        {/* Hover Right Actions */}
                        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-14 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => navigate(`/product/${p.slug}`)}
                            className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#4B4DED] transition-colors"
                          >
                            <Expand size={16} />
                          </button>
                          <button
                            onClick={() => toggleWishlist(p)}
                            className={`w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center transition-colors ${isInWishlist(p.id) ? 'text-red-500 fill-red-500 border-red-100' : 'text-slate-700 hover:text-[#4B4DED]'
                              }`}
                          >
                            <Heart size={16} className={isInWishlist(p.id) ? 'fill-red-500' : ''} />
                          </button>
                        </div>

                        {/* Product Image */}
                        <Link
                          to={`/product/${p.slug}`}
                          className="block aspect-[1/1] bg-white p-6"
                        >
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                          />
                        </Link>


                      </div>

                      {/* Content */}
                      <div className="pb-2">
                        <Link to={`/product/${p.slug}`}>
                          <h3 className="text-[17px] leading-[1.45] font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-[#4B4DED] transition-colors">
                            {p.name}
                          </h3>
                        </Link>

                        <div className="text-[15px] text-slate-500 font-medium mb-2">
                          {p.brand_name || 'Adidas'}
                        </div>



                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[18px] font-medium text-slate-900">
                            ${Number(p.price).toFixed(2)}
                          </span>
                          {showSale && oldPrice && (
                            <span className="text-[16px] text-slate-500 line-through">
                              ${oldPrice}
                            </span>
                          )}
                        </div>

                        {/* Add To Cart on hover */}
                        <div className="overflow-hidden">
                          <button
                            onClick={() => addToCart(p)}
                            className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 inline-flex items-center justify-center rounded-full bg-[#4B4DED] px-8 py-3 text-white text-[15px] font-medium hover:bg-[#3f41dc]"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        .category-spotlight-swiper {
          padding: 0 2px 8px 2px !important;
        }
        .category-spotlight-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}