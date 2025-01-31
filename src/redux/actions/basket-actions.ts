import { createAsyncThunk } from '@reduxjs/toolkit'
import authAxios from '../authAxios'
import { Basket } from '../config'

export const getBasket = createAsyncThunk('get-basket', async (_, { rejectWithValue }) => {
  const response = await authAxios.get(`${Basket}`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const addCartItem = createAsyncThunk('add-cart-item', async (data: CartItemDto, { rejectWithValue }) => {
  const response = await authAxios.put(`${Basket}/add-item`, data)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const removeCartItem = createAsyncThunk('remove-cart-item', async (itemId: string, { rejectWithValue }) => {
  const response = await authAxios.put(`${Basket}/remove-item/${itemId}`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const checkoutBasket = createAsyncThunk('checkout-basket', async (_, { rejectWithValue }) => {
  const response = await authAxios.post(`${Basket}/checkout-basket`)
  if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response)
  }
  return response.data
})

export const buyNow = createAsyncThunk(
  'buy-now',
  async (
    params: {
      courseId: string
    },
    { rejectWithValue }
  ) => {
    const response = await authAxios.post(`${Basket}/buynow/${params.courseId}`)
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response)
    }
    return response.data
  }
)
