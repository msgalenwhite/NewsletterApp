import React, {Component} from 'react'

class NewsletterShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const newsletterId = parseInt(this.props.params["id"])
    fetch(`/newsletters/${newsletterId}`)
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
        console.log(response)
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {

    return(
      <div>
      show a newsletter
      </div>
    )
  }
}

export default NewsletterShowPage
