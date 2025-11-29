import { test, expect } from "../../fixtures/test-data-fixtures";
import compareResponseWithrequest from "../../helpers/compareResponseIwthRequest";
import runQuery from "../../helpers/dbUtils";

test.describe.configure({ mode: "serial" });

test.describe("API e2e test together with DB", () => {
  test('Test DB Connection', async() => {
    const query = 'SELECT * FROM students'
    const result = await runQuery(query)
    console.log(result)
  })

  let studentID: number | undefined;

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
      expect(responseBody[key]).toBe((newStudent as Record<string, unknown>)[key]);
    }

    const query = `SELECT * FROM students WHERE email = '${newStudent.EMAIL}'`;

    const result = await runQuery(query);
    console.log(JSON.stringify(result, null, 2) + " IS OUR RESULT");
    expect(result).toBeDefined();
    expect(result!.length).toBe(1);
    const dbRow: Record<string, unknown> = result![0] as Record<string, unknown>;

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

  test("Update a student we created using PUT", async ({
    request,
    updatedStudent,
  }) => {
    const response = await request.put(
      `${process.env.API_ENDPOINT}/${studentID}`,
      {
        data: updatedStudent,
      }
    );

    console.log(await response.text() +  ' IS PUT API RESPONSE')

    expect(response.ok()).toBeTruthy();

    const query = `SELECT * FROM students WHERE email = '${updatedStudent.EMAIL}'`;
    const result = await runQuery(query);
    expect(result).toBeDefined();
    const dbRow: Record<string, unknown> = result![0] as Record<string, unknown>;
    console.log(dbRow);

    compareResponseWithrequest(dbRow, updatedStudent);
  });

  /**
   * Test Case 4
   * Send a DELETE request to delete the student we CREATED in the first test
   * Validate the response is 2**
   * And send a query to validate the student was deleted
   */

  test("Delete the student UPDATED using DELETE", async ({ request, updatedStudent }) => {
    const response = await request.delete(
      `${process.env.API_ENDPOINT}/${studentID}`
    );

    expect(response.ok()).toBeTruthy();

    const query = `SELECT * FROM students WHERE email = '${updatedStudent.EMAIL}'`;
    const result = await runQuery(query);

    expect(result).toBeDefined();
    expect(result!.length).toBe(0)
  });
});


/**
 * [
 *    ['Yoanna', '2000-01-01', 'yoanna@gmail.com'],
 *    ['Yahya', '2000-01-01', 'yahya@gmail.com']
 * ]
 */
