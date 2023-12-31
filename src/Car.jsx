import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';
import { useWheels } from './useWheels';
import { WheelDebug } from './WheelDebug';
import { useControls } from './useControls';
import { MathUtils } from 'three';
import { PositionalAudio } from '@react-three/drei';

let isDrifting = false;
let isCarOnTrack = true;
let carOffTrackOffset = 0;
let score = 0;
let bestScore = 0;
let collided = false;
let collisionEvent = undefined;
let gameStarted = false;
let currentTime = 0;
let bestTime = 0;
let lastScore = 0;
let lastTime = 0;

function HandleCollision(collisionEvent, carSpeed) {
    const crashSound = useRef(null);;

    useFrame(() => {
        if (collided === true && collisionEvent !== undefined) {
            crashSound.current.stop()
            crashSound.current.setVolume(1.5 * (collisionEvent.carSpeed));
            crashSound.current.play();
            score = 0;
            collisionEvent = undefined;
            collided = false;
        }
    }, []);
    return (
        <>
            <PositionalAudio
                url={process.env.PUBLIC_URL + '/sounds/crash.mp3'}
                ref={crashSound}
                distance={1}
                loop={false}
                autoplay={false}
            />
        </>
    );
}

export const setCollision = (e) => {
    collisionEvent = e;
    collided = true;
};

export const setStartingLine = (e) => {
    if (gameStarted === false) {
        score = 0;
        currentTime = 0;
        gameStarted = true;
    }
};

export const setFinishLine = (e) => {
    if (gameStarted === true) {
        if (score > bestScore || (score === bestScore && currentTime < bestTime)) {
            bestScore = score;
            bestTime = currentTime;
        }
        lastScore = score;
        lastTime = currentTime;
        score = 0;
        currentTime = 0;
        gameStarted = false;
    }
};

export const setCarOnTrack = (e) => {
    if (gameStarted === true) {
        isCarOnTrack = true;
    }
};

export const setCarNotOnTrack = (e) => {
    if (gameStarted === true) {
        setTimeout(() => {
            isCarOnTrack = false;
        }, 500);
    }
};

const resetGame = () => {
    score = 0;
    currentTime = 0;
    gameStarted = false;
    isCarOnTrack = true;
};

function CarSound(carSpeed) {
    const accelerationSound = useRef(null);
    const engineSound = useRef(null);
    const gears = 8;
    let rpmTarget = 0;
    const gearPosition = carSpeed.carSpeed / (3 / gears);

    useFrame(() => {
        engineSound.current.setVolume(0.4);
        engineSound.current.setPlaybackRate(1);
        if (collided === true) {
            accelerationSound.current.setVolume(0);
        } else {
            accelerationSound.current.setVolume((carSpeed.carSpeed / 7) * 2);
        }
        rpmTarget = ((gearPosition % 1) + Math.log(gearPosition)) / 3;
        if (rpmTarget < 0) {
            rpmTarget = 0;
        } 
        accelerationSound.current.setPlaybackRate(MathUtils.lerp(accelerationSound.current.playbackRate, rpmTarget + 2, 0));
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
            <PositionalAudio
                ref={accelerationSound}
                url={process.env.PUBLIC_URL + '/sounds/accelerate.mp3'}
                autoplay={true}
                loop={true}
                distance={5}
            />
        </>
    );
}

function DriftSound(isDrifting) {
    const driftSound = useRef(null);

    useFrame(() => {
        if (isDrifting.isDrifting === true && driftSound.current.isPlaying === false) {
            driftSound.current.setVolume(1);
            driftSound.current.setPlaybackRate(1);
            driftSound.current.play();
        } else {
            if (collided === true) {
                driftSound.current.setVolume(0);
            } else {
                setTimeout(() => {
                    driftSound.current.setVolume(0);
                }, 300000);
            }
        }
    });
    return (
        <>
            <PositionalAudio
                ref={driftSound}
                url={process.env.PUBLIC_URL + '/sounds/drift.mp3'}
                autoplay={false}
                loop={false}
                distance={5}
            />
        </>
    );
}

export function Car() {
    let mesh = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/car.glb').scene;
    const position = [-2.2, 0.3, 0];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;
    const chassisBodyArgs = [width, height, front * 2];
    const currentCarSpeed = useRef(0);
    const [onNitro, setNitro] = useState(false);

    const [chassisBody, chassiApi] = useBox(
        () => ({
            mass: 200,
            args: chassisBodyArgs,
            position,
            rotation: [0, -Math.PI / 2, 0],
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

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius, currentCarSpeed.current);
    const [vehicle, vehicleApi] = useRaycastVehicle(
        () => ({
            chassisBody,
            wheels,
            wheelInfos,
        }),
        useRef(null),
    );
    isDrifting = useControls(vehicleApi, chassiApi, currentCarSpeed.current, setNitro, resetGame);

    if (chassisBody.current) {
        if (isDrifting && gameStarted && isCarOnTrack) {
            score += 1000;
        }
    }

    useEffect(() => {
        mesh.scale.set(0.0012, 0.0012, 0.0012);
        mesh.children[0].position.set(-365, -18, -67);
    }, [mesh]);

    useEffect(() => {
        setInterval(() => {
            if (gameStarted === true) {
                currentTime += 1;
            }
        }, 1000);
    }, []);
    return (
        <group ref={vehicle} name='vehicle'>
            <group ref={chassisBody}  name='chassisBody'>
                <primitive object={mesh} rotation-y={Math.PI} position={[0, -0.09, 0]}/>
            </group>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[0]}/>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[1]}/>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[2]}/>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[3]}/>
            <CarSound carSpeed={currentCarSpeed.current}/>
            <DriftSound isDrifting={isDrifting}/>
            <HandleCollision collisionEvent={collisionEvent} carSpeed={currentCarSpeed.current}/>
            <Html className='bestscore-ui' position={[0.5, -8.6, 0]}>
                <div className="bestscore-text">
                    <span style={{ color: 'white', fontSize: '2em' }}>LastScore: {lastScore}/{lastTime}</span>
                    <span style={{ color: 'white', fontSize: '2em' }}>HighScore: {bestScore}/{bestTime}</span>
                </div>
            </Html>
            <Html className='game-text' position={[-2.5, -6.6, 0]}>
                <div className="score-text">
                    <span style={{ color: onNitro === true ? 'red' : 'white', fontSize: '2em' }}>Score: {score} | {Math.round(currentCarSpeed.current * 20)} km/h | Time: {currentTime}</span>
                </div>
            </Html>
        </group>
    );
}
