import { useCylinder } from "@react-three/cannon";

const debug = true;

export function ColliderCylinder({ position, height, radius }) {
    useCylinder(() => ({ args: [radius, radius, height, 16], position, type: 'Static'}));

    return (
        debug && (
            <mesh position={position} rotateOnAxis={[1, 0, 0]}>
                <torusGeometry args={[radius, 0.015, 16, 100]}/>
                <meshBasicMaterial color={'red'}/>
            </mesh>
        )
    );
}
