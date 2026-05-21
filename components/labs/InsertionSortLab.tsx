import React, { useState, useRef, useEffect, useCallback } from 'react';

interface SortEl { val: number; state: 'default' | 'sorted' | 'current' | 'comparing' | 'insert'; }

const InsertionSortLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<SortEl[]>(() =>
    [41, 18, 73, 29, 55, 12, 86, 37, 64, 22].map(v => ({ val: v, state: 'default' }))
  );
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [steps, setSteps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const stateRef = useRef({ arr: [41,18,73,29,55,12,86,37,64,22].map(v => ({ val: v, state: 'default' as SortEl['state'] })), i: 1, j: 1, key: 41 });
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generate = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    const a = Array.from({ length: 10 }, () => Math.floor(Math.random() * 88) + 12);
    const els = a.map(v => ({ val: v, state: 'default' as SortEl['state'] }));
    setElements(els); stateRef.current = { arr: [...els], i: 1, j: 1, key: els[0].val };
    setStatus('idle'); setSteps(0); setComparisons(0);
  };

  const doStep = useCallback((): boolean => {
    const { arr, i, j } = stateRef.current;
    const n = arr.length;
    if (i >= n) {
      const done = arr.map(e => ({ ...e, state: 'sorted' as SortEl['state'] }));
      setElements(done); setStatus('done'); return false;
    }
    const key = arr[i].val;
    let jj = j;
    if (jj > 0 && arr[jj - 1].val > key) {
      arr[jj] = { ...arr[jj - 1] };
      arr[jj - 1] = { val: key, state: 'insert' };
      setComparisons(c => c + 1);
      jj--;
      // Mark sorted region
      const display = arr.map((e, idx) => ({
        ...e,
        state: idx < i ? (idx === jj ? 'insert' : 'sorted') : idx === i ? 'current' : 'default'
      } as SortEl));
      display[i] = { val: arr[i].val, state: 'comparing' };
      setElements(display); setSteps(s => s + 1);
      stateRef.current = { arr, i, j: jj, key };
      return true;
    } else {
      arr[jj] = { val: key, state: 'sorted' };
      const newI = i + 1;
      const display = arr.map((e, idx) => ({
        ...e,
        state: idx <= i ? 'sorted' : idx === newI ? 'current' : 'default'
      } as SortEl));
      setElements(display); setSteps(s => s + 1);
      stateRef.current = { arr: display.map(e => ({ ...e })), i: newI, j: newI, key: newI < n ? display[newI].val : 0 };
      return newI < n;
    }
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const n = elements.length;
    const maxV = Math.max(...elements.map(e => e.val));
    const padX = 20, padBot = 48, padTop = 40;
    const totalW = W - padX * 2;
    const barW = totalW / n - 5;
    const availH = H - padBot - padTop;

    const colorMap = {
      default:    { fill: '#1e3a5f', stroke: '#2563eb', text: '#93c5fd' },
      sorted:     { fill: '#064e3b', stroke: '#10b981', text: '#6ee7b7' },
      current:    { fill: '#78350f', stroke: '#f59e0b', text: '#fcd34d' },
      comparing:  { fill: '#7f1d1d', stroke: '#ef4444', text: '#fca5a5' },
      insert:     { fill: '#4c1d95', stroke: '#a78bfa', text: '#ddd6fe' },
    };

    // Divider between sorted / unsorted
    const sortedCount = elements.filter(e => e.state === 'sorted').length;
    if (sortedCount > 0 && sortedCount < n) {
      const divX = padX + sortedCount * (barW + 5) - 3;
      ctx.strokeStyle = 'rgba(16,185,129,0.25)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]);
      ctx.beginPath(); ctx.moveTo(divX, padTop - 10); ctx.lineTo(divX, H - padBot); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(16,185,129,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'left';
      ctx.fillText('sorted ✓', divX + 4, padTop);
      ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.textAlign = 'right';
      ctx.fillText('unsorted', divX - 4, padTop);
    }

    elements.forEach((e, i) => {
      const x = padX + i * (barW + 5);
      const bh = Math.max(4, (e.val / maxV) * availH);
      const y = H - padBot - bh;
      const col = colorMap[e.state];

      ctx.shadowBlur = e.state !== 'default' ? 10 : 0; ctx.shadowColor = col.stroke;
      const grad = ctx.createLinearGradient(x, y, x + barW, y + bh);
      grad.addColorStop(0, col.fill + 'ee'); grad.addColorStop(1, col.fill);
      ctx.fillStyle = grad; ctx.beginPath(); ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]); ctx.fill();
      ctx.strokeStyle = col.stroke; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]); ctx.stroke();
      // Shine
      const shine = ctx.createLinearGradient(x, y, x + barW * 0.4, y + bh * 0.6);
      shine.addColorStop(0, 'rgba(255,255,255,0.12)'); shine.addColorStop(1, 'transparent');
      ctx.fillStyle = shine; ctx.beginPath(); ctx.roundRect(x, y, barW * 0.4, bh, [4, 4, 0, 0]); ctx.fill();
      ctx.shadowBlur = 0;

      if (bh > 24) {
        ctx.fillStyle = col.text; ctx.font = `bold ${barW > 34 ? 11 : 9}px Inter`; ctx.textAlign = 'center';
        ctx.fillText(e.val.toString(), x + barW / 2, y + 15);
      }
      ctx.fillStyle = e.state === 'current' ? '#fcd34d' : 'rgba(100,116,139,0.6)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText(i.toString(), x + barW / 2, H - padBot + 13);

      if (e.state === 'insert') {
        ctx.shadowBlur = 10; ctx.shadowColor = '#a78bfa';
        ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x - 2, y - 5); ctx.lineTo(x + barW + 2, y - 5); ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ddd6fe'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
        ctx.fillText('inserting', x + barW / 2, y - 10);
      }
    });

    // Status
    ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    const { i: ci } = stateRef.current;
    ctx.fillStyle = status === 'done' ? '#10b981' : '#60a5fa';
    ctx.fillText(status === 'done' ? '✓ Sorted! — O(n²) worst case' : status === 'idle' ? 'Insertion Sort — press Step or Auto Sort' : `Pass ${ci}/${elements.length} — key = ${stateRef.current.key}`, W / 2, 22);
  }, [elements, status]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">📥 Insertion Sort Visualiser</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">O(n²) · Pick key, shift right, insert · Efficient on nearly sorted data</p>
        </div>
        <button onClick={generate} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}>🔄 New Array</button>
      </div>
      <canvas ref={canvasRef} width={560} height={290} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(167,139,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-2">
          {[
            { label: '▶ Step', onClick: () => { setStatus('running'); doStep(); }, disabled: status === 'done', color: '#fbbf24' },
            { label: '⏩ Auto', onClick: () => { setStatus('running'); autoRef.current = setInterval(() => { if (!doStep() && autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; } }, 160); }, disabled: status === 'done' || !!autoRef.current, color: '#4ade80' },
            { label: '⏸ Pause', onClick: () => { if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; } }, disabled: !autoRef.current, color: '#f87171' },
          ].map(btn => (
            <button key={btn.label} onClick={btn.onClick} disabled={btn.disabled}
              className="flex-1 py-2 rounded-xl text-sm font-bold"
              style={{ background: btn.color + '20', color: btn.color, border: `1px solid ${btn.color}40`, opacity: btn.disabled ? 0.3 : 1 }}>
              {btn.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Steps', val: steps, color: '#a78bfa' },
            { label: 'Comparisons', val: comparisons, color: '#fbbf24' },
            { label: 'Status', val: status === 'done' ? 'Done ✓' : status === 'running' ? 'Running' : 'Ready', color: status === 'done' ? '#10b981' : '#64748b' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[7px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default InsertionSortLab;
