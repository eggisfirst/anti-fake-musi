import React, { Component } from 'react'
import axios from 'axios'
//js
import Variable from '../variable/variable'

//css
import '../scss/index.scss'


//components
import Quality from '../components/quality'
import Error from '../components/error'
import { connect } from 'react-redux';
import { getCodeData } from '../action'



class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: "",
      brandJudge: '',
      codedata: ''
    }
    //判断防伪码
    this.getData = () => {
      //获取防伪码code,判断是calia还是aimu，更换界面  
      // let code = Variable.getQueryString('c')
      // if (code == null) {
      //   code = Variable.getQueryString('a')
      //  
      //   this.setState({
      //     
      //     brandJudge: false
      //   })
      // } else {
      // 
      //   this.setState({
      //   
      //     brandJudge: true
      // })
      // }
      //获取数据
      let code = '3DFAC448-75BD-48E5-A272-236389400FB5'
      Variable.getCode(code)
        .then(function (res) {
          console.log(22222, res)
        })
        .catch(function(error) {
          console.log(error)
        })

    }
  }
  componentWillMount() {
    this.getData()
    // console.log('组件即将挂载', this.props.brandType)
  }
  componentDidMount() {

    // console.log('组件渲染完成',this.props)
  }
  componentWillReceiveProps(nextProps) {
    // console.log(111111,this.props.brandType)
  }
  render() {
    return (
      <div className="index">
        <div className='content'>
          <div className='logo'></div>
          <p className='p-text'></p>
          <Quality status={this.state.status} />
          <Error status={this.state.status} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = store => ({
  codeData: store.codeData

})
const mapDispatchToProps = dispatch => ({
  getCodeData: (arr) => dispatch(getCodeData(arr)),

})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
