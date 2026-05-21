import React, { useState, useRef, useEffect, useCallback } from 'react';

const CATIONS = [
  {
    id: 'Fe³⁺', name: 'Iron(III)', color: '#b45309',
    tests: [
      { reagent: 'NaOH',     result: 'Brown ↓ Fe(OH)₃',       precip: '#b45309', positive: true },
      { reagent: 'NH₄OH',    result: 'Brown ↓ Fe(OH)₃',       precip: '#92400e', positive: true },
      { reagent: 'KSCN',     result: 'Blood red Fe(SCN)³',     precip: '#dc2626', positive: true },
    ],
    confirmTest: 'KSCN gives blood-red colour (thiocyanate complex)',
  },
  {
    id: 'Cu²⁺', name: 'Copper(II)', color: '#0891b2',
    tests: [
      { reagent: 'NaOH',     result: 'Blue ↓ Cu(OH)₂',        precip: '#1d4ed8', positive: true },
      { reagent: 'NH₄OH',    result: 'Deep blue [Cu(NH₃)₄]²⁺', precip: '#1e40af', positive: true },
      { reagent: 'Na₂S',     result: 'Black ↓ CuS',            precip: '#1c1c1c', positive: true },
    ],
    confirmTest: 'NH₄OH (excess) → deep blue tetraamine copper(II) complex',
  },
  {
    id: 'Zn²⁺', name: 'Zinc', color: '#64748b',
    tests: [
      { reagent: 'NaOH',     result: 'White ↓ Zn(OH)₂ (amphoteric)', precip: '#e2e8f0', positive: true },
      { reagent: 'NH₄OH',    result: 'White ↓ Zn(OH)₂',              precip: '#f1f5f9', positive: true },
      { reagent: 'H₂S',      result: 'White ↓ ZnS (in alkaline)',      precip: '#f8fafc', positive: true },
    ],
    confirmTest: 'Flame test: no colour. White ppt soluble in excess NaOH.',
  },
  {
    id: 'Pb²⁺', name: 'Lead', color: '#475569',
    tests: [
      { reagent: 'H₂SO₄',   result: 'White ↓ PbSO₄',         precip: '#f1f5f9', positive: true },
      { reagent: 'HCl',      result: 'White ↓ PbCl₂ (hot→cold)',precip: '#e2e8f0', positive: true },
      { reagent: 'K₂CrO₄',  result: 'Yellow ↓ PbCrO₄',        precip: '#fbbf24', positive: true },
    ],
    confirmTest: 'K₂CrO₄ → chrome yellow PbCrO₄ precipitate',
  },
  {
    id: 'Ca²⁺', name: 'Calcium', color: '#16a34a',
    tests: [
      { reagent: 'H₂SO₄',   result: 'White ↓ CaSO₄ (sparingly)', precip: '#f1f5f9', positive: true },
      { reagent: '(NH₄)₂C₂O₄', result: 'White ↓ CaC₂O₄',       precip: '#fafafa', positive: true },
      { reagent: 'Flame',    result: 'Brick-red flame',            precip: '#dc2626', positive: true },
    ],
    confirmTest: 'Flame test: brick-red colour (Ca characteristic)',
  },
];

const CationAnalysisLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [catIdx, setCatIdx] = useState(0);
  const [testIdx, setTestIdx] = useState(0);
  const [reacted, setReacted] = useState(false);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => { setReacted(false); setTestIdx(0); tRef.current = 0; }, [catIdx]);

  const cation = CATIONS[catIdx];
  const test = cation.tests[testIdx];

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1a1408'; ctx.fillRect(0, H - 22, W, 22);

    if (reacted) tRef.current = Math.min(1, tRef.current + 0.012);
    const t2 = tRef.current;
    const cx = W / 2;
    const isFlame = test.reagent === 'Flame';

    const drawTube = (x: number, label: string, solColor: string) => {
      const ttW = 34, ttTop = 38, ttBot = H - 48;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x - ttW / 2, ttTop); ctx.lineTo(x - ttW / 2, ttBot - 7);
      ctx.quadraticCurveTo(x - ttW / 2, ttBot, x, ttBot);
      ctx.quadraticCurveTo(x + ttW / 2, ttBot, x + ttW / 2, ttBot - 7);
      ctx.lineTo(x + ttW / 2, ttTop); ctx.closePath(); ctx.clip();

      const solGrad = ctx.createLinearGradient(x - ttW / 2, ttTop + 15, x + ttW / 2, ttBot);
      solGrad.addColorStop(0, solColor + '55'); solGrad.addColorStop(1, solColor + '30');
      ctx.fillStyle = solGrad; ctx.fillRect(x - ttW / 2, ttTop + 15, ttW, ttBot - ttTop - 15);

      // Precipitate
      if (reacted && test.positive && !isFlame) {
        const ph = 24 * t2;
        const pGrad = ctx.createLinearGradient(x, ttBot - ph, x, ttBot);
        pGrad.addColorStop(0, test.precip + '99'); pGrad.addColorStop(1, test.precip + 'ff');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.moveTo(x - ttW / 2 + 2, ttBot - ph);
        ctx.quadraticCurveTo(x, ttBot - ph + 4, x + ttW / 2 - 2, ttBot - ph);
        ctx.lineTo(x + ttW / 2 - 2, ttBot - 5);
        ctx.quadraticCurveTo(x, ttBot + 3, x - ttW / 2 + 2, ttBot - 5);
        ctx.closePath(); ctx.fill();

        // Color change in solution
        if (test.reagent === 'KSCN') {
          ctx.fillStyle = `rgba(220,38,38,${t2 * 0.5})`;
          ctx.fillRect(x - ttW / 2, ttTop + 15, ttW, ttBot - ttTop - 15);
        }
      }
      ctx.restore();

      // Glass tube
      ctx.beginPath();
      ctx.moveTo(x - ttW / 2, ttTop); ctx.lineTo(x - ttW / 2, ttBot - 7);
      ctx.quadraticCurveTo(x - ttW / 2, ttBot, x, ttBot);
      ctx.quadraticCurveTo(x + ttW / 2, ttBot, x + ttW / 2, ttBot - 7);
      ctx.lineTo(x + ttW / 2, ttTop);
      const gG = ctx.createLinearGradient(x - ttW / 2, 0, x + ttW / 2, 0);
      gG.addColorStop(0, 'rgba(255,255,255,0.15)'); gG.addColorStop(0.25, 'rgba(255,255,255,0.05)');
      gG.addColorStop(0.75, 'rgba(255,255,255,0.04)'); gG.addColorStop(1, 'rgba(255,255,255,0.12)');
      ctx.fillStyle = gG; ctx.fill();
      ctx.strokeStyle = 'rgba(148,163,184,0.45)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - ttW / 2 + 4, ttTop + 10); ctx.lineTo(x - ttW / 2 + 4, ttBot - 20); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText(label, x, H - 30);
    };

    drawTube(cx - 55, `${cation.id} salt`, cation.color);

    if (isFlame && reacted) {
      // Flame test
      const flX = cx + 55, flY = H - 55;
      // Wire loop
      ctx.strokeStyle = '#9ca3af'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(flX, flY + 25); ctx.lineTo(flX, flY - 5); ctx.stroke();
      ctx.beginPath(); ctx.arc(flX, flY - 5, 5, 0, Math.PI * 2); ctx.stroke();
      // Flame
      const fT = (ts * 0.004) % 1;
      ctx.shadowBlur = 20; ctx.shadowColor = test.precip;
      const fGrad = ctx.createLinearGradient(flX, flY - 55, flX, flY - 5);
      fGrad.addColorStop(0, test.precip + '00'); fGrad.addColorStop(0.4, test.precip + 'cc');
      fGrad.addColorStop(1, '#fffbeb');
      ctx.fillStyle = fGrad;
      for (let fi = 0; fi < 3; fi++) {
        const fh = 25 + Math.sin(fT * Math.PI * 2 + fi * 1.5) * 10;
        const fw = 10 + fi * 3;
        ctx.beginPath();
        ctx.moveTo(flX - fw / 2 + Math.sin(fT + fi) * 3, flY - 5);
        ctx.quadraticCurveTo(flX + Math.sin(fT * 2 + fi) * 6, flY - fh * 0.5, flX, flY - fh - 5);
        ctx.quadraticCurveTo(flX - Math.sin(fT + fi) * 5, flY - fh * 0.5, flX + fw / 2, flY - 5);
        ctx.closePath(); ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText('Flame test', flX, H - 30);
      ctx.fillStyle = test.precip; ctx.font = 'bold 9px Inter';
      ctx.fillText('Brick-red', flX, H - 40);
    } else {
      drawTube(cx + 55, test.reagent.split(' ')[0], test.positive ? test.precip : '#475569');
    }

    // Result
    if (reacted) {
      ctx.fillStyle = `rgba(16,185,129,${Math.min(1, t2 * 2) * 0.12})`;
      ctx.beginPath(); ctx.roundRect(14, 8, W - 28, 22, 5); ctx.fill();
      ctx.strokeStyle = `rgba(16,185,129,${Math.min(1, t2 * 2) * 0.35})`; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = `rgba(52,211,153,${Math.min(1, t2 * 2)})`; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(test.result, W / 2, 23);
    } else {
      ctx.fillStyle = '#475569'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`Add ${test.reagent} to ${cation.id} salt solution →`, W / 2, 20);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [reacted, cation, test]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">⚗ Cation Analysis — Wet Tests</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Fe³⁺ · Cu²⁺ · Zn²⁺ · Pb²⁺ · Ca²⁺ · Confirmatory reactions</p>
        </div>
        <div className="text-xs px-2.5 py-1 rounded-lg font-bold" style={{ background: cation.color + '22', color: cation.color, border: `1px solid ${cation.color}45` }}>{cation.id}</div>
      </div>
      <canvas ref={canvasRef} width={380} height={275} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(251,191,36,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex flex-wrap gap-1.5">
          {CATIONS.map((c, i) => (
            <button key={i} onClick={() => setCatIdx(i)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: i === catIdx ? c.color + '25' : 'rgba(255,255,255,0.04)', color: i === catIdx ? c.color : '#475569', border: `1px solid ${i === catIdx ? c.color + '50' : 'rgba(255,255,255,0.07)'}` }}>
              {c.id}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {cation.tests.map((t2, i) => (
            <button key={i} onClick={() => { setTestIdx(i); setReacted(false); tRef.current = 0; }}
              className="flex-1 py-1.5 rounded-lg text-[9px] font-bold"
              style={{ background: i === testIdx ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.04)', color: i === testIdx ? '#fbbf24' : '#475569', border: `1px solid ${i === testIdx ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
              {t2.reagent.split(' ')[0]}
            </button>
          ))}
        </div>
        <button onClick={() => { setReacted(true); tRef.current = 0; }}
          className="w-full py-2.5 rounded-xl text-sm font-bold"
          style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
          🧪 Add {test.reagent}
        </button>
        <div className="text-[9px] text-zinc-500 px-1">
          <span className="text-zinc-400 font-bold">Confirm: </span>{cation.confirmTest}
        </div>
      </div>
    </div>
  );
};
export default CationAnalysisLab;
