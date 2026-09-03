/**
 * Minimal WebGL2 wrapper for one full-screen triangle and one fragment shader.
 * Replaces a general purpose library: fewer bytes, and shader compilation is
 * polled through KHR_parallel_shader_compile so the main thread never blocks on it.
 */

export type UniformValue = number | number[]

export type GLField = {
  gl: WebGL2RenderingContext
  /** Resolves once the program has linked and uniform locations are known. */
  ready: Promise<void>
  isReady: () => boolean
  setUniform: (name: string, value: UniformValue) => void
  draw: () => void
  clear: () => void
  lost: () => boolean
}

const VERTS = new Float32Array([-1, -1, 3, -1, -1, 3])

export function createGLField(
  canvas: HTMLCanvasElement,
  vertexSrc: string,
  fragmentSrc: string,
  uniformNames: readonly string[],
): GLField | null {
  const context = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
  })
  if (!context) return null
  // Narrowed once here so the closures below see a non-null context.
  const gl: WebGL2RenderingContext = context

  let contextLost = false
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault()
    contextLost = true
  })

  const vs = gl.createShader(gl.VERTEX_SHADER)!
  const fs = gl.createShader(gl.FRAGMENT_SHADER)!
  gl.shaderSource(vs, vertexSrc)
  gl.shaderSource(fs, fragmentSrc)
  gl.compileShader(vs)
  gl.compileShader(fs)
  const program = gl.createProgram()!
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  const parallel = gl.getExtension('KHR_parallel_shader_compile') as {
    COMPLETION_STATUS_KHR: number
  } | null

  const locations = new Map<string, WebGLUniformLocation>()
  const pending = new Map<string, UniformValue>()
  let ready = false

  const vao = gl.createVertexArray()!
  const buffer = gl.createBuffer()!

  function finish(resolve: () => void, reject: (e: Error) => void) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program) ?? ''
      const fsLog = gl.getShaderInfoLog(fs) ?? ''
      reject(new Error(`Field shader failed to link. ${log} ${fsLog}`.trim()))
      return
    }
    gl.useProgram(program)
    for (const name of uniformNames) {
      const loc = gl.getUniformLocation(program, name)
      if (loc) locations.set(name, loc)
    }
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, VERTS, gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    gl.disable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)
    ready = true
    for (const [name, value] of pending) apply(name, value)
    pending.clear()
    resolve()
  }

  const readyPromise = new Promise<void>((resolve, reject) => {
    if (!parallel) {
      finish(resolve, reject)
      return
    }
    // Poll instead of blocking: getProgramParameter(LINK_STATUS) would stall until the compile is done.
    const poll = () => {
      if (contextLost) return reject(new Error('Context lost during compile'))
      if (gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) finish(resolve, reject)
      else requestAnimationFrame(poll)
    }
    requestAnimationFrame(poll)
  })

  function apply(name: string, value: UniformValue) {
    const loc = locations.get(name)
    if (!loc) return
    if (typeof value === 'number') {
      if (name === 'uMode') gl.uniform1i(loc, value)
      else gl.uniform1f(loc, value)
      return
    }
    if (value.length === 2) gl.uniform2f(loc, value[0], value[1])
    else if (value.length === 3) gl.uniform3f(loc, value[0], value[1], value[2])
    else if (value.length === 4) gl.uniform4f(loc, value[0], value[1], value[2], value[3])
  }

  return {
    gl,
    ready: readyPromise,
    isReady: () => ready && !contextLost,
    setUniform: (name, value) => {
      if (ready) apply(name, value)
      else pending.set(name, value)
    },
    draw: () => {
      if (!ready || contextLost) return
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    clear: () => {
      if (contextLost) return
      gl.clear(gl.COLOR_BUFFER_BIT)
    },
    lost: () => contextLost,
  }
}
