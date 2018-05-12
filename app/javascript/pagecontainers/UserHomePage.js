import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import NewsletterList from '../lists/NewsletterList'

class UserHomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      // subscribedNewsletters: [],
      // newsletterNeedingEntry: null,
      // selectedNewsletter: null,
      flashMessage: null
    }
    // this.displayOrHideForm = this.displayOrHideForm.bind(this)
    // this.displayOrHideNewsletterInfo = this.displayOrHideNewsletterInfo.bind(this)
    this.setMessage = this.setMessage.bind(this)
  }



  setMessage(message) {
    this.setState({ flashMessage: message })
  }

  // displayOrHideForm(id) {
  //   if (id === this.state.newsletterNeedingEntry) {
  //     this.setState({ newsletterNeedingEntry: null })
  //   } else {
  //     this.setState({ newsletterNeedingEntry: id })
  //   }
  // }
  //
  // displayOrHideNewsletterInfo(id) {
  //   if (id === this.state.selectedNewsletter) {
  //     this.setState({
  //       selectedNewsletter: null,
  //       newsletterNeedingEntry: null
  //     })
  //   } else {
  //     this.setState({ selectedNewsletter: id })
  //   }
  // }
  //
  // setMessage(message) {
  //   let id = this.state.newsletterNeedingEntry;
  //   let letter = this.state.selectedNewsletter
  //   if (message.includes("Success!")) {
  //     id = null
  //     letter = null
  //   }
  //   this.setState({
  //     flashMessage: message,
  //     newsletterNeedingEntry: id,
  //     selectedNewsletter: letter
  //   })
  // }



  render() {
    return(
      <div className='page'>
        <HeaderBar
          title='Your Subscriptions'
          flashMessage={this.state.flashMessage}/>
        <NewsletterList
          newsletters={this.state.newsletters}
          setMessage={this.setMessage} />
      </div>
    )
  }
}

export default UserHomePage
