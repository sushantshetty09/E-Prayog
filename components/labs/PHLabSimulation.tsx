import React, { useState, useRef, useEffect, useCallback } from 'react';

const PH_ZONES = [
  { ph: 0,  color: '#dc2626', label: 'Strong Acid' },
  { ph: 3,  color: '#ea580c', label: 'Acid' },
  { ph: 5,  color: '#ca8a04', label: 'Weak Acid' },
  { ph: 7,  color: '#16a34a', label: 'Neutral' },
  { ph: 9,  color: '#2563eb', label: 'Weak Base' },
  { ph: 11, color: '#7c3aed', label: 'Strong Base' },
  { ph: 14, color: '#6d28d9', label: 'Very Strong Base' },
];

const SOLUTIONS = [
  { name: 'HCl (conc.)',    ph: 0.5, icon: '⚗' },
  { name: 'HCl (dilute)',   ph: 2.5, icon: '🧪' },
  { name: 'Lemon juice',    ph: 3.2, icon: '🍋' },
  { name: 'Vinegar',        ph: 4.0, icon: '🫙' },
  { name: 'Coffee',         ph: 5.0, icon: '☕' },
  { name: 'Pure water',     ph: 7.0, icon: '💧' },
  { name: 'Blood',          ph: 7.4, icon: '🩸' },
  { name: 'Baking soda',    ph: 8.5, icon: '🥄' },
  { name: 'NaOH (dilute)',  ph: 11.0, icon: '🧴' },
  { name: 'NaOH (conc.)',   ph: 13.5, icon: '⚠' },
];

const phToColor = (ph: number): string => {
  // Universal indicator color interpolation
  const stops = [
    { ph: 0,  r: 220, g: 38, b: 38 },
    { ph: 3,  r: 234, g: 88, b: 12 },
    { ph: 5,  r: 202, g: 138, b: 4 },
    { ph: 6,  r: 163, g: 163, b: 12 },
    { ph: 7,  r: 22, g: 163, b: 74 },
    { ph: 8,  r: 6, g: 182, b: 212 },
    { ph: 10, r: 37, g: 99, b: 235 },
    { ph: 12, r: 124, g: 58, b: 237 },
    { ph: 14, r: 109, g: 40, b: 217 },
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    if (ph >= stops[i].ph && ph <= stops[i + 1].ph) {
      const t = (ph - stops[i].ph) / (stops[i + 1].ph - stops[i].ph);
      const r = Math.round(stops[i].r + (stops[i + 1].r - stops[i].r) * t);
      const g = Math.round(stops[i].g + (stops[i + 1].g - stops[i].g) * t);
      const b = Math.round(stops[i].b + (stops[i + 1].b - stops[i].b) * t);
      return `rgb(${r},${g},${b})`;
    }
  }
  return '#22c55e';
};

const PHLabSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ph, setPh] = useState(7.0);
  const [selectedSol, setSelectedSol] = useState(5); // pure water
  const [customMode, setCustomMode] = useState(false);
  const [animPh, setAnimPh] = useState(7.0);
  const rafRef = useRef(0);
  const animPhRef = useRef(7.0);

  // Animate pH meter needle
  useEffect(() => {
    const target = ph;
    const animate = () => {
      const diff = target - animPhRef.current;
      if (Math.abs(diff) < 0.02) { animPhRef.current = target; setAnimPh(target); return; }
      animPhRef.current += diff * 0.08;
      setAnimPh(animPhRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ph]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#040509');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = W / 2;
    const solColor = phToColor(animPh);

    // ── pH meter device (left) ──
    const meterX = 65, meterY = 30, meterW = 90, meterH = 150;
    // Meter body
    const mBodyGrad = ctx.createLinearGradient(meterX, meterY, meterX + meterW, meterY + meterH);
    mBodyGrad.addColorStop(0, '#1e293b'); mBodyGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = mBodyGrad;
    ctx.beginPath(); ctx.roundRect(meterX, meterY, meterW, meterH, 8); ctx.fill();
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke();

    // Meter display
    ctx.fillStyle = '#0f172a';
    ctx.beginPath(); ctx.roundRect(meterX + 8, meterY + 8, meterW - 16, 55, 4); ctx.fill();
    ctx.strokeStyle = '#1e40af'; ctx.lineWidth = 1; ctx.stroke();

    // pH value on display (large LCD-style)
    ctx.shadowBlur = 10; ctx.shadowColor = solColor;
    ctx.fillStyle = solColor; ctx.font = 'bold 26px monospace'; ctx.textAlign = 'center';
    ctx.fillText(animPh.toFixed(1), meterX + meterW / 2, meterY + 47);
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(148,163,184,0.5)'; ctx.font = '8px Inter';
    ctx.fillText('pH', meterX + meterW / 2, meterY + 60);

    // Analog gauge semicircle
    const gCX = meterX + meterW / 2, gCY = meterY + 115, gR = 28;
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(gCX, gCY, gR, Math.PI, 0); ctx.stroke();
    // Color arcs
    const arcColors = ['#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb', '#7c3aed'];
    arcColors.forEach((c, i) => {
      ctx.strokeStyle = c; ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(gCX, gCY, gR, Math.PI + (i / arcColors.length) * Math.PI, Math.PI + ((i + 1) / arcColors.length) * Math.PI);
      ctx.stroke();
    });
    // Needle
    const needleAngle = Math.PI + (animPh / 14) * Math.PI;
    ctx.shadowBlur = 6; ctx.shadowColor = '#f8fafc';
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(gCX, gCY);
    ctx.lineTo(gCX + Math.cos(needleAngle) * (gR - 4), gCY + Math.sin(needleAngle) * (gR - 4));
    ctx.stroke();
    ctx.fillStyle = '#e2e8f0'; ctx.beginPath(); ctx.arc(gCX, gCY, 3, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Probe wire
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(meterX + meterW - 10, meterY + meterH);
    ctx.bezierCurveTo(meterX + meterW - 10, meterY + meterH + 30, cx - 60, H - 130, cx - 55, H - 60);
    ctx.strokeStyle = '#475569'; ctx.lineWidth = 2; ctx.stroke();

    // ── Beaker with solution ──
    const bkX = cx - 75, bkW = 150, bkTop = 80, bkBot = H - 35;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(bkX + 8, bkTop); ctx.lineTo(bkX, bkBot); ctx.lineTo(bkX + bkW, bkBot); ctx.lineTo(bkX + bkW - 8, bkTop);
    ctx.closePath(); ctx.clip();

    // Solution with glowing color
    const solGrad = ctx.createLinearGradient(bkX, bkTop + 30, bkX + bkW, bkBot);
    const parsedColor = solColor;
    solGrad.addColorStop(0, parsedColor.replace('rgb', 'rgba').replace(')', ',0.3)'));
    solGrad.addColorStop(1, parsedColor.replace('rgb', 'rgba').replace(')', ',0.55)'));
    ctx.fillStyle = solGrad; ctx.fillRect(bkX, bkTop + 30, bkW, bkBot - bkTop - 30);

    // pH glow on solution surface
    ctx.fillStyle = parsedColor.replace('rgb', 'rgba').replace(')', ',0.08)');
    ctx.fillRect(bkX, bkTop + 30, bkW, 20);

    ctx.restore();

    // pH electrode probe
    ctx.strokeStyle = 'rgba(148,163,184,0.5)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(cx - 55, H - 60); ctx.lineTo(cx - 55, H - 95); ctx.stroke();
    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(cx - 55, H - 95); ctx.lineTo(cx - 55, H - 115); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(cx - 55, H - 115, 5, 0, Math.PI * 2); ctx.fill();

    // Beaker glass
    ctx.beginPath();
    ctx.moveTo(bkX + 8, bkTop); ctx.lineTo(bkX, bkBot); ctx.lineTo(bkX + bkW, bkBot); ctx.lineTo(bkX + bkW - 8, bkTop);
    ctx.closePath();
    const glassG = ctx.createLinearGradient(bkX, 0, bkX + bkW, 0);
    glassG.addColorStop(0, 'rgba(255,255,255,0.12)'); glassG.addColorStop(0.1, 'rgba(255,255,255,0.05)');
    glassG.addColorStop(0.9, 'rgba(255,255,255,0.05)'); glassG.addColorStop(1, 'rgba(255,255,255,0.12)');
    ctx.fillStyle = glassG; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bkX, bkTop); ctx.lineTo(bkX + bkW, bkTop);
    ctx.strokeStyle = 'rgba(148,163,184,0.3)'; ctx.lineWidth = 3; ctx.stroke();

    // ── Universal Indicator strip (right side) ──
    const stripX = W - 55, stripY = 30, stripH = H - 80, stripW = 22;
    // Gradient strip
    const igGrad = ctx.createLinearGradient(0, stripY, 0, stripY + stripH);
    ['#dc2626', '#ea580c', '#ca8a04', '#a3a30c', '#16a34a', '#06b6d4', '#2563eb', '#7c3aed', '#6d28d9'].forEach((c, i, a) => {
      igGrad.addColorStop(i / (a.length - 1), c);
    });
    ctx.fillStyle = igGrad;
    ctx.beginPath(); ctx.roundRect(stripX, stripY, stripW, stripH, 4); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1; ctx.stroke();

    // Indicator arrow
    const arrowY = stripY + (animPh / 14) * stripH;
    ctx.shadowBlur = 8; ctx.shadowColor = '#fff';
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(stripX - 14, arrowY); ctx.lineTo(stripX - 2, arrowY - 5);
    ctx.lineTo(stripX - 2, arrowY + 5); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    // pH labels on strip
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '7px Inter'; ctx.textAlign = 'right';
    [0, 2, 4, 7, 10, 12, 14].forEach(p => {
      const ly = stripY + (p / 14) * stripH;
      ctx.fillText(p.toString(), stripX - 16, ly + 3);
    });

    rafRef.current = requestAnimationFrame(draw);
  }, [animPh]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  const handleSolution = (i: number) => { setSelectedSol(i); setPh(SOLUTIONS[i].ph); setCustomMode(false); };

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">⚗ pH Measurement — Digital pH Meter</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Universal indicator · Hydrogen ion concentration · pH = −log[H⁺]</p>
        </div>
        <div className="text-xs font-bold px-3 py-1.5 rounded-lg font-mono" style={{ background: phToColor(animPh) + '20', color: phToColor(animPh), border: `1px solid ${phToColor(animPh)}40` }}>
          pH {animPh.toFixed(1)}
        </div>
      </div>

      <canvas ref={canvasRef} width={420} height={330} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(34,197,94,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div>
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 block">Test Solution</label>
          <div className="flex flex-wrap gap-1.5">
            {SOLUTIONS.map((sol, i) => (
              <button key={i} onClick={() => handleSolution(i)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all"
                style={{ background: i === selectedSol ? phToColor(sol.ph) + '25' : 'rgba(255,255,255,0.04)', color: i === selectedSol ? phToColor(sol.ph) : '#475569', border: `1px solid ${i === selectedSol ? phToColor(sol.ph) + '50' : 'rgba(255,255,255,0.07)'}` }}>
                {sol.icon} {sol.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-zinc-400 whitespace-nowrap">Custom pH</label>
          <input type="range" min={0} max={14} step={0.1} value={ph}
            onChange={e => { setPh(Number(e.target.value)); setCustomMode(true); setSelectedSol(-1); }}
            className="flex-1 h-1.5 rounded-full"
            style={{ accentColor: phToColor(ph) }} />
          <span className="text-xs font-mono w-12 text-right font-bold" style={{ color: phToColor(ph) }}>{ph.toFixed(1)}</span>
        </div>
        <div className="rounded-xl p-2.5 text-center text-xs" style={{ background: phToColor(animPh) + '12', border: `1px solid ${phToColor(animPh)}30` }}>
          <span className="text-zinc-400">Classification: </span>
          <span className="font-bold" style={{ color: phToColor(animPh) }}>
            {animPh < 2 ? 'Strong Acid' : animPh < 5 ? 'Weak Acid' : animPh < 6.5 ? 'Slightly Acidic' : animPh < 7.5 ? 'Neutral' : animPh < 9 ? 'Slightly Basic' : animPh < 12 ? 'Weak Base' : 'Strong Base'}
          </span>
          <span className="text-zinc-500 ml-2">[H⁺] = 10⁻{animPh.toFixed(1)} mol/L</span>
        </div>
      </div>
    </div>
  );
};
export default PHLabSimulation;
