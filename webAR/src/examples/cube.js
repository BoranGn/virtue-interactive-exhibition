import * as THREE from 'three';

export function createCube(){
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color: 0x008080});

    return new THREE.Mesh ( geometry, material );
}

export function animateCube(cube, time ) {
    cube.rotation.x = time/2000;
    cube.rotation.y = time/2000;
}