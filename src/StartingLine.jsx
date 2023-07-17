import { useBox } from "@react-three/cannon";
import { setStartingLine } from "./Car";

const debug = true;

export function StartingLine({ position, scale }) {
    useBox(() => ({
        args: scale,
        position,
        type: 'Static',
        collisionResponse: false,
        onCollide: setStartingLine,
    }));

    return (
        debug && (
            <mesh position={position} scale={scale}>
                <boxGeometry args={scale}/>
                <meshBasicMaterial color={'blue'}/>
            </mesh>
        )
    );
}
