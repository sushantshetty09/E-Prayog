import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FlaskConical, AlertCircle } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    // Firebase popup flow doesn't need code exchange.
    // This page exists as a fallback / redirect handler.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const role = userDoc.exists() ? (userDoc.data().role || 'Student') : 'Student';
          const routes: Record<string, string> = {
            'Admin': '/dashboard',
            'Teacher': '/dashboard',
            'Student': '/home',
          };
          navigate(routes[role] || '/home', { replace: true });
        } catch {
          navigate('/home', { replace: true });
        }
      } else {
        // Wait a bit, then redirect to login if no user detected
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    });

    // Timeout fallback
    const timeout = setTimeout(() => {
      setError('Authentication timed out. Please try again.');
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    }, 15000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center">
        {error ? (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="size-12 text-red-400" />
            <p className="text-red-400 font-medium">{error}</p>
            <p className="text-sm text-zinc-500">Redirecting to login...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-30 animate-pulse" />
              <FlaskConical className="size-12 text-emerald-400 relative z-10 animate-bounce" />
            </div>
            <div className="size-10 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-sm text-zinc-400 font-medium">Completing sign in...</p>
            <p className="text-xs text-zinc-600">Please wait while we verify your account</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
