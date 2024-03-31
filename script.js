document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const file = document.getElementById('fileInput').files[0];
    const fileName = file.name;
    // Call your API to get the presigned URL
    fetch('https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url')
        .then(response => response.json())
        .then(data => {
            const presignedUrl = data.url;
            console.log(presignedUrl);
            console.log(file);
            console.log(file.type);
            fetch(presignedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': 'image/jpg'
                }
            })
            .then(uploadResponse => {
                if (uploadResponse.ok) {
                    console.log('Image successfully uploaded');
                } else {
                    console.error('Upload failed');
                }
            })
            .catch(error => console.error('Error uploading image:', error));
        })
        .catch(error => console.error('Error getting presigned URL:', error));
});