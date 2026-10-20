import { useEffect, useRef } from "react"

// Ink background, one slow orange glow, film grain. The section's CSS gradient shows if WebGL is unavailable.
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`
const FRAG = `precision mediump float;
uniform vec2 r; uniform float t;
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 d = uv - vec2(0.85 + 0.05 * sin(t * 0.13), 0.9 + 0.06 * cos(t * 0.1));
  d.x *= r.x / r.y;
  float glow = exp(-dot(d, d) * 1.8);
  vec3 c = mix(vec3(0.067), vec3(0.847, 0.263, 0.118), glow * 0.42);
  c += (hash(gl_FragCoord.xy + floor(t * 12.0)) - 0.5) * 0.05;
  gl_FragColor = vec4(c, 1.0);
}`

export function GrainShader({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false })
    if (!gl) return
    const prog = gl.createProgram()!
    for (const [type, src] of [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]] as const) {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      gl.attachShader(prog, s)
    }
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    const uR = gl.getUniformLocation(prog, "r")
    const uT = gl.getUniformLocation(prog, "t")

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let visible = false
    const t0 = performance.now()
    const draw = () => {
      gl.uniform2f(uR, canvas.width, canvas.height)
      gl.uniform1f(uT, (performance.now() - t0) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    let last = 0
    // ~24fps is plenty: the glow drifts slowly and the grain only changes 12 times a second.
    const loop = (now = 0) => {
      if (now - last > 40) {
        draw()
        last = now
      }
      if (visible && !still) raf = requestAnimationFrame(loop)
    }
    const ro = new ResizeObserver(() => {
      // 1x pixels: soft glow + grain don't need retina, and it keeps cheap phones cool.
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      draw()
    })
    // Only burn GPU while the section is on screen.
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) loop()
    })
    ro.observe(canvas)
    io.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
