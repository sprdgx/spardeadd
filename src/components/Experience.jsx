import { Gameboard } from "./Gameboard";
import { MobileController } from "./MobileController";
import { OrbitControls } from "@react-three/drei";
import { isStreamScreen } from "playroomkit";
import { degToRad } from "three/src/math/MathUtils";


export const Experience = () => {
  return (
    <>
      {isStreamScreen() && <OrbitControls maxPolarAngle={degToRad(80)} />}
      {isStreamScreen() ? <Gameboard /> : <MobileController />}
      <directionalLight intensity={1} color="gray" position={[5,5,-5]} />
      <directionalLight intensity={1} color="white" position={[2,2,2]} />
    </>
  );
};
