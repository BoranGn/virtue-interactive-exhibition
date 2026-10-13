import {animateCube, createCube} from "../examples/cube";
import * as THREE from 'three';

export function createCubeScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const cube = createCube();
    scene.add(cube);
    camera.position.z = 5;

    function update(time) {
        animateCube(cube, time);
    }

    return { scene, camera, update };
}

