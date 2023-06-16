import axios from "axios"
import jwtDefaultConfig from "./jwtDefaultConfig"

// ** jwtConfig <= Will be used by this service
const jwtConfig = { ...jwtDefaultConfig }

// Jika tidak memiliki refresh token
// ** For Refreshing Token
// const isAlreadyFetchingAccessToken = false
// ** For Refreshing Token
// const subscribers = []

const getToken = () => {
  return localStorage.getItem(jwtConfig.storageTokenKeyName)
}

// Jika tidak memiliki refresh token
// const getRefreshToken = () => {
//   return localStorage.getItem(jwtConfig.storageRefreshTokenKeyName)
// }
// const refreshToken = () => {
//   return axios.post(jwtConfig.refreshEndpoint, {
//     refreshToken: getRefreshToken()
//   })
// }
// const setToken = (value) => {
//   localStorage.setItem(jwtConfig.storageTokenKeyName, value)
// }
// const setRefreshToken = (value) => {
//   localStorage.setItem(jwtConfig.storageRefreshTokenKeyName, value)
// }
// const onAccessTokenFetched = (accessToken) => {
//   subscribers = subscribers.filter(callback => callback(accessToken))
// }
// const addSubscriber = (callback) => {
//   subscribers.push(callback)
// }

// ** Request Interceptor
axios.interceptors.request.use(
  config => {
    // ** Get token from localStorage
    const accessToken = getToken()

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

// ** Add request/response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    // ** const { config, response: { status } } = error

    // Jika tidak memiliki refresh token
    const { response } = error
    // Jika memiliki refresh token
    // const { config, response } = error
    // const originalRequest = config

    // ** if (status === 401) {
    if (response && response.status === 401) {
      // Jika tidak memiliki refresh token
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userData')

      window.location = '/'
      // Jika memiliki refresh token
      // if (!isAlreadyFetchingAccessToken) {
      //   isAlreadyFetchingAccessToken = true
      //   refreshToken().then(r => {
      //     isAlreadyFetchingAccessToken = false

      //     // ** Update accessToken in localStorage
      //     setToken(r.data.accessToken)
      //     setRefreshToken(r.data.refreshToken)

      //     onAccessTokenFetched(r.data.accessToken)
      //   })
      // }
      // const retryOriginalRequest = new Promise(resolve => {
      //   addSubscriber(accessToken => {
      //     // ** Make sure to assign accessToken according to your response.
      //     // ** Check: https://pixinvent.ticksy.com/ticket/2413870
      //     // ** Change Authorization header
      //     originalRequest.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
      //     resolve(axios(originalRequest))
      //   })
      // })
      // return retryOriginalRequest
    }
    return Promise.reject(error)
  }
)

export default axios