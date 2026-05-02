import React, { useEffect, useRef } from 'react';
import Sidebar from '../../dashboard/components/Sidebar';
import Navbar from '../../../components/Navbar';
import MonitorCard from '../components/MonitorCard';
import { useMonitors } from '../hooks/useMonitors';
import { Plus, Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';

const MonitorsPage = () => {
  const { monitors, loading } = useMonitors();
  const pageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".monitor-card", {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2
      });

      gsap.from(".header-animate", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <div ref={pageRef} className="flex h-screen bg-cream overflow-hidden font-['Inter',sans-serif]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background depth elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10 hide-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-end header-animate">
              <header className="space-y-1">
                <h1 className="text-4xl font-bold text-[#190019] tracking-tight">Monitors</h1>
                <p className="text-accent font-medium">Manage and observe every endpoint you care about.</p>
              </header>
              
              <Link 
                to="/dashboard/monitors/new"
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-secondary to-primary text-cream font-bold rounded-2xl hover:shadow-[0_10px_30px_-5px_rgba(43,18,76,0.3)] transition-all active:scale-95 shadow-lg"
              >
                <Plus size={20} />
                New monitor
              </Link>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/60 p-4 rounded-3xl border border-rose/30 backdrop-blur-md relative overflow-hidden group/controls shadow-sm">
              <div className="relative w-full md:w-md group/search">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/30 group-focus-within/search:text-secondary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search monitors, incidents..." 
                  className="w-full bg-white/50 border border-rose/50 rounded-2xl py-3 pl-12 pr-12 text-[#190019] text-sm focus:outline-none focus:border-secondary/50 focus:ring-4 focus:ring-secondary/5 transition-all placeholder:text-accent/20 shadow-inner"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md bg-cream/50 border border-rose/30 text-[10px] font-bold text-accent/40 tracking-tighter pointer-events-none">
                  ⌘ K
                </div>
              </div>
              <div className="flex gap-2 relative z-10">
                {['All', 'Operational', 'Down', 'Degraded'].map((filter) => (
                  <button 
                    key={filter} 
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                      filter === 'All' 
                        ? 'bg-linear-to-r from-secondary to-primary text-cream shadow-lg shadow-primary/20' 
                        : 'text-accent/60 hover:bg-white/50 hover:text-primary'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Monitors Grid */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monitors.map((monitor) => (
                  <MonitorCard key={monitor.id} monitor={monitor} />
                ))}
                
                {/* Add New Card Placeholder */}
                <Link 
                  to="/dashboard/monitors/new"
                  className="monitor-card flex flex-col items-center justify-center p-8 rounded-4xl bg-white/60 border-2 border-dashed border-rose/50 hover:border-secondary/50 hover:bg-white transition-all group opacity-0 cursor-pointer min-h-[250px] shadow-sm hover:shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cream/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-secondary/10 transition-all">
                    <Plus size={28} className="text-accent/40 group-hover:text-secondary" />
                  </div>
                  <p className="text-dark font-bold group-hover:text-secondary transition-colors">Add New Monitor</p>
                  <p className="text-accent/40 text-xs mt-1">Start tracking another endpoint</p>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MonitorsPage;
