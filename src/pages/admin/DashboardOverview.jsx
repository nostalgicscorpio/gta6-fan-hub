import { motion } from 'framer-motion';
import { useAdminData } from '../../hooks/useAdminData';
import { 
 HiOutlineNewspaper, 
 HiOutlineUsers, 
 HiOutlineFilm, 
 HiOutlinePhotograph, 
 HiOutlineLocationMarker 
} from 'react-icons/hi';

function StatCard({ title, value, icon: Icon, colorClass, delay = 0 }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay }}
 className="bg-[#0f0f13] border border-white/5 rounded-xl p-6 relative overflow-hidden group"
 >
 <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-[40px] opacity-20 ${colorClass}`} />
 
 <div className="flex items-start justify-between relative z-10">
 <div>
 <p className="text-[10px] tracking-widest uppercase font-bold text-white/50 mb-2">
 {title}
 </p>
 <h3 className="font-display font-black text-4xl text-white">
 {value}
 </h3>
 </div>
 <div className={`p-3 rounded-lg bg-white/5 text-white/70 group-hover:scale-110 transition-transform duration-300`}>
 <Icon className="w-6 h-6" />
 </div>
 </div>
 </motion.div>
 );
}

export default function DashboardOverview() {
 const { data: news, loading: newsLoading } = useAdminData('news');
 const { data: characters, loading: charsLoading } = useAdminData('characters');
 const { data: trailers, loading: trLoading } = useAdminData('trailers');
 const { data: screenshots, loading: ssLoading } = useAdminData('screenshots');
 const { data: locations, loading: locLoading } = useAdminData('locations');

 const loading = newsLoading || charsLoading || trLoading || ssLoading || locLoading;

 return (
 <div>
 <div className="mb-8">
 <h2 className="font-display font-bold text-3xl text-white mb-2">Dashboard Overview</h2>
 <p className="text-gta-muted text-sm">Welcome back to the Control Center. System operating normally.</p>
 </div>

 {loading ? (
 <div className="flex items-center justify-center h-64 text-primary animate-pulse">
 Loading Data...
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
 <StatCard 
 title="Total Articles" 
 value={news.length} 
 icon={HiOutlineNewspaper} 
 colorClass="bg-primary"
 delay={0.1}
 />
 <StatCard 
 title="Characters" 
 value={characters.length} 
 icon={HiOutlineUsers} 
 colorClass="bg-gta-cyan"
 delay={0.2}
 />
 <StatCard 
 title="Trailers" 
 value={trailers.length} 
 icon={HiOutlineFilm} 
 colorClass="bg-gta-red"
 delay={0.3}
 />
 <StatCard 
 title="Screenshots" 
 value={screenshots.length} 
 icon={HiOutlinePhotograph} 
 colorClass="bg-gta-purple"
 delay={0.4}
 />
 <StatCard 
 title="Map Markers" 
 value={locations.length} 
 icon={HiOutlineLocationMarker} 
 colorClass="bg-gta-green"
 delay={0.5}
 />
 </div>
 )}

 {/* System Status Mock */}
 <div className="mt-12">
 <h3 className="font-display font-bold text-xl text-white mb-4">System Status</h3>
 <div className="bg-[#0f0f13] border border-white/5 rounded-xl p-6">
 <div className="flex items-center gap-4 text-sm text-gta-muted mb-4">
 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
 <span>Database Connected (Mock InMemory)</span>
 </div>
 <div className="flex items-center gap-4 text-sm text-gta-muted">
 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
 <span>Storage Bucket Connected (Local Assets)</span>
 </div>
 </div>
 </div>
 </div>
 );
}
