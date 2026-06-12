import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 180;
const CONNECTION_DISTANCE = 2.2;
const MOUSE_INFLUENCE_RADIUS = 3.5;
const MOUSE_REPEL_STRENGTH = 0.4;
const FIELD_SIZE = 12;

// ── Particle System rendered inside Canvas ──
const Particles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const [isLightTheme, setIsLightTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('light')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightTheme(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(9999, 9999));
  const mouse3D = useRef<THREE.Vector3>(new THREE.Vector3(9999, 9999, 0));
  const { camera, size } = useThree();

  // Generate initial random positions and velocities
  const { positions, velocities, basePositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const base = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * FIELD_SIZE * 2;
      const y = (Math.random() - 0.5) * FIELD_SIZE * 2;
      const z = (Math.random() - 0.5) * FIELD_SIZE * 0.8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      // Slow ambient velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    return { positions: pos, velocities: vel, basePositions: base };
  }, []);

  // Line geometry buffer — preallocate max possible connections
  const maxLines = PARTICLE_COUNT * 6;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  // Track mouse in NDC
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.set(
        (e.clientX / size.width) * 2 - 1,
        -(e.clientY / size.height) * 2 + 1
      );

      // Unproject to 3D
      const vec = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouse3D.current = camera.position.clone().add(dir.multiplyScalar(distance));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, size]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const clampedDelta = Math.min(delta, 0.05);
    const time = performance.now() * 0.001;

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Ambient floating motion
      posArray[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.15) * 0.001;
      posArray[i3 + 2] += velocities[i3 + 2];

      // Gentle pull back towards base position
      posArray[i3] += (basePositions[i3] - posArray[i3]) * 0.001;
      posArray[i3 + 1] += (basePositions[i3 + 1] - posArray[i3 + 1]) * 0.001;
      posArray[i3 + 2] += (basePositions[i3 + 2] - posArray[i3 + 2]) * 0.001;

      // Mouse repulsion
      const dx = posArray[i3] - mouse3D.current.x;
      const dy = posArray[i3 + 1] - mouse3D.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0.01) {
        const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * MOUSE_REPEL_STRENGTH * clampedDelta * 60;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }

      // Boundary wrapping
      const bound = FIELD_SIZE;
      if (posArray[i3] > bound) posArray[i3] = -bound;
      if (posArray[i3] < -bound) posArray[i3] = bound;
      if (posArray[i3 + 1] > bound) posArray[i3 + 1] = -bound;
      if (posArray[i3 + 1] < -bound) posArray[i3 + 1] = bound;
    }

    posAttr.needsUpdate = true;

    // Build connections
    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.35;
          const idx = lineIdx * 6;

          linePositions[idx] = posArray[i3];
          linePositions[idx + 1] = posArray[i3 + 1];
          linePositions[idx + 2] = posArray[i3 + 2];
          linePositions[idx + 3] = posArray[j3];
          linePositions[idx + 4] = posArray[j3 + 1];
          linePositions[idx + 5] = posArray[j3 + 2];

          // Cyber-blue color with distance-based alpha
          lineColors[idx] = 0;
          lineColors[idx + 1] = 0.83 * alpha;
          lineColors[idx + 2] = 1.0 * alpha;
          lineColors[idx + 3] = 0;
          lineColors[idx + 4] = 0.83 * alpha;
          lineColors[idx + 5] = 1.0 * alpha;

          lineIdx++;
          if (lineIdx >= maxLines) break;
        }
      }
      if (lineIdx >= maxLines) break;
    }

    const lineGeom = linesRef.current.geometry;
    const linePosAttr = lineGeom.attributes.position as THREE.BufferAttribute;
    const lineColAttr = lineGeom.attributes.color as THREE.BufferAttribute;

    (linePosAttr.array as Float32Array).set(linePositions);
    (lineColAttr.array as Float32Array).set(lineColors);

    lineGeom.setDrawRange(0, lineIdx * 2);
    linePosAttr.needsUpdate = true;
    lineColAttr.needsUpdate = true;
  });

  return (
    <>
      {/* Particle dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D4FF"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={isLightTheme ? 0.9 : 0.7}
          depthWrite={false}
          blending={isLightTheme ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={maxLines * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={maxLines * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={1}
          depthWrite={false}
          blending={isLightTheme ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
};

// ── Main ParticleField Wrapper ──
const ParticleField: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleField;
