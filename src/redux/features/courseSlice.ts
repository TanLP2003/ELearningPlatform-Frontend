import { createSlice } from '@reduxjs/toolkit'
import {
  addDescriptionForLecture,
  createCourse,
  createLecture,
  createSection,
  getAllCategories,
  getAllCourse,
  getCourseForLearning,
  getCourseForPreviewing,
  getCourseForViewing,
  getMyTeachingCourse,
  getWishList,
  likeCourse,
  publishCourse,
  selectVideoForLecture,
  unLikeCourse,
  updateCourseInfo
} from '../actions/course-actions'

const initialValue: {
  // studyList: LearningListItem[]
  wishList: WishListItem[]
  instructorList: Course[]
  watching: Course | null
  previewing: Course | null
  learningLecture: Lecture | null
  courseViewing: CourseViewing | null
  publicCourse: Course[]
  categories: Category[]
} = {
  // studyList: [],
  wishList: [],
  instructorList: [],
  watching: null,
  previewing: null,
  learningLecture: null,
  courseViewing: null,
  publicCourse: [],
  categories: []
}

const courseSlice = createSlice({
  name: 'courses',
  initialState: initialValue,
  reducers: {
    setLearningLecture(state, action) {
      state.learningLecture = action.payload as Lecture
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.instructorList = [...state.instructorList, action.payload]
    })
    builder.addCase(getMyTeachingCourse.fulfilled, (state, action) => {
      state.instructorList = action.payload
    })
    builder.addCase(selectVideoForLecture.fulfilled, (state, action) => {
      let updatedCourse = action.payload as Course
      state.instructorList = state.instructorList.filter((i) => i.id !== updatedCourse.id)
      state.instructorList = [...state.instructorList, updatedCourse]
    })
    builder.addCase(addDescriptionForLecture.fulfilled, (state, action) => {
      let updatedCourse = action.payload as Course
      state.instructorList = state.instructorList.filter((i) => i.id !== updatedCourse.id)
      state.instructorList = [...state.instructorList, updatedCourse]
    })

    builder.addCase(createLecture.fulfilled, (state, action) => {
      let updatedCourse = action.payload as Course
      state.instructorList = state.instructorList.filter((i) => i.id !== updatedCourse.id)
      state.instructorList = [...state.instructorList, updatedCourse]
    })
    builder.addCase(createSection.fulfilled, (state, action) => {
      let updatedCourse = action.payload as Course
      state.instructorList = state.instructorList.filter((i) => i.id !== updatedCourse.id)
      state.instructorList = [...state.instructorList, updatedCourse]
    })

    builder.addCase(getCourseForLearning.fulfilled, (state, action) => {
      state.watching = action.payload as Course
    })
    builder.addCase(getCourseForPreviewing.fulfilled, (state, action) => {
      state.previewing = action.payload as Course
      let course = action.payload as Course
      state.learningLecture = course.sections[0].lectures[0]
    })

    builder.addCase(getCourseForViewing.fulfilled, (state, action) => {
      state.courseViewing = action.payload as CourseViewing
    })

    // builder.addCase(getStudyList.fulfilled, (state, action) => {
    //   state.studyList = action.payload.items
    // })

    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.wishList = action.payload.items
    })
    builder.addCase(publishCourse.fulfilled, (state, action) => {
      let updatedCourse = action.payload as Course
      state.instructorList = [...state.instructorList.filter((i) => i.id !== updatedCourse.id), updatedCourse]
    })
    builder.addCase(updateCourseInfo.fulfilled, (state, action) => {
      let updatedCourse = action.payload as Course
      state.instructorList = [...state.instructorList.filter((i) => i.id !== updatedCourse.id), updatedCourse]
    })
    builder.addCase(getAllCourse.fulfilled, (state, action) => {
      state.publicCourse = action.payload
    })
    builder.addCase(likeCourse.fulfilled, (state, action) => {
      state.wishList = action.payload.items
    })
    builder.addCase(unLikeCourse.fulfilled, (state, action) => {
      state.wishList = action.payload.items
    })

    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  }
})

export const { setLearningLecture } = courseSlice.actions
export const courseReducers = courseSlice.reducer
