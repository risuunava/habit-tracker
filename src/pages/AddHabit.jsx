import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useHabits } from "../hooks/useHabits";
import { useAuthState } from "../hooks/useAuth";

const ICONS = ["directions_run", "water_drop", "menu_book", "self_improvement", "bedtime", "restaurant", "fitness_center", "psychology", "directions_bike", "more_horiz"];
const COLORS = [
  { name: "primary-container", hex: "#2d6a4f" },
  { name: "secondary", hex: "#356668" },
  { name: "tertiary", hex: "#713900" },
  { name: "peach", hex: "#E07A5F" },
  { name: "sage", hex: "#81B29A" },
  { name: "sand", hex: "#F2CC8F" }
];

export default function AddHabit() {
  const navigate = useNavigate();
  const { addHabit } = useHabits();
  const { user } = useAuthState();
  
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICONS[0]);
  const [colorHex, setColorHex] = useState(COLORS[0].hex);
  const [frequency, setFrequency] = useState("daily");
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await addHabit({ name, icon, color: colorHex, frequency });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan kebiasaan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-body-md text-on-surface">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-16rem)] max-w-2xl z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-padding py-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Add Habit</h1>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary font-bold bg-surface-container-highest">
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>
      </header>

      <main className="pt-24 px-container-padding max-w-2xl mx-auto pb-32">
        <form onSubmit={handleSubmit} className="space-y-section-margin">
          
          {/* Habit Name Field */}
          <div className="space-y-3">
            <label className="font-label-md text-label-md text-on-surface-variant px-1 uppercase">Habit Name</label>
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning Meditation"
                className="w-full h-14 px-6 rounded-xl border-none bg-surface-container-low text-body-lg focus:ring-2 focus:ring-primary-container transition-all placeholder:text-on-surface-variant/40"
                required
              />
            </div>
          </div>

          {/* Icon Selection */}
          <div className="space-y-3">
            <label className="font-label-md text-label-md text-on-surface-variant px-1 uppercase">Choose an Icon</label>
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 p-4 bg-surface-container-low rounded-xl">
              {ICONS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`group flex items-center justify-center aspect-square rounded-xl transition-all active:scale-90 ${icon === i ? 'bg-primary-fixed border-2 border-primary' : 'bg-background hover:bg-primary-fixed border-2 border-transparent'}`}
                >
                  <span className={`material-symbols-outlined ${icon === i ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>{i}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <label className="font-label-md text-label-md text-on-surface-variant px-1 uppercase">Theme Color</label>
            <div className="flex flex-wrap gap-4 p-4 bg-surface-container-low rounded-xl">
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColorHex(c.hex)}
                  className={`w-10 h-10 rounded-full transition-all active:scale-90 hover:ring-2 hover:ring-offset-2 flex items-center justify-center`}
                  style={{ 
                    backgroundColor: c.hex,
                    boxShadow: colorHex === c.hex ? `0 0 0 2px ${c.hex}, 0 0 0 4px #faf9f5 inset` : 'none'
                  }}
                >
                  {colorHex === c.hex && <div className="w-4 h-4 rounded-full bg-white/30" />}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency Selection */}
          <div className="space-y-3">
            <label className="font-label-md text-label-md text-on-surface-variant px-1 uppercase">Frequency</label>
            <div className="flex p-1.5 bg-surface-container-low rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setFrequency("daily")}
                className={`flex-1 py-3 px-4 rounded-lg font-label-md text-label-md transition-all ${frequency === "daily" ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-background'}`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setFrequency("weekly")}
                className={`flex-1 py-3 px-4 rounded-lg font-label-md text-label-md transition-all ${frequency === "weekly" ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-background'}`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Goal Setting */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Daily Goal</label>
              <span className="font-label-sm text-label-sm text-primary font-bold">1 Session</span>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
              <input type="range" min="1" max="10" defaultValue="1" className="w-full h-2 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary" />
              <div className="flex justify-between font-label-sm text-on-surface-variant/60">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* Inline Submit Button */}
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full py-4 bg-primary text-on-primary rounded-2xl font-label-md text-label-md shadow-md shadow-primary/20 active:scale-[0.98] transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            {loading ? "Saving..." : "Save Habit"}
          </button>
        </form>
      </main>
    </div>
  );
}
