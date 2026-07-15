import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { logAudit } from './audit';

export interface UserProfile {
  email: string;
  name: string;
  photo: string | null;
  createdAt: number;
  lastActive: number;
}

export async function saveUserProfile(uid: string, profile: Omit<UserProfile, 'createdAt' | 'lastActive'>) {
  const ref = doc(db, 'users', uid);
  const existing = await getDoc(ref);
  await setDoc(ref, {
    ...profile,
    createdAt: existing.exists() ? existing.data().createdAt : Date.now(),
    lastActive: Date.now(),
  }, { merge: true });
}

export async function saveProgress(uid: string, progress: Record<string, boolean>) {
  const ref = doc(db, 'progress', uid);
  const existing = await getDoc(ref);
  const prev = existing.exists() ? existing.data().topics || {} : {};
  await setDoc(ref, { topics: progress, updatedAt: Date.now() }, { merge: true });
  await logAudit('progress_update', uid, '', { added: Object.keys(progress).filter(k => progress[k] && !prev[k]) });
}

export async function loadProgress(uid: string): Promise<Record<string, boolean>> {
  const ref = doc(db, 'progress', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return {};
  return snap.data().topics || {};
}

export async function getAllUsers(): Promise<{ uid: string; profile: UserProfile; progress: Record<string, boolean> }[]> {
  const usersSnap = await getDocs(collection(db, 'users'));
  const result = [];
  for (const userDoc of usersSnap.docs) {
    const uid = userDoc.id;
    const profile = userDoc.data() as UserProfile;
    const progressSnap = await getDoc(doc(db, 'progress', uid));
    const progress = progressSnap.exists() ? progressSnap.data().topics || {} : {};
    result.push({ uid, profile, progress });
  }
  return result;
}
