import { createSlice } from '@reduxjs/toolkit'
import { getPublicProfile, getUserProfile, updateBasicInfo, updatePrivacySetting } from '../actions/user-actions'

const intialValue: {
  basicInfo: ProfileBasicInfo
  privacySetting: ProfilePrivacySetting
  publicProfile: ProfileBasicInfo | null
} = {
  basicInfo: {
    firstName: '',
    lastName: '',
    headline: '',
    description: '',
    language: '',
    website: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    avatar: ''
  },
  privacySetting: {
    showParticipatedCourses: false,
    showProfile: false
  },
  publicProfile: null
}

const profileSlice = createSlice({
  name: 'profiles',
  initialState: intialValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.basicInfo = action.payload.basicInfo
      state.privacySetting = action.payload.privacySetting
    })
    builder.addCase(updateBasicInfo.fulfilled, (state, action) => {
      state.basicInfo = action.payload
    })
    builder.addCase(updatePrivacySetting.fulfilled, (state, action) => {
      state.privacySetting = action.payload
    })
    builder.addCase(getPublicProfile.fulfilled, (state, action) => {
      state.publicProfile = action.payload
    })
    builder.addCase(getPublicProfile.rejected, (state, action) => {
      state.publicProfile = null
    })
  }
})

export const {} = profileSlice.actions
export const profileReducers = profileSlice.reducer
