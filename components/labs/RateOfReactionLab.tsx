import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Particle { x: number; y: number; r: number; opacity: number; }

const RateOfReactionLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<HTMLCanvasElement>(null);
  const [concentration, setConcentration] = useState(50); // mL of Na₂S₂O₃
  const [running, setRunning] = useState(false);
  const elapsedRef = useRef(0);
  const turbidityRef = useRef(0); // 0→1
  const [crosses, setCrosses] = useState(0); // reactions done
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastFrameRef = useRef(0);

  // Reaction time: inversely proportional to concentration
  const reactionTime = Math.max(4, 200 / concentration);
  const rate = 1 / reactionTime;

  // Historical data for graph
  const [graphData] = useState(() => {
    const points: { conc: number; t: number; rate: number }[] = [];
    for (let c = 10; c <= 100; c += 10) {
      const t = 200 / c + (Math.random() - 0.5) * 2;
      points.push({ conc: c, t: Math.max(2, t), rate: 1 / Math.max(2, t) });
    }
    return points;
  });

  const drawGraph = useCallback(() => {
    const canvas = graphRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const ox = 48, oy = H - 35, gw = W - 65, gh = H - 55;
    const maxRate = 0.12;

    // Grid
    ctx.strokeStyle = 'rgba(71,85,105,0.2)'; ctx.lineWidth = 0.8; ctx.setLineDash([2, 4]);
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath(); ctx.moveTo(ox, oy - i * (gh / 4)); ctx.lineTo(ox + gw, oy - i * (gh / 4)); ctx.stroke();
    }
    for (let i = 0; i <= 5; i++) {
      ctx.beginPath(); ctx.moveTo(ox + i * (gw / 5), oy); ctx.lineTo(ox + i * (gw / 5), oy - gh); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy + 5); ctx.lineTo(ox + gw + 5, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox - 5, oy); ctx.lineTo(ox, oy - gh - 5); ctx.stroke();
    // Labels
    ctx.fillStyle = '#64748b'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    for (let i = 0; i <= 5; i++) { ctx.fillText(`${i * 20}`, ox + i * (gw / 5), oy + 12); }
    ctx.fillText('[Na₂S₂O₃] mL', ox + gw / 2, oy + 24);
    ctx.textAlign = 'right';
    [0, 0.04, 0.08, 0.12].forEach((r, i) => { ctx.fillText(r.toFixed(2), ox - 6, oy - i * (gh / 4) + 3); });
    ctx.save(); ctx.translate(14, oy - gh / 2); ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center'; ctx.fillText('Rate (1/t) s⁻¹', 0, 0); ctx.restore();

    // Best-fit line (linear through origin)
    const slope = maxRate / 100;
    ctx.strokeStyle = 'rgba(16,185,129,0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + gw, oy - (slope * 100 / maxRate) * gh); ctx.stroke();
    ctx.setLineDash([]);

    // Data points
    graphData.forEach(d => {
      const px = ox + (d.conc / 100) * gw;
      const py = oy - (d.rate / maxRate) * gh;
      ctx.shadowBlur = 4; ctx.shadowColor = '#10b981';
      ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Current operating point
    const cpx = ox + (concentration / 100) * gw;
    const cpy = oy - (rate / maxRate) * gh;
    ctx.shadowBlur = 12; ctx.shadowColor = '#f59e0b';
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(cpx, cpy, 6.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.setLineDash([2, 3]);
    ctx.strokeStyle = 'rgba(245,158,11,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cpx, oy); ctx.lineTo(cpx, cpy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, cpy); ctx.lineTo(cpx, cpy); ctx.stroke();
    ctx.setLineDash([]);
  }, [concentration, rate, graphData]);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const dt = lastFrameRef.current ? Math.min(32, ts - lastFrameRef.current) : 16;
    lastFrameRef.current = ts;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const bench = ctx.createLinearGradient(0, H - 20, 0, H);
    bench.addColorStop(0, '#1a1008'); bench.addColorStop(1, '#0d0904');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 20, W, 20);

    const cx = W / 2, beakerW = 160, beakerTop = 30, beakerBot = H - 35;

    // ── Conical flask ──
    const fTop = beakerTop, fBot = beakerBot, fTopW = 28, fBotW = 75;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - fBotW, fBot);
    ctx.lineTo(cx - fTopW, fTop + 28);
    ctx.lineTo(cx + fTopW, fTop + 28);
    ctx.lineTo(cx + fBotW, fBot);
    ctx.closePath();
    ctx.clip();

    // Solution with turbidity (sulfur precipitate forms)
    const t = turbidityRef.current;
    // Clear solution → milky/white turbid
    const r = Math.round(200 + t * 55);
    const g2 = Math.round(220 + t * 35);
    const b2 = Math.round(240 - t * 60);
    const a2 = 0.35 + t * 0.45;
    const solGrad = ctx.createLinearGradient(cx - fBotW, fTop + 30, cx + fBotW, fBot);
    solGrad.addColorStop(0, `rgba(${r},${g2},${b2},${a2 * 0.6})`);
    solGrad.addColorStop(1, `rgba(${r},${g2},${b2},${a2})`);
    ctx.fillStyle = solGrad;
    ctx.fillRect(cx - fBotW, fTop + 28, fBotW * 2, fBot - fTop - 28);

    // Sulfur particles forming
    if (t > 0.1 && particlesRef.current.length < 60) {
      particlesRef.current.push({
        x: cx + (Math.random() - 0.5) * (fBotW - 10),
        y: fTop + 30 + Math.random() * (fBot - fTop - 40),
        r: 1.5 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }
    particlesRef.current.forEach(p => {
      ctx.fillStyle = `rgba(255,255,220,${p.opacity * t})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });

    ctx.restore();

    // Flask glass
    ctx.beginPath();
    ctx.moveTo(cx - fBotW, fBot);
    ctx.lineTo(cx - fTopW, fTop + 28);
    ctx.lineTo(cx - fTopW, fTop);
    ctx.lineTo(cx + fTopW, fTop);
    ctx.lineTo(cx + fTopW, fTop + 28);
    ctx.lineTo(cx + fBotW, fBot);
    ctx.closePath();
    const glassG = ctx.createLinearGradient(cx - fBotW, 0, cx + fBotW, 0);
    glassG.addColorStop(0, 'rgba(255,255,255,0.14)'); glassG.addColorStop(0.1, 'rgba(255,255,255,0.06)');
    glassG.addColorStop(0.9, 'rgba(255,255,255,0.06)'); glassG.addColorStop(1, 'rgba(255,255,255,0.14)');
    ctx.fillStyle = glassG; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 2; ctx.stroke();
    // Neck
    ctx.beginPath(); ctx.roundRect(cx - fTopW, fTop - 18, fTopW * 2, 22, 2);
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = `rgba(${200 + t * 55},${220 + t * 35},${240 - t * 60},${0.1 + t * 0.2})`; ctx.fill();

    // ── Black cross below flask ──
    const crossY = fBot + 14;
    const crossAlpha = Math.max(0, 1 - t * 1.5);
    ctx.strokeStyle = `rgba(255,255,255,${crossAlpha * 0.8})`; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx - 12, crossY - 12); ctx.lineTo(cx + 12, crossY + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 12, crossY - 12); ctx.lineTo(cx - 12, crossY + 12); ctx.stroke();
    ctx.fillStyle = `rgba(148,163,184,${crossAlpha * 0.6})`; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Observe cross', cx, crossY + 20);

    // ── Turbidity indicator ──
    ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    if (!running && turbidityRef.current === 0) {
      ctx.fillStyle = '#475569'; ctx.fillText('Add HCl → observe cloudiness (S precipitate)', cx, H - 8);
    } else if (turbidityRef.current >= 1) {
      ctx.shadowBlur = 8; ctx.shadowColor = '#f59e0b';
      ctx.fillStyle = '#f59e0b'; ctx.fillText(`Cross obscured! t = ${elapsedRef.current.toFixed(1)}s · Rate = 1/t = ${(1/elapsedRef.current).toFixed(4)} s⁻¹`, cx, H - 8);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#60a5fa'; ctx.fillText(`Reacting... ${(turbidityRef.current * 100).toFixed(0)}% turbid · ${elapsedRef.current.toFixed(1)}s / ${reactionTime.toFixed(1)}s`, cx, H - 8);
    }

    // Advance turbidity
    if (running && turbidityRef.current < 1) {
      const newElapsed = elapsedRef.current + dt * 0.001;
      elapsedRef.current = newElapsed;
      const newT = Math.min(1, newElapsed / reactionTime);
      turbidityRef.current = newT;
      if (newT >= 1) { setRunning(false); setCrosses(c => c + 1); }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [running, reactionTime]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const handleStart = () => {
    if (turbidityRef.current >= 1) {
      turbidityRef.current = 0; elapsedRef.current = 0; particlesRef.current = [];
    }
    setRunning(true);
  };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">⚗ Rate of Reaction: Na₂S₂O₃ + HCl</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Clock reaction · Sulfur precipitation · Rate = 1/t · Effect of concentration</p>
        </div>
        <button onClick={() => { setRunning(false); turbidityRef.current = 0; elapsedRef.current = 0; particlesRef.current = []; }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>🔄 Reset</button>
      </div>

      <div className="flex flex-1 min-h-0">
        <canvas ref={canvasRef} width={220} height={280} style={{ width: '42%', display: 'block' }} />
        <canvas ref={graphRef} width={310} height={280} style={{ width: '58%', display: 'block' }} />
      </div>

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(16,185,129,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 whitespace-nowrap">Na₂S₂O₃ Vol.</span>
          <input id="rate-concentration-slider" type="range" min={10} max={100} step={5} value={concentration}
            onChange={e => { setConcentration(Number(e.target.value)); setRunning(false); turbidityRef.current = 0; elapsedRef.current = 0; particlesRef.current = []; }}
            className="flex-1 h-1.5 rounded-full accent-emerald-400" />
          <span className="text-xs font-mono text-emerald-400 w-14 text-right">{concentration} mL</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleStart} disabled={running}
            className="flex-1 py-2 rounded-xl text-sm font-bold"
            style={{ background: running ? 'rgba(255,255,255,0.04)' : 'rgba(239,68,68,0.2)', color: running ? '#475569' : '#f87171', border: `1px solid ${running ? 'rgba(255,255,255,0.08)' : 'rgba(239,68,68,0.3)'}` }}>
            {running ? '⏳ Reacting...' : turbidityRef.current >= 1 ? '🔄 New Reaction' : '🧪 Add HCl: Start Reaction'}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: '[Na₂S₂O₃]', val: `${concentration} mL`, color: '#10b981' },
            { label: 'Rxn Time', val: `${reactionTime.toFixed(1)} s`, color: '#38bdf8' },
            { label: 'Rate (1/t)', val: rate.toFixed(4), color: '#f59e0b' },
            { label: 'Reactions', val: crosses.toString(), color: '#a78bfa' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[7px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-xs font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RateOfReactionLab;
