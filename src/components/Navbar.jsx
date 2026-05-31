import { Link, useLocation } from "react-router-dom";
import { logout } from "../hooks/useAuth";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50 bg-surface-container-low/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-surface-variant rounded-full flex justify-around items-center py-4 px-6">
      <Link 
        to="/dashboard" 
        className={`flex flex-col items-center justify-center ${path === '/dashboard' ? 'text-primary font-bold relative after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-on-surface-variant opacity-70'} hover:opacity-100 transition-opacity active:scale-90 transition-transform`}
      >
        <span className="material-symbols-outlined" style={path === '/dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
        <span className="text-label-sm mt-1">Home</span>
      </Link>
      
      <Link 
        to="/habit/new" 
        className={`flex flex-col items-center justify-center ${path === '/habit/new' ? 'text-primary font-bold relative after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-on-surface-variant opacity-70'} hover:opacity-100 transition-opacity active:scale-90 transition-transform`}
      >
        <span className="material-symbols-outlined" style={path === '/habit/new' ? { fontVariationSettings: "'FILL' 1" } : {}}>add_circle</span>
        <span className="text-label-sm mt-1">Tambah</span>
      </Link>

      <button 
        onClick={logout}
        className="flex flex-col items-center justify-center text-error opacity-70 hover:opacity-100 transition-opacity active:scale-90 transition-transform cursor-pointer"
      >
        <span className="material-symbols-outlined">logout</span>
        <span className="text-label-sm mt-1">Keluar</span>
      </button>
    </nav>
  );
}
