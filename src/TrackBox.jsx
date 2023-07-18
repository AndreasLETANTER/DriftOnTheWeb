import { useBox } from "@react-three/cannon";
import { setCarOnTrack, setCarNotOnTrack } from "./Car";

const debug = true;

export function TrackBox({ position, scale }) {

    useBox(() => ({
        args: scale,
        position,
        type: 'Static',
        collisionResponse: false,
        onCollideEnd: setCarNotOnTrack,
        onCollideBegin: setCarOnTrack,
        onCollide: setCarOnTrack,

    }));

    return (
        debug && (
            <mesh position={position} scale={scale}>
                <boxGeometry args={scale}/>
                <meshBasicMaterial color={'purple'}/>
            </mesh>
        )
    );
}
