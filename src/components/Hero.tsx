import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  HERO_DISPLAY_ORDER,
  HERO_PORTRAIT_DIMS,
  HERO_SLIDES,
} from '../data/clinicData';

import { EASE_EDITORIAL } from './SectionMotion';

interface HeroProps {
  onBookClick: () => void;
  onQuizClick: () => void;
}

const HEADLINE_SYNONYMS = [
  'Radiantly.',
  'Naturally.',
  'Confidently.',
  'Smoothly.',
  'Clearly.',
];

const VERTEX_SHADER = `
attribute vec2 p;
void main() {
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
uniform sampler2D uA, uB;
uniform vec2 uRes, uA0, uImp, uImg, uAncA, uAncB;
uniform float uS, uProg;

float h21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vn(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x),
    mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vn(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

vec3 smp(sampler2D t, vec2 p, vec2 anc) {
  vec2 uv = ((p - uA0) / uS + anc) / uImg;
  return texture2D(t, clamp(uv, vec2(0.002), vec2(0.998))).rgb;
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float R = length(uRes);
  vec2 dv = p - uImp;
  float d = length(dv) / R;
  float n = fbm(p / uRes.y * 5.0);
  float f = uProg * 1.25 - 0.12;
  float ring = exp(-pow((d - f) / 0.06, 2.0)) * smoothstep(0.0, 0.08, uProg) * (1.0 - smoothstep(0.85, 1.0, uProg));
  vec2 dir = dv / (length(dv) + 1e-3);
  float amp = uRes.y * 0.03;
  vec2 q = p + dir * ring * amp * sin((d - f) * 70.0)
    + (vec2(fbm(p / uRes.y * 9.0 + 3.0), fbm(p / uRes.y * 9.0 + 9.0)) - 0.5) * ring * amp * 1.6;
  float cell = h21(floor(q / 5.0));
  float t = clamp((f - d) / 0.2 + (n - 0.5) * 0.7 + (cell - 0.5) * 0.45, 0.0, 1.0);
  t = smoothstep(0.0, 1.0, t);
  vec2 ca = dir * ring * 2.5;
  vec3 a = vec3(smp(uA, q + ca, uAncA).r, smp(uA, q, uAncA).g, smp(uA, q - ca, uAncA).b);
  vec3 b = vec3(smp(uB, q + ca, uAncB).r, smp(uB, q, uAncB).g, smp(uB, q - ca, uAncB).b);
  vec3 c = mix(a, b, t) + ring * 0.045 * vec3(1.0, 0.97, 0.9) + (h21(p + uProg * 10.0) - 0.5) * 0.012;
  gl_FragColor = vec4(c, 1.0);
}
`;

