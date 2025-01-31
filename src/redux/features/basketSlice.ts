import { createSlice } from '@reduxjs/toolkit'
import { addCartItem, getBasket, removeCartItem } from '../actions/basket-actions'

const initialValue: {
  items: BasketItem[]
  totalPrice: number | null
} = {
  items: [],
  totalPrice: null
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState: initialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalPrice = action.payload.totalPrice
    })
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalPrice = action.payload.totalPrice
    })
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalPrice = action.payload.totalPrice
    })
  }
})

export const {} = basketSlice.actions
export const basketReducers = basketSlice.reducer
