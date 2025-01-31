import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loadingReducers } from './features/loadingSlice'
import { userReducers } from './features/userSlice'
import { courseReducers } from './features/courseSlice'
import { resourceReducers } from './features/resourceSlice'
import { basketReducers } from './features/basketSlice'
import { orderReducers } from './features/orderSlice'
import { loadingMiddleware } from './loadingMiddleware'
import { profileReducers } from './features/profileSlice'
import { learningReducers } from './features/learningSlice'

const rootReducer = combineReducers({
  loading: loadingReducers,
  users: userReducers,
  courses: courseReducers,
  resources: resourceReducers,
  basket: basketReducers,
  orders: orderReducers,
  profiles: profileReducers,
  learnings: learningReducers
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
