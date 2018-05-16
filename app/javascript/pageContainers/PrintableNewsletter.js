import React, {Component} from 'react'

class PrintableNewsletter extends Component {
  constructor(props){
    super(props);
    this.state = {
      newsletter: {},
      entries: []
    }
    this.generateEntries = this.generateEntries.bind(this)
  }

  componentDidMount() {
    const newsletterId = parseInt(this.props.params.id)
    const month = parseInt(this.props.params.month)
    const year = parseInt(this.props.params.year)

    fetch(`/api/v1/newsletters/${newsletterId}/printed_newsletters/month=${month}&year=${year}.json`, {
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
          newsletter: response["newsletter"],
          entries: response["entries"]
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  generateEntries() {
    const entries = this.state.entries.map ((entry) => {
      let photo;
      if (entry.photo.url) {
        photo =
          <div>
            <div class='columns small-4, medium-2'>
              <img src={entry.photo.url} alt='Entry Photo'/>
            </div>
            <div class='columns small-8, medium-10'>
              {entry.body}
            </div>
          </div>
      } else {
        photo =
          <div class='columns small-12'>
            {entry.body}
          </div>
      }
      return (
        <div class='row'>
          {photo}
        </div>
      )
    })
  }

  render() {
    const entries = this.generateEntries()

    return(
      <div class='page'>
        <h1 class='page-header'>{this.state.newsletter.title}</h1>
        <h5>Founded by: {this.state.newsletter.founder.first_name}</h5>
        {entries}
      </div>
    )
  }
}

export default PrintableNewsletter
