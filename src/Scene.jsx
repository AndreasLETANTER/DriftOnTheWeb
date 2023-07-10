import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Track } from './Track';
import { Ground } from './Ground';
import { Car } from './Car';

export function Scene() {
    let sceneContent = null;
    const [levelIndex, setLevelIndex] = useState(0);
    const switchLevel = (value) => {
        setLevelIndex(value);
    };

    if (levelIndex === 0) {
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
                <Car switchLevel={switchLevel}/>
            </Suspense>
        );
    } else if (levelIndex === 1) {
    }
    return (sceneContent);
}
