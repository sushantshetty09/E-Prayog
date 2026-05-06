import React, { useState, useRef, useEffect, useCallback } from 'react';

const DEFAULT_DATA = [12, 15, 18, 22, 25, 18, 30, 15, 22, 28, 20, 16, 24, 19, 26];

const StatisticsLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rawInput, setRawInput] = useState(DEFAULT_DATA.join(', '));
  const [data, setData] = useState<number[]>(DEFAULT_DATA);
  const [showCurve, setShowCurve] = useState(true);
  const [showBoxPlot, setShowBoxPlot] = useState(true);
  const rafRef = useRef(0);
  const animRef = useRef(0); // 0→1 entrance animation

  // ── Statistics ──
  const sorted = [...data].sort((a, b) => a - b);
  const n = data.length;
  const mean = data.reduce((s, v) => s + v, 0) / n;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const freq: Record<number, number> = {};
  data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
  const maxFreq2 = Math.max(...Object.values(freq));
  const modes = Object.entries(freq).filter(([, f]) => f === maxFreq2).map(([v]) => Number(v));
  const q1 = sorted[Math.floor(n / 4)];
  const q3 = sorted[Math.floor((3 * n) / 4)];
  const iqr = q3 - q1;
  const minVal = sorted[0], maxVal2 = sorted[n - 1];
  const range2 = maxVal2 - minVal;

  useEffect(() => {
    animRef.current = 0;
    const startTime = performance.now();
    const animate = (ts: number) => {
      animRef.current = Math.min(1, (ts - startTime) / 700);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [data]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const anim = animRef.current;

    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const padL = 52, padR = 24, padT = 30, padB = showBoxPlot ? 90 : 55;
    const gw = W - padL - padR, gh = H - padT - padB;
    const ox = padL, oy = padT + gh;

    // ── Unique bins (sorted distinct values) ──
    const uniqueVals = Object.keys(freq).map(Number).sort((a, b) => a - b);
    const barW2 = Math.min(gw / uniqueVals.length - 5, 50);
    const xStep = gw / uniqueVals.length;
    const yScale = (gh * 0.85) / maxFreq2;

    // Standard deviation band
    if (showCurve && anim > 0.4) {
      const sdBandAlpha = (anim - 0.4) * 0.4;
      const x1 = ox + ((mean - stdDev - minVal) / range2) * gw;
      const x2 = ox + ((mean + stdDev - minVal) / range2) * gw;
      const sdGrad = ctx.createLinearGradient(x1, 0, x2, 0);
      sdGrad.addColorStop(0, `rgba(16,185,129,0)`);
      sdGrad.addColorStop(0.5, `rgba(16,185,129,${sdBandAlpha})`);
      sdGrad.addColorStop(1, `rgba(16,185,129,0)`);
      ctx.fillStyle = sdGrad; ctx.fillRect(x1, padT, x2 - x1, gh);
    }

    // Grid lines
    ctx.strokeStyle = 'rgba(51,65,85,0.35)'; ctx.lineWidth = 0.8; ctx.setLineDash([2, 4]);
    for (let i = 1; i <= 4; i++) {
      const gy = oy - i * (gh / 4);
      ctx.beginPath(); ctx.moveTo(ox, gy); ctx.lineTo(ox + gw, gy); ctx.stroke();
      ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'right';
      ctx.fillText(((maxFreq2 * i) / 4).toFixed(0), ox - 6, gy + 3);
    }
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = 'rgba(71,85,105,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox - 5, oy); ctx.lineTo(ox + gw + 5, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, padT); ctx.lineTo(ox, oy + 5); ctx.stroke();
    ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter';
    ctx.save(); ctx.translate(12, padT + gh / 2); ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center'; ctx.fillText('Frequency', 0, 0); ctx.restore();

    // ── Bars ──
    uniqueVals.forEach((v, i) => {
      const f = freq[v];
      const bh = f * yScale * anim;
      const bx = ox + i * xStep + (xStep - barW2) / 2;
      const by = oy - bh;
      const isMode = modes.includes(v);
      const isMean = Math.abs(v - mean) < 0.5;

      // Bar gradient
      const bGrad = ctx.createLinearGradient(bx, by, bx + barW2, oy);
      if (isMode) {
        bGrad.addColorStop(0, 'rgba(245,158,11,0.85)'); bGrad.addColorStop(1, 'rgba(120,70,10,0.6)');
      } else {
        bGrad.addColorStop(0, 'rgba(59,130,246,0.75)'); bGrad.addColorStop(1, 'rgba(29,78,216,0.5)');
      }
      ctx.shadowBlur = isMode ? 15 : 6; ctx.shadowColor = isMode ? '#f59e0b' : '#3b82f6';
      ctx.fillStyle = bGrad;
      ctx.beginPath(); ctx.roundRect(bx, by, barW2, bh, [3, 3, 0, 0]); ctx.fill();
      ctx.shadowBlur = 0;

      // Shine
      const shine = ctx.createLinearGradient(bx, by, bx + barW2 * 0.4, oy);
      shine.addColorStop(0, 'rgba(255,255,255,0.12)'); shine.addColorStop(1, 'transparent');
      ctx.fillStyle = shine; ctx.beginPath(); ctx.roundRect(bx, by, barW2 * 0.4, bh, [3, 3, 0, 0]); ctx.fill();

      ctx.strokeStyle = isMode ? 'rgba(251,191,36,0.6)' : 'rgba(59,130,246,0.4)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(bx, by, barW2, bh, [3, 3, 0, 0]); ctx.stroke();

      // Frequency count on bar
      if (bh > 18) {
        ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
        ctx.fillText(f.toString(), bx + barW2 / 2, by + 14);
      }

      // X label
      ctx.fillStyle = isMode ? '#fbbf24' : 'rgba(100,116,139,0.7)'; ctx.font = `${barW2 > 35 ? 9 : 8}px Inter`;
      ctx.fillText(v.toString(), bx + barW2 / 2, oy + 14);
    });

    // ── Bell curve overlay ──
    if (showCurve && n >= 4 && anim > 0.5) {
      const curveAlpha = (anim - 0.5) * 2;
      const maxDensity = 1 / (stdDev * Math.sqrt(2 * Math.PI));
      const curveScale = (gh * 0.8) / maxDensity;
      ctx.strokeStyle = `rgba(16,185,129,${curveAlpha * 0.8})`; ctx.lineWidth = 2.5;
      ctx.shadowBlur = 8; ctx.shadowColor = '#10b981';
      ctx.beginPath();
      let first = true;
      for (let x = minVal - stdDev; x <= maxVal2 + stdDev; x += range2 / 120) {
        const density = Math.exp(-0.5 * ((x - mean) / stdDev) ** 2) / (stdDev * Math.sqrt(2 * Math.PI));
        const px2 = ox + ((x - minVal) / range2) * gw;
        const py2 = oy - density * curveScale;
        if (first) { ctx.moveTo(px2, py2); first = false; } else ctx.lineTo(px2, py2);
      }
      ctx.stroke(); ctx.shadowBlur = 0;
    }

    // ── Statistical marker lines ──
    const markerData = [
      { val: mean, label: `μ=${mean.toFixed(1)}`, color: '#10b981', dash: [6, 3] },
      { val: median, label: `Med=${median.toFixed(1)}`, color: '#a78bfa', dash: [3, 4] },
      ...modes.slice(0, 1).map(m => ({ val: m, label: `Mode=${m}`, color: '#fbbf24', dash: [2, 6] as number[] })),
    ];
    if (anim > 0.6) {
      markerData.forEach(({ val, label, color, dash }) => {
        const mx = ox + ((val - minVal) / range2) * gw;
        const markerAlpha = (anim - 0.6) * 2.5;
        ctx.shadowBlur = 6; ctx.shadowColor = color;
        ctx.strokeStyle = `rgba(${parseInt(color.slice(1, 3), 16)},${parseInt(color.slice(3, 5), 16)},${parseInt(color.slice(5, 7), 16)},${markerAlpha * 0.8})`;
        ctx.lineWidth = 2; ctx.setLineDash(dash);
        ctx.beginPath(); ctx.moveTo(mx, padT); ctx.lineTo(mx, oy); ctx.stroke();
        ctx.setLineDash([]); ctx.shadowBlur = 0;
        // Label flag
        ctx.fillStyle = `${color}${Math.round(markerAlpha * 30).toString(16).padStart(2, '0')}`;
        ctx.beginPath(); ctx.roundRect(mx - 2, padT, label.length * 6 + 8, 16, 3); ctx.fill();
        ctx.fillStyle = color; ctx.font = 'bold 8px monospace'; ctx.textAlign = 'left';
        ctx.fillText(label, mx + 2, padT + 11);
      });
    }

    // ── Box Plot ──
    if (showBoxPlot && anim > 0.7) {
      const bpY = H - 52, bpH = 22, bpAlpha = Math.min(1, (anim - 0.7) * 3.3);
      const toX = (v: number) => ox + ((v - minVal) / range2) * gw;

      // Whiskers
      ctx.strokeStyle = `rgba(100,116,139,${bpAlpha * 0.8})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(toX(minVal), bpY + bpH / 2); ctx.lineTo(toX(q1), bpY + bpH / 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(toX(q3), bpY + bpH / 2); ctx.lineTo(toX(maxVal2), bpY + bpH / 2); ctx.stroke();
      [minVal, maxVal2].forEach(v => {
        ctx.beginPath(); ctx.moveTo(toX(v), bpY + 4); ctx.lineTo(toX(v), bpY + bpH - 4); ctx.stroke();
      });

      // IQR box
      ctx.shadowBlur = 8; ctx.shadowColor = `rgba(59,130,246,${bpAlpha})`;
      const boxGrad = ctx.createLinearGradient(toX(q1), bpY, toX(q3), bpY + bpH);
      boxGrad.addColorStop(0, `rgba(29,78,216,${bpAlpha * 0.5})`); boxGrad.addColorStop(1, `rgba(59,130,246,${bpAlpha * 0.35})`);
      ctx.fillStyle = boxGrad; ctx.beginPath(); ctx.roundRect(toX(q1), bpY, toX(q3) - toX(q1), bpH, 3); ctx.fill();
      ctx.strokeStyle = `rgba(59,130,246,${bpAlpha * 0.7})`; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.shadowBlur = 0;

      // Median line in box
      ctx.shadowBlur = 6; ctx.shadowColor = '#a78bfa';
      ctx.strokeStyle = `rgba(167,139,250,${bpAlpha})`; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(toX(median), bpY); ctx.lineTo(toX(median), bpY + bpH); ctx.stroke();
      ctx.shadowBlur = 0;

      // Labels
      ctx.fillStyle = `rgba(100,116,139,${bpAlpha})`; ctx.font = '7px Inter'; ctx.textAlign = 'center';
      [[minVal, 'Min'], [q1, 'Q1'], [median, 'Q2'], [q3, 'Q3'], [maxVal2, 'Max']].forEach(([v, lbl]) => {
        ctx.fillText(lbl as string, toX(v as number), bpY + bpH + 12);
      });
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [data, freq, uniqueVals, mean, median, modes, stdDev, q1, q3, minVal, maxVal2, range2, n, showCurve, showBoxPlot, maxFreq2]);

  // Need to extract uniqueVals inside draw; remove from closure issue
  const uniqueVals = Object.keys(freq).map(Number).sort((a, b) => a - b);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const handleUpdate = () => {
    const nums = rawInput.split(',').map(s => parseFloat(s.trim())).filter(v => !isNaN(v) && v > 0);
    if (nums.length >= 2) setData(nums);
  };

  const generateRandom = (dist: 'normal' | 'uniform' | 'skewed') => {
    let d: number[] = [];
    if (dist === 'normal') {
      for (let i = 0; i < 20; i++) {
        const u = 1 - Math.random(), v = Math.random();
        const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        d.push(Math.max(1, Math.round(20 + z * 5)));
      }
    } else if (dist === 'uniform') {
      d = Array.from({ length: 15 }, () => Math.floor(Math.random() * 30) + 5);
    } else {
      d = Array.from({ length: 18 }, () => Math.max(1, Math.round(Math.random() * Math.random() * 35 + 5)));
    }
    setData(d); setRawInput(d.join(', '));
  };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">📊 Statistics — Descriptive Analysis</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Mean · Median · Mode · Std Dev · Box Plot · Bell Curve</p>
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => setShowCurve(c => !c)} className="px-2.5 py-1 rounded-lg text-[9px] font-bold"
            style={{ background: showCurve ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)', color: showCurve ? '#10b981' : '#475569', border: `1px solid ${showCurve ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)'}` }}>∿ Curve</button>
          <button onClick={() => setShowBoxPlot(c => !c)} className="px-2.5 py-1 rounded-lg text-[9px] font-bold"
            style={{ background: showBoxPlot ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)', color: showBoxPlot ? '#60a5fa' : '#475569', border: `1px solid ${showBoxPlot ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.08)'}` }}>▭ Box</button>
        </div>
      </div>

      <canvas ref={canvasRef} width={560} height={310} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(16,185,129,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-2">
          <input value={rawInput} onChange={e => setRawInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleUpdate()}
            placeholder="Enter values separated by commas…"
            className="flex-1 px-3 py-2 rounded-xl text-xs font-mono"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)', outline: 'none' }} />
          <button onClick={handleUpdate} className="px-3 py-2 rounded-xl text-xs font-bold"
            style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>Plot</button>
        </div>
        <div className="flex gap-1.5">
          {(['normal', 'uniform', 'skewed'] as const).map(d => (
            <button key={d} onClick={() => generateRandom(d)}
              className="flex-1 py-1.5 rounded-lg text-[9px] font-bold capitalize"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#475569', border: '1px solid rgba(255,255,255,0.07)' }}>
              {d === 'normal' ? '∿ Normal' : d === 'uniform' ? '▬ Uniform' : '⟩ Skewed'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {[
            { label: 'Mean (μ)', val: mean.toFixed(2), color: '#10b981' },
            { label: 'Median', val: median.toFixed(1), color: '#a78bfa' },
            { label: 'Mode', val: modes.slice(0, 2).join(', '), color: '#fbbf24' },
            { label: 'Std Dev (σ)', val: stdDev.toFixed(2), color: '#38bdf8' },
            { label: 'IQR', val: iqr.toFixed(1), color: '#f97316' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-[7px] uppercase tracking-widest text-slate-500">{d.label}</div>
              <div className="text-xs font-bold font-mono mt-0.5" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StatisticsLab;
