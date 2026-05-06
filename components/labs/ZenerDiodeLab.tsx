import React, { useState, useRef, useEffect, useCallback } from 'react';

const VZ = 5.6, VF = 0.7;

const getIV = (v: number) => {
  if (v >= 0) return v > VF ? (v - VF) * 20 : 0;
  return v < -VZ ? (v + VZ) * 50 : v * 0.01;
};

interface ElectronParticle { x: number; y: number; speed: number; pathIdx: number; }

const ZenerDiodeLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<HTMLCanvasElement>(null);
  const [voltage, setVoltage] = useState(0);
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const rafRef = useRef(0);
  const tRef = useRef(0);
  const electronsRef = useRef<ElectronParticle[]>([]);

  const current = getIV(voltage);
  const isBreakdown = voltage < -VZ;
  const isForwardActive = voltage > VF;
  const isActive = isBreakdown || isForwardActive;

  // Draw I-V characteristic graph
  const drawGraph = useCallback(() => {
    const canvas = graphRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#070810'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const ox = 100, oy = H - 55, gw = W - 130, gh = H - 85;
    // Grid
    ctx.strokeStyle = 'rgba(71,85,105,0.3)'; ctx.lineWidth = 0.8; ctx.setLineDash([2, 4]);
    for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(ox, oy - i * (gh / 4)); ctx.lineTo(ox + gw, oy - i * (gh / 4)); ctx.stroke(); }
    for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(ox + (gw / 2) + i * (gw / 8), 30); ctx.lineTo(ox + (gw / 2) + i * (gw / 8), oy); ctx.stroke(); }
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox - 10, oy); ctx.lineTo(ox + gw + 10, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox + gw / 2, oy + 10); ctx.lineTo(ox + gw / 2, 25); ctx.stroke();
    // Arrowheads
    ctx.fillStyle = '#475569';
    ctx.beginPath(); ctx.moveTo(ox + gw + 10, oy); ctx.lineTo(ox + gw + 3, oy - 4); ctx.lineTo(ox + gw + 3, oy + 4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ox + gw / 2, 25); ctx.lineTo(ox + gw / 2 - 4, 32); ctx.lineTo(ox + gw / 2 + 4, 32); ctx.fill();

    // Axis labels
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText('V (Volts)', ox + gw * 0.75, oy + 20);
    ctx.fillText('I (mA)', ox + gw / 2 + 28, 20);
    // V axis ticks
    ctx.fillStyle = '#64748b'; ctx.font = '9px Inter';
    [-8, -4, 0, 2, 4].forEach((v, i) => {
      const px = ox + gw / 2 + (v / 10) * (gw / 2);
      ctx.fillText(v.toString(), px, oy + 12);
      ctx.strokeStyle = 'rgba(71,85,105,0.5)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(px, oy - 3); ctx.lineTo(px, oy + 3); ctx.stroke();
    });
    // I axis ticks
    ctx.textAlign = 'right';
    [25, 50, 75, 100].forEach(I => {
      const py = oy - (I / 100) * gh;
      ctx.fillText(I.toString(), ox - 5, py + 3);
    });

    // ── I-V Curve ──
    ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2.5;
    ctx.shadowBlur = 6; ctx.shadowColor = '#10b981';
    ctx.beginPath();
    let first = true;
    for (let v = -10; v <= 5; v += 0.05) {
      const i = getIV(v);
      const px = ox + gw / 2 + (v / 10) * (gw / 2);
      const py = oy - (i / 100) * gh;
      const clampedPy = Math.max(28, Math.min(oy + 5, py));
      if (first) { ctx.moveTo(px, clampedPy); first = false; } else ctx.lineTo(px, clampedPy);
    }
    ctx.stroke(); ctx.shadowBlur = 0;

    // Vz breakdown label
    const vzPx = ox + gw / 2 + (-VZ / 10) * (gw / 2);
    ctx.strokeStyle = 'rgba(239,68,68,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(vzPx, oy); ctx.lineTo(vzPx, 28); ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 6; ctx.shadowColor = '#ef4444';
    ctx.fillStyle = '#ef4444'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`Vz=${VZ}V`, vzPx, oy + 18);
    ctx.shadowBlur = 0;

    // Vf label
    const vfPx = ox + gw / 2 + (VF / 10) * (gw / 2);
    ctx.strokeStyle = 'rgba(251,191,36,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(vfPx, oy); ctx.lineTo(vfPx, 28); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = '9px Inter';
    ctx.fillText(`Vf=${VF}V`, vfPx, oy + 18);

    // Current operating point
    const opV = voltage, opI = current;
    const opPx = ox + gw / 2 + (opV / 10) * (gw / 2);
    const opPy = Math.max(28, Math.min(oy, oy - (opI / 100) * gh));
    ctx.shadowBlur = 15; ctx.shadowColor = '#f59e0b';
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(opPx, opPy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.shadowBlur = 0;

    // Cross-hair lines to operating point
    ctx.strokeStyle = 'rgba(245,158,11,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
    ctx.beginPath(); ctx.moveTo(opPx, oy); ctx.lineTo(opPx, opPy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox + gw / 2, opPy); ctx.lineTo(opPx, opPy); ctx.stroke();
    ctx.setLineDash([]);
  }, [voltage, current]);

  // Draw circuit diagram
  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#040509');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;

    // ── Circuit layout ──
    const top = 30, bot = H - 30, left = 40, right = W - 40;
    const wireColor = isActive ? (isBreakdown ? '#f97316' : '#10b981') : 'rgba(71,85,105,0.6)';
    const wireWidth = isActive ? 2 : 1.5;

    // Top wire: left → right
    ctx.strokeStyle = wireColor; ctx.lineWidth = wireWidth;
    ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(right, top); ctx.stroke();
    // Right wire: top → bot
    ctx.beginPath(); ctx.moveTo(right, top); ctx.lineTo(right, bot); ctx.stroke();
    // Bottom wire: right → left
    ctx.beginPath(); ctx.moveTo(right, bot); ctx.lineTo(left, bot); ctx.stroke();
    // Left wire: bot → top
    ctx.beginPath(); ctx.moveTo(left, bot); ctx.lineTo(left, top); ctx.stroke();

    // ── Battery ──
    const batX = left, batY = cy - 20, batH = 40;
    // Battery body
    const batGrad = ctx.createLinearGradient(batX - 14, batY, batX + 14, batY + batH);
    batGrad.addColorStop(0, '#1e293b'); batGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = batGrad; ctx.beginPath(); ctx.roundRect(batX - 14, batY, 28, batH, 4); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
    // Battery plates (+ and −)
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(batX - 8, batY + 8); ctx.lineTo(batX + 8, batY + 8); ctx.stroke();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(batX - 5, batY + 14); ctx.lineTo(batX + 5, batY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(batX - 8, batY + 20); ctx.lineTo(batX + 8, batY + 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(batX - 5, batY + 26); ctx.lineTo(batX + 5, batY + 26); ctx.stroke();
    ctx.fillStyle = '#ef4444'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`+`, batX - 20, batY + 10); ctx.fillText(`−`, batX - 20, batY + 32);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px Inter';
    ctx.fillText(`${Math.abs(voltage).toFixed(1)}V`, batX, batY + batH + 14);

    // ── Resistor (top wire, left side) ──
    const resX = left + 70, resY = top;
    ctx.fillStyle = '#d97706';
    ctx.beginPath(); ctx.roundRect(resX - 25, resY - 8, 50, 16, 3); ctx.fill();
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; ctx.stroke();
    // Resistor bands
    ['#ef4444', '#fbbf24', '#f97316'].forEach((c, i) => {
      ctx.fillStyle = c; ctx.fillRect(resX - 14 + i * 10, resY - 8, 6, 16);
    });
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('330Ω', resX, resY + 22);

    // ── Voltmeter ──
    const vmX = right - 60, vmY = cy;
    ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.arc(vmX, vmY, 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText('V', vmX, vmY + 4);
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px Inter'; ctx.fillText(`${voltage.toFixed(1)}V`, vmX, vmY + 18);

    // ── Zener Diode symbol ──
    const dzX = cx, dzY = top;
    ctx.strokeStyle = isActive ? (isBreakdown ? '#f97316' : '#10b981') : '#60a5fa';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = isActive ? 12 : 0; ctx.shadowColor = isBreakdown ? '#f97316' : '#10b981';
    // Triangle (diode body)
    ctx.beginPath();
    ctx.moveTo(dzX - 18, dzY - 14); ctx.lineTo(dzX + 18, dzY); ctx.lineTo(dzX - 18, dzY + 14); ctx.closePath();
    ctx.fillStyle = (isActive ? (isBreakdown ? 'rgba(249,115,22,0.15)' : 'rgba(16,185,129,0.15)') : 'rgba(96,165,250,0.08)');
    ctx.fill(); ctx.stroke();
    // Zener bar (with bent ends)
    ctx.strokeStyle = isActive ? (isBreakdown ? '#f97316' : '#10b981') : '#60a5fa';
    ctx.beginPath(); ctx.moveTo(dzX + 18, dzY - 18); ctx.lineTo(dzX + 18, dzY + 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(dzX + 18, dzY - 18); ctx.lineTo(dzX + 24, dzY - 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(dzX + 18, dzY + 18); ctx.lineTo(dzX + 12, dzY + 12); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Zener Diode', dzX, dzY + 30);
    ctx.fillText(`Vz = ${VZ}V`, dzX, dzY + 40);

    // ── Electrons flowing ──
    if (isActive) {
      // Spawn electrons
      if (electronsRef.current.length < 15 && Math.random() < 0.25) {
        electronsRef.current.push({ x: isBreakdown ? right : left + 10, y: isBreakdown ? bot : top, speed: 1.5 + Math.random(), pathIdx: 0 });
      }
      const path = isBreakdown
        ? [{ x: right, y: bot }, { x: left, y: bot }, { x: left, y: top }, { x: right, y: top }, { x: right, y: bot }]
        : [{ x: left, y: top }, { x: right, y: top }, { x: right, y: bot }, { x: left, y: bot }, { x: left, y: top }];

      electronsRef.current = electronsRef.current.map(e => {
        if (e.pathIdx >= path.length - 1) return { ...e, pathIdx: -1 };
        const from = path[e.pathIdx], to = path[e.pathIdx + 1];
        const dx = to.x - from.x, dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const stepX = (dx / dist) * e.speed, stepY = (dy / dist) * e.speed;
        let nx = e.x + stepX, ny = e.y + stepY;
        let nIdx = e.pathIdx;
        if (Math.abs(nx - to.x) < 3 && Math.abs(ny - to.y) < 3) { nx = to.x; ny = to.y; nIdx++; }
        return { ...e, x: nx, y: ny, pathIdx: nIdx };
      }).filter(e => e.pathIdx >= 0);

      electronsRef.current.forEach(e => {
        ctx.shadowBlur = 6; ctx.shadowColor = isBreakdown ? '#f97316' : '#60a5fa';
        ctx.fillStyle = isBreakdown ? '#f97316' : '#60a5fa';
        ctx.beginPath(); ctx.arc(e.x, e.y, 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      });
    } else {
      electronsRef.current = [];
    }

    tRef.current = ts;
    rafRef.current = requestAnimationFrame(draw);
  }, [voltage, current, isActive, isBreakdown, isForwardActive]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const region = isBreakdown ? 'Zener Breakdown ⚡' : isForwardActive ? 'Forward Conduction ✓' : voltage < 0 ? 'Reverse Bias (off)' : 'Forward Bias (off)';

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">⚡ Zener Diode — I-V Characteristics</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Vz = {VZ}V · Vf = {VF}V · Voltage regulation</p>
        </div>
        <div className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: isBreakdown ? 'rgba(249,115,22,0.15)' : isForwardActive ? 'rgba(16,185,129,0.15)' : 'rgba(71,85,105,0.15)', color: isBreakdown ? '#f97316' : isForwardActive ? '#10b981' : '#64748b', border: `1px solid ${isBreakdown ? 'rgba(249,115,22,0.3)' : isForwardActive ? 'rgba(16,185,129,0.3)' : 'rgba(71,85,105,0.3)'}` }}>
          {region}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Circuit */}
        <canvas ref={canvasRef} width={220} height={240} style={{ width: '45%', display: 'block' }} />
        {/* I-V Graph */}
        <canvas ref={graphRef} width={300} height={240} style={{ width: '55%', display: 'block' }} />
      </div>

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(245,158,11,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {(['forward', 'reverse'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setVoltage(m === 'forward' ? 0.5 : -2); }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold capitalize"
                style={{ background: mode === m ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.04)', color: mode === m ? '#fbbf24' : '#64748b', border: `1px solid ${mode === m ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
                {m}
              </button>
            ))}
          </div>
          <input type="range" min={mode === 'forward' ? 0 : -10} max={mode === 'forward' ? 5 : 0} step={0.1} value={voltage}
            onChange={e => setVoltage(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-amber-400" />
          <span className="text-xs font-mono text-amber-400 w-14 text-right">{voltage.toFixed(1)} V</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Voltage', val: `${voltage.toFixed(1)} V`, color: '#fbbf24' },
            { label: 'Current', val: `${Math.abs(current).toFixed(1)} mA`, color: isBreakdown ? '#f97316' : isForwardActive ? '#10b981' : '#64748b' },
            { label: 'Region', val: isBreakdown ? 'Breakdown' : isForwardActive ? 'Forward' : 'Off', color: isBreakdown ? '#f97316' : isForwardActive ? '#10b981' : '#64748b' },
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
export default ZenerDiodeLab;
