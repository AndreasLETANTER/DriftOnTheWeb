import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
    let [controls, setControls] = useState({
    });

    useEffect(() => {
        const keyDownPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: true,
            }));
        }
        const keyUpPressHandler = (e) => {
            setControls((controls) => ({
                ...controls,
                [e.key.toLowerCase()]: false,
            }));
        }

        window.addEventListener('keydown', keyDownPressHandler);
        window.addEventListener('keyup', keyUpPressHandler);
        return () => {
            window.removeEventListener('keydown', keyDownPressHandler);
            window.removeEventListener('keyup', keyUpPressHandler);
        };
    }, []);

    useEffect(() => {
        if (controls.z) {
            vehicleApi.applyEngineForce(100, 0);
            vehicleApi.applyEngineForce(100, 1);
        } else if (controls.s) {
            vehicleApi.applyEngineForce(-75, 0);
            vehicleApi.applyEngineForce(-75, 1);
        } else {
            vehicleApi.applyEngineForce(0, 0);
            vehicleApi.applyEngineForce(0, 1);
        }
        if (controls.q) {
            vehicleApi.setSteeringValue(0.50, 2);
            vehicleApi.setSteeringValue(0.50, 3);
            setTimeout(() => {
                vehicleApi.setSteeringValue(-0.80, 0);
                vehicleApi.setSteeringValue(-0.80, 1);
            }, 10);
            chassisApi.applyLocalImpulse([0, 0, -10], [0, 0, -1]);
        } else if (controls.d) {
            vehicleApi.setSteeringValue(-0.50, 2);
            vehicleApi.setSteeringValue(-0.50, 3);
            setTimeout(() => {
                vehicleApi.setSteeringValue(0.80, 0);
                vehicleApi.setSteeringValue(0.80, 1);
            }, 10);
            chassisApi.applyLocalImpulse([0, 0, -10], [0, 0, -1]);
        } else {
            vehicleApi.setSteeringValue(0, 2);
            vehicleApi.setSteeringValue(0, 3);
            vehicleApi.setSteeringValue(0, 0);
            vehicleApi.setSteeringValue(0, 1);
        }
        if (controls.r) {
            chassisApi.position.set(-1.5, 0.5, 3);
            chassisApi.velocity.set(0, 0, 0);
            chassisApi.angularVelocity.set(0, 0, 0);
            chassisApi.rotation.set(0, 0, 0);
        }
    }, [controls, vehicleApi, chassisApi]);
    return controls;
};
