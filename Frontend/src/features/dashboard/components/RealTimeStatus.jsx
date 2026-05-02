import React from 'react';
import { MoreHorizontal, ChevronRight } from 'lucide-react';

const RealTimeStatus = () => {
  const monitors = [
    { name: 'Marketing Site', url: 'https://acme.com', status: 'Operational', response: '142ms', uptime: '99.98%', lastCheck: '2s ago' },
    { name: 'API Gateway', url: 'https://api.acme.com/v1/health', status: 'Operational', response: '89ms', uptime: '99.99%', lastCheck: '4s ago' },
    { name: 'Checkout Service', url: 'https://pay.acme.com', status: 'Down', response: '—', uptime: '97.42%', lastCheck: '12s ago' },
    { name: 'Auth Service', url: 'https://auth.acme.com', status: 'Operational', response: '211ms', uptime: '99.91%', lastCheck: '6s ago' },
    { name: 'Docs', url: 'https://docs.acme.com', status: 'Degraded', response: '824ms', uptime: '99.72%', lastCheck: '9s ago' },
    { name: 'Status Page', url: 'https://status.acme.com', status: 'Operational', response: '67ms', uptime: '100%', lastCheck: '1s ago' },
    { name: 'Webhook Receiver', url: 'https://hooks.acme.com', status: 'Operational', response: '178ms', uptime: '99.85%', lastCheck: '8s ago' },
  ];

  const getStatusStyle = (status) => {
    return 'bg-cream text-primary border-white/20';
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Operational': return 'bg-green-500';
      case 'Down': return 'bg-red-500';
      case 'Degraded': return 'bg-yellow-500';
      default: return 'bg-primary/50';
    }
  };

  return (
    <div className="bg-linear-to-br from-dark to-deep rounded-4xl shadow-2xl overflow-hidden animate-item border border-white/5 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(#DFB6B2 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
      
      <div className="p-8 border-b border-white/5 flex justify-between items-center relative z-10">
        <div>
          <h2 className="text-xl font-bold text-cream">Real-time status</h2>
          <p className="text-rose text-sm font-medium mt-1 opacity-80">Live across {monitors.length} monitors</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-bold text-cream hover:text-white transition-colors">
          View all <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-5 text-[10px] font-bold text-rose uppercase tracking-[0.2em]">Website</th>
              <th className="px-8 py-5 text-[10px] font-bold text-rose uppercase tracking-[0.2em]">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-rose uppercase tracking-[0.2em]">Response</th>
              <th className="px-8 py-5 text-[10px] font-bold text-rose uppercase tracking-[0.2em]">Uptime</th>
              <th className="px-8 py-5 text-[10px] font-bold text-rose uppercase tracking-[0.2em]">Last Check</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {monitors.map((monitor, i) => (
              <tr key={i} className="hover:bg-white/3 transition-colors group cursor-default">
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-cream">{monitor.name}</p>
                  <p className="text-[10px] font-medium text-rose mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">{monitor.url}</p>
                </td>
                <td className="px-8 py-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusStyle(monitor.status)} shadow-lg shadow-black/20`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(monitor.status)} ${monitor.status === 'Operational' ? 'animate-pulse' : ''}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{monitor.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-cream tabular-nums">{monitor.response}</td>
                <td className="px-8 py-6 text-sm font-bold text-cream tabular-nums">{monitor.uptime}</td>
                <td className="px-8 py-6 text-[10px] font-bold text-rose uppercase tracking-widest">{monitor.lastCheck}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-rose hover:text-white hover:bg-white/10 rounded-xl transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RealTimeStatus;
