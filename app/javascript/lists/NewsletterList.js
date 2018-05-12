import React from 'react'
// newsletters={this.state.subscribedNewsletters}
// showForm={this.displayOrHideForm}
// newsletterNeedingEntry={this.state.newsletterNeedingEntry}
// setMessage={this.setMessage}
// displayOrHideNewsletterInfo={this.displayOrHideNewsletterInfo}
// selectedNewsletter={this.state.selectedNewsletter}
import NewsletterDisplayTile from '../newsletterTileComponents/NewsletterDisplayTile'

import React, {Component} from 'react'

class NewsletterList extends Component {
  constructor(props){
    super(props);
    this.state = {
      newsletters: [],
      openNewsletter: null
    }
    this.generateNewsletterTiles = this.generateNewsletterTiles.bind(this)
    this.openANewsletter = this.openANewsletter.bind(this)
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
      if (newsletter.id === this.state.openNewsletter) {
        isOpen = true;
      }

      const openMe = () => {
        this.openANewsletter(newsletter.id)
      }

      return (
        <NewsletterDisplayTile
          details={newsletter}
          isOpen={isOpen}
          openMe={openMe}
          setMessage={this.props.setMessage}
        />
      )
    })
  }

  openANewsletter(id) {
    if (id === this.state.openNewsletter) {
      this.setState({ openNewsletter: null })
    } else {
      this.setState({ openNewsletter: id })
    }
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


//
// const NewsletterList = props => {
//   let newsletters;
//
//   if (props.newsletters.length > 0) {
//     newsletters = props.newsletters.map((newsletterObject) => {
//       let showEntryForm;
//       let showNewsletterBoolean;
//       const id = newsletterObject["id"]
//
//       if (id === props.newsletterNeedingEntry) {
//         showEntryForm = true
//       }
//       if (id === props.selectedNewsletter) {
//         showNewsletterBoolean = true
//       }
//
//       const handleSelectNewsletter = () => {
//         props.displayOrHideNewsletterInfo(id)
//       }
//
//       const handleButtonClick = () => { props.showForm(id) }
//
//       return (
//         <NewsletterDisplayTile
//           key={id}
//           id={id}
//           title={newsletterObject["title"]}
//           description={newsletterObject["description"]}
//           pic_url={newsletterObject["thumb_photo"]["url"]}
//           handleClick={handleButtonClick}
//           showEntryForm={showEntryForm}
//           userId={props.userId}
//           setMessage={props.setMessage}
//           showDetails={handleSelectNewsletter}
//           showNewsletterBoolean={showNewsletterBoolean}
//         />
//       )
//     })
//   }
//
//   return(
//     <ul>
//       {newsletters}
//     </ul>
//   )
// }
//
// export default NewsletterList
