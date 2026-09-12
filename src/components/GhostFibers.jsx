import { useEffect, useRef } from 'react';

/**
 * Ghost Fibers — a woven field of thin luminous threads.
 *
 * Shader adapted from the React Bits "Ghost Fibers" background by David Haz
 * (https://reactbits.dev/backgrounds/ghost-fibers, MIT), rendered here with raw
 * WebGL2 instead of ogl, with a pointer-warp term added on top.
 */

const vertex = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uRotationSpeed;
uniform float uLayers;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uWaveSpeed;
uniform float uLayerSpeed;
uniform float uTwist;
uniform float uTwistFrequency;
uniform float uTwistSpeed;
uniform float uLineFrequency;
uniform float uLineSpacing;
uniform float uLineSharpness;
uniform float uGlowFalloff;
uniform float uGlowIntensity;
uniform float uBrightness;
uniform float uBlueBoost;
uniform float uVignette;
uniform float uGrain;
uniform vec3 uLineColor;
uniform vec3 uGlowColor;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uMouseWarp;

out vec4 fragColor;

#define MAX_LAYERS 10

mat2 rotate2d(float angle) {
  float sine = sin(angle);
  float cosine = cos(angle);
  return mat2(cosine, -sine, sine, cosine);
}

float grainHash(vec2 point) {
  point = floor(point);
  float hash = 52.9829189 * fract(dot(point, vec2(0.065, 0.005)));
  return fract(hash);
}

