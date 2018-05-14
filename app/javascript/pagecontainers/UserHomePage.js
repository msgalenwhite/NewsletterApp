import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import HeaderLinkBar from '../headerComponents/HeaderLinkBar'
import NewsletterList from '../lists/NewsletterList'

class UserHomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      flashMessage: null
    }
    this.setMessage = this.setMessage.bind(this)
  }

  setMessage(message) {
    this.setState({ flashMessage: message })
  }

  render() {
    return(
      <div className='page'>
        <HeaderBar
          title='Your Subscriptions'
          flashMessage={this.state.flashMessage}/>
        <HeaderLinkBar />
        <NewsletterList
          setMessage={this.setMessage} />
      </div>
    )
  }
}

export default UserHomePage
