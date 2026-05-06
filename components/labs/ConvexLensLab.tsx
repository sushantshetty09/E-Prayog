import React, { useState, useRef, useEffect } from 'react';

const ConvexLensLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [objectDist, setObjectDist] = useState(35);
  const f = 15;
  const u = -objectDist;
  const v_val = (u * f) / (u + f);
  const m = v_val / u;
  const isReal = v_val > 0;
  const isInverted = m < 0;
  const nature = isReal ? 'Real & Inverted' : 'Virtual & Erect';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Dark optical bench background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#06080f');
    bg.addColorStop(1, '#040609');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Subtle horizontal scan lines (oscilloscope feel)
    ctx.fillStyle = 'rgba(56,189,248,0.012)';
    for (let y = 0; y < H; y += 4) { ctx.fillRect(0, y, W, 1); }

    // ── Optical bench (rail) ──
    const axisY = H / 2 + 10;
    const railGrad = ctx.createLinearGradient(0, axisY - 4, 0, axisY + 4);
    railGrad.addColorStop(0, '#334155'); railGrad.addColorStop(0.5, '#475569'); railGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = railGrad; ctx.fillRect(20, axisY - 3, W - 40, 6);
    // Tick marks on rail
    ctx.strokeStyle = 'rgba(71,85,105,0.6)'; ctx.lineWidth = 0.8;
    for (let x = 20; x < W - 20; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, axisY + 3); ctx.lineTo(x, axisY + 7); ctx.stroke();
    }

    const lensX = W / 2, sc = 3.2;

    // ── Principal axis (dashed) ──
    ctx.strokeStyle = 'rgba(71,85,105,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(20, axisY); ctx.lineTo(W - 20, axisY); ctx.stroke();
    ctx.setLineDash([]);

    // ── Focal / 2F markers ──
    const markers = [
      { x: lensX - f * sc, label: 'F₁' },
      { x: lensX + f * sc, label: 'F₂' },
      { x: lensX - 2 * f * sc, label: '2F₁' },
      { x: lensX + 2 * f * sc, label: '2F₂' },
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

    // ── Convex Lens (glass look) ──
    ctx.save();
    // Lens glow aura
    const lensGlow = ctx.createRadialGradient(lensX, axisY, 0, lensX, axisY, 90);
    lensGlow.addColorStop(0, 'rgba(96,165,250,0.06)');
    lensGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = lensGlow;
    ctx.fillRect(lensX - 90, axisY - 90, 180, 180);

    // Lens body (biconvex)
    ctx.beginPath();
    ctx.save();
    ctx.translate(lensX, axisY);
    // Left curve
    ctx.moveTo(-5, -80);
    ctx.quadraticCurveTo(-30, 0, -5, 80);
    // Right edge
    ctx.lineTo(5, 80);
    // Right curve
    ctx.quadraticCurveTo(30, 0, 5, -80);
    ctx.closePath();
    const lensGrad = ctx.createLinearGradient(-25, -80, 25, 80);
    lensGrad.addColorStop(0, 'rgba(147,197,253,0.05)');
    lensGrad.addColorStop(0.3, 'rgba(147,197,253,0.22)');
    lensGrad.addColorStop(0.5, 'rgba(147,197,253,0.08)');
    lensGrad.addColorStop(0.7, 'rgba(147,197,253,0.22)');
    lensGrad.addColorStop(1, 'rgba(147,197,253,0.05)');
    ctx.fillStyle = lensGrad; ctx.fill();
    ctx.restore();

    // Lens outline
    ctx.beginPath();
    ctx.save(); ctx.translate(lensX, axisY);
    ctx.moveTo(-5, -80); ctx.quadraticCurveTo(-30, 0, -5, 80);
    ctx.restore();
    ctx.strokeStyle = 'rgba(96,165,250,0.8)'; ctx.lineWidth = 2; ctx.stroke();

    ctx.beginPath();
    ctx.save(); ctx.translate(lensX, axisY);
    ctx.moveTo(5, -80); ctx.quadraticCurveTo(30, 0, 5, 80);
    ctx.restore();
    ctx.strokeStyle = 'rgba(96,165,250,0.8)'; ctx.lineWidth = 2; ctx.stroke();

    // Arrow tips
    [[-1, -82], [1, 82]].forEach(([dx, dy]) => {
      ctx.fillStyle = 'rgba(96,165,250,0.9)';
      ctx.beginPath(); ctx.moveTo(lensX + dx * 5, axisY + dy);
      ctx.lineTo(lensX - 4, axisY + dy - 6 * Math.sign(dy));
      ctx.lineTo(lensX + 4, axisY + dy - 6 * Math.sign(dy)); ctx.closePath(); ctx.fill();
    });
    ctx.restore();

    // ── Object (candle-like arrow) ──
    const objX = lensX + u * sc;
    const objH = 50;

    // Candle flame glow
    ctx.shadowBlur = 15; ctx.shadowColor = '#fbbf24';
    ctx.fillStyle = 'rgba(251,191,36,0.8)';
    ctx.beginPath(); ctx.ellipse(objX, axisY - objH - 10, 5, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Arrow body
    const objGrad = ctx.createLinearGradient(objX, axisY, objX, axisY - objH);
    objGrad.addColorStop(0, '#d97706'); objGrad.addColorStop(1, '#fbbf24');
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 3;
    ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(251,191,36,0.5)';
    ctx.beginPath(); ctx.moveTo(objX, axisY); ctx.lineTo(objX, axisY - objH); ctx.stroke();
    // Arrowhead
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.moveTo(objX - 6, axisY - objH + 12); ctx.lineTo(objX, axisY - objH); ctx.lineTo(objX + 6, axisY - objH + 12); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;

    // Object label
    ctx.fillStyle = '#fbbf24'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`Object`, objX, axisY + 18);
    ctx.fillText(`u = ${u} cm`, objX, axisY + 30);

    // ── Image ──
    if (Math.abs(u + f) > 0.5 && !isNaN(v_val)) {
      const imgX = lensX + v_val * sc;
      const imgH = Math.min(110, Math.abs(m) * objH);
      const imgColor = isReal ? '#38bdf8' : '#a78bfa';
      const imgColorShadow = isReal ? 'rgba(56,189,248,0.5)' : 'rgba(167,139,250,0.5)';
      const imgTop = isInverted ? axisY + imgH : axisY - imgH;

      ctx.shadowBlur = 8; ctx.shadowColor = imgColorShadow;
      ctx.strokeStyle = imgColor; ctx.lineWidth = 2.5;
      ctx.setLineDash(isReal ? [] : [5, 4]);
      ctx.beginPath(); ctx.moveTo(imgX, axisY); ctx.lineTo(imgX, imgTop); ctx.stroke();
      ctx.setLineDash([]);
      // Arrowhead
      ctx.fillStyle = imgColor;
      ctx.beginPath(); ctx.moveTo(imgX - 5, imgTop + 12 * Math.sign(axisY - imgTop));
      ctx.lineTo(imgX, imgTop); ctx.lineTo(imgX + 5, imgTop + 12 * Math.sign(axisY - imgTop));
      ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0;

      // Image label
      ctx.fillStyle = imgColor; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`Image`, imgX, axisY + 18);
      ctx.fillText(`v = ${v_val.toFixed(1)} cm`, imgX, axisY + 30);

      // ── Rays ──
      // Ray 1: parallel to axis → through F₂
      ctx.strokeStyle = 'rgba(239,68,68,0.65)'; ctx.lineWidth = 1.5;
      ctx.shadowBlur = 4; ctx.shadowColor = 'rgba(239,68,68,0.4)';
      ctx.beginPath(); ctx.moveTo(objX, axisY - objH); ctx.lineTo(lensX, axisY - objH);
      ctx.lineTo(imgX, imgTop); ctx.stroke();

      // Ray 2: through optical centre (straight)
      ctx.strokeStyle = 'rgba(34,197,94,0.65)'; ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(34,197,94,0.4)';
      ctx.beginPath(); ctx.moveTo(objX, axisY - objH); ctx.lineTo(imgX, imgTop); ctx.stroke();

      // Ray 3: through F₁ → parallel after lens
      ctx.strokeStyle = 'rgba(168,85,247,0.55)'; ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(168,85,247,0.4)';
      ctx.beginPath(); ctx.moveTo(objX, axisY - objH); ctx.lineTo(lensX, axisY - objH * m);
      ctx.lineTo(W - 20, axisY - objH * m); ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // ── cm ruler at bottom ──
    ctx.strokeStyle = 'rgba(71,85,105,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([]);
    for (let i = -6; i <= 6; i++) {
      const rx = lensX + i * f * sc;
      ctx.beginPath(); ctx.moveTo(rx, axisY + 38); ctx.lineTo(rx, axisY + 46); ctx.stroke();
      ctx.fillStyle = 'rgba(100,116,139,0.6)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`${i * f}`, rx, axisY + 56);
    }
    ctx.fillStyle = 'rgba(100,116,139,0.4)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('cm', W - 30, axisY + 48);

  }, [objectDist, f, u, v_val, m, isReal, isInverted]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#05070d 0%,#060810 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔭 Convex Lens — Ray Diagram & Image Formation</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">f = {f} cm &nbsp;|&nbsp; Lens Formula: 1/v − 1/u = 1/f</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: isReal ? 'rgba(56,189,248,0.12)' : 'rgba(167,139,250,0.12)', color: isReal ? '#38bdf8' : '#a78bfa', border: `1px solid ${isReal ? 'rgba(56,189,248,0.3)' : 'rgba(167,139,250,0.3)'}` }}>
          {nature}
        </div>
      </div>

      <canvas ref={canvasRef} width={700} height={330} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-4">
          <label className="text-xs text-slate-400 whitespace-nowrap">Object Distance</label>
          <input type="range" min={5} max={80} step={1} value={objectDist}
            onChange={e => setObjectDist(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-blue-500" />
          <span className="text-xs font-mono text-amber-400 w-16 text-right">{objectDist} cm</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'u (Object)', val: `${u} cm`, color: '#fbbf24', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
            { label: 'v (Image)', val: `${v_val.toFixed(1)} cm`, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
            { label: 'm (Magnif.)', val: m.toFixed(3), color: Math.abs(m) > 1 ? '#f87171' : '#10b981', bg: 'rgba(16,185,129,0.05)', border: 'rgba(16,185,129,0.15)' },
            { label: 'Nature', val: isReal ? 'Real' : 'Virtual', color: isReal ? '#38bdf8' : '#a78bfa', bg: isReal ? 'rgba(56,189,248,0.08)' : 'rgba(167,139,250,0.08)', border: isReal ? 'rgba(56,189,248,0.2)' : 'rgba(167,139,250,0.2)' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2.5 text-center" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px]" style={{ background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.12)' }}>
          <span className="text-slate-500">Lens Formula:</span>
          <span className="font-mono text-sky-400">1/v − 1/u = 1/f &nbsp;→&nbsp; 1/{v_val.toFixed(1)} − 1/({u}) = 1/{f} ✓</span>
          {isInverted && <span className="ml-auto text-rose-400">↕ Inverted image</span>}
        </div>
      </div>
    </div>
  );
};

export default ConvexLensLab;
