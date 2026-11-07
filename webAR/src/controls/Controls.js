import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


export function createControls(camera, renderer){
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enableZoom = true;
    return controls;
}