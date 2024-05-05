import { Center, Gltf } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { useGameEngine } from "../hooks/useGameEngine";
import { Character } from "./Character";
import { PlayerName } from "./PlayerName";

export const Player = ({ index, player }) => {
  const { phase, playerTurn, players, getCard } = useGameEngine();
  const isPlayerTurn = phase === "playerAction" && index === playerTurn;
  const currentPlayer = players[playerTurn];
  const currentCard = getCard();
  const hasShield = player.getState("shield");
  const isPlayerPunched =
    phase === "playerAction" &&
    currentCard === "punch" &&
    index === currentPlayer.getState("playerTarget");
  const isWinner = player.getState("winner");
  const [animation, setAnimation] = useState("CharacterArmature|Idle");

  useEffect(() => {
    let cardAnim = "CharacterArmature|Idle";
    if (isPlayerTurn) {
      switch (currentCard) {
        case "shoot":
          cardAnim = "CharacterArmature|Punch_Right";
          break;
        case "grab":
          cardAnim = "CharacterArmature|Interact";
          break;
        case "shield":
          cardAnim = "CharacterArmature|Wave";
          break;
        case "curse":
          cardAnim = "CharacterArmature|Interact";
          break;
        case "haunt":
          cardAnim = "CharacterArmature|Interact";
          break;
        case "nightmare":
          cardAnim = "CharacterArmature|Punch_Right";
          break;
        default:
          break;
      }
    } else {
      if (isPlayerPunched) {
        cardAnim = "CharacterArmature|PunchedAnimation";
      }
    }
    if (isWinner) {
      cardAnim = "CharacterArmature|WinAnimation";
    }
    setAnimation(cardAnim);
  }, [currentCard, playerTurn, phase, isPlayerPunched, isWinner]);

  return (
    <motion.group
      animate={animation}
      position-x={1 + index}
      position-z={2}
      variants={{
        Punch_Right: {
          // punch
          z: 0.2,
          x: -1,
        },
        Wave: {
          // shield
          scale: 1.5,
        },
        Interact: {
          // grab
          x: 0,
          z: 0.4,
        },
        HitRecieve: {
          // punched
          z: -0.4,
          x: -1,
          rotateY: degToRad(180),
        },
      }}
    >
      <PlayerName name={player.state.profile.name} position-y={0.8} />
      <Character
        scale={0.5}
        character={index}
        rotation-y={degToRad(180)}
        animation={animation}
      />
      {hasShield && <Gltf scale={0.5} src="/models/Prop_Barrel.gltf" />}
      {/* PLAYER GEMS */}
      <Center disableY disableZ>
        {[...Array(player.getState("gems") || 0)].map((_, index) => (
          <Gltf
            key={index}
            src="/models/UI_Gem_Blue.gltf"
            position-x={index * 0.25}
            position-y={0.25}
            position-z={0.5}
            scale={0.5}
          />
        ))}
      </Center>
    </motion.group>
  );
};
