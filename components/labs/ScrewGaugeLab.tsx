import React, { useState, useRef, useEffect } from 'react';

const pitch = 0.5, divs = 50;
const LC = pitch / divs;

const ScrewGaugeLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(38);
  const diameter_mm = (rotation / divs) * pitch;
  const psr = Math.floor(diameter_mm / pitch) * pitch;
  const csr = Math.round((diameter_mm - psr) / LC);
  const reading = psr + csr * LC;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Dark lab background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07090f'); bg.addColorStop(1, '#040507');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cy = H / 2 - 10;

    // ── U-Frame (steel body) ──
    const frameGrad = ctx.createLinearGradient(30, cy - 60, 200, cy + 60);
    frameGrad.addColorStop(0, '#1e293b'); frameGrad.addColorStop(0.4, '#334155');
    frameGrad.addColorStop(0.6, '#475569'); frameGrad.addColorStop(1, '#1e293b');

    ctx.fillStyle = frameGrad;
    // Left vertical
    ctx.beginPath(); ctx.roundRect(30, cy - 65, 22, 130, 6); ctx.fill();
    // Bottom horizontal
    ctx.beginPath(); ctx.roundRect(30, cy + 50, 160, 22, 4); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(30, cy - 65, 22, 130, 6); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(30, cy + 50, 160, 22, 4); ctx.stroke();

    // Frame shine
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath(); ctx.roundRect(33, cy - 62, 5, 120, 3); ctx.fill();

    // ── Anvil ──
    const anvGrad = ctx.createLinearGradient(180, cy - 12, 220, cy + 12);
    anvGrad.addColorStop(0, '#1e3a5f'); anvGrad.addColorStop(0.5, '#3b82f6'); anvGrad.addColorStop(1, '#1e3a5f');
    ctx.fillStyle = anvGrad;
    ctx.beginPath(); ctx.roundRect(178, cy - 12, 36, 24, 3); ctx.fill();
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 1; ctx.stroke();

    // ── Sleeve (barrel) ──
    const sleeveX = 210, sleeveW = 120, sleeveH = 30;
    const sleeveGrad = ctx.createLinearGradient(sleeveX, cy - sleeveH / 2, sleeveX, cy + sleeveH / 2);
    sleeveGrad.addColorStop(0, '#1a2235'); sleeveGrad.addColorStop(0.3, '#2d4a6b');
    sleeveGrad.addColorStop(0.5, '#4a7db5'); sleeveGrad.addColorStop(0.7, '#2d4a6b'); sleeveGrad.addColorStop(1, '#1a2235');
    ctx.fillStyle = sleeveGrad;
    ctx.beginPath(); ctx.roundRect(sleeveX, cy - sleeveH / 2, sleeveW, sleeveH, 4); ctx.fill();
    ctx.strokeStyle = '#3b5070'; ctx.lineWidth = 1; ctx.stroke();

    // Main scale divisions on sleeve
    ctx.fillStyle = '#e2e8f0'; ctx.font = '8px Inter'; ctx.textAlign = 'center';
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 0.8;
    for (let i = 0; i <= 6; i++) {
      const mx = sleeveX + i * 18;
      if (mx > sleeveX + sleeveW - 15) break;
      ctx.beginPath(); ctx.moveTo(mx, cy + 1); ctx.lineTo(mx, cy + sleeveH / 2 - 2); ctx.stroke();
      ctx.fillText(`${(i * 0.5).toFixed(1)}`, mx, cy + sleeveH / 2 + 10);
    }
    // Half-mm marks
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 0.5;
    for (let i = 0; i < 12; i++) {
      const mx = sleeveX + i * 9;
      ctx.beginPath(); ctx.moveTo(mx, cy + 1); ctx.lineTo(mx, cy + 8); ctx.stroke();
    }
    // Datum line (red)
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(sleeveX, cy); ctx.lineTo(sleeveX + sleeveW, cy); ctx.stroke();

    // ── Thimble ──
    const thimbleX = Math.min(sleeveX + 20 + (diameter_mm / 2) * 55, sleeveX + sleeveW - 25);
    const thW = 75, thH = 52;
    const thGrad = ctx.createLinearGradient(thimbleX, cy - thH / 2, thimbleX + thW, cy + thH / 2);
    thGrad.addColorStop(0, '#1a2235'); thGrad.addColorStop(0.25, '#2d4a6b');
    thGrad.addColorStop(0.5, '#3d6494'); thGrad.addColorStop(0.75, '#2d4a6b'); thGrad.addColorStop(1, '#1a2235');
    ctx.fillStyle = thGrad;
    ctx.beginPath(); ctx.roundRect(thimbleX, cy - thH / 2, thW, thH, 5); ctx.fill();
    ctx.strokeStyle = '#4a7db5'; ctx.lineWidth = 1; ctx.stroke();

    // Thimble circular scale markings
    const visR = 12;
    for (let i = -visR; i <= visR; i++) {
      const div = ((csr + i) % 50 + 50) % 50;
      const y = cy + i * (thH / 2 / visR);
      if (y < cy - thH / 2 + 4 || y > cy + thH / 2 - 4) continue;
      const isMajor = div % 5 === 0;
      const isActive = i === 0;
      ctx.strokeStyle = isActive ? '#10b981' : isMajor ? '#94a3b8' : '#475569';
      ctx.lineWidth = isActive ? 2 : isMajor ? 1.2 : 0.5;
      ctx.beginPath(); ctx.moveTo(thimbleX + 2, y); ctx.lineTo(thimbleX + (isMajor ? 20 : 12), y); ctx.stroke();
      if (isMajor) {
        ctx.fillStyle = isActive ? '#10b981' : '#94a3b8';
        ctx.font = isActive ? 'bold 9px Inter' : '8px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(`${div}`, thimbleX + 23, y + 3);
      }
    }
    // Active line pointer on sleeve
    ctx.shadowBlur = 6; ctx.shadowColor = '#10b981';
    ctx.strokeStyle = '#10b981'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(thimbleX - 12, cy); ctx.lineTo(thimbleX + 2, cy); ctx.stroke();
    ctx.shadowBlur = 0;

    // Ratchet
    const ratGrad = ctx.createLinearGradient(thimbleX + thW, cy - 14, thimbleX + thW + 40, cy + 14);
    ratGrad.addColorStop(0, '#1a2235'); ratGrad.addColorStop(0.5, '#2d4a6b'); ratGrad.addColorStop(1, '#1a2235');
    ctx.fillStyle = ratGrad;
    ctx.beginPath(); ctx.roundRect(thimbleX + thW - 2, cy - 14, 40, 28, 6); ctx.fill();
    ctx.strokeStyle = '#3b5070'; ctx.lineWidth = 1; ctx.stroke();
    // Knurl lines on ratchet
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 0.6;
    for (let i = 0; i < 8; i++) {
      const rx = thimbleX + thW + i * 4 + 4;
      ctx.beginPath(); ctx.moveTo(rx, cy - 12); ctx.lineTo(rx, cy + 12); ctx.stroke();
    }

    // Object between anvil & spindle
    if (diameter_mm > 0.05) {
      const objCx = 200 + (thimbleX - 200) / 2;
      const objR = Math.min((thimbleX - 210) / 2 - 2, 9);
      if (objR > 1.5) {
        const oGrad = ctx.createRadialGradient(objCx - objR * 0.3, cy - objR * 0.3, 0, objCx, cy, objR);
        oGrad.addColorStop(0, '#e2e8f0'); oGrad.addColorStop(0.5, '#94a3b8'); oGrad.addColorStop(1, '#334155');
        ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(148,163,184,0.4)';
        ctx.fillStyle = oGrad;
        ctx.beginPath(); ctx.arc(objCx, cy, objR, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Bench
    const bench = ctx.createLinearGradient(0, H - 20, 0, H);
    bench.addColorStop(0, '#3d2a1a'); bench.addColorStop(1, '#2a1d0f');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 20, W, 20);
    ctx.strokeStyle = '#5c3d1e'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 20); ctx.lineTo(W, H - 20); ctx.stroke();

    // Reading label
    ctx.shadowBlur = 8; ctx.shadowColor = '#10b981';
    ctx.fillStyle = '#10b981'; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`Reading = PSR + (CSR × LC) = ${psr.toFixed(1)} + (${csr} × ${LC}) = ${reading.toFixed(2)} mm`, W / 2, H - 26);
    ctx.shadowBlur = 0;

  }, [rotation, diameter_mm, psr, csr, reading]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f 0%,#040507 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(75,105,176,0.2)', background: 'rgba(7,9,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🔩 Screw Gauge (Micrometer)</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Pitch = {pitch} mm &nbsp;|&nbsp; Divisions = {divs} &nbsp;|&nbsp; LC = {LC} mm</p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
          {reading.toFixed(2)} mm
        </div>
      </div>
      <canvas ref={canvasRef} width={640} height={300} className="w-full" style={{ display: 'block' }} />
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(75,105,176,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-400 whitespace-nowrap">Rotate Thimble</span>
          <input id="screwgauge-rotation-slider" type="range" min={0} max={150} step={1} value={rotation} onChange={e => setRotation(Number(e.target.value))} className="flex-1 h-1.5 rounded-full accent-violet-500" />
          <span className="text-xs font-mono text-violet-400 w-20 text-right">{rotation} div</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'PSR', val: `${psr.toFixed(1)} mm`, color: '#94a3b8', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)' },
            { label: 'CSR', val: `${csr} div`, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
            { label: 'CSR × LC', val: `${(csr * LC).toFixed(2)} mm`, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
            { label: 'TOTAL', val: `${reading.toFixed(2)} mm`, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-2.5 text-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
              <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">{m.label}</div>
              <div className="text-sm font-bold font-mono mt-0.5" style={{ color: m.color }}>{m.val}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px]" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.12)' }}>
          <span className="text-zinc-500">Formula:</span>
          <span className="font-mono text-emerald-400">Reading = PSR + (CSR × LC) = {psr.toFixed(1)} + ({csr} × {LC}) = <strong>{reading.toFixed(2)} mm</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ScrewGaugeLab;
