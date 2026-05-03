import { useState, useEffect, useCallback } from "react";
import {
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlinePlay,
  HiOutlinePause,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import {
  BsThreeDotsVertical,
  BsCheckCircle,
  BsExclamationTriangle,
  BsClock,
} from "react-icons/bs";
import { AdminMonitorProvider } from "../state/adminMonitorStore";
import { useAdminMonitors } from "../hooks/useAdminMonitors";

const statusStyles = {
  up: {
    label: "Online",
    color: "#065f46",
    bg: "#d1fae5",
    dot: "#10b981",
    icon: <BsCheckCircle className="text-xs" />,
  },
  down: {
    label: "Down",
    color: "#9f1239",
    bg: "#ffe4e6",
    dot: "#f43f5e",
    icon: <BsExclamationTriangle className="text-xs" />,
  },
  slow: {
    label: "Issues",
    color: "#9a3412",
    bg: "#ffedd5",
    dot: "#f97316",
    icon: <BsClock className="text-xs" />,
  },
};

const mapStatus = (backendStatus) => {
  switch (backendStatus?.toUpperCase()) {
    case 'UP': return 'up';
    case 'DOWN': return 'down';
    case 'DEGRADED':
    case 'UNKNOWN':
    default: return 'slow';
  }
};

const monitorTypes = ["GET", "POST"];
const intervals = [
  { label: "5 min", value: 5 },
  { label: "10 min", value: 10 },
  { label: "30 min", value: 30 },
  { label: "1 hour", value: 60 },
];

const MonitorsContent = () => {
  const { 
    monitors, 
    loading, 
    refreshMonitors, 
    createMonitor, 
    deleteMonitor,
    runMonitorNow,
    toggleMonitor 
  } = useAdminMonitors();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMonitor, setNewMonitor] = useState({
    name: "",
    url: "",
    method: "GET",
    interval: "5",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenuId !== null && !event.target.closest(".monitor-menu")) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeMenuId]);

  const handleAddMonitor = async () => {
    if (!newMonitor.name.trim() || !newMonitor.url.trim()) return;
    const success = await createMonitor({
      ...newMonitor,
      interval: parseInt(newMonitor.interval)
    });
    if (success) {
      setNewMonitor({ name: "", url: "", method: "GET", interval: "5" });
      setShowAddModal(false);
    }
  };

  const filteredList = monitors.filter((monitor) =>
    monitor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    monitor.url?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineCount = filteredList.filter((m) => mapStatus(m.status) === "up").length;
  const issuesCount = filteredList.filter((m) => mapStatus(m.status) !== "up").length;
  const healthPercentage = filteredList.length > 0 ? Math.round((onlineCount / filteredList.length) * 100) : 0;

  const StatCard = ({
    title,
    value,
    subtext,
    valueColor = "text-[#1a0e08]",
    icon,
  }) => (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-[#1a0e08]/8 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-[#1a0e08]/50 uppercase tracking-wider">
          {title}
        </p>
        <div className="text-[#1a0e08]/30">{icon}</div>
      </div>
      <p className={`text-2xl sm:text-3xl font-bold ${valueColor}`}>{value}</p>
      {subtext && <p className="text-xs text-[#1a0e08]/50 mt-1">{subtext}</p>}
    </div>
  );

  const MonitorMobileCard = ({ monitor, style }) => {
    const isMenuOpen = activeMenuId === monitor._id;

    return (
      <div className={`bg-white/80 rounded-2xl border border-[#1a0e08]/8 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow ${!monitor.isActive ? 'opacity-60 grayscale-[0.5]' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${!monitor.isActive ? 'bg-gray-400' : ''}`}
              style={monitor.isActive ? { backgroundColor: style.dot } : {}}
            />
            <div className="truncate">
              <span className="font-semibold text-[#1a0e08] block text-sm sm:text-base truncate">
                {monitor.name}
              </span>
              <span className="text-[10px] text-[#1a0e08]/40 block truncate">{monitor.url}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={monitor.isActive ? { backgroundColor: style.bg, color: style.color } : { backgroundColor: '#f1f5f9', color: '#64748b' }}
            >
              {monitor.isActive ? style.icon : <HiOutlinePause className="text-[10px]" />}
              {monitor.isActive ? style.label : 'Paused'}
            </span>
            <div className="relative monitor-menu">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenuId(isMenuOpen ? null : monitor._id);
                }}
                className="p-1.5 rounded-full hover:bg-[#1a0e08]/5 transition-colors"
              >
                <BsThreeDotsVertical className="text-[#1a0e08]/40 text-sm" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-8 z-20 w-40 bg-white rounded-xl shadow-lg border border-[#1a0e08]/10 py-1">
                  <button
                    onClick={() => {
                      runMonitorNow(monitor._id);
                      setActiveMenuId(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[#1a0e08] hover:bg-[#1a0e08]/5 transition-colors flex items-center gap-2"
                  >
                    <HiOutlineLightningBolt className="text-amber-500" />
                    Run Now
                  </button>
                  <button
                    onClick={() => {
                      toggleMonitor(monitor._id);
                      setActiveMenuId(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-[#1a0e08] hover:bg-[#1a0e08]/5 transition-colors flex items-center gap-2"
                  >
                    {monitor.isActive ? <HiOutlinePause className="text-slate-500" /> : <HiOutlinePlay className="text-emerald-500" />}
                    {monitor.isActive ? 'Pause' : 'Resume'}
                  </button>
                  <div className="h-px bg-[#1a0e08]/5 my-1" />
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this monitor?')) {
                        deleteMonitor(monitor._id);
                      }
                      setActiveMenuId(null);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <HiOutlineTrash className="text-sm" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#1a0e08]/40 text-[10px] uppercase font-bold tracking-wider">Method</span>
            <span className="text-[#1a0e08]/70 font-semibold text-xs">
              {monitor.method}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#1a0e08]/40 text-[10px] uppercase font-bold tracking-wider">Interval</span>
            <span className="text-[#1a0e08]/70 text-xs">{monitor.interval} min</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8" style={{ backgroundColor: "#FAF9F6" }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a0e08]">
              Monitors
            </h1>
            <p className="text-[#1a0e08]/50 text-sm mt-0.5">
              Monitor your services in real-time
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshMonitors}
              className="p-3 rounded-xl bg-white/50 border border-[#1a0e08]/8 text-[#1a0e08]/50 hover:bg-white transition-colors cursor-pointer"
              disabled={loading}
            >
              <HiOutlineRefresh className={`text-xl ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a0e08] text-white text-sm font-bold hover:bg-[#1a0e08]/85 transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              <HiOutlinePlus className="text-lg" />
              New Monitor
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a0e08]/40 text-sm" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search monitors by name or URL..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/50 border border-[#1a0e08]/8 text-sm text-[#1a0e08] placeholder:text-[#1a0e08]/40 focus:outline-none focus:ring-2 focus:ring-[#1a0e08]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatCard
          title="Total"
          value={filteredList.length}
          subtext="Endpoints"
          icon={<div className="w-1 h-1" />}
        />
        <StatCard
          title="Online"
          value={onlineCount}
          subtext={`${healthPercentage}% healthy`}
          valueColor="text-emerald-700"
          icon={<BsCheckCircle className="text-emerald-400" />}
        />
        <StatCard
          title="Issues"
          value={issuesCount}
          subtext={issuesCount > 0 ? "Need attention" : "All good"}
          valueColor={issuesCount > 0 ? "text-rose-700" : "text-[#1a0e08]"}
          icon={
            <BsExclamationTriangle
              className={issuesCount > 0 ? "text-amber-500" : "text-[#1a0e08]/30"}
            />
          }
        />
      </div>

      {/* Monitor List Container */}
      <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-[#1a0e08]/8 overflow-hidden">
        {/* Desktop Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-white/20 border-b border-[#1a0e08]/8 text-xs font-semibold text-[#1a0e08]/50 uppercase tracking-wider">
          <div className="md:col-span-4 pl-2">Monitor</div>
          <div className="md:col-span-2">Method</div>
          <div className="md:col-span-2">Interval</div>
          <div className="md:col-span-2">Status</div>
          <div className="md:col-span-2 text-center">Actions</div>
        </div>

        {/* List Items */}
        <div>
          {loading && filteredList.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-[#1a0e08]/20 border-t-[#1a0e08] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#1a0e08]/40 font-medium">Scanning network endpoints...</p>
            </div>
          ) : (
            filteredList.map((monitor) => {
              const status = mapStatus(monitor.status);
              const style = statusStyles[status];
              return (
                <div key={monitor._id} className={!monitor.isActive ? 'opacity-60 grayscale-[0.3]' : ''}>
                  {/* Desktop Row */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-4 items-center border-b border-[#1a0e08]/5 hover:bg-white/30 transition-colors">
                    <div className="md:col-span-4 flex items-center gap-3 min-w-0 pl-2">
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${!monitor.isActive ? 'bg-slate-400' : ''}`}
                        style={monitor.isActive ? { backgroundColor: style.dot } : {}}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[#1a0e08] truncate text-sm">
                          {monitor.name}
                        </span>
                        <span className="text-[10px] text-[#1a0e08]/30 font-mono truncate">
                          {monitor.url}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-[10px] font-black bg-[#1a0e08]/5 px-2 py-0.5 rounded text-[#1a0e08]/50">
                        {monitor.method}
                      </span>
                    </div>
                    <div className="md:col-span-2 text-xs font-semibold text-[#1a0e08]/60">
                      Every {monitor.interval} min
                    </div>
                    <div className="md:col-span-2">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={monitor.isActive ? { backgroundColor: style.bg, color: style.color } : { backgroundColor: '#f1f5f9', color: '#64748b' }}
                      >
                        {monitor.isActive ? style.icon : <HiOutlinePause size={10} />}
                        {monitor.isActive ? style.label : 'Paused'}
                      </span>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => runMonitorNow(monitor._id)}
                        className="p-1.5 rounded-lg text-[#1a0e08]/30 hover:text-amber-500 hover:bg-amber-50 transition-all cursor-pointer"
                        title="Run Check Now"
                      >
                        <HiOutlineLightningBolt size={18} />
                      </button>
                      <button
                        onClick={() => toggleMonitor(monitor._id)}
                        className="p-1.5 rounded-lg text-[#1a0e08]/30 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                        title={monitor.isActive ? 'Pause' : 'Resume'}
                      >
                        {monitor.isActive ? <HiOutlinePause size={18} /> : <HiOutlinePlay size={18} />}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this monitor?')) {
                            deleteMonitor(monitor._id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-[#1a0e08]/30 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                        title="Delete Monitor"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="md:hidden p-3 pb-0">
                    <MonitorMobileCard monitor={monitor} style={style} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredList.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a0e08]/5 flex items-center justify-center">
              <HiOutlineSearch className="w-8 h-8 text-[#1a0e08]/30" />
            </div>
            <p className="text-[#1a0e08]/40 text-base font-medium">No monitors detected.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-sm text-[#1a0e08]/50 hover:text-[#1a0e08] underline transition-colors cursor-pointer"
              >
                Clear active search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Button - Mobile Only */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-16 h-16 rounded-full bg-[#1a0e08] text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-all active:scale-95 cursor-pointer z-40"
        >
          <HiOutlinePlus className="w-8 h-8" />
        </button>
      </div>

      {/* Add Monitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#1a0e08]/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[#1a0e08]/5">
              <div>
                <h2 className="text-xl font-bold text-[#1a0e08]">
                  New Monitor
                </h2>
                <p className="text-xs text-[#1a0e08]/40">Configure a new endpoint check</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full hover:bg-[#1a0e08]/5 transition-colors cursor-pointer"
              >
                <HiOutlineX className="text-xl text-[#1a0e08]/40" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a0e08]/40 mb-1.5">
                  Monitor Name
                </label>
                <input
                  type="text"
                  value={newMonitor.name}
                  onChange={(e) =>
                    setNewMonitor({ ...newMonitor, name: e.target.value })
                  }
                  placeholder="e.g. Production API"
                  className="w-full px-4 py-3 rounded-2xl border border-[#1a0e08]/10 focus:outline-none focus:ring-4 focus:ring-[#1a0e08]/5 text-sm font-medium transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a0e08]/40 mb-1.5">
                  Target URL
                </label>
                <input
                  type="text"
                  value={newMonitor.url}
                  onChange={(e) =>
                    setNewMonitor({ ...newMonitor, url: e.target.value })
                  }
                  placeholder="https://api.yoursite.com/health"
                  className="w-full px-4 py-3 rounded-2xl border border-[#1a0e08]/10 focus:outline-none focus:ring-4 focus:ring-[#1a0e08]/5 text-sm font-medium transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a0e08]/40 mb-1.5">
                    HTTP Method
                  </label>
                  <select
                    value={newMonitor.method}
                    onChange={(e) =>
                      setNewMonitor({ ...newMonitor, method: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-[#1a0e08]/10 focus:outline-none focus:ring-4 focus:ring-[#1a0e08]/5 text-sm font-bold bg-white cursor-pointer"
                  >
                    {monitorTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#1a0e08]/40 mb-1.5">
                    Frequency
                  </label>
                  <select
                    value={newMonitor.interval}
                    onChange={(e) =>
                      setNewMonitor({ ...newMonitor, interval: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border border-[#1a0e08]/10 focus:outline-none focus:ring-4 focus:ring-[#1a0e08]/5 text-sm font-bold bg-white cursor-pointer"
                  >
                    {intervals.map((int) => (
                      <option key={int.value} value={int.value}>
                        {int.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 bg-slate-50">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 rounded-2xl border border-[#1a0e08]/10 text-[#1a0e08]/50 hover:bg-white transition-all text-sm font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMonitor}
                disabled={!newMonitor.name.trim() || !newMonitor.url.trim()}
                className="flex-1 px-4 py-3 rounded-2xl bg-[#1a0e08] text-white text-sm font-bold hover:bg-[#1a0e08]/90 transition-all disabled:opacity-50 disabled:grayscale cursor-pointer shadow-lg shadow-[#1a0e08]/20"
              >
                Start Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Monitors() {
  return (
    <AdminMonitorProvider>
      <MonitorsContent />
    </AdminMonitorProvider>
  );
}
