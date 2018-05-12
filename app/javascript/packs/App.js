import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import UserHomePage from '../pagecontainers/UserHomePage'
import NewsletterShowPage from '../pagecontainers/NewsletterShowPage'

const App = props => {

  return(
    <Router history={browserHistory} >
      <Route path='/' component={UserHomePage} />
      <Route path='/newsletters/:id' component={NewsletterShowPage} />
    </Router>
  )
}

export default App
