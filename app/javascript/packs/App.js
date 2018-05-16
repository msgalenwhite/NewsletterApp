import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import UserHomePage from '../pageContainers/UserHomePage'
import NewsletterShowPage from '../pageContainers/NewsletterShowPage'
import InvitesAndSubscriptions from '../pageContainers/InvitesAndSubscriptions'

const App = props => {

  return(
    <Router history={browserHistory} >
      <Route path='/' component={UserHomePage} />
      <Route path='/newsletters/:id' component={NewsletterShowPage} />
      <Route path='/subscriptions/new' component={InvitesAndSubscriptions} />
    </Router>
  )
}

export default App
