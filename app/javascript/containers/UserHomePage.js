import React, {Component} from 'react'
import NewsletterList from '../components/NewsletterList'

class UserHomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      foundedNewsletters: [],
      userInfo: {},
      newsletterNeedingEntry: null,
      selectedNewsletter: null,
      flashMessage: null
    }
    this.displayOrHideForm = this.displayOrHideForm.bind(this)
    this.displayOrHideNewsletterInfo = this.displayOrHideNewsletterInfo.bind(this)
    this.setMessage = this.setMessage.bind(this)
  }

  displayOrHideForm(id) {
    if (id === this.state.newsletterNeedingEntry) {
      this.setState({ newsletterNeedingEntry: null })
    } else {
      this.setState({ newsletterNeedingEntry: id })
    }
  }

  displayOrHideNewsletterInfo(id) {
    if (id === this.state.selectedNewsletter) {
      this.setState({
        selectedNewsletter: null,
        newsletterNeedingEntry: null
      })
    } else {
      this.setState({ selectedNewsletter: id })
    }
  }

  setMessage(message) {
    let id = this.state.newsletterNeedingEntry;
    let letter = this.state.selectedNewsletter
    if (message.includes("Success!")) {
      id = null
      letter = null
    }
    this.setState({
      flashMessage: message,
      newsletterNeedingEntry: id,
      selectedNewsletter: letter
    })
  }

  componentDidMount() {
    fetch("/api/v1/newsletters.json", {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
      .then ( response => {
        if ( response.ok ) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw(error);
        }
      })
      .then ( response => response.json() )
      .then ( response => {
        const newsletters = response
        const userInfo = response[0]["founder"]

        this.setState({
          foundedNewsletters: newsletters,
          userInfo: userInfo
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {
    let message;

    if (this.state.flashMessage) {
      message =
        <div data-alert className="alert-box">
          {this.state.flashMessage}
          <a href="#" className="close">&times;</a>
        </div>
    }

    return(
      <div>
        {message}
        <h1 className='page-header'>Newsletter Home Page</h1>
        <a href='/newsletters/new'>Create a Newsletter</a>

        <h3>Founded Newsletters</h3>
        <NewsletterList
          newsletters={this.state.foundedNewsletters}
          showForm={this.displayOrHideForm}
          newsletterNeedingEntry={this.state.newsletterNeedingEntry}
          userId={this.state.userInfo["id"]}
          setMessage={this.setMessage}
          displayOrHideNewsletterInfo={this.displayOrHideNewsletterInfo}
          selectedNewsletter={this.state.selectedNewsletter}
        />
      </div>
    )
  }
}

export default UserHomePage
