import React, { useState, useRef, useEffect, useCallback } from 'react';

type Op = 'add' | 'mul' | 'det' | 'inv' | 'trans';
type Mat = number[][];

const multiply = (A: Mat, B: Mat): Mat =>
  A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));

const det2 = (m: Mat) => m[0][0] * m[1][1] - m[0][1] * m[1][0];

const inv2 = (m: Mat): Mat | null => {
  const d = det2(m);
  if (Math.abs(d) < 1e-9) return null;
  return [[m[1][1] / d, -m[0][1] / d], [-m[1][0] / d, m[0][0] / d]];
};

const trans = (m: Mat): Mat => m[0].map((_, j) => m.map(row => row[j]));

const fmt = (v: number) => {
  if (!isFinite(v)) return '∞';
  return Number.isInteger(v) ? v.toString() : v.toFixed(2);
};

const MatrixLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [A, setA] = useState<Mat>([[2, 1], [3, 4]]);
  const [B, setB] = useState<Mat>([[1, 2], [0, 1]]);
  const [op, setOp] = useState<Op>('mul');
  const [highlight, setHighlight] = useState<{ row: number; col: number } | null>(null);
  const animRef = useRef(0);
  const rafRef = useRef(0);

  const result: Mat | null | 'scalar' =
    op === 'add' ? A.map((row, i) => row.map((v, j) => v + B[i][j])) :
    op === 'mul' ? multiply(A, B) :
    op === 'det' ? [[det2(A)]] :
    op === 'inv' ? inv2(A) :
    trans(A);

  const detVal = det2(A);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    animRef.current = Math.min(1, animRef.current + 0.025);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const drawMatrix = (
      mat: Mat, x: number, y: number, label: string,
      color: string, cellW = 52, cellH = 44, editable = false
    ) => {
      const rows = mat.length, cols = mat[0].length;
      const mW = cols * cellW + (cols - 1) * 4;
      const mH = rows * cellH + (rows - 1) * 4;
      const bracketPad = 10;

      // Label
      ctx.fillStyle = color; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
      ctx.fillText(label, x + mW / 2, y - 8);

      // Bracket left
      ctx.strokeStyle = color + 'aa'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x + 6, y - 2); ctx.lineTo(x, y - 2);
      ctx.lineTo(x, y + mH + 2); ctx.lineTo(x + 6, y + mH + 2); ctx.stroke();
      // Bracket right
      ctx.beginPath();
      ctx.moveTo(x + mW - 6, y - 2); ctx.lineTo(x + mW, y - 2);
      ctx.lineTo(x + mW, y + mH + 2); ctx.lineTo(x + mW - 6, y + mH + 2); ctx.stroke();

      // Cells
      mat.forEach((row, ri) => {
        row.forEach((val, ci) => {
          const cx2 = x + ci * (cellW + 4);
          const cy2 = y + ri * (cellH + 4);
          const isHl = highlight && highlight.row === ri && highlight.col === ci;

          ctx.shadowBlur = isHl ? 15 : 4;
          ctx.shadowColor = isHl ? color : color + '44';
          const cGrad = ctx.createLinearGradient(cx2, cy2, cx2 + cellW, cy2 + cellH);
          cGrad.addColorStop(0, isHl ? color + '30' : 'rgba(30,41,59,0.8)');
          cGrad.addColorStop(1, isHl ? color + '18' : 'rgba(15,23,42,0.8)');
          ctx.fillStyle = cGrad;
          ctx.beginPath(); ctx.roundRect(cx2, cy2, cellW, cellH, 6); ctx.fill();
          ctx.strokeStyle = isHl ? color : color + '40'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.shadowBlur = 0;

          // Shine
          const shine = ctx.createLinearGradient(cx2, cy2, cx2 + cellW, cy2 + cellH * 0.5);
          shine.addColorStop(0, 'rgba(255,255,255,0.07)'); shine.addColorStop(1, 'transparent');
          ctx.fillStyle = shine; ctx.beginPath(); ctx.roundRect(cx2, cy2, cellW, cellH / 2, [6, 6, 0, 0]); ctx.fill();

          ctx.fillStyle = isHl ? color : '#e2e8f0';
          ctx.font = `bold ${Math.abs(val) > 99 ? 12 : 15}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(fmt(val), cx2 + cellW / 2, cy2 + cellH / 2 + 6);

          if (editable) {
            ctx.fillStyle = color + '30'; ctx.font = '8px Inter';
            ctx.fillText(`[${ri},${ci}]`, cx2 + cellW - 3, cy2 + 10);
          }
        });
      });
    };

    // ── Layout ──
    const anim = animRef.current;
    const startX = 22, matY = H * 0.28;

    drawMatrix(A, startX, matY, 'Matrix A', '#60a5fa', 54, 46, true);

    // Operator
    if (op === 'add' || op === 'mul') {
      const opX = startX + 2 * 58 + 18;
      ctx.shadowBlur = 10; ctx.shadowColor = '#a78bfa';
      ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 26px monospace'; ctx.textAlign = 'center';
      ctx.fillText(op === 'add' ? '+' : '×', opX, matY + 50);
      ctx.shadowBlur = 0;
      drawMatrix(B, opX + 20, matY, 'Matrix B', '#34d399', 54, 46, true);
    }

    // Equals
    const eqX = op === 'add' || op === 'mul' ? startX + 4 * 58 + 42 : startX + 2 * 58 + 18;
    ctx.shadowBlur = 8; ctx.shadowColor = '#fbbf24';
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 26px monospace'; ctx.textAlign = 'center';
    ctx.fillText('=', eqX, matY + 50);
    ctx.shadowBlur = 0;

    // Result
    const resX = eqX + 24;
    if (result && anim > 0.2) {
      const resAlpha = Math.min(1, (anim - 0.2) * 1.5);
      ctx.globalAlpha = resAlpha;
      if (op === 'det') {
        const detX = resX + 15, detY = matY + 35;
        ctx.shadowBlur = 20; ctx.shadowColor = Math.abs(detVal) < 0.01 ? '#ef4444' : '#fbbf24';
        ctx.fillStyle = Math.abs(detVal) < 0.01 ? '#ef4444' : '#fbbf24';
        ctx.font = 'bold 36px monospace'; ctx.textAlign = 'center';
        ctx.fillText(fmt(detVal), detX + 20, detY + 10);
        ctx.shadowBlur = 0;
        ctx.fillStyle = Math.abs(detVal) < 0.01 ? '#ef4444' : '#94a3b8'; ctx.font = '10px Inter';
        ctx.fillText(Math.abs(detVal) < 0.01 ? 'Singular: no inverse' : '← det(A)', detX + 20, detY + 28);
      } else if (result === null) {
        ctx.fillStyle = '#ef4444'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'left';
        ctx.fillText('No inverse —', resX, matY + 35); ctx.fillText('det(A) = 0', resX, matY + 52);
      } else {
        const resLabel = op === 'add' ? 'A+B' : op === 'mul' ? 'AB' : op === 'inv' ? 'A⁻¹' : 'Aᵀ';
        drawMatrix(result as Mat, resX, matY, resLabel, '#fbbf24', 54, 46);
      }
      ctx.globalAlpha = 1;
    }

    // ── Properties panel ──
    const ppY = H - 72;
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath(); ctx.roundRect(12, ppY - 5, W - 24, 62, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();

    const props = [
      { label: 'det(A)', val: fmt(det2(A)), color: Math.abs(det2(A)) < 0.01 ? '#ef4444' : '#fbbf24' },
      { label: 'Rank(A)', val: Math.abs(det2(A)) < 0.01 ? '1' : '2', color: '#60a5fa' },
      { label: 'tr(A)', val: fmt(A[0][0] + A[1][1]), color: '#34d399' },
      { label: 'det(B)', val: fmt(det2(B)), color: '#f97316' },
      { label: 'Invertible A', val: Math.abs(det2(A)) > 0.01 ? 'Yes' : 'No', color: Math.abs(det2(A)) > 0.01 ? '#10b981' : '#ef4444' },
    ];
    props.forEach((p, i) => {
      const px2 = 22 + i * (W - 44) / 5;
      ctx.fillStyle = p.color + '15';
      ctx.beginPath(); ctx.roundRect(px2, ppY, (W - 44) / 5 - 4, 52, 5); ctx.fill();
      ctx.strokeStyle = p.color + '30'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#475569'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
      ctx.fillText(p.label, px2 + (W - 44) / 10 - 2, ppY + 14);
      ctx.fillStyle = p.color; ctx.font = 'bold 14px monospace';
      ctx.fillText(p.val, px2 + (W - 44) / 10 - 2, ppY + 36);
    });

    rafRef.current = requestAnimationFrame(draw);
  }, [A, B, op, result, highlight, detVal]);

  useEffect(() => {
    animRef.current = 0;
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const updateA = (r: number, c: number, val: number) => {
    const m = A.map(row => [...row]); m[r][c] = val; setA(m);
  };
  const updateB = (r: number, c: number, val: number) => {
    const m = B.map(row => [...row]); m[r][c] = val; setB(m);
  };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(96,165,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🔲 Matrix Operations: Linear Algebra</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Addition · Multiplication · Determinant · Inverse · Transpose</p>
        </div>
        <div className="flex gap-1">
          {([['add','A+B'],['mul','A×B'],['det','|A|'],['inv','A⁻¹'],['trans','Aᵀ']] as [Op,string][]).map(([o, lbl]) => (
            <button key={o} onClick={() => { setOp(o); animRef.current = 0; }}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
              style={{ background: op === o ? 'rgba(96,165,250,0.25)' : 'rgba(255,255,255,0.04)', color: op === o ? '#60a5fa' : '#475569', border: `1px solid ${op === o ? 'rgba(96,165,250,0.4)' : 'rgba(255,255,255,0.07)'}` }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} width={540} height={295} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 border-t" style={{ borderColor: 'rgba(96,165,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-6 justify-center">
          {/* Matrix A inputs */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-blue-400 font-bold text-center">Matrix A</span>
            {A.map((row, r) => (
              <div key={r} className="flex gap-1">
                {row.map((v, c) => (
                  <input key={c} type="number" value={v}
                    onChange={e => updateA(r, c, Number(e.target.value))}
                    onMouseEnter={() => setHighlight({ row: r, col: c })}
                    onMouseLeave={() => setHighlight(null)}
                    className="w-14 h-9 text-center text-sm font-mono rounded-lg"
                    style={{ background: 'rgba(96,165,250,0.1)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.25)', outline: 'none' }} />
                ))}
              </div>
            ))}
          </div>
          {/* Matrix B inputs */}
          {(op === 'add' || op === 'mul') && (
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-emerald-400 font-bold text-center">Matrix B</span>
              {B.map((row, r) => (
                <div key={r} className="flex gap-1">
                  {row.map((v, c) => (
                    <input key={c} type="number" value={v}
                      onChange={e => updateB(r, c, Number(e.target.value))}
                      className="w-14 h-9 text-center text-sm font-mono rounded-lg"
                      style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)', outline: 'none' }} />
                  ))}
                </div>
              ))}
            </div>
          )}
          {/* Presets */}
          <div className="flex flex-col gap-1.5 justify-center">
            <span className="text-[9px] text-zinc-500 font-bold text-center">Presets</span>
            {[
              { label: 'Identity', a: [[1,0],[0,1]] as Mat },
              { label: 'Rotation', a: [[0,-1],[1,0]] as Mat },
              { label: 'Singular', a: [[2,4],[1,2]] as Mat },
            ].map(p => (
              <button key={p.label} onClick={() => { setA(p.a); animRef.current = 0; }}
                className="px-3 py-1 rounded-lg text-[9px] font-bold"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MatrixLab;
