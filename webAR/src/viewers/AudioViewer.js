export function showAudio(viewer, path) {
    const audio = document.createElement("audio");

    audio.src = path;
    audio.controls = true;

    viewer.replaceChildren(audio);
}