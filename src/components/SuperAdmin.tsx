import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers, type UserProfile } from '../lib/firestore';
import { getRecentAuditLogs, type AuditEntry } from '../lib/audit';
import { curriculum } from '../data';
import { ArrowLeft, Users, ClipboardList, Activity, Shield } from 'lucide-react';

type Tab = 'users' | 'audit';

export default function SuperAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('users');
  const [users, setUsers] = useState<{ uid: string; profile: UserProfile; progress: Record<string, boolean> }[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const totalTopics = curriculum.reduce((sum, p) => sum + p.days.reduce((s, d) => s + d.topics.length, 0), 0);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [allUsers, logs] = await Promise.all([getAllUsers(), getRecentAuditLogs()]);
        setUsers(allUsers);
        setAuditLogs(logs as AuditEntry[]);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
      setLoading(false);
    }
    load();
  }, []);

  const calcProgress = (progress: Record<string, boolean>) => {
    const completed = Object.values(progress).filter(Boolean).length;
    return Math.round((completed / totalTopics) * 100) || 0;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-indigo-600" />
            <h1 className="text-lg font-bold text-slate-900">Super Admin</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{user?.email}</span>
          <button onClick={logout} className="text-xs font-bold text-slate-400 hover:text-red-600 uppercase tracking-wider transition-colors">
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white border border-slate-200 rounded-xl p-1 w-fit">
          <button onClick={() => setTab('users')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === 'users' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <Users size={16} /> Users ({users.length})
          </button>
          <button onClick={() => setTab('audit')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === 'audit' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}>
            <Activity size={16} /> Audit Log
          </button>
        </div>

        {tab === 'users' && (
          <div className="space-y-4">
            {users.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <Users size={40} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">No users yet</p>
                <p className="text-sm text-slate-400">Users will appear here once they sign in.</p>
              </div>
            )}
            {users.map(({ uid, profile, progress }) => (
              <div key={uid} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                      {profile.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{profile.name || 'Unknown'}</p>
                      <p className="text-sm text-slate-500">{profile.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-indigo-600">{calcProgress(progress)}%</div>
                    <p className="text-xs text-slate-400">completed</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${calcProgress(progress)}%` }} />
                </div>
                <div className="mt-3 flex gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><ClipboardList size={12} /> {Object.values(progress).filter(Boolean).length}/{totalTopics} topics</span>
                  <span>Last active: {new Date(profile.lastActive).toLocaleDateString()}</span>
                  <span>Joined: {new Date(profile.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'audit' && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            {auditLogs.length === 0 ? (
              <div className="p-12 text-center">
                <Activity size={40} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">No audit logs yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Timestamp</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((entry) => (
                      <tr key={entry.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-xs">
                          {entry.timestamp ? new Date((entry.timestamp as unknown as { seconds: number }).seconds * 1000).toLocaleString() : 'pending...'}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-bold uppercase">
                            {entry.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-700">{entry.email}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs max-w-xs truncate">
                          {JSON.stringify(entry.details)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
