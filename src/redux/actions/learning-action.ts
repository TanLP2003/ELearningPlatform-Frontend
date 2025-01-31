import { createAsyncThunk } from '@reduxjs/toolkit'
import authAxios from '../authAxios'
import { Learning_Service } from '../config'

export const getAllEnrolledCourses = createAsyncThunk('get-all-enrolled-courses', async (_, { rejectWithValue }) => {
  const response = await authAxios.get(`${Learning_Service}/enrolled-courses`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const addCourseReview = createAsyncThunk(
  'add-course-review',
  async (data: CourseReview, { rejectWithValue }) => {
    const response = await authAxios.post<EnrolledCourse>(`${Learning_Service}/reviews`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const updateCourseReview = createAsyncThunk(
  'update-course-review',
  async (data: CourseReview, { rejectWithValue }) => {
    const response = await authAxios.put<EnrolledCourse>(`${Learning_Service}/reviews`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const deleteCourseReview = createAsyncThunk(
  'delete-course-review',
  async (courseId: string, { rejectWithValue }) => {
    const response = await authAxios.delete(`${Learning_Service}/reviews/enrolled-course/${courseId}`)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return courseId
  }
)

export const archiveOrUnarchiveEnrolledCourse = createAsyncThunk(
  'archive-or-unarchive',
  async (
    data: {
      courseId: string
      setArchived: boolean
    },
    { rejectWithValue }
  ) => {
    const response = await authAxios.put<EnrolledCourse>(`${Learning_Service}/archive-unarchive-courses`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)
