import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SERVER } from '../config'
import authAxios from '../authAxios'

// export const login = createAsyncThunk('login', async (data: LoginParams, { rejectWithValue }) => {
//   const response = await axios.post(`${SERVER}/identity-provider/login`, data)
//   if (response.status < 200 || response.status >= 300) {
//     return rejectWithValue(response)
//   }
//   localStorage.setItem('currentUser', JSON.stringify(response.data.currentUser))
//   localStorage.setItem('accessToken', response.data.accessToken)
//   localStorage.setItem('refreshToken', response.data.refreshToken)
//   return response.data
// })

export const signup = createAsyncThunk('signup', async (data: SignupParams, { rejectWithValue }) => {
  const response = await axios.post(`${SERVER}/auth/signup`, data)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
})

export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
  const response = await authAxios.post(`${SERVER}/auth/logout`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  localStorage.clear()
})

export const googleLogin = createAsyncThunk('google-login', async (code: string, { rejectWithValue }) => {
  const response = await axios.post(`${SERVER}/auth/google-login`, {
    code: code
  })
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  localStorage.setItem('currentUser', JSON.stringify(response.data.currentUser))
  localStorage.setItem('accessToken', response.data.accessToken)
  localStorage.setItem('refreshToken', response.data.refreshToken)
  return response.data
})
