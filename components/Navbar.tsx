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
      : 'text-zinc-400 hover:text-emerald-300'
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
  const avatarClass = profileData?.avatar && profileData.avatar.startsWith('bg-') ? profileData.avatar : 'bg-emerald-500';

  // Dashboard link: role-aware
  const dashboardPath = role === 'Admin' ? '/admin-dashboard' : role === 'Teacher' ? '/teacher-dashboard' : '/dashboard';

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-nav h-20 px-6 md:px-12 flex items-center justify-between transition-colors duration-300 border-b border-white/5">
      <Link to="/home" className="ep-logo-link flex items-center gap-2 group min-w-[180px]" style={{textDecoration:'none'}}>
        {/* ── Animated Orbital Logo Mark ── */}
        <svg
          className="ep-nav-svg"
          viewBox="0 0 80 80"
          width="68"
          height="68"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          style={{overflow:'visible',flexShrink:0}}
        >
          <defs>
            <linearGradient id="nav-outerG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A73E8" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#00C896" stopOpacity="0.9"/>
            </linearGradient>
            <linearGradient id="nav-innerG" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C896" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.9"/>
            </linearGradient>
            <linearGradient id="nav-eG" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60AAFF"/>
              <stop offset="100%" stopColor="#1A73E8"/>
            </linearGradient>
            <radialGradient id="nav-eGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1A73E8" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#1A73E8" stopOpacity="0"/>
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
              <circle r="2.2" fill="#1A73E8">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
              <circle r="1.5" fill="#1A73E8" opacity="0.45">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-0.17s">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
            </g>
            <g filter="url(#nav-outerElecGlow)">
              <circle r="2.2" fill="#00C896">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3s">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
              <circle r="1.5" fill="#00C896" opacity="0.45">
                <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3.17s">
                  <mpath xlinkHref="#nav-outerPath"/>
                </animateMotion>
              </circle>
            </g>
          </g>

          {/* Inner electron */}
          <g className="ep-inner-ring" style={{transformOrigin:'40px 40px'}}>
            <g filter="url(#nav-innerElecGlow)">
              <circle r="2" fill="#FF8C00">
                <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear">
                  <mpath xlinkHref="#nav-innerPath"/>
                </animateMotion>
              </circle>
              <circle r="1.3" fill="#FF8C00" opacity="0.4">
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
              fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="20"
              fill="url(#nav-eG)" filter="url(#nav-eGlowF)"
              style={{userSelect:'none'}}
            >E</text>
          </g>

          {/* Sparks */}
          <circle cx="62" cy="22" r="1"   fill="#60AAFF" className="ep-spark ep-s1"/>
          <circle cx="18" cy="26" r="0.8" fill="#00C896" className="ep-spark ep-s2"/>
          <circle cx="64" cy="57" r="0.9" fill="#FF8C00" className="ep-spark ep-s3"/>
          <circle cx="16" cy="54" r="1"   fill="#60AAFF" className="ep-spark ep-s4"/>
        </svg>

        {/* ── Wordmark ── */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <MotionSpan
              key={titleIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="text-lg md:text-xl font-display font-bold text-white tracking-tight leading-none"
            >
              {TITLES[titleIndex].lang === 'en' ? (
                <>E-<span style={{color:'#00C896'}}>Prayog</span></>
              ) : (
                <>ಇ-<span style={{color:'#00C896'}}>ಪ್ರಯೋಗ</span></>
              )}
            </MotionSpan>
          </AnimatePresence>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/home" className={navLinkClass('/home')}>
          {t.navHome}{isActive('/home') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
        </Link>
        <Link to="/tools" className={navLinkClass('/tools')}>
          {t.navTools}{isActive('/tools') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
        </Link>
        <Link to="/about" className={navLinkClass('/about')}>
          {t.navAbout}{isActive('/about') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
        </Link>
        {user && (
          <>
            <Link to="/subjects" className={navLinkClass('/subjects')}>
              {t.navExperiments}{isActive('/subjects') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
            </Link>
            <Link to="/tutor" className={navLinkClass('/tutor')}>
              {t.navTutor}{isActive('/tutor') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
            </Link>
            <Link to={dashboardPath} className={navLinkClass(dashboardPath)}>
              {t.navDashboard}{isActive(dashboardPath) && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
            </Link>
          </>
        )}

        {/* ── Language Switcher ── */}
        <div className="flex items-center gap-0.5 bg-white/5 rounded-full px-1 py-1 border border-white/10" title="Change Language">
          <Languages size={13} className="text-zinc-500 mx-1" />
          {LANG_OPTIONS.map(opt => (
            <button
              key={opt.code}
              onClick={() => setLang(opt.code)}
              title={opt.fullLabel}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                lang === opt.code
                  ? 'bg-gradient-to-r from-violet-600 to-sky-500 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
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
                <img src={avatarUrl} alt="Profile" className="size-8 rounded-full object-cover" />
              ) : (
                <div className={`size-8 rounded-full ${avatarClass} flex items-center justify-center text-white text-xs font-bold`}>
                  {displayName?.charAt(0)?.toUpperCase() || <User size={14} />}
                </div>
              )}
              <span className="text-sm text-zinc-400 hidden lg:inline font-medium">
                {displayName?.split(' ')[0] || t.navProfile}
              </span>
            </Link>
            <button onClick={handleLogout} aria-label="Logout" className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-all">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white transition-colors">
              <LogIn size={16} /> {t.navLogin}
            </button>
          </Link>
        )}
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden p-2 -mr-2 text-zinc-400" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full glass-nav flex flex-col p-6 gap-4 md:hidden border-b border-white/5 shadow-2xl">
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-2">
            <Languages size={14} className="text-zinc-500" />
            <span className="text-xs text-zinc-500 font-semibold">Language / ಭಾಷೆ / भाषा:</span>
          </div>
          <div className="flex gap-2">
            {LANG_OPTIONS.map(opt => (
              <button
                key={opt.code}
                onClick={() => setLang(opt.code)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  lang === opt.code
                    ? 'bg-gradient-to-r from-violet-600 to-sky-500 text-white shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {opt.fullLabel}
              </button>
            ))}
          </div>
          <hr className="border-white/10" />
          <Link to="/home" onClick={() => setIsOpen(false)} className={`text-lg font-medium ${isActive('/home') ? 'text-emerald-400' : ''}`}>{t.navHome}</Link>
          <Link to="/tools" onClick={() => setIsOpen(false)} className={`text-lg font-medium ${isActive('/tools') ? 'text-emerald-400' : ''}`}>{t.navTools}</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className={`text-lg font-medium ${isActive('/about') ? 'text-emerald-400' : ''}`}>{t.navAbout}</Link>
          {user && (
            <>
              <hr className="border-white/10" />
              <Link to="/subjects" onClick={() => setIsOpen(false)} className={`text-lg font-medium ${isActive('/subjects') ? 'text-emerald-400' : ''}`}>{t.navExperiments}</Link>
              <Link to="/tutor" onClick={() => setIsOpen(false)} className={`text-lg font-medium ${isActive('/tutor') ? 'text-emerald-400' : ''}`}>{t.navTutor}</Link>
              <Link to={dashboardPath} onClick={() => setIsOpen(false)} className={`text-lg font-medium ${isActive(dashboardPath) ? 'text-emerald-400' : ''}`}>{t.navDashboard}</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium text-blue-400">{t.navProfile}</Link>
            </>
          )}
          <hr className="border-white/10 mt-2" />
          {user ? (
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20">
              <LogOut size={18} /> {t.navLogout}
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
              <LogIn size={18} /> {t.navLogin}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
