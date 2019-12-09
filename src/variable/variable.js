import axios from 'axios'
import sha1 from 'js-sha1'

let init = (function () {
  // const path = 'https://derucci.net/api/antifake/v1/'
  const path = 'https://derucci.net/'
  // const path = 'https://mobiletest.derucci.net/consumer-admin/'
  let key = true
  let temp = {
    path: path,
    secretKey: '477a1d7cc03d21d5abce55ec12170d33',
    //获取防伪码数据
    getCode: (code) => {
      let token = JSON.parse(localStorage.getItem('token')).access_token
      return new Promise(function (resolve, reject) {
        if (key) {
          key = false
          axios.get(`${path}api/antifake/v1/antiFakeVerify`, {
            params: {
              securityCode: code,
            },
            headers: {
              "Authorization": `Bearer ${token}`,
              'sign': temp.getTokenSign({
                securityCode: code,
              }, token)
            },
          })
            .then((res) => {
              key = true
              resolve(res)
            })
            .catch((error) => {
              key = true
              console.log('发生错误', error)
            })
        }

      })

    },
    GetQueryString: (name, url) => {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      url = url.substr(url.indexOf('?') + 1)
      let r = url.match(reg);  //获取url中"?"符后的字符串并正则匹配
      let context = "";
      if (r != null)
        context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined" ? "" : context;
    },
    //检测url有没有#并去除#
    testUrl: (name) => {
      if (name.indexOf("#") != -1) {
        name = name.substring(name.indexOf(""), name.indexOf('#/')) + name.substring(name.indexOf("#/") + 2)
        return name
      }
      return name
    },
    //获取url参数
    getQueryString: (name) => {
      let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return '';
    },
    //验证手机格式
    testPhone: (phone) => {
      const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      return phoneReg.test(phone)
    },
    // 校验人名
    testName: (name) => {
      const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      return nameReg.test(name)
    },
    // 获取时间戳
    getTimestamp: () => {
      let date = new Date()
      let timestamp = date.getTime()
      return timestamp
    },
    // 参数加密
    getSign: (arr) => {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str = str === '' ? `${arr[i][0]}=${arr[i][1]}` : `${str}&${arr[i][0]}=${arr[i][1]}`
      }
      return sha1.hex(str)
    },
    getToken: () => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${path}oauth/token`,
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
    },

    refreshToken: () => {

    },
    //获取调用微信JS接口的临时票据
    getTicket: () => {
      let token = JSON.parse(localStorage.getItem('token')).access_token
      let url = window.location.href
      let timestamp = temp.getTimestamp()
      let secretKey = temp.secretKey
      let arr = [
        ['url', url],
        ['secretKey', secretKey],
        ['timestamp', timestamp]
      ]
      let sign = temp.getSign(arr)
      return new Promise(function (resolve, reject) {
        axios.get(`${path}api/public/v1/getTicket`, {
          params: {
            url: url,
            timestamp: timestamp,
            secretKey: secretKey,
            sign: sign
          },
          headers: {
            "Authorization": `Bearer ${token}`,
            'sign': temp.getTokenSign({
              url: url,
              timestamp: timestamp,
              secretKey: secretKey,
              sign: sign
            }, token)
          },
        })
          .then((res) => {
            // alert('ticket,suc',res)
            if (res) {
              // console.log ('获取数据',res)
              resolve(res.data)
            }
          })
          .catch((error) => {
            // alert('ticket,err',error)
            console.log('发生错误', error)
          })
      })
    },
    // 获取sign
    getTokenSign: (obj, token) => {
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
      console.log(1231232, str);
      return sha1(str + token)
    },
    //验证网址是否derucci
    isDerucci: (url) => {
      // let c = url.substring(url.indexOf(''),url.indexOf('s/'))
      if (url.indexOf('http://derucci.net') !== -1 || url.indexOf('https://derucci.net') !== -1) {
        return true
      }
      return false
    },
    //
    isZsDerucci: (url) => {
      // let c = url.substring(url.indexOf(''),url.indexOf('service'))
      if (url.indexOf('zs.derucci.net') !== -1) {
        return true
      }
      return false
    },
    //是否有barCode
    getString: (name) => {
      let url = name
      let c = url.substring(url.indexOf('?barCode=') + 1, url.indexOf('='))
      if (c === 'barCode') {
        return true
      } else {
        return false
      }
    }

  }
  return temp
}())
export default init

