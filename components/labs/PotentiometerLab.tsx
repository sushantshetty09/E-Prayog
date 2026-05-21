import React, { useState, useRef, useEffect, useCallback } from 'react';

const PotentiometerLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [l1, setL1] = useState(45); // balance length for cell 1
  const [l2, setL2] = useState(62); // balance length for cell 2
  const [driverEMF, setDriverEMF] = useState(4.0); // driver cell EMF (V)
  const [showBoth, setShowBoth] = useState(true);
  const rafRef = useRef(0);

  const potLength = 100; // 1 metre = 100 cm
  const potentialGradient = driverEMF / potLength; // V/cm
  const emf1 = parseFloat((potentialGradient * l1).toFixed(3));
  const emf2 = parseFloat((potentialGradient * l2).toFixed(3));
  const ratio = parseFloat((l1 / l2).toFixed(3));

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const bench = ctx.createLinearGradient(0, H - 20, 0, H);
    bench.addColorStop(0, '#1a1008'); bench.addColorStop(1, '#0d0804');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 20, W, 20);

    const wireLeft = 55, wireRight = W - 55, wireY = 130;
    const wireLen = wireRight - wireLeft;

    // ── Potentiometer board ──
    const boardGrad = ctx.createLinearGradient(wireLeft - 20, wireY - 15, wireLeft - 20, wireY + 45);
    boardGrad.addColorStop(0, '#4a2e0a'); boardGrad.addColorStop(1, '#2d1a05');
    ctx.fillStyle = boardGrad;
    ctx.beginPath(); ctx.roundRect(wireLeft - 20, wireY - 15, wireLen + 40, 60, 6); ctx.fill();
    ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.5; ctx.stroke();

    // Board texture
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 0.8;
    for (let i = 0; i < 15; i++) {
      const gx = wireLeft - 15 + i * (wireLen + 30) / 14;
      ctx.beginPath(); ctx.moveTo(gx, wireY - 15); ctx.lineTo(gx + 2, wireY + 45); ctx.stroke();
    }

    // ── Resistance wire ──
    const wireGrad2 = ctx.createLinearGradient(wireLeft, wireY + 8, wireRight, wireY + 8);
    wireGrad2.addColorStop(0, '#d97706'); wireGrad2.addColorStop(0.5, '#fbbf24'); wireGrad2.addColorStop(1, '#d97706');
    ctx.strokeStyle = wireGrad2; ctx.lineWidth = 3.5;
    ctx.shadowBlur = 4; ctx.shadowColor = 'rgba(251,191,36,0.3)';
    ctx.beginPath(); ctx.moveTo(wireLeft, wireY + 8); ctx.lineTo(wireRight, wireY + 8); ctx.stroke();
    ctx.shadowBlur = 0;

    // Ruler below wire
    ctx.strokeStyle = 'rgba(180,140,60,0.4)'; ctx.lineWidth = 0.8;
    ctx.fillStyle = 'rgba(180,140,60,0.6)'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
    for (let cm = 0; cm <= 100; cm += 10) {
      const rx = wireLeft + (cm / 100) * wireLen;
      ctx.beginPath(); ctx.moveTo(rx, wireY + 12); ctx.lineTo(rx, wireY + (cm % 50 === 0 ? 20 : 16)); ctx.stroke();
      if (cm % 10 === 0) ctx.fillText(cm.toString(), rx, wireY + 28);
    }
    ctx.fillStyle = 'rgba(160,120,50,0.5)'; ctx.font = '8px Inter';
    ctx.fillText('cm', wireRight + 15, wireY + 28);

    // ── End terminals ──
    [wireLeft, wireRight].forEach((tx, ti) => {
      const tg = ctx.createRadialGradient(tx, wireY + 8, 2, tx, wireY + 8, 10);
      tg.addColorStop(0, '#94a3b8'); tg.addColorStop(1, '#334155');
      ctx.fillStyle = tg; ctx.beginPath(); ctx.arc(tx, wireY + 8, 9, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(ti === 0 ? 'A' : 'B', tx, wireY + 12);
    });

    // ── Driver cell (top) ──
    const drvX = W / 2, drvY = 38;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.roundRect(drvX - 40, drvY - 12, 80, 24, 6); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke();
    // Battery plates
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = i % 2 === 0 ? '#ef4444' : '#475569';
      ctx.lineWidth = i % 2 === 0 ? 3 : 2;
      ctx.beginPath(); ctx.moveTo(drvX - 30 + i * 20, drvY - 6); ctx.lineTo(drvX - 30 + i * 20, drvY + 6); ctx.stroke();
    }
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`Driver E = ${driverEMF}V`, drvX, drvY + 22);
    // Wire to both ends
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(drvX - 40, drvY); ctx.lineTo(wireLeft, drvY); ctx.lineTo(wireLeft, wireY + 8); ctx.stroke();
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath(); ctx.moveTo(drvX + 40, drvY); ctx.lineTo(wireRight, drvY); ctx.lineTo(wireRight, wireY + 8); ctx.stroke();

    // ── Jockey 1 (amber) ──
    const j1x = wireLeft + (l1 / 100) * wireLen;
    const jGrad1 = ctx.createLinearGradient(j1x - 7, wireY - 28, j1x + 7, wireY + 8);
    jGrad1.addColorStop(0, '#78350f'); jGrad1.addColorStop(1, '#451a03');
    ctx.fillStyle = jGrad1;
    ctx.beginPath(); ctx.roundRect(j1x - 6, wireY - 28, 12, 28, 3); ctx.fill();
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; ctx.stroke();
    ctx.shadowBlur = 8; ctx.shadowColor = '#f59e0b';
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(j1x, wireY + 8, 5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`l₁=${l1}cm`, j1x, wireY - 34);

    // Jockey 2 (cyan)
    if (showBoth) {
      const j2x = wireLeft + (l2 / 100) * wireLen;
      const jGrad2 = ctx.createLinearGradient(j2x - 7, wireY - 28, j2x + 7, wireY + 8);
      jGrad2.addColorStop(0, '#164e63'); jGrad2.addColorStop(1, '#083344');
      ctx.fillStyle = jGrad2;
      ctx.beginPath(); ctx.roundRect(j2x - 6, wireY + 8, 12, 28, 3); ctx.fill();
      ctx.strokeStyle = '#0e7490'; ctx.lineWidth = 1; ctx.stroke();
      ctx.shadowBlur = 8; ctx.shadowColor = '#38bdf8';
      ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.arc(j2x, wireY + 8, 5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`l₂=${l2}cm`, j2x, wireY + 50);

      // Cell 2 wire
      ctx.strokeStyle = 'rgba(56,189,248,0.5)'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(j2x, wireY + 36); ctx.lineTo(j2x, wireY + 80); ctx.lineTo(wireLeft - 15, wireY + 80);
      ctx.stroke(); ctx.setLineDash([]);
      // Cell 2 symbol
      ctx.fillStyle = 'rgba(56,189,248,0.15)';
      ctx.beginPath(); ctx.roundRect(wireLeft - 15, wireY + 80, 55, 28, 5); ctx.fill();
      ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`E₂ = ${emf2}V`, wireLeft + 12, wireY + 98);
    }

    // Cell 1 wire
    ctx.strokeStyle = 'rgba(251,191,36,0.5)'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(j1x, wireY - 28); ctx.lineTo(j1x, wireY - 75); ctx.lineTo(wireLeft - 15, wireY - 75);
    ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(251,191,36,0.15)';
    ctx.beginPath(); ctx.roundRect(wireLeft - 15, wireY - 100, 55, 28, 5); ctx.fill();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`E₁ = ${emf1}V`, wireLeft + 12, wireY - 82);

    // ── Results banner ──
    const resY = H - 45;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(20, resY, W - 40, 30, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`φ = ${potentialGradient.toFixed(4)} V/cm  ·  E₁ = φ·l₁ = ${emf1}V  ·  E₂ = φ·l₂ = ${emf2}V  ·  E₁/E₂ = l₁/l₂ = ${ratio}`, W / 2, resY + 19);

    rafRef.current = requestAnimationFrame(draw);
  }, [l1, l2, driverEMF, showBoth, emf1, emf2, ratio, potentialGradient]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔋 Potentiometer — EMF Comparison</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">E₁/E₂ = l₁/l₂ · Potential gradient φ = E_driver/L</p>
        </div>
        <button onClick={() => setShowBoth(b => !b)}
          className="px-3 py-1 rounded-lg text-xs font-bold"
          style={{ background: 'rgba(56,189,248,0.12)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)' }}>
          {showBoth ? 'Hide E₂' : 'Show E₂'}
        </button>
      </div>

      <canvas ref={canvasRef} width={520} height={310} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(251,191,36,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-amber-400 uppercase tracking-widest">l₁ (cm)</label>
            <input type="range" min={5} max={95} step={1} value={l1} onChange={e => setL1(Number(e.target.value))} className="h-1.5 rounded-full accent-amber-400" />
            <span className="text-xs font-mono text-amber-400">{l1} cm → E₁={emf1}V</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-sky-400 uppercase tracking-widest">l₂ (cm)</label>
            <input type="range" min={5} max={95} step={1} value={l2} onChange={e => setL2(Number(e.target.value))} className="h-1.5 rounded-full accent-sky-400" />
            <span className="text-xs font-mono text-sky-400">{l2} cm → E₂={emf2}V</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-blue-400 uppercase tracking-widest">Driver EMF (V)</label>
            <input type="range" min={2} max={6} step={0.1} value={driverEMF} onChange={e => setDriverEMF(Number(e.target.value))} className="h-1.5 rounded-full accent-blue-400" />
            <span className="text-xs font-mono text-blue-400">{driverEMF.toFixed(1)} V</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'E₁/E₂ = l₁/l₂', val: ratio.toString(), color: '#fbbf24' },
            { label: 'E₁', val: `${emf1} V`, color: '#fbbf24' },
            { label: 'E₂', val: `${emf2} V`, color: '#38bdf8' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[8px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PotentiometerLab;
