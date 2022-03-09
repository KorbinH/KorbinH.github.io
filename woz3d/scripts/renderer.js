let programInfo = null;
let shader = null;

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


function initShader(gl, vSource, fSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function initRenderer(gl) {
  const vSource = `
    attribute vec4 vertexPosition;

    uniform mat4 transformationMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;

    void main() {
        gl_Position = projectionMatrix * viewMatrix * transformationMatrix * vertexPosition;
    }
    `;

  const fSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
    `;

  shaderProgram = initShader(gl, vSource, fSource);

  programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'vertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'projectionMatrix'),
      transformationMatrix: gl.getUniformLocation(shaderProgram, 'transformationMatrix'),
      viewMatrix: gl.getUniformLocation(shaderProgram, 'viewMatrix'),
    },
  };

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

}

function gibProgramInfo() {
  return programInfo;
}

function clearScreen(gl, color) {
  gl.clearColor(color.r, color.g, color.b, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function render(gl, scene, player) {
  const fov = 45 * Math.PI / 180;
  const aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fov, aspectRatio, zNear, zFar);

  const transformationMatrix = mat4.create();
  mat4.identity(transformationMatrix, transformationMatrix);
  const viewMatrix = mat4.create();
  mat4.rotate(viewMatrix, viewMatrix, player.a, [0, 1, 0])

  mat4.translate(viewMatrix, viewMatrix, [-player.x, 0, -player.y]);

  gl.bindBuffer(gl.ARRAY_BUFFER, scene.model.positions);

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.transformationMatrix, false, transformationMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.viewMatrix, false, viewMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, scene.model.vertexCount);

  gl.disableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

