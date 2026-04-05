import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A gently morphing mind/brain-inspired toroidal shape that
 * rotates slowly and breathes — shown in the result/dashboard section
 */
function MindShape() {
  const meshRef = useRef();
  const outerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.3;
      // "breathing" scale
      const breath = 1 + Math.sin(t * 0.6) * 0.04;
      meshRef.current.scale.setScalar(breath);
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.1;
      outerRef.current.rotation.z = t * 0.06;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Inner morphing torus */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.7, 0.22, 120, 16, 2, 3]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.3}
          speed={1.2}
          roughness={0.05}
          metalness={0.5}
          emissive="#4c1d95"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Outer orbit ring */}
      <mesh ref={outerRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.018, 8, 80]} />
        <meshBasicMaterial color="#eab308" transparent opacity={0.4} />
      </mesh>

      {/* Gold inner ring */}
      <mesh rotation={[Math.PI / 1.5, 0.5, 0]}>
        <torusGeometry args={[1.0, 0.012, 8, 80]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

/**
 * <FloatingMind /> — Result/Dashboard section 3D Canvas
 * Used as a small decorative overlay beside the ResultCard
 */
export default function FloatingMind({ size = 280 }) {
  return (
    <div
      style={{ width: size, height: size, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 3, 3]} intensity={1.5} color="#c4b5fd" />
        <pointLight position={[-3, -2, 2]} intensity={1.0} color="#eab308" />
        <MindShape />
      </Canvas>
    </div>
  );
}
