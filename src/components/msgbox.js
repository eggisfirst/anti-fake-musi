import React, { Component } from 'react';
import Variable from '../variable/variable'
import '../scss/components/msgbox.scss'
import axios from 'axios'
import { connect } from 'react-redux';
import { clickBtn } from '../action'
import { tips } from '../action'
import { submitSuc } from '../action'

class Msgbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneTips: '',
      inpNumVal: '',
      inpNameVal: '',
      close1:'',
      close2:'',
      key: true
     
    }
   
    //获取手机号码
    this.handelNumChange = (e) => {
      this.setState({
        inpNumVal: e.target.value,
        phoneTips: false
      })
    }
    //获取姓名
    this.handelNameChange = (e) => {
      this.setState({inpNameVal: e.target.value})
    }
    //清空input框
    this.clearBtn1 = () => {
      console.log('clickevent')
      this.setState({inpNameVal: ''})
    }
    this.clearBtn2 = () => {
      this.setState({
        inpNumVal: '',
        phoneTips: false
      })
    }
    //光标聚焦
    this.focusInput = () => {
      this.setState({close1 : true})
    }
    this.focusInput1 = () => {
      this.setState({close2 : true})
    }
    this.blurInput = () => {
      this.setState({close1 : false})
    }
    this.blurInput1 = () => {
      this.setState({close2 : false})
    }
    //关闭反馈弹框
    this.closeBtn = () => {
      this.props.clickBtn(false)
    }
    //提交
    this.submitMsg = () => {
      let phoneNum = this.state.inpNumVal
      let name = this.state.inpNameVal
      let isName = Variable.testName(name)
      let isPhoneNum = Variable.testPhone(phoneNum)
      let code;
      if (this.props.barCode === ''){
        code = '防伪码为空'
      }else {
        code = this.props.barCode
      }
      //判断名字格式
      if (!isName) {
        alert('请填写真实姓名')
      } else {
        //判断手机号码格式
        if (isPhoneNum) {
          if (this.state.key) {
            axios({
              method: 'post',
              url: `${Variable.path}saveAntiFakeVerify`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              params: {
                securityCode:code,
                phone:phoneNum,
                username:name
              },
            })
              .then((res) => {
                if(res.data.status == 1) {
                  console.log('提交成功', res)
                  this.props.submitSuc(false)
                  this.setState({ key: false })
                  this.props.clickBtn(false)
                  this.props.tips(true)
                }
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }
        else {
          this.setState({
            phoneTips: true
          })
        }
      }
    }
  }

  render() {
    const styleComponent = {
      show: {
        display: this.props.clicks ? 'block' : 'none'
      },
      phoneTips: {
        display: this.state.phoneTips ? 'block' : 'none'
      },
      clearBtn1: {
        display: this.state.close1 ? 'block' : 'none'
      },
      clearBtn2: {
        display: this.state.close2 ? 'block' : 'none'
      }
    }
    return (
      <div className='msgbox' style={(styleComponent.show)}  >
        <div className='bg'></div>
        <div className='box'>
          <h2>为协助客服快速处理，请提供以下信息</h2>
          <div className='close-icon' onClick={this.closeBtn}></div>
          <div className='detail'>
            <div className='name'>
              <div className='name-icon'></div>
              <input type='text' placeholder='请填写姓名'
                onChange = {this.handelNameChange.bind(this)}
                onFocus = {this.focusInput}
                onBlur = {this.blurInput}
                value= {this.state.inpNameVal}
                maxLength='10' />
              <div className='clear'
                onTouchEnd = {this.clearBtn1}
                style = {styleComponent.clearBtn1}>
              </div>
            </div>
            <div className='phone'>
              <div className='phone-icon'></div>
              <input type='number' placeholder='请输入手机号码'
                onChange={this.handelNumChange.bind(this)}
                onFocus={this.focusInput1.bind(this)}
                onBlur={this.blurInput1.bind(this)}
                value={this.state.inpNumVal} />
              <div className='clear'
                onTouchEnd={this.clearBtn2}
                style={styleComponent.clearBtn2}>
              </div>
            </div>
            <div className='tips' style={styleComponent.phoneTips}>
              您输入的号码有误，请重新输入
            </div>
          </div>
          <input type='submit' value='提交' className='submit' onClick={this.submitMsg.bind(this)} />
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = store => ({
  clicks: store.clicks,
  todos: store.todos,
  submitSuc: store.submitSuc,
  barCode : store.barCode
})
const mapDispatchToProps = dispatch => ({
  clickBtn: (arr) => dispatch(clickBtn(arr)),
  tips: (arr) => dispatch(tips(arr)),
  submitSuc: (arr) => dispatch(submitSuc(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Msgbox)