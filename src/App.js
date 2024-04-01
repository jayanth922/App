import React, { useState } from 'react';
import { S3 } from 'aws-sdk'; // Import S3 from AWS SDK
import awsconfig from './aws-exports';

const s3 = new S3({
  accessKeyId: awsconfig.aws_access_key_id,
  secretAccessKey: awsconfig.aws_secret_access_key,
  region: awsconfig.aws_project_region
});

function App() {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;   

    try {
      const params = {
        Bucket: 'midterm-takehome',
        Key: file.name,
        Body: file,
        ContentType: file.type
      };
      await s3.upload(params).promise();
      console.log('Uploaded file: ', file.name);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
