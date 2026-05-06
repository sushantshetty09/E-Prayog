import React, { useState, useRef, useEffect, useCallback } from 'react';

// nCr computation
const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
const nCr = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
};

const BinomialTheoremLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [n, setN] = useState(5);
  const [highlightRow, setHighlightRow] = useState(-1);
  const rafRef = useRef(0);

  const terms = Array.from({ length: n + 1 }, (_, r) => ({
    r,
    coeff: nCr(n, r),
    term: `${nCr(n, r) !== 1 || r === 0 ? nCr(n, r) : ''}${r < n ? `x^${n - r}` : ''}${r > 0 ? `y^${r}` : ''}`,
  }));

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // ── Pascal's Triangle ──
    const maxRows = Math.min(n + 1, 8);
    const triH = Math.min(H * 0.52, 180);
    const rowH = triH / maxRows;
    const cx2 = W / 2;

    const maxVal = Math.max(...Array.from({ length: maxRows }, (_, row) =>
      Array.from({ length: row + 1 }, (_, c) => nCr(row, c)).reduce((a, b) => Math.max(a, b))
    ));

    for (let row = 0; row < maxRows; row++) {
      const rowW = (row + 1) * 42;
      const startX = cx2 - rowW / 2 + 21;
      const ry = 25 + row * rowH;
      const isHighlighted = row === n;

      for (let col = 0; col <= row; col++) {
        const val = nCr(row, col);
        const cx3 = startX + col * 42;
        const valRatio = val / maxVal;
        const size = 16 + valRatio * 4;

        // Cell bg
        const isHl = isHighlighted;
        ctx.shadowBlur = isHl ? 12 : 4; ctx.shadowColor = isHl ? '#a78bfa' : '#3b82f6';
        const cellGrad = ctx.createRadialGradient(cx3, ry, 2, cx3, ry, size);
        cellGrad.addColorStop(0, isHl ? '#4c1d95' : '#1e3a5f');
        cellGrad.addColorStop(1, isHl ? '#5b21b6' : '#1e40af');
        ctx.fillStyle = cellGrad;
        ctx.beginPath(); ctx.arc(cx3, ry, size * 0.6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = isHl ? '#a78bfa' : '#2563eb'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = isHl ? '#ddd6fe' : '#93c5fd'; ctx.font = `bold ${val > 99 ? 8 : val > 9 ? 10 : 12}px monospace`;
        ctx.textAlign = 'center'; ctx.fillText(val.toString(), cx3, ry + 4);

        // Connection lines to next row
        if (row < maxRows - 1) {
          const nextRowW = (row + 2) * 42;
          const nextStartX = cx2 - nextRowW / 2 + 21;
          [col, col + 1].forEach(nc => {
            const nx = nextStartX + nc * 42, ny = 25 + (row + 1) * rowH;
            ctx.strokeStyle = 'rgba(37,99,235,0.2)'; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(cx3, ry + 10); ctx.lineTo(nx, ny - 10); ctx.stroke();
          });
        }
      }
    }

    // ── Expansion (coefficient bar chart) ──
    const barArea = { x: 20, y: triH + 35, w: W - 40, h: H - triH - 70 };
    const maxCoeff = Math.max(...terms.map(t => t.coeff));
    const barW = barArea.w / terms.length - 4;

    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath(); ctx.roundRect(barArea.x - 5, barArea.y - 5, barArea.w + 10, barArea.h + 10, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();

    terms.forEach((t2, i) => {
      const bx = barArea.x + i * (barW + 4);
      const bh = Math.max(4, (t2.coeff / maxCoeff) * (barArea.h - 30));
      const by = barArea.y + barArea.h - 30 - bh;

      // Gradient bar
      const bGrad = ctx.createLinearGradient(bx, by, bx + barW, by + bh);
      bGrad.addColorStop(0, '#4c1d9588'); bGrad.addColorStop(1, '#a78bfa55');
      ctx.fillStyle = bGrad; ctx.shadowBlur = 6; ctx.shadowColor = '#a78bfa';
      ctx.beginPath(); ctx.roundRect(bx, by, barW, bh, [3, 3, 0, 0]); ctx.fill();
      ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1; ctx.stroke();
      ctx.shadowBlur = 0;

      // Coefficient label
      ctx.fillStyle = '#a78bfa'; ctx.font = `bold ${barW > 24 ? 9 : 8}px monospace`; ctx.textAlign = 'center';
      if (bh > 16) ctx.fillText(t2.coeff.toString(), bx + barW / 2, by + 12);

      // x^r label
      ctx.fillStyle = '#475569'; ctx.font = '8px monospace';
      ctx.fillText(`r=${i}`, bx + barW / 2, barArea.y + barArea.h - 15);
    });

    // Title
    ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`(x + y)^${n} = ${terms.slice(0, 3).map(t2 => t2.term.replace('x^0', '').replace('y^0', '')).join(' + ')}${n > 2 ? ' + ...' : ''}`, W / 2, H - 8);

    rafRef.current = requestAnimationFrame(draw);
  }, [n, terms]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔢 Binomial Theorem — Pascal's Triangle</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">(x+y)ⁿ = Σ C(n,r) xⁿ⁻ʳ yʳ · Binomial coefficients · Pascal's Triangle</p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded-lg font-bold" style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }}>n = {n}</div>
      </div>
      <canvas ref={canvasRef} width={500} height={340} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(167,139,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">n</label>
          <input type="range" min={1} max={10} step={1} value={n} onChange={e => setN(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-violet-400" />
          <span className="text-xs font-mono text-violet-400 w-8">{n}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Sum of coeffs', val: Math.pow(2, n).toString(), color: '#a78bfa' },
            { label: 'Max coeff', val: nCr(n, Math.floor(n / 2)).toString(), color: '#fbbf24' },
            { label: 'No. of terms', val: (n + 1).toString(), color: '#10b981' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[7px] uppercase tracking-widest text-slate-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
        <div className="text-[9px] text-slate-500 font-mono overflow-x-auto whitespace-nowrap px-1" style={{ color: '#64748b' }}>
          <span className="text-violet-400 font-bold">Expansion: </span>
          {terms.map((t2, i) => (
            <span key={i} className="mr-1" style={{ color: '#a78bfa' }}>
              {i > 0 ? '+ ' : ''}{t2.term.replace('x^1', 'x').replace('y^1', 'y').replace('x^0', '1').replace('y^0', '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BinomialTheoremLab;
