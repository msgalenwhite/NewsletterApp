import React, {Component} from 'react'
import EntryTile from '../entryTileComponents.js'

class EntryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries = []
    }
    this.makeTiles = this.makeTiles.bind(this)
  }
  componentDidMount() {
    /*
      fetch entries for this.props.newsletterId
    */
  }

  makeTiles() {
    const tiles = this.state.entries.map((entryInfo) => {
      <EntryTile />
    })
  }

  render() {
    const Entries = this.makeTiles()
    
    return(
      <div>
        {entries}
      </div>
    )
  }
}

export default EntryList
