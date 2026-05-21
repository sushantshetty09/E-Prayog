import React, { useState, useRef, useEffect } from 'react';

const PrismLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(45);
  const A = 60; // prism angle
  const n = 1.52; // borosilicate glass
  const r1 = Math.asin(Math.sin((angle * Math.PI) / 180) / n) * (180 / Math.PI);
  const r2 = A - r1;
  const sinE = n * Math.sin((r2 * Math.PI) / 180);
  const isTIR = sinE > 1;
  const e = isTIR ? 0 : Math.asin(sinE) * (180 / Math.PI);
  const deviation = angle + (isTIR ? 0 : e) - A;
  const Dm = 2 * (Math.asin(n * Math.sin((A / 2) * (Math.PI / 180))) * (180 / Math.PI)) - A;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Dark optics lab ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#060810'); bg.addColorStop(1, '#040508');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // Subtle hex pattern
    ctx.strokeStyle = 'rgba(56,189,248,0.015)'; ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 30) for (let y = 0; y < H; y += 26) {
      ctx.beginPath(); ctx.arc(x + (y % 2 === 0 ? 0 : 15), y, 12, 0, Math.PI * 2); ctx.stroke();
    }

    const cx = W / 2, cy = H / 2 + 15;
    const s = 150;

    // ── Glass Prism ──
    const p1 = { x: cx, y: cy - s * Math.sqrt(3) / 3 };          // apex
    const p2 = { x: cx - s / 2, y: cy + s * Math.sqrt(3) / 6 };  // bottom-left
    const p3 = { x: cx + s / 2, y: cy + s * Math.sqrt(3) / 6 };  // bottom-right

    // Prism internal glow (glass look)
    const prismGlow = ctx.createLinearGradient(p2.x, p2.y, p3.x, p1.y);
    prismGlow.addColorStop(0, 'rgba(96,165,250,0.04)');
    prismGlow.addColorStop(0.5, 'rgba(147,197,253,0.12)');
    prismGlow.addColorStop(1, 'rgba(96,165,250,0.04)');

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.closePath();
    ctx.fillStyle = prismGlow; ctx.fill();

    // Prism edges with bevel
    ctx.strokeStyle = 'rgba(147,197,253,0.7)'; ctx.lineWidth = 2.5;
    ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(96,165,250,0.3)';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Glass shine on left face
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p2.x + 4, p2.y); ctx.lineTo(p1.x + 4, p1.y); ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fill();
    ctx.restore();

    // Apex angle label
    ctx.fillStyle = 'rgba(96,165,250,0.9)'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`A = ${A}°`, p1.x, p1.y - 14);

    // ── Entry point on left face ──
    const entryY = (p2.y + p1.y) / 2 + 10;
    const leftFaceSlope = (p1.y - p2.y) / (p1.x - p2.x);
    const entryX = p2.x + (entryY - p2.y) / leftFaceSlope;

    // Normal at entry face
    const leftFaceAngle = Math.atan2(p1.y - p2.y, p1.x - p2.x);
    const normalAngle = leftFaceAngle - Math.PI / 2;
    ctx.strokeStyle = 'rgba(100,116,139,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(entryX + Math.cos(normalAngle) * 50, entryY + Math.sin(normalAngle) * 50);
    ctx.lineTo(entryX - Math.cos(normalAngle) * 50, entryY - Math.sin(normalAngle) * 50);
    ctx.stroke(); ctx.setLineDash([]);

    // ── Incident ray (white light) ──
    const incidentAngle = angle * Math.PI / 180;
    const incidentLength = 120;
    const rayEntryAngle = leftFaceAngle + incidentAngle - Math.PI;
    ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 2.5;
    ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(254,243,199,0.4)';
    ctx.beginPath();
    ctx.moveTo(entryX + Math.cos(rayEntryAngle) * incidentLength, entryY + Math.sin(rayEntryAngle) * incidentLength);
    ctx.lineTo(entryX, entryY); ctx.stroke();
    ctx.shadowBlur = 0;
    // Angle of incidence arc
    ctx.strokeStyle = 'rgba(254,243,199,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(entryX, entryY, 25, leftFaceAngle - Math.PI / 2 - incidentAngle, leftFaceAngle - Math.PI / 2, false);
    ctx.stroke();
    ctx.fillStyle = '#fef3c7'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
    const iLabelAngle = leftFaceAngle - Math.PI / 2 - incidentAngle / 2;
    ctx.fillText(`i=${angle}°`, entryX + 38 * Math.cos(iLabelAngle), entryY + 38 * Math.sin(iLabelAngle));

    if (!isTIR) {
      // ── Exit point on right face ──
      const exitY = (p3.y + p1.y) / 2 + 10;
      const rightFaceSlope = (p1.y - p3.y) / (p1.x - p3.x);
      const exitX = p3.x + (exitY - p3.y) / rightFaceSlope;

      // Refracted ray inside (dashed white)
      ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(entryX, entryY); ctx.lineTo(exitX, exitY); ctx.stroke();
      ctx.setLineDash([]);

      // ── Dispersed spectrum ──
      const rightFaceAngle = Math.atan2(p1.y - p3.y, p1.x - p3.x);
      const exitNormalAngle = rightFaceAngle + Math.PI / 2;

      const spectrum = [
        { color: '#ef4444', wavelength: 700, dn: 0.008 },   // Red
        { color: '#f97316', wavelength: 620, dn: 0.005 },
        { color: '#facc15', wavelength: 580, dn: 0.002 },
        { color: '#4ade80', wavelength: 550, dn: 0.000 },
        { color: '#38bdf8', wavelength: 490, dn: -0.004 },
        { color: '#6366f1', wavelength: 450, dn: -0.007 },
        { color: '#a855f7', wavelength: 420, dn: -0.010 },  // Violet
      ];

      spectrum.forEach(({ color, dn }) => {
        const nC = n + dn;
        const sinExit = nC * Math.sin((r2 * Math.PI) / 180);
        if (sinExit > 1) return;
        const exitAngle = Math.asin(sinExit);
        const rayAngle = exitNormalAngle + exitAngle;

        ctx.strokeStyle = color; ctx.lineWidth = 2;
        ctx.shadowBlur = 12; ctx.shadowColor = color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(exitX, exitY);
        ctx.lineTo(exitX + Math.cos(rayAngle) * 180, exitY + Math.sin(rayAngle) * 180);
        ctx.stroke();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      });

      // ── Rainbow fan glow on screen ──
      const screenX = exitX + 175;
      spectrum.forEach(({ color, dn }, i) => {
        const nC = n + dn;
        const sinExit = nC * Math.sin((r2 * Math.PI) / 180);
        if (sinExit > 1) return;
        const exitAngle = Math.asin(sinExit);
        const rayAngle = exitNormalAngle + exitAngle;
        const screenY = exitY + Math.tan(rayAngle) * 175;
        ctx.shadowBlur = 18; ctx.shadowColor = color;
        ctx.fillStyle = color; ctx.globalAlpha = 0.5;
        ctx.beginPath(); ctx.ellipse(screenX, screenY, 5, 2, 0, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      });

      // Deviation arc
      ctx.strokeStyle = 'rgba(250,204,21,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
      const extRayAngle = rayEntryAngle + Math.PI;
      ctx.beginPath(); ctx.moveTo(exitX, exitY); ctx.lineTo(exitX + Math.cos(extRayAngle) * 80, exitY + Math.sin(extRayAngle) * 80); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#facc15'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`δ = ${deviation.toFixed(1)}°`, exitX + 60, exitY - 20);
    } else {
      // TIR label
      ctx.shadowBlur = 10; ctx.shadowColor = '#ef4444';
      ctx.fillStyle = '#f87171'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
      ctx.fillText('⚡ Total Internal Reflection!', cx, cy + 100);
      ctx.shadowBlur = 0;
    }

    // Bench line
    const bench = ctx.createLinearGradient(0, H - 20, 0, H);
    bench.addColorStop(0, '#3d2a1a'); bench.addColorStop(1, '#2a1d0f');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 20, W, 20);

  }, [angle, A, n, r1, r2, e, deviation, isTIR]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#050710 0%,#060810 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(5,8,16,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🌈 Glass Prism — Light Dispersion & Deviation</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Borosilicate glass (n = {n}) &nbsp;|&nbsp; Prism angle A = {A}°</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: isTIR ? 'rgba(239,68,68,0.12)' : 'rgba(250,204,21,0.1)', color: isTIR ? '#f87171' : '#facc15', border: `1px solid ${isTIR ? 'rgba(239,68,68,0.3)' : 'rgba(250,204,21,0.25)'}` }}>
          {isTIR ? '⚡ TIR' : `δ = ${deviation.toFixed(1)}°`}
        </div>
      </div>

      <canvas ref={canvasRef} width={680} height={380} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(4,5,8,0.97)' }}>
        <div className="flex items-center gap-4">
          <label className="text-xs text-zinc-400 whitespace-nowrap">Angle of Incidence (i)</label>
          <input type="range" min={20} max={70} step={1} value={angle}
            onChange={e => setAngle(Number(e.target.value))}
            className="w-full h-1.5 rounded-full accent-yellow-500" />
          <span className="text-xs font-mono text-yellow-400 w-12 text-right">{angle}°</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'i (Incidence)', val: `${angle}°`, color: '#fef3c7', bg: 'rgba(254,243,199,0.06)', border: 'rgba(254,243,199,0.15)' },
            { label: 'r₁ (Refraction)', val: `${r1.toFixed(1)}°`, color: '#38bdf8', bg: 'rgba(56,189,248,0.06)', border: 'rgba(56,189,248,0.15)' },
            { label: 'e (Emergence)', val: isTIR ? 'TIR' : `${e.toFixed(1)}°`, color: isTIR ? '#f87171' : '#4ade80', bg: 'rgba(74,222,128,0.06)', border: 'rgba(74,222,128,0.15)' },
            { label: 'δ (Deviation)', val: `${deviation.toFixed(1)}°`, color: '#facc15', bg: 'rgba(250,204,21,0.06)', border: 'rgba(250,204,21,0.15)' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2.5 text-center" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
              <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-base font-bold font-mono mt-0.5" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-[10px]" style={{ background: 'rgba(96,165,250,0.04)', border: '1px solid rgba(96,165,250,0.12)' }}>
            <span className="text-zinc-500">Snell's law:</span>
            <span className="font-mono text-sky-400">n₁sinθ₁ = n₂sinθ₂ &nbsp;→&nbsp; sin({angle}°)/{n} = sin({r1.toFixed(1)}°)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px]" style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)' }}>
            <span className="text-zinc-500">δ_min:</span>
            <span className="font-mono text-violet-400">{Dm.toFixed(1)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrismLab;
