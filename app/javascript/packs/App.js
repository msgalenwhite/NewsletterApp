import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import UserHomePage from '../pagecontainers/UserHomePage'
import NewsletterShowPage from '../pagecontainers/NewsletterShowPage'
import EntryShowPage from '../pagecontainers/EntryShowPage'

const App = props => {

  return(
    <Router history={browserHistory} >
      <Route path='/' component={UserHomePage} />
      <Route path='/newsletters/:newsletter_id/entries/:entry_id' component={EntryShowPage} />
      <Route path='/newsletters/:id' component={NewsletterShowPage} />
    </Router>
  )
}

export default App
