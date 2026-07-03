import { useState } from 'react';
import { HiSave, HiOutlineGlobeAlt, HiOutlineClock, HiOutlineStar } from 'react-icons/hi';

export default function AdminSettings() {
 const [isSaving, setIsSaving] = useState(false);
 const [saved, setSaved] = useState(false);

 const handleSave = () => {
 setIsSaving(true);
 setTimeout(() => {
 setIsSaving(false);
 setSaved(true);
 setTimeout(() => setSaved(false), 3000);
 }, 800);
 };

 return (
 <div className="max-w-4xl">
 <div className="flex items-center justify-between mb-8">
 <div>
 <h2 className="font-display font-bold text-3xl text-white mb-2">Global Settings</h2>
 <p className="text-gta-muted text-sm">Configure website parameters and features.</p>
 </div>
 <button 
 onClick={handleSave}
 disabled={isSaving}
 className="flex items-center gap-2 px-6 py-2.5 bg-primary text-black font-bold text-xs tracking-widest uppercase rounded hover:bg-primary-light transition-colors disabled:opacity-50"
 >
 {isSaving ? 'Saving...' : saved ? 'Saved!' : <><HiSave className="w-4 h-4" /> Save Changes</>}
 </button>
 </div>

 <div className="space-y-6">
 {/* General */}
 <div className="bg-[#0f0f13] border border-white/5 rounded-xl p-6">
 <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
 <HiOutlineGlobeAlt className="w-5 h-5 text-primary" />
 <h3 className="font-bold text-lg text-white">General Information</h3>
 </div>
 
 <div className="space-y-4">
 <div>
 <label className="block text-xs uppercase tracking-widest text-gta-muted font-bold mb-2">Website Title</label>
 <input type="text" defaultValue="GTA VI Fan Hub" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
 </div>
 <div>
 <label className="block text-xs uppercase tracking-widest text-gta-muted font-bold mb-2">Meta Description</label>
 <textarea defaultValue="The ultimate fan destination for Grand Theft Auto VI news, trailers, and Vice City interactive maps." className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors h-24 resize-none" />
 </div>
 </div>
 </div>

 {/* Countdown */}
 <div className="bg-[#0f0f13] border border-white/5 rounded-xl p-6">
 <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
 <HiOutlineClock className="w-5 h-5 text-gta-cyan" />
 <h3 className="font-bold text-lg text-white">Hero Countdown</h3>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs uppercase tracking-widest text-gta-muted font-bold mb-2">Target Date (YYYY-MM-DD)</label>
 <input type="date" defaultValue="2025-10-01" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gta-cyan transition-colors" />
 </div>
 <div>
 <label className="block text-xs uppercase tracking-widest text-gta-muted font-bold mb-2">Label</label>
 <input type="text" defaultValue="ESTIMATED RELEASE" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gta-cyan transition-colors" />
 </div>
 </div>
 </div>

 {/* Features */}
 <div className="bg-[#0f0f13] border border-white/5 rounded-xl p-6">
 <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
 <HiOutlineStar className="w-5 h-5 text-gta-gold" />
 <h3 className="font-bold text-lg text-white">Feature Flags</h3>
 </div>
 
 <div className="space-y-4">
 <label className="flex items-center justify-between cursor-pointer p-4 border border-white/5 rounded-lg bg-black/20 hover:bg-white/[0.02] transition-colors">
 <div>
 <div className="text-white font-bold mb-1">Enable Pre-Orders</div>
 <div className="text-xs text-gta-muted">Show the pre-order CTA button in the navigation bar.</div>
 </div>
 <div className="relative">
 <input type="checkbox" defaultChecked className="sr-only" />
 <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
 <div className="w-4 h-4 bg-white rounded-full" />
 </div>
 </div>
 </label>
 
 <label className="flex items-center justify-between cursor-pointer p-4 border border-white/5 rounded-lg bg-black/20 hover:bg-white/[0.02] transition-colors">
 <div>
 <div className="text-white font-bold mb-1">Play Cinematic Intro</div>
 <div className="text-xs text-gta-muted">Play the Rockstar-style logo animation on first visit.</div>
 </div>
 <div className="relative">
 <input type="checkbox" defaultChecked className="sr-only" />
 <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
 <div className="w-4 h-4 bg-white rounded-full" />
 </div>
 </div>
 </label>
 </div>
 </div>
 </div>
 </div>
 );
}
