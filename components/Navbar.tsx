import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FlaskConical, LogIn, LogOut, User } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../services/AuthContext';

const MotionSpan = motion.span as any;

const TITLES = [
  { text: "E-Prayog", lang: "en" },
  { text: "ಇ-ಪ್ರಯೋಗ", lang: "kn" },
];

// Auth-dependent nav items (shown only when logged in)
const AUTH_NAV_ITEMS = [
  { label: 'Experiments', path: '/subjects' },
  { label: 'AI Tutor', path: '/tutor' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profileData, role, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinkClass = (path: string) => `relative text-sm font-medium transition-colors duration-300 ${
    isActive(path)
      ? 'text-white'
      : 'text-gray-400 hover:text-emerald-300'
  }`;

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      setIsOpen(false);
      await signOut();
      navigate('/home', { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
      navigate('/home', { replace: true });
    }
  };

  // Display info — prefer name, fallback to full_name, then Firebase displayName
  const displayName = profileData?.name || profileData?.full_name || user?.displayName || user?.email?.split('@')[0] || '';
  const avatarUrl = profileData?.photoURL || user?.photoURL || '';
  const avatarClass = profileData?.avatar && profileData.avatar.startsWith('bg-') ? profileData.avatar : 'bg-emerald-500';

  // Dashboard link — role-aware
  const dashboardPath = role === 'Admin' ? '/admin-dashboard' : role === 'Teacher' ? '/teacher-dashboard' : '/dashboard';

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav h-20 px-6 md:px-12 flex items-center justify-between transition-colors duration-300 border-b border-white/5">
      <Link to="/home" className="flex items-center gap-3 group min-w-[200px]">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
          <FlaskConical className="w-10 h-10 text-emerald-400 relative z-10 transition-colors group-hover:rotate-12 duration-500 ease-in-out" />
        </div>
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <MotionSpan
              key={titleIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl font-display font-bold text-white tracking-tight leading-none"
            >
              {TITLES[titleIndex].lang === 'en' ? (
                <>E-<span className="text-emerald-400">Prayog</span></>
              ) : (
                <>ಇ-<span className="text-emerald-400">ಪ್ರಯೋಗ</span></>
              )}
            </MotionSpan>
          </AnimatePresence>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {/* Always-visible public tabs */}
        {NAV_ITEMS.map((item) => (
          <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
            {item.label}
            {isActive(item.path) && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />
            )}
          </Link>
        ))}
        {/* Auth-only tabs */}
        {user && AUTH_NAV_ITEMS.map((item) => (
          <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
            {item.label}
            {isActive(item.path) && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />
            )}
          </Link>
        ))}
        {user && (
          <Link to={dashboardPath} className={navLinkClass(dashboardPath)}>
            Dashboard
            {isActive(dashboardPath) && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />
            )}
          </Link>
        )}
      </div>

      {/* Right side — avatar or login */}
      <div className="hidden md:flex items-center">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/profile" aria-label="View Profile" className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className={`w-8 h-8 rounded-full ${avatarClass} flex items-center justify-center text-white text-xs font-bold`}>
                  {displayName?.charAt(0)?.toUpperCase() || <User size={14} />}
                </div>
              )}
              <span className="text-sm text-gray-400 hidden lg:inline font-medium">
                {displayName?.split(' ')[0] || 'Profile'}
              </span>
            </Link>
            <button onClick={handleLogout} aria-label="Logout" className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white transition-colors">
              <LogIn size={16} /> Log In
            </button>
          </Link>
        )}
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden p-2 -mr-2 text-gray-400" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full glass-nav flex flex-col p-6 gap-4 md:hidden border-b border-white/5 shadow-2xl">
          {NAV_ITEMS.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${isActive(item.path) ? 'text-emerald-400' : ''}`}>{item.label}</Link>
          ))}
          {user && (
            <>
              <hr className="border-white/10 my-2" />
              {AUTH_NAV_ITEMS.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium ${isActive(item.path) ? 'text-emerald-400' : ''}`}>{item.label}</Link>
              ))}
              <Link to={dashboardPath} onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${isActive(dashboardPath) ? 'text-emerald-400' : ''}`}>Dashboard</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-blue-400">My Profile</Link>
            </>
          )}
          <hr className="border-white/10 mt-2" />
          {user ? (
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20">
              <LogOut size={18} /> Log Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
              <LogIn size={18} /> Log In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
