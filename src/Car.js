import React, { useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

export function Car() {
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + 'models/car/scene.gltf');

    useEffect(() => {
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.envMapIntensity = 20;
            }
        });
    }, [gltf]);
    useFrame((state, delta) => {
        let time = 1;
        let speed = 1;
        let group = gltf.scene.children[0].children[0].children[0];

        group.children[1].rotateX(time * speed); // left front rim
        group.children[2].rotateX(time * speed); // left front wheel
        group.children[5].rotateX(time * speed); // right front rim
        group.children[6].rotateX(time * speed); // right front wheel
        group.children[9].rotateX(time * speed); // left back rim 
        group.children[10].rotateX(time * speed); // left back wheel
        group.children[13].rotateX(time * speed); // right back rim
        group.children[14].rotateX(time * speed); // right back wheel
    });
    return <primitive object={gltf.scene} />;
}
