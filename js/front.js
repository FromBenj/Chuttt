function getLruPasted() {
    return new Promise((resolve) => {
        document.addEventListener(
            "paste",
            (e) => {
                const lru = e.clipboardData.getData("text/plain");
                resolve(lru);
            },
        );
    });
}

export async function getLru() {

    return await getLruPasted();
}
