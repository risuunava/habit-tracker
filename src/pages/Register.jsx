import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerWithEmail, loginWithGoogle } from "../hooks/useAuth";

function CheckItem({ text, ok }) {
  return (
    <div className={`flex items-center gap-2 text-label-sm transition-colors duration-200 ${ok ? "text-primary" : "text-on-surface-variant"}`}>
      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${ok ? "bg-primary" : "border border-outline"}`}>
        {ok && (
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmailRegister, setShowEmailRegister] = useState(false);

  useEffect(() => {
    // Add fade-in animation
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, 100);
    });
  }, []);

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
    <div className="font-body-md text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden min-h-screen">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-padding py-4">
        <div className="text-headline-md font-bold text-primary">Habit Tracker</div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-6 py-2 bg-surface-container-high text-on-surface rounded-full text-label-md hover:bg-surface-container-highest transition-colors font-bold">
            Masuk
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-32">
        <section className="px-container-padding py-section-margin max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md uppercase tracking-wider">Mulai Sekarang</span>
                <h1 className="text-display-lg lg:text-[56px] text-on-background leading-tight">
                  Tumbuh satu kebiasaan pada <span className="text-primary italic">satu waktu</span>.
                </h1>
                <p className="text-body-lg text-on-surface-variant max-w-lg">
                  Gratis selamanya. Mulai lacak perjalanan mindfulness-mu hari ini dan capai kejernihan.
                </p>
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-error-container text-on-error-container text-body-md border border-error/20">
                  {error}
                </div>
              )}

              {showEmailRegister ? (
                <form onSubmit={handleRegister} className="bg-surface-container-lowest p-6 rounded-2xl soft-shadow border border-surface-variant max-w-sm">
                  <h3 className="text-headline-md mb-4 text-primary">Daftar Akun</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-label-sm text-on-surface-variant mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                        placeholder="Nama kamu"
                      />
                    </div>
                    <div>
                      <label className="block text-label-sm text-on-surface-variant mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                        placeholder="kamu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-label-sm text-on-surface-variant mb-1">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border-none text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                        placeholder="••••••••"
                      />
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
                      className="w-full flex items-center justify-center py-3 bg-primary text-on-primary rounded-full text-label-md hover:brightness-110 active:scale-95 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    >
                      {loading ? "Memproses..." : "Daftar Sekarang"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailRegister(false)}
                      className="w-full py-2 text-label-sm text-on-surface-variant hover:text-primary transition-colors mt-2"
                    >
                      Kembali
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleGoogle}
                    disabled={googleLoading || loading}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary rounded-full text-label-md hover:brightness-110 active:scale-95 transition-all soft-shadow"
                  >
                    <span className="w-5 h-5 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-3.5 h-3.5">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                    </span>
                    {googleLoading ? "Loading..." : "Daftar dengan Google"}
                  </button>
                  
                  <button
                    onClick={() => setShowEmailRegister(true)}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-surface-container-high text-on-surface rounded-full text-label-md hover:bg-surface-container-highest active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined">mail</span>
                    Daftar dengan Email
                  </button>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="relative order-first lg:order-last">
              <div className="aspect-square rounded-[40px] overflow-hidden soft-shadow bg-surface-container p-8 flex flex-col justify-center">
                 <div className="space-y-6">
                  {[
                    { n: "01", t: "Daftar gratis", d: "Tidak butuh kartu kredit, hanya perlu niat." },
                    { n: "02", t: "Tambah kebiasaan", d: "Pilih aktivitas mindful dan rutinitasmu." },
                    { n: "03", t: "Check-in setiap hari", d: "Bangun streak tanpa tekanan, nikmati prosesnya." },
                  ].map(({ n, t, d }) => (
                    <div key={n} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest soft-shadow">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md">
                        {n}
                      </div>
                      <div>
                        <p className="text-headline-md text-primary">{t}</p>
                        <p className="text-body-md text-on-surface-variant mt-1">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
