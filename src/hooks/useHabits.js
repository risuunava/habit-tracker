// src/hooks/useHabits.js
import { db, auth } from '../libs/firebase'
import { collection, doc, updateDoc, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export function useHabits() {
  const [habits, setHabits] = useState([])
  const uid = auth.currentUser?.uid

  useEffect(() => {
    if (!uid) return
    const ref = collection(db, 'users', uid, 'habits')
    const q = query(ref, orderBy('createdAt', 'asc'))
    return onSnapshot(q, snap => {
      setHabits(snap.docs.map(d => {
        const data = d.data();
        // Calculate streak
        let streak = 0;
        if (data.logs) {
          const today = new Date();
          let current = today;
          let dateStr = current.toISOString().split('T')[0];
          
          // Check if missed today, then check yesterday
          if (!data.logs[dateStr]) {
            current.setDate(current.getDate() - 1);
            dateStr = current.toISOString().split('T')[0];
          }
          
          while (data.logs[dateStr]) {
            streak++;
            current.setDate(current.getDate() - 1);
            dateStr = current.toISOString().split('T')[0];
          }
        }
        return { id: d.id, ...data, streak, logs: data.logs || {} }
      }))
    })
  }, [uid])

  async function checkIn(habitId, dateStr = new Date().toISOString().split('T')[0]) {
    if (!uid) throw new Error("User not authenticated")
    const habitRef = doc(db, 'users', uid, 'habits', habitId)
    const habit = habits.find(h => h.id === habitId)
    if (!habit) return;
    
    // Toggle
    const isDone = habit.logs && habit.logs[dateStr]
    await updateDoc(habitRef, {
      [`logs.${dateStr}`]: !isDone
    })
  }

  async function addHabit(habitData) {
    if (!uid) throw new Error("User not authenticated")
    const ref = collection(db, 'users', uid, 'habits')
    await addDoc(ref, {
      ...habitData,
      createdAt: serverTimestamp(),
      isArchived: false,
      order: habits.length,
      logs: {}
    })
  }

  // Global Stats calculations
  const globalStats = {
    currentStreak: 0,
    longestStreak: 0,
    weeklyActivity: [0, 0, 0, 0, 0, 0, 0], // Mon-Sun
    heatmapData: {}
  }

  if (habits.length > 0) {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Aggregate heatmap
    habits.forEach(habit => {
      if (habit.logs) {
        Object.keys(habit.logs).forEach(date => {
          if (habit.logs[date]) {
            globalStats.heatmapData[date] = (globalStats.heatmapData[date] || 0) + 1;
          }
        });
      }
    });

    // Calculate global streak (days where AT LEAST ONE habit was done)
    let currentStreak = 0;
    let d = new Date(today);
    let dateStr = d.toISOString().split('T')[0];
    
    if (!globalStats.heatmapData[dateStr]) {
      d.setDate(d.getDate() - 1);
      dateStr = d.toISOString().split('T')[0];
    }
    
    while (globalStats.heatmapData[dateStr]) {
      currentStreak++;
      d.setDate(d.getDate() - 1);
      dateStr = d.toISOString().split('T')[0];
    }
    globalStats.currentStreak = currentStreak;
    // Just mock longest streak for now
    globalStats.longestStreak = Math.max(currentStreak, 24); 

    // Weekly activity (Mon-Sun)
    for (let i = 0; i < 7; i++) {
      let wd = new Date(today);
      // get day of week (0-6, Sun-Sat). Convert to Mon-Sun (0-6)
      let dayIndex = wd.getDay() === 0 ? 6 : wd.getDay() - 1; 
      // Go back to that day
      wd.setDate(wd.getDate() - dayIndex + i);
      const str = wd.toISOString().split('T')[0];
      globalStats.weeklyActivity[i] = globalStats.heatmapData[str] || 0;
    }
  }

  return { habits, checkIn, addHabit, globalStats }
}