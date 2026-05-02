import React, { useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../../../components/Navbar';
import RealTimeStatus from '../components/RealTimeStatus';
import gsap from 'gsap';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  ShieldAlert, 
  Cpu, 
  Globe 
} from 'lucide-react';

const DashboardPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible before animating
      gsap.set(".stat-card, .chart-section, .animate-item", { opacity: 0, y: 20 });
      
      gsap.to(".stat-card", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.to(".chart-section, .animate-item", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'System Uptime', value: '99.98%', change: '+0.02%', positive: true, icon: Activity, color: '#522B5B' },
    { label: 'Active Monitors', value: '24', change: '8.4%', positive: true, icon: Globe, color: '#2B124C' },
    { label: 'Open Incidents', value: '02', change: '-12%', positive: true, icon: ShieldAlert, color: '#854F6C' },
    { label: 'CPU Usage', value: '14%', change: '+3.2%', positive: false, icon: Cpu, color: '#190019' },
  ];

  return (
    <div ref={pageRef} className="flex h-screen bg-cream overflow-hidden font-['Inter',sans-serif]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background blobs for depth */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10 hide-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="space-y-1">
              <h1 className="text-3xl font-bold text-[#190019] tracking-tight">Dashboard Overview</h1>
              <p className="text-accent font-medium">Welcome back, here's what's happening with your systems today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card bg-white border border-rose/30 p-6 rounded-3xl shadow-[0_10px_40px_-15px_rgba(43,18,76,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(43,18,76,0.2)] transition-shadow duration-300 group cursor-default opacity-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-cream/50 group-hover:bg-cream transition-colors duration-300">
                      <stat.icon size={22} style={{ color: stat.color }} />
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-rose/20 text-accent' : 'bg-accent/10 text-accent'}`}>
                      {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-accent text-xs font-bold mb-1 uppercase tracking-widest">{stat.label}</h3>
                  <p className="text-3xl font-bold text-[#190019] tabular-nums tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 chart-section bg-linear-to-br from-dark to-deep p-8 rounded-[2.5rem] shadow-2xl text-cream min-h-[400px] relative overflow-hidden group/chart opacity-0 border border-white/5">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(#DFB6B2 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h2 className="text-xl font-bold">Traffic & Performance</h2>
                      <p className="text-rose text-sm font-medium opacity-80">Global activity across all endpoints</p>
                    </div>
                    <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
                      {['24h', '7d', '30d'].map(t => (
                        <button key={t} className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${t === '24h' ? 'bg-cream text-primary shadow-lg' : 'hover:bg-white/5 text-rose'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Mock Chart with Tooltips */}
                  <div className="flex-1 flex items-end gap-3 w-full pt-10 min-h-[220px]">
                    {[40, 70, 45, 90, 65, 85, 50, 75, 40, 95, 60, 80].map((h, i) => {
                      const latency = Math.floor(Math.random() * 200) + 100;
                      const p95 = Math.floor(latency * 1.5);
                      const time = `${10 + i}:00`;
                      
                      return (
                        <div key={i} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-36 p-4 bg-[#190019] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 group-hover/bar:opacity-100 translate-y-2 group-hover/bar:translate-y-0 transition-all duration-300 pointer-events-none z-50 border border-white/10 backdrop-blur-md">
                            <p className="text-xs font-bold text-rose mb-3 border-b border-white/10 pb-2">{time}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">p95</span>
                                <span className="text-xs font-bold text-cream">{p95}ms</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">latency</span>
                                <span className="text-xs font-bold text-rose">{latency}ms</span>
                              </div>
                            </div>
                            {/* Tooltip Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#190019]"></div>
                          </div>

                          {/* Bar */}
                          <div 
                            className="w-full bg-linear-to-t from-cream/5 to-cream/90 rounded-t-xl transition-all duration-500 hover:from-cream/20 hover:to-white cursor-pointer" 
                            style={{ height: `${h}%` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="chart-section bg-linear-to-br from-dark to-deep border border-white/5 p-8 rounded-[2.5rem] shadow-xl space-y-6 opacity-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(#DFB6B2 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
                <h2 className="text-xl font-bold text-cream relative z-10">Recent Alerts</h2>
                <div className="space-y-4 relative z-10">
                  {[
                    { type: 'API Timeout', target: '/v1/auth/login', time: '2m ago' },
                    { type: 'High Latency', target: 'Payment Gateway', time: '5m ago' },
                    { type: 'Memory Peak', target: 'Worker-04', time: '12m ago' },
                    { type: 'SSL Expiry', target: 'api.upzy.io', time: '1h ago' },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <ShieldAlert size={20} className="text-rose" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-cream">{alert.type}</p>
                        <p className="text-xs text-rose font-medium truncate max-w-[120px] opacity-70">{alert.target}</p>
                      </div>
                      <span className="text-[10px] font-bold text-rose uppercase shrink-0 opacity-60">{alert.time}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 rounded-2xl bg-cream text-primary font-bold text-sm hover:bg-white transition-all active:scale-[0.98] relative z-10 shadow-lg shadow-black/20">
                  View All Incidents
                </button>
              </div>
            </div>

            {/* Real-time Status Table */}
            <RealTimeStatus />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
