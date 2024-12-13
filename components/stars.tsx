"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Define the props interface
interface StarFieldProps {
  starCount?: number;
  starSize?: number;
  speed?: number;
}

function StarField({
  starCount = 5000,
  starSize = 2,
  speed = 5,
}: StarFieldProps) {
  const pointsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (pointsRef.current) {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        vertices.push(x, y, z);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: starSize,
        sizeAttenuation: true,
      });
      if (pointsRef.current) {
        pointsRef.current.geometry = geometry;
        pointsRef.current.material = material;
      }
    }
    return () => {
      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        if (pointsRef.current.material instanceof THREE.Material) {
          pointsRef.current.material.dispose();
        }
      }
    };
  }, [starCount, starSize]);

  useFrame(() => {
    if (pointsRef.current && pointsRef.current.geometry) {
      const positions = pointsRef.current.geometry.attributes.position
        .array as unknown as number[];

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += speed;
        if (positions[i + 2] > 0) {
          positions[i] = (Math.random() - 0.5) * 2000;
          positions[i + 1] = (Math.random() - 0.5) * 2000;
          positions[i + 2] = -2000;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={pointsRef} />;
}

export function Stars({ starCount, starSize, speed }: StarFieldProps) {
  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 0, 500], fov: 75 }}>
        <StarField starCount={starCount} starSize={starSize} speed={speed} />
      </Canvas>
    </div>
  );
}
