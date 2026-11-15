export function showVideo(viewer, path) {
    const video = document.createElement("video");

    video.src = path;
    video.controls = true;

    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain";

    viewer.replaceChildren(video);
}