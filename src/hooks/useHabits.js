// src/hooks/useHabits.js
import { db, auth } from '../lib/firebase'
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export function useHabits() {
  const [habits, setHabits] = useState([])
  const uid = auth.currentUser?.uid

  useEffect(() => {
    if (!uid) return
    const ref = collection(db, 'users', uid, 'habits')
    return onSnapshot(ref, snap => {
      setHabits(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
  }, [uid])

  async function checkIn(habitId) {
    const today = new Date().toISOString().split('T')[0]
    const logRef = doc(db, 'users', uid, 'habits', habitId, 'logs', today)
    await setDoc(logRef, { done: true })
  }

  return { habits, checkIn }
}