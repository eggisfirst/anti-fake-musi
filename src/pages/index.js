import React, { Component } from 'react'
import '../scss/index.scss'
import Variable from '../variable/variable'
//components
import Quality from '../components/quality'
import Error from '../components/error'

//redux
import { connect } from 'react-redux'
import { getBrandType } from '../action'
import { getCodeData } from '../action'
import { getStatus } from '../action'
import { getBarCode } from '../action'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.getData = () => {
      let code = Variable.getQueryString('barCode')
        //判断参数的长度
        if (code.length >= 20 && code.length <= 50) {
          this.sendCode(code)
        } else{
          this.props.getStatus(false)
        } 
    }
    this.sendCode = (code) => {
      Variable.getCode(code)
        .then((res) => {
          if (res.data.status == 1) {
            this.props.getStatus(true)
            this.props.getCodeData(res.data)
          } else if (res.data.status == 0) {
            this.props.getStatus(false)
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
        <div className='content'>
          <div className='logo'></div>
          <p className='p-text'></p>
          <Quality status={this.props.statusChange} />
          <Error status={this.props.statusChange} />
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
