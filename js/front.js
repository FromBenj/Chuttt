let initialLru = null;

async function getLruPasted() {
    return new Promise((resolve, reject) => {
        document.addEventListener(
            "paste",
            (e) => {
                const lru = e.clipboardData.getData("text/plain");
                if (new URL(lru)) {
                    resolve(lru);
                } else {
                    reject(new Error("Invalid LRU"));
                }
            },{once: true}
        )
    });
}

export async function getInialLru() {
    try {
        initialLru = await getLruPasted();
        return initialLru;
    } catch (error) {
        console.error(error);
        return null;
    }
}
