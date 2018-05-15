import React, {Component} from 'react'
import InviteList from '../lists/InviteList'

class InvitesAndSubscriptions extends Component {
  constructor(props){
    super(props);
    this.state = {
      inviteInfo: [],
      selectedInvites: []
    }
  }

  componentDidMount() {
    fetch("/api/v1/subscriptions.json")
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
      <InviteList
        invites={this.state.inviteInfo} />
    )
  }
}

export default InvitesAndSubscriptions
