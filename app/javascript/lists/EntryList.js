import React, {Component} from 'react'
import EntryTile from '../entryTileComponents/EntryTile.js'

class EntryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries: []
    }
    this.makeTiles = this.makeTiles.bind(this)
  }
  componentDidMount() {
    const newsletterId = this.props.newsletterId
    fetch(`/api/v1/newsletters/${newsletterId}/entries.json`, {
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
        this.setState({ entries: response })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  makeTiles() {
    const tiles = this.state.entries.map((entryInfo) => {
      return (
        <div className='row'>
          <hr/>
          <EntryTile
            key={entryInfo.id}
            id={entryInfo.id}
            title={entryInfo.title}
            body={entryInfo.body}
            photo={entryInfo.photo} />
        </div>
       )
    })
    return tiles
  }

  render() {
    const entries = this.makeTiles()

    return(
      <div className='entries-list'>
        {entries}
      </div>
    )
  }
}

export default EntryList
