import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { submitFeedback } from '../services/firebase';
import GlassCard from '../components/GlassCard';
import { MessageSquare, Star, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { value: 'general', label: '💬 General' },
  { value: 'bug', label: '🐛 Bug Report' },
  { value: 'content', label: '📚 Content Issue' },
  { value: 'suggestion', label: '💡 Suggestion' },
];

const Contact: React.FC = () => {
  const { user, profileData, role } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) { setError('Please select a rating.'); return; }
    if (message.trim().length < 20) { setError('Message must be at least 20 characters.'); return; }
    setError(''); setSubmitting(true);
    try {
      await submitFeedback(user.uid, {
        name: profileData?.name || profileData?.full_name || user.displayName || 'Anonymous',
        email: profileData?.email || user.email || '',
        role: role || 'Student',
        category, message: message.trim(), rating,
      });
      setSubmitted(true);
      setMessage(''); setRating(0); setCategory('general');
    } catch (e) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <CheckCircle2 size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">Thank You!</h2>
          <p className="text-slate-400 mb-6">Your feedback has been submitted successfully.</p>
          <button onClick={() => setSubmitted(false)} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors">
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-12 px-6 lg:px-12 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <MessageSquare size={40} className="text-emerald-400 mx-auto mb-4" />
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Send Us Feedback</h1>
        <p className="text-slate-400">Help us improve E-Prayog. Your feedback matters!</p>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-3">How would you rate E-Prayog?</label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none">
                  <Star size={36}
                    className={`transition-colors ${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-amber-400 mt-2 font-medium">
                {['', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent'][rating]}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map(cat => (
                <button key={cat.value} type="button" onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-xl text-sm font-bold text-center transition-all border ${
                    category === cat.value
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Your Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Tell us what you think... (minimum 20 characters)"
              rows={5} required minLength={20}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none" />
            <p className="text-xs text-slate-500 mt-1 text-right">{message.length}/20 min</p>
          </div>

          {error && <p className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-2">{error}</p>}

          <button type="submit" disabled={submitting}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Submit Feedback
          </button>
        </form>
      </GlassCard>
    </div>
  );
};

export default Contact;
