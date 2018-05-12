import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import NewsletterDetails from '../newsletterShowComponents/NewsletterDetails'

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
      flashMessage: null,
      newsletterId: null
    }
    this.addToInvites = this.addToInvites.bind(this)
    this.founderOptions = this.founderOptions.bind(this)
    this.formIsComplete = this.formIsComplete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendEmails = this.sendEmails.bind(this)
    this.showInviteForm = this.showInviteForm.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
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
          isFounder: response["is_founder"],
          newsletterId: newsletterId
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
    if (
      !this.validateEmail(this.state.newEmail)
    ) {
      this.setState({flashMessage: 'Please enter a valid email.'})
      return false
    } else if (this.state.newEmail === '' ||
    this.state.newName === '') {
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
          newsletterId={this.state.newsletterId}
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
        if (response.errors.length == 0) {
          this.setState({
            flashMessage: "Your emails were successfully sent!",
            showInviteForm: false,
            invitedEmails: [],
            newEmail: '',
            newName: ''
          })
        } else {
          let errors;

          Object.entries(response.errors).forEach((miniArray) => {
            errors += `\n${miniArray[0]}: ${miniArray[1]}`
          })

          this.setState({
            flashMessage: `I'm sorry, your emails were unable to be sent.\n\n${errors}`
          })
        }
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  validateEmail(email) {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return regex.test(email.toLowerCase())
  }

  render() {
    const founderTag = this.founderOptions()
    let moreInfo;

    if (!this.state.showInviteForm) {
      moreInfo =
        <NewsletterDetails
          imageSrc={this.state.photo.url}
          description={this.state.description}
          founderName={this.state.founderName}
          isFounder={this.state.isFounder}
        />
    }

    return(
      <div className='page'>
        <HeaderBar
          title={this.state.title}
          flashMessage={this.state.flashMessage}
        />
          {moreInfo}
        <div className='row invites-div'>
          {founderTag}
        </div>
      </div>
    )
  }
}

export default NewsletterShowPage