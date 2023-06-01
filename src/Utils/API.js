import axios from 'axios';

export const axiosApiCall = async (endpoint, params ,setFile) =>{

axios.get(endpoint, { params })
  .then(response => {
    // Process the response data here
    console.log("Axios API:",response.data);
    setFile(response.data)
  })
  .catch(error => {
    // Handle any errors
    console.error("Axios API:",error);
    setFile("error");
  });
}
// -----------------------------------------------

export const newApiCall = async (setFile, payload) => {
  const lambdaEndpoint =
    "https://fqvysvv7b4.execute-api.ca-central-1.amazonaws.com/search-eras-gars-data";
  const filename = "test.csv";
  const username = "rommelnuque";

  const queryString = `?username=${encodeURIComponent(username)}&filename=${encodeURIComponent(filename)}`;

  fetch(lambdaEndpoint + queryString, {
    method: "GET",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-coedystream;v=b3;q=0.9",
      // "user-agent":
        // "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36",
      // "x-amzn-trace-id": "Root 1-64779910-1185f0c4032c33053e325f70",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the response data here
      console.log("newApiCall :", data);
      setFile(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error("newApiCall :",error);
      setFile("error");
    });
};

export const makeApiCall = async (setFile, payload) => {
  try {
    const response = await fetch(
      "https://fqvysvv7b4.execute-api.ca-central-1.amazonaws.com",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      const downloadUrl = await response.json();
      console.log("downloadUrl : ", downloadUrl);
      setFile(downloadUrl);
      // Process the download URL or trigger the file download
    } else {
      // const errorData = await response.json();
      setFile("error");
    }
  } catch (error) {
    console.error("Error:", error);
    setFile("error");
  }
};