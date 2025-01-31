// loadingMiddleware.ts
import { Middleware } from '@reduxjs/toolkit'
import { setLoading } from './features/loadingSlice'
import { toast } from 'react-toastify'

export const loadingMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (action.type.endsWith('/pending')) {
      dispatch(setLoading(true))
    }
    const result = next(action)

    if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
      dispatch(setLoading(false))
    }

    return result
  }
