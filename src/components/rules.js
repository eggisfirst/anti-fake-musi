import React, { Component } from 'react'
import '../scss/components/rules.scss'

class Rules extends Component {
  constructor(props){
    super(props)
    this.state = {

    } 
  }
   render () {
     const show = {
      display : this.props.status ? 'block' : 'none'
     }
    return(
      <div className='rules' style={show}>
        <ul>
          <li>
            <div className='icon'>
              <div className='icon1'></div>
              <div className='down'></div>
            </div>
            <div className='text textFirst'>
              <p className='p1'><span>1.</span>获取真品码</p>
              <p className='p2'>寻找所购买商品内包装的防伪标签，获取正品查询码。</p>
            </div>
          </li>
          <li>
            <div className='icon'>
              <div className='icon2'></div>
              <div className='down'></div>
            </div>
            <div className='text'>
              <p className='p1'><span>2.</span>查询结果</p>
              <p className='p2'>通过微信扫一扫二维码进行查询验证。</p>
            </div>
          </li>
          <li>
            <div className='icon'>
              <div className='icon3'></div>
            </div>
            <div className='text'>
              <p className='p1'><span>3.</span>获得结果</p>
              <p className='p2'>结果一：该正品查询码为第N次验证，为正品；</p>
              <p className='p2'>结果二：该正品查询码暂时无法查询，请咨询客服。</p>
            </div>
          </li>
        </ul>
      </div>
    )
   }
}

export default Rules