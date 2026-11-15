import {ModelViewer} from "./ModelViewer.js";
import {showImage} from "./ImageViewer";

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
            await showImage(this.viewer, media.path);
            break;

            case "SOURCE:VIDEO":
            // return showVideo(context.container, media.path);

            case "SOURCE:AUDIO":
            // return showAudio(context.container, media.path);

            default:
            // throw new Error(`Unsupported media type: ${media.type}`);
        }
    }
}