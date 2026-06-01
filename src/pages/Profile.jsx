import { useAuthState, logout } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuthState();

  return (
    <div className="font-body-md text-on-background pb-32 max-w-2xl mx-auto w-full">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-16rem)] max-w-2xl z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-padding py-4">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">Daily Mindset</h1>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 transition-transform">
            notifications
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary font-bold bg-surface-container-highest">
                {user?.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24 px-container-padding space-y-section-margin">
        {/* User Identity Section */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-surface-container-lowest">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User Profile Large" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary font-display-lg text-4xl bg-surface-container-highest">
                  {user?.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            <button className="absolute bottom-1 right-1 bg-primary text-on-primary p-2 rounded-full shadow-lg active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">{user?.displayName || "Pengguna"}</h2>
            <p className="font-body-md text-on-surface-variant">{user?.email}</p>
          </div>
        </section>

        {/* Install PWA Button */}
        <section className="bg-primary-container text-on-primary-container p-6 rounded-xl flex items-center justify-between shadow-md active:scale-[0.98] transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-3 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary">install_mobile</span>
            </div>
            <div>
              <h3 className="font-label-md text-label-md font-bold">Install as App</h3>
              <p className="text-label-sm opacity-90">Access your habits instantly from your home screen</p>
            </div>
          </div>
          <span className="material-symbols-outlined">chevron_right</span>
        </section>

        {/* Settings List */}
        <div className="space-y-card-gap">
          {/* Notification Settings */}
          <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl overflow-hidden shadow-sm">
            <div className="p-container-padding">
              <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-4">Notifications</h3>
              <div className="space-y-6">
                {/* Global Reminder */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary">schedule</span>
                    <div>
                      <p className="font-body-md font-bold">Global Morning Reminder</p>
                      <p className="text-label-sm text-on-surface-variant">Daily at 07:30 AM</p>
                    </div>
                  </div>
                  <input className="bg-surface-container-low border-none rounded-lg font-label-md text-primary focus:ring-primary w-24 h-10 px-2" type="time" defaultValue="07:30" />
                </div>
                
                <div className="h-px bg-surface-variant opacity-30"></div>
                
                {/* Habit Specific Reminders */}
                <div className="space-y-4">
                  <p className="font-label-sm text-on-surface-variant">Per-Habit Reminders</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-on-secondary-fixed">water_drop</span>
                      </div>
                      <p className="font-body-md">Hydration Tracker</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-label-sm text-on-surface-variant">Hourly</span>
                      <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-on-tertiary-fixed">self_improvement</span>
                      </div>
                      <p className="font-body-md">Mindfulness Meditation</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-label-sm text-on-surface-variant">Off</span>
                      <div className="w-10 h-5 bg-surface-variant rounded-full relative cursor-pointer">
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow"></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl overflow-hidden shadow-sm">
            <div className="p-container-padding">
              <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-4">Account</h3>
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">lock</span>
                      <span className="font-body-md text-on-surface">Security & Password</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">cloud_sync</span>
                      <span className="font-body-md text-on-surface">Data Backup & Sync</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-surface-container-low transition-colors group">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">verified_user</span>
                      <span className="font-body-md text-on-surface">Privacy Policy</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button onClick={logout} className="w-full flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-error-container/20 transition-colors group mt-4">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-error">logout</span>
                      <span className="font-body-md text-error">Logout</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer / Version */}
        <footer className="text-center py-8">
          <p className="text-label-sm text-on-surface-variant opacity-60">Daily Mindset v2.4.0</p>
          <p className="text-label-sm text-on-surface-variant opacity-40 mt-1">Nurturing your journey to a better self.</p>
        </footer>
      </main>
    </div>
  );
}
