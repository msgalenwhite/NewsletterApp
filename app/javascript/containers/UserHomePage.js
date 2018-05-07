import React, {Component} from 'react'
import NewsletterList from '../components/NewsletterList'

class UserHomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      foundedNewsletters: [],
      userInfo: {}
    }
  }

  componentDidMount() {
    fetch("/api/v1/newsletters.json", {
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
        const newsletters = response
        const userInfo = response[0]["founder"]

        this.setState({
          foundedNewsletters: newsletters,
          userInfo: userInfo
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {
    return(
      <div>
        <h1 className='page-header'>Newsletter Home Page</h1>
        <a href='/newsletters/new'>Create a Newsletter</a>

        <h3>Founded Newsletters</h3>
        <NewsletterList
          newsletters={this.state.foundedNewsletters}
        />
      </div>
    )
  }
}

export default UserHomePage
