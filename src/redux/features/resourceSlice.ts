import { createSlice } from '@reduxjs/toolkit'
import { getUploadedListByUser } from '../actions/resource-actions'

const initialValue: {
  resources: Resource[]
} = {
  resources: []
}

const resourceSlice = createSlice({
  name: 'resources',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUploadedListByUser.fulfilled, (state, action) => {
      state.resources = action.payload.items
    })
  }
})

export const {} = resourceSlice.actions
export const resourceReducers = resourceSlice.reducer
