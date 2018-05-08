import React from 'react'
import NewsletterDisplayTile from '../components/NewsletterDisplayTile'

const NewsletterList = props => {
  let newsletters;

  if (props.newsletters.length > 0) {
    newsletters = props.newsletters.map((newsletterObject) => {
      let showEntryForm;
      let showNewsletterBoolean;
      const id = newsletterObject["id"]

      if (id === props.newsletterNeedingEntry) {
        showEntryForm = true
      }
      if (id === props.selectedNewsletter) {
        showNewsletterBoolean = true
      }

      const handleSelectNewsletter = () => {
        props.displayOrHideNewsletterInfo(id)
      }

      const handleButtonClick = () => { props.showForm(id) }

      return (
        <NewsletterDisplayTile
          key={newsletterObject["id"]}
          id={newsletterObject["id"]}
          title={newsletterObject["title"]}
          description={newsletterObject["description"]}
          pic_url={newsletterObject["thumb_photo"]["url"]}
          handleClick={handleButtonClick}
          showEntryForm={showEntryForm}
          userId={props.userId}
          setMessage={props.setMessage}
          showDetails={handleSelectNewsletter}
          showNewsletterBoolean={showNewsletterBoo}
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
