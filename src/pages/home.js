import React, { Component } from 'react'
import '../scss/home.scss'
import Rules from './../components/rules';
import Variable from '../variable/variable'
import wx from 'weixin-js-sdk'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: false
    }
    //规则
    this.rulesClickOn = () => {
      this.setState({ isToggleOn: true })
    }
    this.rulesClickIn = () => {
      this.setState({ isToggleOn: false })
    }
    this.scanQr = (res) => {
      // let result = 'https://zs.derucci.net/service/index.html?state=1&barCode=005056801F5E1ED8AEF55BA4C684CE18'
      let result = res.resultStr
      let isUrl = Variable.isDerucci(result) || Variable.isZsDerucci(result)
      if(!isUrl){
      //1.20-50的字符串且不是我们的网址(20～50的字符串指的是防伪码，不包含网址。)
        if (result.length >=20){
          this.props.history.push('/' + '?barCode=' + result)
        }else{
          alert('该二维码不是防伪码')
        } 
      }else{
        //2.是我们的网址
        if (Variable.isDerucci(result)){
          let code = Variable.GetQueryString('b',result)
          console.log('62防伪码', result)
          //3.有参数
          if (code.length !== 0){
            this.props.history.push('/' + '?barCode=' + code)
          }else {
            this.props.history.push('/' + '?barCode=')
          }
        }else if(Variable.isZsDerucci(result)){
          console.log('斩杀个防伪码', result)
          let code2 = Variable.GetQueryString('barCode',result)
          if (code2.length !== 0){
            this.props.history.push('/' + '?barCode=' + code2)
          }else {
            this.props.history.push('/' + '?barCode=')
          }
        } else{
          alert ('该二维码不是防伪码')
        }
      }
    }
    //微信配置
    this.wxConfig = () => {
      Variable.getTicket()
        .then(function (res) {
          wx.config({
            debug: false,
            appId: 'wx877a7e37b0de0a87',
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: ['scanQRCode',]
          })
        })
        .catch(function (error) {
        })
    }
    //调用扫一扫
    this.scanCode = () => {
      console.log('调用扫一扫')
      let _this = this
        _this.scanQr('res')
      wx.scanQRCode({
        needResult: 1,
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          _this.scanQr(res)
        }
      })
    }
  }

  componentWillMount() {
    this.wxConfig()
  }
  render() {
    const styleComponent = {
      on: {
        display: this.state.isToggleOn ? 'block' : 'none'
      },
      in: {
        display: this.state.isToggleOn ? 'none' : 'block'
      }
    }
    return (
      <div className="home">
        <div className='banner'></div>
        <div className='content' >
          <div className='logo'></div>
          <div className='text'></div>
          <p className='scan'>点击扫一扫</p>
          <div className='QRcode' onTouchEnd={this.scanCode.bind(this)}></div>
          <p className='rules'
            onClick={this.rulesClickIn.bind(this)}
            style={styleComponent.on}>
            了解规则
          </p>
          <p className='rules drop'
            onClick={this.rulesClickOn.bind(this)}
            style={styleComponent.in}>
            了解规则>>
          </p>
        </div>
        <Rules status={this.state.isToggleOn} />
      </div>
    )
  }
}

export default Home