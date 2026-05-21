import React, { useRef, useEffect, useState } from 'react';

const RING_COLORS = ['#94a3b8', '#60a5fa', '#f472b6', '#fbbf24', '#34d399', '#a78bfa', '#fb923c'];
const BASE_RINGS = [
  { rx: 38, ry: 15 }, { rx: 66, ry: 26 }, { rx: 95, ry: 38 },
  { rx: 124, ry: 49 }, { rx: 148, ry: 59 }, { rx: 166, ry: 66 }, { rx: 178, ry: 71 },
];
const SPEEDS = [0.8, 0.6, 0.45, 0.35, 0.28, 0.22, 0.18];

interface Props { shells: number[]; atomicNumber: number; id: string; }

const BohrModel: React.FC<Props> = ({ shells, atomicNumber }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef<number>(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    const draw = () => {
      const t = tRef.current;
      const z = zoom;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H);

      // Draw rings
      shells.slice(0, 7).forEach((_, i) => {
        const { rx, ry } = BASE_RINGS[i];
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx * z, ry * z, 0, 0, Math.PI * 2);
        ctx.strokeStyle = RING_COLORS[i]; ctx.lineWidth = 2.2; ctx.globalAlpha = 0.55; ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Nucleus glow
      const nucleusR = Math.min(18, 8 + Math.sqrt(atomicNumber) * 1.8) * z;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, nucleusR + 12 * z);
      grd.addColorStop(0, 'rgba(239,68,68,0.45)'); grd.addColorStop(1, 'rgba(239,68,68,0)');
      ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, nucleusR + 12 * z, 0, Math.PI * 2); ctx.fill();

      // Protons (red)
      const pc = Math.min(atomicNumber, 12);
      for (let p = 0; p < pc; p++) {
        const a = (p / pc) * Math.PI * 2;
        const nx = cx + Math.cos(a) * (nucleusR * 0.38); const ny = cy + Math.sin(a) * (nucleusR * 0.28);
        const pr = Math.max(2.5, nucleusR * 0.28);
        const pg = ctx.createRadialGradient(nx - pr * 0.3, ny - pr * 0.3, 0, nx, ny, pr);
        pg.addColorStop(0, '#fca5a5'); pg.addColorStop(1, '#dc2626');
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(nx, ny, pr, 0, Math.PI * 2); ctx.fill();
      }
      // Neutrons (gray)
      const nc = Math.min(Math.round(atomicNumber * 1.2), 10);
      for (let n = 0; n < nc; n++) {
        const a = (n / nc) * Math.PI * 2 + 0.5;
        const nx = cx + Math.cos(a) * (nucleusR * 0.32); const ny = cy + Math.sin(a) * (nucleusR * 0.22);
        const nr = Math.max(2, nucleusR * 0.24);
        const ng = ctx.createRadialGradient(nx - nr * 0.3, ny - nr * 0.3, 0, nx, ny, nr);
        ng.addColorStop(0, '#e2e8f0'); ng.addColorStop(1, '#64748b');
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(nx, ny, nr, 0, Math.PI * 2); ctx.fill();
      }

      // Electrons: computed from angle on ellipse (always on ring)
      shells.slice(0, 7).forEach((count, i) => {
        const { rx, ry } = BASE_RINGS[i];
        const rxz = rx * z, ryz = ry * z;
        const clamp = Math.min(count, 18);
        const speed = SPEEDS[i];
        for (let e = 0; e < clamp; e++) {
          const angle = (e / clamp) * Math.PI * 2 + t * speed;
          const ex = cx + Math.cos(angle) * rxz;
          const ey = cy + Math.sin(angle) * ryz;
          const er = Math.max(2.5, 4 * z);
          // glow
          const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, er * 2.5);
          eg.addColorStop(0, RING_COLORS[i] + 'cc'); eg.addColorStop(1, RING_COLORS[i] + '00');
          ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex, ey, er * 2.5, 0, Math.PI * 2); ctx.fill();
          // dot
          ctx.fillStyle = RING_COLORS[i];
          ctx.beginPath(); ctx.arc(ex, ey, er, 0, Math.PI * 2); ctx.fill();
        }
      });

      tRef.current += 0.015;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [shells, atomicNumber, zoom]);

  return (
    <div className="flex flex-col items-center gap-3 w-full h-full">
      <canvas ref={canvasRef} width={440} height={300}
        className="w-full" style={{ maxHeight: '300px', borderRadius: '12px' }} />
      <div className="flex items-center gap-3">
        <button onClick={() => setZoom(z => Math.max(0.4, +(z - 0.2).toFixed(1)))}
          className="size-8 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold text-xl flex items-center justify-center transition-colors">−</button>
        <span className="text-xs text-zinc-500 font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(z => Math.min(2.2, +(z + 0.2).toFixed(1)))}
          className="size-8 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold text-xl flex items-center justify-center transition-colors">+</button>
      </div>
    </div>
  );
};

export default BohrModel;
