export async function showImage(viewer, path) {
    const image = document.createElement("img");

    image.src = path;
    image.alt = "Exhibition image";

    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "contain";

    viewer.replaceChildren(image);
}