import React, { Component } from 'react';
import '../scss/components/tips.scss'
import { connect } from 'react-redux';
import { tips } from '../action'

class Tips extends Component {
  constructor (props) {
    super (props) 
    this.state = {
      
    }
  }
  componentDidMount () {
    //3s后提示自动消失
    this.timerID = setInterval(
      () => this.props.tips(false),
      3000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render () {
    const styleComponent = {
      show : {
        display : this.props.todos? 'block' : 'none'
      }
    }
    return (
      <div className='tips' style={styleComponent.show}>
        <div className='bg'></div>
        <div className='tips-box'>
          <div className='check-icon'></div>
          <h3>提交成功</h3>
          <h3>请耐心等候客服回访</h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  todos: store.todos
})
const mapDispatchToProps = dispatch => ({
  tips: (arr) => dispatch(tips(arr))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tips)