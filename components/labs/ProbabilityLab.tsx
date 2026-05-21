import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CoinState { face: 'H' | 'T'; angle: number; spinning: boolean; }
interface DiceState { value: number; rotating: boolean; }

const ProbabilityLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'coin' | 'dice'>('coin');
  const [results, setResults] = useState<number[]>([]);
  const [lastCoin, setLastCoin] = useState<CoinState>({ face: 'H', angle: 0, spinning: false });
  const [lastDice, setLastDice] = useState<DiceState>({ value: 1, rotating: false });
  const [spinning, setSpinning] = useState(false);
  const rafRef = useRef(0);
  const spinRef = useRef(0);
  const tsRef = useRef(0);

  const heads = results.filter(r => r === 1).length;
  const tails = results.filter(r => r === 0).length;
  const total = results.length;
  const diceFreq = [0, 0, 0, 0, 0, 0];
  if (mode === 'dice') results.forEach(r => { if (r >= 1 && r <= 6) diceFreq[r - 1]++; });

  const doFlip = (count: number) => {
    const r: number[] = [];
    for (let i = 0; i < count; i++) r.push(Math.random() < 0.5 ? 1 : 0);
    setResults(prev => [...prev.slice(-2000), ...r]);
    const finalFace = r[r.length - 1] === 1 ? 'H' : 'T';
    if (count === 1) {
      setSpinning(true); spinRef.current = 0;
      setTimeout(() => { setLastCoin({ face: finalFace, angle: 0, spinning: false }); setSpinning(false); }, 600);
    } else setLastCoin({ face: finalFace, angle: 0, spinning: false });
  };

  const doRoll = (count: number) => {
    const r: number[] = [];
    for (let i = 0; i < count; i++) r.push(Math.floor(Math.random() * 6) + 1);
    setResults(prev => [...prev.slice(-2000), ...r]);
    const finalVal = r[r.length - 1];
    if (count === 1) {
      setSpinning(true); spinRef.current = 0;
      setTimeout(() => { setLastDice({ value: finalVal, rotating: false }); setSpinning(false); }, 600);
    } else setLastDice({ value: finalVal, rotating: false });
  };

  const drawDicePips = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, value: number) => {
    const positions: Record<number, [number, number][]> = {
      1: [[0, 0]],
      2: [[-0.35, -0.35], [0.35, 0.35]],
      3: [[-0.35, -0.35], [0, 0], [0.35, 0.35]],
      4: [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]],
      5: [[-0.35, -0.35], [0.35, -0.35], [0, 0], [-0.35, 0.35], [0.35, 0.35]],
      6: [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0], [0.35, 0], [-0.35, 0.35], [0.35, 0.35]],
    };
    ctx.fillStyle = '#fff';
    (positions[value] || []).forEach(([dx, dy]) => {
      ctx.beginPath(); ctx.arc(cx + dx * size, cy + dy * size, size * 0.12, 0, Math.PI * 2); ctx.fill();
    });
  };

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const dt = tsRef.current ? ts - tsRef.current : 16; tsRef.current = ts;
    if (spinning) spinRef.current = Math.min(1, spinRef.current + dt * 0.004);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = mode === 'coin' ? W * 0.28 : W * 0.28, cy = H * 0.42;

    if (mode === 'coin') {
      // ── 3D Coin ──
      const coinR = 58;
      const spinAngle = spinning ? spinRef.current * Math.PI * 8 : 0;
      const scaleX = Math.abs(Math.cos(spinAngle));
      const isHeads = spinning ? (Math.floor(spinAngle / Math.PI) % 2 === 0) : lastCoin.face === 'H';

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(cx, cy + coinR + 12, coinR * 0.85, 8, 0, 0, Math.PI * 2); ctx.fill();

      // Coin edge (visible when spinning)
      if (scaleX < 0.3) {
        ctx.fillStyle = '#78350f';
        ctx.beginPath(); ctx.ellipse(cx, cy, 6, coinR, 0, 0, Math.PI * 2); ctx.fill();
      }

      // Coin face
      ctx.save(); ctx.scale(scaleX, 1);
      const faceGrad = ctx.createRadialGradient(-coinR * 0.3, -coinR * 0.3, 5, 0, 0, coinR);
      if (isHeads) {
        faceGrad.addColorStop(0, '#fef9c3'); faceGrad.addColorStop(0.5, '#fbbf24'); faceGrad.addColorStop(1, '#b45309');
      } else {
        faceGrad.addColorStop(0, '#f1f5f9'); faceGrad.addColorStop(0.5, '#cbd5e1'); faceGrad.addColorStop(1, '#475569');
      }
      ctx.fillStyle = faceGrad;
      ctx.shadowBlur = 20; ctx.shadowColor = isHeads ? '#fbbf24' : '#94a3b8';
      ctx.beginPath(); ctx.arc(0, 0, coinR, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // Rim
      ctx.strokeStyle = isHeads ? '#78350f' : '#334155'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, 0, coinR - 1, 0, Math.PI * 2); ctx.stroke();
      // Text on coin
      ctx.fillStyle = isHeads ? '#78350f' : '#1e293b'; ctx.font = `bold ${coinR * 0.4}px serif`;
      ctx.textAlign = 'center'; ctx.fillText(isHeads ? 'H' : 'T', 0, coinR * 0.15);
      ctx.font = `${coinR * 0.18}px serif`;
      ctx.fillText(isHeads ? 'HEADS' : 'TAILS', 0, coinR * 0.48);
      // Inner circle decoration
      ctx.strokeStyle = (isHeads ? '#b45309' : '#475569') + '60'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, 0, coinR * 0.72, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      ctx.save(); ctx.translate(cx, cy);
      ctx.restore();
      // Re-draw coin at center
      ctx.save(); ctx.translate(cx, cy); ctx.scale(scaleX, 1);
      ctx.fillStyle = faceGrad;
      ctx.shadowBlur = 20; ctx.shadowColor = isHeads ? '#fbbf24' : '#94a3b8';
      ctx.beginPath(); ctx.arc(0, 0, coinR, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = isHeads ? '#78350f' : '#334155'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, 0, coinR - 1, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = isHeads ? '#78350f' : '#1e293b'; ctx.font = `bold ${coinR * 0.4}px serif`; ctx.textAlign = 'center';
      ctx.fillText(isHeads ? 'H' : 'T', 0, coinR * 0.15);
      ctx.font = `${coinR * 0.18}px serif`; ctx.fillText(isHeads ? 'HEADS' : 'TAILS', 0, coinR * 0.48);
      ctx.strokeStyle = (isHeads ? '#b45309' : '#475569') + '60'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, 0, coinR * 0.72, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();

      // ── Probability bars (right side) ──
      const barX = W * 0.58, barY = cy - 50, barH = 100;
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.beginPath(); ctx.roundRect(barX - 8, barY - 12, W - barX - 4, barH + 40, 8); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1; ctx.stroke();
      const pH = total > 0 ? heads / total : 0.5;
      const pT = total > 0 ? tails / total : 0.5;
      [['Heads', pH, '#fbbf24', cx], ['Tails', pT, '#94a3b8', cx]].forEach(([lbl, prob, col, _], i) => {
        const bx = barX + i * 65, bw = 48;
        const bActualH = (prob as number) * barH;
        const bGrad = ctx.createLinearGradient(bx, barY + barH - bActualH, bx + bw, barY + barH);
        bGrad.addColorStop(0, (col as string) + 'bb'); bGrad.addColorStop(1, (col as string) + '55');
        ctx.fillStyle = bGrad; ctx.shadowBlur = 8; ctx.shadowColor = col as string;
        ctx.beginPath(); ctx.roundRect(bx, barY + barH - bActualH, bw, bActualH, [3, 3, 0, 0]); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = col as string; ctx.lineWidth = 1.5; ctx.stroke();
        // 0.5 reference
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(bx, barY + barH / 2); ctx.lineTo(bx + bw, barY + barH / 2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col as string; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
        ctx.fillText((prob as number).toFixed(3), bx + bw / 2, barY + barH - bActualH - 5);
        ctx.fillStyle = '#64748b'; ctx.font = '9px Inter';
        ctx.fillText(lbl as string, bx + bw / 2, barY + barH + 14);
        ctx.fillStyle = col as string; ctx.font = '9px monospace';
        ctx.fillText(`n=${i === 0 ? heads : tails}`, bx + bw / 2, barY + barH + 26);
      });
      // P=0.5 label
      ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'right';
      ctx.fillText('P=0.5', barX - 2, barY + barH / 2 + 3);

    } else {
      // ── 3D Dice ──
      const dSize = 52;
      const rotateAmt = spinning ? spinRef.current * Math.PI * 6 : 0;
      const val = lastDice.value;
      const shadow3D = Math.abs(Math.sin(rotateAmt));

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(cx, cy + dSize + 15, dSize * 0.8, 9, 0, 0, Math.PI * 2); ctx.fill();

      // Main face
      const diceGrad = ctx.createLinearGradient(cx - dSize, cy - dSize, cx + dSize, cy + dSize);
      diceGrad.addColorStop(0, '#f8fafc'); diceGrad.addColorStop(0.6, '#e2e8f0'); diceGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = diceGrad; ctx.shadowBlur = 15 + shadow3D * 15; ctx.shadowColor = '#60a5fa';
      const dRot = spinning ? Math.sin(rotateAmt) * 0.4 : 0;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(dRot);
      ctx.beginPath(); ctx.roundRect(-dSize, -dSize, dSize * 2, dSize * 2, 12); ctx.fill();
      ctx.shadowBlur = 0;
      // Right side (3D effect)
      const side = ctx.createLinearGradient(dSize, -dSize, dSize + 12, dSize);
      side.addColorStop(0, '#94a3b8'); side.addColorStop(1, '#64748b');
      ctx.fillStyle = side;
      ctx.beginPath();
      ctx.moveTo(dSize, -dSize + 8); ctx.lineTo(dSize + 12, -dSize + 16);
      ctx.lineTo(dSize + 12, dSize + 8); ctx.lineTo(dSize, dSize); ctx.closePath(); ctx.fill();
      // Bottom side
      const bot = ctx.createLinearGradient(-dSize, dSize, dSize, dSize + 12);
      bot.addColorStop(0, '#64748b'); bot.addColorStop(1, '#475569');
      ctx.fillStyle = bot;
      ctx.beginPath();
      ctx.moveTo(-dSize + 8, dSize); ctx.lineTo(dSize, dSize);
      ctx.lineTo(dSize + 12, dSize + 8); ctx.lineTo(-dSize + 16, dSize + 8); ctx.closePath(); ctx.fill();
      // Shine
      const shine2 = ctx.createLinearGradient(-dSize, -dSize, 0, 0);
      shine2.addColorStop(0, 'rgba(255,255,255,0.5)'); shine2.addColorStop(1, 'transparent');
      ctx.fillStyle = shine2; ctx.beginPath(); ctx.roundRect(-dSize, -dSize, dSize, dSize, [12, 0, 0, 0]); ctx.fill();
      // Pips
      ctx.shadowBlur = 0;
      drawDicePips(ctx, 0, 0, dSize * 0.78, spinning ? Math.ceil(spinRef.current * 6) || 1 : val);
      ctx.restore();

      // ── Frequency bars ──
      const barZone = { x: W * 0.54, y: 28, w: W * 0.44, h: H - 65 };
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.beginPath(); ctx.roundRect(barZone.x - 5, barZone.y - 5, barZone.w + 10, barZone.h + 10, 8); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();
      const maxF = Math.max(1, ...diceFreq);
      const bw2 = barZone.w / 6 - 6;
      diceFreq.forEach((f, i) => {
        const bx = barZone.x + i * (barZone.w / 6) + 3;
        const bh3 = (f / maxF) * (barZone.h - 35);
        const by = barZone.y + barZone.h - 35 - bh3;
        const isLast = (i + 1) === lastDice.value && !spinning;
        const colors = ['#ef4444', '#f97316', '#fbbf24', '#22c55e', '#3b82f6', '#a78bfa'];
        const bGrad2 = ctx.createLinearGradient(bx, by, bx + bw2, by + bh3);
        bGrad2.addColorStop(0, colors[i] + 'cc'); bGrad2.addColorStop(1, colors[i] + '44');
        ctx.fillStyle = bGrad2; ctx.shadowBlur = isLast ? 12 : 0; ctx.shadowColor = colors[i];
        ctx.beginPath(); ctx.roundRect(bx, by, bw2, bh3, [3, 3, 0, 0]); ctx.fill();
        ctx.strokeStyle = colors[i]; ctx.lineWidth = isLast ? 2 : 1; ctx.stroke(); ctx.shadowBlur = 0;
        if (bh3 > 16) { ctx.fillStyle = '#fff'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center'; ctx.fillText(f.toString(), bx + bw2 / 2, by + 12); }
        ctx.fillStyle = colors[i]; ctx.font = '10px Inter'; ctx.fillText(['⚀','⚁','⚂','⚃','⚄','⚅'][i], bx + bw2 / 2, barZone.y + barZone.h - 18);
        ctx.fillStyle = '#475569'; ctx.font = '8px monospace';
        ctx.fillText(total > 0 ? (f / total * 100).toFixed(0) + '%' : '0%', bx + bw2 / 2, barZone.y + barZone.h - 5);
      });
      // Expected line
      if (total > 10) {
        const expF = total / 6;
        const ey = barZone.y + barZone.h - 35 - (expF / maxF) * (barZone.h - 35);
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(barZone.x, ey); ctx.lineTo(barZone.x + barZone.w, ey); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '8px Inter'; ctx.textAlign = 'right';
        ctx.fillText('E(f)', barZone.x - 2, ey + 3);
      }
    }

    // Status
    ctx.fillStyle = '#334155'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`Total: ${total}  ·  Expected P = ${mode === 'coin' ? '0.500' : '0.167 each'}`, W / 2, H - 8);

    rafRef.current = requestAnimationFrame(draw);
  }, [mode, lastCoin, lastDice, heads, tails, total, diceFreq, spinning]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const reset = () => { setResults([]); setLastCoin({ face: 'H', angle: 0, spinning: false }); setLastDice({ value: 1, rotating: false }); };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🎲 Probability: Law of Large Numbers</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Empirical → Theoretical probability · Convergence with n→∞</p>
        </div>
        <div className="flex gap-1.5">
          {(['coin', 'dice'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); reset(); }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: mode === m ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)', color: mode === m ? '#fbbf24' : '#475569', border: `1px solid ${mode === m ? 'rgba(251,191,36,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
              {m === 'coin' ? '🪙 Coin' : '🎲 Dice'}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} width={500} height={280} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-2 border-t" style={{ borderColor: 'rgba(251,191,36,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-2">
          {[1, 10, 100, 1000].map(n => (
            <button key={n} onClick={() => mode === 'coin' ? doFlip(n) : doRoll(n)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: n === 1 ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.06)', color: n === 1 ? '#fbbf24' : '#94a3b8', border: `1px solid ${n === 1 ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.08)'}` }}>
              {mode === 'coin' ? 'Flip' : 'Roll'} ×{n}
            </button>
          ))}
          <button onClick={reset} className="px-3 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>↺</button>
        </div>
      </div>
    </div>
  );
};
export default ProbabilityLab;
