import { useState, useEffect, useCallback } from "react";
import { 
  HiOutlineTrash, 
  HiOutlineRefresh, 
  HiOutlineSearch, 
} from "react-icons/hi";
import { 
  BsThreeDotsVertical, 
  BsShieldCheck, 
  BsShieldLock, 
  BsPerson, 
  BsEnvelope 
} from "react-icons/bs";
import { AdminUserProvider, useAdminUserStore } from "../state/adminUserStore";
import adminUserService from "../service/adminUserService";
import { toast } from "react-hot-toast";

const AdminUsersContent = () => {
  const { 
    users, 
    loading, 
    setLoading, 
    setError, 
    setUsersData, 
    removeUserFromState 
  } = useAdminUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminUserService.getAllUsers();
      const usersList = Array.isArray(data) ? data : data.users || [];
      setUsersData(usersList);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      toast.error(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setUsersData]);

  const deleteUser = useCallback(async (id) => {
    try {
      await adminUserService.deleteUser(id);
      removeUserFromState(id);
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    } finally {
      setActiveMenuId(null);
    }
  }, [removeUserFromState]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenuId !== null && !event.target.closest(".user-menu")) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeMenuId]);

  const filteredList = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const adminCount = users.filter(u => u.role === 'admin').length;
  const regularCount = users.filter(u => u.role !== 'admin').length;

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

  const UserMobileCard = ({ user }) => {
    const isMenuOpen = activeMenuId === user._id;
    const isAdmin = user.role === 'admin';

    return (
      <div className="bg-white/80 rounded-2xl border border-[#1a0e08]/8 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#1a0e08]/5 flex items-center justify-center shrink-0">
              <BsPerson className="text-[#1a0e08]/60 text-lg" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[#1a0e08] truncate text-sm sm:text-base">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-[#1a0e08]/40 truncate">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {isAdmin ? <BsShieldCheck className="text-[10px]" /> : <BsPerson className="text-[10px]" />}
              {user.role || 'user'}
            </span>
            <div className="relative user-menu">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenuId(isMenuOpen ? null : user._id);
                }}
                className="p-1.5 rounded-full hover:bg-[#1a0e08]/5 transition-colors"
              >
                <BsThreeDotsVertical className="text-[#1a0e08]/40 text-sm" />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 top-8 z-20 w-32 bg-white rounded-xl shadow-lg border border-[#1a0e08]/10 py-1">
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this user?')) {
                        deleteUser(user._id);
                      }
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
              User Management
            </h1>
            <p className="text-[#1a0e08]/50 text-sm mt-0.5">
              Manage system access and personnel
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              className="p-3 rounded-xl bg-white/50 border border-[#1a0e08]/8 text-[#1a0e08]/50 hover:bg-white transition-colors cursor-pointer"
              disabled={loading}
            >
              <HiOutlineRefresh className={`text-xl ${loading ? 'animate-spin' : ''}`} />
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
              placeholder="Search users by name or email..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/50 border border-[#1a0e08]/8 text-sm text-[#1a0e08] placeholder:text-[#1a0e08]/40 focus:outline-none focus:ring-2 focus:ring-[#1a0e08]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <StatCard
          title="Total"
          value={users.length}
          subtext="Personnel"
          icon={<BsPerson />}
        />
        <StatCard
          title="Admins"
          value={adminCount}
          subtext="Full access"
          valueColor="text-amber-700"
          icon={<BsShieldLock className="text-amber-500" />}
        />
        <StatCard
          title="Users"
          value={regularCount}
          subtext="Limited access"
          valueColor="text-slate-700"
          icon={<BsPerson className="text-slate-400" />}
        />
      </div>

      {/* User List Container */}
      <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-[#1a0e08]/8 overflow-hidden">
        {/* Desktop Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-white/20 border-b border-[#1a0e08]/8 text-xs font-semibold text-[#1a0e08]/50 uppercase tracking-wider">
          <div className="md:col-span-5 pl-2">User</div>
          <div className="md:col-span-4">Email</div>
          <div className="md:col-span-2">Role</div>
          <div className="md:col-span-1 text-center">Actions</div>
        </div>

        {/* List Items */}
        <div>
          {loading && users.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-[#1a0e08]/20 border-t-[#1a0e08] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#1a0e08]/40">Fetching personnel data...</p>
            </div>
          ) : (
            filteredList.map((user) => {
              const isAdmin = user.role === 'admin';
              return (
                <div key={user._id}>
                  {/* Desktop Row */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 items-center border-b border-[#1a0e08]/5 hover:bg-white/30 transition-colors">
                    <div className="md:col-span-5 flex items-center gap-3 min-w-0 pl-2">
                      <div className="w-8 h-8 rounded-full bg-[#1a0e08]/5 flex items-center justify-center shrink-0">
                        <BsPerson className="text-[#1a0e08]/40" />
                      </div>
                      <span className="font-medium text-[#1a0e08] truncate text-sm">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                    <div className="md:col-span-4 text-sm text-[#1a0e08]/60 truncate">
                      {user.email}
                    </div>
                    <div className="md:col-span-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isAdmin ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isAdmin ? <BsShieldCheck size={10} /> : <BsPerson size={10} />}
                        {user.role || 'user'}
                      </span>
                    </div>
                    <div className="md:col-span-1 text-center">
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this user?')) {
                            deleteUser(user._id);
                          }
                        }}
                        className="text-[#1a0e08]/30 hover:text-red-500 transition-colors p-1"
                      >
                        <HiOutlineTrash className="text-base" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="md:hidden p-3 pb-0">
                    <UserMobileCard user={user} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredList.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a0e08]/5 flex items-center justify-center">
              <BsPerson className="w-8 h-8 text-[#1a0e08]/30" />
            </div>
            <p className="text-[#1a0e08]/40 text-base">No users found.</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-sm text-[#1a0e08]/50 hover:text-[#1a0e08] transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AdminUsersPage = () => {
  return (
    <AdminUserProvider>
      <AdminUsersContent />
    </AdminUserProvider>
  );
};

export default AdminUsersPage;
