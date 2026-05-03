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
  Globe 
} from 'lucide-react';
import useDashboard from '../hooks/useDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics } from '../state/dashboardSlice';

const DashboardPage = () => {
  const pageRef = useRef(null);
  const dispatch = useDispatch();
  const { monitors, stats, isLoading, isError, message } = useDashboard();
  const { user } = useSelector((state) => state.auth);

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
  }, [isLoading]); // Re-run animation when loading finishes

  const { selectedMonitorAnalytics } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (monitors.length > 0 && !selectedMonitorAnalytics && !isLoading) {
      dispatch(fetchAnalytics({ monitorId: monitors[0]._id, range: '24h' }));
    }
  }, [monitors, dispatch, selectedMonitorAnalytics, isLoading]);

  const handleRangeChange = (range) => {
    if (monitors.length > 0) {
      dispatch(fetchAnalytics({ monitorId: monitors[0]._id, range }));
    }
  };

  const statsDisplay = [
    { label: 'System Uptime', value: stats.uptime, change: '+0.00%', positive: true, icon: Activity, color: '#522B5B' },
    { label: 'Active Monitors', value: stats.activeMonitors.toString(), change: `${stats.totalMonitors} Total`, positive: true, icon: Globe, color: '#2B124C' },
    { label: 'Open Incidents', value: stats.openIncidents.toString().padStart(2, '0'), change: 'Live', positive: true, icon: ShieldAlert, color: '#854F6C' },
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
              <p className="text-accent font-medium">Welcome back, {user?.username || 'User'}! Here's what's happening today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statsDisplay.map((stat, i) => (
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
                  <p className="text-3xl font-bold text-dark tabular-nums tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 chart-section bg-linear-to-br from-dark to-deep p-8 rounded-4xl shadow-2xl text-cream min-h-[400px] relative overflow-hidden group/chart opacity-0 border border-white/5">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(#DFB6B2 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h2 className="text-xl font-bold">Performance: {monitors[0]?.name || 'No Monitor'}</h2>
                      <p className="text-rose text-sm font-medium opacity-80">Response time and availability</p>
                    </div>
                    <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10">
                      {['24h', '7d', '30d'].map(t => (
                        <button 
                          key={t} 
                          onClick={() => handleRangeChange(t)}
                          className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${selectedMonitorAnalytics?.range === t || (!selectedMonitorAnalytics && t === '24h') ? 'bg-cream text-primary shadow-lg' : 'hover:bg-white/5 text-rose'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Real Chart Data */}
                  <div className="flex-1 flex items-end gap-3 w-full pt-10 min-h-[220px]">
                    {selectedMonitorAnalytics?.graph?.length > 0 ? (
                      selectedMonitorAnalytics.graph.slice(-12).map((data, i) => {
                        const h = (data.avgResponseTime / 1000) * 100;
                        return (
                          <div key={i} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-36 p-4 bg-dark rounded-2xl shadow-2xl opacity-0 group-hover/bar:opacity-100 translate-y-2 group-hover/bar:translate-y-0 transition-all duration-300 pointer-events-none z-50 border border-white/10 backdrop-blur-md">
                              <p className="text-xs font-bold text-rose mb-3 border-b border-white/10 pb-2">{new Date(data.date).toLocaleTimeString()}</p>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">Resp Time</span>
                                  <span className="text-xs font-bold text-cream">{data.avgResponseTime}ms</span>
                                </div>
                              </div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-dark"></div>
                            </div>
                            <div 
                              className="w-full bg-linear-to-t from-cream/5 to-cream/90 rounded-t-xl transition-all duration-500 hover:from-cream/20 hover:to-white cursor-pointer" 
                              style={{ height: `${Math.min(h + 10, 100)}%` }}
                            ></div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-rose opacity-50 font-bold uppercase tracking-widest w-full">
                        {isLoading ? 'Loading Analytics...' : 'No Data Available'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="chart-section bg-linear-to-br from-dark to-deep border border-white/5 p-8 rounded-4xl shadow-xl space-y-6 opacity-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(#DFB6B2 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
                <h2 className="text-xl font-bold text-cream relative z-10">Recent Alerts</h2>
                <div className="space-y-4 relative z-10">
                  {monitors.filter(m => m.status === 'DOWN').length > 0 ? (
                    monitors.filter(m => m.status === 'DOWN').map((m, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10 group">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <ShieldAlert size={20} className="text-red-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-cream">{m.name} is DOWN</p>
                          <p className="text-xs text-rose font-medium truncate max-w-[120px] opacity-70">{m.url}</p>
                        </div>
                        <span className="text-[10px] font-bold text-rose uppercase shrink-0 opacity-60">Just now</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-cream/50 text-sm font-medium">No active incidents</p>
                    </div>
                  )}
                </div>
                <button className="w-full py-4 rounded-2xl bg-cream text-primary font-bold text-sm hover:bg-white transition-all active:scale-[0.98] relative z-10 shadow-lg shadow-black/20">
                  View All Incidents
                </button>
              </div>
            </div>

            {/* Real-time Status Table */}
            <RealTimeStatus monitors={monitors} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
