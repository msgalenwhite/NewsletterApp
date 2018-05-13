import React, {Component} from 'react'

class InviteFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      newEmail: '',
      newName: '',
      invitedEmails: []
    }
    this.addToInvites = this.addToInvites.bind(this)
    this.formIsComplete = this.formIsComplete.bind(this)
    this.generateEmailTags = this.generateEmailTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendEmails = this.sendEmails.bind(this)
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

  generateEmailTags() {
    const emailComponents = this.state.invitedEmails.map((emailObject) => {
      return (
        <li key={emailObject.email}>{emailObject.name} ({emailObject.email})</li>
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
            invitedEmails: [],
            newEmail: '',
            newName: ''
          })

          this.props.setMessage('Your emails were successfully sent!')
        } else {
          let errors;

          // THIS IS WRONG:

          // Object.entries(response.errors).forEach((miniArray) => {
          //   errors += `\n${miniArray[0]}: ${miniArray[1]}`
          // })
          this.props.setMessage(`I'm sorry, your emails were unable to be sent.\n\n${errors}`)
        }
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  validateEmail(email) {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return regex.test(email.toLowerCase())
  }

  render() {
    const emailComponents = this.generateEmailTags()


    return(
      <div>
        <div className='row data-equalizer'>
          <div className='columns small-12 obligatory-empty-div data-equalizer-watch'></div>
          <div className='columns small-12 medium-6 data-equalizer-watch'>
            <h3 className='sub-header center'>Invite Someone New</h3>
            <div className='field'>
              <h5>Email</h5>
              <input
                type='email'
                className='email-input'
                name='newEmail'
                value={this.state.currentEmail}
                onChange={this.handleChange}
              />
            </div>
            <div className='field'>
              <h5>Name</h5>
              <input
                type='text'
                className='email-name-input'
                name='newName'
                value={this.state.currentName}
                onChange={this.handleChange}
              />
            </div>
            <div className='center'>
                <button className='general-button' onClick={this.addEmail}>Add</button>
            </div>
          </div>
          <div className='columns small-12 medium-6 data-equalizer-watch'>
            <h3 className='sub-header center'>Invites to Send:</h3>
            {emailComponents}
          </div>
        </div>
        <div className='row center'>
            <h3 className='sub-header'>Thought of everyone?</h3>
            <button className='general-button' onClick={this.submitEmails}>Send the Invites!</button>
        </div>
      </div>
    )
  }
}

export default InviteFormContainer
