import React, { useState, useRef, useEffect } from 'react';

const ConcaveMirrorLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objectDist, setObjectDist] = useState(40); // cm from mirror
  const f = 15; // focal length cm

  const u = -objectDist;
  const v = (u * (-f)) / (u - (-f)); // mirror formula: 1/v + 1/u = 1/f
  const m = -v / u;
  const imageReal = v < 0;
  const isInverted = m < 0;
  const nature = imageReal ? 'Real & Inverted' : 'Virtual & Erect';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Dark optical bench background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#06080f'); bg.addColorStop(1, '#040609');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Subtle grid
    ctx.strokeStyle = 'rgba(56,189,248,0.015)'; ctx.lineWidth = 0.5;
    for (let x = 0; x < W; x += 30) for (let y = 0; y < H; y += 30) {
      ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.stroke();
    }

    const mirrorX = W - 100;
    const axisY = H / 2 + 10;
    const scale = 4; // pixels per cm

    // ── Optical bench (rail) ──
    const railGrad = ctx.createLinearGradient(0, axisY - 4, 0, axisY + 4);
    railGrad.addColorStop(0, '#334155'); railGrad.addColorStop(0.5, '#475569'); railGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = railGrad; ctx.fillRect(20, axisY - 3, W - 40, 6);

    // ── Principal axis (dashed) ──
    ctx.strokeStyle = 'rgba(100,116,139,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(20, axisY); ctx.lineTo(W - 20, axisY); ctx.stroke();
    ctx.setLineDash([]);

    // ── Mark F, C, P ──
    const pX = mirrorX;
    const fX = mirrorX - f * scale;
    const cX = mirrorX - 2 * f * scale;

    const markers = [
      { x: pX, label: 'P' },
      { x: fX, label: 'F' },
      { x: cX, label: 'C' }
    ];
    markers.forEach(({ x, label }) => {
      ctx.strokeStyle = 'rgba(16,185,129,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(x, axisY - 60); ctx.lineTo(x, axisY + 60); ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 6; ctx.shadowColor = '#10b981';
      ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.arc(x, axisY, 4, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#34d399'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(label, x, axisY + 18);
    });

    // ── Concave Mirror (Glass + Silver coating) ──
    ctx.save();
    ctx.beginPath();
    // Arc drawing
    const mirrorRadius = 120;
    ctx.arc(mirrorX + 110, axisY, mirrorRadius, Math.PI * 0.7, Math.PI * 1.3);
    ctx.strokeStyle = 'rgba(226,232,240,0.9)'; ctx.lineWidth = 4;
    ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(148,163,184,0.5)';
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Silver coating hashes on back
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 1.5;
    for (let a = Math.PI * 0.72; a <= Math.PI * 1.28; a += 0.05) {
      const sx = mirrorX + 110 + Math.cos(a) * (mirrorRadius + 2);
      const sy = axisY + Math.sin(a) * (mirrorRadius + 2);
      const ex = sx + Math.cos(a) * 8;
      const ey = sy + Math.sin(a) * 8;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    }
    ctx.restore();

    // ── Object (candle flame) ──
    const objX = mirrorX - objectDist * scale;
    const objH = 45;

    ctx.shadowBlur = 15; ctx.shadowColor = '#fbbf24';
    ctx.fillStyle = 'rgba(251,191,36,0.8)';
    ctx.beginPath(); ctx.ellipse(objX, axisY - objH - 10, 5, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    const objGrad = ctx.createLinearGradient(objX, axisY, objX, axisY - objH);
    objGrad.addColorStop(0, '#d97706'); objGrad.addColorStop(1, '#fbbf24');
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(objX, axisY); ctx.lineTo(objX, axisY - objH); ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(objX - 6, axisY - objH + 12); ctx.lineTo(objX, axisY - objH); ctx.lineTo(objX + 6, axisY - objH + 12); ctx.fill();

    ctx.fillStyle = '#fbbf24'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`Object (u=${u})`, objX, axisY + 30);

    // ── Image ──
    if (Math.abs(u + f) > 0.5 && !isNaN(v)) {
      const imgX = mirrorX + v * scale; // v is negative for real (left of mirror), positive for virtual (right)
      const imgH = Math.min(130, Math.abs(m) * objH);
      const imgColor = imageReal ? '#38bdf8' : '#a78bfa';
      const imgColorShadow = imageReal ? 'rgba(56,189,248,0.5)' : 'rgba(167,139,250,0.5)';
      const imgTop = isInverted ? axisY + imgH : axisY - imgH;

      ctx.shadowBlur = 8; ctx.shadowColor = imgColorShadow;
      ctx.strokeStyle = imgColor; ctx.lineWidth = 2.5;
      ctx.setLineDash(imageReal ? [] : [5, 4]);
      ctx.beginPath(); ctx.moveTo(imgX, axisY); ctx.lineTo(imgX, imgTop); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = imgColor;
      ctx.beginPath(); ctx.moveTo(imgX - 5, imgTop + 12 * Math.sign(axisY - imgTop));
      ctx.lineTo(imgX, imgTop); ctx.lineTo(imgX + 5, imgTop + 12 * Math.sign(axisY - imgTop)); ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = imgColor; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`Image (v=${v.toFixed(1)})`, imgX, imageReal ? axisY - 15 : axisY + 30);

      // ── Rays ──
      // Calculate intersection at mirror for parallel ray
      const mirrorYForParallel = axisY - objH;
      const mirrorXForParallel = mirrorX + 110 - Math.sqrt(Math.pow(mirrorRadius, 2) - Math.pow(mirrorYForParallel - axisY, 2));

      // Ray 1: Parallel to axis -> through F (or appears from F if virtual)
      ctx.strokeStyle = 'rgba(239,68,68,0.65)'; ctx.lineWidth = 1.5; ctx.shadowBlur = 4; ctx.shadowColor = 'rgba(239,68,68,0.4)';
      ctx.beginPath(); ctx.moveTo(objX, axisY - objH); ctx.lineTo(mirrorXForParallel, mirrorYForParallel);
      if (imageReal) {
        ctx.lineTo(imgX, imgTop); // passes through image
      } else {
        // Appears to come from F behind mirror, extends to image
        ctx.lineTo(fX, axisY); // This is real part reflecting
        ctx.strokeStyle = 'rgba(239,68,68,0.3)'; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(mirrorXForParallel, mirrorYForParallel); ctx.lineTo(imgX, imgTop); ctx.stroke();
        ctx.setLineDash([]); ctx.strokeStyle = 'rgba(239,68,68,0.65)';
      }
      ctx.stroke();

      // Ray 2: Through C (or towards C) -> reflects back on itself
      ctx.strokeStyle = 'rgba(34,197,94,0.65)'; ctx.shadowColor = 'rgba(34,197,94,0.4)';
      ctx.beginPath(); ctx.moveTo(objX, axisY - objH);
      if (imageReal) {
        // Line from obj to C intersecting mirror
        const slopeC = (axisY - objH - axisY) / (objX - cX);
        const mirrorIntersectY = slopeC * (mirrorX - cX) + axisY;
        ctx.lineTo(mirrorX, mirrorIntersectY);
        ctx.lineTo(imgX, imgTop);
      } else {
        const slopeC = (axisY - objH - axisY) / (objX - cX);
        const mirrorIntersectY = slopeC * (mirrorX - cX) + axisY;
        ctx.lineTo(mirrorX, mirrorIntersectY);
        ctx.strokeStyle = 'rgba(34,197,94,0.3)'; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(mirrorX, mirrorIntersectY); ctx.lineTo(imgX, imgTop); ctx.stroke();
        ctx.setLineDash([]); ctx.strokeStyle = 'rgba(34,197,94,0.65)';
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // ── Ruler at bottom ──
    ctx.strokeStyle = 'rgba(71,85,105,0.3)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 6; i++) {
      const rx = mirrorX - i * 15 * scale;
      ctx.beginPath(); ctx.moveTo(rx, axisY + 40); ctx.lineTo(rx, axisY + 48); ctx.stroke();
      ctx.fillStyle = 'rgba(100,116,139,0.6)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`${i * 15}`, rx, axisY + 58);
    }
    ctx.fillText('cm', 30, axisY + 50);

  }, [objectDist, f, u, v, m, imageReal, isInverted]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#05070d 0%,#060810 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔍 Concave Mirror — Image Formation</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">f = -{f} cm &nbsp;|&nbsp; Mirror Formula: 1/v + 1/u = 1/f</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: imageReal ? 'rgba(56,189,248,0.12)' : 'rgba(167,139,250,0.12)', color: imageReal ? '#38bdf8' : '#a78bfa', border: `1px solid ${imageReal ? 'rgba(56,189,248,0.3)' : 'rgba(167,139,250,0.3)'}` }}>
          {nature}
        </div>
      </div>

      <canvas ref={canvasRef} width={680} height={340} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-4">
          <label className="text-xs text-slate-400 whitespace-nowrap">Object Distance</label>
          <input type="range" min={5} max={80} step={1} value={objectDist}
            onChange={e => setObjectDist(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-amber-500" />
          <span className="text-xs font-mono text-amber-400 w-16 text-right">{objectDist} cm</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'u (Object)', val: `${u} cm`, color: '#fbbf24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
            { label: 'v (Image)', val: `${v.toFixed(1)} cm`, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
            { label: 'm (Magnif.)', val: m.toFixed(3), color: Math.abs(m) > 1 ? '#f87171' : '#10b981', bg: 'rgba(16,185,129,0.05)', border: 'rgba(16,185,129,0.15)' },
            { label: 'Nature', val: imageReal ? 'Real' : 'Virtual', color: imageReal ? '#38bdf8' : '#a78bfa', bg: imageReal ? 'rgba(56,189,248,0.08)' : 'rgba(167,139,250,0.08)', border: imageReal ? 'rgba(56,189,248,0.2)' : 'rgba(167,139,250,0.2)' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2.5 text-center" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcaveMirrorLab;
