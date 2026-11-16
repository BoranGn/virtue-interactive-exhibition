import {executeQuery} from "./VitrivrService";
import {setUpExplore} from "../ui/Explore";

export function setUpSearch(mediaViewer, languageSelect) {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', async () => {
        const searchText = searchInput.value.trim();

        if(!searchText){
            return;
        }
        try {
            const query = createQuery(searchText);
            const response = await executeQuery(query);

            const mediaItems = [];
            const seenUrls = new Set();

            for (const result of response.retrievables) {
                let type = result.type;
                let path = result.descriptors["file.path"];

                if (type === "SEGMENT") {
                    const parent = result.relationship?.partOf;
                    if (!parent) {
                        continue;
                    }
                    type = parent.type;
                    path = parent.descriptors["file.path"];
                }
                if (!path) {
                    continue;
                }
                const relativePath = path.split("/sandbox/media/")[1];

                if (!relativePath) {
                    continue;
                }
                const url = "http://10.34.64.208:9090/" + relativePath;
                if (seenUrls.has(url)) {
                    continue;
                }
                seenUrls.add(url);

                mediaItems.push({
                    type: type,
                    path: url
                });
                if (mediaItems.length >= 20) {
                    break;
                }
            }
            console.log("Search results:", mediaItems);

        } catch (error) {
            console.error("Search failed:", error);
        }
        setUpExplore(mediaViewer, languageSelect);


    });
}

function createQuery(text) {
    return {
        inputs: {
            txt: {
                type: "TEXT",
                data: text
            }
        },
        operations: {
            clip: {
                field: "clip",
                inputs: {
                    txt: "txt"
                },
                parameters: {
                    limit: "50"
                }
            },
            relations: {
                factory: "RelationExpander",
                inputs: {
                    in: "clip"
                },
                parameters: {
                    outgoing: "partOf"
                }
            },
            filelookup: {
                factory: "FieldLookup",
                inputs: {
                    in: "relations"
                },
                parameters: {
                    field: "file",
                    keys: "path"
                }
            },
            parentlookup: {
                factory: "ObjectFieldLookup",
                inputs: {
                    in: "filelookup"
                },
                parameters: {
                    field: "file",
                    predicates: "partOf",
                    keys: "path"
                }
            }
        },
        output: "parentlookup"
    };
}