import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, type User } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { saveUserProfile } from '../lib/firestore';
import { logAudit } from '../lib/audit';

export const SUPERADMIN_EMAIL = 'abhishekwani02@gmail.com';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isSuperadmin: boolean;
  loginError: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    // Handle redirect result on page load (fallback from blocked popups)
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await logAudit('login', result.user.uid, result.user.email || '', {
          name: result.user.displayName,
        });
      }
    }).catch((err) => {
      console.error('Redirect sign-in error:', err);
      setLoginError(err.message || 'Sign-in failed. Please try again.');
    });

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
    setLoginError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await logAudit('login', result.user.uid, result.user.email || '', {
        name: result.user.displayName,
      });
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      // Popup blocked or closed — fall back to redirect flow
      if (
        error.code === 'auth/popup-blocked' ||
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/cancelled-popup-request'
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectErr: unknown) {
          const rErr = redirectErr as { message?: string };
          setLoginError(rErr.message || 'Sign-in failed. Please try again.');
        }
      } else {
        // Surface the real error (unauthorized domain, quota, etc.)
        setLoginError(error.message || 'Sign-in failed. Please try again.');
        console.error('Sign-in error:', error.code, error.message);
      }
    }
  };

  const logout = async () => {
    if (user) {
      await logAudit('logout', user.uid, user.email || '');
    }
    await signOut(auth);
  };

  const isSuperadmin = user?.email === SUPERADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, loading, isSuperadmin, loginError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
