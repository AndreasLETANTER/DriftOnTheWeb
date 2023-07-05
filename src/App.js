import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import "./style.css";
import { Ground } from './Ground';
import { Car } from './Car';

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} autoRotate autoRotateSpeed={0.4}/>
      <PerspectiveCamera makeDefault position={[3, 2.3, 5]} fov={50} />
      <color attach="background" args={['#000002']} />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        position={[5, 5, 0]}
        angle={0.6}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        position={[-5, 5, 0]}
        angle={0.6}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        position={[0, 5, 5]}
        angle={0.6}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        position={[0, 5, -5]}
        angle={0.6}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[84, 46, 113]}
        intensity={0.2}
        position={[0, 10, 2]}
        angle={0.3}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground/>
      <Car/>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow/>
      </Canvas>
    </Suspense>
  );
}

export default App;