function renderVesselSvg(index: number, label: string) {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 100 160" className="block h-full w-full overflow-visible">
          <defs>
            <linearGradient id="vessel-a0" x1="0" x2="1">
              <stop offset="0" stopColor="#8a5a37" />
              <stop offset=".5" stopColor="#b8814f" />
              <stop offset="1" stopColor="#5f3b22" />
            </linearGradient>
            <linearGradient id="vessel-c0" x1="0" x2="1">
              <stop offset="0" stopColor="#efe5d2" />
              <stop offset=".5" stopColor="#fffaf0" />
              <stop offset="1" stopColor="#cbbba0" />
            </linearGradient>
          </defs>
          <rect x="38" y="42" width="24" height="14" fill="#6f4628" />
          <rect x="30" y="54" width="40" height="96" rx="9" fill="url(#vessel-a0)" />
          <rect x="35" y="64" width="3.6" height="76" rx="2" fill="#fff" opacity=".3" />
          <rect x="36" y="92" width="28" height="34" rx="2.5" fill="#f3ebdd" />
          <text
            x="50"
            y="106"
            fontSize="5.2"
            textAnchor="middle"
            fill="#2b2118"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Glow Lab
          </text>
          <text
            x="50"
            y="116"
            fontSize="3.4"
            textAnchor="middle"
            fill="#6b5b4a"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {label}
          </text>
          <rect x="36" y="12" width="28" height="34" rx="5" fill="url(#vessel-c0)" />
          <path d="M36 22H64M36 28H64" stroke="rgba(43,33,24,.14)" strokeWidth=".8" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 100 160" className="block h-full w-full overflow-visible">
          <defs>
            <linearGradient id="vessel-j1" x1="0" x2="1">
              <stop offset="0" stopColor="#d9ccb1" />
              <stop offset=".45" stopColor="#f3eadb" />
              <stop offset="1" stopColor="#c9bb9f" />
            </linearGradient>
            <linearGradient id="vessel-l1" x1="0" x2="1">
              <stop offset="0" stopColor="#4a372a" />
              <stop offset=".5" stopColor="#6a5040" />
              <stop offset="1" stopColor="#2b2118" />
            </linearGradient>
          </defs>
          <rect x="12" y="84" width="76" height="64" rx="12" fill="url(#vessel-j1)" stroke="rgba(43,33,24,.22)" />
          <rect x="10" y="62" width="80" height="28" rx="8" fill="url(#vessel-l1)" />
          <path d="M14 71H86" stroke="rgba(255,255,255,.14)" />
          <text
            x="50"
            y="115"
            fontSize="6.8"
            textAnchor="middle"
            fill="#2b2118"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Glow Lab
          </text>
          <text
            x="50"
            y="127"
            fontSize="3.6"
            textAnchor="middle"
            fill="#6b5b4a"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {label}
          </text>
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 100 160" className="block h-full w-full overflow-visible">
          <defs>
            <linearGradient id="vessel-t2" x1="0" x2="1">
              <stop offset="0" stopColor="#a8704a" />
              <stop offset=".5" stopColor="#c58a5f" />
              <stop offset="1" stopColor="#7a4b2e" />
            </linearGradient>
          </defs>
          <path d="M27 22H73L77 36V114Q77 122 69 124H31Q23 122 23 114V36Z" fill="url(#vessel-t2)" />
          <rect x="27" y="10" width="46" height="14" rx="2" fill="#7a4b2e" />
          <path d="M30 14H70M30 18H70" stroke="rgba(0,0,0,.22)" />
          <rect x="30" y="34" width="4" height="80" fill="#fff" opacity=".24" />
          <text
            x="50"
            y="68"
            fontSize="6.8"
            textAnchor="middle"
            fill="#f3ebdd"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Glow Lab
          </text>
          <text
            x="50"
            y="80"
            fontSize="3.8"
            textAnchor="middle"
            fill="#f3ebdd"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {label}
          </text>
          <rect x="33" y="124" width="34" height="26" rx="4" fill="#f3ebdd" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 100 160" className="block h-full w-full overflow-visible">
          <defs>
            <linearGradient id="vessel-b3" x1="0" x2="1">
              <stop offset="0" stopColor="#5b4333" />
              <stop offset=".5" stopColor="#78604c" />
              <stop offset="1" stopColor="#2b2118" />
            </linearGradient>
          </defs>
          <rect x="28" y="60" width="44" height="90" rx="9" fill="url(#vessel-b3)" />
          <rect x="33" y="68" width="3.4" height="74" rx="2" fill="#fff" opacity=".2" />
          <rect x="35" y="92" width="30" height="38" rx="2.5" fill="#f3ebdd" />
          <text
            x="50"
            y="108"
            fontSize="5.2"
            textAnchor="middle"
            fill="#2b2118"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Glow Lab
          </text>
          <text
            x="50"
            y="118"
            fontSize="3.4"
            textAnchor="middle"
            fill="#6b5b4a"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {label}
          </text>
          <rect x="40" y="50" width="20" height="12" fill="#cdbb99" />
          <rect x="47" y="28" width="6" height="24" fill="#cdbb99" />
          <path d="M38 22H66Q71 22 71 27V31H38Z" fill="#cdbb99" />
          <rect x="26" y="23" width="14" height="6" rx="2.5" fill="#bfab88" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 160" className="block h-full w-full overflow-visible">
          <defs>
            <linearGradient id="vessel-b4" x1="0" x2="1">
              <stop offset="0" stopColor="#b78c62" />
              <stop offset=".5" stopColor="#d1a97f" />
              <stop offset="1" stopColor="#946b44" />
            </linearGradient>
            <linearGradient id="vessel-c4" x1="0" x2="1">
              <stop offset="0" stopColor="#3a2b20" />
              <stop offset=".5" stopColor="#5a4535" />
              <stop offset="1" stopColor="#241a12" />
            </linearGradient>
          </defs>
          <rect x="30" y="46" width="40" height="104" rx="8" fill="url(#vessel-b4)" />
          <rect x="35" y="56" width="3.4" height="84" rx="2" fill="#fff" opacity=".28" />
          <rect x="36" y="90" width="28" height="38" rx="2.5" fill="#f3ebdd" />
          <text
            x="50"
            y="106"
            fontSize="5.2"
            textAnchor="middle"
            fill="#2b2118"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Glow Lab
          </text>
          <text
            x="50"
            y="116"
            fontSize="3.4"
            textAnchor="middle"
            fill="#6b5b4a"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            {label}
          </text>
          <rect x="35" y="14" width="30" height="36" rx="5" fill="url(#vessel-c4)" />
        </svg>
      );
  }
}

