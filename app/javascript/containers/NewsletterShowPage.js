import React, {Component} from 'react'

class NewsletterShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      photo: {},
      founderName: '',
      isFounder: null
    }
    this.founderOptions = this.founderOptions.bind(this)
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
    if (this.state.isFounder) {
      return (
        <button className='general-button'>Send Invites</button>
      )
    } else {
      return (
        <h4>Founded by: {this.state.founderName}</h4>
      )
    }
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
