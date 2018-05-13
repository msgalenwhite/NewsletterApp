import React, {Component} from 'react'

import HeaderBar from '../headerComponents/HeaderBar'
import FullEntry from '../entryTileComponents/FullEntry'

class EntryShowPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      photo: ''
    }
  }

  componentDidMount() {
    /*
      fetch particular entry info
    */
  }

  render() {

    return(
      <div className='page'>
        <HeaderBar
          title={this.state.title}
        />
        <FullEntry text={this.state.body}  image={this.state.photo}/>
      </div>
    )
  }
}

export default EntryShowPage
