document.getElementById('uploadForm').addEventListener('submit', function(event) {
    const file = document.getElementById('fileInput').files[0];
    const fileName = file.name;
    console.log(file);
    console.log(file.type)

    // Call your API to get the presigned URL
    async function getdata(url = "", data = {}) {
      const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'image/jpeg'
                },
              body: JSON.stringify(data)
            });

return response.json();
}
console.log(body);
    console.log(response);
    getdata("https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url", { answer: file }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});