#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415926538

uniform sampler2D state;
uniform vec2 scale;
uniform float time;


// Function to convert RGB to HSV
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

// Function to convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Function to rotate the hue of a color
vec4 rotateColor(vec4 color, float time) {
    vec3 hsv = rgb2hsv(color.rgb);
    hsv.x += time; // Add time to the hue component
    hsv.x = fract(hsv.x); // Wrap the hue value to the range [0, 1]
    return vec4(hsv2rgb(hsv), 1.0);
}



void main() {
    vec4 state = texture2D(state, gl_FragCoord.xy / scale);
    float state_f = state.r * 255.0;
    int state_num = int(state_f);
    vec4 color = vec4(1.0);
    if(state_num == 0) {
        color = vec4(0.0, 0.0, 0.0, 1.0);
    } else if(state_num == 1) {
        //color = vec4(255.0, 255.0, 0.0, 1.0);
        // color = vec4(0.0, 0.0, 0.0, 1.0);
        color = vec4(255.0, 255.0, 202.0, 1.0);
    } else if(state_num == 2) {
        //color = vec4(0.0, 55.0, 100.0, 1.0);
        color = vec4(100.0, 30.0, 70.0, 1.0);
    } else if(state_num == 3) {
        //color = vec4(0.0, 55.0, 180.0, 1.0);
        color = vec4(100.0, 0.0, 0.0, 1.0);
    } else if(state_num == 4) {
        color = vec4(0.0, 100.0, 0.0, 1.0);
    }
    // color = vec4(120.0) * (state_f);
    float period = (9.0*PI);
    vec2 originized = (gl_FragCoord.xy / scale) * 2.0 - 1.0;
    float augment = 0.0;
    //float augment = (cos(originized.x * period) / sin(originized.y * period))/12.+0.5;
    gl_FragColor = 1.*(color / 255.0) + augment;


    vec4 color2 = gl_FragColor;
    //float time = 0.1; // Time-based value for rotation

    vec4 rotatedColor = rotateColor(color2, time/1000.0);
    gl_FragColor = rotatedColor; // Set the output color of the fragment

    // now apply ripple gradient color rotation effect based on coordinates
    gl_FragColor = rotateColor(gl_FragColor, (gl_FragCoord.x + gl_FragCoord.y) / 1000.0);
}
