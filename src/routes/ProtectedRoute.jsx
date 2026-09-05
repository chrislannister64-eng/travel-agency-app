import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wrap any page that requires a logged-in user, e.g.:
// <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="p-8 text-center">Loading…</div>
  if (!user) return <Navigate to="/login" replace />

  return children
}
