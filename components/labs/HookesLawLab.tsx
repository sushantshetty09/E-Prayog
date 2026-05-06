import React, { useState, useRef, useEffect } from 'react';

const k = 5; // N/m spring constant
const NATURAL_LEN = 85;

const HookesLawLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mass, setMass] = useState(150); // grams
  const F = (mass / 1000) * 9.78;
  const x = F / k;
  const x_cm = x * 100;
  const [readings, setReadings] = useState<{ m: number; F: number; x: number }[]>([]);

  const addReading = () => {
    if (readings.length < 6)
      setReadings(p => [...p, { m: mass, F: parseFloat(F.toFixed(3)), x: parseFloat(x_cm.toFixed(2)) }]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#070910'); bg.addColorStop(1, '#040508');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(148,163,184,0.02)';
    for (let x2 = 0; x2 < W; x2 += 22) for (let y2 = 0; y2 < H; y2 += 22) {
      ctx.beginPath(); ctx.arc(x2, y2, 0.7, 0, Math.PI * 2); ctx.fill();
    }

    const cx = W / 2 - 30, topY = 28;

    // ── Support beam (ceiling clamp) ──
    const ceilGrad = ctx.createLinearGradient(cx - 60, topY, cx + 60, topY + 12);
    ceilGrad.addColorStop(0, '#1e293b'); ceilGrad.addColorStop(0.5, '#334155'); ceilGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = ceilGrad;
    ctx.beginPath(); ctx.roundRect(cx - 60, topY, 120, 12, 4); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.stroke();
    // Bolts
    [cx - 40, cx + 40].forEach(bx => {
      ctx.fillStyle = '#64748b'; ctx.beginPath(); ctx.arc(bx, topY + 6, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(bx - 3, topY + 6); ctx.lineTo(bx + 3, topY + 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, topY + 3); ctx.lineTo(bx, topY + 9); ctx.stroke();
    });

    // ── Spring coils (realistic helix) ──
    const springTop = topY + 12;
    const extLen = NATURAL_LEN + x_cm * 4.5;
    const coils = 10;
    const coilWidth = 16;

    // Shadow
    ctx.strokeStyle = 'rgba(0,0,0,0.4)'; ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i <= coils * 4; i++) {
      const t = i / (coils * 4);
      const sy = springTop + t * extLen;
      const sx = cx + Math.sin(t * coils * Math.PI * 2) * coilWidth + 2;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Main spring with gradient
    const springGrad = ctx.createLinearGradient(cx - coilWidth, springTop, cx + coilWidth, springTop);
    springGrad.addColorStop(0, '#1e3a5f');
    springGrad.addColorStop(0.3, '#60a5fa');
    springGrad.addColorStop(0.5, '#93c5fd');
    springGrad.addColorStop(0.7, '#60a5fa');
    springGrad.addColorStop(1, '#1e3a5f');
    ctx.strokeStyle = springGrad; ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= coils * 4; i++) {
      const t = i / (coils * 4);
      const sy = springTop + t * extLen;
      const sx = cx + Math.sin(t * coils * Math.PI * 2) * coilWidth;
      if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Natural length marker
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(cx + coilWidth + 10, springTop + NATURAL_LEN);
    ctx.lineTo(cx + coilWidth + 40, springTop + NATURAL_LEN); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(148,163,184,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'left';
    ctx.fillText('L₀', cx + coilWidth + 44, springTop + NATURAL_LEN + 3);

    // Extension arrows + label
    if (x_cm > 0.5) {
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx + coilWidth + 12, springTop + NATURAL_LEN);
      ctx.lineTo(cx + coilWidth + 12, springTop + extLen - 2); ctx.stroke();
      ctx.setLineDash([]);
      // Arrowheads
      [springTop + NATURAL_LEN, springTop + extLen].forEach((ay, si) => {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(cx + coilWidth + 8, ay + (si === 0 ? 8 : -8));
        ctx.lineTo(cx + coilWidth + 12, ay);
        ctx.lineTo(cx + coilWidth + 16, ay + (si === 0 ? 8 : -8));
        ctx.closePath(); ctx.fill();
      });
      ctx.shadowBlur = 6; ctx.shadowColor = '#38bdf8';
      ctx.fillStyle = '#7dd3fc'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'left';
      ctx.fillText(`x = ${x_cm.toFixed(1)} cm`, cx + coilWidth + 18,
        springTop + NATURAL_LEN + (extLen - NATURAL_LEN) / 2 + 3);
      ctx.shadowBlur = 0;
    }

    // ── Weight (realistic metal disk stack) ──
    const weightY = springTop + extLen + 8;
    const diskW = 36, diskH = 10;
    const diskCount = Math.max(1, Math.min(5, Math.round(mass / 100)));

    for (let d = diskCount - 1; d >= 0; d--) {
      const dy = weightY + d * (diskH + 1);
      const diskGrad = ctx.createLinearGradient(cx - diskW, dy, cx + diskW, dy);
      diskGrad.addColorStop(0, '#1a0f00');
      diskGrad.addColorStop(0.2, '#b45309');
      diskGrad.addColorStop(0.5, '#fbbf24');
      diskGrad.addColorStop(0.8, '#b45309');
      diskGrad.addColorStop(1, '#1a0f00');
      ctx.shadowBlur = d === 0 ? 10 : 0; ctx.shadowColor = 'rgba(251,191,36,0.3)';
      ctx.fillStyle = diskGrad;
      ctx.beginPath(); ctx.ellipse(cx, dy, diskW, diskH / 2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1; ctx.stroke();
      ctx.shadowBlur = 0;
    }
    // Mass label
    ctx.fillStyle = '#fef3c7'; ctx.font = `bold 11px Inter`; ctx.textAlign = 'center';
    ctx.fillText(`${mass} g`, cx, weightY + diskCount * 11 + 6);

    // ── Hook detail ──
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, springTop + extLen);
    ctx.lineTo(cx, weightY - 2); ctx.stroke();

    // ── F-x Graph ──
    const gx = W - 180, gy = 30, gw = 155, gh = 200;
    const graphBg = ctx.createLinearGradient(gx, gy, gx, gy + gh);
    graphBg.addColorStop(0, 'rgba(12,20,40,0.95)');
    graphBg.addColorStop(1, 'rgba(6,10,20,0.98)');
    ctx.fillStyle = graphBg;
    ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(99,102,241,0.3)'; ctx.lineWidth = 1; ctx.stroke();

    // Graph title
    ctx.fillStyle = '#64748b'; ctx.font = 'bold 8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('F–x Characteristic', gx + gw / 2, gy + 12);

    // Axes
    const ox = gx + 28, oy = gy + gh - 22;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ox, gy + 18); ctx.lineTo(ox, oy); ctx.lineTo(gx + gw - 8, oy); ctx.stroke();
    ctx.fillStyle = '#475569'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
    ctx.fillText('x (cm)', gx + gw / 2, gy + gh - 6);
    ctx.save(); ctx.translate(gx + 10, gy + gh / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('F (N)', 0, 0); ctx.restore();

    const maxX = 50, maxF = 2.5;
    const scX = (gw - 36) / maxX, scY = (gh - 40) / maxF;

    // Ideal Hooke's line
    ctx.strokeStyle = 'rgba(16,185,129,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(ox, oy);
    ctx.lineTo(ox + maxX * scX, oy - maxF * scY); ctx.stroke(); ctx.setLineDash([]);

    // Recorded points
    readings.forEach(r => {
      const px = ox + r.x * scX, py = oy - r.F * scY;
      ctx.shadowBlur = 6; ctx.shadowColor = '#10b981';
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981'; ctx.fill(); ctx.shadowBlur = 0;
    });

    // Live point
    const lpx = ox + x_cm * scX, lpy = oy - F * scY;
    ctx.shadowBlur = 10; ctx.shadowColor = '#fbbf24';
    ctx.beginPath(); ctx.arc(lpx, lpy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.shadowBlur = 0;

    // Bench
    const bench = ctx.createLinearGradient(0, H - 20, 0, H);
    bench.addColorStop(0, '#3d2a1a'); bench.addColorStop(1, '#2a1d0f');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 20, W, 20);
    ctx.strokeStyle = '#5c3d1e'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 20); ctx.lineTo(W, H - 20); ctx.stroke();

  }, [mass, F, x, x_cm, readings]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#060810 0%,#040508 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(7,9,16,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🌀 Hooke's Law — Spring Extension</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">F = kx &nbsp;|&nbsp; k = {k} N/m &nbsp;|&nbsp; g = 9.78 m/s²</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addReading} disabled={readings.length >= 6}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
            📌 Record
          </button>
          <button onClick={() => setReadings([])}
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
            🗑
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} width={520} height={380} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-4">
          <label className="text-xs text-slate-400 whitespace-nowrap">Mass (m)</label>
          <input type="range" min={0} max={500} step={10} value={mass}
            onChange={e => setMass(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-amber-500" />
          <span className="text-xs font-mono text-amber-400 w-16 text-right">{mass} g</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'FORCE (F)', val: `${F.toFixed(3)} N`, color: '#fbbf24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
            { label: 'EXTENSION (x)', val: `${x_cm.toFixed(2)} cm`, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
            { label: 'SPRING CONST k', val: `${k} N/m`, color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-2.5 text-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500">{m.label}</div>
              <div className="text-base font-bold font-mono mt-0.5" style={{ color: m.color }}>{m.val}</div>
            </div>
          ))}
        </div>

        {readings.length > 0 && (
          <div className="rounded-xl overflow-hidden border text-[10px]" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
            <div className="grid px-3 py-1 font-bold uppercase tracking-widest text-slate-500" style={{ gridTemplateColumns: 'repeat(4,1fr)', background: 'rgba(99,102,241,0.07)' }}>
              <span>#</span><span>m (g)</span><span>F (N)</span><span>x (cm)</span>
            </div>
            {readings.map((r, i) => (
              <div key={i} className="grid px-3 py-1" style={{ gridTemplateColumns: 'repeat(4,1fr)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <span className="text-slate-500">{i + 1}</span>
                <span className="text-amber-400 font-mono">{r.m}</span>
                <span className="text-sky-400 font-mono">{r.F}</span>
                <span className="text-emerald-400 font-mono">{r.x}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px]" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)' }}>
          <span className="text-slate-500">Verification:</span>
          <span className="font-mono text-emerald-400">F = kx → {F.toFixed(3)} N = {k} × {x.toFixed(4)} m ✓</span>
        </div>
      </div>
    </div>
  );
};

export default HookesLawLab;
