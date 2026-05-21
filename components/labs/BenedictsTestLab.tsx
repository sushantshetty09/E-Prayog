import React, { useState, useRef, useEffect, useCallback } from 'react';

const SAMPLES = [
  { name: 'Glucose',     reducing: true,  endColor: [220, 60, 30],  precipColor: '#b45309', result: 'Brick Red',   conc: 5 },
  { name: 'Fructose',    reducing: true,  endColor: [234, 120, 40], precipColor: '#d97706', result: 'Orange',       conc: 4 },
  { name: 'Maltose',     reducing: true,  endColor: [180, 175, 20], precipColor: '#a16207', result: 'Yellow-Green', conc: 3 },
  { name: 'Lactose',     reducing: true,  endColor: [100, 180, 40], precipColor: '#15803d', result: 'Green',        conc: 2 },
  { name: 'Sucrose',     reducing: false, endColor: [59, 130, 246], precipColor: '',        result: 'Blue (−)',     conc: 0 },
  { name: 'Water',       reducing: false, endColor: [59, 130, 246], precipColor: '',        result: 'Blue (−)',     conc: 0 },
];

interface Particle { x: number; y: number; vy: number; size: number; alpha: number; color: string; }

const BenedictsTestLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sampleIdx, setSampleIdx] = useState(0);
  const [heatingT, setHeatingT] = useState(0); // 0→1
  const [heating, setHeating] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const s = SAMPLES[sampleIdx];

  const startHeat = () => { setHeating(true); particlesRef.current = []; };
  const reset = () => { setHeating(false); setHeatingT(0); particlesRef.current = []; };

  useEffect(() => {
    if (!heating || heatingT >= 1) return;
    const id = setInterval(() => setHeatingT(t => Math.min(1, t + 0.012)), 50);
    return () => clearInterval(id);
  }, [heating, heatingT]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#040509');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Lab bench
    const bench = ctx.createLinearGradient(0, H - 22, 0, H);
    bench.addColorStop(0, '#1e1408'); bench.addColorStop(1, '#0d0904');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 22, W, 22);

    const t = heatingT;
    const cx = W / 2;

    // ── Water bath beaker (large, back) ──
    const wbX = cx - 80, wbW = 160, wbTop = H - 160, wbBot = H - 28;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(wbX + 6, wbTop); ctx.lineTo(wbX, wbBot); ctx.lineTo(wbX + wbW, wbBot); ctx.lineTo(wbX + wbW - 6, wbTop);
    ctx.closePath(); ctx.clip();
    // Water fill
    const wbGrad = ctx.createLinearGradient(cx, wbTop, cx, wbBot);
    wbGrad.addColorStop(0, `rgba(56,189,248,${0.08 + t * 0.06})`);
    wbGrad.addColorStop(1, `rgba(14,165,233,${0.2 + t * 0.1})`);
    ctx.fillStyle = wbGrad;
    ctx.fillRect(wbX, wbTop + 25, wbW, wbBot - wbTop - 25);
    // Boiling bubbles at bottom
    if (t > 0.3) {
      for (let i = 0; i < 5; i++) {
        const bx = wbX + 20 + i * 30;
        const bphase = (Date.now() * 0.003 + i * 1.5) % 1;
        const by = wbBot - 5 - bphase * 60;
        const br = 3 + Math.sin(bphase * Math.PI) * 4;
        ctx.strokeStyle = `rgba(56,189,248,${(1 - bphase) * 0.5 * (t - 0.3) / 0.7})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.stroke();
      }
    }
    ctx.restore();
    // Beaker walls
    ctx.beginPath();
    ctx.moveTo(wbX + 6, wbTop); ctx.lineTo(wbX, wbBot); ctx.lineTo(wbX + wbW, wbBot); ctx.lineTo(wbX + wbW - 6, wbTop);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wbX, wbTop); ctx.lineTo(wbX + wbW, wbTop);
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 2.5; ctx.stroke();

    // ── Bunsen burner under water bath ──
    const bBase = H - 22;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.roundRect(cx - 18, bBase - 14, 36, 14, [3, 3, 0, 0]); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1; ctx.stroke();
    // Flame
    const flameH = 20 + t * 15;
    const flameT = Date.now() * 0.006;
    ctx.shadowBlur = 15; ctx.shadowColor = '#fb923c';
    const fGrad = ctx.createLinearGradient(cx, bBase - 14 - flameH, cx, bBase - 14);
    fGrad.addColorStop(0, 'rgba(96,165,250,0.9)'); // inner blue
    fGrad.addColorStop(0.4, 'rgba(251,146,60,0.85)');
    fGrad.addColorStop(1, 'rgba(251,146,60,0)');
    ctx.fillStyle = fGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 7, bBase - 14);
    ctx.quadraticCurveTo(cx + Math.sin(flameT) * 5, bBase - 14 - flameH * 0.5, cx, bBase - 14 - flameH + Math.sin(flameT * 1.3) * 3);
    ctx.quadraticCurveTo(cx - Math.sin(flameT * 0.9) * 4, bBase - 14 - flameH * 0.5, cx + 7, bBase - 14);
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;

    // ── Test tube (front, inside water bath) ──
    const ttX = cx, ttTop = wbTop + 20, ttBot = wbBot - 22, ttW = 22;
    // Glass tube shape
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(ttX - ttW / 2, ttTop);
    ctx.lineTo(ttX - ttW / 2, ttBot - 5);
    ctx.quadraticCurveTo(ttX - ttW / 2, ttBot, ttX, ttBot);
    ctx.quadraticCurveTo(ttX + ttW / 2, ttBot, ttX + ttW / 2, ttBot - 5);
    ctx.lineTo(ttX + ttW / 2, ttTop);
    ctx.closePath();
    ctx.clip();

    // Solution color: interpolate Benedict's blue → result color
    const [r1, g1, b1] = [59, 130, 246]; // blue
    const [r2, g2, b2] = s.endColor;
    const cr = Math.round(r1 + (r2 - r1) * t);
    const cg = Math.round(g1 + (g2 - g1) * t);
    const cb = Math.round(b1 + (b2 - b1) * t);

    const solGrad = ctx.createLinearGradient(ttX - ttW / 2, ttTop, ttX + ttW / 2, ttBot);
    solGrad.addColorStop(0, `rgba(${cr},${cg},${cb},0.25)`);
    solGrad.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.55)`);
    solGrad.addColorStop(1, `rgba(${cr},${cg},${cb},0.7)`);
    ctx.fillStyle = solGrad;
    ctx.fillRect(ttX - ttW / 2, ttTop, ttW, ttBot - ttTop);

    // Precipitate settling at bottom (reducing sugars only)
    if (s.reducing && t > 0.5) {
      const precipH = Math.min(20, (t - 0.5) * 2 * 25);
      const precipGrad = ctx.createLinearGradient(ttX, ttBot - precipH, ttX, ttBot);
      precipGrad.addColorStop(0, s.precipColor + '80');
      precipGrad.addColorStop(1, s.precipColor + 'ff');
      ctx.fillStyle = precipGrad;
      ctx.beginPath();
      ctx.moveTo(ttX - ttW / 2, ttBot - precipH);
      ctx.quadraticCurveTo(ttX, ttBot - precipH + 3, ttX + ttW / 2, ttBot - precipH);
      ctx.lineTo(ttX + ttW / 2, ttBot);
      ctx.quadraticCurveTo(ttX, ttBot + 3, ttX - ttW / 2, ttBot);
      ctx.closePath(); ctx.fill();

      // Particle cascade
      if (particlesRef.current.length < 30 && Math.random() < 0.15) {
        particlesRef.current.push({ x: ttX + (Math.random() - 0.5) * 14, y: ttTop + 20, vy: 0.4 + Math.random() * 0.3, size: 1.5 + Math.random(), alpha: 0.8, color: s.precipColor });
      }
    }
    ctx.restore();

    // Draw settling particles
    particlesRef.current = particlesRef.current.map(p => {
      if (p.y < ttBot - 20) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0'); ctx.fill();
        return { ...p, y: p.y + p.vy };
      }
      return { ...p, alpha: 0 };
    }).filter(p => p.alpha > 0);

    // Glass tube walls
    ctx.beginPath();
    ctx.moveTo(ttX - ttW / 2, ttTop);
    ctx.lineTo(ttX - ttW / 2, ttBot - 5);
    ctx.quadraticCurveTo(ttX - ttW / 2, ttBot, ttX, ttBot);
    ctx.quadraticCurveTo(ttX + ttW / 2, ttBot, ttX + ttW / 2, ttBot - 5);
    ctx.lineTo(ttX + ttW / 2, ttTop);
    const glassG = ctx.createLinearGradient(ttX - ttW / 2, 0, ttX + ttW / 2, 0);
    glassG.addColorStop(0, 'rgba(255,255,255,0.18)'); glassG.addColorStop(0.3, 'rgba(255,255,255,0.06)');
    glassG.addColorStop(0.7, 'rgba(255,255,255,0.03)'); glassG.addColorStop(1, 'rgba(255,255,255,0.12)');
    ctx.fillStyle = glassG; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
    // Shine
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(ttX - ttW / 2 + 3, ttTop + 8); ctx.lineTo(ttX - ttW / 2 + 3, ttBot - 20); ctx.stroke();

    // ── Thermometer in water bath ──
    const tmX = wbX + wbW - 18, tmTop = wbTop + 10, tmH = wbBot - wbTop - 30;
    ctx.beginPath(); ctx.roundRect(tmX - 3, tmTop, 6, tmH, [3, 3, 0, 0]);
    ctx.fillStyle = 'rgba(15,25,45,0.8)'; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(tmX, tmTop + tmH + 5, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444'; ctx.fill();
    const mercH = (20 + t * 75) / 100 * tmH;
    ctx.fillStyle = '#ef4444'; ctx.fillRect(tmX - 2, tmTop + tmH - mercH, 4, mercH);
    ctx.fillStyle = '#fca5a5'; ctx.font = '8px Inter'; ctx.textAlign = 'left';
    ctx.fillText(`${(20 + t * 75).toFixed(0)}°C`, tmX + 8, tmTop + tmH - mercH + 4);

    // ── Result display ──
    const resAlpha = Math.min(1, t * 1.5);
    ctx.fillStyle = `rgba(${cr},${cg},${cb},${resAlpha * 0.9})`;
    ctx.font = `bold ${14 + t * 4}px Inter`; ctx.textAlign = 'center';
    ctx.shadowBlur = t > 0.7 ? 12 : 0; ctx.shadowColor = `rgba(${cr},${cg},${cb},0.8)`;
    ctx.fillText(t > 0.1 ? s.result : "Benedict's Reagent", cx, 32);
    ctx.shadowBlur = 0;
    ctx.fillStyle = t > 0.5 ? (s.reducing ? '#4ade80' : '#f87171') : 'rgba(100,116,139,0.6)';
    ctx.font = '10px Inter';
    ctx.fillText(t > 0.5 ? (s.reducing ? '✓ Reducing sugar PRESENT' : '✗ Reducing sugar ABSENT') : `Sample: ${s.name}`, cx, 48);

    // Temp label
    ctx.fillStyle = '#60a5fa'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
    if (t > 0) ctx.fillText(`Water bath: ${(20 + t * 75).toFixed(0)}°C`, wbX + wbW / 2, wbTop + 15);

    rafRef.current = requestAnimationFrame(draw);
  }, [heatingT, s, sampleIdx]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(251,146,60,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🧪 Benedict's Test: Reducing Sugars</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Cu²⁺ → Cu⁺ (Cu₂O precipitate) · Heat in water bath 95°C</p>
        </div>
        <button onClick={reset} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>🔄 Reset</button>
      </div>

      <canvas ref={canvasRef} width={400} height={320} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(251,146,60,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 block font-semibold">Select Sample</span>
          <div className="grid grid-cols-3 gap-1.5">
            {SAMPLES.map((sa, i) => (
              <button key={sa.name} onClick={() => { setSampleIdx(i); reset(); }}
                className="py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{ background: i === sampleIdx ? (sa.reducing ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.15)') : 'rgba(255,255,255,0.04)', color: i === sampleIdx ? (sa.reducing ? '#f87171' : '#60a5fa') : '#475569', border: `1px solid ${i === sampleIdx ? (sa.reducing ? 'rgba(239,68,68,0.4)' : 'rgba(59,130,246,0.3)') : 'rgba(255,255,255,0.07)'}` }}>
                {sa.name}
              </button>
            ))}
          </div>
        </div>
        <button onClick={startHeat} disabled={heating}
          className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: heating ? 'rgba(255,255,255,0.04)' : 'rgba(239,68,68,0.2)', color: heating ? '#475569' : '#f87171', border: `1px solid ${heating ? 'rgba(255,255,255,0.08)' : 'rgba(239,68,68,0.3)'}` }}>
          {heatingT >= 1 ? `Result: ${s.result}` : heating ? `Heating... ${(heatingT * 95).toFixed(0)}°C` : '🔥 Heat in Water Bath (95°C / 3 min)'}
        </button>
      </div>
    </div>
  );
};
export default BenedictsTestLab;
