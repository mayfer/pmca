#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

vec4 zero = vec4(0.0, 0.0, 0.0, 1.0);
vec4 one = vec4(1.0, 1.0, 1.0, 1.0);
vec4 two = vec4(1.0, 0.0, 0.0, 1.0);
vec4 three = vec4(1.0, 1.0, 0.0, 1.0);
vec4 four = vec4(1.0, 1.0, 0.0, 1.0);


int get(vec2 offset) {
    vec4 color = texture2D(state, (gl_FragCoord.xy + offset) / scale);
    int result;
    if(color == zero) {
        result = 0;
    } else if(color == one) {
        result = 1;
    } else if(color == two) {
        result = 2;
    } else if(color == three) {
        result = 3;
    } else {
        result = 1;
    }
    return result;
    //return int(color.r); // + color.g + color.b);
}
int modI(int aI, int bI) {
    float a = float(aI);
    float b = float(bI);
    float m=a-floor((a+0.5)/b)*b;
    int result = int(floor(m+0.5));
    return result;
}



void main() {
    int sum =
    
        get(vec2( 0.0,  0.0)) +
        get(vec2( 0.0, -1.0)) +
        get(vec2( 0.0,  1.0)) +
        //get(vec2( 0.0, -2.0)) +
        //get(vec2( 0.0,  2.0)) +
    

        get(vec2(-1.0,  0.0)) +
        get(vec2(-1.0, -1.0)) +
        get(vec2(-1.0,  1.0)) +
        //get(vec2(-1.0, -2.0)) +
        //get(vec2(-1.0,  2.0)) +

        get(vec2( 1.0,  0.0)) +
        get(vec2( 1.0, -1.0)) +
        get(vec2( 1.0,  1.0)) +
        //get(vec2( 1.0, -2.0)) +
        //get(vec2( 1.0,  2.0)) +

/*
        //get(vec2( -2.0,  0.0)) +
        get(vec2( -2.0, -1.0)) +
        get(vec2( -2.0,  1.0)) +
        get(vec2( -2.0,  2.0)) +
        get(vec2( -2.0, -2.0)) +

        //get(vec2( 2.0,  0.0)) +
        get(vec2( 2.0, -1.0)) +
        get(vec2( 2.0,  1.0)) +
        get(vec2( 2.0,  2.0)) +
        get(vec2( 2.0, -2.0)) +
*/
        0;

    int remainder = modI(sum, 3);
    if(remainder == 0) {
        gl_FragColor = zero;
    } else if(remainder == 1) {
        gl_FragColor = one;
    } else if(remainder == 2) {
        gl_FragColor = two;
    } else if(remainder == 3) {
        gl_FragColor = three;
    } else if(remainder == 4) {
        gl_FragColor = four;
    } else {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
}
