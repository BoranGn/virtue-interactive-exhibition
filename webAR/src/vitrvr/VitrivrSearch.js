import {executeQuery} from "./VitrivrService";

export async function searchMedia(searchText) {
            const query = createQuery(searchText);
            const response = await executeQuery(query);

            const media = [];
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

                const url = "/media/" + relativePath;

                if (seenUrls.has(url)) {
                    continue;
                }
                seenUrls.add(url);

                media.push({
                    type: type,
                    path: url
                });
                if (media.length >= 20) {
                    break;
                }
            }
            return media;
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