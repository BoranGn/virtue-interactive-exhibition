import * as THREE from 'three';
import scene from "three/addons/offscreen/scene";

export function createCube(){
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

    return THREE.Mesh ( geometry, material );
}