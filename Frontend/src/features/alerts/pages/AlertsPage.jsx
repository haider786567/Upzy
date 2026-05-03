import React, { useRef } from 'react';
import Sidebar from '../../dashboard/components/Sidebar';
import Navbar from '../../../components/Navbar';
import { useAlerts } from '../hook/useAlerts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Info,
  RefreshCw,
  ShieldAlert
} from 'lucide-react';

const AlertsPage = () => {
  const { alerts, loading, refresh, resolveAlert } = useAlerts();
  const pageRef = useRef(null);

  const getStatusInfo = (type, resolved) => {
    if (resolved) return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: CheckCircle, label: 'Resolved' };
    if (type === 'DOWN') return { color: 'text-red-500', bg: 'bg-red-500/10', icon: ShieldAlert, label: 'Service Down' };
    return { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: AlertTriangle, label: 'Degraded' };
  };

  return (
    <div ref={pageRef} className="flex h-screen bg-cream overflow-hidden font-['Inter',sans-serif]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10 hide-scrollbar">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-dark tracking-tight flex items-center gap-4">
                  Alert Center
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </h1>
                <p className="text-accent font-semibold opacity-70">
                  Comprehensive history of all service interruptions and alerts.
                </p>
              </div>
              <button 
                onClick={refresh}
                className="p-3 rounded-2xl bg-white border border-rose/30 text-primary hover:bg-cream transition-all shadow-sm"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>

            <div className="space-y-4">
              {loading && alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-12 h-12 border-4 border-rose border-t-primary rounded-full animate-spin" />
                  <p className="text-accent font-bold animate-pulse">Syncing with backend...</p>
                </div>
              ) : alerts.length === 0 ? (
                <div className="bg-white border border-rose/20 rounded-4xl p-20 text-center space-y-4 shadow-xl shadow-black/5">
                  <div className="w-20 h-20 bg-cream rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-dark">System All Clear</h2>
                  <p className="text-accent max-w-sm mx-auto">No alerts or incidents found in your history. Everything is running smoothly.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  <AnimatePresence mode="popLayout">
                    {alerts.map((alert) => {
                      const status = getStatusInfo(alert.type, alert.resolved);
                      return (
                        <motion.div
                          key={alert._id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white border border-rose/20 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
                        >
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${status.bg.replace('/10', '')}`} />
                          
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div className="flex gap-5">
                              <div className={`w-14 h-14 rounded-2xl ${status.bg} flex items-center justify-center shrink-0`}>
                                <status.icon size={28} className={status.color} />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">
                                    {alert.monitorName}
                                  </h3>
                                  <a href={alert.monitorUrl} target="_blank" rel="noreferrer" className="text-accent/30 hover:text-primary">
                                    <ExternalLink size={14} />
                                  </a>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                                  <span className={status.color}>{status.label}</span>
                                  <span className="text-rose/30">•</span>
                                  <span className="text-accent/60 flex items-center gap-1">
                                    <Clock size={12} /> {new Date(alert.startTime).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {!alert.resolved && (
                                <button 
                                  onClick={() => resolveAlert(alert._id)}
                                  className="px-6 py-2.5 rounded-xl bg-primary text-cream text-xs font-bold hover:bg-dark transition-all active:scale-95 shadow-lg shadow-primary/10"
                                >
                                  Mark Resolved
                                </button>
                              )}
                              <div className="p-2 rounded-xl bg-cream/50 text-accent group-hover:bg-primary group-hover:text-cream transition-all">
                                <ChevronRight size={20} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-6 py-10 opacity-30">
              <div className="h-px flex-1 bg-linear-to-r from-transparent to-dark/20" />
              <div className="flex items-center gap-3 text-xs font-black text-dark uppercase tracking-[0.2em]">
                <Info size={16} />
                Alert Retention: 30 Days
              </div>
              <div className="h-px flex-1 bg-linear-to-l from-transparent to-dark/20" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlertsPage;
