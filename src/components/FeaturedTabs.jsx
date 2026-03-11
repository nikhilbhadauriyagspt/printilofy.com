import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowRight,
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Expand,
  Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";

export default function FeaturedTabs({ loading = false }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveTab] = useState(null);
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  // 1. Fetch Categories on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(c => c.slug === 'printers' || c.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children);
            setActiveTab(printerParent.children[0]); // Default to first
          }
        }
      });
  }, []);

  // 2. Fetch Products when Active Category changes
  useEffect(() => {
    if (activeCategory) {
      setFetchingProducts(true);
      fetch(`${API_BASE_URL}/products?category=${activeCategory.slug}&limit=14`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setProducts(data.data);
          }
          setFetchingProducts(false);
        });
    }
  }, [activeCategory]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "/logo/fabicon.png";
    } catch { return "/logo/fabicon.png"; }
  };

  return (
    <section className="w-full py-10 md:py-14 font-['Heebo'] bg-white">
      <div className="w-full px-4 lg:px-8 xl:px-16">

        {/* Heading matched with CategorySpotlight */}
        <div className="flex items-end justify-between mb-8 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-[28px] md:text-[38px] font-bold text-slate-900 ">
              Featured Products
            </h2>
            <div className="w-24 h-[3px] absolute bg-[#4B4DED] mt-4"></div>
          </div>

          <div className="hidden md:block">
            <Link to="/shop" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#4B4DED] transition-colors flex items-center gap-2">
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* TABS SELECTOR - Manual Only */}
        <div
          className="flex items-center gap-2 md:gap-4 overflow-x-auto mb-10 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-6 py-2.5 text-[12px] font-bold uppercase border-slate-200 tracking-widest transition-all rounded-full border-2 ${activeCategory?.id === cat.id
                ? "bg-[#4B4DED] border-[#4B4DED] text-white "
                : "bg-white border-slate-200 text-slate-400 hover:border-slate-200 hover:text-slate-600"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID - 2 ROWS, 6 COLUMNS ON DESKTOP */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {fetchingProducts ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-[#f5f5f5]/60 z-20"
              >
                <div className="w-10 h-10 border-4 border-slate-100 border-t-[#4B4DED] rounded-full animate-spin"></div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div
            key={activeCategory?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6"
          >
            {products.map((p) => (
              <div key={p.id} className="group flex flex-col h-full">
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
                    className="block aspect-square bg-white p-6"
                  >
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </Link>
                </div>

                {/* Content */}
                <div className="pb-2 flex-1 flex flex-col">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[15px] leading-[1.4] font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-[#4B4DED] transition-colors">
                      {p.name}
                    </h3>
                  </Link>

                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">
                    {p.brand_name || 'HP SUPPLY'}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[17px] font-black text-slate-900 tracking-tighter">
                        ${Number(p.price).toFixed(2)}
                      </span>
                    </div>

                    {/* Add To Cart on hover */}
                    <div className="overflow-hidden">
                      <button
                        onClick={() => addToCart(p)}
                        className="w-full cursor-pointer transition-all duration-300 inline-flex items-center justify-center rounded-full bg-[#4B4DED] py-2.5 text-white text-[13px] font-bold hover:bg-[#3f41dc]"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
