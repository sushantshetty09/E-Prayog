import React, { useState, useRef, useEffect, useCallback } from 'react';

const STEPS = [
  {
    id: 0, title: 'Homogenise Tissue', icon: '🍌',
    desc: 'Mash banana in extraction buffer (NaCl + SDS detergent + water). Detergent breaks lipid bilayer.',
    colors: { solution: ['#8B5E3C', '#5C3317'], label: '#fbbf24', layerName: 'Mashed tissue + buffer',
    layerH: 0.65, hasBubbles: true },
  },
  {
    id: 1, title: 'Incubate at 60°C', icon: '🌡',
    desc: 'Heat at 60°C for 15 min. Proteins denature, cell membranes lyse, chromatin disperses.',
    colors: { solution: ['#a36830', '#7c4e1f'], label: '#fb923c', layerName: 'Lysed cell homogenate',
    layerH: 0.65, hasBubbles: false, hasHeat: true },
  },
  {
    id: 2, title: 'Filter Through Gauze', icon: '🧹',
    desc: 'Pour through cheesecloth. Removes large cell debris: only clear lysate passes through.',
    colors: { solution: ['#b57040', '#7a4520'], label: '#94a3b8', layerName: 'Filtered lysate (clear)',
    layerH: 0.55, hasClear: true },
  },
  {
    id: 3, title: 'Layer Cold Ethanol', icon: '🧊',
    desc: 'Gently pour ice-cold 95% ethanol over filtrate. DNA is insoluble in ethanol: it precipitates.',
    colors: { solution: ['#b57040', '#7a4520'], label: '#38bdf8', layerName: 'Filtrate',
    layerH: 0.55, hasEthanol: true },
  },
  {
    id: 4, title: 'Observe DNA Precipitate', icon: '🧬',
    desc: 'White, cotton-like DNA strands appear at the ethanol-water interface. Spool with glass rod!',
    colors: { solution: ['#b57040', '#7a4520'], label: '#10b981', layerName: 'Filtrate',
    layerH: 0.55, hasEthanol: true, hasDNA: true },
  },
];

interface Bubble { x: number; y: number; r: number; vy: number; alpha: number; }
interface DNAStrand { x: number; y: number; phase: number; amp: number; }

const DNAIsolationLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const animTRef = useRef(0);
  const bubblesRef = useRef<Bubble[]>([]);
  const dnaRef = useRef<DNAStrand[]>([]);
  const rafRef = useRef(0);
  const s = STEPS[step];

  // Init DNA strands once for step 4
  useEffect(() => {
    if (step === 4 && dnaRef.current.length === 0) {
      dnaRef.current = Array.from({ length: 12 }, (_, i) => ({
        x: 185 + (Math.random() - 0.5) * 40,
        y: 175 + i * 4,
        phase: Math.random() * Math.PI * 2,
        amp: 8 + Math.random() * 10,
      }));
    }
    if (step < 4) dnaRef.current = [];
    bubblesRef.current = [];
    animTRef.current = 0;
  }, [step]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#06080e'); bg.addColorStop(1, '#040509');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Lab bench
    const bench = ctx.createLinearGradient(0, H - 24, 0, H);
    bench.addColorStop(0, '#1a1408'); bench.addColorStop(1, '#0d0a04');
    ctx.fillStyle = bench; ctx.fillRect(0, H - 24, W, 24);

    const cx = W / 2;
    const tTop = 50, tBot = H - 45, tW = 70, tR = 12;

    // ── Glass beaker ──
    ctx.save();
    // Clip to beaker shape
    ctx.beginPath();
    ctx.moveTo(cx - tW, tTop + 20);
    ctx.lineTo(cx - tW - 8, tBot);
    ctx.lineTo(cx + tW + 8, tBot);
    ctx.lineTo(cx + tW, tTop + 20);
    ctx.clip();

    // ── Layer 1: Tissue/lysate at bottom ──
    const lysateTop = tBot - (s.colors.layerH * (tBot - tTop - 20));
    const lg = ctx.createLinearGradient(cx, lysateTop, cx, tBot);
    lg.addColorStop(0, s.colors.solution[0] + 'cc');
    lg.addColorStop(1, s.colors.solution[1] + 'ff');
    ctx.fillStyle = lg;
    ctx.fillRect(cx - tW, lysateTop, tW * 2, tBot - lysateTop);

    // Particles in suspension (steps 0-1)
    if (step <= 1) {
      ctx.fillStyle = 'rgba(80,40,10,0.5)';
      for (let i = 0; i < 20; i++) {
        const px = cx - 50 + (i * 37 + 13) % 110;
        const py = lysateTop + 10 + (i * 53 + 7) % (tBot - lysateTop - 20);
        ctx.beginPath(); ctx.ellipse(px, py, 3 + (i % 3), 1.5, i * 0.4, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Heat shimmer (step 1)
    if (step === 1) {
      const ht = Date.now() * 0.004;
      ctx.strokeStyle = 'rgba(255,180,80,0.12)'; ctx.lineWidth = 1; ctx.setLineDash([4, 8]);
      for (let i = 0; i < 5; i++) {
        const sx = cx - 40 + i * 20;
        ctx.beginPath(); ctx.moveTo(sx + Math.sin(ht + i) * 4, tBot - 5);
        ctx.quadraticCurveTo(sx + Math.sin(ht * 1.3 + i) * 6, lysateTop + 30 + i * 15, sx, lysateTop + 5);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Clear filtrate layer (step 2+)
    if (step >= 2) {
      const filterGrad = ctx.createLinearGradient(cx, lysateTop - 5, cx, lysateTop + 25);
      filterGrad.addColorStop(0, 'rgba(180,120,60,0.1)');
      filterGrad.addColorStop(1, 'rgba(160,100,50,0.3)');
      ctx.fillStyle = filterGrad;
      ctx.fillRect(cx - tW, lysateTop - 5, tW * 2, 30);
    }

    // ── Ethanol layer (steps 3+) ──
    if (step >= 3) {
      const ethTop = lysateTop - 75;
      const ethGrad = ctx.createLinearGradient(cx, ethTop, cx, lysateTop);
      ethGrad.addColorStop(0, 'rgba(219,234,254,0.12)');
      ethGrad.addColorStop(1, 'rgba(219,234,254,0.35)');
      ctx.fillStyle = ethGrad;
      ctx.fillRect(cx - tW, ethTop, tW * 2, 75);

      // Ethanol label
      ctx.fillStyle = '#93c5fd'; ctx.font = '9px Inter'; ctx.textAlign = 'center';
      ctx.fillText('95% Ethanol (ice cold)', cx, ethTop + 20);

      // Interface line
      ctx.strokeStyle = 'rgba(147,197,253,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(cx - tW, lysateTop); ctx.lineTo(cx + tW, lysateTop); ctx.stroke();
      ctx.setLineDash([]);
    }

    // ── DNA strands (step 4) ──
    if (step === 4) {
      const dnaT = Math.min(1, animTRef.current / 60);
      const interfaceY = lysateTop - 6;
      ctx.shadowBlur = 12; ctx.shadowColor = '#10b981';
      dnaRef.current.forEach((strand, i) => {
        const progress = Math.min(1, Math.max(0, dnaT - i * 0.06));
        if (progress <= 0) return;
        const len = 60 * progress;
        ctx.strokeStyle = `rgba(255,255,255,${progress * 0.85})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let yy = 0; yy <= len; yy += 1) {
          const xx = strand.x + Math.sin(yy * 0.3 + strand.phase + animTRef.current * 0.02) * strand.amp * 0.4;
          if (yy === 0) ctx.moveTo(xx, interfaceY - yy);
          else ctx.lineTo(xx, interfaceY - yy);
        }
        ctx.stroke();
      });
      ctx.shadowBlur = 0;
    }

    ctx.restore();

    // ── Beaker glass walls ──
    ctx.beginPath();
    ctx.moveTo(cx - tW, tTop + 20);
    ctx.lineTo(cx - tW - 8, tBot);
    ctx.lineTo(cx + tW + 8, tBot);
    ctx.lineTo(cx + tW, tTop + 20);
    ctx.closePath();
    const glassG = ctx.createLinearGradient(cx - tW, 0, cx + tW, 0);
    glassG.addColorStop(0, 'rgba(255,255,255,0.12)');
    glassG.addColorStop(0.12, 'rgba(255,255,255,0.06)');
    glassG.addColorStop(0.5, 'rgba(148,163,184,0.02)');
    glassG.addColorStop(0.88, 'rgba(255,255,255,0.06)');
    glassG.addColorStop(1, 'rgba(255,255,255,0.12)');
    ctx.fillStyle = glassG; ctx.fill();
    ctx.strokeStyle = 'rgba(148,163,184,0.45)'; ctx.lineWidth = 2; ctx.stroke();

    // Beaker lip & spout
    ctx.beginPath(); ctx.moveTo(cx - tW - 5, tTop + 20); ctx.lineTo(cx + tW + 5, tTop + 20);
    ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - tW - 5, tTop + 20); ctx.quadraticCurveTo(cx - tW - 12, tTop + 12, cx - tW - 2, tTop + 14);
    ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.lineWidth = 2; ctx.stroke();

    // Shine
    ctx.beginPath(); ctx.moveTo(cx - tW + 4, tTop + 30); ctx.lineTo(cx - tW - 4, tBot - 10);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 3; ctx.stroke();

    // ── Bubbles (step 0) ──
    if (step === 0) {
      if (bubblesRef.current.length < 15 && Math.random() < 0.15) {
        bubblesRef.current.push({ x: cx - 40 + Math.random() * 80, y: tBot - 5, r: 2 + Math.random() * 3, vy: 0.5 + Math.random() * 0.5, alpha: 0.7 });
      }
      bubblesRef.current = bubblesRef.current.filter(b => b.alpha > 0).map(b => {
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,140,60,${b.alpha})`; ctx.lineWidth = 0.8; ctx.stroke();
        return { ...b, y: b.y - b.vy, alpha: b.y < tTop + 40 ? 0 : b.alpha - 0.005 };
      });
    }

    // ── Lysate layer label ──
    ctx.fillStyle = s.colors.label; ctx.font = 'bold 9px Inter'; ctx.textAlign = 'center';
    ctx.fillText(s.colors.layerName, cx + 95, tBot - 25);
    ctx.strokeStyle = s.colors.label + '60'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(cx + tW + 10, tBot - 20); ctx.lineTo(cx + 65, tBot - 20); ctx.stroke();

    // Ruler markings
    ctx.strokeStyle = 'rgba(100,116,139,0.3)'; ctx.lineWidth = 0.8;
    ctx.fillStyle = 'rgba(100,116,139,0.5)'; ctx.font = '8px Inter'; ctx.textAlign = 'left';
    for (let ml = 50; ml <= 200; ml += 50) {
      const my = tBot - (ml / 250) * (tBot - tTop - 25);
      ctx.beginPath(); ctx.moveTo(cx + tW + 8, my); ctx.lineTo(cx + tW + 15, my); ctx.stroke();
      ctx.fillText(`${ml}`, cx + tW + 17, my + 3);
    }

    // Step title
    ctx.shadowBlur = step === 4 ? 15 : 0; ctx.shadowColor = s.colors.label;
    ctx.fillStyle = s.colors.label; ctx.font = 'bold 13px Inter'; ctx.textAlign = 'center';
    ctx.fillText(s.title, cx, 34);
    ctx.shadowBlur = 0;

    animTRef.current += 1;
    rafRef.current = requestAnimationFrame(draw);
  }, [step, s]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">🧬 DNA Isolation from Plant Tissue (Banana)</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Detergent lysis → ethanol precipitation → DNA spooling</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-500">Step {step + 1}/5</span>
        </div>
      </div>

      <canvas ref={canvasRef} width={400} height={340} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(16,185,129,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        {/* Step pills */}
        <div className="flex gap-1 justify-center">
          {STEPS.map((st, i) => (
            <button key={st.title} onClick={() => setStep(i)}
              className="flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all text-center"
              style={{ background: i === step ? st.colors.label + '25' : 'rgba(255,255,255,0.04)', color: i === step ? st.colors.label : '#475569', border: `1px solid ${i <= step ? st.colors.label + '40' : 'rgba(255,255,255,0.07)'}` }}>
              {st.icon} {i + 1}
            </button>
          ))}
        </div>
        <div className="rounded-xl p-3 text-[10px] text-zinc-400" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.colors.label}25` }}>
          <span className="font-bold" style={{ color: s.colors.label }}>{s.title}: </span>{s.desc}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.04)', color: '#64748b', opacity: step === 0 ? 0.3 : 1 }}>
            ← Previous
          </button>
          <button onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4}
            className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: step === 4 ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', opacity: step === 4 ? 0.4 : 1 }}>
            Next Step →
          </button>
        </div>
      </div>
    </div>
  );
};
export default DNAIsolationLab;
