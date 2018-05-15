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

  render() {

    return(
      <div className='page'>
        <HeaderBar
          title="Invitations" />
        <InviteList
          invites={this.state.inviteInfo} />
      </div>
    )
  }
}

export default InvitesAndSubscriptions
