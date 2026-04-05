import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Particle field — randomly distributed small spheres that drift slowly
 */
function ParticleField({ count = 180 }) {
  const points = useRef();

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sizes[i] = Math.random() * 0.06 + 0.01;
    }

    return { positions, sizes };
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.015;
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.06;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#a78bfa"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * A set of slow, large semi-transparent glowing orbs in the background
 * to simulate depth/nebula
 */
function NebulaOrb({ position, color, size, speed }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
    </mesh>
  );
}

/**
 * <BackgroundParticles /> — full-page background Canvas
 * Absolutely covers entire page behind all content.
 */
export default function BackgroundParticles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1]}
      >
        <ParticleField count={200} />
        <NebulaOrb position={[-4, 2, -3]} color="#7c3aed" size={3} speed={0.3} />
        <NebulaOrb position={[5, -1, -4]} color="#4c1d95" size={2.5} speed={0.2} />
        <NebulaOrb position={[0, -3, -2]} color="#eab308" size={1.8} speed={0.4} />
        <NebulaOrb position={[-6, -2, -3]} color="#6d28d9" size={2.2} speed={0.25} />
      </Canvas>
    </div>
  );
}
