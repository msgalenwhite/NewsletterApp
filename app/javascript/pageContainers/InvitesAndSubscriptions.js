import React, {Component} from 'react'
import Redirect from 'react-router'
import InviteList from '../lists/InviteList'
import HeaderBar from '../headerComponents/HeaderBar'

class InvitesAndSubscriptions extends Component {
  constructor(props){
    super(props);
    this.state = {
      inviteInfo: [],
      selectedInvites: [],
      flashMessage: null,
      continueToHome: false
    }
    this.addToSelectedInvites = this.addToSelectedInvites.bind(this)
    this.sendInvites = this.sendInvites.bind(this)
  }

  addToSelectedInvites(newsletterId) {
    if (!this.state.selectedInvites.includes(newsletterId)) {
      this.setState({ selectedInvites: this.state.selectedInvites.concat(newsletterId) })
    }
  }

  componentDidMount() {
    fetch("/api/v1/subscriptions.json", {
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
        this.setState({ inviteInfo: response })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  sendInvites() {
    const invitesToSend = this.state.selectedInvites

    fetch("/api/v1/subscriptions.json", {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(invitesToSend),
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
        if (response.length === this.state.selectedInvites.length) {
          this.setState({ continueToHome: true })
        } else {
          this.setState({
            message: "There was a problem with your invitations.  Try selecting them again.",
            selectedInvites: []
          })
        }
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {
    let continueButton;
    if (this.state.continueToHome) {
      continueButton =
        <div className='row center'>
          <a href='/'><button className='general-button'>
            Home
          </button></a>
        </div>
    }

    return(
      <div className='page'>
        <HeaderBar
          title="Invitations"
          flashMessage={this.state.message}/>
        <div className='invite-page'>
          <InviteList
            invites={this.state.inviteInfo}
            addToSelectedInvites={this.addToSelectedInvites}
            sendInvites={this.sendInvites}
            selectedInvites={this.state.selectedInvites} />
        </div>
        {continueButton}
      </div>
    )
  }
}

export default InvitesAndSubscriptions
