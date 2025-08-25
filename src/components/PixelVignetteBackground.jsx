// PixelVignetteBackground.jsx
import { useEffect, useRef } from "react";

/**
 * Pixel animation background with vignette mask.
 * The effect is strong at the edges and weak in the center.
 * Use as a background layer for the homepage.
 */
class Pixel {
  constructor(canvas, context, x, y, color, speed, delay, vignetteStrength, radialDistance) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 1; // widen step range for more variation
    this.minSize = 1;
    this.maxSizeInteger = 3; // slightly larger pixels at peak for visibility
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
    this.vignetteStrength = vignetteStrength; // 0 (center) ~ 1 (edge)
    // time accumulator for per-pixel oscillations
    this.time = 0;
    // per-pixel alpha flicker parameters (disabled if reduced motion via zero speed)
    this.alphaBase = 0.12 + 0.68 * this.vignetteStrength;
    this.alphaFlickerAmp = (this.speed > 0 ? 1 : 0) * (0.10 + 0.28 * this.vignetteStrength);
    this.alphaFreq = this.getRandomValue(0.8, 2.2);
    this.alphaPhase = Math.random() * Math.PI * 2;
    // radial distance from center for wave effect
    this.radialDistance = radialDistance;
    this.waveFactor = 0; // 0~1
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const sizeWithWave = this.size + this.waveFactor * 0.25; // subtle size boost
    const centerOffset = this.maxSizeInteger * 0.5 - sizeWithWave * 0.5;
    // Apply vignette by reducing alpha in the center
    this.ctx.save();
    // Per-pixel alpha oscillation to enhance visible flicker
    const alphaOsc = this.alphaBase + this.alphaFlickerAmp * Math.sin(this.time * this.alphaFreq + this.alphaPhase) + this.waveFactor * 0.07;
    const clampedAlpha = Math.max(0, Math.min(1, alphaOsc));
    this.ctx.globalAlpha = clampedAlpha;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      sizeWithWave,
      sizeWithWave
    );
    this.ctx.restore();
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.time += 0.05; // advance time for alpha flicker
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.time += 0.05;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
    // subtle size jitter to accentuate flicker
    this.size += 0.03 * Math.sin(this.time * (this.alphaFreq * 1.7) + this.alphaPhase * 0.5);
    this.time += 0.05;
  }

  // update wave factor based on current sweeping radius and band width
  applyWave(currentRadius, bandWidth) {
    const delta = Math.abs(this.radialDistance - currentRadius);
    if (delta <= bandWidth) {
      // taper with cosine for smoothness
      const t = 1 - delta / bandWidth;
      this.waveFactor = 0.5 - 0.5 * Math.cos(Math.PI * t);
    } else {
      this.waveFactor = 0;
    }
  }
}

function getEffectiveSpeed(value, reducedMotion) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = parseInt(value, 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

const VARIANTS = {
  default: {
    gap: 8,
    speed: 10,
    colors: "#193FB9,#F2EDFB,#B5A6F6,#6383EA"
  },
  blue: {
    gap: 10,
    speed: 25,
    colors: "#e0f2fe,#7dd3fc,#0ea5e9"
  },
  yellow: {
    gap: 3,
    speed: 20,
    colors: "#fef08a,#fde047,#eab308"
  },
  pink: {
    gap: 6,
    speed: 80,
    colors: "#fecdd3,#fda4af,#e11d48"
  }
};

/**
 * PixelVignetteBackground
 * @param {string} variant - color variant
 * @param {number} gap - pixel grid gap
 * @param {number} speed - animation speed
 * @param {string} colors - comma-separated color string
 * @param {string} className - extra class names
 */
export default function PixelVignetteBackground({
  variant = "default",
  gap,
  speed,
  colors,
  className = "",
  style = {}
}) {
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(performance.now());
  const reducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  const variantCfg = VARIANTS[variant] || VARIANTS.default;
  const finalGap = gap ?? variantCfg.gap;
  const finalSpeed = speed ?? variantCfg.speed;
  const finalColors = colors ?? variantCfg.colors;

  // Helper to get vignette strength (0=center, 1=edge)
  function getVignetteStrength(x, y, width, height) {
    const cx = width / 2;
    const cy = height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    // Use a power to make the center even weaker
    return Math.pow(Math.min(dist / maxDist, 1), 2.5);
  }

  const initPixels = () => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const ctx = canvasRef.current.getContext("2d");

    canvasRef.current.width = width;
    canvasRef.current.height = height;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;

    const colorsArray = finalColors.split(",");
    const pxs = [];
    for (let x = 0; x < width; x += parseInt(finalGap, 10)) {
      for (let y = 0; y < height; y += parseInt(finalGap, 10)) {
        const color =
          colorsArray[Math.floor(Math.random() * colorsArray.length)];
        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;
        const vignetteStrength = getVignetteStrength(x, y, width, height);

        pxs.push(
          new Pixel(
            canvasRef.current,
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(finalSpeed, reducedMotion),
            delay,
            vignetteStrength,
            distance
          )
        );
      }
    }
    pixelsRef.current = pxs;
  };

  // wave timing refs
  const waveStartRef = useRef(performance.now());
  const waveDurationRef = useRef(2400 + Math.random() * 600); // 2.4s ~ 3.0s

  const doAnimate = (fnName) => {
    animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // compute sweeping wave radius
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const cx = width / 2;
    const cy = height / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    const waveElapsed = timeNow - waveStartRef.current;
    if (waveElapsed > waveDurationRef.current + 200) {
      waveStartRef.current = timeNow;
      waveDurationRef.current = 2400 + Math.random() * 600; // 2.4~3.0s
    }
    const effectiveElapsed = Math.min(waveElapsed, waveDurationRef.current);
    const progress = effectiveElapsed / waveDurationRef.current;
    const currentRadius = progress * maxDist;
    const bandWidth = Math.max(32, maxDist * 0.06); // subtle band width

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      // apply gentle wave effect per pixel
      pixel.applyWave(currentRadius, bandWidth);
      pixel[fnName]();
      if (!pixel.isIdle) {
        allIdle = false;
      }
    }
    if (allIdle) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Always animate in background
  useEffect(() => {
    initPixels();
    animationRef.current = requestAnimationFrame(() => doAnimate("appear"));
    const handleResize = () => {
      initPixels();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalGap, finalSpeed, finalColors]);

  // Optional: CSS mask for extra vignette softness
  // (can be customized further)
  const maskStyle = {
    maskImage:
      "radial-gradient(circle at 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0.6) 100%)",
    WebkitMaskImage:
      "radial-gradient(circle at 50%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100%)",
    pointerEvents: "none",
    position: "fixed",
    inset: 0,
    zIndex: -1,
    ...style
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={maskStyle}
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}
