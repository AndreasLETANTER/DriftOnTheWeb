import { useCompoundBody } from '@react-three/cannon'
import { useRef } from 'react'

export const useWheels = (width, height, front, radius, carSpeed) => {
    const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)]
    console.log(carSpeed)
    const wheelInfo = {
        radius,
        directionLocal: [0, -1, 0],
        axleLocal: [1, 0, 0],
        suspensionStiffness: 60,
        suspensionRestLength: 0.1,
        frictionSlip: carSpeed > 0.5 ? 0.3 : 1,                  // if speed is not high enough, need to set this value to 1
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        RollInfluence: 0.01,
        maxSuspensionTravel: 0.1,
        customSlidingRotationalSpeed: -30,
        useCustomSlidingRotationalSpeed: true,
    };
    const backWheelInfo = {
        radius,
        directionLocal: [0, -1, 0],
        axleLocal: [1, 0, 0],
        suspensionStiffness: 100,
        suspensionRestLength: 0.1,
        frictionSlip: carSpeed > 0.5 ? 0.8 : 1,                  // if speed is not high enough, need to set this value to 1
        dampingRelaxation: 2.3,
        dampingCompression: 4.4,
        maxSuspensionForce: 100000,
        RollInfluence: 0.2,
        maxSuspensionTravel: 0.1,
        customSlidingRotationalSpeed: -300,
        useCustomSlidingRotationalSpeed: true,
    };

    const wheelInfos = [
        {
            ...backWheelInfo,
            chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
            isFrontWheel: false,
        },
        {
            ...backWheelInfo,
            chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
            isFrontWheel: false,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
            isFrontWheel: true,
        },
        {
            ...wheelInfo,
            chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
            isFrontWheel: true,
        },
    ];

    const propsFunc = () => ({
        collisionFilterGroup: 0,
        mass: 1,
        shapes: [
            {
                args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
                rotation: [0, 0, -Math.PI / 2],
                type: 'Cylinder',
            },
        ],
        type: 'Kinematic',
    });
    useCompoundBody(propsFunc, wheels[0]);
    useCompoundBody(propsFunc, wheels[1]);
    useCompoundBody(propsFunc, wheels[2]);
    useCompoundBody(propsFunc, wheels[3]);
    return [wheels, wheelInfos];
};
