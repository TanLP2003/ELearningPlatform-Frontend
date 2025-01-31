import { createAsyncThunk } from '@reduxjs/toolkit'
import authAxios from '../authAxios'
import { SERVER } from '../config'

export const getUploadedListByUser = createAsyncThunk('get-uploaded-list-by-user', async (_, { rejectWithValue }) => {
  const response = await authAxios.get(`${SERVER}/video-library/`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const uploadLectureVideo = createAsyncThunk(
  'upload-video-lecture',
  async (
    data: {
      formData: FormData
      lectureId: string
    },
    { rejectWithValue }
  ) => {
    const response = await authAxios.post(`${SERVER}/video-manager/${data.lectureId}`, data.formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)
