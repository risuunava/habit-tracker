import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmailLogin, setShowEmailLogin] = useState(false);

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

  const friendlyError = (code) => {
    const map = {
      "auth/user-not-found": "Email tidak terdaftar.",
      "auth/wrong-password": "Password salah.",
      "auth/invalid-email": "Format email tidak valid.",
      "auth/invalid-credential": "Email atau password salah.",
      "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
      "auth/popup-closed-by-user": "Login Google dibatalkan.",
    };
    return map[code] || "Terjadi kesalahan. Coba lagi.";
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      await loginWithEmail(email, password);
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
          <Link to="/register" className="px-6 py-2 bg-surface-container-high text-on-surface rounded-full text-label-md hover:bg-surface-container-highest transition-colors font-bold">
            Daftar Gratis
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="px-container-padding py-section-margin max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md uppercase tracking-wider">Mindful Lifestyle</span>
                <h1 className="text-display-lg lg:text-[56px] text-on-background leading-tight">
                  Your path to clarity begins with <span className="text-primary italic">intention</span>.
                </h1>
                <p className="text-body-lg text-on-surface-variant max-w-lg">
                  Transform your daily routine into a series of mindful victories. No pressure, no stress—just growth at your own pace.
                </p>
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-error-container text-on-error-container text-body-md border border-error/20">
                  {error}
                </div>
              )}

              {showEmailLogin ? (
                <form onSubmit={handleEmail} className="bg-surface-container-lowest p-6 rounded-2xl soft-shadow border border-surface-variant max-w-sm">
                  <h3 className="text-headline-md mb-4 text-primary">Login Email</h3>
                  <div className="space-y-4">
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
                    </div>
                    <button
                      type="submit"
                      disabled={loading || googleLoading}
                      className="w-full flex items-center justify-center py-3 bg-primary text-on-primary rounded-full text-label-md hover:brightness-110 active:scale-95 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    >
                      {loading ? "Memproses..." : "Masuk Sekarang"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailLogin(false)}
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
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary rounded-full text-label-md hover:brightness-110 active:scale-95 transition-all soft-shadow shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  >
                    {/* Official Google Logo SVG */}
                    <span className="w-5 h-5 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-3.5 h-3.5">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                    </span>
                    {googleLoading ? "Loading..." : "Login with Google"}
                  </button>
                  
                  <button
                    onClick={() => setShowEmailLogin(true)}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-surface-container-high text-on-surface rounded-full text-label-md hover:bg-surface-container-highest active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined">mail</span>
                    Email Login
                  </button>
                </div>
              )}

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  <img alt="User" className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVWbwr_JHyMf0tLR1Nh44wGjo3GUGjbEHF7SNoGcslQfTlz6uvuhOp4dCfx6XALGGN_J3fi95X9OwWT8ZhY2CVD868Bd7G6JOv3c8CKM8reI_EH-KVqVDcLIT-Z8gnfLe3ef-_zhqtyo_n4i83MBCS5c7tRePDBSbMdp-cTRJz-zftNaVEJoPkCd2zervssg49S_3eVdp8bVe4EpycJtVx8vZbj4e68GlzLzQpMcjfYc3JEyYycDlqz8V1OjpLGNCZA0OjPvSAJ5Q5"/>
                  <img alt="User" className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBScacxi_8Gtd49IjzreqqkVUioxgB4G3K2sECtFLLLh560ZPhCRnl7BN4W-OWUxH9U-4r6C5bnBIXiYRnS7KR6-xygYp6QZjL0ccj_GELhExfsVweX6bnQe9YfLZUXKVFxHILD5lfcOVjKdu_nF594WlJUZt7l5W-_H_01iks5rAvq4fTS67KCo87HJpZY5vFCVyN4t82h9Ram-QyivRPmd_UcuPAOlmDHRgWt7ARlltKU1ioT6-XHkXP8ARO-dRGCT3PhNVNsHPDB"/>
                  <img alt="User" className="w-10 h-10 rounded-full border-2 border-background object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWbtb869HFkjFDBBkVUizlNlOUvCIJnJ1maGKQ0u2u5UPQ91ia4Ax_HqcDwbtIG-WTN_HfE9ikhWY-3XGSxFKHHU3P6S8TwFCUzDUokNvjSOJUA7YaYfvEwcPcg74qCfGBCyTaGZgZcO9-H2Qn9ZWYZYHN9oK4FXyVBKGZjhV9JQdgKEwz_xwn0WBpvzSC2kILLlqnQh062_j7GNgSab73GXz6go5ImTIlbFHZtVQH3gghKSXDr_7aFaaj7cMnGlSRTcpthRl8TseA"/>
                </div>
                <p className="text-label-md text-on-surface-variant">Join <span className="text-primary font-bold">12,000+</span> seekers</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative order-first lg:order-last">
              <div className="aspect-square rounded-[40px] overflow-hidden soft-shadow bg-surface-container">
                <img alt="Mindful Morning" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBexxiyRbXWlmaj1hoidkj9-uQly1kEoEcTPFB51BzMq6n3gBxi6dn7u2HHCRxo2eobSkTRl5415GGKfrSZlcSNo5O5DVx_NCAGI74WIZ3a1Tg8zxZMkzW7nhlp-SWkQTLsSPAdDLWJM8qLuq224_mKo6fW9GmyB9m1Yp5Afj45uPtNqfUDgQvO7IaLWYAWZw_WDIRrjV4JLfEHCtH_pFKWTMkkB5stVmM7ParyXYazPcfriiie8cdwmvvJ46Bb3yi13VIQ0Cdx3Hil"/>
              </div>
              
              {/* Floating Data Card */}
              <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl soft-shadow border border-white/40 hidden sm:block animate-[bounce-slow_4s_ease-in-out_infinite]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary-container">favorite</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-tighter">Heart Rate</div>
                    <div className="text-headline-md font-bold text-primary">72 BPM</div>
                  </div>
                </div>
                <div className="h-8 flex items-end gap-1">
                  <div className="w-1 bg-primary/20 h-4 rounded-full"></div>
                  <div className="w-1 bg-primary/40 h-6 rounded-full"></div>
                  <div className="w-1 bg-primary h-8 rounded-full"></div>
                  <div className="w-1 bg-primary/60 h-5 rounded-full"></div>
                  <div className="w-1 bg-primary/30 h-3 rounded-full"></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Value Propositions */}
        <section className="px-container-padding py-section-margin max-w-6xl mx-auto mt-16">
          <h2 className="text-headline-lg text-center mb-12">Designed for your <span className="text-primary">well-being</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap">
            <div className="md:col-span-2 bg-surface-container-low p-8 rounded-[32px] flex flex-col justify-between hover:bg-surface-container transition-colors">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary">spa</span>
                </div>
                <h3 className="text-headline-md mb-2">Absolute Simplicity</h3>
                <p className="text-body-md text-on-surface-variant max-w-md">No complicated tracking systems or overwhelming data. Just tap and grow. Our interface is designed to breathe with you.</p>
              </div>
              <div className="mt-8 flex gap-4 overflow-hidden">
                <div className="px-6 py-3 bg-white rounded-full text-label-md soft-shadow">Meditation</div>
                <div className="px-6 py-3 bg-white rounded-full text-label-md soft-shadow">Hydration</div>
                <div className="px-6 py-3 bg-white rounded-full text-label-md soft-shadow">Walking</div>
              </div>
            </div>
            
            <div className="bg-primary text-on-primary p-8 rounded-[32px] flex flex-col justify-between items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-on-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">volunteer_activism</span>
              </div>
              <div>
                <h3 className="text-headline-md mb-2 text-white">Always Free</h3>
                <p className="text-label-md font-medium opacity-80">Health should never be gated. All core features are free, forever.</p>
              </div>
              <div className="mt-8 text-display-lg leading-none">$0</div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </div>
  );
}