interface StageGeometry {
  W: number;
  H: number;
  dpr: number;
  S: number;
  A: [number, number];
  impX: number;
  impY: number;
}

interface VesselLayout {
  left: number;
  top: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const HERO_CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const HERO_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE_EDITORIAL },
  },
};

const HERO_STAT_VARIANTS = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.36 + index * 0.08,
      ease: EASE_EDITORIAL,
    },
  }),
};

export function Hero({ onBookClick, onQuizClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(HERO_DISPLAY_ORDER[0]);
  const [visibleVesselIndex, setVisibleVesselIndex] = useState<number | null>(null);
  const [webglReady, setWebglReady] = useState(false);
  const [vesselLayouts, setVesselLayouts] = useState<VesselLayout[]>([]);

  const visRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ring1Ref = useRef<HTMLDivElement | null>(null);
  const ring2Ref = useRef<HTMLDivElement | null>(null);
  const vesselRefs = useRef<(HTMLDivElement | null)[]>([]);

  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const uniRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const texturesRef = useRef<(WebGLTexture | null)[]>([]);
  const geoRef = useRef<StageGeometry>({
    W: 0,
    H: 0,
    dpr: 1,
    S: 1,
    A: [0, 0],
    impX: 0,
    impY: 0,
  });
  const curRef = useRef<number>(HERO_DISPLAY_ORDER[0]);
  const nxtRef = useRef<number>(HERO_DISPLAY_ORDER[0]);
  const posRef = useRef<number>(0);
  const busyRef = useRef<boolean>(false);
  const onscreenRef = useRef<boolean>(true);
  const timerRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const unmountedRef = useRef<boolean>(false);
  const vesselCoordsRef = useRef<[number, number][]>([]);

  // Headline synonym cycler
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HEADLINE_SYNONYMS.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  const drawFrame = useCallback((progress: number) => {
    const gl = glRef.current;
    const prog = progRef.current;
    const canvas = canvasRef.current;
    const texA = texturesRef.current[curRef.current];
    const texB = texturesRef.current[nxtRef.current];
    if (!gl || !prog || !canvas || !texA || !texB) return;

    const g = geoRef.current;
    const u = uniRef.current;
    gl.useProgram(prog);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texA);
    gl.uniform1i(u.uA, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texB);
    gl.uniform1i(u.uB, 1);

    gl.uniform2f(u.uRes, canvas.width, canvas.height);
    gl.uniform2f(u.uA0, g.A[0] * g.dpr, g.A[1] * g.dpr);
    gl.uniform2f(u.uImp, g.impX * g.dpr, g.impY * g.dpr);
    gl.uniform2f(u.uImg, HERO_PORTRAIT_DIMS.width, HERO_PORTRAIT_DIMS.height);
    gl.uniform2f(
      u.uAncA,
      HERO_SLIDES[curRef.current].anchor[0],
      HERO_SLIDES[curRef.current].anchor[1]
    );
    gl.uniform2f(
      u.uAncB,
      HERO_SLIDES[nxtRef.current].anchor[0],
      HERO_SLIDES[nxtRef.current].anchor[1]
    );
    gl.uniform1f(u.uS, g.S * g.dpr);
    gl.uniform1f(u.uProg, progress);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, []);

  const updateLayout = useCallback(() => {
    const vis = visRef.current;
    const canvas = canvasRef.current;
    if (!vis || !canvas) return;

    const W = vis.clientWidth;
    const H = vis.clientHeight;
    if (W === 0 || H === 0) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);

    const S = Math.max(W / HERO_PORTRAIT_DIMS.width, H / HERO_PORTRAIT_DIMS.height);
    const A: [number, number] = isMobile
      ? [W * 0.58, H * 0.37]
      : isTablet
        ? [W * 0.72, H * 0.42]
        : [W * 0.67, H * 0.42];

    geoRef.current = {
      ...geoRef.current,
      W,
      H,
      dpr,
      S,
      A,
    };

    const ph = isMobile
      ? Math.min(104, Math.max(82, H * 0.24))
      : (isTablet ? 110 : 122) * S;
    const pw = ph * 0.625;
    const coords: [number, number][] = [];
    const layouts: VesselLayout[] = HERO_SLIDES.map((slide) => {
      const cx = isMobile
        ? Math.max(56, W * 0.17)
        : A[0] + (slide.chest[0] - slide.anchor[0]) * S;
      const cy = isMobile
        ? H * 0.61
        : A[1] + (slide.chest[1] - slide.anchor[1]) * S;
      coords.push([cx, cy]);
      return {
        left: cx - pw / 2,
        top: cy - ph / 2,
        width: pw,
        height: ph,
        cx,
        cy,
      };
    });
    vesselCoordsRef.current = coords;
    setVesselLayouts(layouts);

    const gl = glRef.current;
    if (gl && texturesRef.current[curRef.current]) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      drawFrame(0);
    }
  }, [drawFrame]);

  const transitionToIndex = useCallback(
    async (targetPos: number) => {
      if (busyRef.current || targetPos === posRef.current) return;
      const to = HERO_DISPLAY_ORDER[targetPos];
      const from = curRef.current;

      busyRef.current = true;
      window.clearTimeout(timerRef.current);
      nxtRef.current = to;

      const gl = glRef.current;
      const hasTextures = Boolean(
        gl && texturesRef.current[from] && texturesRef.current[to]
      );

      if (!gl || !hasTextures || shouldReduceMotion) {
        setVisibleVesselIndex(null);
        await new Promise((r) => window.setTimeout(r, 180));
        if (unmountedRef.current) return;
        curRef.current = to;
        posRef.current = targetPos;
        setActiveSlideIndex(to);
        setVisibleVesselIndex(to);
        if (gl && texturesRef.current[to]) {
          nxtRef.current = to;
          drawFrame(0);
        }
        busyRef.current = false;
        return;
      }

      const origin = vesselCoordsRef.current[from] || [
        geoRef.current.W * 0.65,
        geoRef.current.H * 0.65,
      ];
      geoRef.current.impX = origin[0];
      geoRef.current.impY = origin[1];

      [ring1Ref.current, ring2Ref.current].forEach((el) => {
        if (!el) return;
        el.style.left = `${origin[0]}px`;
        el.style.top = `${origin[1]}px`;
      });

      const fromVessel = vesselRefs.current[from];
      if (fromVessel?.animate) {
        fromVessel.animate(
          [
            { transform: 'scale(1)' },
            { transform: 'scale(1.09)' },
            { transform: 'scale(1)' },
          ],
          { duration: 520, easing: 'ease-in-out' }
        );
      }

      ring1Ref.current?.animate?.(
        [
          { opacity: 0.9, transform: 'scale(0.4)' },
          { opacity: 0, transform: 'scale(5)' },
        ],
        { duration: 1000, easing: 'ease-out' }
      );
      ring2Ref.current?.animate?.(
        [
          { opacity: 0.7, transform: 'scale(0.3)' },
          { opacity: 0, transform: 'scale(8)' },
        ],
        { duration: 1500, delay: 140, easing: 'ease-out', fill: 'backwards' }
      );

      await new Promise((r) => window.setTimeout(r, 360));
      if (unmountedRef.current) return;

      setVisibleVesselIndex(null);
      setActiveSlideIndex(to);

      await new Promise<void>((resolve) => {
        const duration = 2000;
        const start = performance.now();
        let revealed = false;

        const step = (now: number) => {
          if (unmountedRef.current) {
            resolve();
            return;
          }
          const k = Math.min((now - start) / duration, 1);
          drawFrame(easeInOutCubic(k));
          if (!revealed && k > 0.5) {
            revealed = true;
            setVisibleVesselIndex(to);
          }
          if (k < 1) {
            rafRef.current = requestAnimationFrame(step);
          } else {
            resolve();
          }
        };
        rafRef.current = requestAnimationFrame(step);
      });

      if (unmountedRef.current) return;
      curRef.current = to;
      posRef.current = targetPos;
      drawFrame(0);
      busyRef.current = false;
    },
    [drawFrame, shouldReduceMotion]
  );

  // Schedule auto-cycling safely (paused when offscreen, hidden tab, or reduced motion)
  const scheduleNext = useCallback(() => {
    window.clearTimeout(timerRef.current);
    if (shouldReduceMotion || unmountedRef.current) return;
    timerRef.current = window.setTimeout(async () => {
      if (unmountedRef.current) return;
      if (onscreenRef.current && !document.hidden) {
        const nextPos = (posRef.current + 1) % HERO_DISPLAY_ORDER.length;
        await transitionToIndex(nextPos);
      }
      scheduleNext();
    }, 3900);
  }, [shouldReduceMotion, transitionToIndex]);

  useEffect(() => {
    unmountedRef.current = false;
    const vis = visRef.current;
    const canvas = canvasRef.current;
    if (!vis || !canvas) return;

    updateLayout();

    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });

    let buffer: WebGLBuffer | null = null;
    let vShader: WebGLShader | null = null;
    let fShader: WebGLShader | null = null;
    let program: WebGLProgram | null = null;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      glRef.current = null;
      setWebglReady(false);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    if (gl) {
      const compileShader = (type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      vShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
      fShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

      if (vShader && fShader) {
        program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vShader);
          gl.attachShader(program, fShader);
          gl.linkProgram(program);
          if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);
            buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 3, -1, -1, 3]),
              gl.STATIC_DRAW
            );
            const loc = gl.getAttribLocation(program, 'p');
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

            [
              'uA',
              'uB',
              'uRes',
              'uA0',
              'uImp',
              'uImg',
              'uAncA',
              'uAncB',
              'uS',
              'uProg',
            ].forEach((name) => {
              if (program) {
                uniRef.current[name] = gl.getUniformLocation(program, name);
              }
            });

            glRef.current = gl;
            progRef.current = program;
          }
        }
      }
    }

    const loadImageTexture = (slideIndex: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.onload = async () => {
          try {
            if (img.decode) await img.decode();
          } catch {
            // Decode error can safely proceed to upload
          }
          if (unmountedRef.current || !glRef.current) {
            resolve();
            return;
          }
          const activeGl = glRef.current;
          const tex = activeGl.createTexture();
          if (tex) {
            activeGl.bindTexture(activeGl.TEXTURE_2D, tex);
            activeGl.texImage2D(
              activeGl.TEXTURE_2D,
              0,
              activeGl.RGB,
              activeGl.RGB,
              activeGl.UNSIGNED_BYTE,
              img
            );
            activeGl.texParameteri(activeGl.TEXTURE_2D, activeGl.TEXTURE_MIN_FILTER, activeGl.LINEAR);
            activeGl.texParameteri(activeGl.TEXTURE_2D, activeGl.TEXTURE_MAG_FILTER, activeGl.LINEAR);
            activeGl.texParameteri(activeGl.TEXTURE_2D, activeGl.TEXTURE_WRAP_S, activeGl.CLAMP_TO_EDGE);
            activeGl.texParameteri(activeGl.TEXTURE_2D, activeGl.TEXTURE_WRAP_T, activeGl.CLAMP_TO_EDGE);
            texturesRef.current[slideIndex] = tex;
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = HERO_SLIDES[slideIndex].src;
      });

    // Prioritize portrait 0 and next portrait first for instant WebGL startup
    const firstSlide = HERO_DISPLAY_ORDER[0];
    const secondSlide = HERO_DISPLAY_ORDER[1];
    const remainingSlides = HERO_DISPLAY_ORDER.slice(2);

    Promise.all([loadImageTexture(firstSlide), loadImageTexture(secondSlide)]).then(() => {
      if (unmountedRef.current) return;
      if (glRef.current && texturesRef.current[firstSlide]) {
        updateLayout();
        setWebglReady(true);
      }
      Promise.all(remainingSlides.map((idx) => loadImageTexture(idx))).then(() => {
        if (unmountedRef.current) return;
        setVisibleVesselIndex(firstSlide);
        scheduleNext();
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        onscreenRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    io.observe(vis);

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateLayout, 120);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      unmountedRef.current = true;
      window.clearTimeout(timerRef.current);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(rafRef.current);
      io.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);

      const activeGl = glRef.current;
      if (activeGl) {
        texturesRef.current.forEach((tex) => {
          if (tex) activeGl.deleteTexture(tex);
        });
        if (buffer) activeGl.deleteBuffer(buffer);
        if (vShader) activeGl.deleteShader(vShader);
        if (fShader) activeGl.deleteShader(fShader);
        if (program) activeGl.deleteProgram(program);
      }
      texturesRef.current = [];
      glRef.current = null;
      progRef.current = null;
    };
  }, [scheduleNext, updateLayout]);

  const currentWord = HEADLINE_SYNONYMS[wordIndex];
  const currentSlide = HERO_SLIDES[activeSlideIndex];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#EDE4D3] md:flex md:min-h-[600px] lg:min-h-[min(88svh,760px)] md:items-center"
    >
      {/* Full-bleed WebGL & Portrait Visual Stage */}
      <div
        ref={visRef}
        className="relative h-[50svh] min-h-[340px] max-h-[450px] w-full overflow-hidden md:absolute md:inset-0 md:h-full md:max-h-none"
      >
        {/* Smooth page-load unveil + subtle floating layer for portrait imagery */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
          className="absolute inset-0 h-full w-full"
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -6, 0],
                    scale: [1.02, 1.035, 1.02],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 7.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
            className="absolute inset-0 h-full w-full will-change-transform"
          >
            {/* Immediate crisp portrait fallback for instant LCP & reduced-motion / WebGL fallback */}
            <img
              src={currentSlide.src}
              alt={currentSlide.alt}
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 h-full w-full object-cover object-[60%_24%] transition-opacity duration-300 md:object-[68%_30%] ${
                webglReady && !shouldReduceMotion ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* WebGL Canvas */}
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Portraits of Glow Lab NG clients across different skin tones"
              className={`absolute inset-0 block h-full w-full transition-opacity duration-300 ${
                webglReady && !shouldReduceMotion ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            />
          </motion.div>
        </motion.div>

        {/* Warm Sand gradient scrims for effortless text legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#EDE4D3_0%,rgba(237,228,211,0.55)_16%,transparent_40%)] md:bg-[linear-gradient(90deg,rgba(237,228,211,0.98)_0%,rgba(237,228,211,0.88)_38%,rgba(237,228,211,0.22)_58%,transparent_74%),linear-gradient(0deg,rgba(237,228,211,0.45),transparent_30%)]"
        />

        {/* Floating clinical treatment vessels anchored to portrait coordinates */}
        {HERO_SLIDES.map((slide, idx) => {
          const layout = vesselLayouts[idx];
          const isVisible = visibleVesselIndex === idx;
          return (
            <div
              key={slide.id}
              aria-hidden="true"
              style={
                layout
                  ? {
                      left: `${layout.left}px`,
                      top: `${layout.top}px`,
                      width: `${layout.width}px`,
                      height: `${layout.height}px`,
                      animationDelay: `${-idx * 1.3}s`,
                    }
                  : undefined
              }
              className="pointer-events-none absolute z-10 animate-[heroBob_6.5s_ease-in-out_infinite]"
            >
              <div
                ref={(el) => {
                  vesselRefs.current[idx] = el;
                }}
                className={`h-full w-full transition-all duration-700 ease-out ${
                  isVisible
                    ? 'scale-100 opacity-100 blur-0 drop-shadow-[0_16px_18px_rgba(43,33,24,0.28)]'
                    : 'scale-[0.82] opacity-0 blur-[10px]'
                }`}
              >
                {renderVesselSvg(idx, slide.vesselLabel)}
              </div>
            </div>
          );
        })}

        {/* Ripple shockwave rings */}
        <div
          ref={ring1Ref}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 -mt-[15px] -ml-[15px] h-[30px] w-[30px] rounded-full border border-[#2B2118]/40 opacity-0 shadow-[0_0_22px_rgba(255,255,255,0.55)]"
        />
        <div
          ref={ring2Ref}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 -mt-[15px] -ml-[15px] h-[30px] w-[30px] rounded-full border border-[#2B2118]/40 opacity-0 shadow-[0_0_22px_rgba(255,255,255,0.55)]"
        />

        {/* Desktop Treatment Caption (bottom-right, no circular swatches) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE_EDITORIAL }}
          className="hidden md:absolute md:right-8 md:bottom-7 md:z-20 md:block lg:right-10"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
              className="text-right text-[13px] text-[#6B5B4A]"
            >
              <strong className="font-semibold text-[#2B2118]">{currentSlide.title}</strong>
              {' · '}
              {currentSlide.note}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile Treatment Caption (below portrait, no circular swatches) */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25, ease: EASE_EDITORIAL }}
        className="relative z-20 px-4 pt-2 pb-4 md:hidden"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSlide.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
            className="text-center text-xs text-[#6B5B4A] sm:text-[13px]"
          >
            <strong className="font-semibold text-[#2B2118]">{currentSlide.title}</strong>
            {' · '}
            {currentSlide.note}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Hero Editorial Copy Column (left side on md+ screens, staggered entrance) */}
      <div className="relative z-20 mx-auto w-full max-w-[1320px] px-5 pt-2 pb-12 sm:px-6 md:py-16 lg:px-10 lg:py-20">
        <motion.div
          variants={HERO_CONTAINER_VARIANTS}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          className="max-w-[580px] md:max-w-[52%] lg:max-w-[560px]"
        >
          <h1 className="font-display text-[44px] leading-[1.03] font-semibold tracking-[-0.025em] text-[#2B2118] sm:text-[62px] xl:text-[78px]">
            <motion.span variants={HERO_ITEM_VARIANTS} className="block">
              Looking good,
            </motion.span>
            <motion.span
              variants={HERO_ITEM_VARIANTS}
              className="relative mt-1.5 block min-h-[1.12em] italic font-normal text-[#7A4B2E]"
            >
              {shouldReduceMotion ? (
                <span>Radiantly.</span>
              ) : (
                <AnimatePresence initial={false}>
                  <motion.span
                    key={currentWord}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      position: 'absolute',
                      left: 0,
                      top: 0,
                    }}
                    transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.span>
          </h1>

          <motion.p
            variants={HERO_ITEM_VARIANTS}
            className="mt-6 max-w-[44ch] text-base leading-[1.6] text-[#6B5B4A] sm:text-[17px]"
          >
            We help you clear acne, fade dark spots, and even out your tone without bleaching. A gentle six-week plan built for your real skin.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            variants={HERO_ITEM_VARIANTS}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={onBookClick}
              className="inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-full bg-[#2B2118] px-7 py-3.5 text-sm font-semibold text-[#F3EBDD] transition-colors duration-150 hover:bg-[#41322A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A4B2E] sm:text-[15px] whitespace-nowrap shrink-0"
            >
              Book Free Consultation
            </motion.button>
            <motion.button
              type="button"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={onQuizClick}
              className="inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-full border border-[#2B2118]/40 bg-[#EDE4D3]/60 px-6 py-3.5 text-sm font-semibold text-[#2B2118] backdrop-blur-xs transition-colors duration-150 hover:bg-[#2B2118]/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A4B2E] sm:text-[15px] whitespace-nowrap shrink-0"
            >
              Take the skin quiz · 60 secs
            </motion.button>
          </motion.div>

          {/* Editorial Hairline Stats Row */}
          <div className="mt-10 flex items-stretch sm:mt-12">
            <motion.div
              custom={0}
              variants={HERO_STAT_VARIANTS}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              className="pr-5 sm:pr-7"
            >
              <b className="font-display tabular-nums block text-2xl leading-none font-normal text-[#2B2118] sm:text-[32px]">
                2,500+
              </b>
              <span className="mt-1.5 block text-xs text-[#6B5B4A] sm:text-[13px]">
                clients treated
              </span>
            </motion.div>
            <motion.div
              custom={1}
              variants={HERO_STAT_VARIANTS}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              className="border-l border-[#2B2118]/20 px-5 sm:px-7"
            >
              <b className="font-display tabular-nums block text-2xl leading-none font-normal text-[#2B2118] sm:text-[32px]">
                4.9 ★
              </b>
              <span className="mt-1.5 block text-xs text-[#6B5B4A] sm:text-[13px]">
                from 1,100+ reviews
              </span>
            </motion.div>
            <motion.div
              custom={2}
              variants={HERO_STAT_VARIANTS}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              className="border-l border-[#2B2118]/20 pl-5 sm:pl-7"
            >
              <b className="font-display tabular-nums block text-2xl leading-none font-normal text-[#2B2118] sm:text-[32px]">
                0
              </b>
              <span className="mt-1.5 block text-xs text-[#6B5B4A] sm:text-[13px]">
                bleaching agents
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
