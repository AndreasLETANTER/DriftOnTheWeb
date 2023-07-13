import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import { useState } from "react";

function Start() {
  return (
    <Canvas>
      <Physics gravity={[0, -4.8, 0]} broadphase="SAP">
        <Scene/>
      </Physics>
    </Canvas>
  );
}

function Help({ noHelpNeeded }) {
  return (
    <div className="help">
      <button onClick={noHelpNeeded}>Start</button>
    </div>
  );
}

function Intro() {
  const [helpNeeded, setHelpNeeded] = useState(true);

  const noHelpNeeded = () => {
    setHelpNeeded(false);
  };
  console.log(helpNeeded);
  return helpNeeded ? <Help noHelpNeeded={noHelpNeeded}/> : <Start/>
}

createRoot(document.getElementById("root")).render(
  <Intro/>
);
