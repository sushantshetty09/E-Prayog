import React, { useState, useRef, useEffect, useCallback } from 'react';

const SALTS = [
  {
    name: 'NaCl', fullName: 'Sodium Chloride', cation: 'Na⁺', anion: 'Cl⁻',
    color: '#f1f5f9', nature: 'Neutral', pH: 7.0,
    cationGroup: 'Group I (HCl group)',
    tests: [
      { test: 'AgNO₃', observation: 'White curdy ↓ AgCl (dissolves in NH₄OH)', color: '#f8fafc' },
      { test: 'Flame', observation: 'Golden yellow flame (Na⁺)', color: '#fbbf24' },
      { test: 'Litmus', observation: 'No change: neutral salt', color: '#6b7280' },
    ],
  },
  {
    name: 'FeCl₃', fullName: 'Ferric Chloride', cation: 'Fe³⁺', anion: 'Cl⁻',
    color: '#b45309', nature: 'Acidic', pH: 3.5,
    cationGroup: 'Group III (NH₄OH group)',
    tests: [
      { test: 'NaOH', observation: 'Reddish-brown ↓ Fe(OH)₃', color: '#92400e' },
      { test: 'KSCN', observation: 'Blood red colour Fe(SCN)³', color: '#dc2626' },
      { test: 'AgNO₃', observation: 'White curdy ↓ AgCl', color: '#f1f5f9' },
    ],
  },
  {
    name: 'CuSO₄', fullName: 'Copper Sulphate', cation: 'Cu²⁺', anion: 'SO₄²⁻',
    color: '#0891b2', nature: 'Acidic', pH: 4.2,
    cationGroup: 'Group II (H₂S group)',
    tests: [
      { test: 'NaOH', observation: 'Blue ↓ Cu(OH)₂', color: '#1d4ed8' },
      { test: 'BaCl₂', observation: 'White ↓ BaSO₄ (insoluble in HCl)', color: '#f1f5f9' },
      { test: 'NH₄OH', observation: 'Deep blue tetraamine copper complex', color: '#1e40af' },
    ],
  },
  {
    name: 'Na₂CO₃', fullName: 'Sodium Carbonate', cation: 'Na⁺', anion: 'CO₃²⁻',
    color: '#a78bfa', nature: 'Basic', pH: 11.6,
    cationGroup: 'Group I',
    tests: [
      { test: 'HCl', observation: 'Brisk CO₂ effervescence → lime water turns milky', color: '#dbeafe' },
      { test: 'BaCl₂', observation: 'White ↓ BaCO₃', color: '#f1f5f9' },
      { test: 'Flame', observation: 'Golden yellow flame (Na⁺)', color: '#fbbf24' },
    ],
  },
];

const SaltAnalysisLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [saltIdx, setSaltIdx] = useState(0);
  const [testIdx, setTestIdx] = useState(0);
  const [reacted, setReacted] = useState(false);
  const [step, setStep] = useState<'physical' | 'prelim' | 'systematic'>('physical');
  const rafRef = useRef(0);
  const tRef = useRef(0);

  const salt = SALTS[saltIdx];
  const currentTest = salt.tests[testIdx];

  useEffect(() => { setReacted(false); setTestIdx(0); tRef.current = 0; setStep('physical'); }, [saltIdx]);

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

    // Draw test tube helper
    const drawTube = (x: number, label: string, solCol: string, precipH: number, precipCol: string, effervescence: boolean) => {
      const ttW = 32, ttTop = 30, ttBot = H - 42;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x - ttW / 2, ttTop);
      ctx.lineTo(x - ttW / 2, ttBot - 6);
      ctx.quadraticCurveTo(x - ttW / 2, ttBot, x, ttBot);
      ctx.quadraticCurveTo(x + ttW / 2, ttBot, x + ttW / 2, ttBot - 6);
      ctx.lineTo(x + ttW / 2, ttTop);
      ctx.closePath(); ctx.clip();

      // Solution fill
      const sG = ctx.createLinearGradient(x - ttW / 2, ttTop + 8, x + ttW / 2, ttBot);
      sG.addColorStop(0, solCol + '50'); sG.addColorStop(1, solCol + '35');
      ctx.fillStyle = sG; ctx.fillRect(x - ttW / 2, ttTop + 8, ttW, ttBot - ttTop - 8);

      // Precipitate
      if (reacted && precipH > 0) {
        const ph = precipH * t2;
        const pG = ctx.createLinearGradient(x, ttBot - ph, x, ttBot);
        pG.addColorStop(0, precipCol + '99'); pG.addColorStop(1, precipCol);
        ctx.fillStyle = pG;
        ctx.beginPath();
        ctx.moveTo(x - ttW / 2 + 2, ttBot - ph);
        ctx.quadraticCurveTo(x, ttBot - ph + 4, x + ttW / 2 - 2, ttBot - ph);
        ctx.lineTo(x + ttW / 2 - 2, ttBot - 5);
        ctx.quadraticCurveTo(x, ttBot + 3, x - ttW / 2 + 2, ttBot - 5);
        ctx.closePath(); ctx.fill();
      }

      // Effervescence
      if (effervescence && reacted && t2 > 0.2) {
        for (let i = 0; i < 5; i++) {
          const bp = (ts * 0.002 * 0.6 + i * 0.7) % 1;
          const bx2 = x + (Math.sin(i * 2.1) * 8);
          const by = ttBot - 10 - bp * (ttBot - ttTop - 15);
          ctx.strokeStyle = `rgba(219,234,254,${(1 - bp) * 0.6 * t2})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(bx2, by, 2 + bp * 3, 0, Math.PI * 2); ctx.stroke();
        }
      }
      ctx.restore();

      // Glass
      ctx.beginPath();
      ctx.moveTo(x - ttW / 2, ttTop);
      ctx.lineTo(x - ttW / 2, ttBot - 6);
      ctx.quadraticCurveTo(x - ttW / 2, ttBot, x, ttBot);
      ctx.quadraticCurveTo(x + ttW / 2, ttBot, x + ttW / 2, ttBot - 6);
      ctx.lineTo(x + ttW / 2, ttTop);
      const gG = ctx.createLinearGradient(x - ttW / 2, 0, x + ttW / 2, 0);
      gG.addColorStop(0, 'rgba(255,255,255,0.14)'); gG.addColorStop(0.2, 'rgba(255,255,255,0.05)');
      gG.addColorStop(0.8, 'rgba(255,255,255,0.04)'); gG.addColorStop(1, 'rgba(255,255,255,0.12)');
      ctx.fillStyle = gG; ctx.fill();
      ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x - ttW / 2 + 4, ttTop + 6); ctx.lineTo(x - ttW / 2 + 4, ttBot - 20); ctx.stroke();
      ctx.fillStyle = '#64748b'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
      ctx.fillText(label, x, H - 28);
    };

    // Left tube: salt solution
    drawTube(cx - 55, `${salt.name}(aq)`, salt.color, 0, '', false);

    // Right tube: reagent + result
    const hasPrecip = currentTest.observation.includes('↓');
    const hasEff = currentTest.observation.includes('effervescence');
    drawTube(cx + 55, currentTest.test, reacted ? currentTest.color : '#475569', hasPrecip ? 20 : 0, currentTest.color, hasEff);

    // Result banner
    if (reacted) {
      const aBanAlpha = Math.min(1, t2 * 2);
      ctx.fillStyle = `rgba(16,185,129,${aBanAlpha * 0.12})`;
      ctx.beginPath(); ctx.roundRect(12, 8, W - 24, 18, 5); ctx.fill();
      ctx.strokeStyle = `rgba(16,185,129,${aBanAlpha * 0.35})`; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = `rgba(52,211,153,${aBanAlpha})`; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(currentTest.observation, W / 2, 21);
    } else {
      ctx.fillStyle = '#475569'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`Add ${currentTest.test} to ${salt.name} solution`, W / 2, 20);
    }

    // pH indicator on left
    const phColors: [number, string][] = [[0,'#dc2626'],[3,'#ea580c'],[5,'#ca8a04'],[7,'#16a34a'],[9,'#2563eb'],[14,'#7c3aed']];
    const closestPH = phColors.reduce((b, c) => Math.abs(c[0] - salt.pH) < Math.abs(b[0] - salt.pH) ? c : b);
    ctx.fillStyle = closestPH[1]; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`pH ≈ ${salt.pH}  ·  ${salt.nature}`, cx - 55, H - 16);

    rafRef.current = requestAnimationFrame(draw);
  }, [reacted, salt, currentTest]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🔬 Salt Analysis: Systematic Identification</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Physical exam → Preliminary tests → Wet tests → Conclusion</p>
        </div>
        <div className="text-xs px-2.5 py-1 rounded-lg font-bold" style={{ background: salt.color + '20', color: salt.color, border: `1px solid ${salt.color}45` }}>{salt.name}</div>
      </div>
      <canvas ref={canvasRef} width={380} height={270} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(167,139,250,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="grid grid-cols-2 gap-1.5">
          {SALTS.map((s, i) => (
            <button key={s.name} onClick={() => setSaltIdx(i)}
              className="py-2 px-3 rounded-xl text-[9px] font-bold text-left"
              style={{ background: i === saltIdx ? s.color + '20' : 'rgba(255,255,255,0.04)', color: i === saltIdx ? s.color : '#475569', border: `1px solid ${i === saltIdx ? s.color + '50' : 'rgba(255,255,255,0.07)'}` }}>
              <div className="font-bold text-xs">{s.name}</div>
              <div style={{ opacity: 0.7 }}>{s.fullName}</div>
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {salt.tests.map((t3, i) => (
            <button key={t3.test} onClick={() => { setTestIdx(i); setReacted(false); tRef.current = 0; }}
              className="flex-1 py-1.5 rounded-lg text-[9px] font-bold"
              style={{ background: i === testIdx ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.04)', color: i === testIdx ? '#a78bfa' : '#475569', border: `1px solid ${i === testIdx ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
              {t3.test}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setReacted(true); tRef.current = 0; }}
            className="flex-1 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
            🧪 Add {currentTest.test}
          </button>
          <button onClick={() => { setReacted(false); tRef.current = 0; }}
            className="px-3 py-2 rounded-xl text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}>
            ↩
          </button>
        </div>
        <div className="text-[9px] text-zinc-500 px-1">
          <span className="text-zinc-400 font-bold">{salt.cationGroup}</span> · Cation: {salt.cation} · Anion: {salt.anion}
        </div>
      </div>
    </div>
  );
};
export default SaltAnalysisLab;
