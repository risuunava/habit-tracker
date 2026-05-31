import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useHabits } from "../hooks/useHabits";

const ICONS = ["🏃‍♂️", "💧", "🧘‍♀️", "📖", "🥦", "💪", "😴", "🚶‍♂️"];
const COLORS = [
  { name: "Mint", hex: "#0f5238" },
  { name: "Teal", hex: "#356668" },
  { name: "Rust", hex: "#713900" },
  { name: "Sky", hex: "#2c694e" }
];

export default function AddHabit() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICONS[0]);
  const [color, setColor] = useState(COLORS[0].hex);
  const [frequency, setFrequency] = useState("daily");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addHabit } = useHabits();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await addHabit({ name, icon, color, frequency });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan kebiasaan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-body-md text-on-surface bg-background">
      {/* Header */}
      <header className="px-container-padding py-6 sticky top-0 z-40 bg-background/80 backdrop-blur-md">
        <div className="max-w-xl mx-auto flex items-center">
          <Link to="/dashboard" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors mr-4">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-headline-md text-on-surface">Tambah Kebiasaan</h1>
        </div>
      </header>

      <main className="px-container-padding py-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
          
          <div className="bg-surface-container-lowest p-6 rounded-[24px] soft-shadow border border-surface-variant">
            <label className="block text-label-md text-on-surface-variant mb-3 uppercase tracking-wider">Nama Kebiasaan</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Olahraga pagi"
              className="w-full bg-surface-container-low border-none rounded-[16px] px-4 py-4 text-body-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              required
            />
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-[24px] soft-shadow border border-surface-variant">
            <label className="block text-label-md text-on-surface-variant mb-3 uppercase tracking-wider">Ikon & Warna</label>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {ICONS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`text-2xl h-14 rounded-[16px] border-2 transition-all flex items-center justify-center ${icon === i ? 'border-primary bg-primary-container/10' : 'border-transparent bg-surface-container-low hover:bg-surface-container-high'}`}
                >
                  {i}
                </button>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  className={`w-12 h-12 rounded-full border-4 transition-all flex items-center justify-center cursor-pointer`}
                  style={{ 
                    backgroundColor: c.hex, 
                    borderColor: color === c.hex ? '#95d4b3' : 'transparent' 
                  }}
                >
                  {color === c.hex && (
                    <span className="material-symbols-outlined text-white text-[20px] font-bold">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-[24px] soft-shadow border border-surface-variant">
            <label className="block text-label-md text-on-surface-variant mb-3 uppercase tracking-wider">Frekuensi</label>
            <div className="flex gap-3 bg-surface-container-low p-1 rounded-full">
              <button
                type="button"
                onClick={() => setFrequency("daily")}
                className={`flex-1 py-3 rounded-full text-label-md transition-colors ${frequency === "daily" ? 'bg-white text-primary soft-shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Harian
              </button>
              <button
                type="button"
                onClick={() => setFrequency("weekly")}
                className={`flex-1 py-3 rounded-full text-label-md transition-colors ${frequency === "weekly" ? 'bg-white text-primary soft-shadow' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Mingguan
              </button>
            </div>
          </div>

          <div className="pt-4 pb-12">
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full bg-primary text-on-primary font-bold py-5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_4px_12px_rgba(15,82,56,0.3)] text-label-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? "Menyimpan..." : "Simpan Kebiasaan"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
