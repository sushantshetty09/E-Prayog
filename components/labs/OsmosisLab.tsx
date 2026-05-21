import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Molecule { x: number; y: number; vx: number; vy: number; side: 'L' | 'R'; progress: number; }

const OsmosisLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timeRef = useRef(0);
  const rafRef = useRef(0);
  const molsRef = useRef<Molecule[]>([]);
  const lastFrameRef = useRef(0);

  // Spawn initial water molecules on left (pure water) side
  useEffect(() => {
    const mols: Molecule[] = [];
    for (let i = 0; i < 30; i++) {
      mols.push({
        x: 60 + Math.random() * 130,
        y: 120 + Math.random() * 170,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        side: 'L',
        progress: 0,
      });
    }
    // Fewer on right (sugar solution)
    for (let i = 0; i < 12; i++) {
      mols.push({
        x: 340 + Math.random() * 130,
        y: 120 + Math.random() * 170,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        side: 'R',
        progress: 0,
      });
    }
    molsRef.current = mols;
  }, []);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const dt = lastFrameRef.current ? Math.min(32, ts - lastFrameRef.current) : 16;
    lastFrameRef.current = ts;

    const t = timeRef.current;
    // Rise on right, fall on left
    const maxRise = 55;
    const riseR = Math.min(maxRise, t * 0.18);
    const fallL = riseR * 0.35;

    // ── Background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#06080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = W / 2;
    const tubeTopY = 40, tubeH = 280, tubeW = 60;
    const leftX = 130, rightX = 370;
    const membraneY = tubeTopY + tubeH; // bottom where they join

    // ── U-tube arms ──
    // Left arm outer wall
    const drawArm = (ax: number, topY: number, color: string) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ax - tubeW / 2, topY);
      ctx.lineTo(ax - tubeW / 2, membraneY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax + tubeW / 2, topY);
      ctx.lineTo(ax + tubeW / 2, membraneY);
      ctx.stroke();
    };

    // U-bend bottom connector
    const bendY = membraneY;
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftX - tubeW / 2, bendY);
    ctx.quadraticCurveTo(cx - tubeW / 2, bendY + 45, cx - tubeW / 2, bendY + 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(leftX + tubeW / 2, bendY);
    ctx.quadraticCurveTo(cx - tubeW / 2 + tubeW, bendY + 45, cx - tubeW / 2 + tubeW, bendY + 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightX - tubeW / 2, bendY);
    ctx.quadraticCurveTo(cx + tubeW / 2 - tubeW, bendY + 45, cx + tubeW / 2 - tubeW, bendY + 30);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightX + tubeW / 2, bendY);
    ctx.quadraticCurveTo(cx + tubeW / 2, bendY + 45, cx + tubeW / 2, bendY + 30);
    ctx.stroke();

    // ── Semi-permeable membrane (at junction) ──
    const memX1 = cx - tubeW / 2 + 2, memX2 = cx + tubeW / 2 - 2;
    const memY = bendY + 30;
    // Membrane base
    ctx.fillStyle = 'rgba(251,191,36,0.15)';
    ctx.fillRect(memX1, memY - 4, memX2 - memX1, 8);
    // Dotted pores
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(memX1, memY); ctx.lineTo(memX2, memY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fbbf24'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Semi-permeable membrane', cx, memY + 16);

    // ── Left arm water (pure water) ──
    const leftWaterTop = tubeTopY + 80 + fallL;
    const leftWaterGrad = ctx.createLinearGradient(leftX - tubeW / 2, leftWaterTop, leftX + tubeW / 2, bendY);
    leftWaterGrad.addColorStop(0, 'rgba(56,189,248,0.25)');
    leftWaterGrad.addColorStop(1, 'rgba(14,165,233,0.5)');
    ctx.fillStyle = leftWaterGrad;
    ctx.fillRect(leftX - tubeW / 2 + 2, leftWaterTop, tubeW - 4, bendY - leftWaterTop);

    // Meniscus left
    ctx.beginPath();
    ctx.moveTo(leftX - tubeW / 2 + 2, leftWaterTop);
    ctx.quadraticCurveTo(leftX, leftWaterTop + 6, leftX + tubeW / 2 - 2, leftWaterTop);
    ctx.fillStyle = 'rgba(56,189,248,0.5)'; ctx.fill();

    // ── Right arm sugar solution ──
    const rightWaterTop = tubeTopY + 80 - riseR;
    const rightWaterGrad = ctx.createLinearGradient(rightX - tubeW / 2, rightWaterTop, rightX + tubeW / 2, bendY);
    rightWaterGrad.addColorStop(0, 'rgba(167,139,250,0.3)');
    rightWaterGrad.addColorStop(1, 'rgba(109,40,217,0.55)');
    ctx.fillStyle = rightWaterGrad;
    ctx.fillRect(rightX - tubeW / 2 + 2, rightWaterTop, tubeW - 4, bendY - rightWaterTop);

    // Meniscus right
    ctx.beginPath();
    ctx.moveTo(rightX - tubeW / 2 + 2, rightWaterTop);
    ctx.quadraticCurveTo(rightX, rightWaterTop + 6, rightX + tubeW / 2 - 2, rightWaterTop);
    ctx.fillStyle = 'rgba(139,92,246,0.5)'; ctx.fill();

    // Draw tube walls on top
    drawArm(leftX, tubeTopY, 'rgba(148,163,184,0.35)');
    drawArm(rightX, tubeTopY, 'rgba(148,163,184,0.35)');

    // Tube tops
    ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(leftX - tubeW / 2 - 4, tubeTopY); ctx.lineTo(leftX + tubeW / 2 + 4, tubeTopY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rightX - tubeW / 2 - 4, tubeTopY); ctx.lineTo(rightX + tubeW / 2 + 4, tubeTopY); ctx.stroke();

    // ── Water molecules (little circles with H₂O) ──
    const leftLiquidBounds = { x1: leftX - tubeW / 2 + 4, x2: leftX + tubeW / 2 - 4, y1: leftWaterTop + 5, y2: bendY - 5 };
    const rightLiquidBounds = { x1: rightX - tubeW / 2 + 4, x2: rightX + tubeW / 2 - 4, y1: rightWaterTop + 5, y2: bendY - 5 };

    molsRef.current.forEach((mol, i) => {
      if (!running) {
        // Still visible, no movement
        const bounds = mol.side === 'L' ? leftLiquidBounds : rightLiquidBounds;
        ctx.beginPath(); ctx.arc(mol.x, mol.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = mol.side === 'L' ? 'rgba(56,189,248,0.7)' : 'rgba(167,139,250,0.5)';
        ctx.fill();
        return;
      }
      // Bounce within bounds
      const bounds = mol.side === 'L' ? leftLiquidBounds : rightLiquidBounds;
      let { x, y, vx, vy } = mol;
      x += vx * dt * 0.06; y += vy * dt * 0.06;

      if (x < bounds.x1 || x > bounds.x2) vx *= -1;
      if (y < bounds.y1 || y > bounds.y2) vy *= -1;
      x = Math.max(bounds.x1, Math.min(bounds.x2, x));
      y = Math.max(bounds.y1, Math.min(bounds.y2, y));

      // Randomly cross membrane from left to right (net osmosis direction)
      if (mol.side === 'L' && y > bendY - 12 && Math.random() < 0.0008 * dt) {
        mol.side = 'R';
        mol.x = rightX; mol.y = memY;
        mol.vx = (Math.random() - 0.5) * 0.6;
        mol.vy = -0.5;
      }

      mol.x = x; mol.y = y; mol.vx = vx; mol.vy = vy;

      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      const alpha = mol.side === 'L' ? 0.7 : 0.5;
      ctx.fillStyle = mol.side === 'L' ? `rgba(56,189,248,${alpha})` : `rgba(167,139,250,${alpha})`;
      ctx.fill();
      ctx.strokeStyle = mol.side === 'L' ? 'rgba(14,165,233,0.5)' : 'rgba(109,40,217,0.4)';
      ctx.lineWidth = 0.8; ctx.stroke();
    });

    // Osmotic pressure arrow on right
    if (riseR > 5) {
      ctx.strokeStyle = `rgba(167,139,250,${Math.min(0.8, riseR / 30)})`;
      ctx.fillStyle = `rgba(167,139,250,${Math.min(0.8, riseR / 30)})`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(rightX + tubeW / 2 + 10, rightWaterTop + riseR * 0.5);
      ctx.lineTo(rightX + tubeW / 2 + 10, rightWaterTop + 2);
      ctx.lineTo(rightX + tubeW / 2 + 6, rightWaterTop + 10); ctx.moveTo(rightX + tubeW / 2 + 10, rightWaterTop + 2);
      ctx.lineTo(rightX + tubeW / 2 + 14, rightWaterTop + 10);
      ctx.stroke();
      ctx.font = '8px Inter'; ctx.textAlign = 'left';
      ctx.fillText(`+${riseR.toFixed(1)} mm`, rightX + tubeW / 2 + 4, rightWaterTop - 4);
    }

    // Flow arrows at membrane
    if (running && t > 0) {
      ctx.strokeStyle = 'rgba(56,189,248,0.6)'; ctx.fillStyle = 'rgba(56,189,248,0.6)';
      ctx.lineWidth = 1.5;
      const anim = (ts * 0.002) % 1;
      const ax = memX1 + (memX2 - memX1) * anim;
      ctx.beginPath(); ctx.moveTo(ax, memY - 6); ctx.lineTo(ax, memY + 6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ax - 3, memY + 2); ctx.lineTo(ax, memY + 6); ctx.lineTo(ax + 3, memY + 2); ctx.fill();
    }

    // ── Labels ──
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 10px Inter';
    ctx.fillText('Pure Water', leftX, tubeTopY - 8);
    ctx.fillStyle = '#a78bfa'; ctx.font = 'bold 10px Inter';
    ctx.fillText('Sugar Solution', rightX, tubeTopY - 8);
    ctx.fillStyle = '#64748b'; ctx.font = '8px Inter';
    ctx.fillText('(High Ψ)', leftX, tubeTopY + 2);
    ctx.fillText('(Low Ψ)', rightX, tubeTopY + 2);

    // Osmotic pressure result
    if (riseR > 2) {
      ctx.shadowBlur = 8; ctx.shadowColor = '#a78bfa';
      ctx.fillStyle = '#e9d5ff'; ctx.font = 'bold 10px Inter';
      ctx.fillText(`Osmotic pressure: ${(riseR * 0.12).toFixed(2)} atm`, cx, H - 8);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#475569'; ctx.font = '10px Inter';
      ctx.fillText(running ? 'Osmosis in progress — water moving right →' : 'Start to observe osmosis across membrane', cx, H - 8);
    }

    if (running) {
      timeRef.current += dt * 0.05;
      setElapsed(Math.floor(timeRef.current));
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [running]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const handleReset = () => {
    setRunning(false); setElapsed(0); timeRef.current = 0;
    molsRef.current = molsRef.current.map(m => ({
      ...m, side: m.x < 250 ? 'L' : 'R',
      x: m.x < 250 ? 60 + Math.random() * 130 : 340 + Math.random() * 130,
      y: 120 + Math.random() * 170,
    }));
  };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(56,189,248,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🌊 Osmosis — U-Tube Osmometer</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Water potential gradient drives net movement of water molecules</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>🔄 Reset</button>
        </div>
      </div>

      <canvas ref={canvasRef} width={500} height={370} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(56,189,248,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <button onClick={() => setRunning(r => !r)}
          className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: running ? 'rgba(239,68,68,0.15)' : 'rgba(56,189,248,0.15)', color: running ? '#f87171' : '#38bdf8', border: `1px solid ${running ? 'rgba(239,68,68,0.3)' : 'rgba(56,189,248,0.3)'}` }}>
          {running ? '⏸ Pause Osmosis' : '▶ Start Osmosis'}
        </button>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Time (s)', val: elapsed.toString(), color: '#94a3b8' },
            { label: 'Rise (mm)', val: Math.min(55, elapsed * 0.18).toFixed(1), color: '#a78bfa' },
            { label: 'Osmotic P.', val: `${(Math.min(55, elapsed * 0.18) * 0.12).toFixed(2)} atm`, color: '#34d399' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[8px] uppercase tracking-widest text-zinc-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-zinc-500 text-center px-2">
          Water (high Ψ) → membrane → Sugar solution (low Ψ) · Net osmosis raises right column
        </div>
      </div>
    </div>
  );
};
export default OsmosisLab;
