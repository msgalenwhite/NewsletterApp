import React from 'react'
import NewsletterDisplayTile from '../components/NewsletterDisplayTile'

const NewsletterList = props => {
  let newsletters;

  if (props.newsletters.length > 0) {
    newsletters = props.newsletters.map((newsletterObject) => {
      let showEntryForm;

      const id = newsletterObject["id"]

      if (id === props.selectedNewsletter) {
        showEntryForm = true
      }

      const handleClick = () => { props.showForm(id) }

      return (
        <NewsletterDisplayTile
          key={newsletterObject["id"]}
          id={newsletterObject["id"]}
          title={newsletterObject["title"]}
          description={newsletterObject["description"]}
          pic_url={newsletterObject["thumb_photo"]["url"]}
          handleClick={handleClick}
          showEntryForm={showEntryForm}
          userId={props.userId}
        />
      )
    })
  }

  return(
    <ul>
      {newsletters}
    </ul>
  )
}

export default NewsletterList
