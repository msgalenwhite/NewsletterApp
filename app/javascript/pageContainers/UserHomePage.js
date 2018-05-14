import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import NewsletterList from '../lists/NewsletterList'
import HomeSideBar from '../headerComponents/HomeSideBar'

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
        <div className='row'>
          <div className='columns small-2'>
            <HomeSideBar />
          </div>
          <div className='columns small-10'>
            <NewsletterList
              setMessage={this.setMessage} />
          </div>
        </div>
      </div>
    )
  }
}

export default UserHomePage
