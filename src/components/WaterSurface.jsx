import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform sampler2D uWave;
uniform sampler2D uMask;
uniform vec2 uWaveTexel;
uniform vec2 uMaskTexel;
uniform vec2 uRes;
uniform float uTime;
uniform float uNight;
uniform float uHills;
uniform float uEdge;
uniform float uDepth;
uniform vec4 uFish[2];

const vec3 TOP = vec3(0.165, 0.353, 0.294);
const vec3 DEEP = vec3(0.035, 0.106, 0.086);
const vec3 SUN = vec3(0.894, 0.561, 0.333);

float caustic(vec2 p, float t) {
  vec2 i = p;
  float c = 1.0;
  for (int n = 0; n < 4; n++) {
    float tt = t * (1.0 - 3.5 / float(n + 1));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / 0.005), p.y / (cos(i.y + tt) / 0.005)));
  }
  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}

float fish(vec2 px, vec4 f, float t) {
  vec2 d = px - f.xy;
  float ca = cos(f.z);
  float sa = sin(f.z);
  vec2 q = vec2(ca * d.x + sa * d.y, -sa * d.x + ca * d.y);
  float L = f.w;
  float back = -q.x / L;
  q.y += sin(q.x / L * 2.5 + t * 7.0) * L * 0.12 * clamp(back + 0.3, 0.0, 1.6);
  float body = length(vec2(q.x / L, q.y / (L * 0.34)));
  float m = 1.0 - smoothstep(0.72, 1.0, body);
  float tw = (back - 0.85) * 0.55 * L;
  float tail = step(0.85, back) * (1.0 - smoothstep(1.5, 1.65, back)) * (1.0 - smoothstep(tw * 0.55, tw + 0.5, abs(q.y)));
  return max(m, tail);
}

vec3 scene(vec2 uv) {
  vec2 px = uv * uRes;
  float t = uTime;
  float edge = smoothstep(0.0, uEdge, px.y);
  vec3 col = mix(TOP, DEEP, smoothstep(0.0, 1.0, uv.y) * uDepth);

  float hill = 34.0 + 30.0 * sin(px.x / 210.0 + 0.6) + 16.0 * sin(px.x / 73.0 + 1.7) + 8.0 * sin(px.x / 31.0);
  float sway = sin(px.y * 0.12 - t * 1.6) * 3.0;
  float hills = 1.0 - smoothstep(hill - 10.0, hill + 10.0, px.y - 44.0 + sway);
  col = mix(col, vec3(0.07, 0.19, 0.15), hills * smoothstep(24.0, 64.0, px.y) * 0.6 * uHills);

  float cx = uRes.x * 0.76;
  float spread = 30.0 + px.y * 0.16;
  float streak = exp(-pow((px.x - cx + sin(px.y * 0.05 + t) * 6.0) / spread, 2.0)) * exp(-px.y / (uRes.y * 0.55));
  float shimmer = 0.7 + 0.3 * sin(px.y * 0.21 - t * 2.2 + sin(px.x * 0.045 + t * 0.6) * 2.0);
  col += SUN * streak * shimmer * 0.3 * edge;

  vec2 cp = mod(px / 340.0 * 6.28318, 6.28318) - 250.0;
  col += vec3(0.6, 0.9, 0.75) * caustic(cp, t * 0.45) * 0.14 * edge * (1.0 - uv.y * 0.5);

  float koi = fish(px, uFish[0], t);
  col = mix(col, mix(col, SUN * 1.05, 0.75), koi * 0.7);
  float shade = fish(px, uFish[1], t + 1.3);
  col = mix(col, col * 0.35, shade * 0.6);
  return col;
}

