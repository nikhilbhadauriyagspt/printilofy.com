import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order placed', icon: Clock, desc: 'We have received your order' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your items are being prepared' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Package has left our facility' },
    { key: 'out_for_delivery', label: 'Out for delivery', icon: MapPin, desc: 'Courier is on the way' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  const showSearchForm = !user && (!hasSearched || (hasSearched && orders.length === 0 && !loading));

  if (showSearchForm) {
    return (
      <div className="min-h-screen bg-slate-50 pt-40 pb-20 font-['Heebo'] px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-20 w-20 bg-white border border-slate-200 flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Package size={32} className="text-[#1447E6]" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Track your order</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-12">Login to see your full history or enter your guest email below.</p>

          <form onSubmit={handleGuestSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email" required
              placeholder="ENTER GUEST EMAIL"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="flex-1 h-14 px-6 bg-white border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-xs font-bold uppercase transition-all placeholder:text-slate-300 shadow-sm"
            />
            <button disabled={loading} className="h-14 px-10 bg-[#1447E6] text-white font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95 disabled:opacity-50">
              {loading ? 'Searching...' : 'Find order'}
            </button>
          </form>

          {hasSearched && orders.length === 0 && !loading && (
            <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6">No records found for this email address.</p>
          )}

          <div className="pt-8 border-t border-slate-200">
            <Link to="/login" className="text-[#1447E6] font-bold text-[10px] uppercase tracking-widest hover:underline">Or Login to your account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-['Heebo']">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* --- DASHBOARD HEADER --- */}
        <div className="mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <Link to="/" className="hover:text-[#1447E6] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-slate-900">Order management</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                Procurement history
              </h1>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 pb-1">{orders.length} total units tracked</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 bg-white border border-slate-200 shadow-sm">
            <Loader2 className="animate-spin h-10 w-10 text-[#1447E6] mb-4" />
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Retrieving records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-white border border-slate-200 shadow-sm">
            <Package size={48} className="text-slate-300 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900">No history detected</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 mb-10">You haven't initiated any hardware acquisitions yet.</p>
            <Link to="/shop" className="px-10 py-4 bg-[#1447E6] text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 shadow-lg transition-all">Begin shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                key={order.id}
                className="bg-white border border-slate-200 overflow-hidden group hover:shadow-xl hover:border-[#1447E6]/30 transition-all shadow-sm"
              >
                <div className="p-8 border-b border-slate-100 flex flex-wrap items-center justify-between gap-8 bg-slate-50/50">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 bg-white border border-slate-200 text-[#1447E6] flex items-center justify-center shadow-sm">
                      <Package size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Record #PTP-{order.id}</p>
                      <h3 className="text-sm font-bold text-slate-900">System acquisition</h3>
                    </div>
                  </div>

                  <div className="flex gap-12">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Calendar size={12} /> Stamp
                      </p>
                      <p className="text-sm font-bold text-slate-900">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <CreditCard size={12} /> Protocol
                      </p>
                      <p className="text-sm font-bold text-slate-900 uppercase">{order.payment_method}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-[#1447E6]/5 text-[#1447E6] border-[#1447E6]/10'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Valuation</p>
                    <p className="text-2xl font-bold text-slate-900">${order.total_amount}</p>
                  </div>
                </div>

                <div className="p-8 bg-white">
                  <div className="space-y-4">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-slate-50 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-900">
                            {item.quantity}x
                          </div>
                          <p className="text-[13px] font-bold text-slate-700 capitalize line-clamp-1 max-w-[400px]">{item.product_name}</p>
                        </div>
                        <p className="text-[13px] font-bold text-slate-900">${item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Truck size={14} /> Link to: <span className="text-slate-900 ml-1">{order.address}, {order.city}</span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 text-[10px] font-black text-[#1447E6] uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      Track live <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white z-[1001] shadow-2xl p-12 border border-slate-200 font-['Heebo']"
              >
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Track session</h2>
                    <p className="text-[10px] font-black text-[#1447E6] uppercase tracking-[0.3em] mt-1">#PTP-{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 bg-slate-50 flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-all border border-slate-200">
                    <X size={20} />
                  </button>
                </div>

                <div className="relative space-y-10">
                  <div className="absolute left-6 top-2 bottom-2 w-[2px] bg-slate-100" />

                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const isActive = selectedOrder.status === step.key;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="relative flex gap-10 group">
                        <div className={`h-12 w-12 flex items-center justify-center z-10 transition-all duration-500 border ${isCompleted ? 'bg-slate-900 border-transparent text-white shadow-lg shadow-slate-900/10' : 'bg-white border-slate-200 text-slate-300'}`}>
                          <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
                        </div>

                        <div className="flex-1 py-1">
                          <h4 className={`text-sm font-bold uppercase tracking-widest ${isCompleted ? 'text-slate-900' : 'text-slate-400/50'}`}>
                            {step.label}
                          </h4>
                          <p className={`text-[11px] font-medium mt-1 leading-relaxed ${isCompleted ? 'text-slate-500' : 'text-slate-400/50'}`}>
                            {step.desc}
                          </p>
                          {isActive && (
                            <motion.div
                              layoutId="status-pill"
                              className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-blue-50 text-[#1447E6] text-[9px] font-black uppercase tracking-widest border border-blue-100 shadow-sm"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-[#1447E6] animate-ping" /> Synchronized
                            </motion.div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-16 pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fleet carrier</p>
                      <p className="text-[13px] font-bold text-slate-900">Printilofy Logistics</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected arrival</p>
                      <p className="text-[13px] font-bold text-slate-900">2-3 Business Days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
