import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'voyage-saved-trips'

export function useSavedTrips() {
  const [savedTrips, setSavedTrips] = useState([])

  useEffect(() => {
    try {
      setSavedTrips(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    } catch (error) {
      console.error('Unable to load saved trips:', error)
    }
  }, [])

  const toggleSavedTrip = useCallback((trip) => {
    setSavedTrips((current) => {
      const exists = current.some((saved) => saved.id === trip.id)
      const next = exists ? current.filter((saved) => saved.id !== trip.id) : [...current, trip]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isSaved = useCallback((id) => savedTrips.some((trip) => trip.id === id), [savedTrips])

  return { savedTrips, toggleSavedTrip, isSaved }
}
