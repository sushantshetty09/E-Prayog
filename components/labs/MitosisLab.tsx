import React, { useState, useRef, useEffect, useCallback } from 'react';

const STAGES = [
  {
    name: 'Interphase', short: 'G2/S', color: '#60a5fa',
    desc: 'DNA replication complete (S-phase). Cell grows and prepares. Chromatin is diffuse; nucleus clearly visible with nucleolus.',
  },
  {
    name: 'Prophase', short: 'Pro', color: '#a78bfa',
    desc: 'Chromatin condenses into distinct chromosomes. Nuclear envelope dissolves. Centrioles migrate to poles.',
  },
  {
    name: 'Metaphase', short: 'Meta', color: '#f59e0b',
    desc: 'Chromosomes align at metaphase plate (cell equator). Spindle fibers attach to kinetochores. Maximum condensation.',
  },
  {
    name: 'Anaphase', short: 'Ana', color: '#ef4444',
    desc: 'Sister chromatids separate. Kinetochore microtubules shorten, pulling chromatids to opposite poles.',
  },
  {
    name: 'Telophase', short: 'Telo', color: '#10b981',
    desc: 'Nuclear envelopes reform around each set of chromatids. Chromosomes decondense. Cleavage furrow deepens.',
  },
];

const MitosisLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [intraT, setIntraT] = useState(0); // 0→1 intra-stage animation
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setStage(s => (s + 1) % STAGES.length);
      setIntraT(0); tRef.current = 0;
    }, 3000);
    return () => clearInterval(id);
  }, [autoPlay]);

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#06080d'); bg.addColorStop(1, '#04050a');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2 + 10;
    const t = tRef.current;

    // Draw cell based on stage
    const drawCell = () => {
      // Stage-specific cell shape
      if (stage === 4) {
        // Telophase: pinching (two lobes)
        const pinch = Math.min(0.7, t * 0.8);
        const lobe = 55 + pinch * 15;
        const offset = 35 + pinch * 20;

        // Two daughter cells
        for (let side of [-1, 1]) {
          const scx = cx + side * offset * pinch;
          // Cell membrane
          ctx.shadowBlur = 20; ctx.shadowColor = STAGES[stage].color + '60';
          const cellGrad = ctx.createRadialGradient(scx, cy, 5, scx, cy, lobe);
          cellGrad.addColorStop(0, 'rgba(16,185,129,0.08)');
          cellGrad.addColorStop(1, 'rgba(16,185,129,0.02)');
          ctx.fillStyle = cellGrad;
          ctx.beginPath(); ctx.ellipse(scx, cy, lobe, lobe * 0.88, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = `rgba(16,185,129,${0.5 + pinch * 0.2})`; ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.ellipse(scx, cy, lobe, lobe * 0.88, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.shadowBlur = 0;

          // Nuclear envelope reforming
          const nAlpha = Math.min(0.45, t * 0.5);
          ctx.strokeStyle = `rgba(96,165,250,${nAlpha})`; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]);
          ctx.beginPath(); ctx.ellipse(scx, cy, 28, 24, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.setLineDash([]);

          // Decondensing chromosomes
          const chrAlpha = Math.max(0, 0.6 - t * 0.5);
          ctx.fillStyle = `rgba(167,139,250,${chrAlpha})`;
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const cr = 14 + Math.random() * 4;
            const px = scx + Math.cos(angle) * cr, py = cy + Math.sin(angle) * cr * 0.7;
            ctx.beginPath(); ctx.ellipse(px, py, 3 + t * 2, 5, angle * 0.3, 0, Math.PI * 2); ctx.fill();
          }

          // Nucleolus appearing
          if (t > 0.5) {
            ctx.fillStyle = `rgba(147,197,253,${(t - 0.5) * 0.6})`;
            ctx.beginPath(); ctx.arc(scx, cy, 4, 0, Math.PI * 2); ctx.fill();
          }
        }

        // Cleavage furrow
        if (pinch > 0.1) {
          ctx.strokeStyle = `rgba(16,185,129,${pinch * 0.5})`; ctx.lineWidth = pinch * 6;
          ctx.beginPath(); ctx.moveTo(cx, cy - 50); ctx.lineTo(cx, cy + 50); ctx.stroke();
        }

      } else {
        // Oval cell for other stages
        const cellX = 90 + (stage === 3 ? 5 : 0);
        const cellY = 80;

        ctx.shadowBlur = 25; ctx.shadowColor = STAGES[stage].color + '50';
        const cGrad = ctx.createRadialGradient(cx, cy, 8, cx, cy, cellX);
        cGrad.addColorStop(0, `${STAGES[stage].color}0a`);
        cGrad.addColorStop(0.7, `${STAGES[stage].color}04`);
        cGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = cGrad;
        ctx.beginPath(); ctx.ellipse(cx, cy, cellX, cellY, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `${STAGES[stage].color}80`; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.ellipse(cx, cy, cellX, cellY, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.shadowBlur = 0;

        // Cytoplasm texture
        ctx.fillStyle = 'rgba(96,165,250,0.03)';
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * 40, cy + Math.sin(angle) * 30, 10, 0, Math.PI * 2); ctx.fill();
        }

        // ── Nucleus / Chromosomes by stage ──
        if (stage === 0) {
          // Interphase: large nucleus with nucleolus
          const nGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, 38);
          nGrad.addColorStop(0, 'rgba(96,165,250,0.2)'); nGrad.addColorStop(1, 'rgba(59,130,246,0.06)');
          ctx.fillStyle = nGrad;
          ctx.beginPath(); ctx.arc(cx, cy, 38, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(96,165,250,0.4)'; ctx.lineWidth = 2; ctx.setLineDash([4, 5]);
          ctx.beginPath(); ctx.arc(cx, cy, 38, 0, Math.PI * 2); ctx.stroke();
          ctx.setLineDash([]);
          // Nucleolus
          ctx.fillStyle = 'rgba(147,197,253,0.5)';
          ctx.beginPath(); ctx.arc(cx - 8, cy + 5, 9, 0, Math.PI * 2); ctx.fill();
          // Diffuse chromatin
          ctx.fillStyle = 'rgba(167,139,250,0.2)';
          for (let i = 0; i < 18; i++) {
            const a = (i / 18) * Math.PI * 2, r = 8 + (i % 4) * 6;
            ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.5, 5, a, 0, Math.PI * 2); ctx.fill();
          }

        } else if (stage === 1) {
          // Prophase: condensing chromosomes, aster forming
          const chAlpha = 0.5 + t * 0.4;
          // Centrioles & asters
          const asters = [[-cellX + 20, 0], [cellX - 20, 0]];
          asters.forEach(([dx]) => {
            ctx.strokeStyle = `rgba(251,191,36,${0.3 + t * 0.4})`; ctx.lineWidth = 0.8;
            for (let ai = 0; ai < 8; ai++) {
              const aa = (ai / 8) * Math.PI * 2;
              ctx.beginPath(); ctx.moveTo(cx + dx, cy);
              ctx.lineTo(cx + dx + Math.cos(aa) * 18, cy + Math.sin(aa) * 18); ctx.stroke();
            }
            ctx.shadowBlur = 8; ctx.shadowColor = '#fbbf24';
            ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(cx + dx, cy, 4, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
          });
          // Condensing chromosomes
          [[0,-22],[14,-12],[-12,-18],[18,5],[-18,8],[5,20],[-8,18],[16,-22]].forEach(([dx,dy], ci) => {
            ctx.save(); ctx.translate(cx + dx, cy + dy); ctx.rotate(ci * 0.7);
            ctx.fillStyle = `rgba(167,139,250,${chAlpha})`;
            ctx.beginPath(); ctx.ellipse(0, 0, 3.5, 9, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = `rgba(109,40,217,${chAlpha * 0.6})`; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.ellipse(0, 0, 3.5, 9, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
          });

        } else if (stage === 2) {
          // Metaphase: chromosomes at equator, full spindle
          const chroms = [-35, -25, -15, -5, 5, 15, 25, 35];
          // Spindle fibers
          chroms.forEach(dy => {
            ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(cx - cellX + 18, cy); ctx.lineTo(cx, cy + dy); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx + cellX - 18, cy); ctx.lineTo(cx, cy + dy); ctx.stroke();
          });
          // Centrioles
          [[-cellX + 18, 0], [cellX - 18, 0]].forEach(([dx]) => {
            ctx.shadowBlur = 12; ctx.shadowColor = '#fbbf24';
            ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(cx + dx, cy, 5, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
          });
          // Chromosomes at plate
          chroms.forEach((dy, ci) => {
            ctx.save(); ctx.translate(cx, cy + dy);
            ctx.fillStyle = '#a78bfa';
            ctx.beginPath(); ctx.ellipse(-4, 0, 3.5, 7, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(4, 0, 3.5, 7, 0, 0, Math.PI * 2); ctx.fill();
            // Centromere
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2); ctx.fill();
            // Kinetochore
            ctx.strokeStyle = 'rgba(251,191,36,0.5)'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-cellX + 18 - (-cellX + 18 + cx - cx), -dy); ctx.stroke();
            ctx.restore();
          });

        } else if (stage === 3) {
          // Anaphase: chromatids moving apart
          const separation = 20 + t * 40;
          const chroms = [-28, -18, -8, 2, 12, 22, 32];

          // Stretched spindle fibers
          chroms.forEach(dy => {
            ctx.strokeStyle = 'rgba(148,163,184,0.2)'; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(cx - cellX + 15, cy); ctx.lineTo(cx - separation * 0.5, cy + dy * 0.5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx + cellX - 15, cy); ctx.lineTo(cx + separation * 0.5, cy + dy * 0.5); ctx.stroke();
          });

          // Two groups moving apart
          for (const side of [-1, 1]) {
            const gx = cx + side * separation * 0.5;
            chroms.forEach((dy, ci) => {
              ctx.save(); ctx.translate(gx, cy + dy * 0.55);
              ctx.fillStyle = '#a78bfa';
              ctx.beginPath(); ctx.ellipse(0, 0, 3, 7, 0, 0, Math.PI * 2); ctx.fill();
              ctx.strokeStyle = 'rgba(109,40,217,0.5)'; ctx.lineWidth = 0.7;
              ctx.beginPath(); ctx.ellipse(0, 0, 3, 7, 0, 0, Math.PI * 2); ctx.stroke();
              ctx.restore();
            });
            // Centrioles at poles
            ctx.shadowBlur = 10; ctx.shadowColor = '#ef4444';
            ctx.fillStyle = '#ef4444';
            ctx.beginPath(); ctx.arc(cx + side * (cellX - 14), cy, 5, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Stretching cell membrane hint
          ctx.strokeStyle = 'rgba(239,68,68,0.2)'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]);
          ctx.beginPath(); ctx.moveTo(cx, cy - cellY + 10); ctx.lineTo(cx, cy + cellY - 10); ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    };

    drawCell();

    // ── Scale bar & labels ──
    ctx.fillStyle = STAGES[stage].color; ctx.font = 'bold 14px Inter'; ctx.textAlign = 'center';
    ctx.shadowBlur = 10; ctx.shadowColor = STAGES[stage].color;
    ctx.fillText(STAGES[stage].name, cx, 35);
    ctx.shadowBlur = 0;
    // Scale bar
    ctx.strokeStyle = 'rgba(100,116,139,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W - 60, H - 20); ctx.lineTo(W - 20, H - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 60, H - 23); ctx.lineTo(W - 60, H - 17); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 20, H - 23); ctx.lineTo(W - 20, H - 17); ctx.stroke();
    ctx.fillStyle = 'rgba(100,116,139,0.6)'; ctx.font = '8px Inter';
    ctx.fillText('10 µm', W - 40, H - 8);

    tRef.current = Math.min(1, tRef.current + 0.008);
    setIntraT(tRef.current);
    rafRef.current = requestAnimationFrame(draw);
  }, [stage]);

  useEffect(() => {
    tRef.current = 0; setIntraT(0);
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <div className="flex flex-col h-full gap-0" style={{ background: 'linear-gradient(160deg,#06080f,#080a14)', borderRadius: '12px', overflow: 'hidden' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(34,197,94,0.2)', background: 'rgba(6,8,15,0.9)' }}>
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">🔬 Mitosis — Cell Division Stages</h3>
          <p className="text-[10px] text-slate-500 mt-0.5">Somatic cell division · Chromosome behaviour · Equational division</p>
        </div>
        <button onClick={() => setAutoPlay(p => !p)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold"
          style={{ background: autoPlay ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', color: autoPlay ? '#f87171' : '#4ade80', border: `1px solid ${autoPlay ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}` }}>
          {autoPlay ? '⏸ Pause' : '▶ Auto'}
        </button>
      </div>

      <canvas ref={canvasRef} width={440} height={310} className="w-full" style={{ display: 'block' }} />

      <div className="px-4 py-3 flex flex-col gap-3 border-t" style={{ borderColor: 'rgba(34,197,94,0.12)', background: 'rgba(5,7,12,0.97)' }}>
        <div className="flex gap-1">
          {STAGES.map((st, i) => (
            <button key={i} onClick={() => { setStage(i); tRef.current = 0; setAutoPlay(false); }}
              className="flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all"
              style={{ background: i === stage ? st.color + '25' : 'rgba(255,255,255,0.04)', color: i === stage ? st.color : '#475569', border: `1px solid ${i === stage ? st.color + '50' : 'rgba(255,255,255,0.07)'}` }}>
              {st.short}
            </button>
          ))}
        </div>
        <div className="rounded-xl p-3 text-[10px] text-slate-400" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${STAGES[stage].color}25` }}>
          <span className="font-bold" style={{ color: STAGES[stage].color }}>{STAGES[stage].name}: </span>{STAGES[stage].desc}
        </div>
        {/* Intra-stage progress */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-500 whitespace-nowrap">Stage progress</span>
          <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-100" style={{ width: `${intraT * 100}%`, background: STAGES[stage].color }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MitosisLab;
