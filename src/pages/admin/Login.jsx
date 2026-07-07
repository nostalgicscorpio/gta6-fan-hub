import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabaseAuth } from '../../services/supabaseAuthService';
import SEO from '../../components/SEO';

export default function Login() {
  const [email, setEmail] = useState('admin@gta6world.com');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await supabaseAuth.signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden text-white font-sans selection:bg-primary/30">
      <SEO title="Admin Login - GTA6WORLD" />
      
      {/* Background styling */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="font-display font-black text-4xl tracking-widest mb-2">
            <span className="text-primary">GTA</span>
            <span className="text-white ml-2">VI</span>
          </h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gta-muted font-display">
            Creator Studio CMS
          </p>
        </div>

        <div className="bg-[#0f0f13]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold mb-6">Access Required</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg p-3.5 text-white focus:border-primary outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-lg p-3.5 text-white focus:border-primary outline-none transition-colors"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 mt-4 bg-primary text-black font-bold uppercase tracking-widest rounded-sm hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,106,0,0.3)]"
            >
              {isLoading ? 'Authenticating...' : 'Enter System'}
            </button>
          </form>
        </div>
        
        <p className="text-center text-xs text-white/30 mt-8">
          Demo Credentials: admin@gta6world.com / admin
        </p>
      </motion.div>
    </div>
  );
}
