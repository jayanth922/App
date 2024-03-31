document.getElementById('uploadForm').addEventListener('submit', function(event) {
     file = document.getElementById('fileInput').files[0];
     fileName = file.name;
    // console.error(file);
    // console.error(file.type)

    // Call your API to get the presigned URL
    async function getdata(url = "", data = {}) {
       response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'image/jpeg'
                },
              body: JSON.stringify(data)
            });
       console.log(response);
      return response.json();
}
// console.error(body);
    getdata("https://tzzbrzpvv1.execute-api.ap-south-1.amazonaws.com/default/presigned-url", { answer: file }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});

});