import { createSlice } from '@reduxjs/toolkit'

const initialValue: {
  orderList: Order[]
} = {
  orderList: []
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {}
})

export const {} = orderSlice.actions
export const orderReducers = orderSlice.reducer
