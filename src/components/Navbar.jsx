import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center pt-base pb-8 px-gutter bg-surface-container-low/80 backdrop-blur-xl z-50 rounded-t-xl shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)] md:hidden">
      <Link 
        to="/dashboard" 
        className={`flex flex-col items-center justify-center transition-all active:scale-90 ${path === '/dashboard' ? 'text-primary font-bold relative after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined" style={path === '/dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
        <span className="font-label-sm text-label-sm mt-1">Home</span>
      </Link>
      
      <Link 
        to="#" 
        className={`flex flex-col items-center justify-center transition-all active:scale-90 ${path === '/stats' ? 'text-primary font-bold relative after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined" style={path === '/stats' ? { fontVariationSettings: "'FILL' 1" } : {}}>analytics</span>
        <span className="font-label-sm text-label-sm mt-1">Stats</span>
      </Link>

      <Link 
        to="/habit/new" 
        className={`flex flex-col items-center justify-center transition-all active:scale-90 ${path === '/habit/new' ? 'text-primary font-bold relative after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined" style={path === '/habit/new' ? { fontVariationSettings: "'FILL' 1" } : {}}>add_circle</span>
        <span className="font-label-sm text-label-sm mt-1">Add</span>
      </Link>

      <Link 
        to="/profile"
        className={`flex flex-col items-center justify-center transition-all active:scale-90 ${path === '/profile' ? 'text-primary font-bold relative after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-on-surface-variant opacity-70 hover:opacity-100'}`}
      >
        <span className="material-symbols-outlined" style={path === '/profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
        <span className="font-label-sm text-label-sm mt-1">Profile</span>
      </Link>
    </nav>
  );
}
