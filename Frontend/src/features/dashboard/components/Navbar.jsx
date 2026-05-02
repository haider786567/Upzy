import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="h-20 w-full flex items-center justify-between px-8 bg-[#FBE4D8]/50 backdrop-blur-xl border-b border-[#DFB6B2]/30 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#854F6C]">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search analytics, logs, incidents..." 
            className="w-full bg-white/50 border border-[#DFB6B2] text-[#190019] rounded-full py-2.5 pl-12 pr-4 outline-none focus:border-[#522B5B] focus:ring-4 focus:ring-[#522B5B]/5 transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-[#854F6C] hover:text-[#2B124C] transition-colors group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#854F6C] rounded-full border-2 border-[#FBE4D8]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-[#DFB6B2]/50 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-[#522B5B] to-[#2B124C] flex items-center justify-center border-2 border-white shadow-md">
            <span className="text-xs font-bold text-[#FBE4D8]">JD</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold text-[#190019]">John Doe</p>
            <p className="text-[10px] font-bold text-[#854F6C] uppercase tracking-wider">Premium Plan</p>
          </div>
          <ChevronDown size={16} className="text-[#854F6C] group-hover:translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
