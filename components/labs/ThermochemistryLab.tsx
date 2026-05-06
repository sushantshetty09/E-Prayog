import React, { useState, useRef, useEffect, useCallback } from 'react';

const REACTIONS = [
  { name: 'NaOH + HCl', type: 'exothermic', deltaH: -57.3, desc: 'Neutralisation: strong acid + strong base', color: '#ef4444', tempChange: +42 },
  { name: 'CaCl₂ + H₂O', type: 'exothermic', deltaH: -82.8, desc: 'Dissolution of anhydrous CaCl₂ in water', color: '#f97316', tempChange: +35 },
  { name: 'NH₄Cl + H₂O', type: 'endothermic', deltaH: +14.8, desc: 'Dissolution of ammonium chloride (cold pack)', color: '#38bdf8', tempChange: -18 },
  { name: 'Na₂SO₄·10H₂O', type: 'endothermic', deltaH: +78.5, desc: 'Dissolution of Glauber\'s salt (endothermic)', color: '#818cf8', tempChange: -22 },
];

const ThermochemistryLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rxnIdx, setRxnIdx] = useState(0);
  const [mixing, setMixing] = useState(false);
  const [mixT, setMixT] = useState(0); // 0→1
  const [baseTemp] = useState(25);
  const rafRef = useRef(0);
  const lastTRef = useRef(0);

  const rxn = REACTIONS[rxnIdx];
  const isExo = rxn.type === 'exothermic';
  const currentTemp = baseTemp + rxn.tempChange * Math.min(1, mixT);

  useEffect(() => {
    if (!mixing || mixT >= 1) return;
    const id = setInterval(() => setMixT(t => Math.min(1, t + 0.01)), 60);
    return () => clearInterval(id);
  }, [mixing, mixT]);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const t = mixT;
    lastTRef.current = ts;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1a1408'; ctx.fillRect(0, H - 22, W, 22);

    const cx = W / 2;

    // ── Calorimeter (insulated beaker) ──
    const calX = cx - 72, calW = 145, calTop = 35, calBot = H - 55;
    // Outer insulation
    const outerGrad = ctx.createLinearGradient(calX, calTop, calX + calW, calTop);
    outerGrad.addColorStop(0, '#292524'); outerGrad.addColorStop(0.5, '#1c1917'); outerGrad.addColorStop(1, '#292524');
    ctx.fillStyle = outerGrad;
    ctx.beginPath(); ctx.roundRect(calX, calTop, calW, calBot - calTop, 8); ctx.fill();
    ctx.strokeStyle = '#44403c'; ctx.lineWidth = 2; ctx.stroke();
    // Insulation stripes
    ctx.strokeStyle = 'rgba(68,64,60,0.4)'; ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const lx = calX + i * calW / 5;
      ctx.beginPath(); ctx.moveTo(lx, calTop + 4); ctx.lineTo(lx, calBot - 4); ctx.stroke();
    }
    ctx.fillStyle = '#78716c'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText('Insulated Calorimeter', cx, calTop - 4);

    // Inner beaker
    const inX = calX + 10, inW = calW - 20, inTop = calTop + 12, inBot = calBot - 12;
    // Solution color
    const r2 = isExo ? Math.round(30 + t * 120) : 30;
    const b2 = isExo ? 30 : Math.round(30 + t * 100);
    const sGrad = ctx.createLinearGradient(inX, inTop + 20, inX + inW, inBot);
    sGrad.addColorStop(0, `rgba(${r2},${isExo ? 80 : 80},${b2},0.25)`);
    sGrad.addColorStop(1, `rgba(${r2},${isExo ? 50 : 60},${b2},0.45)`);
    ctx.fillStyle = sGrad; ctx.fillRect(inX, inTop + 20, inW, inBot - inTop - 20);

    // Heat shimmer (exothermic)
    if (isExo && t > 0.2) {
      for (let i = 0; i < 5; i++) {
        const hx = inX + 10 + i * (inW - 20) / 4;
        const hAmp = t * 8 * Math.sin(ts * 0.004 + i * 1.2);
        ctx.strokeStyle = `rgba(239,68,68,${t * 0.08})`; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(hx, inTop + 20);
        for (let y = inTop + 20; y < inBot; y += 5) {
          ctx.lineTo(hx + Math.sin(y * 0.2 + ts * 0.003) * hAmp, y);
        }
        ctx.stroke();
      }
    }

    // Condensation rings (endothermic)
    if (!isExo && t > 0.3) {
      ctx.strokeStyle = `rgba(56,189,248,${t * 0.3})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(calX - 4, calTop + 10, calW + 8, calBot - calTop - 10, 10); ctx.stroke();
    }

    // Inner walls
    ctx.beginPath(); ctx.roundRect(inX, inTop, inW, inBot - inTop, 4);
    const iG = ctx.createLinearGradient(inX, 0, inX + inW, 0);
    iG.addColorStop(0, 'rgba(255,255,255,0.1)'); iG.addColorStop(0.15, 'rgba(255,255,255,0.04)');
    iG.addColorStop(0.85, 'rgba(255,255,255,0.04)'); iG.addColorStop(1, 'rgba(255,255,255,0.1)');
    ctx.fillStyle = iG; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();

    // ── Thermometer ──
    const tmX = calX + calW - 20, tmTop2 = calTop + 8, tmH = calBot - calTop - 22;
    ctx.beginPath(); ctx.roundRect(tmX - 3, tmTop2, 6, tmH, [3, 3, 0, 0]);
    ctx.fillStyle = 'rgba(15,23,42,0.8)'; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(tmX, tmTop2 + tmH + 5, 7, 0, Math.PI * 2);
    ctx.fillStyle = isExo ? '#ef4444' : '#38bdf8'; ctx.fill();
    const maxTemp = baseTemp + Math.max(...REACTIONS.map(r => Math.abs(r.tempChange)));
    const tempFraction = Math.max(0, Math.min(1, (currentTemp - (baseTemp - 30)) / (maxTemp + 10)));
    const mercH = tempFraction * tmH;
    ctx.fillStyle = isExo ? '#ef4444' : '#38bdf8';
    ctx.fillRect(tmX - 2, tmTop2 + tmH - mercH, 4, mercH);
    ctx.shadowBlur = 4; ctx.shadowColor = isExo ? '#ef4444' : '#38bdf8';
    ctx.fillStyle = isExo ? '#fca5a5' : '#bae6fd'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'left';
    ctx.fillText(`${currentTemp.toFixed(1)}°C`, tmX + 8, tmTop2 + tmH - mercH + 4);
    ctx.shadowBlur = 0;

    // ── Energy level diagram (right) ──
    const elX = W - 90, elY = 60, elH = 160, elW = 60;
    ctx.fillStyle = 'rgba(15,20,40,0.7)';
    ctx.beginPath(); ctx.roundRect(elX - 8, elY - 12, elW + 24, elH + 30, 6); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();

    // Reactant level
    const reactY = isExo ? elY + elH * 0.25 : elY + elH * 0.75;
    const prodY = isExo ? elY + elH * 0.75 : elY + elH * 0.25;
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(elX, reactY); ctx.lineTo(elX + elW, reactY); ctx.stroke();
    ctx.fillStyle = '#f59e0b'; ctx.font = '8px Inter'; ctx.textAlign = 'left';
    ctx.fillText('Reactants', elX + elW + 2, reactY + 3);

    // Product level
    ctx.strokeStyle = rxn.color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(elX, prodY); ctx.lineTo(elX + elW, prodY); ctx.stroke();
    ctx.fillStyle = rxn.color; ctx.fillText('Products', elX + elW + 2, prodY + 3);

    // ΔH arrow
    if (t > 0) {
      const arrAlpha = Math.min(1, t * 2);
      const arrX = elX + elW / 2;
      ctx.shadowBlur = 6; ctx.shadowColor = rxn.color;
      ctx.strokeStyle = `rgba(${isExo ? '239,68,68' : '56,189,248'},${arrAlpha})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(arrX, reactY); ctx.lineTo(arrX, prodY); ctx.stroke();
      ctx.fillStyle = `rgba(${isExo ? '239,68,68' : '56,189,248'},${arrAlpha})`;
      if (isExo) { ctx.beginPath(); ctx.moveTo(arrX - 5, prodY - 8); ctx.lineTo(arrX, prodY); ctx.lineTo(arrX + 5, prodY - 8); ctx.fill(); }
      else { ctx.beginPath(); ctx.moveTo(arrX - 5, prodY + 8); ctx.lineTo(arrX, prodY); ctx.lineTo(arrX + 5, prodY + 8); ctx.fill(); }
      ctx.shadowBlur = 0;
      ctx.fillStyle = rxn.color; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
      ctx.fillText(`ΔH = ${rxn.deltaH > 0 ? '+' : ''}${rxn.deltaH} kJ/mol`, arrX, (reactY + prodY) / 2 + 3);
    }

    ctx.fillStyle = '#64748b'; ctx.font = 'bold 8px Inter'; ctx.textAlign = 'center';
    ctx.fillText(isExo ? 'EXOTHERMIC' : 'ENDOTHERMIC', elX + elW / 2, elY - 4);

    // Status
    ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    if (t >= 1) {
      ctx.shadowBlur = 8; ctx.shadowColor = rxn.color;
      ctx.fillStyle = rxn.color;
      ctx.fillText(`ΔT = ${rxn.tempChange > 0 ? '+' : ''}${rxn.tempChange}°C  ·  q = mcΔT  ·  ${isExo ? '🔥 Heat released' : '❄ Heat absorbed'}`, cx - 45, H - 8);
      ctx.shadowBlur = 0;
    } else if (mixing) {
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Mixing... T = ${currentTemp.toFixed(1)}°C`, cx - 45, H - 8);
    } else {
      ctx.fillStyle = '#475569';
      ctx.fillText(`${rxn.name} — click Mix to start`, cx - 45, H - 8);
    }
  }, [mixT, rxn, isExo, currentTemp, baseTemp]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${rxn.color}35`, background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🌡 Thermochemistry — Calorimetry</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">q = mcΔT · Enthalpy change ΔH · Exo vs Endo</p>
        </div>
        <div className="text-xs px-2.5 py-1 rounded-lg font-bold" style={{ background: rxn.color + '20', color: rxn.color, border: `1px solid ${rxn.color}40` }}>{isExo ? '🔥 Exothermic' : '❄ Endothermic'}</div>
      </div>
      <canvas ref={canvasRef} width={420} height={300} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: `${rxn.color}15`, background: 'rgba(5,7,12,0.97)' }}>
        <div className="grid grid-cols-2 gap-1.5">
          {REACTIONS.map((r, i) => (
            <button key={i} onClick={() => { setRxnIdx(i); setMixing(false); setMixT(0); }}
              className="py-2 px-2.5 rounded-xl text-[9px] font-bold text-left"
              style={{ background: i === rxnIdx ? r.color + '20' : 'rgba(255,255,255,0.04)', color: i === rxnIdx ? r.color : '#475569', border: `1px solid ${i === rxnIdx ? r.color + '40' : 'rgba(255,255,255,0.07)'}` }}>
              <div>{r.name}</div>
              <div style={{ opacity: 0.7 }}>{r.type} · ΔH={r.deltaH > 0 ? '+' : ''}{r.deltaH}</div>
            </button>
          ))}
        </div>
        <button onClick={() => { if (mixT >= 1) setMixT(0); setMixing(true); }}
          disabled={mixing && mixT < 1}
          className="w-full py-2.5 rounded-xl text-sm font-bold"
          style={{ background: mixing && mixT < 1 ? 'rgba(255,255,255,0.04)' : rxn.color + '25', color: mixing && mixT < 1 ? '#475569' : rxn.color, border: `1px solid ${rxn.color}35`, opacity: mixing && mixT < 1 ? 0.7 : 1 }}>
          {mixT >= 1 ? '🔄 Reset & Mix Again' : mixing ? `Mixing... ${(mixT * 100).toFixed(0)}%` : `⚗ Mix ${rxn.name}`}
        </button>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Temp (T)', val: `${currentTemp.toFixed(1)} °C`, color: rxn.color },
            { label: 'ΔT', val: `${(rxn.tempChange * Math.min(1, mixT)).toFixed(1)} °C`, color: isExo ? '#ef4444' : '#38bdf8' },
            { label: 'ΔH', val: `${rxn.deltaH > 0 ? '+' : ''}${rxn.deltaH} kJ/mol`, color: rxn.color },
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
export default ThermochemistryLab;
