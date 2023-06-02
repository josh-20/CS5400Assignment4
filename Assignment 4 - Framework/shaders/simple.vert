#version 300 es 
in vec4 aPostion;
in vecr aColor;
out vec4 vColor;


void main(){
    gl_Position = aPostion;
    vColor = aColor;
}