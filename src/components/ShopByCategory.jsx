import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ShopByCategory({ categories = [] }) {
  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent?.children || [];

  const getImagePath = (image) => {
    if (!image) return "/logo/fabicon.png";
    // Replace .jpg with .png for category images coming from DB
    const processedImage = image.replace(/\.jpg$/, '.png');
    return processedImage.startsWith("/") ? processedImage : `/${processedImage}`;
  };

  if (!displayCategories.length) return null;

  return (
    <section className="w-full bg-[#f3f3f3] py-16 lg:py-20 font-['Heebo']">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        {/* Heading */}
        <div className="mb-10 lg:mb-12">
          <h2 className="text-[28px] md:text-[34px] font-bold text-slate-900">
            Shop by Featured Categories
          </h2>
          <div className="w-24 h-[3px] bg-[#4B4DED] mt-4 absolute absolute rounded-full"></div>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".shop-cat-next",
              prevEl: ".shop-cat-prev",
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={displayCategories.length > 6}
            spaceBetween={18}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 2.2, spaceBetween: 18 },
              640: { slidesPerView: 3, spaceBetween: 18 },
              768: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 22 },
              1280: { slidesPerView: 6, spaceBetween: 24 },
              1536: { slidesPerView: 8, spaceBetween: 24 },
            }}
            className="shop-by-category-swiper"
          >
            {displayCategories.map((cat) => (
              <SwiperSlide key={cat.id}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl h-[210px] md:h-[280px] px-5 py-6 flex flex-col items-center justify-between border border-transparent hover:border-[#4B4DED]/20 hover:shadow-md transition-all duration-300">
                    <div className="flex-1 flex items-center justify-center w-full">
                      <img
                        src={getImagePath(cat.image)}
                        alt={cat.name}
                        className="max-h-[95px] md:max-h-[150px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/logo/fabicon.png";
                        }}
                      />
                    </div>

                    <div className="pt-5">
                      <h3 className="text-[16px] md:text-[17px] font-medium text-slate-900 text-center leading-snug group-hover:text-[#4B4DED] transition-colors">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows */}
          <button className="shop-cat-prev absolute -left-2 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#4B4DED] hover:border-[#4B4DED] transition-all shadow-sm">
            <ChevronLeft size={20} />
          </button>

          <button className="shop-cat-next absolute -right-2 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#4B4DED] hover:border-[#4B4DED] transition-all shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .shop-by-category-swiper {
          padding: 6px 4px 8px 4px !important;
        }

        .shop-by-category-swiper .swiper-slide {
          height: auto;
        }

        .shop-by-category-swiper .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </section>
  );
}