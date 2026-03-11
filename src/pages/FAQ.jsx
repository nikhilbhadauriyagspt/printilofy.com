import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, HelpCircle, Search, Mail, MapPin, Plus, Minus, ChevronRight, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on Printilofy?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on Printilofy secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We specialize in genuine HP hardware, but we also sell laptops, printers, and accessories from other trusted manufacturers." },
      { q: "How can I choose the right hardware?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my hardware arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-[#f5f5f5] min-h-screen font-['Heebo'] text-slate-900 pb-20">
      <SEO
        title="Knowledge Base | Technical FAQ"
        description="Find detailed answers to common questions about orders, genuine hardware, shipping, and official HP support."
      />

      {/* --- Page Header --- */}
      <div className="bg-white border-b border-slate-200 py-10 md:py-14 mb-10 shadow-sm">
        <div className="w-full px-4 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#4B4DED] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-900 uppercase">Knowledge Base</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">
              Hardware Help Center
            </h1>
            <div className="w-24 h-[3px] bg-[#4B4DED] mt-6"></div>
          </div>

          <div className="w-full max-w-lg relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4B4DED] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search technical documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 pr-8 bg-slate-50 border border-slate-100 rounded-full focus:bg-white focus:border-[#4B4DED] outline-none text-[14px] font-bold text-slate-900 transition-all placeholder:text-slate-300 placeholder:font-medium shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-4 lg:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-xl shadow-blue-900/5">
              <div className="flex items-center gap-3 mb-8 ml-2">
                 <div className="w-1.5 h-6 bg-[#4B4DED] rounded-full"></div>
                 <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] block ">Documentation Topics</span>
              </div>
              <div className="space-y-2">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(cat.category);
                      setOpenIndex(0);
                    }}
                    className={`w-full text-left px-6 py-4 text-[13px] font-black uppercase tracking-tight transition-all rounded-2xl border ${activeCategory === cat.category
                      ? 'bg-[#4B4DED] text-white border-[#4B4DED] shadow-lg shadow-blue-900/20 scale-[1.02]'
                      : 'text-slate-500 bg-transparent border-transparent hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Support CTA */}
            <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group shadow-2xl border border-slate-800">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Sparkles className="text-blue-400" size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Unit</span>
                </div>
                <h4 className="text-2xl font-black leading-tight uppercase tracking-tight">Need Personal <br/> <span className="text-blue-500">Support?</span></h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">Our certified specialists are ready to help with your technical inquiries.</p>
                <Link to="/contact" className="inline-flex items-center gap-4 bg-white text-slate-900 px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#4B4DED] hover:text-white transition-all group shadow-lg">
                  Talk to Agent <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#4B4DED]/20 blur-[100px] rounded-full" />
            </div>
          </div>

          {/* FAQ Accordion Stage */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-[2.5px] bg-[#4B4DED]" />
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                      {activeCategory}
                    </h3>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-emerald-600">
                     <MessageCircle size={18} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Live Updates</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden ${openIndex === idx ? 'border-[#4B4DED] shadow-2xl shadow-blue-900/10' : 'border-slate-100 hover:border-slate-300'
                        }`}
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                        className="w-full px-10 py-10 flex items-center justify-between text-left group"
                      >
                        <span className={`text-lg font-black leading-snug pr-10 transition-colors uppercase tracking-tight ${openIndex === idx ? 'text-[#4B4DED]' : 'text-slate-900 group-hover:text-[#4B4DED]'
                          }`}>
                          {faq.q}
                        </span>
                        <div className={`h-12 w-12 flex items-center justify-center shrink-0 transition-all duration-500 rounded-2xl border ${openIndex === idx ? 'bg-[#4B4DED] text-white border-[#4B4DED] rotate-180' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-[#4B4DED] group-hover:text-white group-hover:border-[#4B4DED]'
                          }`}>
                          {openIndex === idx ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {openIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <div className="px-10 pb-10">
                              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative overflow-hidden">
                                <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed relative z-10">
                                  {faq.a}
                                </p>
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                   <HelpCircle size={80} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div className="py-24 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <Search size={64} className="text-slate-200 mx-auto mb-8" />
                    <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">No Documentation Found</h4>
                    <p className="text-slate-500 font-medium mt-2">Try broader keywords for better help results.</p>
                    <button onClick={() => setSearchQuery('')} className="mt-10 px-10 py-4 bg-[#4B4DED] text-white font-black text-[11px] uppercase tracking-widest rounded-full shadow-lg">Clear Search</button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
