import React from 'react'
import NewsletterDisplayTile from '../components/NewsletterDisplayTile'

const NewsletterList = props => {
  let newsletters = props.newsletters.map((newsletterObject) => {
    return (
      <NewsletterDisplayTile
        key={newsletterObject["id"]}
        id={newsletterObject["id"]}
        title={newsletterObject["title"]}
        description={newsletterObject["description"]}
        pic_url={newsletterObject["thumb_photo"]["url"]}
      />
    )
  })

  return(
    <ul>
      {newsletters}
    </ul>
  )
}

export default NewsletterList
