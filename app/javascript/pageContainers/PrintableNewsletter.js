import React, {Component} from 'react'

class PrintableNewsletter extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
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

export default PrintableNewsletter
