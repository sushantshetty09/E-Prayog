import React, { useState, useRef, useEffect, useCallback } from 'react';

const TESTS = [
  { name: 'HCl (dil.)',   anions: ['Cl⁻'],         color: '#94a3b8' },
  { name: 'H₂SO₄ (dil.)', anions: ['SO₄²⁻'],        color: '#fbbf24' },
  { name: 'HNO₃ (dil.)',  anions: ['NO₃⁻'],         color: '#f97316' },
  { name: 'Na₂CO₃',       anions: ['CO₃²⁻'],        color: '#a78bfa' },
  { name: 'Na₂S',         anions: ['S²⁻'],           color: '#f59e0b' },
  { name: 'Unknown',      anions: ['?'],             color: '#64748b' },
];

const ANIONS = [
  {
    id: 'Cl⁻', name: 'Chloride (Cl⁻)',
    tests: [
      { reagent: 'AgNO₃ (dil.)',    result: 'White ↓ AgCl (curdy)', color: '#f1f5f9', positive: true },
      { reagent: 'Pb(NO₃)₂',       result: 'White ↓ PbCl₂',        color: '#f8fafc', positive: true },
      { reagent: 'BaCl₂',          result: 'No precipitate',         color: '#1e40af', positive: false },
    ],
    confirmTest: 'AgNO₃ → white curdy ppt + conc. HNO₃ (ppt dissolves)',
    color: '#94a3b8',
  },
  {
    id: 'SO₄²⁻', name: 'Sulphate (SO₄²⁻)',
    tests: [
      { reagent: 'BaCl₂ (dil.)',   result: 'White ↓ BaSO₄ (insoluble in HCl)', color: '#f8fafc', positive: true },
      { reagent: 'AgNO₃',          result: 'White ↓ Ag₂SO₄',       color: '#e2e8f0', positive: true },
      { reagent: 'Pb(NO₃)₂',       result: 'White ↓ PbSO₄',        color: '#f1f5f9', positive: true },
    ],
    confirmTest: 'BaCl₂ → white ppt insoluble in HCl (confirms SO₄²⁻)',
    color: '#fbbf24',
  },
  {
    id: 'CO₃²⁻', name: 'Carbonate (CO₃²⁻)',
    tests: [
      { reagent: 'HCl (dil.)',      result: 'Brisk CO₂ effervescence', color: '#dbeafe', positive: true },
      { reagent: 'BaCl₂',          result: 'White ↓ BaCO₃',          color: '#f1f5f9', positive: true },
      { reagent: 'Lime water',      result: 'CO₂ turns milky',         color: '#f8fafc', positive: true },
    ],
    confirmTest: 'Dil. HCl → CO₂ gas turns lime water milky',
    color: '#a78bfa',
  },
  {
    id: 'NO₃⁻', name: 'Nitrate (NO₃⁻)',
    tests: [
      { reagent: 'Brown ring test', result: 'Brown ring FeSO₄·NO', color: '#92400e', positive: true },
      { reagent: 'Cu + H₂SO₄',     result: 'Brown NO₂ gas',       color: '#d97706', positive: true },
      { reagent: 'BaCl₂',          result: 'No precipitate',        color: '#1e40af', positive: false },
    ],
    confirmTest: 'Brown ring test: FeSO₄ + dil. H₂SO₄ → brown ring',
    color: '#f97316',
  },
  {
    id: 'S²⁻', name: 'Sulphide (S²⁻)',
    tests: [
      { reagent: 'HCl (dil.)',      result: 'H₂S gas (rotten egg smell)', color: '#d4d40c', positive: true },
      { reagent: 'Lead acetate paper', result: 'Black PbS (turns black)', color: '#111', positive: true },
      { reagent: 'AgNO₃',          result: 'Black ↓ Ag₂S',             color: '#1c1c1c', positive: true },
    ],
    confirmTest: 'Lead acetate paper turns black due to PbS formation',
    color: '#f59e0b',
  },
];

const AnionAnalysisLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedAnion, setSelectedAnion] = useState(0);
  const [selectedTest, setSelectedTest] = useState(0);
  const [reacted, setReacted] = useState(false);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => { setReacted(false); setSelectedTest(0); tRef.current = 0; }, [selectedAnion]);

  const anion = ANIONS[selectedAnion];
  const test = anion.tests[selectedTest];

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Bench
    ctx.fillStyle = '#1a1408'; ctx.fillRect(0, H - 22, W, 22);

    const t = tRef.current;
    if (reacted) tRef.current = Math.min(1, tRef.current + 0.012);

    const cx = W / 2;

    // ── Test tube 1 (sample) ──
    const drawTube = (x: number, label: string, topColor: string, botColor: string, precipH: number, precipColor: string, bubbles: boolean) => {
      const ttW = 32, ttTop = 40, ttBot = H - 50;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x - ttW / 2, ttTop);
      ctx.lineTo(x - ttW / 2, ttBot - 6);
      ctx.quadraticCurveTo(x - ttW / 2, ttBot, x, ttBot);
      ctx.quadraticCurveTo(x + ttW / 2, ttBot, x + ttW / 2, ttBot - 6);
      ctx.lineTo(x + ttW / 2, ttTop);
      ctx.closePath(); ctx.clip();

      // Solution top half (sample)
      const solGrad = ctx.createLinearGradient(x - ttW / 2, ttTop + 10, x, ttBot);
      solGrad.addColorStop(0, topColor + '60');
      solGrad.addColorStop(0.5, topColor + '40');
      solGrad.addColorStop(1, topColor + '20');
      ctx.fillStyle = solGrad; ctx.fillRect(x - ttW / 2, ttTop + 10, ttW, ttBot - ttTop - 10);

      // Precipitate at bottom
      if (reacted && precipH > 0) {
        const ph = precipH * t;
        const pGrad = ctx.createLinearGradient(x, ttBot - ph, x, ttBot);
        pGrad.addColorStop(0, precipColor + '99'); pGrad.addColorStop(1, precipColor + 'ff');
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.moveTo(x - ttW / 2 + 2, ttBot - ph);
        ctx.quadraticCurveTo(x, ttBot - ph + 3, x + ttW / 2 - 2, ttBot - ph);
        ctx.lineTo(x + ttW / 2 - 2, ttBot - 5);
        ctx.quadraticCurveTo(x, ttBot + 3, x - ttW / 2 + 2, ttBot - 5);
        ctx.closePath(); ctx.fill();
      }

      // Bubbles (gas evolution)
      if (bubbles && reacted && t > 0.2) {
        for (let i = 0; i < 4; i++) {
          const bphase = (ts * 0.001 * 0.8 + i * 0.7) % 1;
          const bx2 = x + (Math.sin(i * 2.1) * 8);
          const by = ttBot - 15 - bphase * (ttBot - ttTop - 25);
          const br = 2 + bphase * 3;
          ctx.strokeStyle = `rgba(219,234,254,${(1 - bphase) * 0.7 * t})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(bx2, by, br, 0, Math.PI * 2); ctx.stroke();
        }
      }

      ctx.restore();

      // Glass walls
      ctx.beginPath();
      ctx.moveTo(x - ttW / 2, ttTop);
      ctx.lineTo(x - ttW / 2, ttBot - 6);
      ctx.quadraticCurveTo(x - ttW / 2, ttBot, x, ttBot);
      ctx.quadraticCurveTo(x + ttW / 2, ttBot, x + ttW / 2, ttBot - 6);
      ctx.lineTo(x + ttW / 2, ttTop);
      const glassG = ctx.createLinearGradient(x - ttW / 2, 0, x + ttW / 2, 0);
      glassG.addColorStop(0, 'rgba(255,255,255,0.15)'); glassG.addColorStop(0.3, 'rgba(255,255,255,0.05)');
      glassG.addColorStop(0.7, 'rgba(255,255,255,0.03)'); glassG.addColorStop(1, 'rgba(255,255,255,0.12)');
      ctx.fillStyle = glassG; ctx.fill();
      ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
      // Shine
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(x - ttW / 2 + 4, ttTop + 10); ctx.lineTo(x - ttW / 2 + 4, ttBot - 20); ctx.stroke();

      // Label
      ctx.fillStyle = '#64748b'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText(label, x, H - 30);
    };

    // Sample tube (left)
    drawTube(cx - 60, anion.id, anion.color, anion.color, 0, '', false);
    // Reagent/result tube (right)
    const hasPrecip = test.result.includes('↓');
    const hasBubbles = anion.id === 'CO₃²⁻' && test.reagent.includes('HCl');
    drawTube(cx + 60, test.reagent.split(' ')[0], test.positive ? test.color : '#3b82f6', test.color, hasPrecip ? 22 : 0, test.color, hasBubbles);

    // Result banner
    if (reacted) {
      const banAlpha = Math.min(1, t * 2);
      ctx.fillStyle = `rgba(${test.positive ? '16,185,129' : '59,130,246'},${banAlpha * 0.15})`;
      ctx.beginPath(); ctx.roundRect(16, 10, W - 32, 22, 5); ctx.fill();
      ctx.strokeStyle = test.positive ? `rgba(16,185,129,${banAlpha * 0.4})` : `rgba(59,130,246,${banAlpha * 0.4})`; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = test.positive ? `rgba(52,211,153,${banAlpha})` : `rgba(96,165,250,${banAlpha})`;
      ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(test.result, W / 2, 26);
    } else {
      ctx.fillStyle = '#475569'; ctx.font = '10px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`Add ${test.reagent} to ${anion.id} sample →`, W / 2, 22);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [reacted, anion, test]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🧬 Anion Analysis: Wet Tests</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Cl⁻ · SO₄²⁻ · CO₃²⁻ · NO₃⁻ · S²⁻ · Confirmatory tests</p>
        </div>
        <div className="text-xs px-2.5 py-1 rounded-lg font-bold" style={{ background: anion.color + '20', color: anion.color, border: `1px solid ${anion.color}40` }}>{anion.id}</div>
      </div>
      <canvas ref={canvasRef} width={380} height={280} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(167,139,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex flex-wrap gap-1.5">
          {ANIONS.map((a, i) => (
            <button key={a.id} onClick={() => setSelectedAnion(i)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold"
              style={{ background: i === selectedAnion ? a.color + '25' : 'rgba(255,255,255,0.04)', color: i === selectedAnion ? a.color : '#475569', border: `1px solid ${i === selectedAnion ? a.color + '50' : 'rgba(255,255,255,0.07)'}` }}>
              {a.id}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {anion.tests.map((t2, i) => (
            <button key={t2.reagent} onClick={() => { setSelectedTest(i); setReacted(false); tRef.current = 0; }}
              className="flex-1 py-1.5 rounded-lg text-[9px] font-bold"
              style={{ background: i === selectedTest ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)', color: i === selectedTest ? '#a78bfa' : '#475569', border: `1px solid ${i === selectedTest ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
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
          <span className="text-zinc-400 font-bold">Confirm: </span>{anion.confirmTest}
        </div>
      </div>
    </div>
  );
};
export default AnionAnalysisLab;
