import { useEffect, useState } from "react";

let nbDrift = 0;

export const useControls = (vehicleApi, chassisApi, carSpeed, setNitro, resetGame) => {
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
                chassisApi.applyLocalImpulse([0, 0, -1 + (carSpeed * -1)], [0, 0, -1]);
            }
        } else if (controls.d) {
            vehicleApi.setSteeringValue(-0.50, 2);
            vehicleApi.setSteeringValue(-0.50, 3);
            if (carSpeed > 0.7) {
                setTimeout(() => {
                    vehicleApi.setSteeringValue(0.80, 0);
                    vehicleApi.setSteeringValue(0.80, 1);
                }, 10);
                chassisApi.applyLocalImpulse([0, 0,  -1 + (carSpeed * -1)], [0, 0, -1]);
            }
        } else {
            vehicleApi.setSteeringValue(0, 2);
            vehicleApi.setSteeringValue(0, 3);
            vehicleApi.setSteeringValue(0, 0);
            vehicleApi.setSteeringValue(0, 1);
        }
        if (controls.r) {
            chassisApi.position.set(-2.2, 0.3, 0);
            chassisApi.velocity.set(0, 0, 0);
            chassisApi.angularVelocity.set(0, 0, 0);
            chassisApi.rotation.set(0, -Math.PI / 2, 0);
            resetGame();
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
        if (controls.n) {
            vehicleApi.applyEngineForce(300, 0);
            vehicleApi.applyEngineForce(300, 1);
            setNitro(true);
        } else {
            setNitro(false);
        }
    }, [controls, vehicleApi, chassisApi, carSpeed, setNitro, resetGame]);
    if (nbDrift === 2 && carSpeed > 0.7) {
        isDrifting = true;
        nbDrift = 0;
    }
    if (carSpeed > 0.7 && (controls.q || controls.d)) {
        nbDrift += 1;
    } else {
        nbDrift = 0;
    }
    return isDrifting;
};
