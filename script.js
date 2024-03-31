document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const file = document.getElementById('fileInput').files[0];
    const fileName = file.name;
    // Call your API to get the presigned URL
    async function getdata(url = "", data = {}) {
      const response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'image/jpeg'
                }
            });

return response.json();
}
    getdata("https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url", { answer: file }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});