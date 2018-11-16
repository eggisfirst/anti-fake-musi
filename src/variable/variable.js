import axios from 'axios'

let init = (function () {
  const path = 'https://derucci.net/api/lotterypool/v1/'
  let key = true
  let temp = {
    path : path,
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
    //
    sendCode : (code) => {
      return new Promise (function(resolve,reject){
        if(key){
          key = false
          axios.get(`${path}`,{
            params: {
              code:code 
            }
          })
          .then(function (res) {
            if (res) {
              key = true
              console.log ('获取数据',res)
            }
          })
          .catch(function (error) {
            key = true
            console.log ('发生错误',error)
          })
          
        }
      })
    }
   
  }
  return temp
}())
export default init

