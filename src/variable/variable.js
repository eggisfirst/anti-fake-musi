import axios from 'axios'
import sha1 from 'js-sha1'

let init = (function () {
  const path = 'https://derucci.net/api/antifake/v1/'
  let key = true
  let temp = {
    path : path, 
    // appId :'wx877a7e37b0de0a87',
    // secretKey : '477a1d7cc03d21d5abce55ec12170d33',
    //获取防伪码数据
    getCode : (code) => {
      return new Promise(function (res, ect) {
        if (key) {
          key = false
          axios.get(`${path}antiFakeVerify`, {
            params: {
              securityCode: code,
            }
          })
            .then((res) => {
              key = true
              console.log(1234,res.data.status)
              if (res.data.status == 1) {
                
              }
            })
            .catch((error) => {
              key = true
              console.log('发生错误', error)
            })
        }
        
      })
      
    },
    //获取url参数
    getQueryString : (name) => {
      let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    //验证手机格式
    testPhone : (phone) => {
      const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      return phoneReg.test(phone)
    },
     // 校验人名
     testName : (name) => {
      const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
      return nameReg.test(name)
    },
    // 获取时间戳
    getTimestamp : () => {
      let date = new Date()
      let timestamp = date.getTime()
      return timestamp
    },
     // 参数加密
     getSign : (arr) => {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str = str === '' ? `${arr[i][0]}=${arr[i][1]}` : `${str}&${arr[i][0]}=${arr[i][1]}`
      }
      return sha1.hex(str)
    },
     // 获取token码
    //  token : (function() {
    //   return new Promise(function(resolve, reject) {
    //     axios({
    //       method: 'post',
    //       url: 'https://derucci.net/app/token.api',
    //       params: {
    //         key: '994061370314006529',
    //         secretKey: secretKey
    //       }
    //     })
    //     .then((response) => {
    //       if (response) {
    //         resolve(response.data.token)
    //       }
    //     }).catch((error) => {
    //       if (error) {
    //         alert('token获取失败！')
    //       }
    //     })
    //   })
    // }())

  }
  return temp
}())
export default init

