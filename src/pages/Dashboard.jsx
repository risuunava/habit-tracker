import { Link } from "react-router-dom";
import { useAuthState } from "../hooks/useAuth";
import { useHabits } from "../hooks/useHabits";
import Navbar from "../components/Navbar";
import HabitCard from "../components/HabitCard";

export default function Dashboard() {
  const { user } = useAuthState();
  const { habits, globalStats } = useHabits();

  const activeHabits = habits.filter(h => !h.isArchived);

  // Heatmap generation
  const days = 365;
  const heatmapCells = [];
  const today = new Date();
  today.setHours(0,0,0,0);
  
  // Create last 365 days
  for(let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = globalStats.heatmapData[dateStr] || 0;
    
    let colorClass = 'bg-surface-container';
    if (count === 1) colorClass = 'bg-primary/20';
    else if (count === 2) colorClass = 'bg-primary/40';
    else if (count === 3) colorClass = 'bg-primary/70';
    else if (count > 3) colorClass = 'bg-primary';

    heatmapCells.push(
      <div key={dateStr} title={`${dateStr}: ${count} habits`} className={`w-3.5 h-3.5 rounded-sm ${colorClass} transition-colors hover:ring-2 hover:ring-primary-container/30 cursor-pointer`} />
    );
  }

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const maxWeekly = Math.max(...globalStats.weeklyActivity, 1); // prevent division by zero

  return (
    <div className="min-h-screen font-body-md text-on-surface bg-background pb-32">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-padding py-4 w-full">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Daily Mindset</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest border border-surface-variant">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                {user?.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="pt-24 max-w-5xl mx-auto px-container-padding w-full flex flex-col relative">
        {/* Hero Header */}
        <section className="mb-section-margin flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-label-md text-label-md px-3 py-1 bg-surface-container-high rounded-full text-on-surface-variant">Overview</span>
            </div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Your Journey</h2>
            <p className="text-on-surface-variant max-w-md">Stay consistent and build healthy habits every single day.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/habit/new" className="flex-1 md:flex-none px-6 py-3 rounded-full bg-primary text-on-primary font-label-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95 shadow-sm">
              <span className="material-symbols-outlined text-xl">add</span>
              Tambah Kebiasaan
            </Link>
          </div>
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-card-gap mb-12">
          
          {/* Current Streak */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-3xl p-container-padding shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] border border-surface-container flex flex-col justify-between animate-fade-in" style={{animationDelay: '100ms'}}>
            <div className="flex justify-between items-start">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Current Streak</p>
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
            </div>
            <div className="mt-4">
              <h3 className="font-display-lg text-display-lg text-primary">{globalStats.currentStreak}</h3>
              <p className="font-body-md text-on-surface-variant">Days in a row</p>
            </div>
            <div className="mt-6 pt-6 border-t border-surface-container flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm">Personal Best: {globalStats.longestStreak} days</span>
              <span className="material-symbols-outlined text-sm">trending_up</span>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl p-container-padding shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] border border-surface-container animate-fade-in" style={{animationDelay: '200ms'}}>
            <div className="flex justify-between items-center mb-6">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Weekly Activity</p>
            </div>
            <div className="flex items-end justify-between h-40 gap-2 px-2">
              {globalStats.weeklyActivity.map((count, idx) => {
                const heightPercentage = Math.max((count / maxWeekly) * 100, 5); // min 5% for visibility
                const isToday = new Date().getDay() === (idx === 6 ? 0 : idx + 1);
                
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                    <div className="w-full bg-primary-container/10 rounded-full h-full relative group">
                      <div 
                        className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-700" 
                        style={{ height: `${heightPercentage}%` }}
                      ></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-background text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {count} tasks
                      </div>
                    </div>
                    <span className={`font-label-sm text-label-sm ${isToday ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                      {daysOfWeek[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Consistency Heatmap */}
          <div className="md:col-span-12 bg-surface-container-lowest rounded-3xl p-container-padding shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] border border-surface-container animate-fade-in" style={{animationDelay: '300ms'}}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface">Consistency Heatmap</h4>
                <p className="text-on-surface-variant font-body-md">Your past 365 days at a glance</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant">Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-surface-container"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary/70"></div>
                    <div className="w-3 h-3 rounded-sm bg-primary"></div>
                  </div>
                  <span className="text-xs text-on-surface-variant">More</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 pb-2" style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}>
                {heatmapCells}
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="md:col-span-12 bg-surface-container-lowest rounded-3xl p-container-padding shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] border border-surface-container animate-fade-in" style={{animationDelay: '400ms'}}>
            <h4 className="font-headline-md text-headline-md text-on-surface mb-6">Achievements</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative ${globalStats.currentStreak >= 3 ? 'bg-secondary-container text-secondary' : 'bg-surface-container-high text-on-surface-variant/40 grayscale'}`}>
                  <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">3-Day Streak</p>
                  <p className="text-[10px] text-on-surface-variant">Starter pack</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative ${globalStats.currentStreak >= 7 ? 'bg-primary-fixed text-primary' : 'bg-surface-container-high text-on-surface-variant/40 grayscale'}`}>
                  <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>event_available</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">7-Day Streak</p>
                  <p className="text-[10px] text-on-surface-variant">Consistency king</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative ${globalStats.currentStreak >= 30 ? 'bg-tertiary-fixed text-tertiary' : 'bg-surface-container-high text-on-surface-variant/40 grayscale'}`}>
                  <span className="material-symbols-outlined text-3xl">celebration</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">30-Day Streak</p>
                  <p className="text-[10px] text-on-surface-variant">{globalStats.currentStreak >= 30 ? 'Unlocked!' : 'Locked'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Habits List */}
        <div className="mb-6">
          <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">Today's Habits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {activeHabits.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 px-6 rounded-3xl bg-surface-container-low border border-dashed border-outline-variant mt-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto mb-4 text-3xl">🌱</div>
                <h3 className="text-headline-md mb-2">Belum ada kebiasaan</h3>
                <p className="text-body-md text-on-surface-variant max-w-sm mx-auto mb-8">Mulai perjalanan sehatmu sekarang dengan menambahkan kebiasaan kecil yang bermakna.</p>
              </div>
            ) : (
              activeHabits.map(habit => (
                <HabitCard key={habit.id} habit={habit} />
              ))
            )}
          </div>
        </div>

      </main>

      <Navbar />
    </div>
  );
}
