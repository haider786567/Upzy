import React, { useEffect, useRef } from 'react';
import Sidebar from '../../dashboard/components/Sidebar';
import Navbar from '../../../components/Navbar';
import { useAnalytics } from '../hooks/useAnalytics';
import gsap from 'gsap';
import { 
  AlertCircle, 
  Zap,
  ShieldCheck,
  ZapOff
} from 'lucide-react';

// Sub-components from components folder
import MetricCard from '../components/MetricCard';
import LatencyChart from '../components/LatencyChart';
import AvailabilityChart from '../components/AvailabilityChart';
import AIInsightCard from '../components/AIInsightCard';

const AnalyticsPage = () => {
  const { data, loading } = useAnalytics();
  const pageRef = useRef(null);

  useEffect(() => {
    if (!loading && data) {
      const ctx = gsap.context(() => {
        gsap.set(".stat-card, .chart-container, .ai-card", { opacity: 0, y: 30 });
        
        gsap.to(".stat-card", {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2
        });
        
        gsap.to(".chart-container", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.6
        });

        gsap.to(".ai-card", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1
        });
      }, pageRef);
      return () => ctx.revert();
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="flex h-screen bg-cream items-center justify-center">
        <div className="w-16 h-16 border-4 border-rose border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const metrics = [
    { label: 'Uptime', value: `${data.metrics.uptime}%`, icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { label: 'Avg Latency', value: `${data.metrics.avgLatency}ms`, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/20' },
    { label: 'Failure Rate', value: `${data.metrics.failureRate}%`, icon: ZapOff, color: 'text-rose', bg: 'bg-rose/20' },
    { label: 'Incidents', value: data.metrics.totalIncidents, icon: AlertCircle, color: 'text-primary', bg: 'bg-primary/20' },
  ];

  return (
    <div ref={pageRef} className="flex h-screen bg-cream overflow-hidden font-['Inter',sans-serif]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background depth effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10 hide-scrollbar">
          <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Header section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-dark tracking-tight flex items-center gap-4">
                Analytics
                <span className="text-xs font-bold px-4 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 uppercase tracking-widest backdrop-blur-sm">
                  Insights
                </span>
              </h1>
              <p className="text-primary/60 font-semibold">Detailed performance metrics and AI-driven stability analysis.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((stat, i) => (
                <MetricCard key={i} {...stat} />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <LatencyChart data={data.latencyHistory} />
              <AvailabilityChart data={data.uptimeHistory} />
            </div>

            {/* AI Insights Section */}
            <AIInsightCard insights={data.aiInsights} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
