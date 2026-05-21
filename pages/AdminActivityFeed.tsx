import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, getDocs, onSnapshot, limit } from 'firebase/firestore';
import { useAuth } from '../services/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, Users, TrendingUp, Filter, Search, Download, Key, ClipboardList, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { ActivityEvent } from '../services/activityService';

type AdminFilter = 'all' | 'user_signup' | 'user_login' | 'quiz_completed' | 'admin_role_change' | 'student_joined_class' | 'teacher_code_generated';
type RoleFilter = 'all' | 'Student' | 'Teacher' | 'Admin';
type DateFilter = 'today' | 'week' | 'month' | 'all';

const AdminActivityFeed: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<AdminFilter>('all');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [search, setSearch] = useState('');
  const [newCount, setNewCount] = useState(0);

  // Subscribe to ALL activity
  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(
        collection(db, 'activity_feed'),
        orderBy('timestamp', 'desc'),
        limit(500)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as any));
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();

    // Realtime listener using onSnapshot
    const unsubscribe = onSnapshot(
      query(collection(db, 'activity_feed'), orderBy('timestamp', 'desc'), limit(1)),
      (snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const newEvent = { id: change.doc.id, ...change.doc.data() } as any;
            setEvents(prev => {
              if (prev.some(e => e.id === newEvent.id)) return prev;
              return [newEvent, ...prev];
            });
            setNewCount(p => p + 1);
          }
        });
      }
    );
    
    return () => unsubscribe();
  }, []);

  // Date filter helper
  const isInDateRange = (isoString?: string): boolean => {
    if (!isoString) return true;
    const eventDate = new Date(isoString);
    const now = new Date();
    switch (dateFilter) {
      case 'today':
        return eventDate.toDateString() === now.toDateString();
      case 'week':
        return eventDate > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case 'month':
        return eventDate > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return true;
    }
  };

  const filteredEvents = events.filter(e => {
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    const matchesRole = roleFilter === 'all' || e.actorRole === roleFilter;
    const matchesDate = isInDateRange(e.timestamp);
    const matchesSearch = !search || 
      e.actorName.toLowerCase().includes(search.toLowerCase()) ||
      e.actorEmail.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesRole && matchesDate && matchesSearch;
  });

  // Compute platform stats
  const todayEvents  = events.filter(e => e.timestamp && new Date(e.timestamp).toDateString() === new Date().toDateString());
  const totalSignups = events.filter(e => e.type === 'user_signup').length;
  const todayLogins  = todayEvents.filter(e => e.type === 'user_login').length;
  const todayQuizzes = todayEvents.filter(e => e.type === 'quiz_completed').length;
  const avgQuizScore = (() => {
    const q = events.filter(e => e.type === 'quiz_completed');
    if (!q.length) return 0;
    return Math.round(q.reduce((a, e) => a + (e.metadata.percentage || 0), 0) / q.length);
  })();
  const uniqueActiveToday = new Set(todayEvents.map(e => e.actorUid)).size;

  const exportCSV = () => {
    const headers = 'Timestamp,Actor,Email,Role,Event Type,Metadata\n';
    const rows = filteredEvents.map(e =>
      `"${e.timestamp}","${e.actorName}","${e.actorEmail}","${e.actorRole}","${e.type}","${JSON.stringify(e.metadata).replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eprayog-activity-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getEventBadgeColor = (type: string) => {
    const map: Record<string, string> = {
      user_signup:            'bg-emerald-500/20 text-emerald-400',
      user_login:             'bg-blue-500/20 text-blue-400',
      quiz_completed:         'bg-green-500/20 text-green-400',
      lab_visited:            'bg-sky-500/20 text-sky-400',
      student_joined_class:   'bg-purple-500/20 text-purple-400',
      admin_role_change:      'bg-red-500/20 text-red-400',
      teacher_code_generated: 'bg-amber-500/20 text-amber-400',
      new_teacher_registered: 'bg-teal-500/20 text-teal-400',
    };
    return map[type] || 'bg-zinc-500/20 text-zinc-400';
  };

  const formatEventMessage = (event: ActivityEvent): string => {
    switch (event.type) {
      case 'user_signup':            return `signed up (${event.metadata.method})`;
      case 'user_login':             return `logged in (${event.metadata.method})`;
      case 'quiz_completed':         return `completed "${event.metadata.labTitle}" quiz — ${event.metadata.score}/${event.metadata.total} (${event.metadata.percentage}%)`;
      case 'lab_visited':            return `opened "${event.metadata.labTitle}"`;
      case 'student_joined_class':   return `joined a class (code: ${event.metadata.teacherCode})`;
      case 'teacher_code_generated': return `generated/regenerated class code ${event.metadata.newCode}`;
      case 'admin_role_change':      return `changed ${event.targetName}'s role to ${event.metadata.newRole}`;
      default:                       return event.type.replace(/_/g, ' ');
    }
  };

  const getTimeAgo = (iso?: string): string => {
    if (!iso) return 'just now';
    const d = Date.now() - new Date(iso).getTime();
    const m = Math.floor(d / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return new Date(iso).toLocaleDateString();
  };

  return (
    <div className="pt-28 px-6 md:px-12 lg:px-20 min-h-screen pb-12">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Shield size={28} className="text-red-400" />
            <h1 className="text-3xl font-display font-bold text-white">Platform Activity Monitor</h1>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              LIVE
            </span>
            {newCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold">
                +{newCount} new
              </span>
            )}
          </div>
          <p className="text-zinc-400 text-sm">All platform events across all users</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-sm font-bold transition-colors"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Signups',   value: totalSignups,        cardColor: 'emerald', hex: '#10b981', icon: TrendingUp },
          { label: 'Active Today',    value: uniqueActiveToday,   cardColor: 'blue',    hex: '#3b82f6', icon: Users },
          { label: 'Logins Today',    value: todayLogins,         cardColor: 'sky',     hex: '#0ea5e9', icon: Key },
          { label: 'Quizzes Today',   value: todayQuizzes,        cardColor: 'green',   hex: '#22c55e', icon: ClipboardList },
          { label: 'Avg Quiz Score',  value: `${avgQuizScore}%`,  cardColor: 'purple',  hex: '#a855f7', icon: Star },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <GlassCard key={stat.label} className="p-5" color={stat.cardColor} hoverEffect={true}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.hex}15` }}>
                  <Icon size={20} style={{ color: stat.hex }} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.hex }}>{stat.value}</div>
              <div className="text-xs text-zinc-500 font-medium">{stat.label}</div>
            </GlassCard>
          );
        })}
      </div>

      {/* Filters Row */}
      <div className="glass-panel rounded-2xl p-4 mb-6 flex flex-col gap-4">
        {/* Type filter */}
        <div className="flex gap-2 flex-wrap items-center">
          <Filter size={14} className="text-zinc-500 flex-shrink-0" />
          {(['all', 'user_signup', 'user_login', 'quiz_completed', 'admin_role_change', 'student_joined_class'] as AdminFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                typeFilter === f ? 'bg-red-600 text-white' : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {f === 'all' ? 'All Events' : f.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Role + Date filter + Search row */}
        <div className="flex gap-3 flex-wrap items-center">
          {/* Role filter */}
          <div className="flex gap-1">
            {(['all', 'Student', 'Teacher', 'Admin'] as RoleFilter[]).map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  roleFilter === r
                    ? r === 'Admin' ? 'bg-red-500 text-white'
                    : r === 'Teacher' ? 'bg-purple-500 text-white'
                    : r === 'Student' ? 'bg-blue-500 text-white'
                    : 'bg-zinc-600 text-white'
                    : 'bg-white/5 text-zinc-500 hover:text-white'
                }`}
              >
                {r === 'all' ? 'All Roles' : r}
              </button>
            ))}
          </div>

          {/* Date filter */}
          <div className="flex gap-1">
            {(['today', 'week', 'month', 'all'] as DateFilter[]).map(d => (
              <button
                key={d}
                onClick={() => setDateFilter(d)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  dateFilter === d ? 'bg-amber-500 text-white' : 'bg-white/5 text-zinc-500 hover:text-white'
                }`}
              >
                {d === 'today' ? 'Today' : d === 'week' ? '7 days' : d === 'month' ? '30 days' : 'All time'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search user..."
              className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl 
                         text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-red-500/50"
            />
          </div>

          <span className="text-xs text-zinc-600 ml-auto">{filteredEvents.length} events</span>
        </div>
      </div>

      {/* Feed */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <GlassCard className="p-12 text-center" color="blue">
          <Activity size={40} className="mx-auto text-zinc-600 mb-4" />
          <p className="text-lg font-bold text-zinc-400">No events match your filters</p>
        </GlassCard>
      ) : (
        <AnimatePresence>
          <div className="space-y-2">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx < 30 ? idx * 0.02 : 0 }}
                className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4 group hover:bg-white/5 transition-colors"
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                  event.actorRole === 'Admin' ? 'bg-red-600/50' :
                  event.actorRole === 'Teacher' ? 'bg-purple-600/50' : 'bg-blue-600/50'
                }`}>
                  {event.actorName.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{event.actorName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      event.actorRole === 'Admin' ? 'bg-red-500/20 text-red-400' :
                      event.actorRole === 'Teacher' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {event.actorRole}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getEventBadgeColor(event.type)}`}>
                      {event.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 truncate">{formatEventMessage(event)}</p>
                </div>

                {/* Time + email */}
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-zinc-600">{getTimeAgo(event.timestamp)}</p>
                  <p className="text-[10px] text-zinc-700 hidden group-hover:block">{event.actorEmail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AdminActivityFeed;
