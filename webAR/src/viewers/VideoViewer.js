export function showVideo(viewer, path) {

    const playButton = document.getElementById("ogv-play-button");

    if (!/\.ogv(?:[?#]|$)/i.test(path)) {
        const video = document.createElement("video");

    video.src = path
    video.playsInline = true;
    video.controls = true;

    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "contain";


    viewer.replaceChildren(video);
    return;
}
    window.OGVLoader.base = "/ogv";

    const player = new window.OGVPlayer();
    player.src = path;
    player.className = "ogv-player";
    player.style.width = "100%";

    viewer.replaceChildren(player);

    if (!playButton) return;

    playButton.hidden = false;

    function togglePlayback() {
        if (player.paused) {
            Promise.resolve(player.play()).catch(console.error);
        } else {
            player.pause();
        }
    }

    playButton.onclick = togglePlayback;
    player.addEventListener("click", togglePlayback);

    player.addEventListener("play", () => {
        playButton.hidden = true;
    });

    player.addEventListener("pause", () => {
        playButton.hidden = false;
    });

    player.addEventListener("ended", () => {
        playButton.hidden = false;
    });
}