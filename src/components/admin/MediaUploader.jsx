import React, { useState, useRef, useCallback } from 'react';
import { HiCloudUpload, HiCheckCircle, HiXCircle, HiDocument, HiPhotograph, HiVideoCamera } from 'react-icons/hi';
import { cloudinaryService } from '../../services/cloudinaryService';
import AssetImage from '../AssetImage';

export default function MediaUploader({ 
  value, 
  onChange, 
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'],
  type = 'auto', // 'image', 'video', or 'auto'
  label = 'File URL / Path'
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      const allowedExts = allowedTypes.map(t => t.split('/')[1]).join(', ');
      setError(`Invalid file type. Allowed: ${allowedExts}`);
      return false;
    }
    // Limit to 50MB
    if (file.size > 50 * 1024 * 1024) {
      setError(`File is too large. Max size is 50MB.`);
      return false;
    }
    return true;
  };

  const uploadFile = async (file) => {
    if (!validateFile(file)) return;
    
    setError(null);
    setIsUploading(true);
    
    try {
      const { url, error: uploadError } = await cloudinaryService.uploadMedia(file, type);
      if (uploadError) {
        setError(uploadError);
      } else if (url) {
        onChange(url);
      } else {
        setError('Upload failed. No URL returned.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const isVideo = value && value.match(/\.(mp4|webm|ogg)$/i);
  const isImage = value && !isVideo && (value.match(/\.(jpg|jpeg|png|webp|gif)$/i) || value.includes('images.unsplash.com') || value.includes('res.cloudinary.com'));

  return (
    <div className="w-full">
      <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">{label}</label>
      
      {/* Drag & Drop Area */}
      <div 
        className={`relative w-full border-2 border-dashed rounded-lg p-6 mb-4 flex flex-col items-center justify-center transition-all ${
          isDragging ? 'border-gta-purple bg-gta-purple/10' : 'border-white/10 bg-[#050505] hover:border-white/30'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={allowedTypes.join(',')}
          className="hidden" 
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center py-4">
            <div className="w-8 h-8 border-2 border-gta-purple border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs text-white/70 font-bold uppercase tracking-wider animate-pulse">Uploading Media...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <HiCloudUpload className="w-10 h-10 text-white/30 mb-3" />
            <p className="text-sm text-white/80 font-bold mb-1">Drag and drop file here</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
              Allowed: {allowedTypes.map(t => t.split('/')[1]).join(', ')}
            </p>
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-widest uppercase rounded transition-colors"
            >
              Browse Files
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-red-400 text-xs">
          <HiXCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Manual URL Input Fallback */}
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="Or paste an image/video URL here..." 
          className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-white focus:border-gta-purple outline-none text-xs" 
        />
        {value && <HiCheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
      </div>

      {/* Preview Area */}
      {value && (
        <div className="mt-4 w-full bg-black border border-white/10 rounded-lg overflow-hidden relative">
          <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] uppercase tracking-wider text-white flex items-center gap-1">
            {isVideo ? <HiVideoCamera /> : (isImage ? <HiPhotograph /> : <HiDocument />)}
            {isVideo ? 'Video' : (isImage ? 'Image' : 'File')} Preview
          </div>
          
          <div className="aspect-video w-full flex items-center justify-center bg-[#050505]">
            {isVideo ? (
              <video src={value} controls className="w-full h-full object-contain" />
            ) : isImage ? (
              <AssetImage src={value} alt="Preview" className="w-full h-full object-contain opacity-90" />
            ) : (
              <p className="text-xs text-white/30 tracking-widest uppercase">No Preview Available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
