import { useState } from "react";
import { Link } from "react-router-dom";
import { registerWithEmail, loginWithGoogle } from "../hooks/useAuth";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function EyeIcon({ show }) {
  return show ? (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function CheckItem({ text, ok }) {
  return (
    <div className={`flex items-center gap-2 text-xs transition-colors duration-200 ${ok ? "text-[#1D9E75]" : "text-gray-600"}`}>
      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-200
        ${ok ? "border-[#1D9E75] bg-[#1D9E75]" : "border-gray-700"}`}>
        {ok && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      {text}
    </div>
  );
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const pwChecks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const pwStrong = Object.values(pwChecks).every(Boolean);

  const friendlyError = (code) => {
    const map = {
      "auth/email-already-in-use": "Email sudah terdaftar. Coba login.",
      "auth/invalid-email": "Format email tidak valid.",
      "auth/weak-password": "Password terlalu lemah.",
      "auth/popup-closed-by-user": "Login Google dibatalkan.",
    };
    return map[code] || "Terjadi kesalahan. Coba lagi.";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (!pwStrong) {
      setError("Password belum memenuhi syarat.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await registerWithEmail(email, password, name);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] bg-[#111] border-r border-white/5 p-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1D9E75] flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight">HabitTracker</span>
        </div>

        <div>
          <div className="w-10 h-[2px] bg-[#1D9E75] mb-6" />
          <p className="text-2xl font-light text-white leading-relaxed mb-8">
            Mulai perjalananmu<br />
            hari ini. Satu kebiasaan,<br />
            <span className="text-[#1D9E75] font-semibold">satu langkah.</span>
          </p>

          {/* Steps */}
          <div className="space-y-4">
            {[
              { n: "01", t: "Daftar gratis", d: "Tidak butuh kartu kredit" },
              { n: "02", t: "Tambah kebiasaan", d: "Pilih ikon, warna, dan frekuensi" },
              { n: "03", t: "Check-in setiap hari", d: "Bangun streak dan dapatkan XP" },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex items-start gap-4">
                <span className="text-[#1D9E75] font-mono text-xs mt-0.5 opacity-60">{n}</span>
                <div>
                  <p className="text-white text-sm font-medium">{t}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-700 text-xs">© 2026 HabitTracker</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-[#1D9E75] flex items-center justify-center">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className="text-white font-semibold">HabitTracker</span>
          </div>

          <h1 className="text-2xl font-semibold text-white mb-1">Buat akun</h1>
          <p className="text-gray-500 text-sm mb-8">Gratis selamanya. Mulai hari ini.</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
              bg-white/5 border border-white/10 text-white text-sm font-medium
              hover:bg-white/10 hover:border-white/20 transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : <GoogleIcon />}
            Daftar dengan Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-xs">atau daftar dengan email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkapmu"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                  text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-[#1D9E75]/50
                  transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kamu@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                  text-white text-sm placeholder-gray-600
                  focus:outline-none focus:border-[#1D9E75]/50
                  transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10
                    text-white text-sm placeholder-gray-600
                    focus:outline-none focus:border-[#1D9E75]/50
                    transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <EyeIcon show={showPw} />
                </button>
              </div>

              {/* Password checks */}
              {password.length > 0 && (
                <div className="mt-3 space-y-1.5 pl-1">
                  <CheckItem text="Minimal 8 karakter" ok={pwChecks.length} />
                  <CheckItem text="Mengandung huruf kapital" ok={pwChecks.upper} />
                  <CheckItem text="Mengandung angka" ok={pwChecks.number} />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 rounded-xl bg-[#1D9E75] hover:bg-[#18896A]
                text-white font-semibold text-sm tracking-wide
                transition-all duration-200 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : "Buat akun"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-[#1D9E75] hover:text-[#25c98f] font-medium transition-colors">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
