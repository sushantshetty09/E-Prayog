import React, { useState, useRef, useEffect, useCallback } from 'react';

const LIGHT_LEVELS = [
  { label: 'Dark (Night)', lux: 0,    opening: 0,    desc: 'Stomata close in darkness. Guard cells lose K⁺ and water, become flaccid.' },
  { label: 'Dim Light',    lux: 500,  opening: 0.25, desc: 'Slight opening. CO₂ level causes partial opening for gas exchange.' },
  { label: 'Moderate',     lux: 2000, opening: 0.6,  desc: 'Guard cells accumulate K⁺, become turgid. Stomatal pore widens.' },
  { label: 'Full Sun',     lux: 8000, opening: 1.0,  desc: 'Maximum aperture. Active photosynthesis drives complete stomatal opening.' },
];

const StomataLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightIdx, setLightIdx] = useState(0);
  const [animOpening, setAnimOpening] = useState(0);
  const targetRef = useRef(0);
  const animRef2 = useRef(0);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    targetRef.current = LIGHT_LEVELS[lightIdx].opening;
    animRef2.current = 0;
  }, [lightIdx]);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    tRef.current = ts * 0.001;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Animate opening toward target
    const diff = targetRef.current - animRef2.current;
    if (Math.abs(diff) > 0.005) animRef2.current += diff * 0.04;
    else animRef2.current = targetRef.current;
    const op = animRef2.current;
    setAnimOpening(op);

    const cx = W / 2, cy = H / 2 + 10;
    const lvl = LIGHT_LEVELS[lightIdx];

    // ── Leaf epidermis background ──
    const epidGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 200);
    epidGrad.addColorStop(0, 'rgba(21,128,61,0.35)');
    epidGrad.addColorStop(0.5, 'rgba(22,101,52,0.25)');
    epidGrad.addColorStop(1, 'rgba(5,46,22,0.15)');
    ctx.fillStyle = epidGrad; ctx.fillRect(0, 0, W, H);

    // Cell wall pattern (epidermal cells around stomata)
    ctx.strokeStyle = 'rgba(34,197,94,0.15)'; ctx.lineWidth = 1;
    const cells = [[-120, -80], [100, -90], [-130, 50], [110, 60], [-40, -120], [50, 130], [-100, 130], [120, -30]];
    cells.forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.ellipse(cx + dx, cy + dy, 45 + Math.random() * 15, 30 + Math.random() * 10, dx * 0.01, 0, Math.PI * 2);
      ctx.stroke();
    });

    // ── Subsidiary cells (flanking) ──
    const subColor = 'rgba(21,128,61,0.4)';
    ctx.fillStyle = subColor;
    ctx.beginPath(); ctx.ellipse(cx - 70, cy, 50, 35, -0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + 70, cy, 50, 35, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(34,197,94,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(cx - 70, cy, 50, 35, -0.2, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx + 70, cy, 50, 35, 0.2, 0, Math.PI * 2); ctx.stroke();

    // ── Guard cells (kidney-shaped pair) ──
    const gcW = 38 + op * 8, gcH = 72, gcSep = 28 + op * 12;

    for (const side of [-1, 1]) {
      const gx = cx + side * gcSep / 2;
      // Guard cell body gradient
      const turgidity = 0.3 + op * 0.7;
      const gcGrad = ctx.createRadialGradient(gx + side * 8, cy - 10, 5, gx, cy, gcW);
      gcGrad.addColorStop(0, `rgba(74,222,128,${turgidity * 0.95})`);
      gcGrad.addColorStop(0.4, `rgba(22,163,74,${turgidity * 0.8})`);
      gcGrad.addColorStop(1, `rgba(21,128,61,${turgidity * 0.6})`);
      ctx.fillStyle = gcGrad;
      ctx.shadowBlur = 12; ctx.shadowColor = `rgba(34,197,94,${turgidity * 0.5})`;
      ctx.beginPath();
      // Kidney shape
      ctx.save(); ctx.translate(gx, cy); ctx.rotate(side * (0.15 + op * 0.1));
      ctx.ellipse(0, 0, gcW * 0.55, gcH * 0.55, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;

      // Cell wall (thickened inner wall)
      ctx.save(); ctx.translate(gx, cy); ctx.rotate(side * (0.15 + op * 0.1));
      ctx.strokeStyle = `rgba(21,128,61,0.7)`; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.ellipse(0, 0, gcW * 0.55, gcH * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
      // Thickened inner wall (toward pore)
      ctx.strokeStyle = `rgba(6,95,70,0.85)`; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.ellipse(-side * 5, 0, gcW * 0.3, gcH * 0.48, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();

      // Chloroplasts inside guard cells
      if (op > 0.1) {
        for (let ci2 = 0; ci2 < 5; ci2++) {
          const ang = (ci2 / 5) * Math.PI * 2;
          const cr = 14 + op * 5;
          const cpx = gx + side * Math.cos(ang) * cr * 0.3;
          const cpy = cy + Math.sin(ang) * cr * 0.7;
          ctx.shadowBlur = 4; ctx.shadowColor = '#4ade80';
          ctx.fillStyle = `rgba(74,222,128,${0.4 + op * 0.4})`;
          ctx.beginPath(); ctx.ellipse(cpx, cpy, 6, 3.5, ang, 0, Math.PI * 2); ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    }

    // ── Stomatal pore ──
    const poreH = op * 55, poreW = op * 22;
    if (poreH > 1) {
      ctx.shadowBlur = 15; ctx.shadowColor = 'rgba(0,0,0,0.8)';
      const poreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, poreH);
      poreGrad.addColorStop(0, 'rgba(0,0,0,0.95)'); poreGrad.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = poreGrad;
      ctx.beginPath(); ctx.ellipse(cx, cy, poreW, poreH * 0.5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── CO₂ / O₂ / H₂O molecules ──
    if (op > 0.15) {
      const molAlpha = (op - 0.15) / 0.85;
      const timeS = tRef.current;
      // Gas molecules flowing through pore
      const mols = [
        { label: 'CO₂', color: '#fbbf24', angle: Math.PI * 1.8 + Math.sin(timeS * 0.8) * 0.3, r: 60 + Math.sin(timeS * 1.2) * 15 },
        { label: 'O₂', color: '#6ee7b7', angle: Math.PI * 0.2 + Math.cos(timeS * 0.7) * 0.3, r: 55 + Math.cos(timeS) * 12 },
        { label: 'H₂O', color: '#93c5fd', angle: Math.PI * 1.5 + Math.sin(timeS * 0.5) * 0.5, r: 75 + Math.sin(timeS * 0.9) * 18 },
      ];
      mols.forEach(m => {
        const mx = cx + Math.cos(m.angle) * m.r;
        const my = cy + Math.sin(m.angle) * m.r * 0.35;
        ctx.shadowBlur = 6; ctx.shadowColor = m.color;
        ctx.fillStyle = `rgba(${parseInt(m.color.slice(1, 3), 16)},${parseInt(m.color.slice(3, 5), 16)},${parseInt(m.color.slice(5, 7), 16)},${molAlpha * 0.8})`;
        ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255,255,255,${molAlpha * 0.7})`; ctx.font = 'bold 7px Inter'; ctx.textAlign = 'center';
        ctx.fillText(m.label, mx, my + 3);
      });
    }

    // ── Light source rays ──
    if (lvl.lux > 0) {
      const numRays = Math.ceil(lvl.lux / 2000) * 3;
      const rayAlpha = (lvl.lux / 8000) * 0.2;
      ctx.strokeStyle = `rgba(251,191,36,${rayAlpha})`; ctx.lineWidth = 1;
      for (let ri = 0; ri < numRays; ri++) {
        const ang = (ri / numRays) * Math.PI - Math.PI / 2;
        const rx = cx + Math.cos(ang) * 30;
        const ry = cy - 200 + Math.sin(ang) * 10;
        ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + Math.cos(ang + Math.PI / 2) * 180, ry + 200); ctx.stroke();
      }
    }

    // ── Pore aperture label ──
    const aperture = (op * 12).toFixed(1);
    ctx.shadowBlur = op > 0.1 ? 6 : 0; ctx.shadowColor = '#4ade80';
    ctx.fillStyle = op > 0.1 ? '#4ade80' : '#475569'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`Aperture: ${aperture} µm × ${(op * 5).toFixed(1)} µm`, cx, H - 12);
    ctx.shadowBlur = 0;

    rafRef.current = requestAnimationFrame(draw);
  }, [lightIdx]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const lvl = LIGHT_LEVELS[lightIdx];

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🌿 Stomata — Guard Cell Mechanism</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Light → K⁺ influx → turgid guard cells → stomatal opening</p>
        </div>
        <div className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: lvl.lux > 0 ? 'rgba(251,191,36,0.15)' : 'rgba(30,41,59,0.5)', color: lvl.lux > 0 ? '#fbbf24' : '#475569', border: `1px solid ${lvl.lux > 0 ? 'rgba(251,191,36,0.3)' : 'rgba(71,85,105,0.3)'}` }}>
          {lvl.lux} lux
        </div>
      </div>
      <canvas ref={canvasRef} width={440} height={320} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(34,197,94,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="grid grid-cols-4 gap-1.5">
          {LIGHT_LEVELS.map((l, i) => (
            <button key={i} onClick={() => setLightIdx(i)}
              className="py-2 rounded-xl text-[9px] font-bold"
              style={{ background: i === lightIdx ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.04)', color: i === lightIdx ? '#fbbf24' : '#475569', border: `1px solid ${i === lightIdx ? 'rgba(251,191,36,0.35)' : 'rgba(255,255,255,0.07)'}` }}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-zinc-400 whitespace-nowrap">Opening</label>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${animOpening * 100}%`, background: 'linear-gradient(90deg,#22c55e,#4ade80)' }} />
          </div>
          <span className="text-xs font-mono text-emerald-400 w-10 text-right">{(animOpening * 100).toFixed(0)}%</span>
        </div>
        <div className="rounded-xl p-3 text-[10px] text-zinc-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <span className="font-bold text-emerald-400">{lvl.label}: </span>{lvl.desc}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Light', val: `${lvl.lux} lux`, color: lvl.lux > 0 ? '#fbbf24' : '#475569' },
            { label: 'Guard cell', val: animOpening > 0.5 ? 'Turgid' : 'Flaccid', color: animOpening > 0.5 ? '#4ade80' : '#64748b' },
            { label: 'K⁺ flux', val: animOpening > 0.1 ? '→ Influx' : '← Efflux', color: animOpening > 0.1 ? '#60a5fa' : '#f87171' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[7px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-xs font-bold mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StomataLab;
