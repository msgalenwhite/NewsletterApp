import React, {Component} from 'react'
import InviteList from '../lists/InviteList'
import HeaderBar from '../headerComponents/HeaderBar'

class InvitesAndSubscriptions extends Component {
  constructor(props){
    super(props);
    this.state = {
      inviteInfo: [],
      selectedInvites: []
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
        debugger
        console.log(response)
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {
    console.log(this.state)
    return(
      <div className='page'>
        <HeaderBar
          title="Invitations" />
        <div className='invite-page'>
          <InviteList
            invites={this.state.inviteInfo}
            addToSelectedInvites={this.addToSelectedInvites}
            sendInvites={this.sendInvites} />
        </div>
      </div>
    )
  }
}

export default InvitesAndSubscriptions
