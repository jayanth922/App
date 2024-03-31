const uploadButton = document.getElementById("uploadButton");
const imageFile = document.getElementById("imageFile");
const message = document.getElementById("message");

uploadButton.addEventListener("click", async () => {
  const file = imageFile.files[0];
  if (!file) {
    message.textContent = "Please select an image file to upload.";
    return;
  }

  // Generate a unique object key for the image in S3
  const objectKey = `${Date.now()}-${file.name}`;

  // AWS configuration (replace with your credentials)
  const AWS = require("aws-sdk");
  AWS.config.update({
    region: "ap-south-1",
  });

  const s3 = new AWS.S3();

  try {
    const uploadParams = {
      Bucket: "midterm-takehome",
      Key: objectKey,
      Body: file,
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    console.log("Image uploaded successfully:", uploadResult.Location);
    message.textContent = "Image uploaded successfully! Lambda triggered for metadata processing.";
  } catch (error) {
    console.error("Upload error:", error);
    message.textContent = "Upload failed. Please check the console for details.";
  }
});

// Removed the sendMetadataToServer function as Lambda handles it now.
