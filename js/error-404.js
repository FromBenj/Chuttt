export async function get404Video() {
    fetch('./error-404.html', { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            createMPage(data);
            backButton();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

async function createMPage(videoHTML) {
    const container = document.getElementById("container");
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    container.remove();
    header.remove();
    footer.remove();
    const body = document.body;
    body.innerHTML = videoHTML;
}

function backButton() {
    const button = document.getElementById('go-back');
    button.addEventListener('click', async () => {
        await navigator.clipboard.writeText("");

        window.location.href = 'index.html';
    });
}
