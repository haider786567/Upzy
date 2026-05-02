import React from 'react';

const MonitorCard = ({ monitor }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'text-emerald-400 bg-emerald-400/10';
      case 'down': return 'text-rose-400 bg-rose-400/10';
      case 'degraded': return 'text-amber-400 bg-amber-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const getStatusDot = (status) => {
    switch (status.toLowerCase()) {
      case 'operational': return 'bg-emerald-400';
      case 'down': return 'bg-rose-400';
      case 'degraded': return 'bg-amber-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="monitor-card bg-white/60 p-6 rounded-3xl border border-rose/40 hover:shadow-[0_30px_60px_-15px_rgba(43,18,76,0.1)] transition-all duration-500 group opacity-0 shadow-sm relative overflow-hidden">
      {/* Decorative inner glow - subtle cream/rose */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cream/50 rounded-full blur-3xl pointer-events-none transition-all duration-700"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-dark font-bold text-lg tracking-tight group-hover:text-secondary transition-colors">{monitor.name}</h3>
          <p className="text-accent/60 text-[11px] font-medium truncate max-w-[200px] mt-0.5">{monitor.url}</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-white shadow-lg shadow-secondary/20 border border-white/20`}>
          <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(monitor.status)} shadow-[0_0_8px_rgba(255,255,255,0.4)]`} />
          {monitor.status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8 relative z-10 bg-cream/30 p-4 rounded-2xl border border-rose/20">
        <div className="text-center">
          <p className="text-[9px] font-bold text-accent/50 uppercase tracking-[0.15em] mb-1.5">Response</p>
          <p className="text-xs font-bold text-dark">{monitor.response}</p>
        </div>
        <div className="text-center border-x border-rose/20">
          <p className="text-[9px] font-bold text-accent/50 uppercase tracking-[0.15em] mb-1.5">Uptime</p>
          <p className="text-xs font-bold text-dark">{monitor.uptime}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-bold text-accent/50 uppercase tracking-[0.15em] mb-1.5">Interval</p>
          <p className="text-xs font-bold text-dark">{monitor.interval}</p>
        </div>
      </div>

      {/* History Bars - Purple and Rose shades */}
      <div className="flex items-end gap-[3px] h-10 w-full relative z-10 px-1">
        {monitor.history.map((h, i) => {
          const isHigh = h > 60;
          return (
            <div 
              key={i} 
              className={`flex-1 rounded-full transition-all duration-500 hover:scale-y-150 cursor-pointer ${
                isHigh ? 'bg-secondary/60 hover:bg-secondary' : 'bg-rose/80 hover:bg-rose'
              }`}
              style={{ height: `${Math.max(30, h)}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MonitorCard;
