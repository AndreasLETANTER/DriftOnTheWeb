import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { Track } from './Track';
import { Ground } from './Ground';
import { Car } from './Car';

const GameInfo = {
    score: 0,
    speed: 0,
    levelIndex: 0,
};

export function Scene() {
    let sceneContent = null;

    if (GameInfo.levelIndex === 0) {
        sceneContent = (
            <Suspense fallback={null}>
            <Environment
                files={process.env.PUBLIC_URL + '/textures/envmap.hdr'}
                background={"both"}
            />
            <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={50} />
            <OrbitControls target={[-2.64, -0.71, 0.03]}/>

            <Track/>
            <Ground/>
            <Car/>
        </Suspense>
        );
    } else if (GameInfo.levelIndex === 1) {
    }
    return (sceneContent);
}
