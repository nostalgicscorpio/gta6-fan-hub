import { useState } from 'react';
import { HiPlus, HiTrash, HiPhotograph, HiVideoCamera, HiCloudUpload } from 'react-icons/hi';
import AssetImage from '../../components/AssetImage';
import { cloudinaryService } from '../../services/cloudinaryService';

export default function ManageMedia() {
  const [activeTab, setActiveTab] = useState('images');
  const [isUploading, setIsUploading] = useState(false);
  const [media, setMedia] = useState({
    images: [
      { id: 'img-1', url: '/images/screenshots/ss-lucia-jason.jpg', title: 'Lucia & Jason' },
      { id: 'img-2', url: '/images/screenshots/ss-beach.jpg', title: 'Vice City Beach' }
    ],
    videos: [
      { id: 'vid-1', url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Test Video Upload' }
    ]
  });

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate File Upload
    const result = await cloudinaryService.uploadMedia(null, activeTab === 'images' ? 'image' : 'video');
    setMedia(prev => ({
      ...prev,
      [activeTab]: [
        { id: `${activeTab}-${Date.now()}`, url: result.url, title: 'New Upload' },
        ...prev[activeTab]
      ]
    }));
    setIsUploading(false);
  };

  const handleDelete = (id, type) => {
    if(window.confirm('Delete this media asset?')) {
      setMedia(prev => ({
        ...prev,
        [type]: prev[type].filter(m => m.id !== id)
      }));
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-white mb-2 flex items-center gap-3">
            <HiPhotograph className="text-gta-purple" /> Media Library
          </h2>
          <p className="text-gta-muted text-sm">Centralized cloud storage for GTA6WORLD assets.</p>
        </div>
        <button 
          onClick={handleUpload}
          disabled={isUploading}
          className="flex items-center gap-2 px-6 py-3 bg-gta-purple text-white font-bold text-xs tracking-widest uppercase rounded hover:scale-105 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] disabled:opacity-50"
        >
          {isUploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <HiCloudUpload className="w-5 h-5" />}
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-white/5 pb-2">
        <button 
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 pb-2 px-2 border-b-2 transition-colors ${activeTab === 'images' ? 'border-gta-purple text-white' : 'border-transparent text-white/50 hover:text-white'}`}
        >
          <HiPhotograph className="w-5 h-5" /> Images & Thumbnails
        </button>
        <button 
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 pb-2 px-2 border-b-2 transition-colors ${activeTab === 'videos' ? 'border-red-500 text-white' : 'border-transparent text-white/50 hover:text-white'}`}
        >
          <HiVideoCamera className="w-5 h-5" /> Source Videos
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media[activeTab].map((item) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden border border-white/5 bg-[#0f0f13]">
            {activeTab === 'images' ? (
              <AssetImage src={item.url} alt={item.title} className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
            ) : (
              <video src={item.url} className="w-full h-40 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
            )}
            
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleDelete(item.id, activeTab)}
                className="p-1.5 bg-red-500/80 backdrop-blur text-white rounded hover:bg-red-500"
              >
                <HiTrash className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-[#0f0f13]">
              <p className="text-xs font-bold text-white truncate">{item.title}</p>
              <p className="text-[9px] text-gta-muted uppercase tracking-wider mt-1 truncate">{item.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
