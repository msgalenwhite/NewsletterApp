import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import UserHomePage from '../containers/UserHomePage'

const App = props => {

  return(
    <Router history={browserHistory} >
      <Route path='/' component={UserHomePage} />
    </Router>
  )
}

export default App
