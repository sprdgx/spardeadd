import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { isHost, isStreamScreen } from "playroomkit";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

const DEBUG = true;

function App() {
  return (
    
    <>
      <Leva hidden={!DEBUG || !isHost()} />
      <Canvas
        shadows
        camera={{
          position: isStreamScreen() ? [14, 10, -14] : [0, 10, 7.5],
          fov: 30,
        }}
      >
        <color attach="background" args={["#000000"]} />
        <MotionConfig
          transition={{
            type: "spring",
            mass: 5,
            stiffness: 500,
            damping: 100,
            restDelta: 0.0001,
          }}
        >
          <Experience />
        </MotionConfig>
      </Canvas>
      <UI />
    </>
  );
}

export default App;
