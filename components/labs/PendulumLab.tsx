import React, { useState, useRef, useEffect, useCallback } from 'react';

const PendulumLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);
  const [length, setLength] = useState(60);   // cm
  const [mass, setMass] = useState(100);       // grams
  const [isSwinging, setIsSwinging] = useState(false);
  const [oscillations, setOscillations] = useState(0);
  const [trailPoints, setTrailPoints] = useState<{ x: number; y: number; a: number }[]>([]);
  const trailRef = useRef<{ x: number; y: number; a: number }[]>([]);
  const lastSideRef = useRef(0);

  const g = 9.78;
  const L_m = length / 100;
  const T = 2 * Math.PI * Math.sqrt(L_m / g);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Lab background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07090f');
    bg.addColorStop(1, '#040508');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Subtle dot grid
    ctx.fillStyle = 'rgba(148,163,184,0.025)';
    for (let x = 0; x < W; x += 24) for (let y = 0; y < H; y += 24) {
      ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
    }

    // ── Lab stand (realistic metal) ──
    // Base plate
    const baseGrad = ctx.createLinearGradient(W / 2 - 80, H - 22, W / 2 + 80, H - 22);
    baseGrad.addColorStop(0, '#1a2235'); baseGrad.addColorStop(0.5, '#2d3f5c'); baseGrad.addColorStop(1, '#1a2235');
    ctx.fillStyle = baseGrad;
    ctx.beginPath(); ctx.roundRect(W / 2 - 80, H - 28, 160, 16, 4); ctx.fill();
    ctx.strokeStyle = '#3b5070'; ctx.lineWidth = 1; ctx.stroke();
    // Screws on base
    [W / 2 - 60, W / 2 + 60].forEach(sx => {
      ctx.fillStyle = '#475569';
      ctx.beginPath(); ctx.arc(sx, H - 20, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(sx - 3, H - 20); ctx.lineTo(sx + 3, H - 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx, H - 23); ctx.lineTo(sx, H - 17); ctx.stroke();
    });

    // Vertical pillar
    const pillarGrad = ctx.createLinearGradient(W / 2 - 10, 0, W / 2 + 10, 0);
    pillarGrad.addColorStop(0, '#1e2d3f'); pillarGrad.addColorStop(0.3, '#2d4a6b');
    pillarGrad.addColorStop(0.6, '#3d6494'); pillarGrad.addColorStop(1, '#1e2d3f');
    ctx.fillStyle = pillarGrad;
    ctx.fillRect(W / 2 - 8, 45, 16, H - 70);
    // Pillar highlight
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(W / 2 - 4, 45, 3, H - 70);

    // Cross bar (horizontal)
    const barGrad = ctx.createLinearGradient(0, 42, 0, 58);
    barGrad.addColorStop(0, '#2d4a6b'); barGrad.addColorStop(0.5, '#4a7db5'); barGrad.addColorStop(1, '#1e2d3f');
    ctx.fillStyle = barGrad;
    ctx.beginPath(); ctx.roundRect(W / 2 - 100, 42, 200, 14, 3); ctx.fill();
    ctx.strokeStyle = '#3b5070'; ctx.lineWidth = 1; ctx.stroke();

    // ── Protractor arc (angle measurement) ──
    const pivotX = W / 2, pivotY = 55;
    ctx.strokeStyle = 'rgba(148,163,184,0.12)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 55, 0, Math.PI); ctx.stroke();
    ctx.fillStyle = 'rgba(148,163,184,0.07)';
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 55, 0, Math.PI); ctx.fill();
    // Degree marks
    ctx.fillStyle = 'rgba(100,116,139,0.6)'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
    [-60, -45, -30, -15, 0, 15, 30, 45, 60].forEach(deg => {
      const rad = (deg * Math.PI) / 180 + Math.PI / 2;
      const lx = pivotX + 50 * Math.cos(rad), ly = pivotY + 50 * Math.sin(rad);
      ctx.fillText(`${Math.abs(deg)}°`, lx, ly + 3);
    });

    // ── Physics update ──
    const w0 = Math.sqrt(g / L_m);
    if (isSwinging) {
      frameRef.current += 1;
      const t = frameRef.current * 0.016;
      const damping = Math.pow(0.9995, frameRef.current);
      const angle = (Math.PI / 6) * Math.cos(w0 * t) * damping;

      // Count oscillations
      const side = Math.sign(angle);
      if (side !== lastSideRef.current && lastSideRef.current !== 0) {
        setOscillations(prev => prev + 0.5);
      }
      lastSideRef.current = side;

      const ropeLen = Math.min(length * 2.8, H * 0.65);
      const bx = pivotX + ropeLen * Math.sin(angle);
      const by = pivotY + ropeLen * Math.cos(angle);

      // Add to trail
      trailRef.current.push({ x: bx, y: by, a: Math.abs(angle) });
      if (trailRef.current.length > 60) trailRef.current.shift();

      // Draw trail (fading arc)
      trailRef.current.forEach((pt, i) => {
        const alpha = (i / trailRef.current.length) * 0.35;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${alpha})`; ctx.fill();
      });

      // Rope shadow (slight blur)
      ctx.shadowBlur = 3; ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bx + 2, by + 2); ctx.stroke();
      ctx.shadowBlur = 0;

      // Rope
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bx, by); ctx.stroke();

      // Bob shadow on floor
      const shadowX = bx, shadowY = H - 20;
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath(); ctx.ellipse(shadowX, shadowY, 20, 5, 0, 0, Math.PI * 2); ctx.fill();

      // Bob (3D metallic sphere)
      const bobR = Math.max(10, Math.min(20, (mass / 100) * 14));
      const bobGrad = ctx.createRadialGradient(bx - bobR * 0.35, by - bobR * 0.35, bobR * 0.05, bx, by, bobR);
      bobGrad.addColorStop(0, '#e2e8f0');
      bobGrad.addColorStop(0.25, '#94a3b8');
      bobGrad.addColorStop(0.6, '#334155');
      bobGrad.addColorStop(1, '#0f172a');
      ctx.beginPath(); ctx.arc(bx, by, bobR, 0, Math.PI * 2);
      ctx.fillStyle = bobGrad; ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.stroke();
      // Specular highlight
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath(); ctx.ellipse(bx - bobR * 0.3, by - bobR * 0.3, bobR * 0.22, bobR * 0.15, -Math.PI / 4, 0, Math.PI * 2); ctx.fill();

      // Angle arc
      if (Math.abs(angle) > 0.02) {
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1; ctx.setLineDash([2, 2]);
        ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(pivotX, pivotY + 45); ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(pivotX, pivotY, 40, Math.PI / 2, Math.PI / 2 - angle, angle > 0);
        ctx.strokeStyle = 'rgba(56,189,248,0.6)'; ctx.stroke();
        ctx.fillStyle = '#7dd3fc'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
        ctx.fillText(`${(Math.abs(angle) * 180 / Math.PI).toFixed(1)}°`, pivotX + 55 * Math.sign(angle), pivotY + 25);
      }
    } else {
      // Static at rest
      trailRef.current = [];
      const ropeLen = Math.min(length * 2.8, H * 0.65);
      const bx = pivotX, by = pivotY + ropeLen;

      // Rope
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(pivotX, pivotY); ctx.lineTo(bx, by); ctx.stroke();

      // Bob
      const bobR = Math.max(10, Math.min(20, (mass / 100) * 14));
      const bobGrad = ctx.createRadialGradient(bx - bobR * 0.35, by - bobR * 0.35, bobR * 0.05, bx, by, bobR);
      bobGrad.addColorStop(0, '#e2e8f0'); bobGrad.addColorStop(0.3, '#94a3b8');
      bobGrad.addColorStop(0.7, '#334155'); bobGrad.addColorStop(1, '#0f172a');
      ctx.beginPath(); ctx.arc(bx, by, bobR, 0, Math.PI * 2);
      ctx.fillStyle = bobGrad; ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath(); ctx.ellipse(bx - bobR * 0.3, by - bobR * 0.3, bobR * 0.22, bobR * 0.15, -Math.PI / 4, 0, Math.PI * 2); ctx.fill();

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath(); ctx.ellipse(bx, H - 20, 18, 5, 0, 0, Math.PI * 2); ctx.fill();
    }

    // Pivot bearing
    const pivotGrad = ctx.createRadialGradient(pivotX - 2, pivotY - 2, 1, pivotX, pivotY, 7);
    pivotGrad.addColorStop(0, '#94a3b8'); pivotGrad.addColorStop(0.6, '#475569'); pivotGrad.addColorStop(1, '#1e293b');
    ctx.beginPath(); ctx.arc(pivotX, pivotY, 7, 0, Math.PI * 2);
    ctx.fillStyle = pivotGrad; ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();

    // Bench
    const bench = ctx.createLinearGradient(0, H - 22, 0, H);
    bench.addColorStop(0, '#3d2a1a'); bench.addColorStop(1, '#2a1d0f');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 22, W, 22);
    ctx.strokeStyle = '#5c3d1e'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 22); ctx.lineTo(W, H - 22); ctx.stroke();

    // Period display
    ctx.fillStyle = 'rgba(16,185,129,0.15)';
    ctx.beginPath(); ctx.roundRect(W / 2 - 90, H - 62, 180, 28, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(16,185,129,0.3)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.shadowBlur = 8; ctx.shadowColor = '#10b981';
    ctx.fillStyle = '#10b981'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`T = ${T.toFixed(3)} s  |  f = ${(1 / T).toFixed(3)} Hz`, W / 2, H - 42);
    ctx.shadowBlur = 0;

    animRef.current = requestAnimationFrame(draw);
  }, [length, mass, isSwinging, g, L_m, T]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const toggleSwing = () => {
    if (!isSwinging) {
      frameRef.current = 0;
      lastSideRef.current = 0;
      setOscillations(0);
      trailRef.current = [];
    }
    setIsSwinging(s => !s);
  };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#05070d 0%,#07090f 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(56,189,248,0.2)', background: 'rgba(7,9,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🕰 Simple Pendulum: Time Period Measurement</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">g = 9.78 m/s² (Bangalore) &nbsp;|&nbsp; T = 2π√(L/g)</p>
        </div>
        <button onClick={toggleSwing}
          className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
          style={isSwinging
            ? { background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }
            : { background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
          {isSwinging ? '⏸ Stop' : '▶ Release'}
        </button>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} width={600} height={390} className="w-full" style={{ display: 'block' }} />

      {/* Controls */}
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(56,189,248,0.12)', background: 'rgba(5,7,13,0.97)' }}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-zinc-400">String Length (L)</span>
              <span className="text-xs font-mono text-sky-400">{length} cm</span>
            </div>
            <input id="pendulum-length-slider" type="range" min={20} max={120} step={2} value={length}
              onChange={e => { setLength(Number(e.target.value)); setIsSwinging(false); frameRef.current = 0; }}
              className="w-full h-1.5 rounded-full accent-sky-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-zinc-400">Bob Mass (m)</span>
              <span className="text-xs font-mono text-violet-400">{mass} g</span>
            </div>
            <input id="pendulum-mass-slider" type="range" min={20} max={300} step={10} value={mass}
              onChange={e => setMass(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-violet-500" />
          </div>
        </div>

        {/* Meter panel */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'LENGTH', val: L_m.toFixed(2), unit: 'm', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
            { label: 'PERIOD T', val: T.toFixed(3), unit: 's', color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
            { label: 'FREQUENCY', val: (1 / T).toFixed(3), unit: 'Hz', color: '#a78bfa', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
            { label: 'OSCILLATIONS', val: oscillations.toFixed(1), unit: 'n', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-2 text-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
              <div className="text-[8px] font-bold tracking-widest" style={{ color: 'rgba(148,163,184,0.6)' }}>{m.label}</div>
              <div className="text-base font-bold font-mono mt-0.5" style={{ color: m.color }}>{m.val}</div>
              <div className="text-[8px] text-zinc-600">{m.unit}</div>
            </div>
          ))}
        </div>

        {/* Formula strip */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <span className="text-[10px] text-zinc-500">Formula:</span>
          <span className="text-[11px] font-mono text-emerald-400">T = 2π√(L/g) = 2π × √({L_m.toFixed(2)}/{g}) = <strong>{T.toFixed(3)} s</strong></span>
          <span className="ml-auto text-[9px] text-zinc-600">Note: T independent of mass m</span>
        </div>
      </div>
    </div>
  );
};

export default PendulumLab;
