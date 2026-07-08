import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalyticsSummary } from '../utils/analytics';

function StatCard({ label, value, icon, delay = 0 }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay }}
 className="glass-card-static rounded-xl p-4 sm:p-5"
 >
 <div className="flex items-center gap-3 mb-2">
 <span className="text-lg sm:text-xl">{icon}</span>
 <p className="text-[10px] tracking-[0.3em] uppercase text-gta-muted font-medium">{label}</p>
 </div>
 <p className="font-display font-black text-2xl sm:text-3xl text-primary tabular-nums">
 {typeof value === 'number' ? value.toLocaleString() : value}
 </p>
 </motion.div>
 );
}

function MiniBar({ value, maxValue, label }) {
 const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
 return (
 <div className="flex items-center gap-3">
 <span className="text-[10px] tracking-wider uppercase text-gta-muted w-8 text-right font-medium">{label}</span>
 <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
 <motion.div
 initial={{ width: 0 }}
 animate={{ width: `${pct}%` }}
 transition={{ duration: 0.8, ease: 'easeOut' }}
 className="h-full bg-gradient-to-r from-primary to-gta-gold rounded-full"
 />
 </div>
 <span className="text-xs text-gta-muted tabular-nums w-6 text-right">{value}</span>
 </div>
 );
}

export default function AnalyticsDashboard() {
 const [isOpen, setIsOpen] = useState(false);
 const [stats, setStats] = useState(null);

 const refresh = useCallback(() => {
 setStats(getAnalyticsSummary());
 }, []);

 useEffect(() => {
 if (isOpen) refresh();
 }, [isOpen, refresh]);

 // Auto-refresh every 5 seconds when open
 useEffect(() => {
 if (!isOpen) return;
 const id = setInterval(refresh, 5000);
 return () => clearInterval(id);
 }, [isOpen, refresh]);

 return (
 <>
 {/* Floating toggle button */}
 <motion.button
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 1.5 }}
 onClick={() => setIsOpen(!isOpen)}
 className="relative z-[9999] w-12 h-12 shrink-0 rounded-full glass-card flex items-center justify-center text-primary hover:bg-primary/20 hover:shadow-[0_0_25px_rgba(255,106,0,0.3)] transition-all duration-300 cursor-pointer"
 aria-label="Toggle analytics dashboard"
 title="Analytics Dashboard"
 >
 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2v8H3zM9 9h2v12H9zM15 5h2v16h-2zM21 1h2v20h-2z" />
 </svg>
 </motion.button>

 {/* Dashboard panel */}
 <AnimatePresence>
 {isOpen && stats && (
 <motion.div
 initial={{ opacity: 0, x: 300 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 300 }}
 transition={{ duration: 0.35, ease: 'easeOut' }}
 className="fixed bottom-[154px] right-[20px] lg:bottom-[174px] lg:right-[32px] z-[9998] w-[340px] sm:w-[380px] max-h-[70vh] overflow-y-auto rounded-2xl bg-gta-black/95 backdrop-blur-2xl border border-primary/20 shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_20px_rgba(255,106,0,0.1)]"
 >
 {/* Header */}
 <div className="sticky top-0 z-10 bg-gta-black/95 backdrop-blur-xl px-5 py-4 border-b border-gta-border/30 flex items-center justify-between">
 <div>
 <h3 className="font-display font-bold text-sm tracking-wider text-white uppercase">Analytics</h3>
 <p className="text-[9px] tracking-[0.3em] uppercase text-gta-muted/60 mt-0.5">Dashboard</p>
 </div>
 <button
 onClick={() => setIsOpen(false)}
 className="text-gta-muted hover:text-primary transition-colors cursor-pointer"
 aria-label="Close analytics"
 >
 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
 </svg>
 </button>
 </div>

 {/* Stats grid */}
 <div className="p-5 space-y-4">
 <div className="grid grid-cols-2 gap-3">
 <StatCard label="Total Visits" value={stats.totalVisitors} icon="👥" delay={0} />
 <StatCard label="Today" value={stats.todayVisitors} icon="📅" delay={0.05} />
 <StatCard label="Trailer Plays" value={stats.totalTrailerClicks} icon="🎬" delay={0.1} />
 <StatCard label="Article Reads" value={stats.totalArticleClicks} icon="📰" delay={0.15} />
 </div>

 {/* Button clicks */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.2 }}
 className="glass-card-static rounded-xl p-4"
 >
 <p className="text-[10px] tracking-[0.3em] uppercase text-gta-muted font-medium mb-1">
 🖱️ Button Clicks
 </p>
 <p className="font-display font-black text-xl text-primary tabular-nums">
 {stats.totalButtonClicks.toLocaleString()}
 </p>
 </motion.div>

 {/* 7-day chart */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.25 }}
 className="glass-card-static rounded-xl p-4"
 >
 <p className="text-[10px] tracking-[0.3em] uppercase text-gta-muted font-medium mb-3">
 📊 Last 7 Days
 </p>
 <div className="space-y-2">
 {stats.last7Days.map((day) => {
 const maxVal = Math.max(...stats.last7Days.map((d) => d.visitors), 1);
 return (
 <MiniBar
 key={day.date}
 value={day.visitors}
 maxValue={maxVal}
 label={day.label}
 />
 );
 })}
 </div>
 </motion.div>

 {/* Top trailers */}
 {stats.topTrailers.length > 0 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.3 }}
 className="glass-card-static rounded-xl p-4"
 >
 <p className="text-[10px] tracking-[0.3em] uppercase text-gta-muted font-medium mb-2">
 🎬 Top Trailers
 </p>
 <div className="space-y-1.5">
 {stats.topTrailers.map(([name, count]) => (
 <div key={name} className="flex items-center justify-between text-xs">
 <span className="text-gta-text truncate mr-2">{name}</span>
 <span className="text-primary font-bold tabular-nums">{count}</span>
 </div>
 ))}
 </div>
 </motion.div>
 )}

 {/* Top articles */}
 {stats.topArticles.length > 0 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.35 }}
 className="glass-card-static rounded-xl p-4"
 >
 <p className="text-[10px] tracking-[0.3em] uppercase text-gta-muted font-medium mb-2">
 📰 Top Articles
 </p>
 <div className="space-y-1.5">
 {stats.topArticles.map(([name, count]) => (
 <div key={name} className="flex items-center justify-between text-xs">
 <span className="text-gta-text truncate mr-2">{name}</span>
 <span className="text-primary font-bold tabular-nums">{count}</span>
 </div>
 ))}
 </div>
 </motion.div>
 )}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </>
 );
}
