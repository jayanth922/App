document.getElementById('submit').addEventListener('click', async function() {
  try {
    // Step 1: Send request to your endpoint to get pre-signed URL and filename
    const response = await fetch('https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url');
    if (!response.ok) {
      throw new Error('Failed to fetch pre-signed URL');
    }
    const { url, filename } = await response.json();

    // Step 2: Upload image to S3 using pre-signed URL
    const file = document.getElementById('file-input').files[0];
    const s3Response = await fetch(url, {
      method: 'PUT',
      body: file
    });
    if (!s3Response.ok) {
      throw new Error('Failed to upload image to S3');
    }

    console.log('Image uploaded successfully:', filename);
  } catch (error) {
    console.error('Error:', error);
  }
});
