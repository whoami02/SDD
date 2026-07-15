import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface AuditEntry {
  id?: string;
  action: string;
  userId: string;
  email: string;
  details: Record<string, unknown>;
  timestamp: ReturnType<typeof serverTimestamp>;
}

export async function logAudit(action: string, userId: string, email: string, details: Record<string, unknown> = {}) {
  try {
    await addDoc(collection(db, 'audit-logs'), {
      action,
      userId,
      email,
      details,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error('Audit log failed:', err);
  }
}

export async function getRecentAuditLogs(max = 200) {
  const q = query(collection(db, 'audit-logs'), orderBy('timestamp', 'desc'), limit(max));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditEntry));
}
