import { useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { degToRad } from "three/src/math/MathUtils";
import { useGameEngine } from "../hooks/useGameEngine";
import { Card } from "./Card";

export const Gameboard = () => {
  const viewport = useThree((state) => state.viewport);
  const scalingRatio = Math.min(1, viewport.width / 12);

  const { deck, phase, getCard } = useGameEngine();

  return (
    <group scale={scalingRatio}>
      {/* DECK */}
      <group position-x={6} position-z={3} scale={3}>
        {deck.map((_, index) => (
          <motion.group
            key={index}
            position-y={index * 0.015}
            rotation-y={index % 2 ? degToRad(2) : 0}
            animate={
              phase === "playerAction" && index === deck.length - 1
                ? "selected"
                : ""
            }
            variants={{
              selected: {
                x: 0,
                y: 1.75,
                z: -3.5,
                rotateY: degToRad(130),
                scale: 1,
              },
            }}
          >
            <motion.group
              rotation-x={degToRad(90)}
              variants={{
                selected: {
                  rotateX: degToRad(-45),
                },
              }}
            >
              <Card type={getCard() || undefined} />
            </motion.group>
          </motion.group>
        ))}
      </group>
    </group>
  );
};