float layeredGrain(vec2 fragmentPixel) {
  vec2 point = mod(fragmentPixel + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
  vec2 rotated = mat2(0.8, -0.5, 0.5, 0.8) * point;
  float grain = 0.0;
  grain += 0.40 * grainHash(rotated);
  grain += 0.25 * grainHash(rotated * 2.0 + 17.0);
  grain += 0.20 * grainHash(rotated * 4.0 + 47.0);
  grain += 0.10 * grainHash(rotated * 8.0 + 113.0);
  grain += 0.05 * grainHash(rotated * 16.0 + 191.0);
  return grain;
}

void main() {
  vec2 resolution = max(uResolution, vec2(1.0));
  vec2 uv = (2.0 * gl_FragCoord.xy - resolution) / resolution.y;

  // Pointer warp: the field is dragged and twisted around the cursor.
  vec2 mouse = (2.0 * uMouse - resolution) / resolution.y;
  vec2 toMouse = uv - mouse;
  float mouseDist = length(toMouse);
  float pull = uMouseStrength * exp(-mouseDist * mouseDist * 2.2);
  vec2 warped = uv - normalize(toMouse + 1e-5) * pull * uMouseWarp;
  warped = rotate2d(pull * 0.55) * (warped - mouse) + mouse;

  float time = uTime * uSpeed;
  vec3 backdrop = vec3(0.070588, 0.058824, 0.090196);
  vec3 centerTone = max(uLineColor * 0.85567 - uGlowColor * 0.06186, vec3(0.0));
  vec3 cloudTone = uLineColor * 0.19588 + uGlowColor * 0.2268;

  vec2 p = warped;
  p /= max(uScale, 0.05);
  p = rotate2d(radians(uRotation) + time * uRotationSpeed) * p;

  vec3 color = vec3(0.0);

  for (int index = 0; index < MAX_LAYERS; index++) {
    float fi = float(index) + 1.0;
    if (fi > uLayers) break;

    p += uWaveAmplitude * sin(p.yx * fi * uWaveFrequency + time * (uWaveSpeed + fi * uLayerSpeed));

    float radius = length(p);
    float polarAngle = atan(p.y, p.x);
    polarAngle += sin(radius * uTwistFrequency - time * uTwistSpeed + fi) * uTwist;
    p = vec2(cos(polarAngle), sin(polarAngle)) * radius;

    float lines = abs(sin(p.x * (uLineFrequency + fi * uLineSpacing) + sin(p.y * 3.0 + time)));
    lines = pow(max(0.0, 1.0 - lines), uLineSharpness);
    color += uLineColor * lines / fi;

    float glow = exp(-uGlowFalloff * abs(sin(p.x * 3.0 + time + fi)));
    color += uGlowColor * glow * uGlowIntensity / (fi * 2.0);
  }

  float center = exp(-2.2 * dot(uv, uv));
  color += centerTone * center;

  float cloud = exp(-1.5 * length(uv + vec2(sin(time * 0.3) * 0.25, cos(time * 0.25) * 0.18)));
  color += cloudTone * cloud;

  float vignette = 1.0 - smoothstep(0.35, 1.45, length(uv));
  color *= mix(1.0 - uVignette, 1.0, vignette);
  color = 1.0 - exp(-color * uBrightness);
  color.b *= uBlueBoost;

  vec3 outputColor = backdrop + color;

  float noise = (layeredGrain(gl_FragCoord.xy) - 0.5) * uGrain;
  outputColor = clamp(outputColor + noise, 0.0, 1.0);

  // A soft halo follows the cursor so the warp reads as interactive.
  outputColor += uGlowColor * pull * 0.06;

  fragColor = vec4(outputColor, 1.0);
}
`;

const UNIFORM_NAMES = [
  'uResolution',
  'uTime',
  'uSpeed',
  'uScale',
  'uRotation',
  'uRotationSpeed',
  'uLayers',
  'uWaveAmplitude',
  'uWaveFrequency',
  'uWaveSpeed',
  'uLayerSpeed',
  'uTwist',
  'uTwistFrequency',
  'uTwistSpeed',
  'uLineFrequency',
  'uLineSpacing',
  'uLineSharpness',
  'uGlowFalloff',
  'uGlowIntensity',
  'uBrightness',
  'uBlueBoost',
  'uVignette',
  'uGrain',
  'uLineColor',
  'uGlowColor',
  'uMouse',
  'uMouseStrength',
  'uMouseWarp',
];

function hexToRgb(hex) {
  const value = String(hex).trim().replace(/^#/, '');
  const normalized = value.length === 3 ? value.replace(/./g, (c) => c + c) : value;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!match) return [1, 1, 1];
  return [parseInt(match[1], 16) / 255, parseInt(match[2], 16) / 255, parseInt(match[3], 16) / 255];
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[GhostFibers]', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function GhostFibers({
  lineColor = '#f2d98a',
  glowColor = '#c1121f',
  speed = 0.2,
  scale = 2,
  rotation = 0,
  rotationSpeed = 0.25,
  layers = 4,
  waveAmplitude = 0.015,
  waveFrequency = 3,
  waveSpeed = 0.15,
  layerSpeed = 0.08,
  twist = 0.1,
  twistFrequency = 5,
  twistSpeed = 1.2,
  lineFrequency = 5,
  lineSpacing = 2,
  lineSharpness = 16,
  glowFalloff = 10,
  glowIntensity = 1.3,
  brightness = 1.8,
  blueBoost = 0.95,
  vignette = 0.85,
  grain = 0.05,
  mouseWarp = 0.32,
  dpr = 1,
  fps = 60,
  className = '',
}) {
  const containerRef = useRef(null);
  const settingsRef = useRef(null);

  settingsRef.current = {
    lineColor,
    glowColor,
    speed,
    scale,
    rotation,
    rotationSpeed,
    layers,
    waveAmplitude,
    waveFrequency,
    waveSpeed,
    layerSpeed,
    twist,
    twistFrequency,
    twistSpeed,
    lineFrequency,
    lineSpacing,
    lineSharpness,
    glowFalloff,
    glowIntensity,
    brightness,
    blueBoost,
    vignette,
    grain,
    mouseWarp,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.setAttribute('aria-hidden', 'true');

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      container.classList.add('fibers-unsupported');
      return undefined;
    }

    container.appendChild(canvas);

    const vertexShader = compile(gl, gl.VERTEX_SHADER, vertex);
    const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragment);
    if (!vertexShader || !fragmentShader) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[GhostFibers]', gl.getProgramInfoLog(program));
      return undefined;
    }

    const uniforms = {};
    UNIFORM_NAMES.forEach((name) => {
      uniforms[name] = gl.getUniformLocation(program, name);
    });

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    const pixelRatio = Math.min(Math.max(dpr, 0.5), 2);
    const frameDelay = 1000 / Math.min(Math.max(fps, 1), 120);

    let frameId = 0;
    let elapsed = 0;
    let previousTime = performance.now();
    let lastRender = 0;
    let isVisible = true;
    let width = 1;
    let height = 1;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, targetStrength: 0 };
    let pointerInside = false;

    const applySettings = () => {
      const s = settingsRef.current;
      if (!s) return;
      gl.uniform1f(uniforms.uSpeed, s.speed);
      gl.uniform1f(uniforms.uScale, s.scale);
      gl.uniform1f(uniforms.uRotation, s.rotation);
      gl.uniform1f(uniforms.uRotationSpeed, s.rotationSpeed);
      gl.uniform1f(uniforms.uLayers, Math.min(Math.max(Math.round(s.layers), 1), 10));
      gl.uniform1f(uniforms.uWaveAmplitude, s.waveAmplitude);
      gl.uniform1f(uniforms.uWaveFrequency, s.waveFrequency);
      gl.uniform1f(uniforms.uWaveSpeed, s.waveSpeed);
      gl.uniform1f(uniforms.uLayerSpeed, s.layerSpeed);
      gl.uniform1f(uniforms.uTwist, s.twist);
      gl.uniform1f(uniforms.uTwistFrequency, s.twistFrequency);
      gl.uniform1f(uniforms.uTwistSpeed, s.twistSpeed);
      gl.uniform1f(uniforms.uLineFrequency, s.lineFrequency);
      gl.uniform1f(uniforms.uLineSpacing, s.lineSpacing);
      gl.uniform1f(uniforms.uLineSharpness, s.lineSharpness);
      gl.uniform1f(uniforms.uGlowFalloff, s.glowFalloff);
      gl.uniform1f(uniforms.uGlowIntensity, s.glowIntensity);
      gl.uniform1f(uniforms.uBrightness, s.brightness);
      gl.uniform1f(uniforms.uBlueBoost, s.blueBoost);
      gl.uniform1f(uniforms.uVignette, s.vignette);
      gl.uniform1f(uniforms.uGrain, s.grain);
      gl.uniform1f(uniforms.uMouseWarp, s.mouseWarp);
      gl.uniform3fv(uniforms.uLineColor, new Float32Array(hexToRgb(s.lineColor)));
      gl.uniform3fv(uniforms.uGlowColor, new Float32Array(hexToRgb(s.glowColor)));
    };

    const draw = () => {
      applySettings();
      gl.uniform1f(uniforms.uTime, elapsed);
      gl.uniform2f(uniforms.uMouse, pointer.x, pointer.y);
      gl.uniform1f(uniforms.uMouseStrength, pointer.strength);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const loop = (now) => {
      frameId = requestAnimationFrame(loop);
      const delta = Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;

      // Ease the pointer so the warp trails the cursor instead of snapping.
      pointer.x += (pointer.targetX - pointer.x) * Math.min(1, delta * 6);
      pointer.y += (pointer.targetY - pointer.y) * Math.min(1, delta * 6);
      pointer.strength += (pointer.targetStrength - pointer.strength) * Math.min(1, delta * 3.5);

      if (now - lastRender < frameDelay - 0.5) return;
      lastRender = now;
      if (!reduced.matches) elapsed += delta;
      draw();
    };

    const start = () => {
      if (frameId !== 0) return;
      previousTime = performance.now();
      frameId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frameId === 0) return;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (inside) {
        // gl_FragCoord origin is bottom-left, so flip y.
        pointer.targetX = (event.clientX - rect.left) * pixelRatio;
        pointer.targetY = (rect.height - (event.clientY - rect.top)) * pixelRatio;
        pointer.targetStrength = 1;
        pointerInside = true;
      } else if (pointerInside) {
        pointer.targetStrength = 0;
        pointerInside = false;
      }
    };

    const handlePointerLeave = () => {
      pointer.targetStrength = 0;
      pointerInside = false;
    };

    const resizeObserver = new ResizeObserver(() => {
      setSize();
      draw();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (!document.hidden && isVisible) start();
      else stop();
    };

    setSize();
    applySettings();
    draw();
    start();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [dpr, fps]);

  return <div ref={containerRef} className={`ghost-fibers ${className}`.trim()} aria-hidden="true" />;
}
