import {
  getAccessToken,
  removeFromStorage,
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'
import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:3003/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originRequest = error.config

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originRequest._isRetry = true
      try {
        await authService.getNewToken()
        return axiosWithAuth.request(originRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
          removeFromStorage()
        }
      }
    }

    throw error
  }
)

export { axiosClassic, axiosWithAuth }
