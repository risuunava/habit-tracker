import { Link } from "react-router-dom";
import { useAuthState } from "../hooks/useAuth";
import { useHabits } from "../hooks/useHabits";
import HabitCard from "../components/HabitCard";

export default function Habits() {
  const { user } = useAuthState();
  const { habits } = useHabits();

  const activeHabits = habits.filter(h => !h.isArchived);

  return (
    <div className="font-body-md text-on-surface bg-background pb-32 min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-16rem)] z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-padding py-4">
        <div className="flex items-center gap-4">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">All Habits</h1>
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
        <section className="mb-section-margin flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Manage Habits</h2>
            <p className="text-on-surface-variant max-w-md">View and edit all your active and archived habits.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/habit/new" className="flex-1 md:flex-none px-6 py-3 rounded-full bg-primary text-on-primary font-label-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95 shadow-sm">
              <span className="material-symbols-outlined text-xl">add</span>
              Add Habit
            </Link>
          </div>
        </section>

        {/* Habits List */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
            {activeHabits.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 px-6 rounded-3xl bg-surface-container-low border border-dashed border-outline-variant mt-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mx-auto mb-4 text-3xl">🌱</div>
                <h3 className="text-headline-md mb-2">No habits yet</h3>
                <p className="text-body-md text-on-surface-variant max-w-sm mx-auto mb-8">Start your journey today by adding a new meaningful habit.</p>
              </div>
            ) : (
              activeHabits.map(habit => (
                <HabitCard key={habit.id} habit={habit} />
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
