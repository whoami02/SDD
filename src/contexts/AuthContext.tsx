import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { saveUserProfile } from '../lib/firestore';
import { logAudit } from '../lib/audit';

export const SUPERADMIN_EMAIL = 'abhishekwani02@gmail.com';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isSuperadmin: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await saveUserProfile(firebaseUser.uid, {
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          photo: firebaseUser.photoURL,
        });
      }
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await logAudit('login', result.user.uid, result.user.email || '', {
      name: result.user.displayName,
    });
  };

  const logout = async () => {
    if (user) {
      await logAudit('logout', user.uid, user.email || '');
    }
    await signOut(auth);
  };

  const isSuperadmin = user?.email === SUPERADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, loading, isSuperadmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
