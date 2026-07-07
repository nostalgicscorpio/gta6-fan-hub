export const cloudinaryService = {
  uploadMedia: async (file, type = 'image') => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (cloudName && uploadPreset && file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      
      const resourceType = type === 'video' ? 'video' : 'image';

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Cloudinary upload failed');
        }

        const data = await response.json();
        return { url: data.secure_url, error: null };
      } catch (error) {
        return { url: null, error: error.message };
      }
    } else {
      // Mock Fallback
      return new Promise((resolve) => {
        setTimeout(() => {
          // Return a mock URL depending on the type if no real file or config is provided
          const mockUrl = type === 'image' 
            ? 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop'
            : 'https://www.w3schools.com/html/mov_bbb.mp4';
          resolve({ url: mockUrl, error: null });
        }, 1200);
      });
    }
  }
};
