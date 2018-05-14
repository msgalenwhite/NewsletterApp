import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import ShowContainer from '../newsletterShowComponents/ShowContainer'
import EntryList from '../lists/EntryList'
import SideBar from '../newsletterShowComponents/SideBar'

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
    this.setState({
      showInviteForm: !this.state.showInviteForm,
      showEntryForm: false
    })
  }

  showEntryForm() {
    this.setState({
      showEntryForm: !this.state.showEntryForm ,
      showInviteForm: false
    })
  }

  render() {
    const founderTag = this.founderOptions()

    return(
      <div className='page'>
        <HeaderBar
          title={this.state.title}
          flashMessage={this.state.flashMessage}
          founder={founderTag}/>
        <div className='row' data-equalizer>
          <div data-equalizer-watch className='columns small-3, medium-2'>
            <SideBar
              openInvites={this.showInviteForm}
              openEntry={this.showEntryForm} />
          </div>
          <div className='columns small-9, medium-10' data-equalizer-watch>
            <ShowContainer
              imageSrc={this.state.photo}
              description={this.state.description}
              newsletterId={this.state.newsletterId}
              setMessage={this.setMessage}
              showInviteForm={this.state.showInviteForm}
              showEntryForm={this.state.showEntryForm}
              closeAllForms={this.closeAllForms}
              openInvites={this.showInviteForm} />
          </div>
        </div>
        <div className='row' data-equalizer>
          <EntryList
            newsletterId={this.state.newsletterId} />
        </div>
      </div>
    )
  }
}

export default NewsletterShowPage
