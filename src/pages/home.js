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
    //微信配置
    this.wxConfig = () => {
      Variable.getTicket()
        .then(function (res) {
          console.log(res)
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
          console.log('error', error)
        })
    }
    //调用扫一扫
    this.scanCode = () => {
      console.log('调用扫一扫')
      wx.scanQRCode({
        needResult: 1,
        scanType: ['qrCode', 'barCode'],
        success: (res) => {
          let result = res.resultStr
          console.log(result)
          //判断是我们的网址
          if (Variable.isDerucci(result)) {
            //判断是否有参数
            console.log('是我们的网址')
            if (Variable.getString(result)) {
              console.log('有参数')
              let code = Variable.GetQueryString('barCode',result)
              console.log('参数是',code)
              this.props.history.push('/' + '?barCode=' + code)
            } else {
              console.log('没有参数')
              this.props.history.push('/' + '?barCode=')
            }
          } else {
            alert('该二维码不是防伪码')
          }
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