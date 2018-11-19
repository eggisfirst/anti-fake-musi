import React, { Component } from 'react'
import '../scss/index.scss'
//components
import Quality from '../components/quality'
import Error from '../components/error'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {
    
  }
  render() {
    return (
      <div className="index">
        <div className='content'>
          <div className='logo'></div>
          <p className='p-text'></p>
          <Quality/>
          <Error />
        </div>
      </div>
    )
  }
}

export default Index
