import React, { useState, useRef, useEffect, useCallback } from 'react';

const BLOOD_TYPES = [
  { type: 'A+',  antiA: true,  antiB: false, antiD: true  },
  { type: 'A-',  antiA: true,  antiB: false, antiD: false },
  { type: 'B+',  antiA: false, antiB: true,  antiD: true  },
  { type: 'B-',  antiA: false, antiB: true,  antiD: false },
  { type: 'AB+', antiA: true,  antiB: true,  antiD: true  },
  { type: 'AB-', antiA: true,  antiB: true,  antiD: false },
  { type: 'O+',  antiA: false, antiB: false, antiD: true  },
  { type: 'O-',  antiA: false, antiB: false, antiD: false },
];

// Deterministic pseudo-random for stable RBC positions
function seededRand(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function makeRBCs(cx: number, cy: number, r: number, n: number, seed: number) {
  const rng = seededRand(seed);
  return Array.from({ length: n }, (_, i) => {
    const a = rng() * Math.PI * 2;
    const dist = rng() * r * 0.82;
    return { x: cx + Math.cos(a) * dist, y: cy + Math.sin(a) * dist, rot: rng() * Math.PI, i };
  });
}

const WELLS = [
  { label: 'Anti-A Serum', key: 'antiA' as const, color: '#38bdf8', glowColor: 'rgba(56,189,248,0.5)', cx: 110 },
  { label: 'Anti-B Serum', key: 'antiB' as const, color: '#c084fc', glowColor: 'rgba(192,132,252,0.5)', cx: 270 },
  { label: 'Anti-D Serum', key: 'antiD' as const, color: '#34d399', glowColor: 'rgba(52,211,153,0.5)', cx: 430 },
];

const BloodGroupLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selIdx, setSelIdx] = useState(0);
  const [tested, setTested] = useState(false);
  const animTRef = useRef(0);
  const rafRef = useRef(0);
  const bt = BLOOD_TYPES[selIdx];

  // Pre-generate stable RBC positions per well
  const rbcSets = WELLS.map((w, wi) => makeRBCs(w.cx, 170, 62, 20, wi * 500 + selIdx * 77));

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // ── Background ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#08090f'); bg.addColorStop(1, '#050609');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // Lab bench
    const bench = ctx.createLinearGradient(0, H - 22, 0, H);
    bench.addColorStop(0, '#1a1208'); bench.addColorStop(1, '#0d0904');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 22, W, 22);
    ctx.strokeStyle = 'rgba(90,60,20,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H - 22); ctx.lineTo(W, H - 22); ctx.stroke();

    const t = animTRef.current; // 0→1 agglutination progress

    WELLS.forEach((well, wi) => {
      const { cx, color, glowColor, label, key } = well;
      const cy = 170, wr = 65;
      const reacts = bt[key];
      const cells = rbcSets[wi];
      const progress = tested ? Math.min(1, t) : 0;

      // Glass petri dish glow
      if (reacts && tested) {
        ctx.shadowBlur = 30 * progress; ctx.shadowColor = glowColor;
      }
      // Outer rim
      ctx.beginPath(); ctx.arc(cx, cy, wr + 8, 0, Math.PI * 2);
      const rimGrad = ctx.createRadialGradient(cx - 20, cy - 20, 5, cx, cy, wr + 8);
      rimGrad.addColorStop(0, 'rgba(255,255,255,0.06)'); rimGrad.addColorStop(1, 'rgba(255,255,255,0.01)');
      ctx.fillStyle = rimGrad; ctx.fill();
      ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.shadowBlur = 0;

      // Slide interior
      ctx.beginPath(); ctx.arc(cx, cy, wr, 0, Math.PI * 2);
      ctx.fillStyle = '#010204'; ctx.fill();
      ctx.strokeStyle = 'rgba(148,163,184,0.15)'; ctx.lineWidth = 1; ctx.stroke();

      // Serum tint
      if (tested) {
        ctx.beginPath(); ctx.arc(cx, cy, wr - 2, 0, Math.PI * 2);
        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, wr);
        sg.addColorStop(0, color + '18'); sg.addColorStop(1, 'transparent');
        ctx.fillStyle = sg; ctx.fill();
      }

      // Draw each RBC
      cells.forEach((cell, i) => {
        let { x, y, rot } = cell;
        if (reacts && tested && progress > 0) {
          // Clump cells into 3 clusters
          const clusterIdx = i % 3;
          const angles = [0.5, 2.2, 4.0];
          const clusterX = cx + Math.cos(angles[clusterIdx]) * 18;
          const clusterY = cy + Math.sin(angles[clusterIdx]) * 14;
          x = cell.x + (clusterX - cell.x) * progress;
          y = cell.y + (clusterY - cell.y) * progress;
          rot = cell.rot + progress * 0.8;
        }
        ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
        // Biconcave disc: radial gradient with pale center
        const rg = ctx.createRadialGradient(0, 0, 1, 0, 0, 9);
        const alpha = reacts && tested ? 1.0 : 0.7;
        rg.addColorStop(0, `rgba(250,230,230,${alpha * 0.35})`); // pale biconcave center
        rg.addColorStop(0.35, `rgba(210,50,50,${alpha * 0.75})`);
        rg.addColorStop(0.7, `rgba(175,20,20,${alpha})`);
        rg.addColorStop(1, `rgba(100,5,5,${alpha})`);
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.ellipse(0, 0, 9, 6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(60,0,0,${alpha * 0.5})`; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.ellipse(0, 0, 9, 6, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      });

      // Clump halos
      if (reacts && tested && progress > 0.4) {
        [[cx - 18, cy - 12], [cx + 14, cy + 10], [cx - 4, cy + 18]].forEach(([clx, cly]) => {
          ctx.beginPath(); ctx.arc(clx, cly, 14 * progress, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,30,30,${progress * 0.12})`; ctx.fill();
        });
      }

      // Well label
      ctx.font = 'bold 10px Inter'; ctx.textAlign = 'center';
      ctx.fillStyle = color;
      ctx.fillText(label, cx, cy - wr - 12);

      // Result badge
      if (tested) {
        const badgeY = cy + wr + 20;
        if (reacts) {
          ctx.shadowBlur = 12; ctx.shadowColor = '#ef4444';
          ctx.fillStyle = '#ef4444'; ctx.font = 'bold 9px Inter';
          ctx.fillText('⊕ AGGLUTINATED', cx, badgeY);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = '#10b981'; ctx.font = '9px Inter';
          ctx.fillText('○ No Reaction', cx, badgeY);
        }
      }
    });

    // Blood group result
    if (tested) {
      ctx.beginPath(); ctx.roundRect(W / 2 - 90, H - 52, 180, 38, 8);
      const rg2 = ctx.createLinearGradient(W / 2 - 90, H - 52, W / 2 + 90, H - 14);
      rg2.addColorStop(0, 'rgba(185,28,28,0.2)'); rg2.addColorStop(1, 'rgba(100,10,10,0.1)');
      ctx.fillStyle = rg2; ctx.fill();
      ctx.strokeStyle = 'rgba(220,38,38,0.35)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#fca5a5'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
      ctx.fillText('IDENTIFIED BLOOD GROUP', W / 2, H - 36);
      ctx.shadowBlur = 20; ctx.shadowColor = '#dc2626';
      ctx.fillStyle = '#fff'; ctx.font = 'bold 20px Inter';
      ctx.fillText(bt.type, W / 2, H - 16);
      ctx.shadowBlur = 0;
    }

    if (tested && animTRef.current < 1) {
      animTRef.current = Math.min(1, animTRef.current + 0.025);
      rafRef.current = requestAnimationFrame(draw);
    }
  }, [tested, selIdx, bt, rbcSets]);

  useEffect(() => {
    animTRef.current = 0;
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080b14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🩸 Blood Group Identification — ABO + Rh System</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Antigen-antibody agglutination on microscope slide</p>
        </div>
        <button onClick={() => { setTested(false); animTRef.current = 0; }} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>🔄 Reset</button>
      </div>

      <canvas ref={canvasRef} width={540} height={310} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(239,68,68,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div>
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 block">Select Blood Sample</label>
          <div className="grid grid-cols-8 gap-1">
            {BLOOD_TYPES.map((b, i) => (
              <button key={i} onClick={() => { setSelIdx(i); setTested(false); animTRef.current = 0; }}
                className="py-1.5 rounded-lg text-xs font-bold transition-all"
                style={{ background: i === selIdx ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.04)', color: i === selIdx ? '#f87171' : '#64748b', border: `1px solid ${i === selIdx ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.07)'}` }}>
                {b.type}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => { setTested(true); animTRef.current = 0; }} disabled={tested}
          className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
          style={{ background: tested ? 'rgba(255,255,255,0.04)' : 'rgba(239,68,68,0.2)', color: tested ? '#475569' : '#f87171', border: `1px solid ${tested ? 'rgba(255,255,255,0.08)' : 'rgba(239,68,68,0.3)'}` }}>
          {tested ? '✓ Antisera Applied — Observe Slide' : '🧪 Apply Antisera & Test'}
        </button>
      </div>
    </div>
  );
};
export default BloodGroupLab;
