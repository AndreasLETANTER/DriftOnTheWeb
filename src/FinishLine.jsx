import { useBox } from "@react-three/cannon";
import { setFinishLine } from "./Car";

const debug = true;

export function FinishLine({ position, scale }) {
    useBox(() => ({
        args: scale,
        position,
        type: 'Static',
        collisionResponse: false,
        onCollide: setFinishLine,
    }));

    return (
        debug && (
            <mesh position={position} scale={scale}>
                <boxGeometry args={scale}/>
                <meshBasicMaterial color={'yellow'}/>
            </mesh>
        )
    );
}
