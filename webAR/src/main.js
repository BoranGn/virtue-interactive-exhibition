import * as THREE from 'three';
import {createCube} from "./examples/cube";

//das noch verschieben in Scene Manager
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//create a cube example
const cube = createCube();

scene.add(cube);

camera.position.z = 5;

function animate( time ) {
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );