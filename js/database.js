// const inMemory = localStorage........
export async function getEmail() {
    // if (!inMemory) {
    //     return;
    // }
    return new Promise((resolve) => {
        const button = document.getElementById("newsletter-button");
        const userEmail = document.getElementById("user-email");
        button.addEventListener("click", () => {
            const email = userEmail.value.trim();
            userEmail.value = "";
            console.log(email);
            if (!email) {
                alert("Ooups, please enter your email");
                return;
            }
            resolve(email);
        }, {once: true});
    })
}

const email = await getEmail();

async function saveUser() {
    const newUserCode = crypto.randomUUID();
    const newUser = {
        email: email,
        userCode: newUserCode,
    };
    try {
        const response = await fetch('http://localhost:3000/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        const text = await response.text();
        console.log('Response text:', text);

        // Only parse if there's content
        if (text) {
            const data = JSON.parse(text);
            console.log('Success:', data);
        } else {
            console.log('Empty response from server');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

await saveUser();

