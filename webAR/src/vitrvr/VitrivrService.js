const search_base_url = "http://10.34.64.208:7070/api/sandbox"

export async function executeQuery(query) {
    const response = await fetch(search_base_url + "/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(query)
    });

    if (!response.ok) {
        throw Error("search failed: " + response.statusText);
    }

    return await response.json();
}