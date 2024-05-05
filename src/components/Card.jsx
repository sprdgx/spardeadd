import { Text, useFont, useGLTF, useTexture } from "@react-three/drei";
import React from "react";

const CARD_DESCRIPTIONS = {
  shoot: "Shoot Another Players to take their Coins next Time",
  shield: "Protect yourself from the Shooters",
  grab: "Grab The Coins if there's some Left",
  curse: "Curse another player to prevent them from using cards next round",
  haunt: "Summon a ghostly apparition to haunt a player for three rounds",
  nightmare: "Force another player to replay their last turn",
};

export function Card({ type = "shield", ...props }) {
  const { nodes, materials } = useGLTF("/models/card.glb");
  const texture = useTexture(`cards/${type}.jpg`);
  return (
    <group {...props} dispose={null}>
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
      <Text
        font="/fonts/RobotoSlab-Bold.ttf"
        fontSize={0.1}
        anchorY={"top"}
        anchorX={"left"}
        position-x={-0.46}
        position-y={-0.3}
        position-z={0.01}
      >
        {type.toUpperCase()}
        <meshStandardMaterial
          color="white"
          roughness={materials.Front.roughness}
        />
      </Text>
      <Text
        font="/fonts/RobotoSlab-Regular.ttf"
        fontSize={0.06}
        maxWidth={0.9}
        anchorY={"top"}
        anchorX={"left"}
        position-x={-0.46}
        position-y={-0.44}
        position-z={0.01}
        lineHeight={1}
      >
        {CARD_DESCRIPTIONS[type] || ""}
        <meshStandardMaterial
          color="white"
          roughness={materials.Front.roughness}
        />
      </Text>
    </group>
  );
}

useGLTF.preload("/models/card.glb");
useTexture.preload("/cards/shoot.jpg");
useTexture.preload("/cards/shield.jpg");
useTexture.preload("/cards/grab.jpg");
useFont.preload("/fonts/RobotoSlab-Bold.ttf");
useFont.preload("/fonts/RobotoSlab-Regular.ttf");
