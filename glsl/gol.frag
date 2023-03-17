#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

const int modulo = 3;
const int spread = (modulo - 1) / 2;


int get(vec2 offset) {
    vec2 coord = (gl_FragCoord.xy + offset);
    float fmod = float(modulo);
    float cx = mod(coord.x, pow(fmod, 7.0));
    float cy = mod(coord.y, pow(fmod, 7.0));
    vec2 coord_wrap = vec2(cx, cy);

    vec4 color = texture2D(state, coord_wrap / scale);
    int result = int(color.x * 255.);
    if(color.x == 1.0) {
        result = 1;
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
    float decimal = float(remainder);
    vec4 color = vec4(decimal / 255.);

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
