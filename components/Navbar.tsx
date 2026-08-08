import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User, Languages } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useAuth } from '../services/AuthContext';
import { useLang, Lang } from '../services/LanguageContext';

const LANG_OPTIONS: { code: Lang; label: string; fullLabel: string }[] = [
  { code: 'en', label: 'English', fullLabel: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ', fullLabel: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'हिंदी', fullLabel: 'हिंदी' },
];

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
  const { lang, setLang, t } = useLang();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinkClass = (path: string) => `relative text-sm font-medium transition-colors duration-300 ${
    isActive(path)
      ? 'text-white'
      : 'text-slate-400 hover:text-cyan-300'
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

  // Display info: prefer name, fallback to full_name, then Firebase displayName
  const displayName = profileData?.name || profileData?.full_name || user?.displayName || user?.email?.split('@')[0] || '';
  const avatarUrl = profileData?.photoURL || user?.photoURL || '';
  const avatarClass = profileData?.avatar && profileData.avatar.startsWith('bg-') ? profileData.avatar : 'bg-cyan-500';

  // Dashboard link: role-aware
  const dashboardPath = role === 'Admin' ? '/admin-dashboard' : role === 'Teacher' ? '/teacher-dashboard' : '/dashboard';

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav h-20 px-6 md:px-12 flex items-center justify-between transition-colors duration-300 border-b border-white/[0.04]">
      <Link to="/home" className="ep-logo-link flex items-center gap-3 group min-w-[180px]" style={{textDecoration:'none'}}>
        {/* ── Animated Orbital Logo Mark ── */}
        <svg
          className="ep-nav-svg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[15deg]"
          viewBox="0 0 80 80"
          width="48"
          height="48"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          style={{overflow:'visible',flexShrink:0}}
        >
          <defs>
            <linearGradient id="nav-outerG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9"/>
            </linearGradient>
            <linearGradient id="nav-innerG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9"/>
            </linearGradient>
            <linearGradient id="nav-eG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9"/>
              <stop offset="100%" stopColor="#06B6D4"/>
            </linearGradient>
            <radialGradient id="nav-eGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0891B2" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0"/>
            </radialGradient>
            <filter id="nav-outerElecGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="nav-innerElecGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="nav-ringGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="0.7" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="nav-eGlowF" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <path id="nav-outerPath" d="M 67.2,40 A 27.2,11.2 0 1 1 67.19,39.97" fill="none"/>
            <path id="nav-innerPath" d="M 57.6,40 A 17.6,7.2 0 1 1 57.59,39.97" fill="none"/>
          </defs>

          {/* Outer ring */}
          <g className="ep-outer-ring" style={{transformOrigin:'40px 40px'}}>
            <ellipse cx="40" cy="40" rx="27.2" ry="11.2"
              fill="none" stroke="url(#nav-outerG)" strokeWidth="1.6" strokeOpacity="1"
              filter="url(#nav-ringGlow)"
              transform="rotate(-20,40,40)"
            />
          </g>

          {/* Inner ring */}
          <g className="ep-inner-ring" style={{transformOrigin:'40px 40px'}}>
            <ellipse cx="40" cy="40" rx="17.6" ry="7.2"
              fill="none" stroke="url(#nav-innerG)" strokeWidth="1.6" strokeOpacity="1"
              filter="url(#nav-ringGlow)"
              transform="rotate(55,40,40)"
            />
          </g>

          {/* Outer electrons: 2 dots 180° apart */}
          <g className="ep-outer-ring" style={{transformOrigin:'40px 40px'}}>
            <g filter="url(#nav-outerElecGlow)">
              <circle r="2.2" fill="#22D3EE">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
              <circle r="1.5" fill="#22D3EE" opacity="0.45">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-0.17s">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
            </g>
            <g filter="url(#nav-outerElecGlow)">
              <circle r="2.2" fill="#06B6D4">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3s">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
              <circle r="1.5" fill="#06B6D4" opacity="0.45">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3.17s">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
            </g>
          </g>

          {/* Inner electron */}
          <g className="ep-inner-ring" style={{transformOrigin:'40px 40px'}}>
            <g filter="url(#nav-innerElecGlow)">
              <circle r="2" fill="#F59E0B">
                <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear">
                  <mpath xlinkHref="#nav-innerPath"/>
                </animateMotion>
              </circle>
              <circle r="1.3" fill="#F59E0B" opacity="0.4">
                <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear" begin="-0.14s">
                  <mpath xlinkHref="#nav-innerPath"/>
                </animateMotion>
              </circle>
            </g>
          </g>

          {/* E glow */}
          <ellipse cx="40" cy="40" rx="9" ry="9" fill="url(#nav-eGlow)" className="ep-eglow"/>

          {/* Central E */}
          <g className="ep-eletter" style={{transformOrigin:'40px 40px'}}>
            <text x="40" y="44" textAnchor="middle" dominantBaseline="middle"
              fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="20"
              fill="url(#nav-eG)" filter="url(#nav-eGlowF)"
              style={{userSelect:'none'}}
            >E</text>
          </g>

          {/* Sparks */}
          <circle cx="62" cy="22" r="1"   fill="#67E8F9" className="ep-spark ep-s1"/>
          <circle cx="18" cy="26" r="0.8" fill="#06B6D4" className="ep-spark ep-s2"/>
          <circle cx="64" cy="57" r="0.9" fill="#F59E0B" className="ep-spark ep-s3"/>
          <circle cx="16" cy="54" r="1"   fill="#67E8F9" className="ep-spark ep-s4"/>
        </svg>

        {/* ── Wordmark ── */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <MotionSpan
              key={titleIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-display font-semibold text-white tracking-tight leading-none"
            >
              {TITLES[titleIndex].lang === 'en' ? (
                <>E-<span className="text-cyan-400">Prayog</span></>
              ) : (
                <>ಇ-<span className="text-cyan-400">ಪ್ರಯೋಗ</span></>
              )}
            </MotionSpan>
          </AnimatePresence>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/home" className={navLinkClass('/home')}>
          {t.navHome}{isActive('/home') && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />}
        </Link>
        <Link to="/tools" className={navLinkClass('/tools')}>
          {t.navTools}{isActive('/tools') && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />}
        </Link>
        <Link to="/about" className={navLinkClass('/about')}>
          {t.navAbout}{isActive('/about') && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />}
        </Link>
        {user && (
          <>
            <Link to="/subjects" className={navLinkClass('/subjects')}>
              {t.navExperiments}{isActive('/subjects') && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />}
            </Link>
            <Link to="/tutor" className={navLinkClass('/tutor')}>
              {t.navTutor}{isActive('/tutor') && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />}
            </Link>
            <Link to={dashboardPath} className={navLinkClass(dashboardPath)}>
              {t.navDashboard}{isActive(dashboardPath) && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />}
            </Link>
          </>
        )}

        {/* ── Language Switcher ── */}
        <div className="flex items-center gap-1 bg-[#1A202C]/50 rounded-full p-1 border border-white/5" title="Change Language">
          <Languages size={14} className="text-slate-500 mx-2" />
          {LANG_OPTIONS.map(opt => (
            <button
              key={opt.code}
              onClick={() => setLang(opt.code)}
              title={opt.fullLabel}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                lang === opt.code
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right side: avatar or login */}
      <div className="hidden md:flex items-center">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/profile" aria-label="View Profile" className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="size-8 rounded-full object-cover border border-white/10" />
              ) : (
                <div className={`size-8 rounded-full ${avatarClass} flex items-center justify-center text-white text-xs font-bold border border-white/10`}>
                  {displayName?.charAt(0)?.toUpperCase() || <User size={14} />}
                </div>
              )}
              <span className="text-sm text-slate-300 hidden lg:inline font-medium">
                {displayName?.split(' ')[0] || t.navProfile}
              </span>
            </Link>
            <button onClick={handleLogout} aria-label="Logout" className="p-2 rounded-full bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn-primary py-2 px-5 text-sm">
              <LogIn size={16} /> {t.navLogin}
            </button>
          </Link>
        )}
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full glass-nav flex flex-col p-6 gap-4 md:hidden border-b border-white/5 shadow-2xl"
          >
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2">
              <Languages size={14} className="text-slate-500" />
              <span className="text-xs text-slate-500 font-semibold">Language / ಭಾಷೆ / भाषा:</span>
            </div>
            <div className="flex gap-2">
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    lang === opt.code
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-[#1A202C]/50 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {opt.fullLabel}
                </button>
              ))}
            </div>
            <hr className="border-white/[0.04]" />
            <Link to="/home" onClick={() => setIsOpen(false)} className={`text-lg font-medium transition-colors ${isActive('/home') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>{t.navHome}</Link>
            <Link to="/tools" onClick={() => setIsOpen(false)} className={`text-lg font-medium transition-colors ${isActive('/tools') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>{t.navTools}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={`text-lg font-medium transition-colors ${isActive('/about') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>{t.navAbout}</Link>
            {user && (
              <>
                <hr className="border-white/[0.04]" />
                <Link to="/subjects" onClick={() => setIsOpen(false)} className={`text-lg font-medium transition-colors ${isActive('/subjects') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>{t.navExperiments}</Link>
                <Link to="/tutor" onClick={() => setIsOpen(false)} className={`text-lg font-medium transition-colors ${isActive('/tutor') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>{t.navTutor}</Link>
                <Link to={dashboardPath} onClick={() => setIsOpen(false)} className={`text-lg font-medium transition-colors ${isActive(dashboardPath) ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>{t.navDashboard}</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-cyan-400">{t.navProfile}</Link>
              </>
            )}
            <hr className="border-white/[0.04] mt-2" />
            {user ? (
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-colors">
                <LogOut size={18} /> {t.navLogout}
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition-colors">
                <LogIn size={18} /> {t.navLogin}
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
