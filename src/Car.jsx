import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import { useWheels } from './useWheels';
import { WheelDebug } from './WheelDebug';
import { useControls } from './useControls';
import { Vector3, Quaternion } from 'three';
import { PositionalAudio } from '@react-three/drei';

let score = 0;

const handleCollision = (e) => {
    console.log("Collision occurred:", e);
    score = 0;
};

function CarSound(carSpeed) {
    // const accelerationSound = useRef<PositionalAudio>(null);
    const engineSound = useRef(null)

    useFrame(() => {
        engineSound.current.setVolume(1);
        engineSound.current.setPlaybackRate(1);
    });
    return (
        <>
            <PositionalAudio
                ref={engineSound}
                url={process.env.PUBLIC_URL + '/sounds/engine.mp3'}
                autoplay={true}
                loop={true}
                distance={5}
            />
        </>
    );
}

export function Car() {
    let mesh = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/car.glb').scene;
    const position = [-1.5, 0.5, 3];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;
    const chassisBodyArgs = [width, height, front * 2];
    const currentCarSpeed = useRef(0);
    let lastCarRotation = new Quaternion(0, 0, 0, 0);

    const [chassisBody, chassiApi] = useBox(
        () => ({
            mass: 150,
            args: chassisBodyArgs,
            position,
            onCollide: handleCollision,
        }),
        useRef(null),
    );
    useEffect(() => {
        let unsubscribe = null;

        if (chassiApi && chassisBody) {
            unsubscribe = chassiApi.velocity.subscribe((velocity) => {
                if (velocity) {
                    currentCarSpeed.current = Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2 + velocity[2] ** 2);
                }
            });
        }
        return () => {
            unsubscribe();
        }
    });

    useFrame(() => {
        if (chassisBody.current) {
            let carPosition = new Vector3(0, 0, 0);
            let isDrifting = false;
            let carRotation = new Quaternion(0, 0, 0, 0);

            let differenceRotation = new Quaternion(0, 0, 0, 0);

            carPosition.setFromMatrixPosition(chassisBody.current.matrix);
            carRotation.setFromRotationMatrix(chassisBody.current.matrix);
            differenceRotation.x = Math.abs(carRotation.x - lastCarRotation.x);
            differenceRotation.y = Math.abs(carRotation.y - lastCarRotation.y);
            differenceRotation.z = Math.abs(carRotation.z - lastCarRotation.z);
            if ((differenceRotation.x > 0.5 || differenceRotation.y > 0.5 || differenceRotation.z > 0.5) && currentCarSpeed.current > 0.5) {
                isDrifting = true;
            }
            if (isDrifting) {
                score += 1000;
            }
            lastCarRotation = carRotation;
        }
    });

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
            <CarSound carSpeed={currentCarSpeed.current} />
            <Html position={[-2.5, -7, 0]}>
                <div style={{ color: 'white', fontSize: '2em' }} className="speed-text">
                    <span>{score}</span>
                </div>
            </Html>
        </group>
    );
}
