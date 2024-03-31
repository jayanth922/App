// Function to send API request to Lambda function
async function sendRequest() {
  try {
    // Send request to Lambda function to get pre-signed URL
    const response = await fetch('https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url');
    const responseBody = await response.json();

    // Logging to check the structure of the response body
    console.log('API Response Body:', responseBody);

    // Extract uploadURL and photoFilename from the response
    const { uploadURL, photoFilename } = responseBody;
    console.log(uploadURL);
    console.log(photoFilename);

    // Check if uploadURL is undefined
    if (!uploadURL) {
      console.error('Upload URL is undefined');
      return;
    }

    // Get the file selected by the user
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Upload the file to S3 using the pre-signed URL
    const uploadResponse = await fetch(uploadURL, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type // Set the correct Content-Type header
      },
      body: file
    });

    if (uploadResponse.ok) {
      console.log('File uploaded successfully');
    } else {
      console.error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Event listener for the button click
document.getElementById('submit').addEventListener('click', sendRequest);


