import {ModelViewer} from "./ModelViewer.js";
import {showImage} from "./ImageViewer";
import {showVideo} from "./VideoViewer";
import {showAudio} from "./AudioViewer";

export class MediaViewer{
    constructor(viewer){
        this.viewer = viewer;
        this.modelViewer = new ModelViewer(this.viewer);
    }

    async displayMedia( media, language) {
        switch (media.type) {
            case "SOURCE:MESH":
                this.viewer.replaceChildren(this.modelViewer.renderer.domElement);
                this.modelViewer.resize();

                await this.modelViewer.showScene(media.path, language);
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