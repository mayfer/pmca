#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
vec4 zero = vec4(0.0, 0.0, 0.0, 1.0);
vec4 one = vec4(10., 25., 11., 55.) / 255.;
vec4 two = vec4(165.0, 165.0, 145.0, 155.0) / 255.0;
vec4 three = vec4(129.0, 190.0, 116.0, 255.0) / 255.0;
vec4 four = vec4(163.0, 171.0, 120.0, 255.0) / 255.0;
vec4 five = vec4(182.0, 224.0, 56.0, 255.0) / 255.0;
vec4 six = vec4(182.0, 224.0, 96.0, 255.0) / 255.0;
vec4 seven = vec4(120.0, 224.0, 155.0, 255.0) / 255.0;
vec4 eight = vec4(23.0, 84.0, 21.0, 255.0) / 255.0;
vec4 nine = vec4(102.0, 224.0, 0.0, 255.0) / 255.0;
vec4 ten = vec4(122.0, 129.0, 255.0, 255.0) / 255.0;
vec4 eleven = vec4(0.0, 224.0, 255.0, 255.0) / 255.0;

const int modulo = 6;
const int spread = 2;//(modulo - 1) / 2;


int get(vec2 offset) {
    vec2 coord = (gl_FragCoord.xy + offset);
    float fmod = float(modulo);
    float cx = mod(coord.x, 2.0*pow(fmod, 4.0));
    float cy = mod(coord.y, 2.0*pow(fmod, 4.0));
    vec2 coord_wrap = vec2(cx, cy);

    vec4 color = texture2D(state, coord_wrap / scale);
    int result;
    if(color == zero) {
        result = 0;
    } else if(color == one || color == white) {
        result = 1;
    } else if(color == two|| color == white) {
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
    } else if(color == eight) {
        result = 8;
    } else if(color == nine) {
        result = 9;
    } else if(color == ten) {
        result = 10;
    } else if(color == eleven) {
        result = 11;
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

vec4 remainder_to_color(int remainder) {
    vec4 color;
    if(remainder == 0) {
        color = zero;
    } else if(remainder == 1) {
        color = one;
    } else if(remainder == 2) {
        color = two;
    } else if(remainder == 3) {
        color = three;
    } else if(remainder == 4) {
        color = four;
    } else if(remainder == 5) {
        color = five;
    } else if(remainder == 6) {
        color = six;
    } else if(remainder == 7) {
        color = seven;
    } else if(remainder == 8) {
        color = eight;
    } else if(remainder == 9) {
        color = nine;
    } else if(remainder == 10) {
        color = ten;
    } else if(remainder == 11) {
        color = eleven;
    } else {
        color = zero;
    }

    return color;
}

void main() {
    int sum = 0;

    int multiplier = 1;
    for(int x = -spread; x<=spread; x++) {
        for(int y = -spread; y<=spread; y++) {
            if(x == 0 && y == 0 && modI(modulo, 2) > 0) {
                sum += get(vec2(x * multiplier, y * multiplier));
            } else {
                sum += get(vec2(x * multiplier, y * multiplier));
            }
        }
    }
    

    int remainder = modI(sum, modulo);
    gl_FragColor = remainder_to_color(remainder);
}
