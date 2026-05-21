import React, { useState, useRef, useEffect, useCallback } from 'react';

const STAGES = [
  { day: 0,  label: 'Dry Seed',      desc: 'Dormant seed with embryo and endosperm enclosed in seed coat.' },
  { day: 2,  label: 'Imbibition',    desc: 'Seed absorbs water. Testa swells. Enzymes activate.' },
  { day: 4,  label: 'Radicle Emerges', desc: 'Primary root (radicle) breaks through testa. Geotropism pulls it down.' },
  { day: 6,  label: 'Hypocotyl',     desc: 'Hypocotyl arch pushes through soil. Cotyledons still underground.' },
  { day: 9,  label: 'Seedling',      desc: 'Cotyledons emerge, unfold, turn green. First true leaves visible.' },
  { day: 12, label: 'Young Plant',   desc: 'Primary root system established. Stem elongating. Photosynthesis begins.' },
];

const SeedGerminationLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [day, setDay] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => setDay(d => { if (d >= 12) { setAutoPlay(false); return 12; } return d + 1; }), 800);
    return () => clearInterval(id);
  }, [autoPlay]);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    tRef.current = ts * 0.001;
    const t = tRef.current;

    // ── Background sky ──
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
    const skyAlpha = Math.min(1, day / 8);
    skyGrad.addColorStop(0, `rgba(30,50,100,${0.5 + skyAlpha * 0.3})`);
    skyGrad.addColorStop(0.5, `rgba(10,20,40,0.9)`);
    skyGrad.addColorStop(1, `rgba(5,8,15,1)`);
    ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, H);

    // Stars (early days)
    if (day < 5) {
      ctx.fillStyle = `rgba(255,255,255,${(1 - day / 6) * 0.4})`;
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 137 + 50) % W), sy = 10 + (i * 71 % 80);
        const pulse = Math.sin(t * 2 + i) * 0.3;
        ctx.globalAlpha = 0.2 + pulse;
        ctx.beginPath(); ctx.arc(sx, sy, 0.8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Sun (appears as plant grows)
    if (day >= 6) {
      const sunAlpha = Math.min(1, (day - 6) / 4);
      ctx.shadowBlur = 30; ctx.shadowColor = `rgba(251,191,36,${sunAlpha})`;
      const sunGrad = ctx.createRadialGradient(W - 60, 40, 5, W - 60, 40, 40);
      sunGrad.addColorStop(0, `rgba(255,236,153,${sunAlpha})`);
      sunGrad.addColorStop(0.6, `rgba(251,191,36,${sunAlpha * 0.6})`);
      sunGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGrad; ctx.beginPath(); ctx.arc(W - 60, 40, 40, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // Light rays
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2 + t * 0.1;
        ctx.strokeStyle = `rgba(251,191,36,${sunAlpha * 0.15})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(W - 60 + Math.cos(ang) * 28, 40 + Math.sin(ang) * 28);
        ctx.lineTo(W - 60 + Math.cos(ang) * 55, 40 + Math.sin(ang) * 55); ctx.stroke();
      }
    }

    const cx = W / 2, soilY = H - 65;

    // ── Soil layer ──
    const soilGrad = ctx.createLinearGradient(0, soilY, 0, H);
    soilGrad.addColorStop(0, '#3d2008'); soilGrad.addColorStop(0.3, '#2d1505'); soilGrad.addColorStop(1, '#1a0c03');
    ctx.fillStyle = soilGrad; ctx.fillRect(0, soilY, W, H - soilY);
    // Soil surface texture
    ctx.strokeStyle = 'rgba(80,50,20,0.5)'; ctx.lineWidth = 0.8;
    for (let i = 0; i < 20; i++) {
      const sx = 10 + i * (W - 20) / 19;
      ctx.beginPath(); ctx.moveTo(sx, soilY); ctx.lineTo(sx + 5, soilY + 3); ctx.stroke();
    }
    // Soil particles
    ctx.fillStyle = 'rgba(100,60,20,0.35)';
    for (let i = 0; i < 30; i++) {
      const px = (i * 173 + 20) % W, py = soilY + 5 + (i * 67 % 50);
      ctx.beginPath(); ctx.ellipse(px, py, 2 + i % 3, 1, i * 0.3, 0, Math.PI * 2); ctx.fill();
    }

    // ── Water droplets (days 1-2) ──
    if (day >= 1 && day <= 3) {
      const wAlpha = Math.min(1, day) * 0.7;
      [cx - 40, cx + 40].forEach(wx => {
        ctx.fillStyle = `rgba(56,189,248,${wAlpha})`;
        ctx.shadowBlur = 6; ctx.shadowColor = '#38bdf8';
        ctx.beginPath(); ctx.arc(wx, soilY + 8, 4, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        // Drop trail
        ctx.strokeStyle = `rgba(56,189,248,${wAlpha * 0.5})`; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(wx, soilY - 10); ctx.lineTo(wx, soilY + 5); ctx.stroke();
      });
    }

    // ── Seed underground ──
    if (day <= 3) {
      const seedSize = 14 + Math.min(day, 2) * 4; // swells with water
      const seedGrad = ctx.createRadialGradient(cx, soilY + 30, 3, cx, soilY + 30, seedSize);
      seedGrad.addColorStop(0, '#d4a028'); seedGrad.addColorStop(0.6, '#a0721a'); seedGrad.addColorStop(1, '#6b4c10');
      ctx.fillStyle = seedGrad;
      ctx.beginPath(); ctx.ellipse(cx, soilY + 30, seedSize, seedSize * 0.75, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#8b5e1a'; ctx.lineWidth = 1; ctx.stroke();
      // Seed coat line
      ctx.strokeStyle = 'rgba(180,130,50,0.5)'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(cx - seedSize, soilY + 30); ctx.lineTo(cx + seedSize, soilY + 30); ctx.stroke();
      if (day === 2) {
        ctx.fillStyle = '#fbbf24'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
        ctx.fillText('Swelling...', cx, soilY + 50);
      }
    }

    // ── Radicle (days 3+) ──
    if (day >= 3) {
      const radicleLen = Math.min(50, (day - 3) * 14);
      ctx.strokeStyle = '#d4a028'; ctx.lineWidth = 2.5;
      ctx.shadowBlur = 4; ctx.shadowColor = '#a0721a';
      ctx.beginPath(); ctx.moveTo(cx, soilY + 20); ctx.lineTo(cx, soilY + 20 + radicleLen); ctx.stroke();
      ctx.shadowBlur = 0;
      // Root hairs
      if (radicleLen > 20) {
        ctx.strokeStyle = 'rgba(212,160,40,0.4)'; ctx.lineWidth = 0.8;
        for (let i = 0; i < 6; i++) {
          const ry = soilY + 28 + i * 6;
          const side = i % 2 === 0 ? 1 : -1;
          ctx.beginPath(); ctx.moveTo(cx, ry); ctx.lineTo(cx + side * 10, ry + 3); ctx.stroke();
        }
      }
    }

    // ── Shoot/hypocotyl (days 4+) ──
    if (day >= 4) {
      const shootLen = Math.min(soilY - 30, (day - 4) * 22);
      // Hypocotyl arch
      if (day <= 6) {
        ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 3;
        ctx.shadowBlur = 6; ctx.shadowColor = '#4d7c0f';
        ctx.beginPath();
        ctx.moveTo(cx, soilY);
        ctx.bezierCurveTo(cx + 25 * (1 - (day - 4) / 3), soilY - shootLen * 0.4, cx + 10 * (1 - (day - 4) / 3), soilY - shootLen * 0.7, cx, soilY - shootLen);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        // Straight stem
        ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 3.5;
        ctx.shadowBlur = 6; ctx.shadowColor = '#4d7c0f';
        ctx.beginPath(); ctx.moveTo(cx, soilY); ctx.lineTo(cx, soilY - shootLen); ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Cotyledons (day 5+)
      if (day >= 5) {
        const cotAlpha = Math.min(1, (day - 5) * 0.8);
        const cotOpen = Math.min(1, (day - 5) * 0.6);
        const stemTip = soilY - shootLen;
        ctx.shadowBlur = 8; ctx.shadowColor = `rgba(101,163,13,${cotAlpha})`;
        // Left cotyledon
        ctx.fillStyle = `rgba(101,163,13,${cotAlpha * 0.9})`;
        ctx.beginPath();
        ctx.ellipse(cx - 20 * cotOpen, stemTip - 5, 22 * cotOpen, 10, -0.4 - cotOpen * 0.3, 0, Math.PI * 2); ctx.fill();
        // Right cotyledon
        ctx.beginPath();
        ctx.ellipse(cx + 20 * cotOpen, stemTip - 5, 22 * cotOpen, 10, 0.4 + cotOpen * 0.3, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        // Midribs
        ctx.strokeStyle = 'rgba(34,197,94,0.5)'; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(cx, stemTip); ctx.lineTo(cx - 20 * cotOpen, stemTip - 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, stemTip); ctx.lineTo(cx + 20 * cotOpen, stemTip - 5); ctx.stroke();
      }

      // First true leaves (day 9+)
      if (day >= 9) {
        const leafAlpha = Math.min(1, (day - 9) * 0.5);
        const stemTip = soilY - shootLen;
        ctx.shadowBlur = 6; ctx.shadowColor = `rgba(34,197,94,${leafAlpha})`;
        ctx.fillStyle = `rgba(34,197,94,${leafAlpha * 0.85})`;
        [[cx - 18, stemTip - 22, -0.5], [cx + 18, stemTip - 22, 0.5]].forEach(([lx, ly, rot]) => {
          ctx.save(); ctx.translate(lx as number, ly as number); ctx.rotate(rot as number);
          ctx.beginPath(); ctx.ellipse(0, 0, 16, 8, 0, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
        ctx.shadowBlur = 0;
      }
    }

    // ── Timeline strip (bottom) ──
    const tlY = H - 18, tlLeft = 20, tlRight = W - 20;
    ctx.strokeStyle = 'rgba(71,85,105,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(tlLeft, tlY); ctx.lineTo(tlRight, tlY); ctx.stroke();
    const maxDay = 12;
    for (let d = 0; d <= maxDay; d += 2) {
      const dx = tlLeft + (d / maxDay) * (tlRight - tlLeft);
      ctx.strokeStyle = 'rgba(71,85,105,0.4)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(dx, tlY - 4); ctx.lineTo(dx, tlY + 4); ctx.stroke();
      ctx.fillStyle = 'rgba(100,116,139,0.7)'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`d${d}`, dx, tlY + 12);
    }
    const px = tlLeft + (day / maxDay) * (tlRight - tlLeft);
    ctx.shadowBlur = 8; ctx.shadowColor = '#10b981';
    ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(px, tlY, 5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    rafRef.current = requestAnimationFrame(draw);
  }, [day]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const currentStage = STAGES.reduce((best, s) => day >= s.day ? s : best, STAGES[0]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🌱 Seed Germination: Time-Lapse</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Imbibition → radicle → hypocotyl → cotyledons → true leaves</p>
        </div>
        <button onClick={() => setAutoPlay(a => !a)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: autoPlay ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', color: autoPlay ? '#f87171' : '#4ade80', border: `1px solid ${autoPlay ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
          {autoPlay ? '⏸ Pause' : '▶ Time-Lapse'}
        </button>
      </div>

      <canvas ref={canvasRef} width={440} height={340} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(34,197,94,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">Day</span>
          <input id="germination-day-slider" type="range" min={0} max={12} step={1} value={day} onChange={e => { setDay(Number(e.target.value)); setAutoPlay(false); }}
            className="flex-1 h-1.5 rounded-full accent-emerald-400" />
          <span className="text-xs font-mono text-emerald-400 w-14 text-right">Day {day}</span>
        </div>
        <div className="rounded-xl p-3 text-[10px] text-zinc-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <span className="font-bold text-emerald-400">{currentStage.label}: </span>{currentStage.desc}
        </div>
        <div className="flex gap-1">
          {STAGES.map((s) => (
            <button key={s.label} onClick={() => { setDay(s.day); setAutoPlay(false); }}
              className="flex-1 py-1.5 rounded-lg text-[8px] font-bold"
              style={{ background: day >= s.day ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)', color: day >= s.day ? '#4ade80' : '#374151', border: `1px solid ${day >= s.day ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
              d{s.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SeedGerminationLab;
