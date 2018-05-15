import React, {Component} from 'react'

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    fetch("/api/v1/users.json", {
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
        console.log(response)
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {

    return(
      <div></div>
    )
  }
}

export default Map
