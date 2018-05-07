import React, {Component} from 'react'

class EntryFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      photo: null
    }
  }

  render() {

    return(
      <div className={this.props.display}>
        hello
      </div>
    )
  }
}

export default EntryFormContainer
