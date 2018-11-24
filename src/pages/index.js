import React, { Component } from 'react'
import '../scss/index.scss'
import Variable from '../variable/variable'
//components
import Quality from '../components/quality'
import Error from '../components/error'

//redux
import { connect } from 'react-redux'
import { getCodeData } from '../action'
import { getStatus } from '../action'
import { getBarCode } from '../action'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorStatus:true
    }
    this.getData = () => {
      let url = Variable.testUrl(window.location.href)
      let code = Variable.GetQueryString('barCode',url)
      this.props.getBarCode(code)
        //判断参数的长度
        console.log(123,code.length)
      if(Variable.getString(url)){
        if (code.length >= 20 && code.length <= 50) {
          this.sendCode(code)
        } else{
          this.props.getStatus(false)
          this.setState({errorStatus:false})
        }
      }else{
        this.props.getStatus(false)
        this.setState({errorStatus:true})
      }
         
    }
    this.sendCode = (code) => {
      Variable.getCode(code)
        .then((res) => {
          console.log('有发请求')
          if (res.data.status == 1) {
            this.props.getStatus(true)
            this.props.getCodeData(res.data)
          } else if (res.data.status == 0) {
            this.props.getStatus(false)
            this.setState({errorStatus:false})
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  componentWillMount() {
    this.getData()
  }
  render() {
    return (
      <div className="index">
        <div className='banner'></div>
        <div className='content'>
          <div className='logo'></div>
          <p className='p-text'></p>
          <Quality status={this.props.statusChange} />
          <Error status={this.state.errorStatus} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  codeData: store.codeData,
  statusChange: store.statusChange,
  barCode: store.barCode
})
const mapDispatchToProps = dispatch => ({
  getCodeData: (arr) => dispatch(getCodeData(arr)),
  getStatus: (arr) => dispatch(getStatus(arr)),
  getBarCode: (arr) => dispatch(getBarCode(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
