import React, { Component } from 'react'

//js
import Variable from '../variable/variable'

//css
import '../scss/index.scss'
import bannerImg1 from '../images/bg.jpg'
import bannerImg2 from '../images/bg2.png'

//components
import Quality from '../components/quality'
import Error from '../components/error'
import { connect } from 'react-redux';
import { getCodeData } from '../action'
import { getBrandType } from '../action'


class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: true,
      brand: '',
      brandJudge: ''
    }
    //判断防伪码
    this.getData = () => {
      //获取防伪码code,判断是calia还是aimu，更换界面  
      let code = Variable.getQueryString('c')
      if (code == null) {
        code = Variable.getQueryString('a')
        this.props.getBrandType(false)
        this.setState({
          brand: '艾慕凯莎',
          brandJudge: false
        })
      } else {
        this.props.getBrandType(true)
        this.setState({
          brand: 'CALIA',
          brandJudge: true
      })
      }
      //获取数据
      Variable.sendCode(code)
        .then(function (res) {
          console.log('success', res)
          if (res.status == '1') {
            this.setState({ status: true })
            this.props.getCodeData(res)
          } else if (res.state == '0') {
            this.setState({ status: false })
          }
        })
        .catch(function (error) {
          console.log('error', error)
        })
    }
  }
  componentWillMount() {
    this.getData()
    console.log('组件即将挂载', this.props.brandType)
  }
  componentDidMount() {
    console.log('组件渲染完成',this.props)
  }
  componentWillReceiveProps (nextProps){
    console.log(111111,this.props.brandType)
  }
  render() {
    let styleIndex1 = {
      width:'100%',
      height:'100%',
      backgroundImage: `url(${bannerImg1})`
    }
    let styleIndex2 = {
      width:'100%',
      height:'100%',
      backgroundImage: `url(${bannerImg2})` 
    }
    let contentStyle1 = {
      paddingTop : '4.4vw'
    }
    let contentStyle2 = {
      paddingTop : '12.8vw'
    }
    let bannerClass,indexClass,contentClass,logoClass,pClass;
      if (this.state.brandJudge) {
        bannerClass = 'banner';
        indexClass = styleIndex1
        contentClass = contentStyle1
        logoClass = 'logo'
        pClass = 'p1'
      }else{
        bannerClass = ''
        indexClass = styleIndex2
        contentClass = contentStyle2
        logoClass = 'logo2'
        pClass = 'p2'
      }
    return (
      <div className="index" style= {indexClass} >
        <div className={bannerClass}></div>
        <div className='content' style={contentClass}>
          <div className={logoClass}></div>
          <p className={pClass}>{this.state.brand}正品查询平台</p>
          <Quality status={this.state.status} />
          <Error status={this.state.status}/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = store => ({
  codeData: store.codeData,
  brandType: store.brandType
})
const mapDispatchToProps = dispatch => ({
  getCodeData: (arr) => dispatch(getCodeData(arr)),
  getBrandType: (arr) => dispatch(getBrandType(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
