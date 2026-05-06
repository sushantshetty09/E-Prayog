import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Bubble { x: number; y: number; r: number; vy: number; vx: number; alpha: number; }

const PhotosynthesisLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightInt, setLightInt] = useState(80); // 0-100%
  const [co2, setCo2] = useState(100);           // CO₂ level (decreases)
  const [o2Count, setO2Count] = useState(0);
  const [running, setRunning] = useState(false);
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef = useRef(0);
  const tRef = useRef(0);
  const lastFrameRef = useRef(0);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const dt = lastFrameRef.current ? Math.min(32, ts - lastFrameRef.current) : 16;
    lastFrameRef.current = ts;

    const rate = (lightInt / 100) * (co2 / 100);

    // ── Background with light effect ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    const lightAlpha = (lightInt / 100) * 0.06;
    bg.addColorStop(0, `rgba(251,191,36,${lightAlpha})`);
    bg.addColorStop(0.4, '#06080e');
    bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = W / 2;
    const beakerLeft = cx - 95, beakerW = 190;
    const waterTop = 85, waterBot = H - 45;

    // ── Light source ──
    if (lightInt > 0) {
      const li = lightInt / 100;
      // Lamp body
      ctx.fillStyle = '#fef3c7';
      ctx.beginPath(); ctx.arc(W - 52, 38, 18, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fbbf24'; ctx.font = '14px Inter'; ctx.textAlign = 'center';
      ctx.fillText('☀', W - 52, 43);

      // Light rays (fan toward beaker)
      const rayGrad = ctx.createLinearGradient(W - 50, 50, beakerLeft + beakerW, waterTop + 20);
      rayGrad.addColorStop(0, `rgba(251,191,36,${li * 0.35})`);
      rayGrad.addColorStop(1, 'transparent');
      for (let i = 0; i < 6; i++) {
        const angle = -0.5 + i * 0.18;
        const len = 170 + i * 15;
        ctx.beginPath();
        ctx.moveTo(W - 52, 38);
        ctx.lineTo(W - 52 + Math.cos(Math.PI + angle) * len, 38 + Math.sin(angle) * len);
        ctx.strokeStyle = `rgba(251,191,36,${li * (0.15 - i * 0.02)})`;
        ctx.lineWidth = 8 - i;
        ctx.stroke();
      }
      // Intensity label
      ctx.fillStyle = '#fbbf24'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`${lightInt}%`, W - 52, 60);
    }

    // ── Water fill inside beaker ──
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(beakerLeft + 5, waterTop);
    ctx.lineTo(beakerLeft, waterBot);
    ctx.lineTo(beakerLeft + beakerW, waterBot);
    ctx.lineTo(beakerLeft + beakerW - 5, waterTop);
    ctx.closePath();
    ctx.clip();

    const waterGrad = ctx.createLinearGradient(beakerLeft, waterTop, beakerLeft + beakerW, waterBot);
    const waterAlpha = 0.15 + lightInt * 0.001;
    waterGrad.addColorStop(0, `rgba(56,189,248,${waterAlpha})`);
    waterGrad.addColorStop(1, `rgba(14,165,233,${waterAlpha * 1.5})`);
    ctx.fillStyle = waterGrad; ctx.fillRect(beakerLeft, waterTop, beakerW, waterBot - waterTop);

    // Light penetration gradient (goes deeper with more light)
    if (lightInt > 0) {
      const lpGrad = ctx.createLinearGradient(beakerLeft + beakerW * 0.6, waterTop, beakerLeft, waterBot);
      lpGrad.addColorStop(0, `rgba(251,191,36,${lightInt * 0.0015})`);
      lpGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = lpGrad; ctx.fillRect(beakerLeft, waterTop, beakerW, waterBot - waterTop);
    }

    // ── Hydrilla plant (multiple stems with leaves) ──
    const stems = [
      { x: cx - 20, baseY: waterBot - 5, cp1x: cx - 35, cp2x: cx - 22 },
      { x: cx + 5,  baseY: waterBot - 5, cp1x: cx + 20,  cp2x: cx + 8 },
      { x: cx - 5,  baseY: waterBot - 5, cp1x: cx - 15,  cp2x: cx - 3 },
    ];

    // Draw stems
    ctx.shadowBlur = 6; ctx.shadowColor = '#22c55e';
    stems.forEach((stem, si) => {
      ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(stem.x, stem.baseY);
      ctx.quadraticCurveTo(stem.cp1x, (waterTop + waterBot) / 2 - si * 10, stem.cp2x, waterTop + 25 + si * 12);
      ctx.stroke();
    });
    ctx.shadowBlur = 0;

    // Leaves (ellipses at intervals along stems)
    const leafPositions = [
      { x: cx - 28, y: waterTop + 60, rot: 0.4 }, { x: cx - 22, y: waterTop + 100, rot: -0.3 },
      { x: cx - 12, y: waterTop + 70, rot: 0.2 }, { x: cx + 8, y: waterTop + 50, rot: -0.5 },
      { x: cx + 18, y: waterTop + 90, rot: 0.35 }, { x: cx, y: waterTop + 120, rot: -0.2 },
      { x: cx - 30, y: waterTop + 140, rot: 0.5 }, { x: cx + 10, y: waterTop + 130, rot: -0.4 },
    ];
    leafPositions.forEach(lp => {
      ctx.save(); ctx.translate(lp.x, lp.y); ctx.rotate(lp.rot);
      const lg = ctx.createRadialGradient(0, 0, 1, 0, 0, 12);
      lg.addColorStop(0, 'rgba(74,222,128,0.9)'); lg.addColorStop(1, 'rgba(22,163,74,0.6)');
      ctx.fillStyle = lg;
      ctx.beginPath(); ctx.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2); ctx.fill();
      // Midrib
      ctx.strokeStyle = 'rgba(22,163,74,0.5)'; ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.stroke();
      ctx.restore();
    });

    // ── Inverted funnel ──
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx - 50, waterTop + 30); ctx.lineTo(cx - 6, waterTop - 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 50, waterTop + 30); ctx.lineTo(cx + 6, waterTop - 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 6, waterTop - 15); ctx.lineTo(cx + 6, waterTop - 15); ctx.stroke();

    // ── Inverted test tube ──
    const ttTop = 12, ttH = waterTop - 22;
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(cx - 10, ttTop, 20, ttH, [8, 8, 0, 0]); ctx.stroke();
    // Collected O₂ gas
    const gasH = Math.min(ttH - 10, o2Count * 1.5);
    if (gasH > 0) {
      const gasGrad = ctx.createLinearGradient(cx - 8, ttTop + 4, cx + 8, ttTop + gasH + 4);
      gasGrad.addColorStop(0, 'rgba(56,189,248,0.35)'); gasGrad.addColorStop(1, 'rgba(14,165,233,0.15)');
      ctx.fillStyle = gasGrad;
      ctx.fillRect(cx - 8, ttTop + 4, 16, gasH);
      ctx.fillStyle = '#38bdf8'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
      ctx.fillText('O₂', cx, ttTop + gasH / 2 + 4);
    }

    // ── Bubbles (O₂ evolution) ──
    if (running && rate > 0.05) {
      tRef.current += dt;
      const spawnInterval = 600 / (rate * 10);
      if (tRef.current > spawnInterval && bubblesRef.current.length < 30) {
        tRef.current = 0;
        // Spawn from leaf positions
        leafPositions.slice(0, 4).forEach(lp => {
          bubblesRef.current.push({
            x: lp.x + (Math.random() - 0.5) * 8,
            y: lp.y - 3,
            r: 2 + Math.random() * 3,
            vy: 0.6 + Math.random() * 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            alpha: 0.8,
          });
        });
      }
    }

    let newO2 = o2Count;
    bubblesRef.current = bubblesRef.current.filter(b => b.alpha > 0.05).map(b => {
      const nx = b.x + b.vx; const ny = b.y - b.vy;
      if (ny < waterTop - 10) { newO2++; return { ...b, alpha: 0 }; }
      ctx.shadowBlur = 4; ctx.shadowColor = '#38bdf8';
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56,189,248,${b.alpha})`; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = `rgba(219,234,254,${b.alpha * 0.3})`; ctx.fill();
      ctx.shadowBlur = 0;
      return { ...b, x: nx, y: ny, alpha: b.alpha - 0.008 };
    });
    if (newO2 !== o2Count) setO2Count(newO2);

    ctx.restore();

    // ── Beaker glass walls ──
    ctx.beginPath();
    ctx.moveTo(beakerLeft + 5, waterTop);
    ctx.lineTo(beakerLeft, waterBot);
    ctx.lineTo(beakerLeft + beakerW, waterBot);
    ctx.lineTo(beakerLeft + beakerW - 5, waterTop);
    ctx.closePath();
    const gw = ctx.createLinearGradient(beakerLeft, 0, beakerLeft + beakerW, 0);
    gw.addColorStop(0, 'rgba(255,255,255,0.12)'); gw.addColorStop(0.1, 'rgba(255,255,255,0.05)');
    gw.addColorStop(0.5, 'rgba(148,163,184,0.02)'); gw.addColorStop(0.9, 'rgba(255,255,255,0.05)');
    gw.addColorStop(1, 'rgba(255,255,255,0.12)');
    ctx.fillStyle = gw; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(beakerLeft, waterTop); ctx.lineTo(beakerLeft + beakerW, waterTop);
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 3; ctx.stroke();

    // Shine
    ctx.beginPath(); ctx.moveTo(beakerLeft + 8, waterTop + 15); ctx.lineTo(beakerLeft, waterBot - 10);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 4; ctx.stroke();

    // ── Rate equation ──
    ctx.font = '9px Inter'; ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(100,116,139,0.7)';
    ctx.fillText('6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂', cx, H - 8);

    if (running) {
      if (co2 > 0) setCo2(c => Math.max(0, c - rate * 0.008));
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [lightInt, co2, o2Count, running]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🌿 Photosynthesis — O₂ Evolution (Hydrilla)</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Light-dependent reaction · Bubble rate ∝ light intensity</p>
        </div>
        <button onClick={() => { setRunning(false); setCo2(100); setO2Count(0); bubblesRef.current = []; }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
          🔄 Reset
        </button>
      </div>

      <canvas ref={canvasRef} width={460} height={360} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(34,197,94,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 whitespace-nowrap">☀ Light Intensity</label>
          <input type="range" min={0} max={100} step={5} value={lightInt}
            onChange={e => setLightInt(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-amber-400" />
          <span className="text-xs font-mono text-amber-400 w-10 text-right">{lightInt}%</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRunning(r => !r)}
            className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
            style={{ background: running ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.2)', color: running ? '#f87171' : '#4ade80', border: `1px solid ${running ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
            {running ? '⏸ Pause' : '▶ Start Photosynthesis'}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Light', val: `${lightInt}%`, color: '#fbbf24' },
            { label: 'CO₂ Left', val: `${co2.toFixed(0)}%`, color: '#fb923c' },
            { label: 'O₂ Bubbles', val: o2Count.toString(), color: '#38bdf8' },
            { label: 'Rate', val: ((lightInt / 100) * (co2 / 100) * 10).toFixed(1), color: '#4ade80' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[8px] uppercase tracking-widest text-slate-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PhotosynthesisLab;
