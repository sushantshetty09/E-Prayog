import React, { useState, useRef, useEffect, useCallback } from 'react';

const MAX_Q = 10;
let qIdCtr = 200;

interface QItem { val: number; id: number; }

const QueueLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [queue, setQueue] = useState<QItem[]>([{ val: 10, id: 201 }, { val: 20, id: 202 }, { val: 30, id: 203 }]);
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState('Queue initialized with 3 elements');
  const [msgType, setMsgType] = useState<'info' | 'success' | 'error'>('info');
  const [highlight, setHighlight] = useState<'front' | 'rear' | null>(null);
  const rafRef = useRef(0);

  const enqueue = () => {
    const v = parseInt(input);
    if (isNaN(v)) { setMsg('Enter a valid number!'); setMsgType('error'); return; }
    if (queue.length >= MAX_Q) { setMsg(`Queue OVERFLOW! Maximum size (${MAX_Q}) reached`); setMsgType('error'); return; }
    setQueue(q => [...q, { val: v, id: ++qIdCtr }]);
    setMsg(`ENQUEUE ${v} → added to REAR`); setMsgType('success'); setHighlight('rear');
    setInput(''); setTimeout(() => setHighlight(null), 800);
  };

  const dequeue = () => {
    if (queue.length === 0) { setMsg('Queue UNDERFLOW! Queue is empty'); setMsgType('error'); return; }
    const front = queue[0].val;
    setHighlight('front');
    setTimeout(() => { setQueue(q => q.slice(1)); setHighlight(null); }, 300);
    setMsg(`DEQUEUE → removed ${front} from FRONT`); setMsgType('success');
  };

  const peek = () => {
    if (!queue.length) { setMsg('Queue is EMPTY — nothing to peek'); setMsgType('error'); return; }
    setMsg(`PEEK FRONT → ${queue[0].val}  |  PEEK REAR → ${queue[queue.length - 1].val}`); setMsgType('info');
    setHighlight('front'); setTimeout(() => setHighlight(null), 1000);
  };

  const clear = () => { setQueue([]); setMsg('Queue cleared'); setMsgType('info'); setHighlight(null); };

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cy = H / 2, slotH = 58, slotW = (W - 60) / MAX_Q - 4;
    const startX = 28;

    // ── FIFO direction arrow ──
    ctx.strokeStyle = 'rgba(71,85,105,0.4)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(startX, cy - 55); ctx.lineTo(W - 28, cy - 55); ctx.stroke();
    ctx.fillStyle = 'rgba(71,85,105,0.4)';
    ctx.beginPath(); ctx.moveTo(W - 22, cy - 55); ctx.lineTo(W - 32, cy - 60); ctx.lineTo(W - 32, cy - 50); ctx.fill();
    ctx.fillStyle = 'rgba(100,116,139,0.4)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('← DEQUEUE (FRONT)', startX + 80, cy - 62);
    ctx.fillText('ENQUEUE (REAR) →', W - 90, cy - 62);

    // ── Slot backgrounds (all MAX_Q slots) ──
    for (let i = 0; i < MAX_Q; i++) {
      const sx = startX + i * (slotW + 4);
      ctx.fillStyle = i < queue.length ? 'rgba(30,58,138,0.15)' : 'rgba(15,23,42,0.5)';
      ctx.beginPath(); ctx.roundRect(sx, cy - slotH / 2, slotW, slotH, 5); ctx.fill();
      ctx.strokeStyle = i < queue.length ? 'rgba(37,99,235,0.2)' : 'rgba(51,65,85,0.25)'; ctx.lineWidth = 1;
      ctx.stroke();
    }

    // ── Queue items ──
    queue.forEach((item, i) => {
      const sx = startX + i * (slotW + 4);
      const isFront = i === 0;
      const isRear = i === queue.length - 1;
      const isHlFront = highlight === 'front' && isFront;
      const isHlRear = highlight === 'rear' && isRear;
      const isHl = isHlFront || isHlRear;

      const grad = ctx.createLinearGradient(sx, cy - slotH / 2, sx + slotW, cy + slotH / 2);
      if (isFront) { grad.addColorStop(0, '#15803d99'); grad.addColorStop(1, '#14532d'); }
      else if (isRear) { grad.addColorStop(0, '#1d4ed899'); grad.addColorStop(1, '#1e3a8a'); }
      else { grad.addColorStop(0, '#1e3a5f99'); grad.addColorStop(1, '#1e3a5f'); }
      ctx.fillStyle = grad;
      ctx.shadowBlur = isHl ? 18 : isFront || isRear ? 8 : 3;
      ctx.shadowColor = isFront ? '#10b981' : isRear ? '#60a5fa' : '#1e40af';
      ctx.beginPath(); ctx.roundRect(sx + 2, cy - slotH / 2 + 2, slotW - 4, slotH - 4, 4); ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = isFront ? '#10b981' : isRear ? '#60a5fa' : '#2563eb'; ctx.lineWidth = 1.5; ctx.stroke();

      // Shine
      const shine = ctx.createLinearGradient(sx, cy - slotH / 2, sx + slotW * 0.4, cy);
      shine.addColorStop(0, 'rgba(255,255,255,0.1)'); shine.addColorStop(1, 'transparent');
      ctx.fillStyle = shine; ctx.beginPath(); ctx.roundRect(sx + 2, cy - slotH / 2 + 2, slotW * 0.4, slotH - 4, [4, 0, 0, 4]); ctx.fill();

      // Value
      ctx.fillStyle = isFront ? '#6ee7b7' : isRear ? '#bfdbfe' : '#93c5fd';
      ctx.font = `bold ${slotW > 40 ? 15 : 12}px monospace`; ctx.textAlign = 'center';
      ctx.fillText(item.val.toString(), sx + slotW / 2, cy + 6);

      // Index
      ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter';
      ctx.fillText(i.toString(), sx + slotW / 2, cy + slotH / 2 - 5);
    });

    // ── FRONT / REAR pointers ──
    if (queue.length > 0) {
      // FRONT (left side, green)
      const frontX = startX + slotW / 2;
      ctx.shadowBlur = 8; ctx.shadowColor = '#10b981';
      ctx.fillStyle = '#10b981'; ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(frontX, cy + slotH / 2 + 5); ctx.lineTo(frontX, cy + slotH / 2 + 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(frontX - 6, cy + slotH / 2 + 8); ctx.lineTo(frontX, cy + slotH / 2 + 3); ctx.lineTo(frontX + 6, cy + slotH / 2 + 8); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#10b981'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText('FRONT', frontX, cy + slotH / 2 + 34);

      // REAR (right side, blue)
      const rearX = startX + (queue.length - 1) * (slotW + 4) + slotW / 2;
      ctx.shadowBlur = 8; ctx.shadowColor = '#60a5fa';
      ctx.fillStyle = '#60a5fa'; ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(rearX, cy - slotH / 2 - 5); ctx.lineTo(rearX, cy - slotH / 2 - 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rearX - 6, cy - slotH / 2 - 8); ctx.lineTo(rearX, cy - slotH / 2 - 3); ctx.lineTo(rearX + 6, cy - slotH / 2 - 8); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText('REAR', rearX, cy - slotH / 2 - 28);
    }

    // Empty label
    if (queue.length === 0) {
      ctx.fillStyle = 'rgba(100,116,139,0.4)'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
      ctx.fillText('Queue is EMPTY', W / 2, cy + 6);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [queue, highlight]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const msgColors = { info: '#60a5fa', success: '#10b981', error: '#ef4444' };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🚦 Queue — FIFO Data Structure</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">First-In First-Out · Enqueue at REAR · Dequeue from FRONT</p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded-lg" style={{ background: queue.length >= MAX_Q ? 'rgba(239,68,68,0.15)' : 'rgba(96,165,250,0.12)', color: queue.length >= MAX_Q ? '#f87171' : '#60a5fa', border: '1px solid rgba(255,255,255,0.08)' }}>
          {queue.length}/{MAX_Q}
        </div>
      </div>
      <canvas ref={canvasRef} width={520} height={240} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-2">
          <input type="number" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && enqueue()}
            placeholder="Enter value..."
            className="flex-1 px-3 py-2 rounded-xl text-sm font-mono"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} />
          <button onClick={enqueue} className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: 'rgba(96,165,250,0.2)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }}>
            ENQUEUE →
          </button>
        </div>
        <div className="flex gap-2">
          {[
            { label: '← DEQUEUE', fn: dequeue, color: '#10b981' },
            { label: '👁 PEEK', fn: peek, color: '#fbbf24' },
            { label: '🗑 CLEAR', fn: clear, color: '#94a3b8' },
          ].map(btn => (
            <button key={btn.label} onClick={btn.fn} className="flex-1 py-2 rounded-xl text-sm font-bold"
              style={{ background: btn.color + '18', color: btn.color, border: `1px solid ${btn.color}35` }}>
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
export default QueueLab;
