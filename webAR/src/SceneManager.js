export class SceneManager {
    constructor(renderer) {
        this.renderer = renderer;
        this.camera = null;
        this.activeScene = null;
    }


    setScene(scene, camera) {
        this.activeScene = scene;
        this.camera = camera;
    }

    renderScene() {
        if (this.activeScene && this.camera) {
            this.renderer.render(this.activeScene, this.camera);
        }
    }
}