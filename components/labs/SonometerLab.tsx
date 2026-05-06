import React, { useState, useRef, useEffect, useCallback } from 'react';

const MU = 0.005; // kg/m linear density
const WEIGHTS = [1, 2, 3, 4, 5]; // kg

const SonometerLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [freq, setFreq] = useState(256);
  const [weight, setWeight] = useState(2);
  const [mode, setMode] = useState(1); // harmonic mode (1,2,3)
  const [vibrating, setVibrating] = useState(false);
  const tRef = useRef(0);
  const rafRef = useRef(0);

  const T = weight * 9.8;
  const vWave = Math.sqrt(T / MU);
  const L = (mode / (2 * freq)) * vWave * 100; // cm, resonant length
  const isResonance = Math.abs(L - Math.round(L)) < 2;

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07080e'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const boardLeft = 35, boardRight = W - 55, boardY = H / 2 + 20;
    const boardW = boardRight - boardLeft;

    // ── Sonometer board ──
    // Wood body
    const woodGrad = ctx.createLinearGradient(boardLeft, boardY - 12, boardLeft, boardY + 18);
    woodGrad.addColorStop(0, '#7c4b1e'); woodGrad.addColorStop(0.5, '#5c3610'); woodGrad.addColorStop(1, '#3d2408');
    ctx.fillStyle = woodGrad;
    ctx.beginPath(); ctx.roundRect(boardLeft, boardY - 12, boardW, 30, 4); ctx.fill();
    ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.stroke();
    // Wood grain lines
    ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 0.8;
    for (let i = 0; i < 8; i++) {
      const gx = boardLeft + 20 + i * (boardW - 40) / 7;
      ctx.beginPath(); ctx.moveTo(gx, boardY - 12); ctx.lineTo(gx + 5, boardY + 18); ctx.stroke();
    }

    // Resonance holes in board
    for (let i = 0; i < 5; i++) {
      const hx = boardLeft + 40 + i * (boardW - 80) / 4;
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.beginPath(); ctx.ellipse(hx, boardY + 8, 14, 4, 0, 0, Math.PI * 2); ctx.fill();
    }

    // ── Wire pegs at ends ──
    const wireY = boardY - 28;
    [[boardLeft + 10, 'left'], [boardRight - 10, 'right']].forEach(([px, _]) => {
      const x = px as number;
      const pegGrad = ctx.createLinearGradient(x - 8, wireY - 10, x + 8, wireY + 10);
      pegGrad.addColorStop(0, '#64748b'); pegGrad.addColorStop(0.5, '#94a3b8'); pegGrad.addColorStop(1, '#475569');
      ctx.fillStyle = pegGrad; ctx.beginPath(); ctx.arc(x, wireY, 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#334155'; ctx.lineWidth = 1.5; ctx.stroke();
    });

    // ── Movable bridges ──
    const wireLen = Math.min(boardW * 0.85, L * 3.2);
    const wireStart = boardLeft + (boardW - wireLen) / 2;
    const wireEnd = wireStart + wireLen;

    [wireStart, wireEnd].forEach(bx => {
      const bridgeGrad = ctx.createLinearGradient(bx - 6, wireY - 25, bx + 6, wireY);
      bridgeGrad.addColorStop(0, '#78350f'); bridgeGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = bridgeGrad;
      ctx.beginPath(); ctx.roundRect(bx - 5, wireY - 22, 10, 22, [2, 2, 0, 0]); ctx.fill();
      ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; ctx.stroke();
      // Bridge top cap
      ctx.fillStyle = '#d97706';
      ctx.beginPath(); ctx.roundRect(bx - 7, wireY - 26, 14, 6, 2); ctx.fill();
    });

    // ── Main wire (full length, outside bridges, faint) ──
    ctx.strokeStyle = 'rgba(251,191,36,0.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(boardLeft + 10, wireY - 15); ctx.lineTo(wireStart, wireY - 15);
    ctx.moveTo(wireEnd, wireY - 15); ctx.lineTo(boardRight - 10, wireY - 15);
    ctx.stroke();

    // ── Vibrating segment with standing wave ──
    const t = tRef.current * 0.04 * (freq / 256);
    const nodes = mode + 1;
    const amp = vibrating ? 18 : 0;

    // Wire glow when vibrating
    if (vibrating) {
      ctx.shadowBlur = 20; ctx.shadowColor = isResonance ? '#10b981' : '#fbbf24';
    }
    ctx.strokeStyle = vibrating ? (isResonance ? '#10b981' : '#fbbf24') : '#fbbf24';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const frac = i / 200;
      const x = wireStart + frac * wireLen;
      const y = wireY - 15 + amp * Math.sin(nodes * Math.PI * frac) * Math.sin(t);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Node markers
    if (vibrating) {
      for (let n = 0; n <= mode; n++) {
        const nx = wireStart + (n / mode) * wireLen;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath(); ctx.arc(nx, wireY - 15, 3.5, 0, Math.PI * 2); ctx.fill();
      }
      // Antinode labels
      for (let n = 0; n < mode; n++) {
        const ax = wireStart + ((n + 0.5) / mode) * wireLen;
        ctx.fillStyle = 'rgba(251,191,36,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
        ctx.fillText('A', ax, wireY - 38);
      }
    }

    // Length bracket
    ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(wireStart, boardY + 25); ctx.lineTo(wireEnd, boardY + 25); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wireStart, boardY + 22); ctx.lineTo(wireStart, boardY + 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wireEnd, boardY + 22); ctx.lineTo(wireEnd, boardY + 28); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`L = ${L.toFixed(1)} cm`, (wireStart + wireEnd) / 2, boardY + 40);

    // ── Hanging weights ──
    const hookX = boardRight - 10, hookY = wireY - 15;
    // Thread going over peg and down
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(hookX, hookY); ctx.lineTo(hookX, hookY + 20); ctx.lineTo(hookX + 30, hookY + 20); ctx.lineTo(hookX + 30, hookY + 45); ctx.stroke();
    // Weight discs stacked
    for (let i = 0; i < weight; i++) {
      const wy = hookY + 45 + i * 18;
      const wGrad = ctx.createLinearGradient(hookX + 12, wy, hookX + 48, wy + 16);
      wGrad.addColorStop(0, '#374151'); wGrad.addColorStop(0.5, '#6b7280'); wGrad.addColorStop(1, '#374151');
      ctx.fillStyle = wGrad;
      ctx.beginPath(); ctx.ellipse(hookX + 30, wy + 8, 18, 9, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#4b5563'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#9ca3af'; ctx.font = 'bold 8px Inter'; ctx.textAlign = 'center';
      ctx.fillText('1kg', hookX + 30, wy + 12);
    }
    // Weight label
    ctx.fillStyle = '#60a5fa'; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`T = ${T.toFixed(1)} N`, hookX + 30, hookY + 50 + weight * 18);

    // Tuning fork (left side)
    const tfX = boardLeft - 10, tfY = wireY - 30;
    ctx.strokeStyle = isResonance ? '#10b981' : '#94a3b8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(tfX - 8, tfY); ctx.lineTo(tfX - 8, tfY + 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tfX + 8, tfY); ctx.lineTo(tfX + 8, tfY + 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tfX - 8, tfY + 30); ctx.lineTo(tfX + 8, tfY + 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tfX, tfY + 30); ctx.lineTo(tfX, tfY + 42); ctx.stroke();
    // Vibrating tines
    if (vibrating) {
      const vib = Math.sin(tRef.current * 0.1 * freq * 0.001) * 4;
      ctx.strokeStyle = isResonance ? '#10b981' : '#fbbf24'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(tfX - 8 + vib, tfY); ctx.lineTo(tfX - 8 + vib, tfY + 25); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(tfX + 8 - vib, tfY); ctx.lineTo(tfX + 8 - vib, tfY + 25); ctx.stroke();
    }
    ctx.fillStyle = '#64748b'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`${freq}Hz`, tfX, tfY - 6);

    // Status
    ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
    if (vibrating && isResonance) {
      ctx.shadowBlur = 10; ctx.shadowColor = '#10b981';
      ctx.fillStyle = '#10b981';
      ctx.fillText('🔔 RESONANCE — Maximum amplitude!', W / 2, H - 8);
      ctx.shadowBlur = 0;
    } else if (vibrating) {
      ctx.fillStyle = '#64748b';
      ctx.fillText(`Vibrating at ${freq} Hz · mode ${mode}`, W / 2, H - 8);
    } else {
      ctx.fillStyle = '#475569';
      ctx.fillText(`f = ${freq} Hz  |  T = ${T.toFixed(1)} N  |  v = ${vWave.toFixed(0)} m/s`, W / 2, H - 8);
    }

    tRef.current++;
    if (vibrating) rafRef.current = requestAnimationFrame(draw);
  }, [freq, weight, mode, vibrating, T, vWave, L, isResonance]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🎵 Sonometer — Laws of Vibrating Strings</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">f = (n/2L)√(T/μ) · Standing waves · Resonance</p>
        </div>
        <button onClick={() => setVibrating(v => !v)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: vibrating ? 'rgba(239,68,68,0.15)' : 'rgba(251,191,36,0.15)', color: vibrating ? '#f87171' : '#fbbf24', border: `1px solid ${vibrating ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.3)'}` }}>
          {vibrating ? '⏸ Stop' : '▶ Vibrate'}
        </button>
      </div>

      <canvas ref={canvasRef} width={540} height={280} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(251,191,36,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Freq (Hz)</label>
            <input type="range" min={128} max={512} step={4} value={freq} onChange={e => setFreq(Number(e.target.value))} className="flex-1 h-1.5 rounded-full accent-amber-400" />
            <span className="text-xs font-mono text-amber-400 w-10">{freq}</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 whitespace-nowrap">Weight</label>
            <div className="flex gap-1">
              {WEIGHTS.map(w => (
                <button key={w} onClick={() => setWeight(w)}
                  className="w-8 h-7 rounded text-xs font-bold"
                  style={{ background: w === weight ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.04)', color: w === weight ? '#fbbf24' : '#475569', border: `1px solid ${w === weight ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.07)'}` }}>
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">Mode (n)</label>
          <div className="flex gap-1.5">
            {[1, 2, 3].map(m => (
              <button key={m} onClick={() => setMode(m)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: m === mode ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.04)', color: m === mode ? '#fbbf24' : '#475569', border: `1px solid ${m === mode ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
                n={m}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 ml-2">{mode === 1 ? 'Fundamental' : mode === 2 ? '2nd Harmonic' : '3rd Harmonic'}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Frequency', val: `${freq} Hz`, color: '#fbbf24' },
            { label: 'Tension', val: `${T.toFixed(1)} N`, color: '#60a5fa' },
            { label: 'Length L', val: `${L.toFixed(1)} cm`, color: '#a78bfa' },
            { label: 'Wave Vel.', val: `${vWave.toFixed(0)} m/s`, color: '#34d399' },
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
export default SonometerLab;
