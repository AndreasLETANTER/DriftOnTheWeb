import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Track() {
    const result = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/models/track.glb');
    const mapColor = useLoader(TextureLoader, process.env.PUBLIC_URL + '/textures/track.png');

    useEffect(() => {
        mapColor.anisotropy = 16;
    }, [mapColor]);

    let geometry = result.scene.children[0].geometry;

    return (
        <mesh geometry={geometry}>
            <meshBasicMaterial
                toneMapped={false}
                map={mapColor}
            />
        </mesh>
    );
}