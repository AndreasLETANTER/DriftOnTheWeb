import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useWheels } from './useWheels';
import { WheelDebug } from './WheelDebug';
import { useControls } from './useControls';

export function Car() {
    let mesh = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/car.glb').scene;
    const position = [-1.5, 0.5, 3];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;
    const chassisBodyArgs = [width, height, front * 2];

    const [chassisBody, chassiApi] = useBox(
        () => ({
            mass: 150,
            args: chassisBodyArgs,
            position,
        }),
        useRef(null),
    );

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
    const [vehicle, vehicleApi] = useRaycastVehicle(
        () => ({
            chassisBody,
            wheels,
            wheelInfos,
        }),
        useRef(null),
    );

    useControls(vehicleApi, chassiApi);

    useEffect(() => {
        mesh.scale.set(0.0012, 0.0012, 0.0012);
        mesh.children[0].position.set(-365, -18, -67);
    }, [mesh]);

    return (
        <group ref={vehicle} name='vehicle'>
            <group ref={chassisBody}  name='chassisBody'>
                <primitive object={mesh} rotation-y={Math.PI} position={[0, -0.09, 0]}/>
            </group>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[0]}/>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[1]}/>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[2]}/>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[3]}/>
        </group>
    );
}
