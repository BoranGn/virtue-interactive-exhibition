import { createObjectScene } from "./ModelViewer.js";
//import { showAudio } from "./AudioViewer.js";


export async function displayMedia(media, context) {
    switch (media.type) {
        case "SOURCE:MESH":
            return await createObjectScene(
                context.camera,
                context.language,
                media.path
            );

        case "SOURCE:IMAGE":
            //return showImage(context.container, media.path);

        case "SOURCE:VIDEO":
           // return showVideo(context.container, media.path);

        case "SOURCE:AUDIO":
           // return showAudio(context.container, media.path);

        default:
           // throw new Error(`Unsupported media type: ${media.type}`);
    }
}