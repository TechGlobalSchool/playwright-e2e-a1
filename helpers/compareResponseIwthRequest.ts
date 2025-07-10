import { expect } from "@playwright/test";

/**
 * The function iterates over each key in the request object and compares the corresponding value in the response/query object.
 * If the key is "DOB", it handles the data comparison by converting the date to a string in the given format
 * 
 * For other keys, it directly compares the values
 * 
 * Compares the properties of a response object with a request/db object
 *
 * @param response 
 * @param request 
 * 
 * @throws Will throw an error if 'DOB' field in the response/db object is not in a recognized format.
 */
function compareResponseWithrequest(response, request) {
  for (const key in request) {
    let receivedString: string;

    if (key === "DOB") {
      if (typeof response[key] === "string") {
        receivedString = response[key].split("T")[0];
      } else if (response[key] instanceof Date) {
        receivedString = response[key].toISOString().split("T")[0];
      } else {
        throw new Error(`Unexpected format for DOB: ${response[key]}`);
      }
      expect(receivedString).toBe(request[key]);
    } else {
      expect(response[key]).toBe(request[key]);
    }
  }
}

export default compareResponseWithrequest
