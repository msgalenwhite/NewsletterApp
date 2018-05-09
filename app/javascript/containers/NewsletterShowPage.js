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
      currentEmail: "",
      currentName: ""
    }
    this.addToInvites = this.addToInvites.bind(this)
    this.founderOptions = this.founderOptions.bind(this)
    this.showInviteForm = this.showInviteForm.bind(this)
  }

  addToInvites(email){
    const currentInvites = this.state.invitedEmails

    this.setState({
      invitedEmails: currentInvites.concat(email)
    })
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
          currentEmail={this.state.currentEmail}
          currentName={this.state.currentName}
        />

    }
    return returnedComponent
  }

  showInviteForm() {
    this.setState({ showInviteForm: !this.state.showInviteForm })
  }

  render() {
    const founderTag = this.founderOptions()

    return(
      <div>
        <h1 className='page-header'>{this.state.title}</h1>
        <img src={this.state.photo.url} alt='Newsletter Photo' />
        {founderTag}
        <p>{this.state.description}</p>
      </div>
    )
  }
}

export default NewsletterShowPage
