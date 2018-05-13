import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import UserHomePage from '../pageContainers/UserHomePage'
import NewsletterShowPage from '../pageContainers/NewsletterShowPage'
import EntryShowPage from '../pageContainers/EntryShowPage'

const App = props => {

  return(
    <Router history={browserHistory} >
      <Route path='/' component={UserHomePage} />
      <Route path='/newsletters/:id' component={NewsletterShowPage} />
      <Route path='/newsletters/:newsletter_id/entries/:entry_id' component={EntryShowPage} />
    </Router>
  )
}

export default App
