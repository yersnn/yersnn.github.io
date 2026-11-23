export type CompiledProgram = { program: WebGLProgram; dispose: () => void };

/** Compiles and links a shader program. Returns null (and logs) if compilation or linking fails. */
export function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): CompiledProgram | null {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return { program, dispose: () => gl.deleteProgram(program) };
}

/** Uploads a full-screen triangle-pair quad and binds it to the given attribute. */
export function bindFullscreenQuad(gl: WebGLRenderingContext, program: WebGLProgram, attribute: string) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, attribute);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  return buffer;
}
