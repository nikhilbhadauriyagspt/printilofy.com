import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  ShoppingBag,
  Package,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("System profile updated.");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Mismatch in credentials", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Protocol updated.");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-slate-50 min-h-screen font-['Heebo'] text-slate-900 pb-20">

      {/* --- Breadcrumbs Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14 mb-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#1447E6] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900">Account dashboard</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Control panel
            </h1>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#1447E6] border border-[#1447E6]/20">
            <ShieldCheck size={16} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Authenticated session</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar Modular Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 border border-slate-200 shadow-sm sticky top-32">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="h-20 w-20 bg-slate-900 text-white flex items-center justify-center text-2xl font-bold mb-6">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 capitalize">{user.name}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{user.email}</p>
              </div>

              <div className="space-y-1">
                {[
                  { id: 'profile', label: 'Identity settings', icon: User },
                  { id: 'orders', label: 'Procurement history', icon: Package },
                  { id: 'security', label: 'Access protocols', icon: Lock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all border ${activeTab === tab.id
                      ? 'bg-[#1447E6] text-white border-[#1447E6]'
                      : 'text-slate-600 bg-transparent border-transparent hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-all border border-transparent mt-6"
                >
                  <LogOut size={18} />
                  Terminate session
                </button>
              </div>
            </div>
          </div>

          {/* Main Stage Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-8 md:p-12 border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-12 pb-6 border-b border-slate-100">
                    <div className="h-12 w-12 bg-slate-50 text-[#1447E6] flex items-center justify-center border border-slate-200">
                      <User size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Personal identity</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Update your verified contact data</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display name</label>
                        <input
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone link</label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deployment address</label>
                      <textarea
                        rows="3" value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full p-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-14 px-10 bg-[#1447E6] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50"
                    >
                      {isUpdating ? "Syncing..." : "Apply changes"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-8 md:p-10 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-slate-50 text-[#1447E6] flex items-center justify-center border border-slate-200">
                        <ShoppingBag size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Orders</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{orders.length} active records</p>
                      </div>
                    </div>
                    <Link to="/shop" className="text-[10px] font-black text-[#1447E6] uppercase tracking-widest hover:underline">New acquisition</Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white p-20 text-center border border-slate-200">
                      <Package size={40} className="text-slate-300 mx-auto mb-6" />
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No procurement records found.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="bg-white border border-slate-200 group hover:border-[#1447E6]/50 transition-all">
                        <div className="p-8 flex items-center justify-between border-b border-slate-100">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ID #PTP-{order.id}</p>
                            <span className={`px-3 py-1 text-[9px] font-black uppercase border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-[#1447E6] border-blue-100'}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">${order.total_amount}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                          <Link to="/orders" className="flex items-center justify-center gap-2 text-[10px] font-black text-[#1447E6] uppercase tracking-widest hover:text-slate-900 transition-all">
                            Track shipment <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-8 md:p-12 border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-12 pb-6 border-b border-slate-100">
                    <div className="h-12 w-12 bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
                      <Lock size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Access protocols</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Manage your authentication layer</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New protocol code</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"} required
                          value={securityForm.password} onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full h-14 pl-6 pr-14 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1447E6]">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verify protocol</label>
                      <input
                        type={showPass ? "text" : "password"} required
                        value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                      />
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-14 px-10 bg-[#1447E6] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Update credentials"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
