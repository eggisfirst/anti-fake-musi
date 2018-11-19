import React, { Component } from 'react';
import '../scss/components/quality.scss'
import Variable from '../variable/variable'
import { connect } from 'react-redux';
import { getCodeData } from '../action'

class Quality extends Component {
  constructor (props) {
    super(props)
    this.state = {
      arrayKey : [],
      status:false
    }
    //验证次数
    this.times = (count) => {
      if (count == 1) {
        return "首次"
      }else {
        return "第" + count + '次'
      }
    }
    //判断code是否存在
    this.judgeCode = () => {
      let code = Variable.getQueryString('barCode')
      if (code) {
        if (code.length > 20 && code.length < 50) {
          this.setState({
            status: true
          })
          this.setData()
        }  
      } else {
        this.setState({
          status: false
        })
      }
    }
    //处理数据，返回数组形式
    this.setData = () => {
      let code = '3DFAC448-75BD-48E5-A272-236389400FB5'
      let _this = this
      Variable.getCode(code)
        .then(function (res) {
          _this.props.getCodeData(res.data)
          let arr = []
          Object.keys(_this.props.codeData).forEach(item =>
            arr.push({key: item})
          )
          _this.setState({'arrayKey': arr})
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
  componentWillMount () {
    this.judgeCode()
  }
  render () {
    const styleComponent = {
      show : {
        display : this.state.status ? 'block' : 'none'
      }
    }    
    let data =  this.state.arrayKey.map((item, i) => 
      <li key={i}>
        <span>{
          (() => {
            let type
            switch(item.key) {
              case 'deliverNo':
                type = '出货单号'
                break;
              case 'moNo':
                type = '制号令'
                break;
              case 'goodsCode':
                type = '产品代号'
                break;
              case 'goodsName':
                type = '产品名称'
                break;
              case 'pdName':
                type = '生产部门'
                break;
              case 'scanName':
                type = '出货扫描人'
                break;
              case 'goodsSpec':
                type = '产品规格'
                break;
            default:
              return ''
            }
            return type
          })()
        }</span>
        <span>{
          (() => {
            let type
            switch(item.key){
              case 'deliverNo':
                type = this.props.codeData.deliverNo
                break;
              case 'moNo':
                type = this.props.codeData.moNo
                break;
              case 'goodsCode':
                type = this.props.codeData.goodsCode
                break;
              case 'goodsName':
                type = this.props.codeData.goodsName
                break;
              case 'pdName':
                type = this.props.codeData.pdName
                break;
              case 'scanName':
                type = this.props.codeData.scanName
                break;
              case 'goodsSpec':
                type = this.props.codeData.goodsSpec
                break;
            default:
              return ''
            }
            return type
          })()
        }</span>
      </li> 
    )
    return (
      <div className='quality' style={styleComponent.show}>
        <div className='tips-picture'></div>
        <h1 className='h-text'>
          您好，您所查询的商品是
          <span>{this.times(this.props.codeData.count)}</span>验证
        </h1>
        <h1 className='h-text'>
          您所购买的商品是慕思品牌的<span>正品</span>，请放心使用!
        </h1>
        <div className='details'>
          <div className='title'>
            <div className='title-picture'></div>
            <span>详细信息</span>
          </div>
          <ul>
           {data}
          </ul>
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = store => ({
  codeData: store.codeData
})
const mapDispatchToProps = dispatch => ({
  getCodeData: (arr) => dispatch(getCodeData(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quality)