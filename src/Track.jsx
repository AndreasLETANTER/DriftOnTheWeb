import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ColliderBox } from "./ColliderBox";
import { Ramp } from "./Ramp";
import { StartingLine } from "./StartingLine";
import { FinishLine } from "./FinishLine";
import { TrackBox } from "./TrackBox";

export function TrackColliderBoxes() {
    return (
        <>
            <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]}/>               {/* Trees Collider boxes */}
            <ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]}/>
            <ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]}/>
            
            <ColliderBox position={[-1.85,0,0.385]} scale={[0.05, 1, 0.13]}/>
            <ColliderBox position={[-1.85,0,-0.385]} scale={[0.05, 1, 0.13]}/>
            <ColliderBox position={[-2.28,0,0.385]} scale={[0.05, 1, 0.13]}/>               {/* Gates Collider boxes */}
            <ColliderBox position={[-2.28,0,-0.385]} scale={[0.05, 1, 0.13]}/>
            <ColliderBox position={[-4.39,0,1.125]} scale={[0.13, 1, 0.13]}/>
            <ColliderBox position={[-4.39,0,1.9]} scale={[0.13, 1, 0.13]}/>
            
            <ColliderBox position={[-2.86,0,-0.9]} scale={[0.35, 1, 0.35]}/>
            <ColliderBox position={[-3.33,0,-0.9]} scale={[0.35, 1, 0.35]}/>                {/* Houses Collider boxes */}
            <ColliderBox position={[0.41,0,2]} scale={[0.35, 1, 0.35]}/>
            
            <ColliderBox position={[-2.3,0,-2.76]} scale={[1.37, 1, 1.09]}/>                {/* Big House Collider box */}
            
            <ColliderBox position={[-3.08,0,0.89]} scale={[0.36, 1, 0.03]}/>
            <ColliderBox position={[-2.53,0,0.89]} scale={[0.36, 1, 0.03]}/>                {/* Sponsporships Collider boxes */}
            
            <ColliderBox position={[-4.53,0,-0.65]} scale={[0.1, 0.5, 0.1]}/>
            <ColliderBox position={[-4.15,0,-0.67]} scale={[0.1, 0.5, 0.1]}/>               {/* Signs Collider boxes */}
            <ColliderBox position={[-4.9,0,-0.58]} scale={[0.1, 0.5, 0.1]}/>
            <ColliderBox position={[-0.3,0,1]} scale={[0.1, 0.5, 0.1]}/>

            <StartingLine position={[-1.85, 0, 0]} scale={[0.1, 0.9, 0.9]}/>                {/* Starting Line */}
            <FinishLine position={[-1, 0, 0.5]} scale={[0.60, 0.8, 0.1]}/>                  {/* Finish Line */}

            <TrackBox position={[-1, 0, -2]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-1, 0, -1]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-0.15, 0, -2]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[0, 0, -2]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[1, 0, -2]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[1, 0, -1]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[1, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[0.15, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-0.85, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-1.85, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-2.85, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-3.85, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-4.85, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-5.30, 0, 0]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-5.30, 0, 1]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-5.30, 0, 1.30]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-4.30, 0, 1.30]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-3.50, 0, 1.30]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-3, 0, 1.5]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-2.5, 0, 2]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-1.5, 0, 2]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-1, 0, 1.6]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
            <TrackBox position={[-1, 0, 1]} scale={[1, 0.2, 1]}/>                    {/* Track Box */}
        </>
    );
};

export function Track() {
    const result = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/track.glb');
    const mapColor = useLoader(TextureLoader, process.env.PUBLIC_URL + '/textures/track.png');

    useEffect(() => {
        mapColor.anisotropy = 16;
    }, [mapColor]);

    let geometry = result.scene.children[0].geometry;

    useFrame(() => {
    });

    return (
        <>
            <mesh geometry={geometry}>
                <meshBasicMaterial
                    toneMapped={false}
                    map={mapColor}
                />
            </mesh>
            <Ramp/>
            <TrackColliderBoxes/>
        </>
    );
}