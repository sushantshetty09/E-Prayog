import React, { useState, useRef, useEffect, useCallback } from 'react';

const MAX = 12;

interface StackItem { val: number | string; id: number; }
let idCtr = 100;

const StackLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stack, setStack] = useState<StackItem[]>([{ val: 30, id: 1 }, { val: 20, id: 2 }, { val: 10, id: 3 }]);
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState('Stack initialized with 3 elements');
  const [msgType, setMsgType] = useState<'info' | 'success' | 'error'>('info');
  const lastOpRef = useRef<'push' | 'pop' | null>(null);
  const animatingRef = useRef(false);
  const rafRef = useRef(0);
  const animTRef = useRef(0);
  const animDirRef = useRef<'push' | 'pop'>('push');

  const push = () => {
    const v = parseInt(input);
    if (isNaN(v)) { setMsg('Enter a valid number!'); setMsgType('error'); return; }
    if (stack.length >= MAX) { setMsg(`Stack OVERFLOW! Maximum size (${MAX}) reached`); setMsgType('error'); return; }
    setStack(s => [{ val: v, id: ++idCtr }, ...s]);
    setMsg(`PUSH ${v} → Top of stack`); setMsgType('success'); lastOpRef.current = 'push';
    setInput(''); animTRef.current = 0; animDirRef.current = 'push'; animatingRef.current = true;
    setTimeout(() => { animatingRef.current = false; }, 500);
  };

  const pop = () => {
    if (stack.length === 0) { setMsg('Stack UNDERFLOW! Stack is empty'); setMsgType('error'); return; }
    const top = stack[0].val;
    setMsg(`POP → removed ${top} from top`); setMsgType('success'); lastOpRef.current = 'pop';
    animDirRef.current = 'pop'; animTRef.current = 0; animatingRef.current = true;
    setTimeout(() => { setStack(s => s.slice(1)); animatingRef.current = false; }, 300);
  };

  const peek = () => {
    if (stack.length === 0) { setMsg('Stack is EMPTY: nothing to peek'); setMsgType('error'); return; }
    setMsg(`PEEK → Top element is ${stack[0].val}`); setMsgType('info');
  };

  const clear = () => { setStack([]); setMsg('Stack cleared'); setMsgType('info'); lastOpRef.current = null; };

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const slotW = 130, slotH = 36, slotGap = 6;
    const stackX = W / 2 - slotW / 2;
    const botY = H - 45;

    // ── Stack container (array slots) ──
    for (let i = 0; i < MAX; i++) {
      const sy = botY - i * (slotH + slotGap);
      const isEmpty = i >= stack.length;
      ctx.fillStyle = isEmpty ? 'rgba(30,41,59,0.4)' : 'rgba(30,58,138,0.2)';
      ctx.beginPath(); ctx.roundRect(stackX, sy - slotH, slotW, slotH, 5); ctx.fill();
      ctx.strokeStyle = isEmpty ? 'rgba(51,65,85,0.3)' : 'rgba(37,99,235,0.2)'; ctx.lineWidth = 1;
      ctx.stroke();
      // Index label
      ctx.fillStyle = 'rgba(71,85,105,0.5)'; ctx.font = '9px Inter'; ctx.textAlign = 'right';
      ctx.fillText(`[${i}]`, stackX - 8, sy - slotH / 2 + 4);
    }

    // Side walls
    ctx.strokeStyle = 'rgba(71,85,105,0.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(stackX - 3, botY); ctx.lineTo(stackX - 3, botY - (MAX) * (slotH + slotGap)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(stackX + slotW + 3, botY); ctx.lineTo(stackX + slotW + 3, botY - (MAX) * (slotH + slotGap)); ctx.stroke();
    // Bottom plate
    ctx.beginPath(); ctx.moveTo(stackX - 8, botY + 2); ctx.lineTo(stackX + slotW + 8, botY + 2); ctx.stroke();
    ctx.fillStyle = 'rgba(71,85,105,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('BOTTOM', W / 2, botY + 15);

    // ── Stack elements ──
    stack.forEach((item, i) => {
      const sy = botY - i * (slotH + slotGap);
      const isTop = i === 0;

      const grad = ctx.createLinearGradient(stackX, sy - slotH, stackX + slotW, sy);
      if (isTop) { grad.addColorStop(0, '#1d4ed8dd'); grad.addColorStop(1, '#1e40af'); }
      else { grad.addColorStop(0, '#1e3a5fcc'); grad.addColorStop(1, '#1e3a5f'); }
      ctx.fillStyle = grad;
      ctx.shadowBlur = isTop ? 15 : 5; ctx.shadowColor = isTop ? '#3b82f6' : '#1e40af';
      ctx.beginPath(); ctx.roundRect(stackX + 2, sy - slotH + 2, slotW - 4, slotH - 4, 4); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = isTop ? '#60a5fa' : '#2563eb'; ctx.lineWidth = 1.5; ctx.stroke();

      // Shine
      const shine = ctx.createLinearGradient(stackX, sy - slotH, stackX, sy - slotH + 10);
      shine.addColorStop(0, 'rgba(255,255,255,0.15)'); shine.addColorStop(1, 'transparent');
      ctx.fillStyle = shine; ctx.beginPath(); ctx.roundRect(stackX + 2, sy - slotH + 2, slotW - 4, 12, [4, 4, 0, 0]); ctx.fill();

      // Value
      ctx.fillStyle = isTop ? '#bfdbfe' : '#93c5fd'; ctx.font = `bold ${isTop ? 16 : 14}px monospace`; ctx.textAlign = 'center';
      ctx.fillText(item.val.toString(), W / 2, sy - slotH / 2 + 5);
    });

    // ── TOP pointer ──
    if (stack.length > 0) {
      const topY = botY - (slotH + slotGap) / 2;
      ctx.shadowBlur = 8; ctx.shadowColor = '#f59e0b';
      ctx.fillStyle = '#f59e0b'; ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(stackX + slotW + 25, topY); ctx.lineTo(stackX + slotW + 5, topY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(stackX + slotW + 12, topY - 5); ctx.lineTo(stackX + slotW + 5, topY); ctx.lineTo(stackX + slotW + 12, topY + 5); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'left';
      ctx.fillText(`TOP [${stack.length - 1}]`, stackX + slotW + 28, topY + 4);
    } else {
      ctx.fillStyle = '#ef4444'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'left';
      ctx.fillText('EMPTY', stackX + slotW + 28, botY - 15);
    }

    // ── Capacity bar (right) ──
    const capX = W - 32, capTop = 40, capH = H - 80;
    const fillH = (stack.length / MAX) * capH;
    ctx.fillStyle = 'rgba(30,41,59,0.5)'; ctx.beginPath(); ctx.roundRect(capX, capTop, 16, capH, 4); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
    const capGrad = ctx.createLinearGradient(capX, capTop + capH - fillH, capX, capTop + capH);
    capGrad.addColorStop(0, stack.length > MAX * 0.8 ? '#ef4444' : '#10b981');
    capGrad.addColorStop(1, stack.length > MAX * 0.8 ? '#7f1d1d' : '#065f46');
    ctx.fillStyle = capGrad; ctx.beginPath(); ctx.roundRect(capX, capTop + capH - fillH, 16, fillH, 4); ctx.fill();
    ctx.fillStyle = '#64748b'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`${stack.length}/${MAX}`, capX + 8, capTop - 8);

    // TOP label
    ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter';
    ctx.fillText('CAP', capX + 8, H - 45);

    rafRef.current = requestAnimationFrame(draw);
  }, [stack]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const msgColors = { info: '#60a5fa', success: '#10b981', error: '#ef4444' };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">📚 Stack: LIFO Data Structure</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Last-In First-Out · Push / Pop / Peek · Overflow & Underflow</p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded-lg" style={{ background: stack.length > MAX * 0.8 ? 'rgba(239,68,68,0.15)' : 'rgba(96,165,250,0.12)', color: stack.length > MAX * 0.8 ? '#f87171' : '#60a5fa', border: '1px solid rgba(255,255,255,0.08)' }}>
          {stack.length}/{MAX}
        </div>
      </div>
      <canvas ref={canvasRef} width={380} height={350} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-2">
          <input type="number" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && push()}
            placeholder="Enter value..."
            aria-label="New stack element value"
            className="flex-1 px-3 py-2 rounded-xl text-sm font-mono"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} />
          <button onClick={push} className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>PUSH</button>
        </div>
        <div className="flex gap-2">
          {[
            { label: '⬆ POP', fn: pop, color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
            { label: '👁 PEEK', fn: peek, color: '#fbbf24', bg: 'rgba(245,158,11,0.15)' },
            { label: '🗑 CLEAR', fn: clear, color: '#94a3b8', bg: 'rgba(148,163,184,0.08)' },
          ].map(btn => (
            <button key={btn.label} onClick={btn.fn} className="flex-1 py-2 rounded-xl text-sm font-bold"
              style={{ background: btn.bg, color: btn.color, border: `1px solid ${btn.color}40` }}>
              {btn.label}
            </button>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 text-xs font-mono" style={{ background: msgColors[msgType] + '12', border: `1px solid ${msgColors[msgType]}30`, color: msgColors[msgType] }}>
          {msg}
        </div>
      </div>
    </div>
  );
};
export default StackLab;
