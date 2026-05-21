import React, { useState, useRef, useEffect, useCallback } from 'react';

type SortState = 'idle' | 'running' | 'done';

const COLORS = {
  default: { fill: '#1e40af', stroke: '#1d4ed8', text: '#93c5fd' },
  comparing: { fill: '#b45309', stroke: '#f59e0b', text: '#fcd34d' },
  swapping: { fill: '#991b1b', stroke: '#ef4444', text: '#fca5a5' },
  sorted: { fill: '#065f46', stroke: '#10b981', text: '#6ee7b7' },
  pivot: { fill: '#5b21b6', stroke: '#a78bfa', text: '#ddd6fe' },
};

const BubbleSortLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arr, setArr] = useState([64, 34, 25, 12, 22, 11, 90, 45, 38, 72]);
  const [comparing, setComparing] = useState<[number, number] | null>(null);
  const [swapping, setSwapping] = useState<[number, number] | null>(null);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  const [state, setState] = useState<SortState>('idle');
  const [steps, setSteps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const stateRef = useRef({ arr: [...arr], i: 0, j: 0, sortedSet: new Set<number>() });
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generate = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    const a = Array.from({ length: 10 }, () => Math.floor(Math.random() * 88) + 12);
    setArr(a); stateRef.current = { arr: [...a], i: 0, j: 0, sortedSet: new Set() };
    setState('idle'); setSteps(0); setComparisons(0); setSwaps(0);
    setComparing(null); setSwapping(null); setSortedIndices(new Set());
  };

  const doStep = useCallback((): boolean => {
    const { arr: a, i, j } = stateRef.current;
    const n = a.length;
    if (i >= n - 1) {
      const allSorted = new Set(Array.from({ length: n }, (_, k) => k));
      setSortedIndices(allSorted); setState('done'); setComparing(null); setSwapping(null);
      return false;
    }
    setComparing([j, j + 1]); setSwapping(null);
    setComparisons(c => c + 1);
    const didSwap = a[j] > a[j + 1];
    if (didSwap) {
      [a[j], a[j + 1]] = [a[j + 1], a[j]];
      setSwapping([j, j + 1]); setSwaps(s => s + 1);
    }
    setArr([...a]); setSteps(s => s + 1);
    let ni = i, nj = j + 1;
    if (j + 1 >= n - 1 - i) {
      const newSorted = new Set(stateRef.current.sortedSet);
      newSorted.add(n - 1 - i);
      stateRef.current.sortedSet = newSorted;
      setSortedIndices(new Set(newSorted));
      ni = i + 1; nj = 0;
    }
    stateRef.current = { ...stateRef.current, arr: a, i: ni, j: nj };
    return ni < n - 1;
  }, []);

  const handleStep = () => { setState('running'); doStep(); };

  const handleAuto = () => {
    if (state === 'done') return;
    setState('running');
    autoRef.current = setInterval(() => {
      const cont = doStep();
      if (!cont && autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
    }, 180);
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
    const maxV = Math.max(...arr);
    const padX = 20, padBot = 50, padTop = 45;
    const totalW = W - padX * 2;
    const barW = totalW / n - 5;
    const availH = H - padBot - padTop;

    // Title area
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    ctx.fillText(state === 'done' ? '✓ Sorted! O(n²) worst case' : `Comparing indices [${comparing ? comparing.join(', ') : '—'}] · Pass ${stateRef.current.i + 1}`, W / 2, 20);

    arr.forEach((v, i) => {
      const x = padX + i * (barW + 5);
      const bh = Math.max(4, (v / maxV) * availH);
      const y = H - padBot - bh;
      const isCmp = comparing && (i === comparing[0] || i === comparing[1]);
      const isSw = swapping && (i === swapping[0] || i === swapping[1]);
      const isSorted = sortedIndices.has(i);
      const col = isSorted ? COLORS.sorted : isSw ? COLORS.swapping : isCmp ? COLORS.comparing : COLORS.default;

      // Bar shadow
      ctx.shadowBlur = isCmp || isSw ? 12 : isSorted ? 8 : 0;
      ctx.shadowColor = col.stroke;

      // Bar gradient
      const grad = ctx.createLinearGradient(x, y, x + barW, y + bh);
      grad.addColorStop(0, col.fill + 'dd'); grad.addColorStop(1, col.fill);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]); ctx.fill();

      // Bar border
      ctx.strokeStyle = col.stroke; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]); ctx.stroke();
      ctx.shadowBlur = 0;

      // Shine
      const shine = ctx.createLinearGradient(x, y, x + barW * 0.3, y + bh * 0.5);
      shine.addColorStop(0, 'rgba(255,255,255,0.15)'); shine.addColorStop(1, 'transparent');
      ctx.fillStyle = shine;
      ctx.beginPath(); ctx.roundRect(x, y, barW * 0.4, bh, [4, 4, 0, 0]); ctx.fill();

      // Value label on bar
      if (bh > 28) {
        ctx.fillStyle = col.text; ctx.font = `bold ${barW > 35 ? 11 : 9}px Inter`; ctx.textAlign = 'center';
        ctx.fillText(v.toString(), x + barW / 2, y + 16);
      }

      // Index label below
      ctx.fillStyle = isCmp ? '#fcd34d' : 'rgba(100,116,139,0.7)'; ctx.font = '9px Inter';
      ctx.fillText(i.toString(), x + barW / 2, H - padBot + 14);

      // Comparison bracket
      if (isCmp) {
        ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x - 2, H - padBot + 22); ctx.lineTo(x + barW + 2, H - padBot + 22); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 2, H - padBot + 18); ctx.lineTo(x - 2, H - padBot + 25); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x + barW + 2, H - padBot + 18); ctx.lineTo(x + barW + 2, H - padBot + 25); ctx.stroke();
      }

      // Swap arrow
      if (isSw && swapping && i === swapping[0]) {
        const x2 = padX + swapping[1] * (barW + 5);
        ctx.strokeStyle = '#f87171'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x + barW / 2, y - 8); ctx.lineTo(x2 + barW / 2, y - 8);
        ctx.moveTo(x2 + barW / 2 - 6, y - 14); ctx.lineTo(x2 + barW / 2, y - 8); ctx.lineTo(x2 + barW / 2 - 6, y - 2);
        ctx.stroke();
      }
    });

    // Sorted boundary line
    if (sortedIndices.size > 0 && !Array.from(sortedIndices).includes(0)) {
      const firstSorted = n - sortedIndices.size;
      const bx = padX + firstSorted * (barW + 5) - 3;
      ctx.strokeStyle = 'rgba(16,185,129,0.3)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(bx, padTop); ctx.lineTo(bx, H - padBot); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(16,185,129,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'left';
      ctx.fillText('sorted ✓', bx + 4, padTop + 12);
    }
  }, [arr, comparing, swapping, sortedIndices, state]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🫧 Bubble Sort Visualiser</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">O(n²) · Compare adjacent → swap if out of order · Largest bubbles to end</p>
        </div>
        <button onClick={generate} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(96,165,250,0.12)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)' }}>🔄 New Array</button>
      </div>

      <canvas ref={canvasRef} width={560} height={300} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-2">
          <button onClick={handleStep} disabled={state === 'done'}
            className="flex-1 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', opacity: state === 'done' ? 0.3 : 1 }}>
            ▶ Step
          </button>
          <button onClick={handleAuto} disabled={state === 'done' || !!autoRef.current}
            className="flex-1 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', opacity: (state === 'done' || !!autoRef.current) ? 0.3 : 1 }}>
            ⏩ Auto Sort
          </button>
          <button onClick={() => { if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; } setState('idle'); }}
            disabled={!autoRef.current}
            className="px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', opacity: autoRef.current ? 1 : 0.3 }}>
            ⏸ Pause
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Steps', val: steps.toString(), color: '#60a5fa' },
            { label: 'Comparisons', val: comparisons.toString(), color: '#fbbf24' },
            { label: 'Swaps', val: swaps.toString(), color: '#f87171' },
            { label: 'Status', val: state === 'done' ? 'Sorted ✓' : state === 'running' ? 'Running' : 'Ready', color: state === 'done' ? '#10b981' : state === 'running' ? '#fbbf24' : '#64748b' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[7px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 text-[9px] text-zinc-600 justify-center">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded inline-block" style={{ background: '#1e40af' }} />Default</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded inline-block" style={{ background: '#b45309' }} />Comparing</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded inline-block" style={{ background: '#991b1b' }} />Swapping</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded inline-block" style={{ background: '#065f46' }} />Sorted</span>
        </div>
      </div>
    </div>
  );
};
export default BubbleSortLab;
