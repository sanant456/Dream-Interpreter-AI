import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The inner floating dream orb — a softly distorted sphere with
 * a dreamy purple/blue/gold gradient shader.
 */
function DreamOrb() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.15;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.45}
          speed={1.5}
          roughness={0.1}
          metalness={0.3}
          emissive="#4c1d95"
          emissiveIntensity={0.4}
        />
      </Sphere>

      {/* Outer glow shell */}
      <Sphere args={[1.15, 32, 32]}>
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}

/**
 * Ring halo orbiting the dream orb
 */
function OrbRing() {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.x = 0.8 + Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[1.55, 0.025, 16, 100]} />
      <meshBasicMaterial color="#eab308" transparent opacity={0.5} />
    </mesh>
  );
}

/**
 * <DreamScene /> — Hero 3D Canvas
 * Drop in absolutely positioned behind the hero text.
 */
export default function DreamScene() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#c4b5fd" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#eab308" />
        <DreamOrb />
        <OrbRing />
      </Canvas>
    </div>
  );
}
