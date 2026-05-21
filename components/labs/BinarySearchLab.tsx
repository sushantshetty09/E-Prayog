import React, { useState, useRef, useEffect, useCallback } from 'react';

type SearchState = 'idle' | 'found' | 'notfound' | 'searching';

const BinarySearchLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arr] = useState(() => Array.from({ length: 14 }, (_, i) => i * 7 + 5)); // sorted
  const [target, setTarget] = useState(47);
  const [low, setLow] = useState(-1);
  const [high, setHigh] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [foundIdx, setFoundIdx] = useState(-1);
  const [state, setState] = useState<SearchState>('idle');
  const [steps, setSteps] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const stateRef = useRef({ low: 0, high: arr.length - 1 });
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    setLow(-1); setHigh(-1); setMid(-1); setFoundIdx(-1);
    setState('idle'); setSteps(0); setLog([]);
    stateRef.current = { low: 0, high: arr.length - 1 };
  };

  const doStep = useCallback((): boolean => {
    const { low: l, high: h } = stateRef.current;
    if (l > h) {
      setState('notfound'); setLow(-1); setHigh(-1); setMid(-1);
      setLog(lg => [...lg, `❌ Not found — search space exhausted`]);
      return false;
    }
    const m = Math.floor((l + h) / 2);
    setLow(l); setHigh(h); setMid(m); setState('searching');
    setSteps(s => s + 1);
    setLog(lg => [...lg, `Step: low=${l}, high=${h}, mid=${m}, arr[mid]=${arr[m]}`]);
    if (arr[m] === target) {
      setFoundIdx(m); setState('found'); setMid(-1);
      setLog(lg => [...lg, `✓ Found ${target} at index ${m}!`]);
      return false;
    } else if (arr[m] < target) {
      stateRef.current = { low: m + 1, high: h };
      setLog(lg => [...lg, `  ${arr[m]} < ${target} → search RIGHT half`]);
    } else {
      stateRef.current = { low: l, high: m - 1 };
      setLog(lg => [...lg, `  ${arr[m]} > ${target} → search LEFT half`]);
    }
    return true;
  }, [arr, target]);

  const handleAuto = () => {
    reset();
    stateRef.current = { low: 0, high: arr.length - 1 };
    setState('searching');
    autoRef.current = setInterval(() => {
      const cont = doStep();
      if (!cont && autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
    }, 700);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const n = arr.length;
    const padX = 20, slotH = 52, slotW = (W - padX * 2) / n - 3;
    const arrY = H / 2 - 26;

    // ── Array cells ──
    arr.forEach((v, i) => {
      const sx = padX + i * (slotW + 3);
      const isLow = i === low, isHigh = i === high, isMid = i === mid;
      const isFound = i === foundIdx;
      const inRange = low >= 0 && high >= 0 && i >= low && i <= high;
      const isEliminated = low >= 0 && !inRange && foundIdx < 0;

      let fillColor = 'rgba(30,41,59,0.6)';
      let strokeColor = 'rgba(51,65,85,0.4)';
      let textColor = '#475569';

      if (isFound) { fillColor = 'rgba(6,78,59,0.8)'; strokeColor = '#10b981'; textColor = '#6ee7b7'; }
      else if (isMid) { fillColor = 'rgba(120,90,10,0.8)'; strokeColor = '#f59e0b'; textColor = '#fcd34d'; }
      else if (inRange) { fillColor = 'rgba(30,58,138,0.4)'; strokeColor = '#2563eb'; textColor = '#93c5fd'; }
      else if (isEliminated) { fillColor = 'rgba(15,23,42,0.3)'; strokeColor = 'rgba(51,65,85,0.2)'; textColor = 'rgba(71,85,105,0.4)'; }

      ctx.shadowBlur = isFound ? 15 : isMid ? 12 : inRange ? 4 : 0;
      ctx.shadowColor = isFound ? '#10b981' : isMid ? '#f59e0b' : '#2563eb';
      ctx.fillStyle = fillColor;
      ctx.beginPath(); ctx.roundRect(sx, arrY, slotW, slotH, 5); ctx.fill();
      ctx.strokeStyle = strokeColor; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.shadowBlur = 0;

      // Eliminated overlay
      if (isEliminated) {
        ctx.fillStyle = 'rgba(15,23,42,0.5)';
        ctx.beginPath(); ctx.roundRect(sx, arrY, slotW, slotH, 5); ctx.fill();
      }

      // Value
      ctx.fillStyle = textColor; ctx.font = `bold ${slotW > 32 ? 13 : 10}px monospace`; ctx.textAlign = 'center';
      ctx.fillText(v.toString(), sx + slotW / 2, arrY + slotH / 2 + 5);

      // Index below
      ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter';
      ctx.fillText(i.toString(), sx + slotW / 2, arrY + slotH + 13);
    });

    // ── Low / High / Mid pointers ──
    const drawPointer = (idx: number, label: string, above: boolean, color: string) => {
      if (idx < 0) return;
      const px = padX + idx * (slotW + 3) + slotW / 2;
      const py = above ? arrY - 6 : arrY + slotH + 6;
      const arrowDir = above ? 1 : -1;
      ctx.shadowBlur = 8; ctx.shadowColor = color;
      ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py + arrowDir * 20);
      ctx.lineTo(px, py + arrowDir * 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(px - 5, py + arrowDir * 10);
      ctx.lineTo(px, py + arrowDir * 3);
      ctx.lineTo(px + 5, py + arrowDir * 10);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = color; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(label, px, py + arrowDir * 28);
    };

    drawPointer(low, 'low', false, '#60a5fa');
    drawPointer(high, 'high', false, '#f87171');
    drawPointer(mid, 'mid', true, '#f59e0b');
    if (foundIdx >= 0) drawPointer(foundIdx, '✓ FOUND!', true, '#10b981');

    // Range bracket
    if (low >= 0 && high >= 0) {
      const lx = padX + low * (slotW + 3);
      const rx = padX + high * (slotW + 3) + slotW;
      ctx.strokeStyle = 'rgba(37,99,235,0.3)'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(lx - 2, arrY - 2); ctx.lineTo(lx - 2, arrY + slotH + 2); ctx.lineTo(rx + 2, arrY + slotH + 2); ctx.lineTo(rx + 2, arrY - 2); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Status
    ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    const status = state === 'found' ? `✓ Found ${target} at index ${foundIdx}! (${steps} steps)` :
      state === 'notfound' ? `✗ ${target} not in array` :
      state === 'searching' ? `Searching... mid=${mid}, arr[mid]=${mid >= 0 ? arr[mid] : '—'}` :
      `Target: ${target} · Array size: ${n} · Max steps: ⌈log₂(${n})⌉ = ${Math.ceil(Math.log2(n))}`;
    ctx.fillStyle = state === 'found' ? '#10b981' : state === 'notfound' ? '#ef4444' : '#60a5fa';
    ctx.fillText(status, W / 2, 22);
  }, [arr, low, high, mid, foundIdx, state, steps, target]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔍 Binary Search Visualiser</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">O(log n) · Halves search space each step · Requires sorted array</p>
        </div>
        <button onClick={reset} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>🔄 Reset</button>
      </div>
      <canvas ref={canvasRef} width={560} height={220} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(245,158,11,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <label className="text-xs text-zinc-400 whitespace-nowrap">Target</label>
          <input type="range" min={5} max={96} step={7} value={target} onChange={e => { setTarget(Number(e.target.value)); reset(); }}
            className="flex-1 h-1.5 rounded-full accent-amber-400" />
          <span className="text-xs font-mono text-amber-400 w-8">{target}</span>
          <input type="number" value={target} onChange={e => { setTarget(Number(e.target.value)); reset(); }}
            className="w-16 px-2 py-1 rounded-lg text-xs font-mono" style={{ background: 'rgba(255,255,255,0.06)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)', outline: 'none' }} />
        </div>
        <div className="flex gap-2">
          <button onClick={() => { if (state !== 'searching') { reset(); stateRef.current = { low: 0, high: arr.length - 1 }; } doStep(); setState('searching'); }}
            disabled={state === 'found' || state === 'notfound'}
            className="flex-1 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', opacity: (state === 'found' || state === 'notfound') ? 0.3 : 1 }}>
            ▶ Step
          </button>
          <button onClick={handleAuto} className="flex-1 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
            ⏩ Auto Search
          </button>
        </div>
        <div className="max-h-20 overflow-y-auto flex flex-col gap-0.5">
          {log.slice(-4).map((l, i) => (
            <div key={i} className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ color: l.startsWith('✓') ? '#10b981' : l.startsWith('❌') ? '#f87171' : '#64748b', background: 'rgba(255,255,255,0.03)' }}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BinarySearchLab;
