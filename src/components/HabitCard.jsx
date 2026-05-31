// src/components/HabitCard.jsx
import { useHabits } from '../hooks/useHabits'

export default function HabitCard({ habit }) {
  const { checkIn } = useHabits()
  const today = new Date().toISOString().split('T')[0]
  const isDone = habit.logs?.[today]

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
      <div>
        <p className="font-medium">{habit.name}</p>
        <p className="text-sm text-gray-400">Streak: {habit.streak ?? 0} hari</p>
      </div>
      <button
        onClick={() => checkIn(habit.id)}
        className={`w-10 h-10 rounded-full border-2 transition-all
          ${isDone ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
      >
        {isDone ? '✓' : ''}
      </button>
    </div>
  )
}