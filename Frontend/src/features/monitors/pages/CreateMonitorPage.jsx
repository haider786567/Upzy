import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../../dashboard/components/Sidebar';
import Navbar from '../../../components/Navbar';
import { Globe, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const CreateMonitorPage = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [interval, setInterval] = useState('1m');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-animate", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
      
      gsap.from(".icon-animate", {
        scale: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.2
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ url, interval });
    navigate('/dashboard/monitors');
  };

  const intervals = ['30s', '1m', '5m', '15m'];

  return (
    <div ref={pageRef} className="flex h-screen bg-cream overflow-hidden font-['Inter',sans-serif]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background depth elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8 relative z-10 hide-scrollbar flex flex-col items-center">
          <div className="w-full max-w-2xl space-y-8">
            {/* Back Link */}
            <Link 
              to="/dashboard/monitors" 
              className="flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium text-sm w-fit form-animate"
            >
              <ArrowLeft size={16} />
              Back to monitors
            </Link>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-secondary to-primary flex items-center justify-center text-cream shadow-xl shadow-primary/20 icon-animate">
                <Globe size={32} />
              </div>
              <div className="space-y-1 form-animate">
                <h1 className="text-3xl font-bold text-dark tracking-tight">Add a new monitor</h1>
                <p className="text-accent/60 font-medium">We'll start checking it within seconds.</p>
              </div>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl border border-rose/40 rounded-[2.5rem] p-10 shadow-2xl shadow-primary/5 space-y-8 form-animate">
              {/* URL Input */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-dark uppercase tracking-wider ml-1">
                  Website / API URL
                </label>
                <p className="text-xs text-accent/60 font-medium ml-1">Include https://. We'll send a GET request.</p>
                <div className="relative group">
                  <input 
                    type="url" 
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://api.your-app.com/health"
                    className="w-full bg-cream/30 border border-rose/50 rounded-2xl py-4 px-6 text-dark focus:outline-none focus:border-secondary/50 focus:ring-4 focus:ring-secondary/5 transition-all placeholder:text-accent/20 font-medium"
                  />
                </div>
              </div>

              {/* Interval Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-dark uppercase tracking-wider ml-1">
                  Monitoring interval
                </label>
                <p className="text-xs text-accent/60 font-medium ml-1">How often we should check.</p>
                <div className="grid grid-cols-4 gap-3">
                  {intervals.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setInterval(item)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        interval === item 
                          ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/20' 
                          : 'bg-white/50 border-rose/50 text-accent hover:border-secondary/30 hover:bg-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-linear-to-r from-primary/5 to-secondary/5 border border-secondary/10 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-secondary shadow-sm">
                  <Zap size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-dark font-medium leading-relaxed">
                    Upzy will run from <span className="font-bold text-secondary">5 global regions</span> and use AI to summarize incidents automatically.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-linear-to-r from-secondary to-primary text-cream font-bold rounded-2xl hover:shadow-[0_10px_30px_-5px_rgba(43,18,76,0.3)] transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Start monitoring
                </button>
                <button 
                  type="button"
                  onClick={() => navigate('/dashboard/monitors')}
                  className="px-8 py-4 bg-white/50 border border-rose/50 text-dark font-bold rounded-2xl hover:bg-white transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateMonitorPage;
