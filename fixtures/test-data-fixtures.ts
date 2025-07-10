import { test as pageFixtures } from './pom-fixtures';
import studentsData from '../test-data/studentsData.json'

type StudentInfo = {
  DOB: string
  EMAIL: string
  FIRST_NAME: string
  LAST_NAME: string
  INSTRUCTOR_ID: number
}

type StudentInfoTypes = {
  newStudent: StudentInfo
  updatedStudent: StudentInfo
}

export const test = pageFixtures.extend<StudentInfoTypes>({

  newStudent: async({}, use) => {
    await use(studentsData.newStudent)
  },

  updatedStudent: async({}, use) => {
    await use(studentsData.updatedStudent)
  }
})

export { expect } from '@playwright/test'