import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fires whenever login state changes (login, logout, token refresh).
    // This is the single source of truth for "who is logged in".
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Custom claims live on the ID token, not in Firestore, so they
        // can't be faked by a client editing their own user document.
        const tokenResult = await firebaseUser.getIdTokenResult()
        setIsAdmin(!!tokenResult.claims.admin)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function signup({ name, email, password }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(cred.user, { displayName: name })
    // We also keep a mirror of basic profile info in Firestore, since
    // Firebase Auth itself only stores a handful of fields.
    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email,
      role: 'customer',
      createdAt: serverTimestamp(),
    })
    return cred.user
  }

  async function login({ email, password }) {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred.user
  }

  async function logout() {
    await signOut(auth)
  }

  const value = { user, isAdmin, loading, signup, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider')
  return ctx
}
