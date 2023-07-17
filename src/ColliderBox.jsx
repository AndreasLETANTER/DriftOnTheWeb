import { useBox } from "@react-three/cannon";
import { setCollision } from "./Car";

const debug = false;

export function ColliderBox({ position, scale }) {
    useBox(() => ({
        args: scale,
        position,
        type: 'Static',
        onCollide: setCollision,
    }));

    return (
        debug && (
            <mesh position={position} scale={scale}>
                <boxGeometry args={scale}/>
                <meshBasicMaterial color={'red'}/>
            </mesh>
        )
    );
}
