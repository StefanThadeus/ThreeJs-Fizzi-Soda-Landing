"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const LOCATION = "/3D-Models/Soda-can.gltf";

useGLTF.preload(LOCATION);

const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png",
  grape: "/labels/grape.png",
  blackCherry: "/labels/cherry.png",
  strawberryLemonade: "/labels/strawberry.png",
  watermelon: "/labels/watermelon.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export const SodaCanModel = ({
  flavor = "blackCherry",
  scale = 2,
  ...props
}: SodaCanProps) => {
  const { nodes } = useGLTF(LOCATION);

  const labels = useTexture(flavorTextures, (loadedTextures) => {
    Object.values(loadedTextures).forEach((texture) => {
      texture.flipY = false;
      texture.needsUpdate = true;
    });
  });

  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
};
