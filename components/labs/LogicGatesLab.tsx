import React, { useState, useRef, useEffect, useCallback } from 'react';

const GATES = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as const;
type Gate = typeof GATES[number];

const LOGIC: Record<Gate, (a: number, b: number) => number> = {
  AND: (a, b) => a & b, OR: (a, b) => a | b, NOT: (a, _b) => a === 0 ? 1 : 0,
  NAND: (a, b) => ((a & b) === 0) ? 1 : 0, NOR: (a, b) => ((a | b) === 0) ? 1 : 0,
  XOR: (a, b) => a ^ b, XNOR: (a, b) => (a ^ b) === 0 ? 1 : 0,
};
const EXPRESSIONS: Record<Gate, string> = {
  AND: 'Y = A·B', OR: 'Y = A+B', NOT: 'Y = Ā',
  NAND: 'Y = A̅·̅B̅', NOR: 'Y = A̅+̅B̅', XOR: 'Y = A⊕B', XNOR: 'Y = A⊙B',
};

const LogicGatesLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gate, setGate] = useState<Gate>('AND');
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const rafRef = useRef(0);
  const isUnary = gate === 'NOT';
  const output = LOGIC[gate](inputA, inputB);

  const truthTable = [0, 1].flatMap(a => (isUnary ? [[a, 0]] : [0, 1].map(b => [a, b]))).map(([a, b]) => ({
    a, b, out: LOGIC[gate](a, b), isActive: a === inputA && (isUnary || b === inputB)
  }));

  const drawGate = useCallback((ctx: CanvasRenderingContext2D, cx: number, cy: number, gate: Gate, output: number) => {
    const gW = 80, gH = 60;
    const gx = cx - gW / 2, gy = cy - gH / 2;
    const active = output === 1;

    ctx.shadowBlur = active ? 20 : 8;
    ctx.shadowColor = active ? '#10b981' : '#334155';

    // Gate body
    const gGrad = ctx.createLinearGradient(gx, gy, gx + gW, gy + gH);
    gGrad.addColorStop(0, active ? '#064e3b' : '#1e293b');
    gGrad.addColorStop(1, active ? '#065f46' : '#0f172a');
    ctx.fillStyle = gGrad;

    ctx.beginPath();
    if (gate === 'AND' || gate === 'NAND') {
      ctx.moveTo(gx, gy); ctx.lineTo(gx + gW * 0.5, gy);
      ctx.arc(gx + gW * 0.5, cy, gH / 2, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(gx, gy + gH); ctx.closePath();
    } else if (gate === 'OR' || gate === 'NOR') {
      ctx.moveTo(gx, gy);
      ctx.quadraticCurveTo(gx + gW * 0.3, cy - gH * 0.1, gx + gW, cy);
      ctx.quadraticCurveTo(gx + gW * 0.3, cy + gH * 0.1, gx, gy + gH);
      ctx.quadraticCurveTo(gx + gW * 0.15, cy, gx, gy); ctx.closePath();
    } else if (gate === 'XOR' || gate === 'XNOR') {
      ctx.moveTo(gx + 10, gy);
      ctx.quadraticCurveTo(gx + gW * 0.3 + 10, cy - gH * 0.1, gx + gW, cy);
      ctx.quadraticCurveTo(gx + gW * 0.3 + 10, cy + gH * 0.1, gx + 10, gy + gH);
      ctx.quadraticCurveTo(gx + gW * 0.15 + 10, cy, gx + 10, gy); ctx.closePath();
    } else if (gate === 'NOT') {
      ctx.moveTo(gx, gy); ctx.lineTo(gx + gW - 12, cy); ctx.lineTo(gx, gy + gH); ctx.closePath();
    } else { ctx.roundRect(gx, gy, gW, gH, 6); }
    ctx.fill();
    ctx.strokeStyle = active ? '#10b981' : '#334155'; ctx.lineWidth = 2; ctx.stroke();
    ctx.shadowBlur = 0;

    // XOR extra curve
    if (gate === 'XOR' || gate === 'XNOR') {
      ctx.beginPath();
      ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + gW * 0.15, cy, gx, gy + gH);
      ctx.strokeStyle = active ? '#10b981' : '#334155'; ctx.lineWidth = 2; ctx.stroke();
    }

    // Bubble for NAND/NOR/NOT/XNOR
    if (['NAND', 'NOR', 'NOT', 'XNOR'].includes(gate)) {
      const bubbleX = gate === 'NOT' ? gx + gW - 8 : gx + gW;
      ctx.shadowBlur = active ? 8 : 0; ctx.shadowColor = '#10b981';
      ctx.strokeStyle = active ? '#10b981' : '#475569'; ctx.fillStyle = active ? '#065f46' : '#1e293b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(bubbleX + 5, cy, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Gate label
    ctx.fillStyle = active ? '#34d399' : '#94a3b8'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
    ctx.fillText(gate, cx, cy + 5);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = W / 2 - 30, cy = H / 2 - 10;
    const active = output === 1;

    const drawWire = (x1: number, y1: number, x2: number, y2: number, high: boolean) => {
      ctx.shadowBlur = high ? 8 : 0; ctx.shadowColor = '#10b981';
      ctx.strokeStyle = high ? '#10b981' : '#334155'; ctx.lineWidth = high ? 2.5 : 1.5;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawInput = (x: number, y: number, val: number, label: string) => {
      const high = val === 1;
      ctx.shadowBlur = high ? 12 : 0; ctx.shadowColor = '#10b981';
      const iGrad = ctx.createRadialGradient(x, y, 3, x, y, 18);
      iGrad.addColorStop(0, high ? '#10b981' : '#1e293b');
      iGrad.addColorStop(1, high ? '#064e3b' : '#0f172a');
      ctx.fillStyle = iGrad; ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = high ? '#10b981' : '#334155'; ctx.lineWidth = 2; ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = high ? '#34d399' : '#64748b'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center';
      ctx.fillText(val.toString(), x, y + 5);
      ctx.fillStyle = '#64748b'; ctx.font = 'bold 10px Inter';
      ctx.fillText(label, x, y - 24);
    };

    const drawOutput = (x: number, y: number, val: number) => {
      const high = val === 1;
      ctx.shadowBlur = high ? 20 : 6; ctx.shadowColor = high ? '#10b981' : '#475569';
      const oGrad = ctx.createRadialGradient(x, y, 4, x, y, 26);
      oGrad.addColorStop(0, high ? '#10b981' : '#334155');
      oGrad.addColorStop(1, high ? '#065f46' : '#1e293b');
      ctx.fillStyle = oGrad; ctx.beginPath(); ctx.arc(x, y, 24, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = high ? '#34d399' : '#475569'; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = high ? '#6ee7b7' : '#94a3b8'; ctx.font = 'bold 18px monospace'; ctx.textAlign = 'center';
      ctx.fillText(val.toString(), x, y + 7);
      ctx.fillStyle = high ? '#34d399' : '#64748b'; ctx.font = 'bold 9px Inter';
      ctx.fillText('Y (Output)', x, y + 38);
    };

    // Input nodes
    const inA_X = cx - 160, inA_Y = isUnary ? cy : cy - 22;
    const inB_X = cx - 160, inB_Y = cy + 22;
    const outX = cx + 120 + (['NAND', 'NOR', 'NOT', 'XNOR'].includes(gate) ? 12 : 0);

    drawInput(inA_X, inA_Y, inputA, 'A');
    if (!isUnary) drawInput(inB_X, inB_Y, inputB, 'B');

    // Input wires to gate
    const gateInX = cx - 40;
    drawWire(inA_X + 18, inA_Y, gateInX, isUnary ? cy : cy - 15, inputA === 1);
    if (!isUnary) drawWire(inB_X + 18, inB_Y, gateInX, cy + 15, inputB === 1);

    // Gate
    drawGate(ctx, cx, cy, gate, output);

    // Output wire
    const gateOutX = cx + 40 + (['NAND', 'NOR', 'NOT', 'XNOR'].includes(gate) ? 10 : 0);
    drawWire(gateOutX, cy, outX - 24, cy, active);
    drawOutput(outX, cy, output);

    // Expression
    ctx.fillStyle = active ? '#34d399' : '#475569'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(EXPRESSIONS[gate], cx, H - 12);

    rafRef.current = requestAnimationFrame(draw);
  }, [gate, inputA, inputB, output, isUnary, drawGate]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">⚡ Logic Gates: Interactive Circuit</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">AND · OR · NOT · NAND · NOR · XOR · XNOR · Truth tables</p>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded-lg font-bold" style={{ background: output === 1 ? 'rgba(16,185,129,0.2)' : 'rgba(30,41,59,0.5)', color: output === 1 ? '#10b981' : '#475569', border: '1px solid rgba(255,255,255,0.08)' }}>
          Y = {output}
        </div>
      </div>
      <canvas ref={canvasRef} width={520} height={220} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(16,185,129,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex flex-wrap gap-1.5">
          {GATES.map(g => (
            <button key={g} onClick={() => { setGate(g); if (g === 'NOT') setInputB(0); }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: g === gate ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.04)', color: g === gate ? '#10b981' : '#475569', border: `1px solid ${g === gate ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.07)'}` }}>
              {g}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setInputA(a => a === 0 ? 1 : 0)}
            className="flex-1 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: inputA === 1 ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.06)', color: inputA === 1 ? '#10b981' : '#64748b', border: `1px solid ${inputA === 1 ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}` }}>
            A = {inputA}
          </button>
          {!isUnary && (
            <button onClick={() => setInputB(b => b === 0 ? 1 : 0)}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm"
              style={{ background: inputB === 1 ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.06)', color: inputB === 1 ? '#10b981' : '#64748b', border: `1px solid ${inputB === 1 ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}` }}>
              B = {inputB}
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] font-mono">
            <thead>
              <tr>
                <th className="py-1 px-2 text-zinc-500 text-left font-bold">A</th>
                {!isUnary && <th className="py-1 px-2 text-zinc-500 text-left font-bold">B</th>}
                <th className="py-1 px-2 text-zinc-500 text-left font-bold">Y</th>
              </tr>
            </thead>
            <tbody>
              {truthTable.map((row, i) => (
                <tr key={`${row.a}-${row.b}-${row.out}`} style={{ background: row.isActive ? 'rgba(16,185,129,0.12)' : 'transparent', borderRadius: '6px' }}>
                  <td className="py-0.5 px-2" style={{ color: row.a ? '#10b981' : '#475569' }}>{row.a}</td>
                  {!isUnary && <td className="py-0.5 px-2" style={{ color: row.b ? '#10b981' : '#475569' }}>{row.b}</td>}
                  <td className="py-0.5 px-2 font-bold" style={{ color: row.out ? '#34d399' : '#64748b' }}>{row.out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LogicGatesLab;
