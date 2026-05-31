import { useAuthState, logout } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuthState();

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#1D9E75]/20 border border-[#1D9E75]/30 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-white mb-1">
          Halo, {user?.displayName || user?.email}! 👋
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Dashboard akan dibangun di Batch 2.
        </p>
        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm
            hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
