import { useAuth, SUPERADMIN_EMAIL } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, User } from 'lucide-react';

export default function Header() {
  const { user, isSuperadmin, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 ml-auto">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
            <User size={14} className="text-slate-500" />
          </div>
        )}
        <span className="hidden sm:inline">{user.displayName || user.email}</span>
      </div>
      {isSuperadmin && (
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold transition-colors"
          title="Super Admin Panel"
        >
          <Shield size={14} />
          <span className="hidden sm:inline">Admin</span>
        </button>
      )}
      <button
        onClick={logout}
        className="text-slate-400 hover:text-red-600 transition-colors p-1.5"
        title="Sign out"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}
