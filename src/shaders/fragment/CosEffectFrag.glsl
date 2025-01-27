  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    float wave = cos(vUv.y * 10.0 + uTime) * 0.5 + 0.5;
    gl_FragColor = vec4(uColor * wave, 1.0);
  }