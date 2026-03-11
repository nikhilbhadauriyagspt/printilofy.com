import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Truck,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer, cartTotal, openSearch } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);

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

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkUser();
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SHOP', path: '/shop' },
    { name: 'FAQ', path: '/faq' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="w-full relative font-['Heebo']">
      {/* TOP LIGHT STRIP */}
      <div className="hidden md:block bg-[#f5f5f5] border-b border-slate-200">
        <div className="w-full px-6 xl:px-10 h-[38px] flex items-center justify-between text-[13px] text-slate-700">
          <div className="flex items-center gap-6">

            <a href="mailto:info@printilofy.com" className="flex items-center gap-2 hover:text-[#4B4DED] transition-colors">
              <Mail size={14} />
              <span>info@printilofy.com </span>
            </a>
          </div>



          <div className="flex items-center gap-5">

            <Link to="/track-order" className="hidden lg:flex items-center gap-1 hover:text-[#4B4DED] transition-colors">
              <Truck size={14} />
              <span>Track Your Order</span>
            </Link>

            <Link
              to={user ? '/profile' : '/login'}
              className="flex items-center gap-1 hover:text-[#4B4DED] transition-colors"
            >
              <User size={14} />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN WHITE HEADER */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="w-full px-6 xl:px-10 py-6 flex items-center justify-between gap-6">
          {/* LOGO */}
          <Link to="/" className="shrink-0">
            <img
              src="/logo/logo.png"
              alt="Printilofy"
              className="h-5 md:h-11 object-contain"
            />
          </Link>

          {/* SEARCH */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div
              onClick={openSearch}
              className="w-full max-w-[680px] h-[46px] border border-slate-300 rounded-full overflow-hidden flex items-center bg-white cursor-text"
            >
              <div className="flex-1 px-5 text-[15px] text-slate-400">
                Search Product Here...
              </div>
              <button
                type="button"
                className="h-full px-8 bg-[#4B4DED] text-white flex items-center justify-center hover:bg-[#3f41d9] transition-colors"
              >
                <Search size={22} />
              </button>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 md:gap-5 shrink-0">
            <Link
              to={user ? '/profile' : '/login'}
              className="hidden sm:flex items-center gap-2 text-slate-800 hover:text-[#4B4DED] transition-colors"
            >
              <User size={23} strokeWidth={1.8} />
            </Link>

            <Link
              to="/wishlist"
              className="relative flex items-center justify-center text-slate-800 hover:text-[#4B4DED] transition-colors"
            >
              <Heart size={23} strokeWidth={1.8} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4B4DED] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCartDrawer}
              className="relative flex items-center gap-2 text-slate-800 hover:text-[#4B4DED] transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={24} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#4B4DED] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              <div className="hidden md:flex items-center gap-2">
                <span className="text-[16px] font-medium">My Cart</span>
              </div>
            </button>

            <button
              className="lg:hidden text-slate-800"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>

      {/* BLUE NAV BAR - FIXED ON SCROLL */}
      <div className={`hidden lg:block bg-[#4B4DED] z-[150] transition-all duration-300 ${scrolled ? 'fixed top-0 left-0 w-full shadow-lg' : 'relative'
        }`}>
        <div className="w-full px-6 xl:px-10 flex items-center justify-between">
          <div className="flex items-center">
            {/* Browse Categories Dropdown */}
            <div
              className="relative w-[16%] shrink-0"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="h-[60px] w-full px-6 flex items-center justify-between bg-[#3F41D9] text-white font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Menu size={19} />
                  <span className="text-[16px]">Browse Categories</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-full bg-white shadow-xl border border-slate-100 z-[200] py-2"
                  >
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-center justify-between px-6 py-3 text-[14px] text-slate-700 hover:text-[#4B4DED] hover:bg-slate-50 transition-colors group"
                        >
                          <span className="font-medium">{cat.name}</span>
                          <ChevronDown size={14} className="-rotate-90 text-slate-400 group-hover:text-[#4B4DED] transition-transform group-hover:translate-x-1" />
                        </Link>
                      ))
                    ) : (
                      <div className="px-6 py-4 space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-4 bg-slate-100 animate-pulse rounded"></div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ORIGINAL NAV LINKS */}
            <nav className="flex items-center">
              {navLinks.map(link => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`h-[60px] px-6 flex items-center text-[15px] font-medium transition-colors ${active ? 'text-white' : 'text-white/95 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* ORIGINAL API CATEGORIES */}
              {categories.slice(0, 5).map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  className="h-[60px] px-6 flex items-center text-[15px] font-medium text-white/95 hover:text-white transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="py-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center min-w-[140px] h-[40px] rounded-full bg-white text-slate-800 font-semibold hover:bg-slate-100 transition-colors"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Placeholder to prevent jump */}
      {scrolled && <div className="hidden lg:block h-[60px]" />}

      {/* MOBILE SEARCH ROW - FIXED ON SCROLL */}
      <div className={`lg:hidden bg-[#4B4DED] px-4 py-3 z-[150] transition-all duration-300 ${scrolled ? 'fixed top-0 left-0 w-full shadow-lg' : 'relative'
        }`}>
        <div
          onClick={openSearch}
          className="w-full h-[44px] bg-white rounded-full overflow-hidden flex items-center cursor-text"
        >
          <div className="flex-1 px-4 text-[14px] text-slate-400">
            Search Product Here...
          </div>
          <div className="h-full px-5 bg-[#4B4DED] text-white flex items-center justify-center">
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* Mobile Placeholder to prevent jump */}
      {scrolled && <div className="lg:hidden h-[68px]" />}

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-[160]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-[88%] max-w-[360px] bg-white z-[170] shadow-2xl overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <img src="/logo/logo.png" alt="logo" className="h-8 object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 border-b">
                <Link
                  to={user ? '/profile' : '/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-slate-800"
                >
                  <User size={20} />
                  <span className="font-medium">
                    {user ? user.name.split(' ')[0] : 'Sign In / My Account'}
                  </span>
                </Link>
              </div>

              <div className="p-4 border-b space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-[15px] font-medium text-slate-800 border-b border-slate-100 last:border-b-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {categories.length > 0 && (
                <div className="p-4">
                  <h3 className="text-[14px] font-bold text-slate-900 mb-3">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-2 text-slate-700"
                      >
                        <div className="w-9 h-9 rounded-md overflow-hidden bg-slate-100">
                          <img
                            src={`/${cat.image.replace(/\.jpg$/, '.png')}`}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/logo/fabicon.png';
                            }}
                          />
                        </div>
                        <span className="text-[14px] font-medium">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 border-t mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-lg bg-slate-900 text-white font-medium"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}