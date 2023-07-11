import { useEffect, useState } from "react";

export const useLevelControls = ( { switchLevel }, currentLevel ) => {
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
        if (controls['1']) {
            switchLevel(0);
        } else if (controls['2']) {
            switchLevel(1);
        }
    }, [controls, switchLevel]);
    return controls;
};
