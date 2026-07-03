import React from 'react';
import { HiExclamationTriangle } from 'react-icons/hi2';

export default class ErrorBoundary extends React.Component {
 constructor(props) {
 super(props);
 this.state = { hasError: false };
 }

 static getDerivedStateFromError(_error) {
 return { hasError: true };
 }

 render() {
 if (this.state.hasError) {
 return (
 <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center font-sans">
 <div className="glass-card max-w-md w-full p-8 rounded-2xl border-t border-gta-red shadow-[0_0_50px_rgba(255,0,0,0.1)]">
 <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gta-red/10 flex items-center justify-center">
 <HiExclamationTriangle className="w-8 h-8 text-gta-red" />
 </div>
 <h1 className="font-display font-black text-2xl text-white uppercase tracking-wider mb-2">System Failure</h1>
 <p className="text-gta-muted text-sm mb-8">A fatal error has occurred while rendering this interface. Please try refreshing the page.</p>
 <button 
 onClick={() => window.location.reload()}
 className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-md hover:bg-gta-red hover:text-white transition-colors cursor-pointer w-full"
 >
 Reload Interface
 </button>
 </div>
 </div>
 );
 }

 return this.props.children;
 }
}