void main() {
  vec2 uv = vUv;
  vec2 wx = vec2(uWaveTexel.x, 0.0);
  vec2 wy = vec2(0.0, uWaveTexel.y);
  vec2 grad = vec2(
    texture2D(uWave, uv + wx).r - texture2D(uWave, uv - wx).r,
    texture2D(uWave, uv + wy).r - texture2D(uWave, uv - wy).r
  );

  float m = texture2D(uMask, uv).r;
  vec2 mx = vec2(uMaskTexel.x * 2.0, 0.0);
  vec2 my = vec2(0.0, uMaskTexel.y * 2.0);
  vec2 mgrad = vec2(
    texture2D(uMask, uv + mx).g - texture2D(uMask, uv - mx).g,
    texture2D(uMask, uv + my).g - texture2D(uMask, uv - my).g
  );

  vec2 sx = vec2(uMaskTexel.x, 0.0);
  vec2 sy = vec2(0.0, uMaskTexel.y);
  vec2 sgrad = vec2(
    texture2D(uMask, uv + sx).r - texture2D(uMask, uv - sx).r,
    texture2D(uMask, uv + sy).r - texture2D(uMask, uv - sy).r
  );

  vec2 offPx = grad * 160.0 - mgrad * 90.0 * m;
  vec3 col = scene(uv + offPx / uRes);

  col = mix(col, col * 1.12 + vec3(0.05, 0.07, 0.065), m);
  float lit = dot(mgrad, vec2(0.6, 0.8)) * m;
  col += vec3(1.0) * clamp(lit * 4.0, 0.0, 1.0) * 0.4;
  col -= vec3(0.08) * clamp(-lit * 4.0, 0.0, 1.0);
  float rim = clamp(length(sgrad) * 1.6, 0.0, 1.0);
  col = mix(col, vec3(0.92, 0.98, 0.95), rim * 0.5);

  float spec = dot(grad, vec2(-0.6, -0.8));
  col += vec3(0.8, 0.95, 0.88) * clamp(spec * 7.0, 0.0, 1.0) * 0.4;
  col -= vec3(0.05) * clamp(-spec * 7.0, 0.0, 1.0);

  col *= mix(1.0, 0.72, uNight);
  gl_FragColor = vec4(col, 1.0);
}`

const CELL = 4
const DAMP = 0.982
const GAIN = 0.35

function makeProgram(gl) {
  const shader = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
  }
  const vs = shader(gl.VERTEX_SHADER, VERT)
  const fs = shader(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null
}

function makeTexture(gl) {
  const tex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return tex
}

const VARIANTS = {
  footer: { hills: 1, edge: 80, depth: 1, rain: [650, 1500], fishMax: 30 },
  bar: { hills: 0, edge: 1, depth: 0.5, rain: [1300, 2600], fishMax: 14 },
  menu: { hills: 0, edge: 1, depth: 0.85, rain: [700, 1400], fishMax: 20 },
}

export default function WaterSurface({ word = '', wordRef, variant = 'footer', className, paused = false }) {
  const canvasRef = useRef(null)
  const pausedRef = useRef(paused)
  const control = useRef(null)

  useEffect(() => {
    pausedRef.current = paused
    if (paused) control.current?.stop()
    else control.current?.start()
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const cfg = VARIANTS[variant] || VARIANTS.footer
    if (!canvas || !host) return undefined

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    const program = gl && makeProgram(gl)
    if (!program) return undefined

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    host.classList.add('has-water')

    gl.useProgram(program)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = (name) => gl.getUniformLocation(program, name)
    const loc = {
      wave: u('uWave'), mask: u('uMask'), waveTexel: u('uWaveTexel'), maskTexel: u('uMaskTexel'),
      res: u('uRes'), time: u('uTime'), night: u('uNight'), fish: u('uFish'),
    }
    gl.uniform1f(u('uHills'), cfg.hills)
    gl.uniform1f(u('uEdge'), cfg.edge)
    gl.uniform1f(u('uDepth'), cfg.depth)
    gl.uniform1i(loc.wave, 0)
    gl.uniform1i(loc.mask, 1)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)

    const waveTex = makeTexture(gl)
    const maskTex = makeTexture(gl)

    let W = 0
    let H = 0
    let cols = 0
    let rows = 0
    let cur = new Float32Array(0)
    let prev = new Float32Array(0)
    let levels = new Uint8ClampedArray(0)
    let levelView = new Uint8Array(0)
    const fishData = new Float32Array(8)
    let t0 = performance.now()
    let raf = 0
    let running = false
    let visible = false
    let nextRain = 0
    let frameNo = 0
    let last = null

    const drawMask = () => {
      if (!word) {
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D, maskTex)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]))
        gl.uniform2f(loc.maskTexel, 1, 1)
        return
      }
      const mw = Math.max(2, Math.ceil(W / 2))
      const mh = Math.max(2, Math.ceil(H / 2))
      const sharp = document.createElement('canvas')
      const soft = document.createElement('canvas')
      sharp.width = soft.width = mw
      sharp.height = soft.height = mh
      const a = sharp.getContext('2d')
      const b = soft.getContext('2d')

      const lines = W < 560 ? word.split(' ') : [word]
      a.font = '900 100px Nunito, "Segoe UI", sans-serif'
      const per100 = Math.max(...lines.map((line) => a.measureText(line).width)) || 600
      const fs = Math.min((W * 0.94 * 100) / per100, 320)
      const lineH = fs * 0.9
      if (wordRef?.current) wordRef.current.style.height = `${Math.round(fs * 0.8 + (lines.length - 1) * lineH)}px`

      const half = fs / 2
      const baseline = (H - fs * 0.06) / 2
      for (const ctx of [a, b]) {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, mw, mh)
        ctx.font = `900 ${half}px Nunito, "Segoe UI", sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'alphabetic'
      }
      a.fillStyle = '#fff'
      b.shadowColor = '#fff'
      b.shadowBlur = Math.max(2, half * 0.05)
      b.shadowOffsetX = mw * 2
      b.fillStyle = '#fff'
      lines.forEach((line, i) => {
        const y = baseline - ((lines.length - 1 - i) * lineH) / 2
        a.fillText(line, mw / 2, y)
        b.fillText(line, mw / 2 - mw * 2, y)
      })

      const sa = a.getImageData(0, 0, mw, mh).data
      const sb = b.getImageData(0, 0, mw, mh).data
      const rgba = new Uint8Array(mw * mh * 4)
      for (let i = 0; i < mw * mh; i++) {
        rgba[i * 4] = sa[i * 4]
        rgba[i * 4 + 1] = sb[i * 4]
        rgba[i * 4 + 3] = 255
      }
      gl.activeTexture(gl.TEXTURE1)
      gl.bindTexture(gl.TEXTURE_2D, maskTex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, mw, mh, 0, gl.RGBA, gl.UNSIGNED_BYTE, rgba)
      gl.uniform2f(loc.maskTexel, 1 / mw, 1 / mh)
    }

    const uploadWave = (full) => {
      for (let i = 0; i < levels.length; i++) levels[i] = 128 + cur[i] * GAIN
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, waveTex)
      if (full) gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, cols, rows, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, levelView)
      else gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, cols, rows, gl.LUMINANCE, gl.UNSIGNED_BYTE, levelView)
    }

    const placeFish = (t) => {
      const size = Math.min(Math.max(W * 0.022, 16), cfg.fishMax)
      for (let k = 0; k < 2; k++) {
        const ph = k * 2.4
        const at = (s) => [
          W * (0.5 + 0.44 * Math.sin(s * 0.07 + ph) * Math.cos(s * 0.031 + ph * 0.5)),
          H * (0.48 + 0.3 * Math.sin(s * 0.11 + ph * 1.3)),
        ]
        const [x, y] = at(t)
        const [nx, ny] = at(t + 0.05)
        fishData[k * 4] = x
        fishData[k * 4 + 1] = y
        fishData[k * 4 + 2] = Math.atan2(ny - y, nx - x)
        fishData[k * 4 + 3] = k === 0 ? size : size * 0.8
      }
    }

    const render = (t) => {
      gl.uniform2f(loc.res, W, H)
      gl.uniform1f(loc.time, t)
      gl.uniform1f(loc.night, document.documentElement.dataset.theme === 'night' ? 1 : 0)
      gl.uniform4fv(loc.fish, fishData)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      W = rect.width
      H = rect.height
      const scale = Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.5)
      canvas.width = Math.round(W * scale)
      canvas.height = Math.round(H * scale)
      gl.viewport(0, 0, canvas.width, canvas.height)

      cols = Math.max(3, Math.ceil(W / CELL))
      rows = Math.max(3, Math.ceil(H / CELL))
      cur = new Float32Array(cols * rows)
      prev = new Float32Array(cols * rows)
      levels = new Uint8ClampedArray(cols * rows)
      levelView = new Uint8Array(levels.buffer)
      gl.uniform2f(loc.waveTexel, 1 / cols, 1 / rows)
      uploadWave(true)
      drawMask()
      const t = (performance.now() - t0) / 1000
      placeFish(t)
      render(t)
    }

    const drop = (px, py, radius, strength) => {
      const cx = px / CELL
      const cy = py / CELL
      const x0 = Math.max(1, Math.floor(cx - radius))
      const x1 = Math.min(cols - 2, Math.ceil(cx + radius))
      const y0 = Math.max(1, Math.floor(cy - radius))
      const y1 = Math.min(rows - 2, Math.ceil(cy + radius))
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x - cx, y - cy)
          if (d < radius) cur[y * cols + x] += strength * (Math.cos((d / radius) * Math.PI) + 1) * 0.5
        }
      }
    }

    const step = () => {
      const c = cols
      for (let y = 1; y < rows - 1; y++) {
        let i = y * c + 1
        for (let x = 1; x < c - 1; x++, i++) {
          prev[i] = ((cur[i - 1] + cur[i + 1] + cur[i - c] + cur[i + c]) * 0.5 - prev[i]) * DAMP
        }
      }
      const swap = prev
      prev = cur
      cur = swap
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const t = (now - t0) / 1000
      frameNo += 1
      if (now > nextRain) {
        drop(Math.random() * W, Math.random() * H, 2 + Math.random() * 1.5, -(70 + Math.random() * 110))
        nextRain = now + cfg.rain[0] + Math.random() * cfg.rain[1]
      }
      placeFish(t)
      if (frameNo % 3 === 0) {
        for (let k = 0; k < 2; k++) drop(fishData[k * 4], fishData[k * 4 + 1], 1.8, -9)
      }
      step()
      uploadWave(false)
      render(t)
    }

    const start = () => {
      if (running || still || !visible || document.hidden || pausedRef.current) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const local = (clientX, clientY) => {
      const r = canvas.getBoundingClientRect()
      return [clientX - r.left, clientY - r.top]
    }

    const trail = (x, y, strength, radius) => {
      if (last) {
        const dx = x - last[0]
        const dy = y - last[1]
        const dist = Math.hypot(dx, dy)
        const n = Math.min(14, Math.ceil(dist / 6))
        const s = strength * Math.min(1, dist / 22)
        for (let k = 1; k <= n; k++) drop(last[0] + (dx * k) / n, last[1] + (dy * k) / n, radius, s)
      }
      last = [x, y]
    }

    const touched = () => host.classList.add('is-touched')

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return
      const [x, y] = local(event.clientX, event.clientY)
      trail(x, y, -26, 2.6)
    }
    const onPointerDown = (event) => {
      if (event.pointerType !== 'mouse') return
      const [x, y] = local(event.clientX, event.clientY)
      drop(x, y, 6, -320)
      touched()
    }
    const onPointerLeave = () => { last = null }
    const onTouchStart = (event) => {
      for (const touch of event.changedTouches) {
        const [x, y] = local(touch.clientX, touch.clientY)
        drop(x, y, 6, -300)
        last = [x, y]
      }
      touched()
    }
    const onTouchMove = (event) => {
      const touch = event.touches[0]
      if (!touch) return
      const [x, y] = local(touch.clientX, touch.clientY)
      trail(x, y, -34, 3.4)
    }
    const onTouchEnd = () => { last = null }

    control.current = { start, stop }

    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(host)
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    }, { rootMargin: '120px 0px' })
    viewObserver.observe(host)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    document.fonts?.load('900 100px Nunito').then(() => { if (W) resize() })

    if (!still) {
      host.addEventListener('pointermove', onPointerMove, { passive: true })
      host.addEventListener('pointerdown', onPointerDown, { passive: true })
      host.addEventListener('pointerleave', onPointerLeave, { passive: true })
      host.addEventListener('touchstart', onTouchStart, { passive: true })
      host.addEventListener('touchmove', onTouchMove, { passive: true })
      host.addEventListener('touchend', onTouchEnd, { passive: true })
    }

    return () => {
      stop()
      control.current = null
      sizeObserver.disconnect()
      viewObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerdown', onPointerDown)
      host.removeEventListener('pointerleave', onPointerLeave)
      host.removeEventListener('touchstart', onTouchStart)
      host.removeEventListener('touchmove', onTouchMove)
      host.removeEventListener('touchend', onTouchEnd)
      host.classList.remove('has-water')
    }
  }, [word, wordRef, variant])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
