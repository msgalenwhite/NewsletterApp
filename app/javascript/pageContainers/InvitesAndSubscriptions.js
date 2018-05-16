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
          title="Thank you for coming to check out the Family Newsletter!"
          flashMessage={this.state.message}/>
        <div className='description-div'>
          <h3 className='sub-header'>A little about us:</h3>
          <p className='description-text'>
            The Family Newsletter is a tradition dating back to my grandmother.  When she first left home, she and all of her siblings would designate one person each month to collect letters from all of the siblings, then copy and compile the letters into a newsletter which was mailed back out to everyone.
          </p>
          <p className='description-text'>
            On our site we want to foster the same sense of community, and you're in luck!  We have an invitation or two waiting for you.  If you are interested in joining any of the newsletters, please select the checkbox next to the name.
          </p>
        </div>

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
