import React, {Component} from 'react'

class UserHomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      newsletters: []
    }
  }

  render() {
    return(
      <div>
        <h1 className='page-header'>Newsletter Home Page</h1>
        <a href='/newsletters/new'>Create a Newsletter</a>
      </div>
    )
  }
}

export default UserHomePage
