import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

// 4x4 Bayer Dither Matrix
const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5
];

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const scale = 0.25;

    function renderDither() {
      if (!canvas || !ctx) return;

      const w = Math.max(160, Math.floor(window.innerWidth * scale));
      const h = Math.max(90, Math.floor(window.innerHeight * scale));

      canvas.width = w;
      canvas.height = h;

      const imgData = ctx.createImageData(w, h);
      const buf = imgData.data;

      // Theme colors (#9B8AFB brand accent)
      const isDark = theme === 'dark';
      const bgR = isDark ? 9 : 245;
      const bgG = isDark ? 9 : 245;
      const bgB = isDark ? 11 : 240;

      const fgR = 155;
      const fgG = 138;
      const fgB = 251;
      const fgAlpha = isDark ? 0.35 : 0.18;

      const t = 1.5; // Static warp state
      const isMobile = window.innerWidth < 768;

      const minDim = Math.min(w, h);
      const aspectX = w / minDim;
      const aspectY = h / minDim;

      let idx = 0;
      for (let y = 0; y < h; y++) {
        const ny = isMobile ? ((y / h) - 0.5) * 2.5 * aspectY : (y / h) * 3 - 1.5;
        const bayerRow = (y % 4) * 4;

        for (let x = 0; x < w; x++) {
          const nx = isMobile ? ((x / w) - 0.5) * 2.5 * aspectX : (x / w) * 3 - 1.5;

          let wx = nx;
          let wy = ny;
          for (let i = 1; i < 4; i++) {
            wx += (0.4 / i) * Math.cos(i * 2.2 * wy + t);
            wy += (0.4 / i) * Math.cos(i * 1.6 * wx + t);
          }

          const rawDist = Math.abs(Math.sin(t - wy - wx));
          const shape = Math.min(1, Math.max(0, 0.12 / Math.max(0.001, rawDist)));

          const bayerVal = BAYER_4X4[bayerRow + (x % 4)] / 16.0;
          const dither = shape + (bayerVal - 0.5) * 0.4 > 0.45 ? 1 : 0;

          if (dither) {
            buf[idx] = Math.round(fgR * fgAlpha + bgR * (1 - fgAlpha));
            buf[idx + 1] = Math.round(fgG * fgAlpha + bgG * (1 - fgAlpha));
            buf[idx + 2] = Math.round(fgB * fgAlpha + bgB * (1 - fgAlpha));
          } else {
            buf[idx] = bgR;
            buf[idx + 1] = bgG;
            buf[idx + 2] = bgB;
          }
          buf[idx + 3] = 255;
          idx += 4;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    }

    renderDither();

    let lastWidth = window.innerWidth;
    let resizeRafId: number | null = null;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      if (resizeRafId !== null) return;
      resizeRafId = requestAnimationFrame(() => {
        renderDither();
        resizeRafId = null;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      <canvas
        ref={canvasRef}
        id="c"
        className="w-full h-full opacity-90 transition-opacity duration-500"
        style={{
          imageRendering: 'pixelated',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
