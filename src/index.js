import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";

createRoot(document.getElementById("root")).render(
  <Canvas>
    <Physics gravity={[0, -4.8, 0]} broadphase="SAP">
      <Scene />
    </Physics>
  </Canvas>
);
