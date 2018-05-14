import React, {Component} from 'react'
import NewsletterDisplayTile from '../newsletterTileComponents/NewsletterDisplayTile'

class NewsletterList extends Component {
  constructor(props){
    super(props);
    this.state = {
      newsletters: [],
      openNewsletter: null,
      showForm: false
    }
    this.generateNewsletterTiles = this.generateNewsletterTiles.bind(this)
    this.openANewsletter = this.openANewsletter.bind(this)
    this.showTheForm = this.showTheForm.bind(this)
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
        this.setState({ newsletters: response })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  generateNewsletterTiles() {
    const tiles = this.state.newsletters.map((newsletter) => {

      let isOpen;
      let showForm;
      if (newsletter.id === this.state.openNewsletter) {
        isOpen = true;
        showForm = this.state.showForm
      }

      const openMe = () => {
        this.openANewsletter(newsletter.id)
      }

      const showFormFunc = () => { this.showTheForm() }

      return (
        <NewsletterDisplayTile
          key={newsletter.id}
          id={newsletter.id}
          details={newsletter}
          isOpen={isOpen}
          openMe={openMe}
          setMessage={this.props.setMessage}
          showForm={showForm}
          showFormFunc={showFormFunc}
        />
      )
    })
    return tiles;
  }

  openANewsletter(id) {
    if (id === this.state.openNewsletter) {
      this.setState({
        openNewsletter: null,
        showForm: false
      })
    } else {
      this.setState({ openNewsletter: id })
    }
  }

  showTheForm() {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    const tiles = this.generateNewsletterTiles()

    return(
      <ul>
        {tiles}
      </ul>
    )
  }
}

export default NewsletterList
