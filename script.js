document.getElementById('uploadForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const file = document.getElementById('fileInput').files[0];

  try {
    // Get the presigned URL and filename from the API response
    const response = await fetch('https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url');
    const data = await response.json();
    const presignedUrl = data.uploadURL;  // Use uploadURL from the response
    const photoFilename = data.photoFilename;  // Use photoFilename from the response

    // Prepare the image data for upload
    const fd = new FormData();
    fd.append("file", file);
    fd.append('key', photoFilename);
    fd.append('Content-Type', file.type);

      // Use photoFilename as the file name

    // Upload the image using the presigned URL
    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      body: fd
    });

    if (uploadResponse.ok) {
      console.log('Image successfully uploaded');
    } else {
      console.error('Upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
});
