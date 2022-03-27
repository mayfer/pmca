#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
vec4 zero = vec4(0.0, 0.0, 0.0, 1.0);
vec4 one = vec4(170.0/255., 210.0/255.0, 185.0/255.0, 1.0);
vec4 two = vec4(1./255., 200./255., 255./255., 1.0);
vec4 three = vec4(0.0, 1.0, 0.0, 1.0);
vec4 four = vec4(0.0, 0.0, 1.0, 1.0);
vec4 five = vec4(0.0, 1.0, 1.0, 1.0);
vec4 six = vec4(1.0, 0.0, 1.0, 1.0);
vec4 seven = vec4(1.0, 1.0, 0.0, 1.0);
vec4 eight = vec4(0.5, 0.2, 0.0, 1.0);

const int spread = 1;

int get(vec2 offset) {
    vec2 coord = (gl_FragCoord.xy + offset);
    float cx = mod(coord.x, pow(3., 6.)*2.);
    float cy = mod(coord.y, pow(3., 6.)*2.);
    vec2 coord_wrap = vec2(cx, cy);

    vec4 color = texture2D(state, coord_wrap / scale);
    int result;
    if(color == zero) {
        result = 0;
    } else if(color == one || color == white) {
        result = 1;
    } else if(color == two) {
        result = 2;
    } else if(color == three) {
        result = 3;
    } else if(color == four) {
        result = 4;
    } else if(color == five) {
        result = 5;
    } else if(color == six) {
        result = 6;
    } else if(color == seven) {
        result = 7;
    } else {
        result = 0;
    }
    return result;
}
int modI(int aI, int bI) {
    float a = float(aI);
    float b = float(bI);
    float m=a-floor((a+0.5)/b)*b;
    int result = int(floor(m+0.5));
    return result;
}



void main() {
    int sum = 0;

    int multiplier = 1;
    for(int x = -spread; x<=spread; x++) {
        for(int y = -spread; y<=spread; y++) {
            if(x == 0 && y == 0) {
                sum += get(vec2(x * multiplier, y * multiplier));
            } else {
                sum += get(vec2(x * multiplier, y * multiplier));
            }
        }
    }
    

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
    } else if(remainder == 5) {
        gl_FragColor = five;
    } else if(remainder == 6) {
        gl_FragColor = six;
    } else if(remainder == 7) {
        gl_FragColor = seven;
    } else {
        gl_FragColor = zero;
    }
}
