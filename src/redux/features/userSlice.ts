import { createSlice } from '@reduxjs/toolkit'
import { googleLogin } from '../actions/auth-actions'

const currentUser = localStorage.getItem('currentUser')

const initialValue: {
  currentUser: User | null
} = {
  currentUser: currentUser ? (JSON.parse(currentUser) as User) : null
}

const userSlice = createSlice({
  name: 'users',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(login.fulfilled, (state, action) => {
    //   state.currentUser = action.payload.currentUser as User
    // })
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUser as User
    })
  }
})

export const {} = userSlice.actions
export const userReducers = userSlice.reducer
