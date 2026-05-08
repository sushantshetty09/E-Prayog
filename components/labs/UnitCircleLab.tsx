import React, { useState, useRef, useEffect, useCallback } from 'react';

const UnitCircleLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(45);
  const [animating, setAnimating] = useState(false);
  const rafRef = useRef(0);
  const animRef = useRef(0);

  useEffect(() => {
    if (!animating) return;
    const id = setInterval(() => {
      setAngle(a => (a + 1) % 360);
    }, 20);
    return () => clearInterval(id);
  }, [animating]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const rad = (angle * Math.PI) / 180;
    const cx = W * 0.45, cy = H / 2, r = Math.min(W, H) * 0.32;
    const cosA = Math.cos(rad), sinA = Math.sin(rad);
    const px = cx + r * cosA, py = cy - r * sinA;

    // ── Grid ──
    ctx.strokeStyle = 'rgba(51,65,85,0.3)'; ctx.lineWidth = 0.8; ctx.setLineDash([2, 4]);
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath(); ctx.moveTo(cx + i * r / 2, 10); ctx.lineTo(cx + i * r / 2, H - 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(10, cy + i * r / 2); ctx.lineTo(W * 0.85, cy + i * r / 2); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = 'rgba(100,116,139,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(10, cy); ctx.lineTo(W * 0.85, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 10); ctx.lineTo(cx, H - 10); ctx.stroke();
    // Axis labels
    ctx.fillStyle = '#475569'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
    ['1', '-1'].forEach((lbl, i) => {
      ctx.fillText(lbl, cx + (i === 0 ? r : -r) + (i === 0 ? 12 : -8), cy + 14);
      ctx.fillText(lbl, cx + (i === 0 ? 10 : 12), cy + (i === 0 ? -r : r) + (i === 0 ? -5 : 15));
    });
    ctx.fillText('x', W * 0.84, cy - 6); ctx.fillText('y', cx + 8, 18);

    // ── Unit circle with sector fill ──
    // Sector
    ctx.fillStyle = `rgba(96,165,250,0.07)`;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, 0, -rad, rad < 0);
    ctx.closePath(); ctx.fill();
    // Circle
    const circleGrad = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
    ctx.shadowBlur = 6; ctx.shadowColor = '#3b82f6';
    ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.shadowBlur = 0;

    // ── Radius line ──
    ctx.shadowBlur = 10; ctx.shadowColor = '#60a5fa';
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.shadowBlur = 0;

    // ── cos component (x) ──
    ctx.shadowBlur = 5; ctx.shadowColor = '#f59e0b';
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke();
    ctx.setLineDash([]);
    // sin component (y)
    ctx.shadowColor = '#ef4444'; ctx.shadowBlur = 5;
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(px, py); ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;

    // Projection lines to axis
    ctx.strokeStyle = 'rgba(96,165,250,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([2, 5]);
    ctx.beginPath(); ctx.moveTo(px, cy); ctx.lineTo(px, H - 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, py); ctx.lineTo(W * 0.85, py); ctx.stroke();
    ctx.setLineDash([]);

    // ── Point ──
    ctx.shadowBlur = 15; ctx.shadowColor = '#a78bfa';
    ctx.fillStyle = '#a78bfa'; ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ddd6fe'; ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = 0;

    // Angle arc
    const arcR = 30;
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, arcR, 0, -rad, rad < 0 || angle > 180); ctx.stroke();
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
    const arcLabelAng = rad / 2;
    ctx.fillText(`${angle}°`, cx + (arcR + 12) * Math.cos(-arcLabelAng), cy + (arcR + 12) * (-Math.sin(-arcLabelAng)));

    // ── Value panel (right side) ──
    const panelX = W * 0.84;
    const vals = [
      { label: 'sin θ', val: sinA, color: '#ef4444' },
      { label: 'cos θ', val: cosA, color: '#f59e0b' },
      { label: 'tan θ', val: cosA !== 0 ? sinA / cosA : Infinity, color: '#a78bfa' },
      { label: 'sec θ', val: cosA !== 0 ? 1 / cosA : Infinity, color: '#38bdf8' },
      { label: 'csc θ', val: sinA !== 0 ? 1 / sinA : Infinity, color: '#34d399' },
      { label: 'cot θ', val: sinA !== 0 ? cosA / sinA : Infinity, color: '#f97316' },
    ];
    vals.forEach((v, i) => {
      const vy = 40 + i * 38;
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.beginPath(); ctx.roundRect(panelX - 4, vy - 12, W - panelX + 4, 30, 4); ctx.fill();
      ctx.fillStyle = v.color; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'left';
      ctx.fillText(v.label, panelX + 2, vy + 2);
      const display = isFinite(v.val) ? v.val.toFixed(4) : '∞';
      ctx.fillStyle = '#e2e8f0'; ctx.font = '10px monospace';
      ctx.fillText(display, panelX + 2, vy + 14);
    });

    // ── Coordinates ──
    ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
    ctx.fillText(`P(${cosA.toFixed(3)}, ${sinA.toFixed(3)})`, px + (cosA > 0 ? 40 : -40), py + (sinA > 0 ? -12 : 18));

    rafRef.current = requestAnimationFrame(draw);
  }, [angle]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">⭕ Unit Circle — Trigonometry</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">sin · cos · tan · sec · csc · cot · All quadrants</p>
        </div>
        <button onClick={() => setAnimating(a => !a)} className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: animating ? 'rgba(239,68,68,0.15)' : 'rgba(167,139,250,0.15)', color: animating ? '#f87171' : '#a78bfa', border: `1px solid ${animating ? 'rgba(239,68,68,0.3)' : 'rgba(167,139,250,0.3)'}` }}>
          {animating ? '⏸ Pause' : '▶ Animate'}
        </button>
      </div>
      <canvas ref={canvasRef} width={520} height={320} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-2 border-t" style={{ borderColor: 'rgba(167,139,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">θ</label>
          <input type="range" min={0} max={359} step={1} value={angle} onChange={e => { setAngle(Number(e.target.value)); setAnimating(false); }}
            className="flex-1 h-1.5 rounded-full accent-violet-400" />
          <span className="text-xs font-mono text-violet-400 w-12 text-right">{angle}°</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 270, 315, 330].map(a => (
            <button key={a} onClick={() => { setAngle(a); setAnimating(false); }}
              className="px-2 py-1 rounded text-[8px] font-mono"
              style={{ background: angle === a ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.04)', color: angle === a ? '#a78bfa' : '#475569', border: `1px solid ${angle === a ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
              {a}°
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UnitCircleLab;
