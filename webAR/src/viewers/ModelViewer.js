import * as THREE from "three";
import {loadModel} from "../loaders/ModelLoader";
import {RoomEnvironment} from "three/addons/environments/RoomEnvironment.js";
import {SceneManager} from "../SceneManager";
import {createControls} from "../controls/Controls";

export class ModelViewer{
    constructor(viewer){
        this.viewer = viewer;
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.8;
        this.renderer.setSize(viewer.clientWidth || 1 , viewer.clientHeight || 1);
        this.viewer.appendChild(this.renderer.domElement);

        this.activeScene = null;
        this.modelGroup = null;

        this.camera = new THREE.PerspectiveCamera(75, (viewer.clientWidth || 1) / (viewer.clientHeight || 1), 0.1, 1000);
        this.controls= createControls(this.camera,this.renderer);
        this.sceneManager = new SceneManager(this.renderer);

        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

        this.environmentMap = pmremGenerator.fromScene(
            new RoomEnvironment()
        ).texture;

        pmremGenerator.dispose();

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        let pointerStart = null;

        this.renderer.domElement.addEventListener("pointerdown", (event) => {
            pointerStart = {
                x: event.clientX,
                y: event.clientY
            };
        });

        this.renderer.domElement.addEventListener("pointerup", (event) => {
            if (!pointerStart) return;

            const distance = Math.hypot(
                event.clientX - pointerStart.x,
                event.clientY - pointerStart.y
            );

            pointerStart = null;

            // Ignore dragging or rotating the model
            if (distance > 5) return;

            this.checkModelClick(event);
        });

        this.renderer.domElement.addEventListener("pointercancel", () => {
            pointerStart = null;
        });

        this.renderer.setAnimationLoop(() => {
            if (this.activeScene && this.renderer.domElement.isConnected) {
                this.controls.update();
                this.sceneManager.renderScene();
            }
        });


    }

    async showScene(path) {
        const scene = new THREE.Scene();


        scene.environment = this.environmentMap;
        scene.environmentIntensity = 0.5;

        this.modelGroup = null;
        this.activeScene = scene;
        this.sceneManager.setScene(scene, this.camera);

        const objectModel = await loadModel(path);

        const box = new THREE.Box3().setFromObject(objectModel);
        const center  = box.getCenter(new THREE.Vector3());

        const modelGroup = new THREE.Group();
        objectModel.position.sub(center);
        modelGroup.add(objectModel);

        this.modelGroup = modelGroup;

        this.fitCamera(box);

        scene.add(modelGroup);



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
    checkModelClick(event) {
        if (!this.modelGroup) return;

        const rect = this.renderer.domElement.getBoundingClientRect();

        this.pointer.x =
            ((event.clientX - rect.left) / rect.width) * 2 - 1;

        this.pointer.y =
            -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.camera);

        const intersects = this.raycaster.intersectObjects(
            this.modelGroup.children,
            true
        );

        if (intersects.length > 0) {
            this.viewer.dispatchEvent(new CustomEvent("model-tap"));
        }
    }

}
