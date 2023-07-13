import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi, carSpeed) => {
    let isDrifting = false;
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
            vehicleApi.applyEngineForce(70, 0);
            vehicleApi.applyEngineForce(70, 1);
        } else if (controls.s) {
            vehicleApi.applyEngineForce(-30, 0);
            vehicleApi.applyEngineForce(-30, 1);
        } else {
            vehicleApi.applyEngineForce(0, 0);
            vehicleApi.applyEngineForce(0, 1);
        }
        if (controls.q) {
            vehicleApi.setSteeringValue(0.50, 2);
            vehicleApi.setSteeringValue(0.50, 3);
            if (carSpeed > 0.7) {
                setTimeout(() => {
                    vehicleApi.setSteeringValue(-0.80, 0);
                    vehicleApi.setSteeringValue(-0.80, 1);
                }, 10);
                chassisApi.applyLocalImpulse([0, 0, -3], [0, 0, -1]);
            }
        } else if (controls.d) {
            vehicleApi.setSteeringValue(-0.50, 2);
            vehicleApi.setSteeringValue(-0.50, 3);
            if (carSpeed > 0.7) {
                setTimeout(() => {
                    vehicleApi.setSteeringValue(0.80, 0);
                    vehicleApi.setSteeringValue(0.80, 1);
                }, 10);
                chassisApi.applyLocalImpulse([0, 0, -3], [0, 0, -1]);
            }
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
        if (controls.b) {
            vehicleApi.setBrake(1, 0);
            vehicleApi.setBrake(1, 1);
            vehicleApi.setBrake(1, 2);
            vehicleApi.setBrake(1, 3);
        } else {
            vehicleApi.setBrake(0, 0);
            vehicleApi.setBrake(0, 1);
            vehicleApi.setBrake(0, 2);
            vehicleApi.setBrake(0, 3);
        }
    }, [controls, vehicleApi, chassisApi, carSpeed]);
    if (carSpeed > 0.7 && (controls.q || controls.d)) {
        isDrifting = true;
    }
    return isDrifting;
};
