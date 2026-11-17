import * as THREE from "three";
import {loadModel} from "../loaders/ModelLoader";
import {SceneManager} from "../SceneManager";
import {createControls} from "../controls/Controls";

export class ModelViewer{
    constructor(viewer){
        this.viewer = viewer;
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(viewer.clientWidth, viewer.clientHeight);
        this.viewer.appendChild(this.renderer.domElement);
        this.activeScene = null;
        this.camera = new THREE.PerspectiveCamera(75, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
        this.controls= createControls(this.camera,this.renderer);
        this.sceneManager = new SceneManager(this.renderer);

        this.renderer.setAnimationLoop(() => {
            if (this.activeScene && this.renderer.domElement.isConnected) {
                this.controls.update();
                this.sceneManager.renderScene();
            }
        });


    }

    async showScene(path) {
        const scene = new THREE.Scene();

        this.activeScene = scene;
        this.sceneManager.setScene(scene, this.camera);

        console.log("Model path:", path);
        console.log("Path type:", typeof path);

        const objectModel = await loadModel(path);

        const box = new THREE.Box3().setFromObject(objectModel);
        const center  = box.getCenter(new THREE.Vector3());

        const modelGroup = new THREE.Group();
        objectModel.position.sub(center);
        modelGroup.add(objectModel);

        this.fitCamera(box);

        scene.add(modelGroup);

        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
        scene.add(light);

        this.controls.target.set(0, 0, 0);
        this.controls.update();
        this.controls.saveState();
    }

    fitCamera(box) {
        const size = box.getSize(new THREE.Vector3());
        const radius = size.length() / 2;

        const verticalFov = THREE.MathUtils.degToRad(this.camera.fov);
        const horizontalFov = 2 * Math.atan(
            Math.tan(verticalFov / 2) * this.camera.aspect
        );

        const limitingFov = Math.min(verticalFov, horizontalFov);
        const cameraDistance = radius / Math.sin(limitingFov / 2);

        this.camera.position.set(0, 0, cameraDistance * 1.2);
        this.camera.lookAt(0, 0, 0);
    }

    resize() {
        const width = this.viewer.clientWidth;
        const height = this.viewer.clientHeight;

        if (height === 0) return;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

}
