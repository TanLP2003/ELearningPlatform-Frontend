import axios from 'axios'
import { SERVER } from './config'

export const globalConfig = {
  retry: 3,
  delay: 1000
}

const authAxios = axios.create({
  baseURL: `${SERVER}`
})

authAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config
    if (error.response) {
      if (error.response.status === 401) {
        try {
          const oldAccessToken = localStorage.getItem('accessToken')
          const oldRefreshToken = localStorage.getItem('refreshToken')
          const response = await axios.post(
            `${SERVER}/auth/refresh-token`,
            {
              refreshToken: oldRefreshToken
            },
            {
              headers: {
                Authorization: `Bearer ${oldAccessToken}`
              }
            }
          )
          const { accessToken, refreshToken } = response.data
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
          return authAxios(config)
        } catch (err) {
          window.history.replaceState({}, '', `${SERVER}`)
          console.log(err)
          return Promise.reject(err)
        }
      }
    }
  }
)

export default authAxios
