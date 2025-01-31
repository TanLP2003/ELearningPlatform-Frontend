declare global {
  interface User {
    id: string
    userName: string
    email: string
  }
  interface BaseCourseInfo {
    courseId: string | null | undefined
    courseName: string | null | undefined
    courseImage: string | null | undefined
    authorId: string | null | undefined
    authorName: string | null | undefined
  }

  interface LearningListItem extends BaseCourseInfo {}

  interface WishListItem extends BaseCourseInfo {
    price: number
  }
  interface BasketItem extends BaseCourseInfo {
    price: number
  }

  interface OrderItem extends BaseCourseInfo {}
  interface Order {
    items: OrderItem[]
    totalPrice: number
    cardName: string
    cardNumber: string
    expiration: string
    cvv: string
    createdAt: string
  }

  interface LoginParams {
    email: string
    password: string
  }

  interface SignupParams {
    userName: string
    email: string
    password: string
    retypePassword: string
  }

  interface CreateCourseParams {
    title: string
    categoryId: string
    level: string
    instructorName: string
  }

  interface CreateSectionParams {
    courseId: string
    sectionName: string
  }

  interface CreateLectureParams {
    courseId: string
    sectionId: string
    title: string
  }

  interface AddVideoToLectureParams {
    videoId: string
    lectureId: string
    courseId: string
  }

  interface AddDescriptionForLectureParams {
    courseId: string | undefined
    lectureId: string | undefined
    description: string | undefined
  }

  interface CheckoutBasketParams {
    cardName: string
    cardNumber: string
    expiration: string
    cvv: string
    userName: string
  }

  interface Course {
    id: string
    title: string
    description: string | null
    categoryId: string
    level: string
    visuability: string
    language: string
    courseImage: string | null
    price: number | null
    instructorId: string
    sections: Section[]
    instructorName: string
    metadata: CourseMetadata
  }

  interface Section {
    id: string
    name: string
    sectionNumber: number
    courseId: string
    lectures: Lecture[]
  }

  interface Lecture {
    id: string
    sectionId: string
    lectureNumber: number
    name: string
    videoName: string | null
    lectureContentUrl: string | null
    videoThumbnail: string | null
    description: string | null
    resources: string | null
  }

  interface CourseViewing {
    title: string
    description: string | null
    category: string
    level: string
    visuability: string
    language: string
    courseImage: string | null
    price: number | null
    sections: SectionViewing[]
    instructorId: string
    instructorName: string
    metadata: CourseMetadata
  }

  interface SectionViewing {
    name: string
    lectures: LectureViewing[]
  }

  interface LectureViewing {
    name: string
    description: string
  }

  interface Resource {
    fileId: string
    fileName: string
    createdAt: string
    type: string
  }

  interface CartItemDto extends BaseCourseInfo {
    price: number | undefined | null
  }

  interface ProfileBasicInfo {
    firstName: string
    lastName: string
    headline: string | null
    description: string | null
    language: string | null
    website: string | null
    twitter: string | null
    facebook: string | null
    linkedin: string | null
    youtube: string | null
    avatar: string | null
  }

  interface ProfilePrivacySetting {
    showProfile: boolean
    showParticipatedCourses: boolean
  }

  interface SubCategory {
    id: string
    parentCategoryId: string
    name: string
  }
  interface Category {
    id: string
    name: string
    subCategories: SubCategory[]
  }

  interface SearchCourse {
    courseId: string
    courseTitle: string
    courseImage?: string
    instructorName: string
    searchCount: number
  }

  interface SearchInstructor {
    instructorId: string
    instructorName: string
    avatar?: string
    searchCount: number
  }

  interface SearchResult {
    courses: SearchCourse[]
    instructors: SearchInstructor[]
  }

  interface SearchInput {
    searchTerm: string
  }

  interface EnrolledCourse {
    userId: string
    courseId: string
    courseTitle: string
    courseImage: string
    instructorId: string
    instructorName: string
    enrollmentDate: Date
    lastAccessed: Date
    completionPercentage: number
    isArchived: boolean
    courseReview: CourseReview | null
  }
  interface CourseReview {
    courseId: string
    rating: number
    reviewText: string
  }

  interface CourseMetadata {
    courseId: string
    rating: number
    reviewCount: number
    totalStudent: number
  }
}

export {}
