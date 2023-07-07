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
            vehicleApi.applyEngineForce(200, 2);
            vehicleApi.applyEngineForce(200, 3);
        } else if (controls.s) {
            vehicleApi.applyEngineForce(-100, 2);
            vehicleApi.applyEngineForce(-100, 3);
        } else {
            vehicleApi.applyEngineForce(0, 2);
            vehicleApi.applyEngineForce(0, 3);
        }
        if (controls.q) {
            vehicleApi.setSteeringValue(0.35, 2);
            vehicleApi.setSteeringValue(0.35, 3);
            vehicleApi.setSteeringValue(-0.1, 0);
            vehicleApi.setSteeringValue(-0.1, 1);
        } else if (controls.d) {
            vehicleApi.setSteeringValue(-0.35, 2);
            vehicleApi.setSteeringValue(-0.35, 3);
            vehicleApi.setSteeringValue(0.1, 0);
            vehicleApi.setSteeringValue(0.1, 1);
        } else {
            vehicleApi.setSteeringValue(0, 2);
            vehicleApi.setSteeringValue(0, 3);
            vehicleApi.setSteeringValue(0, 0);
            vehicleApi.setSteeringValue(0, 1);
        }
    }, [controls, vehicleApi, chassisApi]);
    return controls;
};
