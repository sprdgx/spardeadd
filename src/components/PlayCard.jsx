import { useGLTF, useTexture } from "@react-three/drei";
import React from "react";

export function Card() {
    const { nodes, materials } = useGLTF("/models/card.glb");
    const texture = useTexture(`cards/${type}.jpg`);
    return (
      <group dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
          <meshStandardMaterial
            {...materials.Front}
            map={texture}
            color="white"
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials.Borders}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials.Back}
        />
      </group>
    );
  }
  
  useGLTF.preload("/models/card.glb");
  useTexture.preload("/cards/curse.jpg");
  useTexture.preload("/cards/nightmare.jpg");
  