import { createSlice } from '@reduxjs/toolkit'
import {
  addCourseReview,
  archiveOrUnarchiveEnrolledCourse,
  deleteCourseReview,
  getAllEnrolledCourses,
  updateCourseReview
} from '../actions/learning-action'

const initialValue: {
  enrolledCourses: EnrolledCourse[]
} = {
  enrolledCourses: []
}

const learningSlice = createSlice({
  name: 'learnings',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEnrolledCourses.fulfilled, (state, action) => {
      state.enrolledCourses = action.payload
    })
    builder.addCase(addCourseReview.fulfilled, (state, action) => {
      const enrolledCourse = action.payload
      state.enrolledCourses = state.enrolledCourses.map((ec) =>
        ec.courseId === enrolledCourse.courseId ? { ...ec, ...enrolledCourse } : ec
      )
    })

    builder.addCase(updateCourseReview.fulfilled, (state, action) => {
      const enrolledCourse = action.payload
      state.enrolledCourses = state.enrolledCourses.map((ec) =>
        ec.courseId === enrolledCourse.courseId ? { ...ec, ...enrolledCourse } : ec
      )
    })

    builder.addCase(deleteCourseReview.fulfilled, (state, action) => {
      const courseId = action.payload
      for (let index = 0; index < state.enrolledCourses.length; index++) {
        const enrolledCourse = state.enrolledCourses[index]
        if (enrolledCourse.courseId !== courseId) continue
        enrolledCourse.courseReview = null
        break
      }
    })

    builder.addCase(archiveOrUnarchiveEnrolledCourse.fulfilled, (state, action) => {
      const enrolledCourse = action.payload
      state.enrolledCourses = state.enrolledCourses.map((ec) =>
        ec.courseId === enrolledCourse.courseId ? { ...ec, ...enrolledCourse } : ec
      )
    })
  }
})

export const {} = learningSlice.actions
export const learningReducers = learningSlice.reducer
