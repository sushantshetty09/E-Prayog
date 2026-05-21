import React, { useState, useRef, useEffect, useCallback } from 'react';

const PIGMENTS = [
  { name: 'Carotene',      color: '#f97316', Rf: 0.92, width: 10, desc: 'Most non-polar: travels farthest' },
  { name: 'Xanthophyll',   color: '#eab308', Rf: 0.71, width: 9,  desc: 'Yellow-orange accessory pigment' },
  { name: 'Chlorophyll a', color: '#16a34a', Rf: 0.52, width: 11, desc: 'Primary photosynthetic pigment' },
  { name: 'Chlorophyll b', color: '#4ade80', Rf: 0.36, width: 9,  desc: 'Accessory: most polar, least travel' },
];

const ChromatographyLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [solventPct, setSolventPct] = useState(0); // 0-100
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const dt = lastFrameRef.current ? Math.min(32, ts - lastFrameRef.current) : 16;
    lastFrameRef.current = ts;

    // ── Background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#040509');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Lab bench
    ctx.fillStyle = 'rgba(20,14,6,0.9)'; ctx.fillRect(0, H - 24, W, 24);
    ctx.strokeStyle = 'rgba(80,55,20,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 24); ctx.lineTo(W, H - 24); ctx.stroke();

    const cx = W / 2;
    const paperL = cx - 50, paperW = 100;
    const paperTop = 28, paperBot = H - 50;
    const paperH = paperBot - paperTop;

    // ── Solvent jar ──
    const jarL = paperL - 18, jarW = paperW + 36, jarTop = H - 55, jarBot = H - 28;
    const jarGrad = ctx.createLinearGradient(jarL, 0, jarL + jarW, 0);
    jarGrad.addColorStop(0, 'rgba(255,255,255,0.08)');
    jarGrad.addColorStop(0.15, 'rgba(255,255,255,0.04)');
    jarGrad.addColorStop(0.85, 'rgba(255,255,255,0.04)');
    jarGrad.addColorStop(1, 'rgba(255,255,255,0.08)');
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5;
    ctx.strokeRect(jarL, jarTop, jarW, jarBot - jarTop);
    // Solvent liquid in jar (petroleum ether / acetone blend)
    const solventGrad = ctx.createLinearGradient(jarL, jarTop, jarL + jarW, jarTop);
    solventGrad.addColorStop(0, 'rgba(219,234,254,0.08)');
    solventGrad.addColorStop(0.5, 'rgba(219,234,254,0.18)');
    solventGrad.addColorStop(1, 'rgba(219,234,254,0.08)');
    ctx.fillStyle = solventGrad;
    ctx.fillRect(jarL + 1, jarTop + 4, jarW - 2, jarBot - jarTop - 5);
    ctx.fillStyle = '#93c5fd'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Petroleum ether : Acetone (9:1)', cx, jarBot - 8);

    // ── Chromatography paper ──
    // Paper texture
    ctx.save();
    ctx.beginPath();
    ctx.rect(paperL, paperTop, paperW, paperH);
    ctx.clip();

    // Paper base
    const paperGrad = ctx.createLinearGradient(paperL, paperTop, paperL + paperW, paperTop);
    paperGrad.addColorStop(0, '#fef9ec'); paperGrad.addColorStop(0.5, '#fffdf5');
    paperGrad.addColorStop(1, '#fef9ec');
    ctx.fillStyle = paperGrad; ctx.fillRect(paperL, paperTop, paperW, paperH);

    // Paper fiber texture lines
    ctx.strokeStyle = 'rgba(180,160,100,0.12)'; ctx.lineWidth = 0.5;
    for (let y = paperTop + 8; y < paperBot; y += 6) {
      ctx.beginPath(); ctx.moveTo(paperL, y + Math.sin(y * 0.1) * 1.5); ctx.lineTo(paperL + paperW, y + Math.sin(y * 0.15) * 1.5); ctx.stroke();
    }
    for (let x = paperL + 8; x < paperL + paperW; x += 6) {
      ctx.beginPath(); ctx.moveTo(x, paperTop); ctx.lineTo(x + Math.sin(x * 0.1) * 1.5, paperBot); ctx.stroke();
    }

    // Solvent front (ascending wet zone)
    const originY = paperBot - 16;
    const solventFrontY = originY - (solventPct / 100) * (paperH - 20);
    if (solventPct > 0) {
      const wetGrad = ctx.createLinearGradient(paperL, solventFrontY, paperL, originY);
      wetGrad.addColorStop(0, 'rgba(147,197,253,0.0)');
      wetGrad.addColorStop(0.3, 'rgba(147,197,253,0.12)');
      wetGrad.addColorStop(1, 'rgba(147,197,253,0.22)');
      ctx.fillStyle = wetGrad;
      ctx.fillRect(paperL, solventFrontY, paperW, originY - solventFrontY);
    }

    // Origin spot (initial mixture - dark green blob)
    ctx.save();
    for (let i = 0; i < 4; i++) {
      const spotX = paperL + 20 + i * 16;
      ctx.fillStyle = `rgba(22,101,52,${0.5 - i * 0.05})`;
      ctx.beginPath(); ctx.ellipse(spotX, originY, PIGMENTS[i].width * 0.55, 5, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    // ── Pigment bands ──
    PIGMENTS.forEach((pig, pi) => {
      const travel = solventPct * pig.Rf;
      const bandY = originY - (travel / 100) * (paperH - 20);
      const bandProgress = Math.min(1, solventPct / 8);
      if (solventPct < 3) return;

      // Band smear trail (fades behind)
      const trailGrad = ctx.createLinearGradient(paperL, bandY, paperL, originY);
      trailGrad.addColorStop(0, `${pig.color}00`);
      trailGrad.addColorStop(0.7, `${pig.color}15`);
      trailGrad.addColorStop(1, `${pig.color}08`);
      const bx = paperL + 8 + pi * 22;
      ctx.fillStyle = trailGrad;
      ctx.fillRect(bx - pig.width / 2, bandY, pig.width, originY - bandY);

      // Band itself (elliptical smear)
      ctx.shadowBlur = 6; ctx.shadowColor = pig.color;
      const bandH = 8 + bandProgress * 3;
      const bandAlpha = 0.7 + bandProgress * 0.25;
      const bg2 = ctx.createRadialGradient(bx, bandY, 1, bx, bandY, pig.width);
      bg2.addColorStop(0, pig.color + 'ff'); bg2.addColorStop(0.6, pig.color + 'cc');
      bg2.addColorStop(1, pig.color + '30');
      ctx.fillStyle = bg2;
      ctx.beginPath(); ctx.ellipse(bx, bandY, pig.width, bandH, 0, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;

      // Rf measurement line (only when near complete)
      if (solventPct > 50) {
        ctx.strokeStyle = `rgba(${pi % 2 === 0 ? '100,116,139' : '71,85,105'},0.35)`; ctx.lineWidth = 0.7; ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(paperL + paperW + 4, bandY); ctx.lineTo(paperL + paperW + 25, bandY); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = pig.color; ctx.font = '8px Inter'; ctx.textAlign = 'left';
        ctx.fillText(`Rf=${pig.Rf}`, paperL + paperW + 27, bandY + 3);
      }
    });

    ctx.restore();

    // ── Paper edges / clips ──
    // Paper shadow
    ctx.shadowBlur = 15; ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(200,180,120,0.35)'; ctx.lineWidth = 1.5;
    ctx.strokeRect(paperL, paperTop, paperW, paperH);
    ctx.shadowBlur = 0;
    // Paper top clip (bulldog clip look)
    ctx.fillStyle = '#475569';
    ctx.beginPath(); ctx.roundRect(cx - 12, paperTop - 8, 24, 10, 3); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();
    // Hang string
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, paperTop - 8); ctx.lineTo(cx, paperTop - 18); ctx.stroke();

    // Origin line label
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(paperL - 20, paperBot - 16); ctx.lineTo(paperL, paperBot - 16); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(148,163,184,0.6)'; ctx.font = '8px Inter'; ctx.textAlign = 'right';
    ctx.fillText('Origin', paperL - 22, paperBot - 13);

    // Solvent front line
    if (solventPct > 0) {
      ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(paperL - 10, solventFrontY); ctx.lineTo(paperL + paperW + 8, solventFrontY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#60a5fa'; ctx.font = '8px Inter'; ctx.textAlign = 'right';
      ctx.fillText('Solvent front', paperL - 12, solventFrontY - 3);
    }

    // ── Legend / Rf table ──
    const legX = 18, legY = 60;
    ctx.fillStyle = 'rgba(15,20,40,0.7)';
    ctx.beginPath(); ctx.roundRect(legX - 8, legY - 18, 165, 95, 8); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = 'rgba(148,163,184,0.7)'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'left';
    ctx.fillText('PIGMENTS (Rf values)', legX, legY - 4);
    PIGMENTS.forEach((pig, i) => {
      const ly = legY + 10 + i * 18;
      ctx.shadowBlur = 4; ctx.shadowColor = pig.color;
      ctx.fillStyle = pig.color;
      ctx.beginPath(); ctx.rect(legX, ly - 7, 12, 8); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#e2e8f0'; ctx.font = '9px Inter';
      ctx.fillText(`${pig.name}`, legX + 16, ly);
      if (solventPct > 5) {
        ctx.fillStyle = pig.color; ctx.font = 'bold 9px Inter';
        ctx.fillText(`Rf=${pig.Rf}`, legX + 115, ly);
      }
    });

    // Status
    ctx.font = '10px Inter'; ctx.textAlign = 'center';
    if (solventPct >= 100) {
      ctx.shadowBlur = 8; ctx.shadowColor = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.fillText('✓ Chromatogram complete: pigments separated!', cx, H - 10);
      ctx.shadowBlur = 0;
    } else if (running) {
      ctx.fillStyle = '#60a5fa';
      ctx.fillText(`Solvent ascending... ${solventPct.toFixed(0)}%`, cx, H - 10);
    }

    if (running && solventPct < 100) {
      setSolventPct(p => Math.min(100, p + dt * 0.025));
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [running, solventPct]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🌿 Paper Chromatography: Leaf Pigments</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Rf = distance (solute) ÷ distance (solvent front)</p>
        </div>
        <button onClick={() => { setRunning(false); setSolventPct(0); }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
          🔄 Reset
        </button>
      </div>

      <canvas ref={canvasRef} width={440} height={380} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(34,197,94,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 whitespace-nowrap">Solvent front</span>
          <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-100" style={{ width: `${solventPct}%`, background: 'linear-gradient(90deg,#38bdf8,#60a5fa)' }} />
          </div>
          <span className="text-xs font-mono text-sky-400 w-10 text-right">{solventPct.toFixed(0)}%</span>
        </div>
        <button onClick={() => { if (solventPct >= 100) setSolventPct(0); setRunning(r => !r); }}
          className="w-full py-2 rounded-xl text-sm font-bold"
          style={{ background: running ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.2)', color: running ? '#f87171' : '#4ade80', border: `1px solid ${running ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
          {running ? '⏸ Pause' : solventPct >= 100 ? '🔄 Run Again' : '▶ Run Chromatography'}
        </button>
        <div className="grid grid-cols-4 gap-1.5">
          {PIGMENTS.map(p => (
            <div key={p.name} className="rounded-lg p-2 text-center" style={{ background: p.color + '15', border: `1px solid ${p.color}30` }}>
              <div className="text-[8px] uppercase tracking-widest mb-1" style={{ color: p.color }}>{p.name.replace('Chlorophyll ', 'Chl ')}</div>
              <div className="text-sm font-bold font-mono" style={{ color: p.color }}>Rf={p.Rf}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ChromatographyLab;
