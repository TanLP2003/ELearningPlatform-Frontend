export const SERVER = import.meta.env.VITE_SERVER_URL

export const Course_Manager = `${SERVER}/course-manager`
export const Learning_Service = `${SERVER}/learning`
export const Wish_List = `${SERVER}/wish-list`
export const Basket = `${SERVER}/cart`
export const AuthService = `${SERVER}/auth`
export const UserService = `${SERVER}/user`

export function getInitials(name: string) {
  const words = name.split(' ')
  if (words.length <= 2) {
    return words.map((word) => word.charAt(0).toUpperCase()).join('')
  } else {
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
  }
}

export const getLevel = (level: string) => {
  if (level === '0') return 'Cơ bản'
  else if (level === '1') return 'Trung bình'
  else if (level === '2') return 'Nâng cao'
  else if (level === '4') return 'Tất cả'
}
