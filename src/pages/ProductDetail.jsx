import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  ShoppingCart,
  CheckCircle2,
  ArrowRight,
  Zap,
  Star,
  ArrowLeft,
  Info,
  Package,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;

          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-['Heebo']">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-slate-200 border-t-[#1447E6] rounded-full mb-6"
        />
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Loading catalog...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-slate-50 font-['Heebo']">
        <div className="w-20 h-20 bg-white border border-slate-200 flex items-center justify-center mb-8">
          <Info size={32} className="text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Hardware not found</h2>
        <p className="text-slate-500 mb-10 max-w-md mx-auto text-sm font-medium">The requested system could not be located in our active inventory.</p>
        <Link to="/shop" className="px-10 py-4 bg-[#1447E6] text-white font-bold text-[11px] uppercase tracking-widest transition-all hover:bg-slate-900">Return to catalog</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-slate-50 min-h-screen font-['Heebo'] text-slate-900">
      <SEO title={product.name} description={product.description?.substring(0, 160)} />

      {/* --- Breadcrumbs --- */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-[#1447E6] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-slate-300" />
            <Link to="/shop" className="hover:text-[#1447E6] transition-colors">Shop</Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-slate-900 truncate max-w-[200px]">{product.name}</span>
          </nav>

          <Link to="/shop" className="flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-[#1447E6] transition-colors uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to products
          </Link>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Left Stage: Visual Gallery */}
          <div className="lg:col-span-6">
            <div className="sticky top-32 space-y-6">
              <div
                className="aspect-square bg-white border border-slate-200 flex items-center justify-center p-12 overflow-hidden relative group"
              >
                <img
                  src={mainImage} alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                />

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-6 right-6 h-10 w-10 flex items-center justify-center transition-all bg-white border border-slate-200 shadow-sm hover:border-[#1447E6] ${isInWishlist(product.id) ? 'text-red-500' : 'text-slate-300 hover:text-red-500'}`}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>

                <div className="absolute bottom-6 left-6">
                  <div className="px-4 py-2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-blue-400" /> In Stock
                  </div>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx} onClick={() => setActiveImage(idx)}
                      className={`h-24 w-24 border flex-shrink-0 flex items-center justify-center p-4 transition-all bg-white ${activeImage === idx ? 'border-[#1447E6]' : 'border-slate-200 hover:border-slate-400'}`}
                    >
                      <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Stage: Info & Actions */}
          <div className="lg:col-span-6">
            <div className="space-y-8 bg-white p-8 md:p-12 border border-slate-200">

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black text-[#1447E6] uppercase tracking-widest">
                    {product.brand_name || 'Brand'}
                  </span>
                  <div className="h-4 w-px bg-slate-200"></div>
                  <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                    <div className="h-2 w-2 bg-emerald-500 animate-pulse" />
                    In stock
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  {product.name}
                </h1>

                <div className="flex items-end gap-6 pt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MSRP</p>
                    <p className="text-4xl font-bold text-slate-900">${parseFloat(product.price).toLocaleString()}</p>
                  </div>
                  {product.sale_price && (
                    <div className="pb-1 text-slate-400">
                      <span className="text-lg font-bold line-through">${product.sale_price}</span>
                      <p className="text-[10px] font-black text-red-500 mt-1 uppercase tracking-widest">Limited Offer</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p className="text-slate-600 text-base font-medium leading-relaxed">
                    {product.description || "High-performance printing solution designed for professional environments. Experience reliable output, advanced security features, and efficient performance."}
                  </p>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="h-14 px-4 bg-slate-50 border border-slate-200 flex items-center gap-8 w-full sm:w-auto">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-400 hover:text-[#1447E6] transition-colors">
                      <Minus size={18} strokeWidth={3} />
                    </button>
                    <span className="text-lg font-bold text-slate-900 min-w-[20px] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-slate-400 hover:text-[#1447E6] transition-colors">
                      <Plus size={18} strokeWidth={3} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart} disabled={isAdded}
                    className={`flex-1 h-14 flex items-center justify-center gap-4 font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-70 ${isAdded ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-[#1447E6]'}`}
                  >
                    {isAdded ? <><CheckCircle2 size={20} /> Item added</> : <><ShoppingCart size={18} /> Add to cart</>}
                  </button>
                </div>

                {/* Service Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-slate-100 bg-slate-50 flex items-center gap-4">
                    <div className="h-10 w-10 bg-white border border-slate-200 text-[#1447E6] flex items-center justify-center">
                      <Truck size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[12px] font-bold text-slate-900">Fast delivery</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logistics</p>
                    </div>
                  </div>
                  <div className="p-5 border border-slate-100 bg-slate-50 flex items-center gap-4">
                    <div className="h-10 w-10 bg-white border border-slate-200 text-[#1447E6] flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[12px] font-bold text-slate-900">Secure warranty</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Official Support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Tabs */}
              <div className="pt-10 border-t border-slate-100">
                <div className="flex gap-8 mb-8 border-b border-slate-100">
                  {[
                    { id: 'specs', label: 'Technical details' },
                    { id: 'support', label: 'Support info' }
                  ].map(tab => (
                    <button
                      key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 text-[11px] font-black uppercase tracking-widest relative transition-colors ${activeTab === tab.id ? 'text-[#1447E6]' : 'text-slate-400 hover:text-slate-900'}`}
                    >
                      {tab.label}
                      {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1447E6]" />}
                    </button>
                  ))}
                </div>

                <div className="min-h-[120px]">
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                      {[
                        { label: "Manufacturer", value: product.brand_name || "Official Brand" },
                        { label: "Category", value: product.category_name || "Hardware" },
                        { label: "Model Type", value: "Premium Edition" },
                        { label: "Support", value: "Official Support" }
                      ].map((spec, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{spec.label}</span>
                          <span className="text-[12px] font-bold text-slate-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'support' && (
                    <div className="bg-slate-900 p-8 text-white">
                      <h4 className="text-lg font-bold mb-3 tracking-tight">Need technical advice?</h4>
                      <p className="text-slate-400 text-sm mb-6 leading-relaxed">Our certified specialists can help with setup, configuration, and troubleshooting for your new hardware.</p>
                      <Link to="/contact" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest bg-[#1447E6] px-8 py-4 hover:bg-white hover:text-[#1447E6] transition-all">
                        Contact support <ExternalLink size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Related Products --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-20 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[2px] bg-[#1447E6]"></span>
                  <span className="text-[#1447E6] text-[10px] font-black uppercase tracking-[0.3em]">Complementary</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Recommended hardware</h2>
              </div>
              <Link to="/shop" className="group flex items-center gap-3 text-slate-900 font-bold text-[10px] uppercase tracking-widest border-b border-slate-200 pb-2 hover:border-[#1447E6] transition-all">
                Full catalog <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  to={`/product/${p.slug}`}
                  key={p.id}
                  className="group flex flex-col bg-white border border-slate-200 p-4 hover:border-[#1447E6]/30 hover:shadow-xl transition-all duration-300"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="aspect-square bg-slate-50 flex items-center justify-center p-4 mb-4 overflow-hidden relative">
                    <img src={getImagePath(p.images)} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[9px] font-black text-[#1447E6] uppercase tracking-widest mb-2">{p.brand_name || 'Brand'}</span>
                    <h4 className="text-[12px] font-bold text-slate-800 group-hover:text-[#1447E6] transition-colors leading-snug line-clamp-2 mb-3">{p.name}</h4>
                    <p className="text-[14px] font-black text-slate-900 mt-auto">${parseFloat(p.price).toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
