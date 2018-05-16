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
        debugger
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
            <div className='columns small-4, medium-2'>
              <img src={entry.photo.url} alt='Entry Photo'/>
            </div>
            <div className='columns small-8, medium-10'>
              {entry.body}
            </div>
          </div>
      } else {
        photo =
          <div className='columns small-12'>
            {entry.body}
          </div>
      }
      return (
        <div className='row'>
          {photo}
        </div>
      )
    })
  }

  render() {
    const entries = this.generateEntries()

    return(
      <div className='page'>
        <h1 className='page-header'>{this.state.newsletter.title}</h1>
        {entries}
      </div>
    )
  }
}

export default PrintableNewsletter
