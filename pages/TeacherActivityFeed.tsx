import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, orderBy, getDocs, onSnapshot, limit } from 'firebase/firestore';
import { useAuth } from '../services/AuthContext';
import { getTeacherStudents } from '../services/teacherService';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BookOpen, CheckCircle, UserPlus, Filter, Search, RefreshCw } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { ActivityEvent } from '../services/activityService';

type FeedFilter = 'all' | 'quiz_completed' | 'lab_visited' | 'student_joined_class';

const TeacherActivityFeed: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [myStudentUids, setMyStudentUids] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FeedFilter>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLive] = useState(true);
  const [newEventCount, setNewEventCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    getTeacherStudents(user.uid).then(students => {
      setMyStudentUids(new Set(students.map((s: any) => s.id)));
    });
  }, [user]);

  useEffect(() => {
    if (!user || myStudentUids.size === 0) {
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      // Firestore 'in' queries support max 30 items, so we chunk if needed
      const uids = Array.from(myStudentUids);
      const allEvents: ActivityEvent[] = [];
      
      // Process in chunks of 30
      for (let i = 0; i < uids.length; i += 30) {
        const chunk = uids.slice(i, i + 30);
        const q = query(
          collection(db, 'activity_feed'),
          where('actorUid', 'in', chunk),
          orderBy('timestamp', 'desc'),
          limit(100)
        );
        const snapshot = await getDocs(q);
        snapshot.docs.forEach(d => {
          allEvents.push({ id: d.id, ...d.data() } as any);
        });
      }
      
      // Sort all results by timestamp descending
      allEvents.sort((a: any, b: any) => {
        return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime();
      });
      
      setEvents(allEvents.slice(0, 100));
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
            if (myStudentUids.has(newEvent.actorUid) || newEvent.targetUid === user.uid) {
              setEvents(prev => {
                // Avoid duplicate
                if (prev.some(e => e.id === newEvent.id)) return prev;
                return [newEvent, ...prev];
              });
              setNewEventCount(p => p + 1);
            }
          }
        });
      }
    );

    return () => unsubscribe();
  }, [user, myStudentUids]);

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === 'all' || e.type === filter;
    const matchesSearch = !search || 
      e.actorName.toLowerCase().includes(search.toLowerCase()) ||
      e.actorEmail.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'quiz_completed':   return <CheckCircle size={18} className="text-green-400" />;
      case 'lab_visited':      return <BookOpen size={18} className="text-blue-400" />;
      case 'student_joined_class': return <UserPlus size={18} className="text-purple-400" />;
      default:                 return <Activity size={18} className="text-gray-400" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'quiz_completed':       return 'border-l-green-500';
      case 'lab_visited':          return 'border-l-blue-500';
      case 'student_joined_class': return 'border-l-purple-500';
      default:                     return 'border-l-gray-500';
    }
  };

  const formatEventMessage = (event: ActivityEvent): string => {
    switch (event.type) {
      case 'quiz_completed':
        return `completed ${event.metadata.labTitle} quiz — Score: ${event.metadata.score}/${event.metadata.total} (${event.metadata.percentage}%)`;
      case 'lab_visited':
        return `opened the ${event.metadata.labTitle} simulation`;
      case 'student_joined_class':
        return `joined your class using code ${event.metadata.teacherCode}`;
      case 'lab_completed':
        return `completed all sections of ${event.metadata.labTitle}`;
      default:
        return event.type.replace(/_/g, ' ');
    }
  };

  const getTimeAgo = (isoString?: string): string => {
    if (!isoString) return 'just now';
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="pt-28 px-6 md:px-12 lg:px-20 min-h-screen pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Activity size={28} className="text-blue-400" />
            <h1 className="text-3xl font-display font-bold text-white">Live Activity Feed</h1>
            {isLive && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                LIVE
              </span>
            )}
            {newEventCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold">
                +{newEventCount} new
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">Real-time activity from your students</p>
        </div>
        <button
          onClick={() => setNewEventCount(0)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-bold transition-colors"
        >
          <RefreshCw size={14} /> Mark all seen
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-5" color="blue">
           <div className="text-2xl mb-1">👥</div>
           <div className={`text-3xl font-bold text-blue-400 mb-1`}>{myStudentUids.size}</div>
           <div className="text-xs text-gray-500 font-medium">Your Students</div>
        </GlassCard>
        <GlassCard className="p-5" color="blue">
           <div className="text-2xl mb-1">📝</div>
           <div className={`text-3xl font-bold text-green-400 mb-1`}>{events.filter(e => e.type === 'quiz_completed' && e.timestamp && new Date(e.timestamp).toDateString() === new Date().toDateString()).length}</div>
           <div className="text-xs text-gray-500 font-medium">Quizzes Today</div>
        </GlassCard>
        <GlassCard className="p-5" color="blue">
           <div className="text-2xl mb-1">🧪</div>
           <div className={`text-3xl font-bold text-amber-400 mb-1`}>{events.filter(e => e.type === 'lab_visited' && e.timestamp && new Date(e.timestamp).toDateString() === new Date().toDateString()).length}</div>
           <div className="text-xs text-gray-500 font-medium">Labs Visited Today</div>
        </GlassCard>
        <GlassCard className="p-5" color="blue">
           <div className="text-2xl mb-1">⭐</div>
           <div className={`text-3xl font-bold text-purple-400 mb-1`}>{(() => {
            const quizzes = events.filter(e => e.type === 'quiz_completed');
            if (!quizzes.length) return 'N/A';
            const avg = quizzes.reduce((a, e) => a + (e.metadata.percentage || 0), 0) / quizzes.length;
            return `${Math.round(avg)}%`;
          })()}</div>
           <div className="text-xs text-gray-500 font-medium">Avg Quiz Score</div>
        </GlassCard>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'quiz_completed', 'lab_visited', 'student_joined_class'] as FeedFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {f === 'all' ? 'All Events' : f === 'quiz_completed' ? 'Quizzes' : f === 'lab_visited' ? 'Lab Visits' : 'New Joins'}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by student name..."
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white 
                       placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50"
          />
        </div>
      </div>

      {/* Feed */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <GlassCard className="p-12 text-center" color="blue">
          <Activity size={40} className="mx-auto text-gray-600 mb-4" />
          <p className="text-lg font-bold text-gray-400">No activity yet</p>
          <p className="text-sm text-gray-600 mt-1">
            {myStudentUids.size === 0
              ? 'Share your class code with students so they can join.'
              : 'Activity will appear here as your students work on labs and quizzes.'}
          </p>
        </GlassCard>
      ) : (
        <AnimatePresence>
          <div className="space-y-3">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id || idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx < 20 ? idx * 0.03 : 0 }}
                className={`glass-panel rounded-2xl p-5 border-l-4 ${getEventColor(event.type)} flex items-start gap-4`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 
                                flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {event.actorName.charAt(0).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm text-white">
                      <span className="font-bold">{event.actorName}</span>
                      {' '}
                      <span className="text-gray-400">{formatEventMessage(event)}</span>
                    </p>
                    <span className="text-xs text-gray-600 flex-shrink-0">{getTimeAgo(event.timestamp)}</span>
                  </div>
                  
                  {/* Extra badge for quiz score */}
                  {event.type === 'quiz_completed' && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        event.metadata.percentage >= 70 ? 'bg-green-500/20 text-green-400' :
                        event.metadata.percentage >= 40 ? 'bg-amber-500/20 text-amber-400' :
                                                           'bg-red-500/20 text-red-400'
                      }`}>
                        {event.metadata.percentage}%
                      </span>
                      <span className="text-xs text-gray-500">{event.metadata.subjectId}</span>
                    </div>
                  )}
                </div>

                {/* Event icon */}
                <div className="flex-shrink-0">{getEventIcon(event.type)}</div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default TeacherActivityFeed;
