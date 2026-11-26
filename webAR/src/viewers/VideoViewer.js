export function showVideo(viewer, path) {

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
    player.style.width = "100%";

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.textContent = "Abspielen";

    playButton.addEventListener("click", () => {
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    });

    player.addEventListener("play", () => {
        playButton.textContent = "Pause";
        container.classList.add("started");
    });

    player.addEventListener("pause", () => {
        playButton.textContent = "Abspielen";
    });

    const container = document.createElement("div");
    container.className = "ogv-video-container";

    container.append(player, playButton);
    viewer.replaceChildren(container);
}