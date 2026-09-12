import { useEffect, useRef } from 'react';

/**
 * Particles — a slowly drifting 3D particle field.
 *
 * Adapted from the React Bits "Particles" background by David Haz
 * (https://reactbits.dev/backgrounds/particles, MIT), rendered here with raw
 * WebGL2 instead of ogl.
 */

const vertex = `#version 300 es
in vec3 position;
in vec4 random;
in vec3 color;

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;

out vec4 vRandom;
out vec3 vColor;

void main() {
  vRandom = random;
  vColor = color;

  vec3 pos = position * uSpread;
  pos.z *= 10.0;

  vec4 mPos = uModel * vec4(pos, 1.0);
  float t = uTime;
  mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
  mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
  mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

  vec4 mvPos = uView * mPos;

  if (uSizeRandomness == 0.0) {
    gl_PointSize = uBaseSize;
  } else {
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
  }

  gl_Position = uProjection * mvPos;
}
`;

const fragment = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAlphaParticles;

in vec4 vRandom;
in vec3 vColor;

out vec4 fragColor;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float d = length(uv - vec2(0.5));

  vec3 shade = vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28);

  if (uAlphaParticles < 0.5) {
    if (d > 0.5) discard;
    fragColor = vec4(shade, 1.0);
  } else {
    float circle = smoothstep(0.5, 0.4, d) * 0.8;
    fragColor = vec4(shade, circle);
  }
}
`;

function hexToRgb(hex) {
  const value = String(hex).replace(/^#/, '');
  const normalized = value.length === 3 ? value.replace(/./g, (c) => c + c) : value;
  const int = parseInt(normalized.slice(0, 6), 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

function multiply(a, b) {
  const out = new Float32Array(16);
  for (let c = 0; c < 4; c += 1) {
    for (let r = 0; r < 4; r += 1) {
      out[c * 4 + r] =
        a[r] * b[c * 4] +
        a[4 + r] * b[c * 4 + 1] +
        a[8 + r] * b[c * 4 + 2] +
        a[12 + r] * b[c * 4 + 3];
    }
  }
  return out;
}

const translation = (x, y, z) =>
  new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);

const rotationX = (a) => {
  const s = Math.sin(a);
  const c = Math.cos(a);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
};

const rotationY = (a) => {
  const s = Math.sin(a);
  const c = Math.cos(a);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
};

const rotationZ = (a) => {
  const s = Math.sin(a);
  const c = Math.cos(a);
  return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

function perspective(fovDegrees, aspect, near, far) {
  const f = 1 / Math.tan((fovDegrees * Math.PI) / 360);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ]);
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[Particles]', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = true,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className = '',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.setAttribute('aria-hidden', 'true');

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });

    if (!gl) return undefined;
    container.appendChild(canvas);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const vertexShader = compile(gl, gl.VERTEX_SHADER, vertex);
    const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragment);
    if (!vertexShader || !fragmentShader) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[Particles]', gl.getProgramInfoLog(program));
      return undefined;
    }
    gl.useProgram(program);

    const uniforms = {
      uModel: gl.getUniformLocation(program, 'uModel'),
      uView: gl.getUniformLocation(program, 'uView'),
      uProjection: gl.getUniformLocation(program, 'uProjection'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uSpread: gl.getUniformLocation(program, 'uSpread'),
      uBaseSize: gl.getUniformLocation(program, 'uBaseSize'),
      uSizeRandomness: gl.getUniformLocation(program, 'uSizeRandomness'),
      uAlphaParticles: gl.getUniformLocation(program, 'uAlphaParticles'),
    };

    const count = Math.max(1, Math.round(particleCount));
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette =
      particleColors && particleColors.length > 0 ? particleColors : ['#ffffff', '#f2d98a'];

    for (let i = 0; i < count; i += 1) {
      let x;
      let y;
      let z;
      let len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      colors.set(hexToRgb(palette[Math.floor(Math.random() * palette.length)]), i * 3);
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    const randomBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, randoms, gl.STATIC_DRAW);
    const randomLocation = gl.getAttribLocation(program, 'random');
    gl.enableVertexAttribArray(randomLocation);
    gl.vertexAttribPointer(randomLocation, 4, gl.FLOAT, false, 0, 0);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    const colorLocation = gl.getAttribLocation(program, 'color');
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.uniform1f(uniforms.uSpread, particleSpread);
    gl.uniform1f(uniforms.uBaseSize, particleBaseSize * dpr);
    gl.uniform1f(uniforms.uSizeRandomness, sizeRandomness);
    gl.uniform1f(uniforms.uAlphaParticles, alphaParticles ? 1 : 0);
    gl.uniformMatrix4fv(uniforms.uView, false, translation(0, 0, -cameraDistance));

    const rotation = { x: 0, y: 0, z: 0 };
    const mouse = { x: 0, y: 0 };
    let projection = perspective(15, 1, 0.1, 100);
    let elapsed = 0;
    let frameId = 0;
    let lastTime = performance.now();
    let isVisible = true;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      projection = perspective(15, canvas.width / canvas.height, 0.1, 100);
      gl.uniformMatrix4fv(uniforms.uProjection, false, projection);
    };

    const draw = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);

      const tx = moveParticlesOnHover ? -mouse.x * particleHoverFactor : 0;
      const ty = moveParticlesOnHover ? -mouse.y * particleHoverFactor : 0;
      let model = translation(tx, ty, 0);
      model = multiply(model, rotationZ(rotation.z));
      model = multiply(model, rotationY(rotation.y));
      model = multiply(model, rotationX(rotation.x));
      gl.uniformMatrix4fv(uniforms.uModel, false, model);

      gl.drawArrays(gl.POINTS, 0, count);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const loop = (now) => {
      frameId = requestAnimationFrame(loop);
      const delta = now - lastTime;
      lastTime = now;
      if (!reduced.matches) elapsed += delta * speed;

      gl.uniform1f(uniforms.uTime, elapsed * 0.001);

      if (!disableRotation && !reduced.matches) {
        rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        rotation.z += 0.01 * speed;
      }

      draw();
    };

    const start = () => {
      if (frameId !== 0) return;
      lastTime = performance.now();
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
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const resizeObserver = new ResizeObserver(() => {
      setSize();
      draw();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !document.hidden && !reduced.matches) start();
        else {
          stop();
          draw();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (!document.hidden && isVisible && !reduced.matches) start();
      else {
        stop();
        draw();
      }
    };

    setSize();
    if (reduced.matches) {
      draw();
    } else {
      start();
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(randomBuffer);
      gl.deleteBuffer(colorBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return <div ref={containerRef} className={`particles-field ${className}`.trim()} aria-hidden="true" />;
}
