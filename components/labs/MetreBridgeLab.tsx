import React, { useState, useRef, useEffect, useCallback } from 'react';

const MetreBridgeLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [knownR, setKnownR] = useState(10);
  const [jockeyPos, setJockeyPos] = useState(40); // cm, 0-100
  const [balanced, setBalanced] = useState(false);
  const rafRef = useRef(0);

  const unknownR = parseFloat((knownR * (100 - jockeyPos) / jockeyPos).toFixed(2));
  // Galvanometer deflection: 0 at balance (null deflection)
  const galvDeflection = Math.min(90, Math.abs(jockeyPos - 40) * 2); // faked, in reality it's when Wheatstone is balanced
  const isBalanced = jockeyPos === 40; // for demo, balance at 40cm

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // ── Lab bench ──
    const bench = ctx.createLinearGradient(0, H - 20, 0, H);
    bench.addColorStop(0, '#1e1408'); bench.addColorStop(1, '#0d0904');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 20, W, 20);

    const wireLeft = 50, wireRight = W - 50, wireY = H / 2 - 10;
    const wireLen = wireRight - wireLeft;

    // ── Metre bridge board (wooden base) ──
    const boardGrad = ctx.createLinearGradient(wireLeft - 15, wireY - 20, wireLeft - 15, wireY + 55);
    boardGrad.addColorStop(0, '#7c4b1e'); boardGrad.addColorStop(1, '#3d2408');
    ctx.fillStyle = boardGrad;
    ctx.beginPath(); ctx.roundRect(wireLeft - 15, wireY - 20, wireLen + 30, 75, 5); ctx.fill();
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();

    // Wood grain
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 0.8;
    for (let i = 0; i < 12; i++) {
      const gx = wireLeft - 10 + i * (wireLen + 20) / 11;
      ctx.beginPath(); ctx.moveTo(gx, wireY - 20); ctx.lineTo(gx + 3, wireY + 55); ctx.stroke();
    }

    // ── Resistance wire ──
    const wireGrad = ctx.createLinearGradient(wireLeft, wireY, wireRight, wireY);
    wireGrad.addColorStop(0, '#fbbf24'); wireGrad.addColorStop(0.5, '#f59e0b'); wireGrad.addColorStop(1, '#fbbf24');
    ctx.strokeStyle = wireGrad; ctx.lineWidth = 3;
    ctx.shadowBlur = 4; ctx.shadowColor = 'rgba(251,191,36,0.3)';
    ctx.beginPath(); ctx.moveTo(wireLeft, wireY); ctx.lineTo(wireRight, wireY); ctx.stroke();
    ctx.shadowBlur = 0;

    // Cm ruler markings on wire
    ctx.strokeStyle = 'rgba(180,140,60,0.4)'; ctx.lineWidth = 0.8;
    ctx.fillStyle = 'rgba(180,140,60,0.6)'; ctx.font = '7px Inter'; ctx.textAlign = 'center';
    for (let cm = 0; cm <= 100; cm += 10) {
      const rx = wireLeft + (cm / 100) * wireLen;
      const tickH = cm % 50 === 0 ? 10 : cm % 10 === 0 ? 7 : 4;
      ctx.beginPath(); ctx.moveTo(rx, wireY + 3); ctx.lineTo(rx, wireY + tickH); ctx.stroke();
      if (cm % 10 === 0) ctx.fillText(cm.toString(), rx, wireY + 16);
    }
    ctx.fillStyle = 'rgba(160,120,50,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('cm', wireRight + 10, wireY + 16);

    // ── End terminals A, B ──
    [wireLeft, wireRight].forEach((tx, i) => {
      const termGrad = ctx.createRadialGradient(tx, wireY, 2, tx, wireY, 10);
      termGrad.addColorStop(0, '#94a3b8'); termGrad.addColorStop(1, '#334155');
      ctx.fillStyle = termGrad;
      ctx.beginPath(); ctx.arc(tx, wireY, 9, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(i === 0 ? 'A' : 'B', tx, wireY + 3);
    });

    // ── Jockey (sliding contact) ──
    const jx = wireLeft + (jockeyPos / 100) * wireLen;
    // Jockey slider body
    const jGrad = ctx.createLinearGradient(jx - 8, wireY - 35, jx + 8, wireY);
    jGrad.addColorStop(0, '#64748b'); jGrad.addColorStop(0.5, '#94a3b8'); jGrad.addColorStop(1, '#475569');
    ctx.fillStyle = jGrad;
    ctx.beginPath(); ctx.roundRect(jx - 7, wireY - 35, 14, 35, 3); ctx.fill();
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1; ctx.stroke();
    // Contact tip
    ctx.shadowBlur = isBalanced ? 12 : 4; ctx.shadowColor = isBalanced ? '#10b981' : '#fbbf24';
    ctx.fillStyle = isBalanced ? '#10b981' : '#fbbf24';
    ctx.beginPath(); ctx.arc(jx, wireY, 5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    // Position label
    ctx.fillStyle = isBalanced ? '#10b981' : '#fbbf24'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`l = ${jockeyPos} cm`, jx, wireY - 42);

    // ── Known R (left box) ──
    const rBoxX = wireLeft + 5, rBoxY = wireY + 30;
    ctx.fillStyle = 'rgba(245,158,11,0.15)';
    ctx.beginPath(); ctx.roundRect(rBoxX, rBoxY, 90, 30, 6); ctx.fill();
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.5; ctx.stroke();
    // Resistor bands inside
    [['#ef4444', 4], ['#fbbf24', 10], ['#f97316', 16]].forEach(([c, ox]) => {
      ctx.fillStyle = c as string; ctx.fillRect(rBoxX + (ox as number), rBoxY + 5, 5, 20);
    });
    ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`R = ${knownR} Ω`, rBoxX + 45, rBoxY + 44);

    // ── Unknown R (right box) ──
    const sBoxX = wireRight - 95, sBoxY = wireY + 30;
    ctx.fillStyle = 'rgba(56,189,248,0.15)';
    ctx.beginPath(); ctx.roundRect(sBoxX, sBoxY, 90, 30, 6); ctx.fill();
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#38bdf8'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`S = ${unknownR} Ω`, sBoxX + 45, sBoxY + 20);
    ctx.fillStyle = '#64748b'; ctx.font = '8px Inter';
    ctx.fillText('(unknown)', sBoxX + 45, sBoxY + 44);

    // ── Connecting wires ──
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 1.5;
    // Outer circuit: battery + R + S
    ctx.beginPath();
    ctx.moveTo(wireLeft, wireY); ctx.lineTo(wireLeft, wireY + 30);
    ctx.lineTo(rBoxX + 90, wireY + 45); ctx.moveTo(rBoxX, wireY + 45);
    ctx.lineTo(wireLeft - 15, wireY + 45); ctx.lineTo(wireLeft - 15, wireY + 75);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(wireRight, wireY); ctx.lineTo(wireRight, wireY + 30);
    ctx.lineTo(sBoxX, wireY + 45); ctx.moveTo(sBoxX + 90, wireY + 45);
    ctx.lineTo(wireRight + 15, wireY + 45); ctx.lineTo(wireRight + 15, wireY + 75);
    ctx.stroke();
    // Battery bottom
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(wireLeft - 15, wireY + 75); ctx.lineTo(W / 2 - 22, wireY + 75); ctx.stroke();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2 + 22, wireY + 75); ctx.lineTo(wireRight + 15, wireY + 75); ctx.stroke();
    // Battery symbol
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W / 2 - 18, wireY + 68); ctx.lineTo(W / 2 + 18, wireY + 68); ctx.stroke();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2 - 10, wireY + 75); ctx.lineTo(W / 2 + 10, wireY + 75); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Battery (E)', W / 2, wireY + 90);

    // Galvanometer connection from jockey
    const galvX = W / 2, galvY = wireY - 90;
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(jx, wireY - 35); ctx.lineTo(jx, galvY + 22); ctx.lineTo(galvX, galvY + 22); ctx.stroke();
    ctx.setLineDash([]);

    // ── Galvanometer ──
    const galvR = 24;
    const galvBodyGrad = ctx.createRadialGradient(galvX, galvY, 4, galvX, galvY, galvR);
    galvBodyGrad.addColorStop(0, '#1e293b'); galvBodyGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = galvBodyGrad; ctx.beginPath(); ctx.arc(galvX, galvY, galvR, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = isBalanced ? '#10b981' : '#a78bfa'; ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = isBalanced ? 12 : 0; ctx.shadowColor = '#10b981';

    // Galvanometer scale arc
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(galvX, galvY, galvR - 6, Math.PI * 0.7, Math.PI * 0.3, false); ctx.stroke();
    // Needle
    const needleAngle = Math.PI * 1.5 + (isBalanced ? 0 : (jockeyPos < 40 ? -1 : 1) * Math.min(60, Math.abs(jockeyPos - 40) * 2) * Math.PI / 180);
    ctx.strokeStyle = isBalanced ? '#10b981' : '#ef4444'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(galvX, galvY);
    ctx.lineTo(galvX + Math.cos(needleAngle) * (galvR - 8), galvY + Math.sin(needleAngle) * (galvR - 8)); ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(galvX, galvY, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = isBalanced ? '#10b981' : '#a78bfa'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText('G', galvX, galvY + 4);

    // Status
    if (isBalanced) {
      ctx.shadowBlur = 10; ctx.shadowColor = '#10b981';
      ctx.fillStyle = '#10b981'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
      ctx.fillText('✓ BALANCED — Galvanometer shows zero deflection!', W / 2, H - 8);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#64748b'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`S = R×(100−l)/l = ${knownR}×${100 - jockeyPos}/${jockeyPos} = ${unknownR} Ω`, W / 2, H - 8);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [knownR, jockeyPos, unknownR, isBalanced]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔌 Metre Bridge — Wheatstone's Principle</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">S = R(100−l)/l · Null deflection method · Unknown resistance</p>
        </div>
        <div className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: isBalanced ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)', color: isBalanced ? '#10b981' : '#f87171', border: `1px solid ${isBalanced ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}` }}>
          {isBalanced ? '✓ Balanced' : '⚡ Deflection'}
        </div>
      </div>

      <canvas ref={canvasRef} width={540} height={320} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(245,158,11,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-3">
          <label className="text-xs text-amber-400 whitespace-nowrap">Known R (Ω)</label>
          <input type="range" min={1} max={50} step={1} value={knownR}
            onChange={e => setKnownR(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-amber-400" />
          <span className="text-xs font-mono text-amber-400 w-12 text-right">{knownR} Ω</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-emerald-400 whitespace-nowrap">Jockey pos (cm)</label>
          <input type="range" min={5} max={95} step={1} value={jockeyPos}
            onChange={e => setJockeyPos(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-full accent-emerald-400" />
          <span className="text-xs font-mono text-emerald-400 w-12 text-right">{jockeyPos} cm</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Known R', val: `${knownR} Ω`, color: '#f59e0b' },
            { label: 'Balance pt l', val: `${jockeyPos} cm`, color: '#34d399' },
            { label: 'Unknown S', val: `${unknownR} Ω`, color: '#38bdf8' },
          ].map(d => (
            <div key={d.label} className="rounded-xl p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[8px] uppercase tracking-widest text-slate-500">{d.label}</div>
              <div className="text-sm font-bold font-mono mt-1" style={{ color: d.color }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MetreBridgeLab;
