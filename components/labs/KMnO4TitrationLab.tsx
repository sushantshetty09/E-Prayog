import React, { useState, useRef, useEffect, useCallback } from 'react';

const KMnO4TitrationLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [volume, setVolume] = useState(0); // mL of KMnO4 added
  const [running, setRunning] = useState(false);
  const rafRef = useRef(0);
  const lastTRef = useRef(0);

  // Equivalence point: 20 mL KMnO4 (0.02M) ≡ 10 mL FeSO4 (0.1M) 
  const EQ_VOL = 20;
  const isNearEP = volume >= EQ_VOL * 0.95;
  const isPastEP = volume >= EQ_VOL;

  // Flask color: colourless → pink at endpoint (permanganate excess)
  const flaskAlpha = isPastEP ? Math.min(1, (volume - EQ_VOL) / 5) : 0;
  const flaskR = Math.round(255 * flaskAlpha + 220 * (1 - flaskAlpha));
  const flaskG = Math.round(100 * flaskAlpha + 220 * (1 - flaskAlpha));
  const flaskB = Math.round(200 * flaskAlpha + 240 * (1 - flaskAlpha));

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const dt = lastTRef.current ? Math.min(32, ts - lastTRef.current) : 16;
    lastTRef.current = ts;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1a1408'; ctx.fillRect(0, H - 22, W, 22);

    const cx = W / 2;

    // ── Burette ──
    const bTop = 15, bBot = H - 95, bW = 26, bX = cx - 50;
    // Burette body
    const bGrad = ctx.createLinearGradient(bX, 0, bX + bW, 0);
    bGrad.addColorStop(0, 'rgba(255,255,255,0.12)'); bGrad.addColorStop(0.2, 'rgba(255,255,255,0.05)');
    bGrad.addColorStop(0.8, 'rgba(255,255,255,0.04)'); bGrad.addColorStop(1, 'rgba(255,255,255,0.1)');
    ctx.fillStyle = bGrad; ctx.beginPath(); ctx.roundRect(bX, bTop, bW, bBot - bTop, [4, 4, 0, 0]); ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 1.5; ctx.stroke();

    // KMnO4 liquid in burette (purple, consuming from bottom)
    const buretteFill = Math.max(0, (50 - volume) / 50);
    const liquidTop = bTop + 5 + (1 - buretteFill) * (bBot - bTop - 10);
    const liqGrad = ctx.createLinearGradient(bX, liquidTop, bX + bW, bBot);
    liqGrad.addColorStop(0, 'rgba(126,34,206,0.6)'); liqGrad.addColorStop(1, 'rgba(88,28,135,0.9)');
    ctx.fillStyle = liqGrad; ctx.beginPath();
    ctx.roundRect(bX + 2, liquidTop, bW - 4, bBot - liquidTop, [3, 3, 0, 0]); ctx.fill();

    // Burette graduations
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 0.8;
    ctx.fillStyle = 'rgba(148,163,184,0.5)'; ctx.font = '7px Inter'; ctx.textAlign = 'right';
    for (let ml = 0; ml <= 50; ml += 5) {
      const ly = bTop + 5 + (ml / 50) * (bBot - bTop - 10);
      ctx.beginPath(); ctx.moveTo(bX, ly); ctx.lineTo(bX + (ml % 10 === 0 ? 8 : 5), ly); ctx.stroke();
      if (ml % 10 === 0) ctx.fillText(ml.toString(), bX - 3, ly + 3);
    }

    // Burette tip & stopcock
    ctx.fillStyle = '#374151'; ctx.beginPath(); ctx.roundRect(bX + bW / 2 - 3, bBot, 6, 12, [0, 0, 2, 2]); ctx.fill();
    ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1; ctx.stroke();
    // Stopcock handle
    ctx.fillStyle = running ? '#7c3aed' : '#374151';
    ctx.beginPath(); ctx.roundRect(bX + bW - 5, bBot + 3, 16, 6, 2); ctx.fill();

    // Drop falling
    if (running && volume < 50) {
      const dropPhase = (ts * 0.002) % 1;
      const dy = bBot + 12 + dropPhase * 60;
      ctx.shadowBlur = 6; ctx.shadowColor = '#7c3aed';
      ctx.fillStyle = 'rgba(126,34,206,0.85)';
      ctx.beginPath(); ctx.ellipse(bX + bW / 2, dy, 3, 4 + dropPhase * 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Burette label
    ctx.fillStyle = '#6d28d9'; ctx.font = 'bold 8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('KMnO₄', bX + bW / 2, bTop - 3);
    ctx.fillStyle = '#7c3aed'; ctx.font = '8px Inter';
    ctx.fillText(`${(50 - volume).toFixed(1)} mL left`, bX + bW / 2, bBot + 30);

    // ── Conical Flask ──
    const fX = cx + 10, fTop = H - 140, fBot = H - 35;
    const fBotW = 65, fTopW = 22;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(fX - fBotW, fBot);
    ctx.lineTo(fX - fTopW, fTop + 28);
    ctx.lineTo(fX + fTopW, fTop + 28);
    ctx.lineTo(fX + fBotW, fBot);
    ctx.closePath(); ctx.clip();

    // Solution (FeSO4 + H2SO4) → changes from pale yellow to pink at EP
    const solGrad = ctx.createLinearGradient(fX - fBotW, fTop + 28, fX + fBotW, fBot);
    solGrad.addColorStop(0, `rgba(${flaskR},${flaskG},${flaskB},0.35)`);
    solGrad.addColorStop(1, `rgba(${flaskR},${flaskG},${flaskB},0.55)`);
    ctx.fillStyle = solGrad; ctx.fillRect(fX - fBotW, fTop + 28, fBotW * 2, fBot - fTop - 28);

    // Pink swirl when near endpoint
    if (isNearEP) {
      const swirlA = Math.min(0.4, (volume - EQ_VOL * 0.95) / 5 * 0.4);
      ctx.fillStyle = `rgba(219,39,119,${swirlA})`;
      for (let i = 0; i < 3; i++) {
        const sx2 = fX + Math.sin(ts * 0.002 + i * 2.1) * 25;
        const sy = fBot - 20 - Math.cos(ts * 0.002 + i) * 15;
        ctx.beginPath(); ctx.arc(sx2, sy, 12, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();

    // Flask glass
    ctx.beginPath();
    ctx.moveTo(fX - fBotW, fBot);
    ctx.lineTo(fX - fTopW, fTop + 28);
    ctx.lineTo(fX - fTopW, fTop);
    ctx.lineTo(fX + fTopW, fTop);
    ctx.lineTo(fX + fTopW, fTop + 28);
    ctx.lineTo(fX + fBotW, fBot);
    ctx.closePath();
    const gG = ctx.createLinearGradient(fX - fBotW, 0, fX + fBotW, 0);
    gG.addColorStop(0, 'rgba(255,255,255,0.12)'); gG.addColorStop(0.1, 'rgba(255,255,255,0.05)');
    gG.addColorStop(0.9, 'rgba(255,255,255,0.04)'); gG.addColorStop(1, 'rgba(255,255,255,0.12)');
    ctx.fillStyle = gG; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#64748b'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('FeSO₄ + H₂SO₄', fX, fBot + 15);

    // ── Endpoint alert ──
    if (isPastEP) {
      ctx.shadowBlur = 15; ctx.shadowColor = '#db2777';
      ctx.fillStyle = '#db2777'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
      ctx.fillText('🎉 Endpoint reached: Permanent pink!', W / 2, H - 8);
      ctx.shadowBlur = 0;
    } else if (isNearEP) {
      ctx.fillStyle = '#a855f7'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
      ctx.fillText('⚠ Near endpoint: add drop by drop!', W / 2, H - 8);
    } else {
      ctx.fillStyle = '#475569'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`Vol added: ${volume.toFixed(1)} mL  ·  Remaining: ${(EQ_VOL - Math.min(EQ_VOL, volume)).toFixed(1)} mL to EP`, W / 2, H - 8);
    }

    if (running && volume < 50) {
      setVolume(v => Math.min(50, v + dt * (isNearEP ? 0.005 : 0.018)));
      rafRef.current = requestAnimationFrame(draw);
    } else if (!running) {
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [running, volume, isPastEP, isNearEP, EQ_VOL, flaskR, flaskG, flaskB]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(109,40,217,0.3)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🟣 KMnO₄ Titration: Redox</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Permanganate (self-indicator) · MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ · Endpoint = pink</p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded-lg font-bold" style={{ background: isPastEP ? 'rgba(219,39,119,0.2)' : 'rgba(109,40,217,0.15)', color: isPastEP ? '#f472b6' : '#a855f7', border: '1px solid rgba(109,40,217,0.3)' }}>
          {volume.toFixed(1)} mL
        </div>
      </div>
      <canvas ref={canvasRef} width={400} height={310} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(109,40,217,0.15)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 whitespace-nowrap">Volume added</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full transition-all duration-200" style={{ width: `${(volume / 50) * 100}%`, background: isPastEP ? 'linear-gradient(90deg,#7c3aed,#db2777)' : 'linear-gradient(90deg,#7c3aed,#a855f7)' }} />
          </div>
          <div className="h-1 w-0.5 self-stretch" style={{ marginLeft: `${(EQ_VOL / 50) * 100 - 1}%`, background: '#10b981', boxShadow: '0 0 4px #10b981', position: 'relative', right: 0 }} />
          <span className="text-xs font-mono text-violet-400 w-12 text-right">{volume.toFixed(1)} mL</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRunning(r => !r)} disabled={isPastEP}
            className="flex-1 py-2 rounded-xl text-sm font-bold"
            style={{ background: running ? 'rgba(239,68,68,0.15)' : 'rgba(109,40,217,0.2)', color: running ? '#f87171' : '#a855f7', border: `1px solid ${running ? 'rgba(239,68,68,0.3)' : 'rgba(109,40,217,0.3)'}`, opacity: isPastEP ? 0.5 : 1 }}>
            {isPastEP ? '✓ EP reached' : running ? '⏸ Stop drip' : '▶ Open Stopcock'}
          </button>
          <button onClick={() => { setVolume(0); setRunning(false); lastTRef.current = 0; }}
            className="px-4 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>🔄</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'KMnO₄ added', val: `${volume.toFixed(2)} mL`, color: '#a855f7' },
            { label: 'Endpoint Vol.', val: `${EQ_VOL} mL`, color: '#10b981' },
            { label: 'Status', val: isPastEP ? 'EP Reached' : isNearEP ? 'Near EP' : 'Titrating', color: isPastEP ? '#f472b6' : isNearEP ? '#f59e0b' : '#64748b' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[7px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-xs font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default KMnO4TitrationLab;
