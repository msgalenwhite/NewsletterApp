import React, {Component} from 'react'
import EmailList from '../inviteListComponents/EmailList'
import InviteForm from '../forms/InviteForm'
import PopUp from '../inviteListComponents/PopUp'

class InviteFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      newName: '',
      invitedEmails: [],
      errorMessage: null
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
            newName: ''
          })

          this.props.setMessage('Your emails were successfully sent!')

          $(document).ready(function() {
            setTimeout(function(){
              $("#myModal").foundation('reveal', 'open');
            }, 0);
          });

        } else {
          let errors = ''

          response.errors.forEach((errorObject) => {
            if (errorObject.length > 0) {
              errors += `${errorObject.name}: ${errorObject.errors.join(", and ")}`
            }
          })

          if (errors = ''){
            errors = "It's possible that an invitation has already been sent."
          }

          this.setState({
            errorMessage: `I'm sorry, your emails were unable to be sent.\n\n${errors}`
          })
        }
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`)
        this.setState({
          errorMessage: "Emails could not be sent.  Please double-check the addresses and try again."
        })
      });
  }

  validateEmail(email) {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return regex.test(email.toLowerCase())
  }

  render() {
    const emailComponents = this.generateEmailTags()

    const closeModal = () => {
      this.props.showFormFunc()
      window.location.href = "/"
    }

    return(
      <div>
        <div className='row data-equalizer'>
          <div className='columns small-12 obligatory-empty-div data-equalizer-watch'></div>
          <div className='columns small-12 medium-6 data-equalizer-watch'>
            <h3 className='sub-header center'>Invite Someone New</h3>
            <p>{this.state.errorMessage}</p>
            <InviteForm
              emailValue={this.state.newEmail}
              nameValue={this.state.newName}
              handleChange={this.handleChange}
            />
            <div className='center'>
                <button className='general-button' onClick={this.addToInvites}>Add</button>
            </div>
          </div>
          <div className='columns small-12 medium-6 data-equalizer-watch'>
            <EmailList
              clearEmails={this.clearEmails}
              emailComponents={emailComponents}
            />
          </div>
        </div>
        <div className='row center'>
          <h3 className='sub-header'>
            Thought of everyone?
          </h3>
          <button
            className='general-button'
            onClick={this.sendEmails}
            data-reveal-id="myModal">
              Send the Invites!
          </button>
          <PopUp
            closeFunc={closeModal}
          />
        </div>
      </div>
    )
  }
}

export default InviteFormContainer
