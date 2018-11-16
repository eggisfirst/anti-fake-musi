import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Loadable from 'react-loadable'

const MyLoadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>
  }
  else {
    return null;
  }
}

const [AsyncIndex,AsyncHome] = [
  Loadable({
    loader: () => import ('../pages/index'),
    loading: MyLoadingComponent,
    delay:300   //默认200
  },{
    loader: () => import ('../pages/home'),
    loading: MyLoadingComponent,
    delay:300   //默认200
  })
]



class Routes extends Component {
  render () {
    return (
      <Switch>
        <Route path="/" exact component={AsyncIndex}/>
        <Route path="/home" exact component={AsyncHome}/>
      </Switch>
    )
  }
}

export default Routes