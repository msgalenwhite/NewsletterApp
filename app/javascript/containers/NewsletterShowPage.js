import React, {Component} from 'react'
import InviteFormContainer from './InviteFormContainer'

class NewsletterShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      photo: {},
      founderName: '',
      isFounder: null,
      showInviteForm: false,
      invitedEmails: [],
      newEmail: '',
      newName: '',
      flashMessage: null
    }
    this.addToInvites = this.addToInvites.bind(this)
    this.founderOptions = this.founderOptions.bind(this)
    this.formIsComplete = this.formIsComplete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendEmails = this.sendEmails.bind(this)
    this.showInviteForm = this.showInviteForm.bind(this)
  }

  addToInvites(){
    if (this.formIsComplete()){
      const currentInvites = this.state.invitedEmails
      const newInvite = {
        email: this.state.newEmail,
        name: this.state.newName
      }

      this.setState({
        invitedEmails: currentInvites.concat(newInvite),
        newEmail: '',
        newName: ''
      })
    }
  }

  componentDidMount() {
    const newsletterId = parseInt(this.props.params["id"])

    fetch(`/api/v1/newsletters/${newsletterId}.json`, {
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
        this.setState({
          title: response["newsletter_data"]["title"],
          description: response["newsletter_data"]["description"],
          photo: response["newsletter_data"]["thumb_photo"],
          founderName: response["newsletter_data"]["founder_name"],
          isFounder: response["is_founder"]
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  createFormPayload() {
    const formPayload = {
      emails: this.state.invitedEmails,
      newsletterId: parseInt(this.props.params["id"])
    }
    return formPayload
  }

  formIsComplete() {
    if (this.state.newEmail === '' || this.state.newName === '') {
      this.setState({ flashMessage: 'Please enter an email and a name' })
      return false
    } else {
      this.setState({ flashMessage: null })
      return true
    }
  }

  founderOptions() {
    const handleClick = () => { this.showInviteForm() }
    let returnedComponent;

    if (this.state.isFounder && !this.state.showInviteForm) {
      returnedComponent =
        <button
          className='general-button'
          onClick={handleClick}
        >
          Send Invites
        </button>

    } else if (!this.state.isFounder){
      returnedComponent = <h4>Founded by: {this.state.founderName}</h4>
    } else {
      returnedComponent =
        <InviteFormContainer
          hideMe={handleClick}
          invitedEmails={this.state.invitedEmails}
          currentEmail={this.state.newEmail}
          currentName={this.state.newName}
          handleChange={this.handleChange}
          addEmail={this.addToInvites}
          handleSubmit={this.sendEmails}
        />

    }
    return returnedComponent
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  showInviteForm() {
    this.setState({ showInviteForm: !this.state.showInviteForm })
  }

  sendEmails() {
    const formPayload = this.createFormPayload()

    fetch("/api/v1/invitations.json", {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
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
        if (response["error"]) {
          this.props.setMessage(response["error"])
        } else {
          this.props.setMessage("Success!")
        }
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {
    const founderTag = this.founderOptions()
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
        <div className='show-container '>
          {message}
          <h1 className='page-header'>{this.state.title}</h1>
          <div className='row' data-equalizer>
            <div className='columns small-6' data-equalizer-watch>
              <img className='news-photo' src={this.state.photo.url} alt='Newsletter Photo' />
            </div>
            <div className='columns small-6' data-equalizer-watch>
              <p className='news-desc'>{this.state.description}</p>
            </div>
          </div>
        </div>
        <div className='row invites-div'>
          {founderTag}
        </div>
      </div>
    )
  }
}

export default NewsletterShowPage
