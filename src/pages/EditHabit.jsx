import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

export default function EditHabit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, updateHabit, deleteHabit } = useHabits();
  const { user } = useAuthState();
  
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICONS[0]);
  const [colorHex, setColorHex] = useState(COLORS[0].hex);
  const [frequency, setFrequency] = useState("daily");
  
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      setName(habit.name);
      setIcon(habit.icon || ICONS[0]);
      setColorHex(habit.color || COLORS[0].hex);
      setFrequency(habit.frequency || "daily");
    }
  }, [id, habits]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await updateHabit(id, { name, icon, color: colorHex, frequency });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah kebiasaan");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteHabit(id);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus kebiasaan");
      setDeleteLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="font-body-md text-on-surface pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-16rem)] max-w-2xl z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-container-padding py-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">Edit Habit</h1>
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

      <main className="pt-24 px-container-padding max-w-2xl mx-auto">
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

          {/* Delete Action */}
          <div className="pb-16 pt-4 border-t border-surface-variant text-center">
            {!showConfirm ? (
              <button 
                type="button"
                onClick={() => setShowConfirm(true)}
                className="text-error font-label-md py-2 px-6 hover:bg-error-container rounded-full transition-colors"
              >
                Delete Habit
              </button>
            ) : (
              <div className="bg-error-container text-on-error-container p-6 rounded-2xl">
                <p className="font-label-md mb-4">Are you sure you want to delete this habit?</p>
                <div className="flex justify-center gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="px-6 py-2 bg-surface text-on-surface rounded-full font-label-sm hover:brightness-95 transition-all shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="px-6 py-2 bg-error text-on-error rounded-full font-label-sm hover:brightness-90 transition-all shadow-sm flex items-center justify-center min-w-[120px]"
                  >
                    {deleteLoading ? <span className="material-symbols-outlined animate-spin text-[16px]">refresh</span> : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Bottom Action */}
          <div className="fixed bottom-0 left-0 w-full md:w-[calc(100%-16rem)] lg:w-[calc(100%-16rem)] md:left-64 p-container-padding bg-background/80 backdrop-blur-xl z-50">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full max-w-2xl mx-auto py-4 bg-primary text-on-primary rounded-full font-headline-md text-headline-md shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform hover:bg-primary-container disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
