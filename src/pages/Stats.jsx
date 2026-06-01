import { useHabits } from "../hooks/useHabits";
import { useAuthState } from "../hooks/useAuth";

export default function Stats() {
  const { user } = useAuthState();
  const { globalStats } = useHabits();

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
  const maxWeekly = Math.max(...globalStats.weeklyActivity, 1);

  return (
    <div className="font-body-md text-on-surface bg-background pb-32">
      {/* Top Header */}
      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-16rem)] z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-padding py-4">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Statistics</h1>
        </div>
        <div className="flex items-center gap-4">
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
      
      <main className="pt-24 max-w-5xl mx-auto px-container-padding w-full flex flex-col relative">
        <section className="mb-section-margin">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Your Progress</h2>
          <p className="text-on-surface-variant max-w-md">Track your consistency and analyze your journey over time.</p>
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
                const heightPercentage = Math.max((count / maxWeekly) * 100, 5);
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
      </main>
    </div>
  );
}
