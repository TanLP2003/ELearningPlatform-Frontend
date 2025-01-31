import { createAsyncThunk } from '@reduxjs/toolkit'
import authAxios from '../authAxios'
import { UserService } from '../config'

export const getUserProfile = createAsyncThunk('get-user-profile', async (_, { rejectWithValue }) => {
  const response = await authAxios.get(`${UserService}/profile`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  console.log(response.data)
  return response.data
})

export const updateBasicInfo = createAsyncThunk('update-basic-info', async (data: any, { rejectWithValue }) => {
  const response = await authAxios.put(`${UserService}/update-basic-info`, data)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const updatePrivacySetting = createAsyncThunk(
  'update-privacy-setting',
  async (data: any, { rejectWithValue }) => {
    const response = await authAxios.put(`${UserService}/update-privacy`, data)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)

export const getPublicProfile = createAsyncThunk(
  'get-public-profile',
  async (profileId: string, { rejectWithValue }) => {
    const response = await authAxios.get(`${UserService}/get-public-profile/${profileId}`)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)
