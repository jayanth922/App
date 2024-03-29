import AWS from 'aws-sdk';
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    
    const params = {
        Bucket: bucketName,
        Key: objectKey
    };
    
    try {
        const data = await s3.headObject(params).promise();
        const metadata = data.Metadata;
        
        await dynamodb.put({
            TableName: 'my-table',
            Item: {
                imageKey: objectKey,
                metadata: metadata
            }
        }).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify(metadata)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err.message)
        };
    }
};
