import React, { useState, useRef, useEffect, useCallback } from 'react';

const TitrationLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [buretteVol, setBuretteVol] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const dropYRef = useRef(0);
  const endpoint = 20.5;
  const atEndpoint = Math.abs(buretteVol - endpoint) < 0.5;
  const pastEndpoint = buretteVol > endpoint + 0.5;

  // Solution colour in flask
  const getSolutionColor = () => {
    if (pastEndpoint) {
      const intensity = Math.min(0.85, 0.3 + (buretteVol - endpoint - 0.5) * 0.04);
      return { r: 236, g: 72, b: 153, a: intensity };
    }
    if (atEndpoint) return { r: 236, g: 72, b: 153, a: 0.22 };
    // Near endpoint — very faint pink tinge
    if (buretteVol > endpoint - 3) {
      const t = (buretteVol - (endpoint - 3)) / 3;
      return { r: 200, g: 180, b: 220, a: t * 0.08 };
    }
    return { r: 200, g: 220, b: 255, a: 0.06 };
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Dark lab background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#080b14');
    bg.addColorStop(1, '#050709');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Bench surface
    const bench = ctx.createLinearGradient(0, H - 24, 0, H);
    bench.addColorStop(0, '#3d2a1a'); bench.addColorStop(1, '#2a1d0f');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 24, W, 24);
    ctx.strokeStyle = '#5c3d1e'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 24); ctx.lineTo(W, H - 24); ctx.stroke();

    const cx = W / 2;

    // ── Retort stand ──
    // Base
    const baseGrad = ctx.createLinearGradient(cx - 70, H - 24, cx + 70, H - 24);
    baseGrad.addColorStop(0, '#1e293b'); baseGrad.addColorStop(0.5, '#334155'); baseGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = baseGrad;
    ctx.beginPath(); ctx.roundRect(cx - 65, H - 32, 130, 12, 4); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.stroke();
    // Vertical rod
    const rodGrad = ctx.createLinearGradient(cx - 60, 0, cx - 55, 0);
    rodGrad.addColorStop(0, '#1e293b'); rodGrad.addColorStop(0.5, '#64748b'); rodGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = rodGrad;
    ctx.fillRect(cx - 61, 40, 8, H - 64);
    // Clamp ring
    ctx.fillStyle = '#475569';
    ctx.beginPath(); ctx.roundRect(cx - 65, 80, 20, 28, 4); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();

    // ── Burette ──
    const bx = cx, by = 50, bw = 16, bh = 200;
    const liquidLevel = bh * (1 - buretteVol / 50);

    // Glass body (borosilicate look)
    ctx.save();
    // Outer wall
    ctx.strokeStyle = 'rgba(148,163,184,0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx - bw / 2, by); ctx.lineTo(bx - bw / 2, by + bh);
    ctx.moveTo(bx + bw / 2, by); ctx.lineTo(bx + bw / 2, by + bh);
    ctx.stroke();
    // Top cap
    ctx.strokeStyle = 'rgba(148,163,184,0.4)';
    ctx.beginPath(); ctx.moveTo(bx - bw / 2 - 5, by); ctx.lineTo(bx + bw / 2 + 5, by); ctx.stroke();

    // NaOH liquid (violet/purple)
    const liqGrad = ctx.createLinearGradient(bx - bw / 2 + 1, 0, bx + bw / 2 - 1, 0);
    liqGrad.addColorStop(0, 'rgba(109,40,217,0.15)');
    liqGrad.addColorStop(0.5, 'rgba(139,92,246,0.5)');
    liqGrad.addColorStop(1, 'rgba(109,40,217,0.15)');
    ctx.fillStyle = liqGrad;
    ctx.fillRect(bx - bw / 2 + 1, by + liquidLevel, bw - 2, bh - liquidLevel);

    // Meniscus (concave)
    ctx.beginPath();
    ctx.moveTo(bx - bw / 2 + 1, by + liquidLevel);
    ctx.quadraticCurveTo(bx, by + liquidLevel + 4, bx + bw / 2 - 1, by + liquidLevel);
    ctx.fillStyle = 'rgba(167,139,250,0.7)'; ctx.fill();

    // Glass shine
    const shine = ctx.createLinearGradient(bx - bw / 2, 0, bx + bw / 2, 0);
    shine.addColorStop(0, 'rgba(255,255,255,0.0)');
    shine.addColorStop(0.2, 'rgba(255,255,255,0.12)');
    shine.addColorStop(0.4, 'rgba(255,255,255,0.0)');
    ctx.fillStyle = shine;
    ctx.fillRect(bx - bw / 2 + 1, by, bw - 2, bh);
    ctx.restore();

    // Graduation marks on burette
    ctx.fillStyle = '#64748b'; ctx.font = '7px Inter'; ctx.textAlign = 'right';
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 0.8;
    for (let i = 0; i <= 50; i += 5) {
      const y = by + (i / 50) * bh;
      ctx.fillText(`${i}`, bx - bw / 2 - 5, y + 2.5);
      ctx.beginPath(); ctx.moveTo(bx - bw / 2, y); ctx.lineTo(bx - bw / 2 - 4, y); ctx.stroke();
    }
    for (let i = 0; i <= 50; i++) {
      const y = by + (i / 50) * bh;
      ctx.beginPath(); ctx.moveTo(bx - bw / 2, y); ctx.lineTo(bx - bw / 2 - 2, y); ctx.stroke();
    }

    // ── Stopcock ──
    const scY = by + bh + 4;
    const scGrad = ctx.createLinearGradient(bx - 10, scY, bx + 10, scY);
    scGrad.addColorStop(0, '#1e293b'); scGrad.addColorStop(0.5, '#475569'); scGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = scGrad;
    ctx.beginPath(); ctx.roundRect(bx - 10, scY, 20, 14, 3); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();
    // Handle
    if (isDropping || buretteVol > 0) {
      ctx.fillStyle = '#0ea5e9';
      ctx.beginPath(); ctx.roundRect(bx + 8, scY + 2, 18, 8, 3); ctx.fill();
    }
    // Nozzle tip
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx - 2, scY + 14); ctx.lineTo(bx - 2, scY + 28);
    ctx.moveTo(bx + 2, scY + 14); ctx.lineTo(bx + 2, scY + 28);
    ctx.stroke();

    // ── Falling drop animation ──
    if (buretteVol > 0 && buretteVol < 49.5) {
      const nozzleY = scY + 28;
      const flaskTopY = H - 130;
      dropYRef.current = (dropYRef.current + 3) % (flaskTopY - nozzleY);
      const dropY = nozzleY + dropYRef.current;
      // Pendant drop forming at nozzle
      const pendantSize = 2 + (dropYRef.current % 30) * 0.07;
      ctx.shadowBlur = 8; ctx.shadowColor = '#a78bfa';
      ctx.fillStyle = 'rgba(139,92,246,0.9)';
      ctx.beginPath(); ctx.ellipse(bx, nozzleY + pendantSize, pendantSize * 0.7, pendantSize, 0, 0, Math.PI * 2); ctx.fill();
      // Falling drop
      ctx.fillStyle = 'rgba(167,139,250,0.85)';
      ctx.beginPath(); ctx.ellipse(bx, dropY, 2.5, 3.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── Conical (Erlenmeyer) Flask ──
    const fx = cx, fy = H - 30;
    const fTop = fy - 110, fBot = fy;
    const fTopW = 22, fBotW = 72;

    // Flask shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(fx, fBot - 2, fBotW * 0.9, 8, 0, 0, Math.PI * 2); ctx.fill();

    // Flask liquid
    const sol = getSolutionColor();
    ctx.beginPath();
    ctx.moveTo(fx - fBotW, fBot);
    ctx.lineTo(fx - fTopW, fTop + 30);
    ctx.lineTo(fx + fTopW, fTop + 30);
    ctx.lineTo(fx + fBotW, fBot);
    ctx.closePath();
    ctx.fillStyle = `rgba(${sol.r},${sol.g},${sol.b},${sol.a})`; ctx.fill();

    // Flask glass walls
    ctx.beginPath();
    ctx.moveTo(fx - fBotW, fBot);
    ctx.lineTo(fx - fTopW, fTop + 30);
    ctx.lineTo(fx - fTopW, fTop);
    ctx.lineTo(fx + fTopW, fTop);
    ctx.lineTo(fx + fTopW, fTop + 30);
    ctx.lineTo(fx + fBotW, fBot);
    ctx.closePath();
    const flaskGlass = ctx.createLinearGradient(fx - fBotW, 0, fx + fBotW, 0);
    flaskGlass.addColorStop(0, 'rgba(148,163,184,0.15)');
    flaskGlass.addColorStop(0.15, 'rgba(255,255,255,0.08)');
    flaskGlass.addColorStop(0.5, 'rgba(148,163,184,0.03)');
    flaskGlass.addColorStop(0.85, 'rgba(255,255,255,0.08)');
    flaskGlass.addColorStop(1, 'rgba(148,163,184,0.15)');
    ctx.fillStyle = flaskGlass; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.55)'; ctx.lineWidth = 1.8; ctx.stroke();

    // Flask neck (round neck detail)
    ctx.beginPath();
    ctx.roundRect(fx - fTopW, fTop - 18, fTopW * 2, 22, 2);
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(139,92,246,0.04)'; ctx.fill(); ctx.stroke();

    // Flask shine
    ctx.beginPath();
    ctx.moveTo(fx - fBotW + 8, fBot - 8);
    ctx.lineTo(fx - fTopW + 4, fTop + 38);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 3; ctx.stroke();

    // Status label
    const statusY = H - 8;
    ctx.textAlign = 'center';
    if (pastEndpoint) {
      ctx.fillStyle = '#f87171'; ctx.font = 'bold 11px Inter';
      ctx.fillText('⚠ OVER-TITRATED — Permanent pink (excess NaOH)', cx, statusY);
    } else if (atEndpoint) {
      ctx.shadowBlur = 10; ctx.shadowColor = '#10b981';
      ctx.fillStyle = '#10b981'; ctx.font = 'bold 12px Inter';
      ctx.fillText('✓ ENDPOINT — Phenolphthalein turns PINK!', cx, statusY);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#64748b'; ctx.font = '10px Inter';
      ctx.fillText(`Titrating... ${buretteVol.toFixed(1)} mL NaOH added`, cx, statusY);
    }

    animRef.current = requestAnimationFrame(draw);
  }, [buretteVol, atEndpoint, pastEndpoint, isDropping]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  // pH indicator colour for indicator strip
  const phLevel = pastEndpoint ? 11 : atEndpoint ? 8.2 : 7 - (endpoint - buretteVol) * 0.05;
  const phColor = phLevel > 8.5 ? '#ec4899' : phLevel > 7.5 ? '#f9a8d4' : phLevel > 7 ? '#fde68a' : '#6ee7b7';

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f 0%,#080b14 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(139,92,246,0.2)', background: 'rgba(8,11,20,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🧪 Acid-Base Titration — HCl vs NaOH</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Indicator: Phenolphthalein &nbsp;|&nbsp; Endpoint: ~20.5 mL NaOH</p>
        </div>
        <button onClick={() => { setBuretteVol(0); setIsDropping(false); }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
          🔄 Reset
        </button>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} width={480} height={420} className="w-full" style={{ display: 'block' }} />

      {/* Controls */}
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(139,92,246,0.15)', background: 'rgba(6,8,15,0.95)' }}>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs text-slate-400">Burette volume — NaOH added</label>
            <span className="text-xs font-mono text-violet-400">{buretteVol.toFixed(1)} mL</span>
          </div>
          <input type="range" min={0} max={40} step={0.5} value={buretteVol}
            onChange={e => { setBuretteVol(Number(e.target.value)); setIsDropping(true); }}
            onMouseUp={() => setIsDropping(false)}
            className="w-full h-2 rounded-full accent-violet-500" />
          <div className="flex justify-between text-[9px] text-slate-600">
            <span>0 mL</span><span>10</span><span>20</span><span>30</span><span>40 mL</span>
          </div>
        </div>

        {/* Readings strip */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'BURETTE', val: buretteVol.toFixed(1), unit: 'mL', color: '#a78bfa', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)' },
            { label: 'STATUS', val: pastEndpoint ? 'OVER' : atEndpoint ? 'END ✓' : 'TITRATING', unit: '', color: pastEndpoint ? '#f87171' : atEndpoint ? '#10b981' : '#64748b', bg: pastEndpoint ? 'rgba(239,68,68,0.08)' : atEndpoint ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.1)' },
            { label: 'APPROX pH', val: Math.min(12, Math.max(2, phLevel)).toFixed(1), unit: '', color: phColor, bg: 'rgba(0,0,0,0.3)', border: 'rgba(255,255,255,0.08)' },
            { label: 'VOL LEFT', val: (50 - buretteVol).toFixed(1), unit: 'mL', color: '#94a3b8', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-2 text-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
              <div className="text-[8px] font-bold tracking-widest" style={{ color: 'rgba(148,163,184,0.6)' }}>{m.label}</div>
              <div className="text-sm font-bold font-mono mt-0.5" style={{ color: m.color }}>{m.val}</div>
              <div className="text-[8px] text-slate-600">{m.unit}</div>
            </div>
          ))}
        </div>

        {/* Indicator strip visual */}
        <div className="flex items-center gap-3 px-1">
          <span className="text-[9px] text-slate-500">Indicator:</span>
          <div className="flex-1 h-4 rounded-full overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (buretteVol / 40) * 100)}%`, background: `linear-gradient(90deg, rgba(200,220,255,0.3), ${phColor})` }} />
          </div>
          <span className="text-[9px] font-mono" style={{ color: phColor }}>
            {pastEndpoint ? 'Permanent Pink' : atEndpoint ? 'First Pink ✓' : 'Colourless'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TitrationLab;
