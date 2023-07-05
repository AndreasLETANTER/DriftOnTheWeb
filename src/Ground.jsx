import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Ground() {
    const gridMap = useLoader(TextureLoader, process.env.PUBLIC_URL + '/textures/ground-grid.png');
    const aoMap = useLoader(TextureLoader, process.env.PUBLIC_URL + '/textures/ground-ao.png');
    const alpaMap = useLoader(TextureLoader, process.env.PUBLIC_URL + '/textures/ground-alpha.png');

    useEffect(() => {
        gridMap.anisotropy = 16;
        aoMap.anisotropy = 16;
        alpaMap.anisotropy = 16;
    }, [gridMap, aoMap, alpaMap]);

    const meshRef = useRef(null);
    useEffect(() => {
        var uvs = meshRef.current.geometry.attributes.uv.array;
        meshRef.current.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2));
    }, [meshRef]);
    return (
        <>
            <mesh ref={meshRef} position={[-2.285, -0.015, -1.325]} rotation-x={-Math.PI / 2}rotation-z={-0.079}>
                <circleGeometry args={[6.12, 50]}/>
                <MeshReflectorMaterial
                    aoMap={aoMap}
                    alphaMap={alpaMap}
                    transparent={true}
                    color={[0.5, 0.5, 0.5]}
                    envMapIntensity={0.35}
                    metalness={0.05}
                    roughness={0.4}
                    dithering={true}
                    blur={[1024, 512]}
                    mixBlur={3}
                    mixStrength={30}
                    mixContrast={1}
                    resolution={1024}
                    mirror={0}
                    depthScale={0}
                    minDepthThreshold={0.9}
                    maxDepthThreshold={1}
                    depthToBlurRatioBias={0.25}
                    debug={0}
                    reflectorOffset={0.02}
                />
            </mesh>
        </>
    );
}
