document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('https://hp9nidyl84.execute-api.ap-south-1.amazonaws.com/dev', {
            method: 'POST',
            body: formData
        });

        const metadata = await response.json();
        document.getElementById('metadata').innerText = JSON.stringify(metadata, null, 2);
    } catch (err) {
        console.error(err);
    }
});
