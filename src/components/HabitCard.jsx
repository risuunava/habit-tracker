// src/components/HabitCard.jsx
import { useHabits } from '../hooks/useHabits'

export default function HabitCard({ habit }) {
  const { checkIn } = useHabits()
  const today = new Date().toISOString().split('T')[0]
  const isDone = habit.logs?.[today]

  return (
    <div className="flex items-center justify-between p-6 rounded-2xl bg-surface-container-lowest soft-shadow border border-surface-variant hover:border-outline-variant transition-colors animate-fade-in">
      <div className="flex items-center gap-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${habit.color}15`, color: habit.color }}
        >
          {habit.icon || '📌'}
        </div>
        <div>
          <p className="text-headline-md text-on-surface">{habit.name}</p>
          <p className="text-label-sm text-on-surface-variant mt-1">
            Streak: <span className="text-primary font-bold">{habit.streak ?? 0}</span> hari
          </p>
        </div>
      </div>
      <button
        onClick={() => checkIn(habit.id)}
        className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer
          ${isDone ? 'bg-primary border-primary text-on-primary shadow-[0_4px_12px_rgba(15,82,56,0.3)]' : 'border-outline-variant hover:border-outline text-transparent hover:text-outline-variant bg-surface'}`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: isDone ? "'FILL' 1, 'wght' 700" : "'wght' 600" }}>
          check
        </span>
      </button>
    </div>
  )
}