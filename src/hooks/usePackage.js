import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

export function usePackage(packageId) {
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!packageId) return
    const unsubscribe = onSnapshot(
      doc(db, 'packages', packageId),
      (snap) => {
        setPkg(snap.exists() ? { id: snap.id, ...snap.data() } : null)
        setLoading(false)
      },
      (err) => {
        console.error('usePackage error:', err)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [packageId])

  return { pkg, loading }
}
