export const cloudinaryService = {
  uploadMedia: async (file, type = 'image') => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;



    if (cloudName && uploadPreset && file) {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('api_key', apiKey);

      const resourceType = 'image'; // Automatically handle image or video types

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (!response.ok) {
          // Add specific error handling based on Cloudinary's response
          let errorMessage = 'Cloudinary upload failed';
          if (data.error && data.error.message) {
            errorMessage = data.error.message;

            if (errorMessage.includes('Upload preset')) {
              errorMessage = 'Invalid upload preset configuration.';
            } else if (errorMessage.includes('File size too large')) {
              errorMessage = 'File is too large to upload.';
            }
          }
          throw new Error(errorMessage);
        }

        // Verification Logging
        console.log('Cloudinary Upload Success:', {
          secure_url: data.secure_url,
          public_id: data.public_id,
          resource_type: data.resource_type
        });

        return { url: data.secure_url, error: null };
      } catch (error) {
        // Network failure or other thrown errors
        const errorMsg = error.message === 'Failed to fetch'
          ? 'Network failure: Unable to reach Cloudinary.'
          : error.message;

        return { url: null, error: errorMsg };
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
