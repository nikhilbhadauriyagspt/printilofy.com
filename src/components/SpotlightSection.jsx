import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart, Eye, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const SkeletonSpotlightItem = () => (
  <div className="block py-6 border-b border-slate-100 animate-pulse last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-[85px] h-[75px] bg-slate-100 rounded-lg shrink-0"></div>
      <div className="min-w-0 flex-1">
        <div className="h-3 w-12 bg-slate-100 mb-2 rounded"></div>
        <div className="h-4 w-full bg-slate-100 mb-2 rounded"></div>
        <div className="h-3 w-20 bg-slate-100 rounded"></div>
      </div>
    </div>
  </div>
);

const SpotlightBlock = ({ title, data, colIndex, loading = false }) => {
  const perPage = 3;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const maxPage = Math.max(0, Math.ceil((data?.length || 0) / perPage) - 1);

  const goPrev = () => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  };
  const goNext = () => {
    setDirection(1);
    setPage((p) => Math.min(maxPage, p + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
      if (!first) return "/logo/fabicon.png";
      const cleaned = String(first).replaceAll("\\", "/");
      return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    } catch { return "/logo/fabicon.png"; }
  };

  const pageItems = (data || []).slice(page * perPage, page * perPage + perPage);

  return (
    <div className={`bg-white group/block transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 z-10 ${colIndex < 2 ? "lg:border-r border-slate-100" : ""}`}>
      {/* Block Header */}
      <div className="flex items-center justify-between px-8 py-7 border-b border-slate-100">
        <h3 className="text-[16px] font-black text-slate-900 tracking-widest">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-[#4B4DED] hover:text-[#4B4DED] transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={goNext}
            disabled={page === maxPage}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed hover:border-[#4B4DED] hover:text-[#4B4DED] transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="px-8 overflow-hidden min-h-[420px] py-2">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.2 }
            }}
          >
            {loading ? (
              [...Array(3)].map((_, i) => <SkeletonSpotlightItem key={`skel-${i}`} />)
            ) : pageItems.length ? (
              pageItems.map((p) => (
                <div
                  key={p.id}
                  className="block py-7 border-b border-slate-50 last:border-0 group cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    {/* Thumbnail */}
                    <Link to={`/product/${p.slug}`} className="w-[100px] h-[85px] flex items-center justify-center shrink-0 bg-slate-50 rounded-xl border border-slate-100 p-3 overflow-hidden transition-all group-hover:border-[#4B4DED]/30 group-hover:bg-white group-hover:shadow-lg group-hover:shadow-blue-900/5">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${p.slug}`} className="block text-[14px] font-bold text-slate-800 line-clamp-1 group-hover:text-[#4B4DED] transition-colors mb-1.5 leading-tight">
                        {p.name}
                      </Link>

                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[15px] font-black text-slate-900 tracking-tight">${Number(p?.price || 0).toFixed(2)}</span>
                        {p.old_price && <span className="text-[12px] text-slate-400 line-through">${p.old_price}</span>}
                      </div>

                      <div className="flex items-center gap-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => { e.preventDefault(); addToCart(p); }}
                          className="flex items-center gap-1.5 text-[10px] font-black text-[#4B4DED] hover:text-slate-900 transition-colors uppercase tracking-widest"
                        >
                          <ShoppingCart size={12} />
                          Quick Add
                        </button>
                        <span className="w-px h-2.5 bg-slate-200"></span>
                        <button
                          onClick={(e) => { e.preventDefault(); navigate(`/product/${p.slug}`); }}
                          className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-2 py-20 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] text-center">No products found.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function SpotlightSection({
  newArrivals = [],
  topRated = [],
  popular = [],
  loading = false
}) {
  const normalizeList = (input) => {
    if (Array.isArray(input)) return input;
    if (input && Array.isArray(input.data)) return input.data;
    return [];
  };

  return (
    <section className="w-full font-['Heebo'] py-16 md:py-20 bg-[#f5f5f5]">
      <div className="w-full px-4 lg:px-12">

        {/* Heading matched with other components */}
        <div className="flex items-end justify-between mb-8 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-[28px] md:text-[38px] font-bold text-slate-900 leading-none">
              Trending Collections
            </h2>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-4 absolute"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border border-slate-200 rounded-xl overflow-hidden">
          <SpotlightBlock title="New Arrivals" data={normalizeList(newArrivals)} colIndex={0} loading={loading} />
          <SpotlightBlock title="Top Rated" data={normalizeList(topRated)} colIndex={1} loading={loading} />
          <SpotlightBlock title="Popular Products" data={normalizeList(popular)} colIndex={2} loading={loading} />
        </div>
      </div>
    </section>
  );
}
