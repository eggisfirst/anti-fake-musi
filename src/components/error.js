import React, { Component } from 'react';
import '../scss/components/error.scss'
import Msgbox from './msgbox';
import { connect } from 'react-redux';
import { clickBtn } from '../action'
import { submitSuc } from '../action'
import { tips } from '../action'
import Tips from './tips';

class Error extends Component {
  constructor (props) {
    super (props)
    this.state = {
  
    }
    this.clickMsg = () => {
      if (this.props.submitTips) {
        this.props.clickBtn(true)
      }else {
        this.props.clickBtn(false)
        this.props.tips(true)
      }
    }
  
  }
  componentWillMount () {
    this.props.submitSuc(true)
    this.props.tips(false)
  }
  render () {
    const styleComponent = {
      show : {
        display : this.props.status ? 'none' : 'block'
      }
    }  
    return (
      <div className='error' style={styleComponent.show}>
        <div className='tips-picture'></div>
        <h1 className='h-text'><span>暂时无法查询</span>到此商品</h1>
        <h1 className='h-text'>请联系400-777-0077客服进行查询或</h1>
        <h1 className='h-text'>
          <span className='takeback' onClick={this.clickMsg}>立即反馈</span>
        </h1>
        <Msgbox/>
        <Tips />
      </div>
    )
  }
}

const mapStateToProps = store => ({
  clicks: store.clicks,
  brandType: store.brandType,
  submitTips: store.submitTips
})
const mapDispatchToProps = dispatch => ({
  clickBtn: (arr) => dispatch(clickBtn(arr)),
  submitSuc: (arr) => dispatch(submitSuc(arr)),
  tips: (arr) => dispatch(tips(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error)