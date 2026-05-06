import React, { useState, useRef, useEffect, useCallback } from 'react';

const ConicSectionsLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [type, setType] = useState<'circle' | 'ellipse' | 'parabola' | 'hyperbola'>('ellipse');
  const [param, setParam] = useState(50); // 0-100
  const rafRef = useRef(0);

  // Derived parameters
  const a = 1 + param * 0.03; // semi-major axis
  const b = type === 'circle' ? a : 0.3 + param * 0.015;
  const c = Math.sqrt(Math.max(0, a * a - b * b));
  const e = type === 'circle' ? 0 : type === 'parabola' ? 1 : type === 'hyperbola' ? 1.5 + param * 0.01 : c / a;

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = W * 0.44, cy = H / 2;
    const scale = 55 + param * 0.4;

    // ── Grid ──
    ctx.strokeStyle = 'rgba(51,65,85,0.25)'; ctx.lineWidth = 0.8; ctx.setLineDash([2, 5]);
    for (let i = -5; i <= 5; i++) {
      ctx.beginPath(); ctx.moveTo(cx + i * scale / 2, 15); ctx.lineTo(cx + i * scale / 2, H - 15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(15, cy + i * scale / 2); ctx.lineTo(W * 0.82, cy + i * scale / 2); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = 'rgba(100,116,139,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(15, cy); ctx.lineTo(W * 0.82, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 15); ctx.lineTo(cx, H - 15); ctx.stroke();
    ctx.fillStyle = '#475569'; ctx.font = '10px Inter';
    ctx.fillText('x', W * 0.82 - 8, cy - 6); ctx.fillText('y', cx + 5, 22);

    // ── Cone cross-section illustration (right panel) ──
    const coneX = W * 0.87, coneY = H / 2;
    ctx.save(); ctx.translate(coneX, coneY);
    // Cone outline
    ctx.strokeStyle = 'rgba(71,85,105,0.3)'; ctx.lineWidth = 1.5;
    const cH = 80;
    ctx.beginPath(); ctx.moveTo(0, -cH); ctx.lineTo(-40, cH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -cH); ctx.lineTo(40, cH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -cH); ctx.lineTo(-40, -cH * 3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -cH); ctx.lineTo(40, -cH * 3); ctx.stroke();
    // Cutting plane marker
    const colorMap = { circle: '#60a5fa', ellipse: '#a78bfa', parabola: '#fbbf24', hyperbola: '#f87171' };
    const conicColor = colorMap[type];
    ctx.strokeStyle = conicColor; ctx.lineWidth = 2;
    if (type === 'circle') { ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.stroke(); }
    else if (type === 'ellipse') { ctx.beginPath(); ctx.moveTo(-35, -20); ctx.lineTo(35, 10); ctx.stroke(); }
    else if (type === 'parabola') { ctx.beginPath(); ctx.moveTo(-35, -60); ctx.lineTo(20, cH - 10); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(-35, -60); ctx.lineTo(-20, cH - 10); ctx.moveTo(35, -60); ctx.lineTo(20, cH - 10); ctx.stroke(); }
    ctx.restore();

    // ── Conic curve ──
    const conicColor2 = colorMap[type];
    ctx.shadowBlur = 10; ctx.shadowColor = conicColor2;
    ctx.strokeStyle = conicColor2; ctx.lineWidth = 2.5;
    ctx.beginPath();

    if (type === 'circle') {
      ctx.arc(cx, cy, a * scale, 0, Math.PI * 2);
    } else if (type === 'ellipse') {
      ctx.ellipse(cx, cy, a * scale, b * scale, 0, 0, Math.PI * 2);
    } else if (type === 'parabola') {
      const pScale = scale * 0.6;
      const pA = 0.5 + param * 0.01;
      let first = true;
      for (let t = -2; t <= 2; t += 0.02) {
        const px2 = cx + t * pScale;
        const py2 = cy - pA * t * t * pScale;
        if (py2 < 15 || py2 > H - 15) continue;
        if (first) { ctx.moveTo(px2, py2); first = false; } else ctx.lineTo(px2, py2);
      }
    } else { // hyperbola
      const hA = a * scale * 0.7, hB2 = b * scale * 0.7;
      [1, -1].forEach(side => {
        let first = true;
        for (let t = -2.5; t <= 2.5; t += 0.02) {
          const hx = cx + side * hA * Math.cosh(t);
          const hy = cy - hB2 * Math.sinh(t);
          if (hx < 15 || hx > W * 0.82 || hy < 15 || hy > H - 15) continue;
          if (first) { ctx.moveTo(hx, hy); first = false; } else ctx.lineTo(hx, hy);
        }
      });
    }
    ctx.stroke(); ctx.shadowBlur = 0;

    // ── Foci ──
    if (type !== 'parabola') {
      const fc = type === 'hyperbola' ? Math.sqrt(a * a * scale * scale * 0.49 + b * b * scale * scale * 0.49) : c * scale;
      [1, -1].forEach(side => {
        const fx = cx + side * fc;
        if (type === 'circle' && fc < 1) return;
        ctx.shadowBlur = 8; ctx.shadowColor = '#f59e0b';
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(fx, cy, 5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
        ctx.fillText(`F${side === 1 ? '₁' : '₂'}`, fx, cy + 16);
      });
    } else {
      // Parabola focus
      const focusY = cy - (0.5 + param * 0.01) * scale * 0.25;
      ctx.shadowBlur = 8; ctx.shadowColor = '#f59e0b';
      ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(cx, focusY, 5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
      ctx.fillText('F', cx, focusY + 16);
      // Directrix
      const dirY = cy + (0.5 + param * 0.01) * scale * 0.25;
      ctx.strokeStyle = 'rgba(251,191,36,0.35)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 6]);
      ctx.beginPath(); ctx.moveTo(cx - 80, dirY); ctx.lineTo(cx + 80, dirY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(251,191,36,0.6)'; ctx.font = '9px Inter'; ctx.fillText('Directrix', cx, dirY - 5);
    }

    // ── Equation display ──
    const eqns = {
      circle: `x² + y² = ${(a * a).toFixed(2)}`,
      ellipse: `x²/${(a * a).toFixed(2)} + y²/${(b * b).toFixed(2)} = 1`,
      parabola: `y = ${(0.5 + param * 0.01).toFixed(2)}x²`,
      hyperbola: `x²/${(a * a * 0.49).toFixed(2)} − y²/${(b * b * 0.49).toFixed(2)} = 1`,
    };
    ctx.fillStyle = conicColor2; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
    ctx.fillText(eqns[type], cx, H - 10);

    // Eccentricity
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px Inter';
    ctx.fillText(`e = ${type === 'parabola' ? '1' : e.toFixed(3)}  (${type})`, cx, H - 24);

    rafRef.current = requestAnimationFrame(draw);
  }, [type, param, a, b, c, e]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const colorMap = { circle: '#60a5fa', ellipse: '#a78bfa', parabola: '#fbbf24', hyperbola: '#f87171' };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${colorMap[type]}35`, background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔵 Conic Sections</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Circle · Ellipse · Parabola · Hyperbola · Eccentricity</p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded-lg font-bold" style={{ background: colorMap[type] + '20', color: colorMap[type], border: `1px solid ${colorMap[type]}40` }}>e = {type === 'parabola' ? '1' : e.toFixed(2)}</div>
      </div>
      <canvas ref={canvasRef} width={500} height={290} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: `${colorMap[type]}15`, background: 'rgba(5,7,12,0.97)' }}>
        <div className="grid grid-cols-4 gap-1.5">
          {(['circle', 'ellipse', 'parabola', 'hyperbola'] as const).map(t => (
            <button key={t} onClick={() => setType(t)}
              className="py-2 rounded-xl text-[9px] font-bold capitalize"
              style={{ background: type === t ? colorMap[t] + '25' : 'rgba(255,255,255,0.04)', color: type === t ? colorMap[t] : '#475569', border: `1px solid ${type === t ? colorMap[t] + '50' : 'rgba(255,255,255,0.07)'}` }}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 whitespace-nowrap">Shape param</label>
          <input type="range" min={5} max={95} step={1} value={param} onChange={e => setParam(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full" style={{ accentColor: colorMap[type] }} />
          <span className="text-xs font-mono w-8" style={{ color: colorMap[type] }}>{param}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'a (semi-major)', val: a.toFixed(2), color: colorMap[type] },
            { label: 'b (semi-minor)', val: type === 'circle' ? '= a' : b.toFixed(2), color: colorMap[type] },
            { label: 'Eccentricity e', val: type === 'parabola' ? '1' : e.toFixed(3), color: type === 'circle' ? '#10b981' : type === 'ellipse' ? '#a78bfa' : type === 'parabola' ? '#fbbf24' : '#f87171' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[7px] uppercase tracking-widest text-slate-500">{d.label}</div>
              <div className="text-xs font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ConicSectionsLab;
