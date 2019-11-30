import axios from 'axios'
import sha1 from 'js-sha1'

const baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
// const baseUrl = 'http://localhost:8088/'
// const baseUrl = 'https://op.derucci.com/'


function getToken () {
  
  let tokenObj = {}
  try {
    tokenObj = localStorage.getItem('token')
    tokenObj = tokenObj ? JSON.parse(tokenObj) : {}
  } catch (err) {
    console.error('get token from localStorage error')
  }
  return tokenObj
}

function refreshToken () {
  return new Promise((resolve, reject) => {
    const refresh_token = getToken().refresh_token
    axios({
      url: baseUrl + '/oauth/token',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      params: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}
// 获取sign
function getSign (obj, token) {
  let str = ''
  let keyArr = []
  for (let key in obj) {
    keyArr.push(key)
  }
  keyArr = keyArr.sort()
  // eslint-disable-next-line array-callback-return
  keyArr.map((item, index) => {
    if (obj[item] !== '') {
      if (!str) {
        str = `${item}=${obj[item]}`
      } else {
        str += `&${item}=${obj[item]}`
      }
    }
  })
  return sha1(str + token)
}

// 设置sign
function setSign (config) {
  if (config.headers.sign) {
    const myData = config.headers.sign
    const sign = getSign(myData, getToken().access_token)
    return sign
  }
  return false
}

axios.setToken = (obj) => {
  axios.defaults.headers['Authorization'] = `Bearer ${obj.access_token}`
  window.localStorage.setItem('token', JSON.stringify(obj))
}

let isRefreshing = false
let requests = []

axios.interceptors.request.use(config => {
  const tokenObj = getToken()
  config.headers['Authorization'] = `Bearer ${tokenObj.access_token}`
  // console.log(config)
  if (config.url.indexOf('oauth/token') >= 0) {
    return config
  }
  if (tokenObj.access_token && tokenObj.tokenExpireTime) {
    const now = Date.now()
    if (now >= tokenObj.tokenExpireTime) {
      // 刷新token
      if (!isRefreshing) {
        isRefreshing = true
        refreshToken().then(res => {
          if (res.data) {
            const { expires_in, access_token } = res.data
            const tokenExpireTime = now + expires_in * 1000
            const obj = {
              ...res.data,
              tokenExpireTime
            }
            axios.setToken(obj)
            isRefreshing = false
            return access_token
          }
        }).then(token => {
          const sign = setSign(config)
          if (sign) {
            config.headers['sign'] = sign
          }
          requests.forEach(cb => cb(token))
          requests = []
        }).catch(err => {
          console.log(err)
          localStorage.clear()
          token().then(res => {
            const { expires_in } = res.data
            const tokenExpireTime = now + expires_in * 1000
            const obj = {
              ...res.data,
              tokenExpireTime
            }
            axios.setToken(obj)
          })
        })
      }
      const retryOriginalRequest = new Promise(resolve => {
        requests.push(token => {
          config.headers['Authorization'] = `Bearer ${token}`
          resolve(config)
        })
      })
      return retryOriginalRequest
    } else {
      const sign = setSign(config)
      if (sign) {
        config.headers['sign'] = sign
      }
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(
  response => {
    console.log(111, response)
    return response
  }, error => {
    return Promise.reject(error)
  }
)
class Request {
  getData ({ url, data = {}, method = 'get' }) {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        method: method,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'sign': data
        },
        params: data
      }).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}

function token () {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://mobiletest.derucci.net/consumer-admin/oauth/token",
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      params: {
        grant_type: 'client_credentials',
        client_id: 20190429173745,
        client_secret: '8464cf66364926afa2bf8523730465a4'
      }
    }).then(res => {
      resolve(res)
    })
  })
}

export { axios, Request, getToken, refreshToken, token }
