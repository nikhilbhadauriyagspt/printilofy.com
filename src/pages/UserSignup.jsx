import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, CheckCircle2, ChevronLeft, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-['Heebo'] px-6 py-20">

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white border border-slate-200 overflow-hidden shadow-sm">

        {/* Left Side: Professional Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 md:p-16 bg-slate-900 text-white relative overflow-hidden border-r border-slate-800">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-16 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back to store</span>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#1447E6]">
                <Sparkles size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">New member</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
                Begin your <br /> personal hub
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mt-4">
                Register to unlock exclusive corporate configurations and priority hardware support.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-20">
            <div className="p-5 bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="h-12 w-12 bg-white/10 flex items-center justify-center text-[#1447E6]">
                <CheckCircle2 size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-widest">Instant activation</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enterprise ecosystem ready</p>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1447E6] opacity-10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        {/* Right Side: Form Stage */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Create account</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Register your professional identity</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-widest border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1447E6] transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile contact</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1447E6] transition-colors" size={18} />
                  <input
                    required
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1447E6] transition-colors" size={18} />
                <input
                  required
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security phrase</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1447E6] transition-colors" size={18} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#1447E6] outline-none text-[13px] font-bold text-slate-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1447E6] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                disabled={loading}
                className="w-full h-14 bg-[#1447E6] text-white flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-70 group"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Create account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Already verified?{' '}
              <Link to="/login" className="text-[#1447E6] hover:underline ml-1">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
