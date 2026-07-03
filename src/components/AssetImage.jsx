import React, { useState } from 'react';

/**
 * AssetImage handles missing images gracefully without crashing or showing a broken image icon.
 * If the image fails to load (e.g. returns a 404), it silently hides itself.
 */
const AssetImage = ({ src, alt, className = '', style, loading = 'lazy', ...props }) => {
 const [error, setError] = useState(false);
 const [loaded, setLoaded] = useState(false);

 if (error || !src) {
 return <div style={{ display: 'none' }} />;
 }

 return (
 <div className={`relative overflow-hidden ${className}`} style={style}>
 {/* Shimmer Placeholder */}
 {!loaded && (
 <div className="absolute inset-0 img-loading z-0" aria-hidden="true" />
 )}
 
 {/* Actual Image */}
 <img
 src={src}
 alt={alt || ''}
 className={`w-full h-full object-cover transition-opacity duration-500 relative z-10 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
 loading={loading}
 onLoad={() => setLoaded(true)}
 onError={() => setError(true)}
 {...props}
 />
 </div>
 );
};

export default React.memo(AssetImage);
