import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import ShowContainer from '../newsletterShowComponents/ShowContainer'
import EntryList from '../lists/EntryList'

class NewsletterShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      photo: '',
      founderName: '',
      isFounder: null,
      showInviteForm: false,
      showEntryForm: false,
      flashMessage: null,
      newsletterId: parseInt(this.props.params["id"])
    }
    this.closeAllForms = this.closeAllForms.bind(this)
    this.setMessage = this.setMessage.bind(this)
    this.founderOptions = this.founderOptions.bind(this)
    this.showEntryForm = this.showEntryForm.bind(this)
    this.showInviteForm = this.showInviteForm.bind(this)
  }

  closeAllForms() {
    this.setState({
      showInviteForm: false,
      showEntryForm: false
    })
  }

  componentDidMount() {
    fetch(`/api/v1/newsletters/${this.state.newsletterId}.json`, {
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
        debugger
        this.setState({
          title: response["title"],
          description: response["description"],
          photo: response["photo"],
          founderName: response["founder_name"],
          isFounder: response["is_founder"]
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

    return text
  }

  setMessage(message) {
    this.setState({ flashMessage: message })
  }

  showInviteForm() {
    this.setState({ showInviteForm: !this.state.showInviteForm })
  }

  showEntryForm() {
    this.setState({ showEntryForm: !this.state.showEntryForm })
  }

  render() {
    const founderTag = this.founderOptions()

    return(
      <div className='page'>
        <HeaderBar
          title={this.state.title}
          flashMessage={this.state.flashMessage}
          founder={founderTag}/>
        <ShowContainer
          imageSrc={this.state.photo}
          description={this.state.description}
          newsletterId={this.state.newsletterId}
          setMessage={this.setMessage}
          showInviteForm={this.state.showInviteForm}
          showEntryForm={this.state.showEntryForm}
          openInvites={this.showInviteForm}
          openEntry={this.showEntryForm}
          closeAllForms={this.closeAllForms} />
        <EntryList
          newsletterId={this.state.newsletterId} />
      </div>
    )
  }
}

export default NewsletterShowPage
