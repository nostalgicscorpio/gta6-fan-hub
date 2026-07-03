import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
 const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 const [isHovering, setIsHovering] = useState(false);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 // Only run on desktop
 if (window.matchMedia('(max-width: 768px)').matches) return;
 
 setIsVisible(true);

 const updateMousePosition = (e) => {
 setMousePosition({ x: e.clientX, y: e.clientY });
 };

 const handleMouseOver = (e) => {
 const target = e.target;
 if (
 target.tagName.toLowerCase() === 'button' ||
 target.tagName.toLowerCase() === 'a' ||
 target.closest('button') ||
 target.closest('a') ||
 target.classList.contains('cursor-pointer')
 ) {
 setIsHovering(true);
 } else {
 setIsHovering(false);
 }
 };

 window.addEventListener('mousemove', updateMousePosition);
 window.addEventListener('mouseover', handleMouseOver);

 // Hide on leave
 const handleMouseLeave = () => setIsVisible(false);
 const handleMouseEnter = () => setIsVisible(true);
 
 document.addEventListener('mouseleave', handleMouseLeave);
 document.addEventListener('mouseenter', handleMouseEnter);

 return () => {
 window.removeEventListener('mousemove', updateMousePosition);
 window.removeEventListener('mouseover', handleMouseOver);
 document.removeEventListener('mouseleave', handleMouseLeave);
 document.removeEventListener('mouseenter', handleMouseEnter);
 };
 }, []);

 if (!isVisible) return null;

 return (
 <>
 {/* Main dot */}
 <motion.div
 className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-screen"
 animate={{
 x: mousePosition.x - 4,
 y: mousePosition.y - 4,
 scale: isHovering ? 0 : 1,
 opacity: isHovering ? 0 : 1
 }}
 transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
 />
 
 {/* Outer ring / Reticle */}
 <motion.div
 className="fixed top-0 left-0 w-10 h-10 border border-primary/60 rounded-full pointer-events-none z-[9998] flex items-center justify-center mix-blend-screen"
 animate={{
 x: mousePosition.x - 20,
 y: mousePosition.y - 20,
 scale: isHovering ? 1.5 : 1,
 backgroundColor: isHovering ? 'rgba(255, 106, 0, 0.1)' : 'transparent',
 borderColor: isHovering ? 'rgba(255, 106, 0, 0.9)' : 'rgba(255, 106, 0, 0.4)',
 }}
 transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.5 }}
 >
 {isHovering && (
 <motion.div 
 initial={{ opacity: 0, scale: 0 }}
 animate={{ opacity: 1, scale: 1 }}
 className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,106,0,0.8)]"
 />
 )}
 </motion.div>
 </>
 );
}
