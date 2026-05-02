import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
  const containerRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blob floating animation
      gsap.to(blobRef.current, {
        y: 20,
        rotation: -5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Entry animations
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.from(".animate-item", {
        opacity: 0,
        x: -30,
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0B0F1A] flex items-center justify-center p-4 relative overflow-hidden font-['Inter',sans-serif]">
      {/* Background Glows */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-5xl h-[750px] grid grid-cols-1 md:grid-cols-2 bg-white/3 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"
      >
        {/* Left Side: Visual Focus */}
        <div className="hidden md:flex flex-col items-center justify-center relative bg-linear-to-br from-blue-900/30 to-purple-900/20 border-r border-white/5 p-12 overflow-hidden order-last md:order-first">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          
          {/* Animated Liquid Blob */}
          <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
            {/* SVG Filter for gooey effect */}
            <svg className="absolute w-0 h-0">
              <filter id="goo-reg">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </svg>

            <div className="relative w-72 h-72 filter blur-[2px]" style={{ filter: 'url(#goo-reg)' }}>
              {/* Individual moving blobs */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full animate-blob opacity-80" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-500 rounded-full animate-blob opacity-80" style={{ animationDelay: '-2.5s' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-indigo-500 rounded-full animate-blob opacity-80" style={{ animationDelay: '-5s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-44 h-44 bg-blue-600 rounded-full animate-blob opacity-80" style={{ animationDelay: '-7.5s' }}></div>
            </div>

            {/* Glass Overlay for Depth */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[inset_0_0_40px_rgba(255,255,255,0.1)]"></div>
            </div>
            
            {/* Core Glow */}
            <div className="absolute w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          </div>

          <div className="relative z-10 text-center mt-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Network Active</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">AI-Powered Monitoring</h2>
            <p className="text-slate-400 max-w-[280px] mx-auto text-sm leading-relaxed">
              Start monitoring your systems with the world's most advanced AI intelligence.
            </p>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="flex flex-col justify-center p-8 md:p-16 space-y-6">
          <div className="space-y-2 animate-item">
            <h1 className="text-4xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-slate-400">Join the elite network of developers today</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2 animate-item">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/3 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2 animate-item">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white/3 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 animate-item">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/3 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
              <div className="space-y-2 animate-item">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-widest ml-1">Confirm</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <ShieldCheck size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-white/3 border border-white/10 text-white rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-6"
            >
              Create Account
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="space-y-6 animate-item pt-2">
            <p className="text-center text-slate-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-bold hover:text-blue-400 transition-colors">Sign in here</Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-[#0B0F1A] px-4 text-slate-500">Fast Registration</span></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-[#131314] hover:bg-[#1b1b1c] border border-[#444746] text-white py-3.5 rounded-xl transition-all shadow-sm group">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" className="group-hover:scale-105 transition-transform">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 35.741 44 30.988 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <span className="text-sm font-medium font-['Roboto',sans-serif]">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;