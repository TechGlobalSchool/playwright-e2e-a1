import { test } from "../../fixtures/test-data-fixtures";
import runQuery from "../../helpers/dbUtils";

test.describe('API e2e test together with DB', () => {

  // test('Test DB Connection', async({ page }) => {
  //   const query = 'SELECT * FROM students'
  //   const result = await runQuery(query)
  //   console.log(result)
  // })


  test('Create a new student using POST', async ({ request, newStudent }) => {

    const response = await request.post(process.env.API_ENDPOINT!, {
      // headers : {
      //   'Content-type': 'application/json',
      //   'Authorization': `Bearer ${process.env.API_TOKEN}`
      // },
      data: newStudent
    })

    // console.log(JSON.stringify(response, null , 2))

    const responseBody = await response.json()
    console.log(responseBody)
  })

})