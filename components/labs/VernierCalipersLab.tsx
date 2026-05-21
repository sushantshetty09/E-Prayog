import React, { useState, useRef, useEffect } from 'react';

const LC = 0.01; // cm

const VernierCalipersLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [jawPos, setJawPos] = useState(48); // 0-100 slider => 0-5 cm

  const diameter = (jawPos / 100) * 5;
  const msr = Math.floor(diameter * 10) / 10;
  const vsd = Math.round((diameter - msr) / LC);
  const reading = msr + vsd * LC;

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Dark lab background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#07090f'); bg.addColorStop(1, '#040507');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // Subtle grid
    ctx.fillStyle = 'rgba(56,189,248,0.01)';
    for (let x = 0; x < W; x += 20) { ctx.fillRect(x, 0, 1, H); }
    for (let y = 0; y < H; y += 20) { ctx.fillRect(0, y, W, 1); }

    const scaleL = W * 0.75;
    const ox = 70;
    const oy = H / 2 - 20;

    // ── Main scale bar (metallic) ──
    const mainGrad = ctx.createLinearGradient(ox, oy, ox, oy + 40);
    mainGrad.addColorStop(0, '#334155'); mainGrad.addColorStop(0.5, '#475569'); mainGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = mainGrad;
    ctx.beginPath(); ctx.roundRect(ox, oy, scaleL + 40, 40, 4); ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();
    // Inner groove
    ctx.fillStyle = '#1e293b'; ctx.fillRect(ox + 5, oy + 25, scaleL + 30, 8);
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1; ctx.strokeRect(ox + 5, oy + 25, scaleL + 30, 8);

    // Main scale markings (0 to 6 cm)
    ctx.fillStyle = '#e2e8f0'; ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
    ctx.strokeStyle = '#e2e8f0';
    for (let i = 0; i <= 60; i++) {
      const x = ox + (i / 50) * (scaleL * 0.833); // adjust scale to show 6cm
      if (x > ox + scaleL + 30) break;
      const isCm = i % 10 === 0;
      const isHalf = i % 5 === 0;
      ctx.lineWidth = isCm ? 1.5 : 0.8;
      ctx.beginPath(); ctx.moveTo(x, oy); ctx.lineTo(x, oy + (isCm ? 12 : isHalf ? 8 : 5)); ctx.stroke();
      if (isCm) ctx.fillText(`${i / 10}`, x, oy + 23);
    }

    // ── Fixed Jaw (left) ──
    const fixGrad = ctx.createLinearGradient(ox - 10, oy - 20, ox + 15, oy + 100);
    fixGrad.addColorStop(0, '#1e293b'); fixGrad.addColorStop(0.3, '#475569'); fixGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = fixGrad;
    ctx.beginPath();
    ctx.moveTo(ox + 10, oy);
    ctx.lineTo(ox - 10, oy); ctx.lineTo(ox - 10, oy + 100); ctx.lineTo(ox, oy + 100);
    ctx.lineTo(ox + 10, oy + 40); ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();
    // Inside measurement jaw (top)
    ctx.beginPath();
    ctx.moveTo(ox + 10, oy); ctx.lineTo(ox - 10, oy); ctx.lineTo(ox - 10, oy - 30);
    ctx.lineTo(ox, oy - 30); ctx.lineTo(ox + 10, oy); ctx.fill(); ctx.stroke();

    // ── Movable Vernier Scale & Jaw ──
    const vOffset = ox + 10 + (diameter / 5) * (scaleL * 0.833);
    const vW = 100;
    
    // Movable scale block
    const vernGrad = ctx.createLinearGradient(vOffset, oy - 5, vOffset, oy + 45);
    vernGrad.addColorStop(0, '#1a2235'); vernGrad.addColorStop(0.5, '#3b5070'); vernGrad.addColorStop(1, '#1a2235');
    ctx.fillStyle = vernGrad;
    ctx.beginPath(); ctx.roundRect(vOffset, oy - 4, vW, 48, 5); ctx.fill();
    ctx.strokeStyle = '#4a7db5'; ctx.lineWidth = 1.5; ctx.stroke();
    
    // Vernier scale markings (0-10 divisions covering 9 main scale divs)
    ctx.strokeStyle = '#38bdf8'; ctx.fillStyle = '#38bdf8'; ctx.font = '9px Inter';
    const mainDivWidth = (scaleL * 0.833) / 50;
    const vDivWidth = (9 * mainDivWidth) / 10;
    
    for (let i = 0; i <= 10; i++) {
      const x = vOffset + 8 + i * vDivWidth;
      const isMajor = i % 5 === 0;
      const isActive = i === vsd;
      
      ctx.lineWidth = isActive ? 2 : isMajor ? 1.5 : 0.8;
      ctx.strokeStyle = isActive ? '#10b981' : isMajor ? '#38bdf8' : '#0ea5e9';
      
      ctx.beginPath(); ctx.moveTo(x, oy - 4); ctx.lineTo(x, oy + (isMajor ? 10 : 6)); ctx.stroke();
      if (isMajor) {
        ctx.fillStyle = isActive ? '#10b981' : '#38bdf8';
        ctx.fillText(`${i}`, x, oy + 20);
      }
      
      if (isActive) {
        ctx.shadowBlur = 6; ctx.shadowColor = '#10b981';
        ctx.strokeStyle = '#10b981';
        ctx.beginPath(); ctx.moveTo(x, oy - 4); ctx.lineTo(x, oy + 12); ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    // Movable jaw (bottom)
    ctx.fillStyle = fixGrad;
    ctx.beginPath();
    ctx.moveTo(vOffset + 5, oy + 44);
    ctx.lineTo(vOffset - 5, oy + 44); ctx.lineTo(vOffset - 5, oy + 100); ctx.lineTo(vOffset + 5, oy + 100);
    ctx.lineTo(vOffset + 15, oy + 60); ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1; ctx.stroke();
    
    // Movable inside jaw (top)
    ctx.beginPath();
    ctx.moveTo(vOffset + 5, oy - 4); ctx.lineTo(vOffset - 5, oy - 4); ctx.lineTo(vOffset - 5, oy - 30);
    ctx.lineTo(vOffset + 5, oy - 30); ctx.lineTo(vOffset + 15, oy - 4); ctx.fill(); ctx.stroke();

    // Thumb screw
    ctx.fillStyle = '#64748b';
    ctx.beginPath(); ctx.roundRect(vOffset + vW - 15, oy + 44, 12, 16, 2); ctx.fill();
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.stroke();

    // ── Object (steel bearing) ──
    if (diameter > 0.05) {
      const objCx = ox + 10 + (vOffset - 5 - (ox + 10)) / 2;
      const objCy = oy + 65;
      const objR = Math.min((vOffset - 5 - (ox + 10)) / 2, 30);
      
      if (objR > 2) {
        const oGrad = ctx.createRadialGradient(objCx - objR*0.3, objCy - objR*0.3, 0, objCx, objCy, objR);
        oGrad.addColorStop(0, '#e2e8f0'); oGrad.addColorStop(0.5, '#94a3b8'); oGrad.addColorStop(1, '#334155');
        ctx.shadowBlur = 10; ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.fillStyle = oGrad;
        ctx.beginPath(); ctx.arc(objCx, objCy, objR, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Bench
    const bench = ctx.createLinearGradient(0, H - 15, 0, H);
    bench.addColorStop(0, '#3d2a1a'); bench.addColorStop(1, '#2a1d0f');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 15, W, 15);
    ctx.strokeStyle = '#5c3d1e'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 15); ctx.lineTo(W, H - 15); ctx.stroke();

    // Verification text
    ctx.shadowBlur = 6; ctx.shadowColor = '#10b981';
    ctx.fillStyle = '#10b981'; ctx.font = 'bold 12px Inter'; ctx.textAlign = 'center';
    ctx.fillText(`MSR = ${msr.toFixed(1)} cm | VSD = ${vsd} | LC = ${LC} cm | Total = ${reading.toFixed(2)} cm`, W / 2, H - 25);
    ctx.shadowBlur = 0;

  }, [jawPos, diameter, msr, vsd, reading]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f 0%,#040507 100%)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(56,189,248,0.2)', background: 'rgba(7,9,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">📏 Vernier Calipers</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Least Count (LC) = {LC} cm &nbsp;|&nbsp; Reading = MSR + (VSD × LC)</p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>
          {reading.toFixed(2)} cm
        </div>
      </div>
      
      <canvas ref={canvasRef} width={680} height={320} className="w-full" style={{ display: 'block' }} />
      
      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(56,189,248,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex items-center gap-4">
          <label className="text-xs text-zinc-400 whitespace-nowrap">Slide Jaw</label>
          <input type="range" min={0} max={100} step={0.2} value={jawPos} onChange={e => setJawPos(Number(e.target.value))} className="flex-1 h-1.5 rounded-full accent-sky-500" />
          <span className="text-xs font-mono text-sky-400 w-16 text-right">{diameter.toFixed(2)} cm</span>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'MSR', val: `${msr.toFixed(1)} cm`, color: '#e2e8f0', bg: 'rgba(226,232,240,0.05)', border: 'rgba(226,232,240,0.15)' },
            { label: 'VSD', val: `${vsd} div`, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)' },
            { label: 'VSD × LC', val: `${(vsd * LC).toFixed(2)} cm`, color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)' },
            { label: 'TOTAL', val: `${reading.toFixed(2)} cm`, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
          ].map(m => (
            <div key={m.label} className="rounded-xl p-2.5 text-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
              <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">{m.label}</div>
              <div className="text-sm font-bold font-mono mt-0.5" style={{ color: m.color }}>{m.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VernierCalipersLab;
