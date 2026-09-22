import { useEffect, useState } from 'react'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

// Subscribes to the "packages" collection and stays in sync live —
// if an admin adds a package elsewhere, this list updates without a refresh.
export function usePackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'packages'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc'),
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPackages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        console.error('usePackages error:', err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { packages, loading }
}
