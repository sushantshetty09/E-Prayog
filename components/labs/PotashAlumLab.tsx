import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Crystal { x: number; y: number; size: number; angle: number; opacity: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; }

const PotashAlumLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temp, setTemp] = useState(95);
  const [cooling, setCooling] = useState(false);
  const crystalsRef = useRef<Crystal[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const lastTempRef = useRef(95);

  // Seed deterministic crystal positions (grow from bottom up)
  const initCrystals = (t: number) => {
    const progress = Math.max(0, (80 - t) / 55); // 0 at 80°C, 1 at 25°C
    const count = Math.floor(progress * 18);
    const crystals: Crystal[] = [];
    for (let i = 0; i < count; i++) {
      const seed = i * 137.508; // golden angle spread
      crystals.push({
        x: 195 + Math.cos(seed) * (40 + (i % 5) * 12),
        y: 260 - i * 5 + Math.sin(seed * 0.7) * 8,
        size: 4 + progress * 14 * (0.5 + (i % 3) * 0.25),
        angle: seed * 0.3,
        opacity: Math.min(1, progress * 2),
      });
    }
    crystalsRef.current = crystals;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#08080e'); bg.addColorStop(1, '#050508');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Lab bench
    const bench = ctx.createLinearGradient(0, H - 28, 0, H);
    bench.addColorStop(0, '#1e1408'); bench.addColorStop(1, '#0f0a04');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 28, W, 28);
    ctx.strokeStyle = 'rgba(100,70,20,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 28); ctx.lineTo(W, H - 28); ctx.stroke();

    const cx = W / 2;
    const progress = Math.max(0, (80 - temp) / 55);
    const dissolved = Math.max(0, (temp - 40) / 55); // how dissolved solution looks

    // ── Bunsen burner / heat stand (if hot) ──
    if (temp > 50) {
      // Stand legs
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 3;
      [[cx - 50, H - 28], [cx + 50, H - 28]].forEach(([lx, ly]) => {
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(cx, ly - 30); ctx.stroke();
      });
      // Wire gauze
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx - 55, H - 56); ctx.lineTo(cx + 55, H - 56); ctx.stroke();
      // Heat glow
      const heatR = Math.min(1, (temp - 50) / 45);
      const hg = ctx.createRadialGradient(cx, H - 30, 2, cx, H - 30, 45);
      hg.addColorStop(0, `rgba(255,120,20,${heatR * 0.5})`);
      hg.addColorStop(0.5, `rgba(255,60,0,${heatR * 0.2})`);
      hg.addColorStop(1, 'transparent');
      ctx.fillStyle = hg; ctx.fillRect(cx - 50, H - 80, 100, 55);

      // Flame flicker
      if (cooling === false && temp > 60) {
        const ft = Date.now() * 0.005;
        ctx.shadowBlur = 15; ctx.shadowColor = '#fb923c';
        ctx.fillStyle = `rgba(251,146,60,${0.6 + Math.sin(ft) * 0.15})`;
        ctx.beginPath();
        ctx.moveTo(cx - 8, H - 58);
        ctx.quadraticCurveTo(cx + Math.sin(ft * 1.3) * 6, H - 78, cx, H - 92 + Math.sin(ft) * 4);
        ctx.quadraticCurveTo(cx - Math.sin(ft * 0.9) * 5, H - 75, cx + 8, H - 58);
        ctx.closePath(); ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // ── Beaker glass ──
    const bx = cx - 75, bw = 150, bTop = 80, bBot = H - 56;
    // Beaker shadow
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath(); ctx.ellipse(cx, bBot + 8, 70, 10, 0, 0, Math.PI * 2); ctx.fill();

    // Beaker body clip region
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bx + 8, bTop);
    ctx.lineTo(bx, bBot);
    ctx.lineTo(bx + bw, bBot);
    ctx.lineTo(bx + bw - 8, bTop);
    ctx.closePath();
    ctx.clip();

    // Solution fill
    const solutionGrad = ctx.createLinearGradient(bx, bTop + 40, bx + bw, bBot);
    const alpha = 0.55 + dissolved * 0.1;
    solutionGrad.addColorStop(0, `rgba(167,139,250,${alpha * 0.4})`);
    solutionGrad.addColorStop(0.5, `rgba(139,92,246,${alpha * 0.7})`);
    solutionGrad.addColorStop(1, `rgba(109,40,217,${alpha * 0.85})`);
    ctx.fillStyle = solutionGrad;
    ctx.fillRect(bx, bTop + 50, bw, bBot - bTop - 50);

    // Heat shimmer lines (if hot)
    if (temp > 55) {
      const shimmer = Math.sin(Date.now() * 0.004);
      ctx.strokeStyle = `rgba(255,255,255,${(temp - 55) / 200})`;
      ctx.lineWidth = 0.8; ctx.setLineDash([3, 6]);
      for (let i = 0; i < 4; i++) {
        const sx = bx + 20 + i * 30;
        const sy = bTop + 80 + Math.sin(Date.now() * 0.003 + i) * 5;
        ctx.beginPath(); ctx.moveTo(sx, bBot - 10); ctx.lineTo(sx + shimmer * 4, sy); ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Dissolving particles floating in hot solution
    if (temp > 50 && particlesRef.current.length < 20) {
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: bx + 20 + Math.random() * (bw - 40),
          y: bBot - 10,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.5 - Math.random() * 0.5,
          life: 1,
        });
      }
    }
    particlesRef.current = particlesRef.current.filter(p => p.life > 0).map(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(216,180,254,${p.life * 0.6})`; ctx.fill();
      return { ...p, x: p.x + p.vx, y: p.y + p.vy, life: p.life - 0.008 };
    });

    ctx.restore();

    // ── Crystals at the bottom ──
    initCrystals(temp);
    crystalsRef.current.forEach(cr => {
      ctx.save(); ctx.translate(cr.x, cr.y); ctx.rotate(cr.angle);
      const s = cr.size;
      // Octahedral cross-section (diamond shape)
      ctx.beginPath();
      ctx.moveTo(0, -s); ctx.lineTo(s * 0.6, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.6, 0);
      ctx.closePath();
      const cg = ctx.createLinearGradient(-s, -s, s, s);
      cg.addColorStop(0, `rgba(255,255,255,${cr.opacity * 0.9})`);
      cg.addColorStop(0.4, `rgba(216,180,254,${cr.opacity * 0.85})`);
      cg.addColorStop(0.8, `rgba(139,92,246,${cr.opacity * 0.7})`);
      cg.addColorStop(1, `rgba(76,29,149,${cr.opacity * 0.5})`);
      ctx.fillStyle = cg; ctx.fill();
      // Facet lines
      ctx.strokeStyle = `rgba(255,255,255,${cr.opacity * 0.4})`; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(-s * 0.6, 0); ctx.lineTo(s * 0.6, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, -s); ctx.lineTo(0, s); ctx.stroke();
      ctx.restore();
    });

    // ── Beaker glass walls (drawn on top) ──
    ctx.beginPath();
    ctx.moveTo(bx + 8, bTop);
    ctx.lineTo(bx, bBot);
    ctx.lineTo(bx + bw, bBot);
    ctx.lineTo(bx + bw - 8, bTop);
    // Glass gradient overlay
    const glassGrad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    glassGrad.addColorStop(0, 'rgba(148,163,184,0.18)');
    glassGrad.addColorStop(0.1, 'rgba(255,255,255,0.1)');
    glassGrad.addColorStop(0.5, 'rgba(148,163,184,0.03)');
    glassGrad.addColorStop(0.9, 'rgba(255,255,255,0.1)');
    glassGrad.addColorStop(1, 'rgba(148,163,184,0.18)');
    ctx.fillStyle = glassGrad; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.8; ctx.stroke();

    // Beaker lip
    ctx.beginPath(); ctx.moveTo(bx, bTop); ctx.lineTo(bx + bw, bTop);
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 3; ctx.stroke();

    // Spout detail
    ctx.beginPath(); ctx.moveTo(bx - 4, bTop + 5); ctx.quadraticCurveTo(bx - 8, bTop, bx + 5, bTop);
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 2; ctx.stroke();

    // Volume markings
    ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'right';
    ctx.strokeStyle = 'rgba(100,116,139,0.3)'; ctx.lineWidth = 0.8;
    for (let ml = 50; ml <= 150; ml += 50) {
      const my = bBot - (ml / 200) * (bBot - bTop - 50);
      ctx.beginPath(); ctx.moveTo(bx + bw - 15, my); ctx.lineTo(bx + bw - 4, my); ctx.stroke();
      ctx.fillText(`${ml}`, bx + bw - 17, my + 3);
    }

    // ── Thermometer ──
    const tx = bx + bw + 22, ty = bTop - 10, th = bBot - bTop - 10;
    // Glass tube
    ctx.beginPath(); ctx.roundRect(tx - 5, ty, 10, th, [5, 5, 0, 0]);
    ctx.fillStyle = 'rgba(20,30,50,0.8)'; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
    // Bulb
    ctx.beginPath(); ctx.arc(tx, ty + th + 6, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
    // Mercury column
    const mercH = ((temp - 20) / 90) * (th - 12);
    const mercGrad = ctx.createLinearGradient(tx - 3, ty + th - mercH, tx + 3, ty + th);
    mercGrad.addColorStop(0, '#fca5a5'); mercGrad.addColorStop(1, '#ef4444');
    ctx.fillStyle = mercGrad;
    ctx.beginPath(); ctx.roundRect(tx - 3, ty + th - mercH, 6, mercH, [3, 3, 0, 0]); ctx.fill();
    // Temp label
    ctx.shadowBlur = 8; ctx.shadowColor = '#ef4444';
    ctx.fillStyle = '#fca5a5'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'left';
    ctx.fillText(`${temp.toFixed(0)}°C`, tx + 12, ty + th - mercH + 4);
    ctx.shadowBlur = 0;

    // ── Status text ──
    ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    if (temp > 75) {
      ctx.fillStyle = '#fb923c';
      ctx.fillText('🔥 Alum dissolving in hot water...', cx, 45);
    } else if (temp > 50) {
      ctx.fillStyle = '#a78bfa';
      ctx.fillText('⬇ Cooling: supersaturated solution forming...', cx, 45);
    } else if (temp > 30) {
      ctx.fillStyle = '#818cf8';
      ctx.fillText('❄ Crystal nucleation in progress...', cx, 45);
    } else {
      ctx.shadowBlur = 12; ctx.shadowColor = '#a78bfa';
      ctx.fillStyle = '#e9d5ff';
      ctx.fillText('✨ Pure Potash Alum crystals formed!', cx, 45);
      ctx.shadowBlur = 0;
    }

    // Crystal yield display
    if (progress > 0) {
      ctx.fillStyle = 'rgba(139,92,246,0.6)'; ctx.font = '9px Inter';
      ctx.fillText(`Crystal yield: ${(progress * 100).toFixed(0)}%`, cx, H - 8);
    }

    if (cooling) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [temp, cooling]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  useEffect(() => {
    if (!cooling) return;
    const id = setInterval(() => {
      setTemp(t => {
        if (t <= 25) { setCooling(false); return 25; }
        return Math.max(25, t - 0.4);
      });
    }, 50);
    return () => clearInterval(id);
  }, [cooling]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">💎 Crystallisation: Potash Alum (KAl(SO₄)₂·12H₂O)</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Slow cooling of supersaturated solution → octahedral crystal formation</p>
        </div>
        <button onClick={() => { setTemp(95); setCooling(false); particlesRef.current = []; }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: 'rgba(139,92,246,0.1)', color: '#c084fc', border: '1px solid rgba(139,92,246,0.2)' }}>
          🔄 Reset
        </button>
      </div>

      <canvas ref={canvasRef} width={520} height={370} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(139,92,246,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400 whitespace-nowrap">Temperature</span>
          <input id="potash-temp-slider" type="range" min={25} max={95} step={1} value={temp}
            onChange={e => { setTemp(Number(e.target.value)); setCooling(false); particlesRef.current = []; }}
            className="flex-1 h-1.5 rounded-full accent-violet-500" />
          <span className="text-xs font-mono w-14 text-right" style={{ color: temp > 60 ? '#fb923c' : temp > 35 ? '#a78bfa' : '#34d399' }}>{temp.toFixed(0)}°C</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { if (!cooling) { setTemp(95); particlesRef.current = []; } setCooling(!cooling); }}
            className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
            style={{ background: cooling ? 'rgba(239,68,68,0.15)' : 'rgba(56,189,248,0.15)', color: cooling ? '#f87171' : '#38bdf8', border: `1px solid ${cooling ? 'rgba(239,68,68,0.3)' : 'rgba(56,189,248,0.3)'}` }}>
            {cooling ? '⏸ Pause Cooling' : '❄ Start Slow Cooling'}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Temperature', val: `${temp.toFixed(0)}°C`, color: temp > 60 ? '#fb923c' : '#a78bfa' },
            { label: 'Crystal Yield', val: `${(Math.max(0, (80 - temp) / 55) * 100).toFixed(0)}%`, color: '#34d399' },
            { label: 'State', val: temp > 70 ? 'Dissolved' : temp > 40 ? 'Cooling' : 'Crystallised', color: '#38bdf8' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-[8px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PotashAlumLab;
