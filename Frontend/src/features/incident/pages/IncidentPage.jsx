import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../../dashboard/components/Sidebar';
import Navbar from '../../../components/Navbar';
import { useIncidents } from '../hooks/useIncidents';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ChevronDown, 
  Terminal, 
  Sparkles,
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle2,
  Info,
  Plus,
  Minus
} from 'lucide-react';

const IncidentPage = () => {
  const { incidents, loading } = useIncidents();
  const [expandedId, setExpandedId] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".incident-header", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out"
      });
    }, pageRef);

    return () => ctx.revert();
  }, [loading]);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'failure':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-500',
          border: 'border-red-500/20',
          dot: 'bg-red-500',
          label: 'Failure'
        };
      case 'degraded':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-500',
          border: 'border-amber-500/20',
          dot: 'bg-amber-500',
          label: 'Degraded'
        };
      case 'recovered':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-500',
          border: 'border-emerald-500/20',
          dot: 'bg-emerald-500',
          label: 'Recovered'
        };
      default:
        return {
          bg: 'bg-slate-500/10',
          text: 'text-slate-500',
          border: 'border-slate-500/20',
          dot: 'bg-slate-500',
          label: 'Unknown'
        };
    }
  };

  return (
    <div ref={pageRef} className="flex h-screen bg-cream overflow-hidden font-['Inter',sans-serif]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background depth effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0" />

        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10 hide-scrollbar">
          <div className="max-w-5xl mx-auto space-y-10">
            {/* Header section */}
            <div className="incident-header space-y-2">
              <h1 className="text-4xl font-black text-dark tracking-tight flex items-center gap-4">
                Incidents
                <span className="text-xs font-bold px-4 py-1.5 bg-red-500/10 text-red-600 rounded-full border border-red-500/20 uppercase tracking-widest animate-pulse backdrop-blur-sm">
                  Live
                </span>
              </h1>
              <div className="flex items-center gap-3 text-accent font-semibold">
                <span className="flex items-center gap-1.5 text-red-500">
                  <AlertCircle size={18} /> 1 ongoing
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose/40"></span>
                <span className="flex items-center gap-1.5 opacity-70">
                  <CheckCircle2 size={18} /> 2 resolved in the last 24h
                </span>
              </div>
            </div>

            {/* Incidents List */}
            <div className="space-y-6 pb-20">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-rose border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : (
                incidents.map((incident) => {
                  const styles = getStatusStyles(incident.status);
                  const isExpanded = expandedId === incident.id;
                  
                  return (
                    <motion.div 
                      key={incident.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: incidents.indexOf(incident) * 0.1,
                        ease: "easeOut"
                      }}
                      className={`incident-card relative bg-dark bg-linear-to-br from-dark to-deep rounded-4xl shadow-2xl border border-white/10 overflow-hidden group transition-all duration-500 ${isExpanded ? 'ring-2 ring-rose/30 ring-offset-4 ring-offset-cream' : ''}`}
                    >
                      {/* Subtitle/Background patterns for depth */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(#DFB6B2 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }}></div>
                      
                      {/* Card Header - Clickable Area */}
                      <div 
                        onClick={() => toggleAccordion(incident.id)}
                        className="relative z-10 p-8 flex items-start justify-between cursor-pointer select-none"
                      >
                        <div className="flex gap-6">
                          <div className={`mt-1 w-12 h-12 rounded-2xl ${styles.bg} ${styles.border} flex items-center justify-center shrink-0 shadow-lg`}>
                            <div className={`w-3 h-3 rounded-full ${styles.dot} shadow-[0_0_15px_rgba(239,68,68,0.6)]`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h2 className="text-2xl font-bold text-cream tracking-tight group-hover:text-rose transition-colors">
                                {incident.service}
                              </h2>
                              <a 
                                href={incident.url} 
                                onClick={(e) => e.stopPropagation()}
                                className="text-rose/40 hover:text-rose transition-colors p-1"
                              >
                                <ExternalLink size={16} />
                              </a>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                              <span className={`${styles.text} font-bold uppercase tracking-widest text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border ${styles.border}`}>
                                {styles.label}
                              </span>
                              <span className="hidden sm:block text-rose/30">•</span>
                              <div className="flex items-center gap-1.5 text-rose/70">
                                <Clock size={14} className="text-rose/50" />
                                {incident.time}
                              </div>
                              <span className="hidden sm:block text-rose/30">•</span>
                              <div className="text-rose/70 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 font-bold">
                                Ongoing: <span className="text-rose">{incident.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`p-3 rounded-2xl border transition-all duration-300 transform ${isExpanded ? 'bg-cream text-primary border-cream rotate-180' : 'bg-white/5 text-rose border-white/10 group-hover:bg-white/10 group-hover:text-cream'}`}>
                          {isExpanded ? <Minus size={24} /> : <Plus size={24} />}
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div className="px-8 pb-8 space-y-8 border-t border-white/5 pt-8 mx-8">
                              {/* AI Analysis Block */}
                              {incident.aiAnalysis && (
                                <motion.div 
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="relative overflow-hidden rounded-4xl border border-accent/20 bg-accent/5 p-8 group/ai"
                                >
                                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover/ai:opacity-20 transition-opacity">
                                    <Sparkles size={120} className="text-rose" />
                                  </div>
                                  <div className="relative z-10 flex flex-col md:flex-row gap-8">
                                    <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-accent to-rose flex items-center justify-center shadow-xl shadow-accent/20 shrink-0">
                                      <Sparkles size={28} className="text-cream" />
                                    </div>
                                    <div className="space-y-5">
                                      <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-cream">AI Incident Analysis</h3>
                                        <span className="text-[10px] font-black px-2.5 py-1 bg-cream text-primary rounded-lg uppercase tracking-wider">Beta</span>
                                      </div>
                                      <p className="text-rose/80 text-base leading-relaxed font-medium max-w-2xl">
                                        {incident.aiAnalysis.summary}
                                      </p>
                                      <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                                        <span className="text-rose font-bold uppercase tracking-widest text-[10px] bg-rose/10 px-2 py-1 rounded">Recommended action</span>
                                        <span className="text-cream font-medium italic text-lg decoration-rose/30 decoration-2 underline-offset-8">
                                          {incident.aiAnalysis.recommendation}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Logs Section */}
                              {incident.logs && (
                                <motion.div 
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="space-y-5"
                                >
                                  <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center gap-3">
                                      <Terminal size={18} className="text-rose/50" />
                                      <h3 className="text-xs font-bold text-rose/50 uppercase tracking-widest">Recent activity logs</h3>
                                    </div>
                                    <div className="text-[10px] font-bold text-rose/30 uppercase tracking-tighter bg-white/5 px-2 py-1 rounded">
                                      Real-time stream enabled
                                    </div>
                                  </div>
                                  <div className="bg-deep/80 backdrop-blur-md rounded-4xl border border-white/10 p-6 font-mono text-xs overflow-x-auto shadow-inner">
                                    <table className="w-full text-left border-separate border-spacing-y-2">
                                      <thead>
                                        <tr className="text-rose/30 text-[10px] uppercase tracking-widest">
                                          <th className="px-3 pb-2 font-black">Timestamp</th>
                                          <th className="px-3 pb-2 font-black">Method</th>
                                          <th className="px-3 pb-2 font-black">Endpoint</th>
                                          <th className="px-3 pb-2 font-black">Status</th>
                                          <th className="px-3 pb-2 font-black">Response message</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {incident.logs.map((log, i) => (
                                          <tr key={i} className="group/log hover:bg-white/5 transition-colors">
                                            <td className="py-3 px-3 text-rose/40 whitespace-nowrap">{log.time}</td>
                                            <td className="py-3 px-3">
                                              <span className="text-cream/70 font-bold bg-white/5 px-2 py-1 rounded">{log.method}</span>
                                            </td>
                                            <td className="py-3 px-3 text-rose font-medium">{log.path}</td>
                                            <td className="py-3 px-3">
                                              <span className={`px-2.5 py-1 rounded-lg font-black ${typeof log.status === 'number' ? 'text-red-400 bg-red-400/10 border border-red-400/20' : 'text-orange-400 bg-orange-400/10 border border-orange-400/20'}`}>
                                                {log.status}
                                              </span>
                                            </td>
                                            <td className="py-3 px-3 text-rose/60 italic">"{log.message}"</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer help */}
            <div className="flex items-center justify-center gap-6 py-10 opacity-30">
              <div className="h-px flex-1 bg-linear-to-r from-transparent to-dark/20"></div>
              <div className="flex items-center gap-3 text-xs font-black text-dark uppercase tracking-[0.2em]">
                <Info size={16} />
                Support Center
              </div>
              <div className="h-px flex-1 bg-linear-to-l from-transparent to-dark/20"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IncidentPage;
