
MySample.main = (function() {
    'use strict';

    let canvas = document.getElementById('canvas-main');
    let gl = canvas.getContext('webgl2');

    let objectCube = {
        vertices: new Float32Array([]),
        vertexColors: new Float32Array([]),
        center: new Float32Array([0,0,-2]),
        parallel: new Float32Array([]),
        perspective: new Float32Array([]),
        model: new Float32Array
    };
    // tetrahedron
    // -0.5, 0.0, 0.5, 1.0,
        // 0.0, 0.0, 0.0, 1.0,
        // 0.0, 0.5, 0.5, 1.0,

        // 0.0, 0.0, 0.0, 1.0,
        // 0.5, 0.0, 0.5, 1.0,
        // 0.0, 0.5, 0.5, 1.0,

        // 0.5, 0.0, 0.5, 1.0,
        // -0.5, 0.0, 0.5, 1.0,
        // 0.0, 0.5, 0.5, 1.0,

        // 0.0, 0.0, 0.0, 1.0,
        // -0.5, 0.0, 0.5, 1.0,
        // 0.5, 0.0, 0.5, 1.0,
    
    objectCube.vertices = new Float32Array([
        0.5, 0.5, 0.0, 1.0,
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0, //End of Front face
        0.5, 0.5, -0.5, 1.0,
        -0.5, 0.5, -0.5, 1.0,
        -0.5, -0.5, -0.5, 1.0,
        -0.5, -0.5, -0.5, 1.0,
        0.5, -0.5, -0.5, 1.0,
        0.5, 0.5, -0.5, 1.0, // End of Back face
        0.5, 0.5, -0.5, 1.0,
        0.5, 0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, -0.5, 1.0,
        0.5, 0.5, -0.5, 1.0, // End of right face
        -0.5, 0.5, -0.5, 1.0,
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, -0.5, 1.0,
        -0.5, 0.5, -0.5, 1.0, // End of Left face
        -0.5, 0.5, 0.0, 1.0,
        -0.5, 0.5, -0.5, 1.0,
        0.5, 0.5, -0.5, 1.0,
        -0.5, 0.5, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0,
        0.5, 0.5, -0.5, 1.0, // End of top face
        -0.5, -0.5, 0.0, 1.0,
        -0.5, -0.5, -0.5, 1.0,
        0.5, -0.5, -0.5, 1.0,
        -0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, 0.0, 1.0,
        0.5, -0.5, -0.5, 1.0, // End of bottom face
    ]);
    
    objectCube.vertexColors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0
    ]);
    let n = -1.0;
    let f = -10.0;
    let t = 1.0;
    let b = -1.0;
    let r = 1.0;
    let l = -1.0;
    // parallel projection
    objectCube.parallel = new Float32Array([
        2.0/(r-t), 0, 0, -((l+r)/(r-l)),
        0, 2/(t-b), 0, -((t+b)/(t-b)),
        0, 0, -2/(f-n), -((f+n)/(f-n)),
        0, 0, 0, 1
    ]);
    // perspective projection
    objectCube.perspective = new Float32Array([
        n/0.5, 0.0, 0.0, 0.0,
        0.0, n/0.5, 0.0, 0.0,
        0.0, 0.0, -((f+n)/(f+n)), (-2.0*f*n)/(f-n),
        0.0, 0.0, -1.0, 0.0
    ]);

    // Camera View
    let mCameraView = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0

    ]);
    // rotate about the y-axis
    objectCube.model = new Float32Array([
        Math.cos(20), -Math.sin(20),0,0,
        Math.sin(20), Math.cos(20), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ])
    
    let indices = new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
    // Prepare vertex buffer
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,objectCube.vertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    // Prepare Color Buffer
    let vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,objectCube.vertexColors,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    
    // Prepare Index Buffer
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

    // Prepare Vertex Shader
    let vertexShaderSource = `#version 300 es
    uniform mat4 uParallel;
    uniform mat4 uView;
    uniform mat4 uModel;
    in vec4 aPosition;
    in vec4 aColor;
    out vec4 vColor;
    void main()
    {
    gl_Position = uParallel * uView * uModel * aPosition;
    vColor = aColor;
    }`;

    
    
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexShaderSource);
    gl.compileShader(vertexShader);
    console.log(gl.getShaderInfoLog(vertexShader));
    
    // Prepare Fragment Shader
    let fragmentShaderSource = `#version 300 es
    precision lowp float;
    in vec4 vColor;
    out vec4 outColor;
    void main()
    {
        outColor = vColor;
    }`
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    
    // Shader Program
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    let location = gl.getUniformLocation(shaderProgram, 'uCombined');
    gl.uniformMatrix4fv(location,false,transposeMatrix4x4(objectCube.parallel));
    let location2 = gl.getUniformLocation(shaderProgram, 'uView');
    gl.uniformMatrix4fv(location2,false,transposeMatrix4x4(mCameraView));
    let location3 = gl.getUniformLocation(shaderProgram,'uModel');
    gl.uniformMatrix4fv(location3,false,transposeMatrix4x4(objectCube.model));
    
    // Specify Shader & Buffer objectCube Attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let position = gl.getAttribLocation(shaderProgram, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 4, gl.FLOAT, false, objectCube.vertices.BYTES_PER_ELEMENT * 4, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    let color = gl.getAttribLocation(shaderProgram, 'aColor');
    gl.enableVertexAttribArray(color);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, objectCube.vertexColors.BYTES_PER_ELEMENT * 3, 0);


    function transposeMatrix4x4(m) {
        let t = [
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
        ];
        return t;
    }
        


    // Request Animation Frame


    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    function update() {

    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        // Reset Framebuffer
        gl.clearColor(
            0.3921568627450980392156862745098,
            0.58431372549019607843137254901961,
            0.92941176470588235294117647058824,
            1.0);
        gl.clearDepth(1.0);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Draw the Primitives
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {
        update();
        render();

        //requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop);

}());
