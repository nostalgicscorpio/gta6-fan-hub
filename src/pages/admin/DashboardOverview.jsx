import { motion } from 'framer-motion';
import { useAdminData } from '../../hooks/useAdminData';
import { 
  HiOutlineNewspaper, 
  HiOutlinePhotograph, 
  HiOutlineVideoCamera,
  HiOutlineSparkles,
  HiOutlinePlay,
  HiPlus
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

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
  const { data: news, loading: newsLoading } = useAdminData('posts');
  
  // Mock data sizes for other modules (since we moved to Creator Studio)
  const stats = {
    videos: 12,
    aiCreations: 5,
    gallery: 48,
    gameplay: 3
  };

  const loading = newsLoading;

  return (
    <div className="relative pb-24 lg:pb-0">
      <div className="mb-8">
        <h2 className="font-display font-bold text-3xl text-white mb-2">Creator Overview</h2>
        <p className="text-gta-muted text-sm">Welcome back to the Studio. System operating normally.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-primary animate-pulse">
          Loading Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <StatCard 
            title="Articles" 
            value={news.length} 
            icon={HiOutlineNewspaper} 
            colorClass="bg-primary"
            delay={0.1}
          />
          <StatCard 
            title="Videos" 
            value={stats.videos} 
            icon={HiOutlineVideoCamera} 
            colorClass="bg-[#FF0000]"
            delay={0.2}
          />
          <StatCard 
            title="AI Creations" 
            value={stats.aiCreations} 
            icon={HiOutlineSparkles} 
            colorClass="bg-gta-cyan"
            delay={0.3}
          />
          <StatCard 
            title="Gallery Assets" 
            value={stats.gallery} 
            icon={HiOutlinePhotograph} 
            colorClass="bg-gta-purple"
            delay={0.4}
          />
          <StatCard 
            title="Gameplay Uploads" 
            value={stats.gameplay} 
            icon={HiOutlinePlay} 
            colorClass="bg-gta-green"
            delay={0.5}
          />
        </div>
      )}

      {/* System Status Mock */}
      <div className="mt-12">
        <h3 className="font-display font-bold text-xl text-white mb-4">System Status</h3>
        <div className="bg-[#0f0f13] border border-white/5 rounded-xl p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-sm text-gta-muted">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
              <span>Supabase Database (Mock Initialized)</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gta-muted">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
              <span>Cloudinary Storage (Mock Ready)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <Link 
        to="/admin/studio"
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.4)] hover:scale-105 transition-transform z-50"
      >
        <HiPlus size={28} />
      </Link>
    </div>
  );
}
