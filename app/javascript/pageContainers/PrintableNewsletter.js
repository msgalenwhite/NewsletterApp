import React, {Component} from 'react'
import HeaderBar from '../headerComponents/HeaderBar'
import MapComponent from '../newsletterShowComponents/MapComponent'

class PrintableNewsletter extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      founder: "",
      entries: [],
      newsletterId: parseInt(this.props.params.id)
    }
    this.generateEntries = this.generateEntries.bind(this)
  }

  componentDidMount() {
    const newsletterId = this.state.newsletterId
    const month = parseInt(this.props.params.month)
    const year = parseInt(this.props.params.year)

    fetch(`/api/v1/newsletters/${newsletterId}/printed_newsletters/?month=${month}&year=${year}.json`, {
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
          title: response.title,
          founder_name: response.founder_name,
          entries: response.specific_entries
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  generateEntries() {
    const entries = this.state.entries.map ((entry) => {
      let photoAndBody;
      if (entry.photo) {
        photoAndBody =
          <div>
            <div className='columns small-12, medium-4'>
              <img src={entry.photo} alt='Entry Photo'/>
            </div>
            <div className='columns small-12, medium-8'>
              {entry.body}
            </div>
          </div>
      } else {
        photoAndBody =
          <div className='columns small-12'>
            {entry.body}
          </div>
      }
      return (
        <div key={entry.id} className='printable-entry'>
          <div className='row'>
            {photoAndBody}
          </div>
          <div className='row'>
            <img src={entry.author_photo_url} alt='Author Image' className='entry-tile-author-pic'/>
            <span className='entry-author-text'>{entry.author}</span>
          </div>
        </div>
      )
    })
    return entries
  }

  render() {
    const line = <hr/>
    const entries = this.generateEntries()

    return(
      <div className='page'>
        <MapComponent
          newsletterId={this.state.newsletterId}/>
        <HeaderBar title={this.state.title} />
        <h5 className='sub-header'>{this.state.founder}</h5>
        {entries}
      </div>
    )
  }
}

export default PrintableNewsletter
