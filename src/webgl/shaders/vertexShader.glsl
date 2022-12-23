attribute vec2 a_position;
// position is in range [-500, 500]

void main() {
    vec2 pos = a_position / 500.0;

    gl_Position = vec4(pos, 0.0, 1.0);
}