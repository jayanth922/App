// Function to send API request to Lambda function
async function sendRequest() {
  try {
    // Send request to Lambda function
    const response = await fetch('https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url');
    const data = await response.json();

    // Extract uploadURL and photoFilename from the response
    const { uploadURL, photoFilename } = data;

    // Create a FormData object to hold the file and its name
    const formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0], photoFilename);

    // Send PUT request to uploadURL with the file
    const uploadResponse = await fetch(uploadURL, {
      method: 'PUT',
      body: formData.get('file')
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
