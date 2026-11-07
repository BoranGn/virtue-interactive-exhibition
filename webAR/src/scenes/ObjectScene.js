import {loadModel} from "../loaders/ModelLoader";
import * as THREE from "three";

export async function createObjectScene(object) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const objectModel = await loadModel(object.path);

    const box = new THREE.Box3().setFromObject(objectModel);
    const center  = box.getCenter(new THREE.Vector3());

    const modelGroup = new THREE.Group();
    objectModel.position.sub(center);
    modelGroup.add(objectModel);

    fitCamera(box,camera);

    scene.add(modelGroup);

    function update(time) {
        modelGroup.rotation.y = time / 2000;
    }

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
    scene.add(light);


    return { scene, camera, update };
}

function fitCamera(box,camera) {
    const size = box.getSize(new THREE.Vector3());

    const radius = size.length() / 2;

    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(
        Math.tan(verticalFov / 2) * camera.aspect
    );

    const limitingFov = Math.min(verticalFov, horizontalFov);
    const cameraDistance = radius / Math.sin(limitingFov / 2);

    camera.position.set(0, 0, cameraDistance * 1.2);
    camera.lookAt(0, 0, 0);
}
