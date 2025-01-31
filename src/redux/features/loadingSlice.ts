import { createSlice } from '@reduxjs/toolkit'

const initialValue: {
  loading: boolean
} = {
  loading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialValue,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setLoading } = loadingSlice.actions
export const loadingReducers = loadingSlice.reducer
