export async function executeQuery(query) {
    const response = await fetch("/api/sandbox/query", {
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