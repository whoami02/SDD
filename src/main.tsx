import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import {RequireAuth, RequireSuperadmin} from './components/AuthGuard';
import App from './App.tsx';
import LoginPage from './components/LoginPage.tsx';
import SuperAdmin from './components/SuperAdmin.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<RequireSuperadmin><SuperAdmin /></RequireSuperadmin>} />
          <Route path="*" element={<RequireAuth><App /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
);
