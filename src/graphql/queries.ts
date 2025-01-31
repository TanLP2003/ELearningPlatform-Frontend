import { gql } from '@apollo/client'

export const SEARCH_QUERY = gql`
  query Search($searchTerm: String!) {
    search(searchTerm: $searchTerm) {
      courses {
        courseId
        courseTitle
        courseImage
        instructorName
      }
      instructors {
        instructorId
        instructorName
        avatar
      }
    }
  }
`
