import React, {Component} from 'react'

class NewsletterShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      photo: {},
      founder: ''
    }
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
          title: response["title"],
          description: response["description"],
          photo: response["thumb_photo"],
          founder: response["founder_name"]
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {
    return(
      <div>
        <div id='map'></div>
        <h1 className='page-header'>{this.state.title}</h1>
        <h4>Founded by: {this.state.founder}</h4>
        <img src={this.state.photo.url} alt='Newsletter Photo' />
        <p>{this.state.description}</p>
      </div>
    )
  }
}

export default NewsletterShowPage
