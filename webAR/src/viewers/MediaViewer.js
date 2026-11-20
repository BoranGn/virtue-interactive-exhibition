import {ModelViewer} from "./ModelViewer.js";
import {showImage} from "./ImageViewer";
import {showVideo} from "./VideoViewer";
import {showAudio} from "./AudioViewer";

export class MediaViewer{
    constructor(viewer, arViewer){
        this.viewer = viewer;
        this.modelViewer = new ModelViewer(this.viewer);
        this.arViewer = arViewer;
        this.loadVersion = 0;
    }

    async displayMedia( media, language) {
        const version = ++this.loadVersion;
        this.arViewer.disable();
        switch (media.type) {
            case "SOURCE:MESH":
                this.viewer.replaceChildren(this.modelViewer.renderer.domElement);
                this.modelViewer.resize();

                await this.modelViewer.showScene(media.path, language);
                if (version !== this.loadVersion) return;
                this.arViewer.setModel(media.path);
                break;

            case "SOURCE:IMAGE":
                showImage(this.viewer, media.path);
                break;

            case "SOURCE:VIDEO":
                showVideo(this.viewer, media.path);
                break;
            case "SOURCE:AUDIO":
                showAudio(this.viewer, media.path);
                break;
            default:
                throw new Error(`Unsupported media type: ${media.type}`);
        }
    }
}