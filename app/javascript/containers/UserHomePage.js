import React, {Component} from 'react'
import NewsletterList from '../components/NewsletterList'

class UserHomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      foundedNewsletters: [],
      userInfo: {},
      selectedNewsletter: null,
      displayMessage: null
    }
    this.displayOrHideForm = this.displayOrHideForm.bind(this)
    this.setMessage = this.setMessage.bind(this)
  }

  displayOrHideForm(id) {
    if (id === this.state.selectedNewsletter) {
      this.setState({ selectedNewsletter: null })
    } else {
      this.setState({ selectedNewsletter: id })
    }
  }

  setMessage(message) {
    let id = this.state.selectedNewsletter;
    if (message.includes("Success!")) {
      id = null
    }
    this.setState({
      displayMessage: message,
      selectedNewsletter: id 
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

    if (this.state.displayMessage) {
      message =
        <div data-alert className="alert-box">
          {this.state.displayMessage}
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
          selectedNewsletter={this.state.selectedNewsletter}
          userId={this.state.userInfo["id"]}
          setMessage={this.setMessage}
        />
      </div>
    )
  }
}

export default UserHomePage
