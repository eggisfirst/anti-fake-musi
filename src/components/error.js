import React, { Component } from 'react';
import '../scss/components/error.scss'
import Msgbox from './msgbox';
import { connect } from 'react-redux';
import { clickBtn } from '../action'

class Error extends Component {
  constructor (props) {
    super (props)
    this.state = {
    
    }
    this.clickMsg = () => {
      this.props.clickBtn(true)
    }
  }
  render () {
    const styleComponent = {
      show : {
        display : this.props.status ? 'none' : 'block'
      }
    }
    let errorPicClass,hClass
    if (this.props.brandType){
      errorPicClass = 'tips-picture'
      hClass = 'h1'
    }else {
      errorPicClass = 'tips-picture2'
      hClass = 'h2'
    }  
    return (
      <div className='error' style={styleComponent.show}>
        <div className={errorPicClass}></div>
        <h1 className={hClass}>您好，<span>暂时无法查询到</span>此商品</h1>
        <h1 className={hClass}>请联系400客服进行查询或<span className='takeback' onClick={this.clickMsg}>立即反馈</span></h1>
        <Msgbox/>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  clicks: store.clicks,
  brandType: store.brandType
})
const mapDispatchToProps = dispatch => ({
  clickBtn: (arr) => dispatch(clickBtn(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error)