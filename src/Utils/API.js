import axios from "axios";

const options_example = {
  url: URL,
  method: "GET",
  responseType: "blob",
  params: {
    username: "user",
    password: "pass",
  },
};

/**
 * axiosApi is an async function which will call api's with the passed props as options
 *
 * @returns {Function} - axiosApi
 */
export const axiosApi = async ({ options }) => {
  try {
    const response = await axios(options);
    console.log(`Res`, response);
    if (response.statusText === "OK") {
      console.log("Request Successful")
    } else {
      console.error("Response is not OK || No file present: ", response.status);
      throw new Error("Response is not OK");
    }
  } catch (error) {
    console.error("Error in accessing API: ", error);
  }
};
