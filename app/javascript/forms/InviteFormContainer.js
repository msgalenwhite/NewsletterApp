import React, { Component } from 'react'

class InviteFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      newName: '',
      invitedEmails: [],
      errorMessage: null,
      showCode: false
    }
    this.addToInvites = this.addToInvites.bind(this)
    this.clearEmails = this.clearEmails.bind(this)
    this.formIsComplete = this.formIsComplete.bind(this)
    this.generateEmailTags = this.generateEmailTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendEmails = this.sendEmails.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
  }

  addToInvites() {
    if (this.formIsComplete()) {
      const currentInvites = this.state.invitedEmails
      const newInvite = {
        email: this.state.newEmail,
        name: this.state.newName
      }

      this.setState({
        invitedEmails: currentInvites.concat(newInvite),
        newEmail: '',
        newName: '',
        errorMessage: null
      })
    }
  }

  clearEmails() {
    this.setState({
      invitedEmails: []
    })
  }

  createFormPayload() {
    const formPayload = {
      emails: this.state.invitedEmails,
      newsletterId: this.props.newsletterId
    }
    return formPayload
  }

  formIsComplete() {
    if (!this.validateEmail(this.state.newEmail)) {
      this.setState({
        errorMessage: 'Please enter a valid email.'
      })
      return false

    } else if (this.state.newEmail === '' ||
      this.state.newName === '') {
      this.setState({
        errorMessage: 'Please enter an email and a name'
      })
      return false

    } else {
      this.setState({
        errorMessage: null
      })
      return true
    }
  }

  generateEmailTags() {
    const emailComponents = this.state.invitedEmails.map((emailObject) => {
      return (
        <div key = {emailObject.email}>
        {emailObject.name} ( {emailObject.email} ) </div>
      )
    })
    return emailComponents
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendEmails() {
    const formPayload = this.createFormPayload()

    fetch("/api/v1/invitations.json", {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(formPayload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw (error);
        }
      })
      .then(response => response.json())
      .then(response => {
        if (response.errors.length == 0) {
          this.setState({
            invitedEmails: [],
            newEmail: '',
            newName: '',
            showCode: true
          })

          this.props.setMessage('Your emails were successfully sent!')
          this.props.showFormFunc()
        } else {
          let errors = ''

          response.errors.forEach((errorObject) => {
            if (errorObject.length > 0) {
              errors += `${errorObject.name}: ${errorObject.errors.join(", and ")}`
            }
          })

          this.setState({
            errorMessage: `I'm sorry, your emails were unable to be sent.\n\n${errors}`
          })
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  validateEmail(email) {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return regex.test(email.toLowerCase())
  }

  render() {
    const emailComponents = this.generateEmailTags()

    let renderedComponent;

    if (this.showCode) {
      renderedComponent =
      <div className='center'>
        <h3 className='sub-header'>
          You could share this QR code, too:
        </h3>
        <QRCode
          value={`https://familynewsletter.herokuapp.com/invitation/${props.newsletterId}`}
          renderAs='canvas'
          size='128'
          bgColor='#FFFFFF'
          fgColor='#000000'
        />
      </div>
    } else {
      renderedComponent =
      <div>
        <h3 className='sub-header center'> Invites to Send: </h3>
          {emailComponents}
        <div className='center' >
          <button onClick={this.clearEmails}
          className='general-button spaced' >
            Clear
          </button>
        </div>
      </div>
    }

    return (
      <div>
        <div className='row data-equalizer'>
          <div className='columns small-12 obligatory-empty-div data-equalizer-watch'></div>
          <div className='columns small-12 medium-6 data-equalizer-watch'>
            <h3 className='sub-header center'>Invite Someone New</h3>
            <p>{this.state.errorMessage}</p>
            <div className='field'>
              <h5>Email</h5>
              <input
                type='email'
                className='email-input'
                name='newEmail'
                value={this.state.newEmail}
                onChange={this.handleChange}
              />
            </div>
            <div className='field'>
              <h5>Name</h5>
              <input
                type='text'
                className='email-name-input'
                name='newName'
                value={this.state.newName}
                onChange={this.handleChange}
              />
            </div>
            <div className='center'>
                <button className='general-button' onClick={this.addToInvites}>Add</button>
            </div>
          </div>
          <div className='columns small-12 medium-6 data-equalizer-watch'>
            {renderedComponent}
          </div>
        </div>
        <div className='row center'>
            <h3 className='sub-header'>Thought of everyone?</h3>
            <button className='general-button' onClick={this.sendEmails}>Send the Invites!</button>
        </div>
      </div>
    )
  }
}

export default InviteFormContainer
