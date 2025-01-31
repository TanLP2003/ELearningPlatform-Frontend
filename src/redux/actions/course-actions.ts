import { createAsyncThunk } from '@reduxjs/toolkit'
import authAxios from '../authAxios'
import { Course_Manager, Wish_List } from '../config'
import axios from 'axios'

export const createCourse = createAsyncThunk('create-course', async (data: CreateCourseParams, { rejectWithValue }) => {
  const response = await authAxios.post(`${Course_Manager}/create-course`, data)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const createLecture = createAsyncThunk(
  'create-lecture-for-section',
  async (data: CreateLectureParams, { rejectWithValue }) => {
    const response = await authAxios.post(`${Course_Manager}/add-lecture-to-section`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const createSection = createAsyncThunk(
  'create-section-for-course',
  async (data: CreateSectionParams, { rejectWithValue }) => {
    const response = await authAxios.post(`${Course_Manager}/add-section-to-course`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const getMyTeachingCourse = createAsyncThunk('get-my-teaching-course', async (_, { rejectWithValue }) => {
  const response = await authAxios.get(`${Course_Manager}/get-my-teaching-course`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const selectVideoForLecture = createAsyncThunk(
  'select-video-for-lecture',
  async (data: AddVideoToLectureParams, { rejectWithValue }) => {
    const response = await authAxios.put(`${Course_Manager}/add-video-to-lecture`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const addDescriptionForLecture = createAsyncThunk(
  'add-description-for-lecture',
  async (data: AddDescriptionForLectureParams, { rejectWithValue }) => {
    const response = await authAxios.put(`${Course_Manager}/add-description-for-lecture`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const getCourseForLearning = createAsyncThunk(
  'get-course-for-learning',
  async (courseId: string, { rejectWithValue }) => {
    const response = await authAxios.get(`${Course_Manager}/secure-${courseId}`)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const getCourseForPreviewing = createAsyncThunk(
  'get-course-for-previewing',
  async (courseId: string, { rejectWithValue }) => {
    const response = await authAxios.get(`${Course_Manager}/preview-${courseId}`)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const getCourseForViewing = createAsyncThunk(
  'get-course-for-viewing',
  async (courseId: string, { rejectWithValue }) => {
    const response = await axios.get(`${Course_Manager}/${courseId}`)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

// export const getStudyList = createAsyncThunk('get-study-list', async (_, { rejectWithValue }) => {
//   const response = await authAxios.get(`${Study_List}`)
//   if (response.status < 200 || response.status >= 300) {
//     return rejectWithValue(response)
//   }
//   return response.data
// })

export const getWishList = createAsyncThunk('get-wish-list', async (_, { rejectWithValue }) => {
  const response = await authAxios.get(`${Wish_List}`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const publishCourse = createAsyncThunk(
  'make-course-published',
  async (courseId: string, { rejectWithValue }) => {
    const response = await authAxios.put(`${Course_Manager}/make-course-public/${courseId}`)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const updateCourseInfo = createAsyncThunk(
  'update-course-info',
  async (
    data: {
      data: {
        title: string | null
        description: string | null
        level: string | null
        price: number | null
        categoryId: string | null
        language: string | null
      }
      courseId: string
    },
    { rejectWithValue }
  ) => {
    console.log(data)
    const response = await authAxios.put(`${Course_Manager}/update-course-info/${data.courseId}`, data.data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const getAllCourse = createAsyncThunk('get-all-course', async (_, { rejectWithValue }) => {
  const response = await axios.get(`${Course_Manager}/get-all`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const likeCourse = createAsyncThunk('like-item', async (courseId: string, { rejectWithValue }) => {
  const response = await authAxios.put(`${Wish_List}/add-to-wish-list/${courseId}`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const unLikeCourse = createAsyncThunk('unlike-item', async (courseId: string, { rejectWithValue }) => {
  const response = await authAxios.put(`${Wish_List}/remove-from-wish-list/${courseId}`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const getAllCategories = createAsyncThunk('get-all-categories', async (_, { rejectWithValue }) => {
  const response = await axios.get(`${Course_Manager}/get-all-categories`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})
