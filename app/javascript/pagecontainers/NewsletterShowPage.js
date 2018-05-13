import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import ShowContainer from '../newsletterShowComponents/ShowContainer'
import EntryList from '../lists/EntryList'

//won't be needed once show container is implemented
import NewsletterDetails from '../newsletterShowComponents/NewsletterDetails'
import InviteFormContainer from '../forms/InviteFormContainer'

class NewsletterShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      photo: {},
      founderName: '',
      isFounder: null,
      showInviteForm: true,
      showEntryForm: false,
      flashMessage: null,
      newsletterId: null
    }
    this.setMessage = this.setMessage.bind(this)
    this.founderOptions = this.founderOptions.bind(this)



    this.showInviteForm = this.showInviteForm.bind(this)

  }
  setMessage(message) {
    this.setState({ flashMessage: message })
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
          photo: response["newsletter_data"]["thumb_photo"]["url"],
          founderName: response["newsletter_data"]["founder_name"],
          isFounder: response["is_founder"],
          newsletterId: newsletterId
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }



  founderOptions() {
    let text;
    if (this.state.isFounder) {
      text = 'You are the founder'
    } else {
      text = `Founded by ${this.state.founderName}`
    }

    return (
      <h3>{text}</h3>
    )

    // const handleClick = () => { this.showInviteForm() }
    // let returnedComponent;
    //
    // if (this.state.isFounder && !this.state.showInviteForm) {
    //   returnedComponent =
    //     <button
    //       className='general-button'
    //       onClick={handleClick}
    //     >
    //       Send Invites
    //     </button>
    //
    // } else if (!this.state.isFounder){
    //   returnedComponent = <h4>Founded by: {this.state.founderName}</h4>
    // } else {
    //   returnedComponent =
    //     <InviteFormContainer
    //       hideMe={handleClick}
    //       invitedEmails={this.state.invitedEmails}
    //       currentEmail={this.state.newEmail}
    //       currentName={this.state.newName}
    //       handleChange={this.handleChange}
    //       addEmail={this.addToInvites}
    //       handleSubmit={this.sendEmails}
    //       newsletterId={this.state.newsletterId}
    //     />
    //
    // }
    // return returnedComponent
  }



  showInviteForm() {
    this.setState({ showInviteForm: !this.state.showInviteForm })
  }

  //NEEDED - a FUNCTION and a TRIGGER to set the showInviteForm and showEntryForm in state

  render() {
    const founderTag = this.founderOptions()

    return(
      <div className='page'>
        <HeaderBar
          title={this.state.title}
          flashMessage={this.state.flashMessage} />
        <div className='row invites-div'>
          {founderTag}
        </div>
        <ShowContainer
          imgSrc={this.state.photo}
          description={this.state.description}
          newsletterId={this.state.newsletterId}
          setMessage={this.setMessage}
          showInviteForm={this.state.showInviteForm}
          showEntryForm={this.state.showEntryForm} />
        <EntryList />
      </div>
    )
  }
}

export default NewsletterShowPage
