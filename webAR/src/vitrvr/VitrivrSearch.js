export function createTextQuery(text) {
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
                    limit: "20"
                }
            }
        },
        output: "clip"
    };
}