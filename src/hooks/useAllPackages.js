import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

// Same idea as usePackages, but for the admin screen — no status filter,
// since admins need to see drafts and archived packages too.
export function useAllPackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPackages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        console.error('useAllPackages error:', err)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { packages, loading }
}
