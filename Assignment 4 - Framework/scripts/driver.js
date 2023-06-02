
MySample.main = (function() {
    'use strict';

    let canvas = document.getElementById('canvas-main');
    let gl = canvas.getContext('webgl2');


    let vertices = new Float32Array([
        0.0, 0.5, 0.0,
        0.5, 0.0, 0.0,
        -0.5, 0.0, 0.0
    ]);
    let vertexColors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    ]);
    let indices = new Uint16Array([0, 1, 2]);
    let vertexBuffer = gl.createrBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    
    



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
