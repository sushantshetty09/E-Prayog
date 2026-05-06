import React, { useState, useRef, useEffect, useCallback } from 'react';

const OhmsLawLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [voltage, setVoltage] = useState(6);
  const [resistance, setResistance] = useState(10);
  const [readings, setReadings] = useState<{ v: number; i: number }[]>([]);
  const current = voltage / resistance;

  const addReading = () => {
    if (readings.length < 8)
      setReadings(prev => [...prev, { v: parseFloat(voltage.toFixed(1)), i: parseFloat(current.toFixed(4)) }]);
  };
  const clearReadings = () => setReadings([]);

  // Resistor color bands (IEC standard)
  const bandColors = (r: number) => {
    const map: Record<number, string[]> = {
      5:  ['#8B4513','#000000','#FFD700'],
      10: ['#8B4513','#000000','#000000'],
      15: ['#8B4513','#228B22','#000000'],
      20: ['#FF0000','#000000','#000000'],
      30: ['#FF8C00','#000000','#000000'],
      47: ['#FFFF00','#9400D3','#000000'],
      56: ['#228B22','#00008B','#000000'],
      68: ['#0000FF','#808080','#000000'],
      82: ['#808080','#FF0000','#000000'],
      100:['#8B4513','#000000','#8B4513'],
    };
    return map[r] ?? ['#FF8C00','#000000','#000000'];
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Lab bench background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0e1a');
    bg.addColorStop(1, '#060810');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid (graph paper texture)
    ctx.strokeStyle = 'rgba(148,163,184,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // ── Wooden bench surface (bottom strip) ──
    const bench = ctx.createLinearGradient(0, H - 28, 0, H);
    bench.addColorStop(0, '#3d2a1a');
    bench.addColorStop(1, '#2a1d0f');
    ctx.fillStyle = bench;
    ctx.fillRect(0, H - 28, W, 28);
    ctx.strokeStyle = '#5c3d1e';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 28); ctx.lineTo(W, H - 28); ctx.stroke();

    // ── Circuit layout ──
    const cx = W / 2 - 20, cy = 140;
    const wireColor = '#b8c4d0';
    const wireGlow = 'rgba(56,189,248,0.6)';

    // Draw glowing wire helper
    const wire = (x1: number, y1: number, x2: number, y2: number, glow = false) => {
      if (glow) {
        ctx.shadowBlur = 8; ctx.shadowColor = wireGlow;
      }
      ctx.strokeStyle = glow ? '#7dd3fc' : wireColor;
      ctx.lineWidth = glow ? 2.5 : 2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const glow = current > 0;
    // Top wire: battery (+) → ammeter → top-right corner
    wire(cx - 130, cy - 70, cx - 65, cy - 70, glow);
    wire(cx - 28, cy - 70, cx + 90, cy - 70, glow);
    wire(cx + 90, cy - 70, cx + 140, cy - 70, glow);
    // Right wire down
    wire(cx + 140, cy - 70, cx + 140, cy + 30, glow);
    // Bottom wire
    wire(cx + 140, cy + 100, cx + 140, cy + 140, glow);
    wire(cx + 140, cy + 140, cx - 130, cy + 140, glow);
    wire(cx - 130, cy + 140, cx - 130, cy - 70, glow);

    // ── Battery ──
    const bx = cx - 130, by = cy - 70;
    // Battery body
    const batGrad = ctx.createLinearGradient(bx, by - 40, bx + 60, by - 40);
    batGrad.addColorStop(0, '#1e3a5f');
    batGrad.addColorStop(0.5, '#2563eb');
    batGrad.addColorStop(1, '#1e3a5f');
    ctx.fillStyle = batGrad;
    ctx.beginPath();
    ctx.roundRect(bx - 25, by - 55, 50, 30, 4);
    ctx.fill();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Terminals
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(bx + 20, by - 52, 6, 8);   // +
    ctx.fillRect(bx - 26, by - 52, 6, 8);   // -
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`${voltage.toFixed(1)}V`, bx, by - 38);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px Inter';
    ctx.fillText('BATTERY', bx, by - 22);

    // ── Ammeter ── (realistic circular dial)
    const ax = cx - 47, ay = cy - 70;
    const ar = 24;
    // Meter body
    const meterBg = ctx.createRadialGradient(ax, ay, 0, ax, ay, ar);
    meterBg.addColorStop(0, '#1e293b');
    meterBg.addColorStop(1, '#0f172a');
    ctx.beginPath(); ctx.arc(ax, ay, ar, 0, Math.PI * 2);
    ctx.fillStyle = meterBg; ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.stroke();
    // Glass reflection
    ctx.beginPath(); ctx.arc(ax - 6, ay - 6, ar * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fill();
    // Scale arc
    ctx.beginPath(); ctx.arc(ax, ay, ar - 5, Math.PI * 0.8, Math.PI * 0.2);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.stroke();
    // Needle
    const needleAngle = Math.PI * 0.8 + (Math.min(current, 1.2) / 1.2) * Math.PI * 1.4;
    ctx.save(); ctx.translate(ax, ay);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5;
    ctx.shadowBlur = 4; ctx.shadowColor = '#ef4444';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(needleAngle) * (ar - 7), Math.sin(needleAngle) * (ar - 7));
    ctx.stroke(); ctx.shadowBlur = 0; ctx.restore();
    // Label
    ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText('A', ax, ay + 5);
    ctx.fillStyle = '#7dd3fc'; ctx.font = '8px Inter';
    ctx.fillText(`${current.toFixed(3)}A`, ax, ay + ar + 12);

    // ── Resistor (realistic 3D cylindrical body) ──
    const rx = cx + 140, ry1 = cy + 30, ry2 = cy + 100;
    const rh = ry2 - ry1, rw = 14;
    // Body gradient (cylindrical shading)
    const resGrad = ctx.createLinearGradient(rx - rw, ry1, rx + rw, ry1);
    resGrad.addColorStop(0, '#1a0f00');
    resGrad.addColorStop(0.3, '#d97706');
    resGrad.addColorStop(0.5, '#fbbf24');
    resGrad.addColorStop(0.7, '#d97706');
    resGrad.addColorStop(1, '#1a0f00');
    ctx.fillStyle = resGrad;
    ctx.beginPath(); ctx.roundRect(rx - rw, ry1, rw * 2, rh, 7); ctx.fill();
    ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1; ctx.stroke();
    // Color bands
    const bands = bandColors(resistance);
    const bandY = [ry1 + rh * 0.2, ry1 + rh * 0.38, ry1 + rh * 0.56];
    bands.forEach((bc, i) => {
      ctx.fillStyle = bc;
      ctx.beginPath(); ctx.roundRect(rx - rw + 2, bandY[i], rw * 2 - 4, 6, 1); ctx.fill();
    });
    // Gold tolerance band
    ctx.fillStyle = '#FFD700';
    ctx.beginPath(); ctx.roundRect(rx - rw + 2, ry1 + rh * 0.76, rw * 2 - 4, 6, 1); ctx.fill();
    // Lead wires
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(rx, ry1); ctx.lineTo(rx, ry1 - 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx, ry2); ctx.lineTo(rx, ry2 + 5); ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'left';
    ctx.fillText(`${resistance}Ω`, rx + rw + 5, ry1 + rh / 2 + 4);

    // ── Voltmeter (parallel) ──
    const vx = cx + 55, vy = cy + 65;
    const vr = 24;
    // Dashed lead wires
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(vx, vy - vr); ctx.lineTo(vx, vy - 40); ctx.lineTo(rx, ry1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(vx, vy + vr); ctx.lineTo(vx, vy + 40); ctx.lineTo(rx, ry2); ctx.stroke();
    ctx.setLineDash([]);
    // Meter body
    const vmBg = ctx.createRadialGradient(vx, vy, 0, vx, vy, vr);
    vmBg.addColorStop(0, '#1e1a3f');
    vmBg.addColorStop(1, '#0f0a2a');
    ctx.beginPath(); ctx.arc(vx, vy, vr, 0, Math.PI * 2);
    ctx.fillStyle = vmBg; ctx.fill();
    ctx.strokeStyle = '#6d28d9'; ctx.lineWidth = 3; ctx.stroke();
    // Needle
    const vNeedle = Math.PI * 0.8 + (Math.min(voltage, 12) / 12) * Math.PI * 1.4;
    ctx.save(); ctx.translate(vx, vy);
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1.5;
    ctx.shadowBlur = 4; ctx.shadowColor = '#a78bfa';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(vNeedle) * (vr - 7), Math.sin(vNeedle) * (vr - 7));
    ctx.stroke(); ctx.shadowBlur = 0; ctx.restore();
    ctx.fillStyle = '#c4b5fd'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText('V', vx, vy + 5);
    ctx.fillStyle = '#a78bfa'; ctx.font = '8px Inter';
    ctx.fillText(`${voltage.toFixed(1)}V`, vx, vy + vr + 12);

    // ── Animated electrons ──
    const t = Date.now() / 1000;
    const speed = current * 30;
    ctx.shadowBlur = 8; ctx.shadowColor = '#60a5fa';
    ctx.fillStyle = '#93c5fd';
    for (let i = 0; i < 6; i++) {
      // Top wire (left → right)
      const ex = ((cx - 130 + (t * speed * 1.2 + i * 45)) % 270) + cx - 130;
      if (ex < cx + 85) { ctx.beginPath(); ctx.arc(ex, cy - 70, 3, 0, Math.PI * 2); ctx.fill(); }
      // Bottom wire (right → left)
      const ex2 = cx + 140 - ((t * speed * 1.2 + i * 45) % 270);
      if (ex2 > cx - 120) { ctx.beginPath(); ctx.arc(ex2, cy + 140, 3, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.shadowBlur = 0;

    // ── V-I Graph ──
    const gx = 32, gy = H - 155, gw = W - 64, gh = 115;
    // Graph panel
    const graphBg = ctx.createLinearGradient(gx, gy, gx, gy + gh);
    graphBg.addColorStop(0, 'rgba(15,23,42,0.9)');
    graphBg.addColorStop(1, 'rgba(8,12,24,0.95)');
    ctx.fillStyle = graphBg;
    ctx.beginPath(); ctx.roundRect(gx, gy, gw, gh, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(99,102,241,0.3)'; ctx.lineWidth = 1; ctx.stroke();

    // Grid lines
    ctx.strokeStyle = 'rgba(148,163,184,0.06)'; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const xi = gx + (gw / 4) * i;
      ctx.beginPath(); ctx.moveTo(xi, gy + 10); ctx.lineTo(xi, gy + gh - 20); ctx.stroke();
    }
    // Axes
    const ox = gx + 30, oy = gy + gh - 22;
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, gy + 8); ctx.lineTo(ox, oy); ctx.lineTo(gx + gw - 10, oy); ctx.stroke();
    // Labels
    ctx.fillStyle = '#64748b'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Current I (A)', gx + gw / 2, gy + gh - 5);
    ctx.save(); ctx.translate(gx + 10, gy + gh / 2);
    ctx.rotate(-Math.PI / 2); ctx.fillText('Voltage V', 0, 0); ctx.restore();
    // Title
    ctx.fillStyle = '#475569'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'right';
    ctx.fillText('V-I Characteristic', gx + gw - 8, gy + 18);

    const iMax = 1.5, vMax = 14;
    const scaleX = (gw - 40) / iMax, scaleY = (gh - 32) / vMax;

    // Plot recorded readings
    readings.forEach(r => {
      const px = ox + r.i * scaleX;
      const py = oy - r.v * scaleY;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981'; ctx.fill();
      ctx.strokeStyle = '#065f46'; ctx.lineWidth = 1; ctx.stroke();
    });
    // Best fit line
    if (readings.length >= 2) {
      ctx.strokeStyle = 'rgba(16,185,129,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + (vMax / resistance) * scaleX, oy - vMax * scaleY);
      ctx.stroke(); ctx.setLineDash([]);
    }
    // Live point (amber glow)
    const lpx = ox + current * scaleX;
    const lpy = oy - voltage * scaleY;
    ctx.shadowBlur = 12; ctx.shadowColor = '#f59e0b';
    ctx.beginPath(); ctx.arc(lpx, lpy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = 0;

    animRef.current = requestAnimationFrame(draw);
  }, [voltage, resistance, current, readings]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f 0%,#0a0e1a 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(10,14,26,0.8)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">⚡ Ohm's Law — V-I Characteristics</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">V = I × R &nbsp;|&nbsp; Real circuit simulation</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addReading} disabled={readings.length >= 8} className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
            📌 Record
          </button>
          <button onClick={clearReadings} className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
            🗑 Clear
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} width={680} height={440} className="w-full" style={{ display: 'block' }} />

      {/* Controls */}
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(99,102,241,0.15)', background: 'rgba(6,8,16,0.9)' }}>
        {/* Sliders */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <label className="text-xs text-slate-400">Voltage (V)</label>
              <span className="text-xs font-mono text-amber-400">{voltage.toFixed(1)} V</span>
            </div>
            <input type="range" min={0} max={12} step={0.5} value={voltage} onChange={e => setVoltage(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-amber-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <label className="text-xs text-slate-400">Resistance (Ω)</label>
              <span className="text-xs font-mono text-orange-400">{resistance} Ω</span>
            </div>
            <input type="range" min={5} max={100} step={5} value={resistance} onChange={e => setResistance(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-orange-500" />
          </div>
        </div>

        {/* Meters */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'VOLTAGE', val: voltage.toFixed(1), unit: 'V', color: '#a78bfa', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)' },
            { label: 'CURRENT', val: current.toFixed(4), unit: 'A', color: '#38bdf8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.25)' },
            { label: 'RESISTANCE', val: resistance, unit: 'Ω', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-2.5 text-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
              <div className="text-[9px] font-bold tracking-widest" style={{ color: 'rgba(148,163,184,0.7)' }}>{m.label}</div>
              <div className="text-base font-bold font-mono mt-0.5" style={{ color: m.color }}>{m.val}</div>
              <div className="text-[9px] text-slate-500">{m.unit}</div>
            </div>
          ))}
        </div>

        {/* Readings table */}
        {readings.length > 0 && (
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
            <div className="grid px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-500" style={{ gridTemplateColumns: 'repeat(4,1fr)', background: 'rgba(99,102,241,0.08)' }}>
              <span>#</span><span>V (V)</span><span>I (A)</span><span>V/I (Ω)</span>
            </div>
            {readings.map((r, i) => (
              <div key={i} className="grid px-3 py-1" style={{ gridTemplateColumns: 'repeat(4,1fr)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <span className="text-[10px] text-slate-500">{i + 1}</span>
                <span className="text-[10px] font-mono text-violet-400">{r.v}</span>
                <span className="text-[10px] font-mono text-sky-400">{r.i}</span>
                <span className="text-[10px] font-mono text-amber-400">{(r.v / r.i).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OhmsLawLab;
