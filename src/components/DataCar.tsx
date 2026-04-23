import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const vertexShader = `
  varying vec2 vUv;
  varying float vHighlight;
  uniform float uTime;
  uniform float uScanline;
  uniform float uDamageMode;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Subtle morphing
    float noise = sin(pos.x * 2.0 + uTime) * sin(pos.y * 2.0 + uTime) * 0.05;
    pos += normal * noise;

    // Scanning highlight
    float dist = abs(pos.z - uScanline);
    vHighlight = smoothstep(0.1, 0.0, dist) * uDamageMode;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.5 + vHighlight * 3.0) * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vHighlight;
  uniform vec3 uColor;
  uniform float uDamageMode;

  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);

    vec3 finalColor = uColor;
    if (vHighlight > 0.5) {
      finalColor = mix(uColor, vec3(1.0, 0.0, 0.0), vHighlight);
    }

    gl_FragColor = vec4(finalColor, strength);
  }
`;

export function DataCar({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // Create a stylized car silhouette using a box as a base and then scattering points
  const points = useMemo(() => {
    const geo = new THREE.BoxGeometry(4, 1.2, 8, 40, 20, 60);
    // Rough car shape modification
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const x = pos.getX(i);
      
      // Taper front and back
      if (z > 2) pos.setY(i, y * 0.6); // hood
      if (z < -3) pos.setY(i, y * 0.8); // trunk
      
      // Cabin
      if (Math.abs(z) < 2 && y > 0) pos.setY(i, y * 1.5);
    }
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      
      // Map scroll progress to scanning line
      // Damage detection section is approx 0.25 to 0.5 scroll
      const scanStart = 0.25;
      const scanEnd = 0.5;
      const scanT = Math.max(0, Math.min(1, (scrollProgress - scanStart) / (scanEnd - scanStart)));
      
      materialRef.current.uniforms.uScanline.value = THREE.MathUtils.lerp(4, -4, scanT);
      materialRef.current.uniforms.uDamageMode.value = scrollProgress > 0.2 ? 1.0 : 0.0;
    }
    
    // Rotate car
    meshRef.current.rotation.y = time * 0.1 + scrollProgress * Math.PI * 0.5;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <points ref={meshRef} geometry={points}>
        <shaderMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#00F5FF') },
            uScanline: { value: 0 },
            uDamageMode: { value: 0 }
          }}
        />
      </points>
      
      {/* Underlying lines for tech feel */}
      <lineSegments>
        <wireframeGeometry args={[points]} />
        <meshBasicMaterial 
          color="#00F5FF" 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending} 
        />
      </lineSegments>

      {/* Internal "Engine/Core" glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#00F5FF" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
    </Float>
  );
}
