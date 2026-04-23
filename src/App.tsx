/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { motion, useScroll } from 'motion/react';
import { DataCar } from './components/DataCar';
import { Overlay } from './components/Overlay';
import { Environment, Loader } from '@react-three/drei';
import Lenis from 'lenis';

export default function App() {
  const [scroll, setScroll] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Smooth scrolling setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScroll(latest);
    });

    return () => {
      unsubscribe();
      lenis.destroy();
    };
  }, [scrollYProgress]);

  return (
    <main className="bg-black min-h-screen text-white">
      {/* 3D WEBGL SCENE */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 35 }}
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: true }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 5, 20]} />
          
          <Suspense fallback={null}>
            <SceneContent scrollProgress={scroll} />
            <Environment preset="night" />
            
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} opacity={1.5} />
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* UI OVERLAY */}
      <Overlay />
      
      <Loader />
    </main>
  );
}

function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  // Camera animation based on scroll
  return (
    <group>
      <group
        position={[
          (Math.sin(scrollProgress * Math.PI) * 2), // Dolly sideways
          0,
          Math.max(-5, 0 - scrollProgress * 10) // Zoom out/in
        ]}
        rotation={[0, scrollProgress * Math.PI * 0.2, 0]}
      >
        <DataCar scrollProgress={scrollProgress} />
      </group>
      
      {/* Dynamic lighting that follows the "focus" */}
      <pointLight 
        position={[2, 2, 2]} 
        intensity={2} 
        color="#00F5FF" 
      />
      <pointLight 
        position={[-2, -1, 3]} 
        intensity={1} 
        color="#39FF14" 
      />
    </group>
  );
}
