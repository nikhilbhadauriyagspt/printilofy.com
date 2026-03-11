import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Heart,
  X,
  Loader2,
  ChevronRight,
  ShoppingCart,
  Expand,
  CheckCircle2,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const printers = d.data.find(c => c.slug === 'printers' || c.id === 46);
          setCategories(printers ? printers.children : []);
        }
      });
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => setBrands(d.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000'); 

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p =>
            !p.name.toLowerCase().includes('laptop') &&
            !p.name.toLowerCase().includes('macbook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
    setActiveDropdown(null);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0]}` : "/logo/fabicon.png";
    } catch { return "/logo/fabicon.png"; }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen font-['Heebo'] text-slate-900">
      <SEO title="Hardware Catalog | Printilofy" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14">
        <div className="w-full px-4 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
              <Link to="/" className="hover:text-[#4B4DED] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900">Hardware Catalog</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Shop All Products
            </h1>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-6"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Inventory Synchronized</span>
          </div>
        </div>
      </div>

      {/* --- DYNAMIC FILTER HUD --- */}
      <div className="sticky top-0 z-[100] w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="w-full px-4 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}
                className={`px-6 py-2.5 border-2 text-[11px] font-black uppercase tracking-widest flex items-center gap-3 transition-all rounded-full ${category ? 'border-[#4B4DED] bg-[#4B4DED] text-white' : 'border-slate-100 hover:border-slate-300'}`}
              >
                {category ? category.replace('-', ' ') : 'Categories'}
                <ChevronDown size={14} className={activeDropdown === 'cat' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'cat' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 mt-3 w-[280px] bg-white border border-slate-200 shadow-2xl p-2 z-[110] rounded-xl">
                    <button onClick={() => updateFilter('category', '')} className="w-full text-left px-4 py-3 text-[10px] font-black hover:bg-slate-50 uppercase tracking-widest text-slate-400 border-b border-slate-50 mb-1">Clear selection</button>
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {categories.map(c => (
                        <button key={c.id} onClick={() => updateFilter('category', c.slug)} className={`w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 hover:text-[#4B4DED] transition-colors rounded-lg ${category === c.slug ? 'bg-blue-50 text-[#4B4DED]' : 'text-slate-600'}`}>
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Brand Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'brand' ? null : 'brand')}
                className={`px-6 py-2.5 border-2 text-[11px] font-black uppercase tracking-widest flex items-center gap-3 transition-all rounded-full ${brand ? 'border-[#4B4DED] bg-[#4B4DED] text-white' : 'border-slate-100 hover:border-slate-300'}`}
              >
                {brand || 'Manufacturers'}
                <ChevronDown size={14} className={activeDropdown === 'brand' ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'brand' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 mt-3 w-[240px] bg-white border border-slate-200 shadow-2xl p-2 z-[110] rounded-xl">
                    <button onClick={() => updateFilter('brand', '')} className="w-full text-left px-4 py-3 text-[10px] font-black hover:bg-slate-50 uppercase tracking-widest text-slate-400 border-b border-slate-50 mb-1">All brands</button>
                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                      {brands.map(b => (
                        <button key={b.id} onClick={() => updateFilter('brand', b.name)} className={`w-full text-left px-4 py-3 text-xs font-bold hover:bg-slate-50 hover:text-[#4B4DED] transition-colors rounded-lg ${brand === b.name ? 'bg-blue-50 text-[#4B4DED]' : 'text-slate-600'}`}>
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search catalog */}
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4B4DED]" size={16} />
            <input
              type="text" value={search} onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search by model or brand..."
              className="w-full pl-12 pr-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-[13px] font-bold outline-none focus:bg-white focus:border-[#4B4DED] transition-all placeholder:font-medium shadow-inner"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#4B4DED] text-white' : 'text-slate-400 hover:bg-slate-100'}`}><LayoutGrid size={18} /></button>
              <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#4B4DED] text-white' : 'text-slate-400 hover:bg-slate-100'}`}><List size={18} /></button>
            </div>

            <div className="relative">
              <select
                value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                className="appearance-none bg-white border border-slate-200 rounded-full pl-6 pr-12 py-2.5 text-[11px] font-black uppercase tracking-widest outline-none cursor-pointer hover:border-[#4B4DED] transition-colors"
              >
                <option value="newest">Sort: Latest</option>
                <option value="price_low">Price: Low-High</option>
                <option value="price_high">Price: High-Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="w-full px-4 lg:px-12 py-12 md:py-16">

        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200">
          <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-400">
            Current Collection <span className="text-[#4B4DED] ml-2">/ {total} products found</span>
          </h2>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-[#4B4DED]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Genuine Hardware</span>
          </div>
        </div>

        {loading ? (
          <div className="py-48 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#4B4DED] mb-6" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Synchronizing inventory</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-40 text-center border-2 border-dashed border-slate-200 bg-white rounded-3xl">
            <Search size={48} className="mx-auto text-slate-200 mb-8" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">No systems found</h3>
            <p className="text-slate-500 mb-10">Try adjusting your filters or search keywords.</p>
            <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-[#4B4DED] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all rounded-full shadow-lg">Reset catalog</button>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
            : 'grid-cols-1'
            }`}>
            {products.map((p) => (
              <div
                key={p.id}
                className={`group relative flex flex-col h-full transition-all duration-500 ${viewMode === 'list' ? 'sm:flex-row gap-10 items-center p-8 bg-white border border-slate-200 rounded-3xl' : ''
                  }`}
              >
                {/* Product Card Styled like CategorySpotlight */}
                <div className={`${viewMode === 'grid' ? 'w-full' : 'w-full sm:w-64'}`}>
                  <div className="relative mb-4 rounded-xl border border-slate-200 bg-[#f8f8f8] overflow-hidden">
                    {/* Hover Actions */}
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 translate-x-14 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#4B4DED] transition-colors"
                      >
                        <Expand size={16} />
                      </button>
                      <button 
                        onClick={() => toggleWishlist(p)}
                        className={`w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center transition-colors ${
                          isInWishlist(p.id) ? 'text-red-500 fill-red-500 border-red-100' : 'text-slate-700 hover:text-[#4B4DED]'
                        }`}
                      >
                        <Heart size={16} className={isInWishlist(p.id) ? 'fill-red-500' : ''} />
                      </button>
                    </div>

                    <Link to={`/product/${p.slug}`} className="block aspect-square bg-white p-6">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </Link>
                  </div>

                  {viewMode === 'grid' && (
                    <div className="pb-2 flex flex-col">
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[15px] leading-[1.4] font-medium text-slate-800 mb-2 line-clamp-2 group-hover:text-[#4B4DED] transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">{p.brand_name || 'HP SUPPLY'}</div>
                      <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[17px] font-black text-slate-900 tracking-tighter">${Number(p.price).toFixed(2)}</span>
                        </div>
                        <div className="overflow-hidden">
                          <button
                            onClick={() => addToCart(p)}
                            className="w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 inline-flex items-center justify-center rounded-full bg-[#4B4DED] py-2.5 text-white text-[13px] font-bold hover:bg-[#3f41dc]"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {viewMode === 'list' && (
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black text-[#4B4DED] uppercase tracking-widest">{p.brand_name || 'HP SUPPLY'}</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1"><CheckCircle2 size={12}/> In Stock</span>
                    </div>
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#4B4DED] transition-colors mb-4">{p.name}</h3>
                    </Link>
                    <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed">Experience high-quality genuine printing with this {p.brand_name} verified hardware. Designed for professional workflows and reliable output performance.</p>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certified Price</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tighter">${Number(p.price).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => addToCart(p)} className="px-10 py-4 bg-[#4B4DED] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all rounded-full shadow-lg shadow-blue-900/20">Add to cart</button>
                        <Link to={`/product/${p.slug}`} className="px-10 py-4 border-2 border-slate-900 text-slate-900 font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all rounded-full">Details</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Footer Spacing --- */}
      <div className="py-16 border-t border-slate-200 bg-white">
        <div className="w-full px-12 flex justify-center">
          <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em]">End of inventory</p>
        </div>
      </div>

    </div>
  );
}
