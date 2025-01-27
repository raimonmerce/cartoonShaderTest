    uniform float uTime;
    uniform vec3 uLightPosition;
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
  
    void main() {
      vec3 lightDir = normalize(uLightPosition - vPosition);
      float diff = max(dot(vNormal, lightDir), 0.0);
      if (diff > 0.98) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      } else {
        if (diff > 0.7) diff = 1.0;
        else if (diff > 0.3) diff = 0.6;
        else diff = 0.1;
        vec3 diffuse = diff * uColor;
        vec3 ambient = 0.2 * uColor;
        gl_FragColor = vec4(diffuse + ambient, 1.0);
      }
    }