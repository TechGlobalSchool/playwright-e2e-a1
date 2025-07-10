import { test, expect } from "../../fixtures/test-data-fixtures";
import compareResponseWithrequest from "../../helpers/compareResponseIwthRequest";
import runQuery from "../../helpers/dbUtils";

test.describe("API e2e test together with DB", () => {
  // test('Test DB Connection', async({ page }) => {
  //   const query = 'SELECT * FROM students'
  //   const result = await runQuery(query)
  //   console.log(result)
  // })

  let studentID;

  test("Create a new student using POST", async ({ request, newStudent }) => {
    const response = await request.post(process.env.API_ENDPOINT!, {
      // headers : {
      //   'Content-type': 'application/json',
      //   'Authorization': `Bearer ${process.env.API_TOKEN}`
      // },
      data: newStudent,
    });

    // console.log(JSON.stringify(response, null , 2))

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const name = responseBody.FIRST_NAME;
    studentID = responseBody.STUDENT_ID;
    console.log("Name: ", name);
    console.log(responseBody.DOB, " DOB");

    for (const key in newStudent) {
      expect(responseBody[key]).toBe(newStudent[key]);
    }

    const query = `SELECT * FROM students WHERE email = '${newStudent.EMAIL}'`;

    const result = await runQuery(query);
    console.log(JSON.stringify(result, null, 2) + " IS OUR RESULT");
    const dbRow = result[0];

    console.log(dbRow);

    // for(const key in newStudent) {

    //   if(key === 'DOB') {
    //     // ISO date format
    //     // After splitting    ---> ['1990-01-01', 'T06:00:00.000Z']
    //     // console.log(dbRow[key].toISOString())
    //     // console.log(dbRow[key].toString())
    //     const receivedString = dbRow[key].toISOString().split('T')[0]
    //     expect(receivedString).toBe(newStudent[key])
    //   } else {
    //     expect(dbRow[key]).toBe(newStudent[key])
    //   }
    // }

    compareResponseWithrequest(dbRow, newStudent);

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
  });

  /**
   * Test Case 2
   * Send a GET request to retrieve student we CREATED in the previous test
   * Validate the response is 2**
   * Validate the response body matches the student we created
   */
  test("Create a new student using GET", async ({ request, newStudent }) => {
    const response = await request.get(
      `${process.env.API_ENDPOINT}/${studentID}`
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    compareResponseWithrequest(responseBody, newStudent);
  });


  // *** NOTE **** ----> These all tests run in parallel mode by default. If you get any failure
  // while complating the homework, please remember this note.

  /**
   * Test Case 3
   * Send a PUT request to update the student we CREATED in the first test
   * Validate the response is 2**
   */

  /**
   * Test Case 4
   * Send a DELETE request to delete the student we CREATED in the first test
   * Validate the response is 2**
   * And send a query to validate the student was deleted
   */
});
