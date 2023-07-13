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
    <div className="help-text">
      <h1>DriftOnTheWeb</h1>
      <p className="game-info-text">This game has been made with React Three Fiber and CannonJs
        <span className="game-info-text"> by <a href="https://github.com/AndreasLETANTER">@AndreasLETANTER</a></span>
      </p>
      <p className="controls-text">
        <span className="key">Z
          <span className="key-text"> - Accelerate</span>
        </span>
        <span className="key">Q
          <span className="key-text"> - Turn Left</span>
        </span>
        <span className="key">D
          <span className="key-text"> - Turn Right</span>
        </span>
        <span className="key">S
          <span className="key-text"> - Brake</span>
        </span>
        <span className="key">B
          <span className="key-text"> - Handbrake</span>
        </span>
        <span className="key">N
          <span className="key-text"> - Nitro</span>
        </span>
        <span className="key">R
          <span className="key-text"> - Reset the car</span>
        </span>
      </p>
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
