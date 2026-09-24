import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const demoPackages = [
  {
    id: 'iceland-ring-road',
    title: 'Iceland Ring Road Adventure',
    destination: 'Iceland',
    duration: '8 days / 7 nights',
    price: 1890,
    currency: 'USD',
    image: 'dubai.jpg',
    tagline: 'Glaciers, waterfalls and wide-open roads.',
    description: 'A carefully paced self-drive journey through Iceland’s most unforgettable landscapes, with handpicked stays and local guidance at every turn.',
    inclusions: ['Handpicked hotels with breakfast', 'Rental car and unlimited mileage', 'Personal digital travel guide', '24/7 local support'],
    itinerary: ['Arrive in Reykjavik', 'Golden Circle and South Coast', 'Glacier Lagoon and East Fjords', 'Lake Myvatn and North Iceland', 'Whale watching and Reykjavik'],
  },
  {
    id: 'japan-highlights',
    title: 'Japan Highlights',
    destination: 'Japan',
    duration: '10 days / 9 nights',
    price: 2490,
    currency: 'USD',
    image: 'tokyo.jpg',
    tagline: 'Ancient traditions meet electric city life.',
    description: 'Move from neon-lit Tokyo to Kyoto’s quiet temples and Osaka’s food scene with rail travel, thoughtful hotels and room to explore.',
    inclusions: ['Central hotels with breakfast', 'Japan Rail Pass', 'Private arrival transfer', 'Local food and culture recommendations'],
    itinerary: ['Tokyo city discovery', 'Mount Fuji day trip', 'Bullet train to Kyoto', 'Kyoto temples and Nara', 'Osaka food and departure'],
  },
  {
    id: 'aegean-islands',
    title: 'Aegean Island Escape',
    destination: 'Greece',
    duration: '7 days / 6 nights',
    price: 1640,
    currency: 'USD',
    image: 'santorini.jpg',
    tagline: 'Sunset villages, blue water and slow mornings.',
    description: 'A relaxed island-hopping itinerary combining Santorini’s iconic caldera with the quieter beaches and tavernas of Naxos.',
    inclusions: ['Boutique island hotels', 'Ferry tickets between islands', 'Daily breakfast', 'Curated restaurant and beach guide'],
    itinerary: ['Santorini arrival', 'Caldera walk and wine tasting', 'Ferry to Naxos', 'Beach day and mountain villages', 'Return to Santorini'],
  },
]

// Subscribes to the "packages" collection and stays in sync live —
// if an admin adds a package elsewhere, this list updates without a refresh.
export function usePackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'packages'),
      where('status', '==', 'active'),
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const firestorePackages = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0
            const bTime = b.createdAt?.toMillis?.() || 0
            return bTime - aTime
          })

        setPackages(firestorePackages.length ? firestorePackages : demoPackages)
        setLoading(false)
      },
      (err) => {
        console.error('usePackages error:', err)
        // Do not replace an already loaded Firestore catalogue with demo data
        // if a later reconnect/listener error occurs.
        setPackages((current) => current.length ? current : demoPackages)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [])

  return { packages, loading }
}
