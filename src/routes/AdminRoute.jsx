import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wrap admin-only pages, e.g.:
// <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return <div className="p-8 text-center">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return children
}
