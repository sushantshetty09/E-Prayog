import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Trash2, User } from 'lucide-react';
import { askTutor } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../services/LanguageContext';

const MotionDiv = motion.div as any;

/* ── Gradient tokens (mirrors AIFloatingTutor) ── */
const G = {
  sky:    '#0ea5e9',
  violet: '#8b5cf6',
  rose:   '#ec4899',
  amber:  '#f59e0b',
};

const gradients = {
  primary:   `linear-gradient(135deg, ${G.sky} 0%, ${G.violet} 50%, ${G.rose} 100%)`,
  userBubble:`linear-gradient(135deg, ${G.sky} 0%, ${G.violet} 100%)`,
  sendBtn:   `linear-gradient(135deg, ${G.sky} 0%, ${G.violet} 100%)`,
  header:    `linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(139,92,246,0.18) 50%, rgba(236,72,153,0.1) 100%)`,
  aiBubble:  'rgba(139,92,246,0.08)',
};

const TutorPage: React.FC = () => {
  const { t } = useLang();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Re-seed welcome message when language changes
  useEffect(() => {
    setMessages([{ id: 'welcome', role: 'model', text: t.tutorWelcome, timestamp: Date.now() }]);
  }, [t.tutorWelcome]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const reply = await askTutor(input, 'General');
      setMessages(prev => [...prev, { id: `m-${Date.now()}`, role: 'model', text: reply, timestamp: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { id: `e-${Date.now()}`, role: 'model', text: t.aiError, timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [t.tutorQ1, t.tutorQ2, t.tutorQ3, t.tutorQ4, t.tutorQ5, t.tutorQ6];

  return (
    <div className="min-h-screen pt-20 pb-6 px-4 md:px-8 lg:px-16 flex flex-col">
      <style>{`
        @keyframes ai-shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ai-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ai-orbit-ring {
          background: conic-gradient(from 0deg, ${G.sky}, ${G.violet}, ${G.rose}, ${G.amber}, ${G.sky});
          animation: ai-orbit 3s linear infinite;
        }
        .ai-gradient-text {
          background: linear-gradient(90deg, ${G.sky}, ${G.violet}, ${G.rose});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ai-shimmer 3s ease infinite;
        }
        .ai-scrollbar::-webkit-scrollbar { width: 5px; }
        .ai-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .ai-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, ${G.sky}, ${G.violet}, ${G.rose});
          border-radius: 4px;
        }
        .quick-pill:hover {
          background: rgba(139,92,246,0.15) !important;
          border-color: rgba(139,92,246,0.45) !important;
          color: #e2e8f0 !important;
        }
      `}</style>

      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">

        {/* ── Page Header ── */}
        <div className="flex items-center gap-4 mb-6">
          {/* Animated avatar */}
          <div className="relative w-14 h-14 flex-shrink-0">
            <div className="absolute inset-[-3px] rounded-2xl ai-orbit-ring opacity-80" />
            <div
              className="relative w-full h-full rounded-2xl flex items-center justify-center"
              style={{ background: gradients.primary, boxShadow: '0 8px 24px rgba(139,92,246,0.4)' }}
            >
              <Bot size={26} className="text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="ai-gradient-text">{t.tutorTitle}</span>
              <Sparkles size={18} className="text-amber-400 animate-pulse" />
            </h1>
            <p className="text-sm text-zinc-400 mt-0.5">
              {t.tutorSubtitle}
            </p>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="p-2.5 rounded-xl text-zinc-500 hover:text-rose-400 transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            title={t.tutorClear}
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* ── Chat Area ── */}
        <div
          ref={chatContainerRef}
          className="flex-1 rounded-2xl p-4 mb-4 overflow-y-auto max-h-[60vh] space-y-4 ai-scrollbar"
          style={{
            background: 'rgba(8,8,24,0.6)',
            border: '1px solid rgba(139,92,246,0.12)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <AnimatePresence>
            {messages.map(msg => (
              <MotionDiv
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm"
                  style={{
                    background: msg.role === 'user'
                      ? `linear-gradient(135deg, ${G.sky}, #38bdf8)`
                      : `linear-gradient(135deg, ${G.sky}, ${G.violet})`,
                    boxShadow: msg.role === 'user'
                      ? '0 4px 12px rgba(14,165,233,0.3)'
                      : '0 4px 12px rgba(139,92,246,0.3)',
                  }}
                >
                  {msg.role === 'user' ? <User size={15} /> : <Bot size={15} />}
                </div>

                {/* Bubble */}
                <div
                  className="max-w-[80%] px-4 py-3 text-sm leading-relaxed"
                  style={msg.role === 'user'
                    ? {
                        background: gradients.userBubble,
                        borderRadius: '16px 4px 16px 16px',
                        color: '#ffffff',
                        boxShadow: '0 4px 16px rgba(14,165,233,0.2)',
                      }
                    : {
                        background: gradients.aiBubble,
                        border: '1px solid rgba(139,92,246,0.15)',
                        borderRadius: '4px 16px 16px 16px',
                        color: '#e2e8f0',
                      }}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </MotionDiv>
            ))}
          </AnimatePresence>

          {/* Loading dots */}
          {loading && (
            <div className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${G.sky}, ${G.violet})` }}
              >
                <Bot size={15} className="text-white" />
              </div>
              <div
                className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
                style={{ background: gradients.aiBubble, border: '1px solid rgba(139,92,246,0.15)', borderRadius: '4px 16px 16px 16px' }}
              >
                {[G.sky, G.violet, G.rose].map((color, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ background: color, animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Quick Questions ── */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="quick-pill px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(139,92,246,0.2)',
                }}
              >
                <Sparkles size={9} className="inline mr-1 opacity-70" />
                {q}
              </button>
            ))}
          </div>
        )}

        {/* ── Input Row ── */}
        <div className="flex gap-2">
          <div
            className="flex-1 flex items-center rounded-2xl transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: inputFocused
                ? `1px solid rgba(139,92,246,0.5)`
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: inputFocused ? '0 0 0 3px rgba(139,92,246,0.1)' : 'none',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={t.tutorPlaceholder}
              disabled={loading}
              className="flex-1 bg-transparent px-5 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-2xl text-white font-bold text-sm transition-all disabled:opacity-30 flex items-center gap-2 active:scale-95"
            style={{
              background: gradients.sendBtn,
              boxShadow: '0 4px 18px rgba(139,92,246,0.35)',
            }}
          >
            <Send size={15} />
            {t.tutorSend}
          </button>
        </div>

        <p className="text-center mt-3 text-xs" style={{ color: 'rgba(139,92,246,0.4)' }}>
          {t.tutorDisclaimer}
        </p>
      </div>
    </div>
  );
};

export default TutorPage;
