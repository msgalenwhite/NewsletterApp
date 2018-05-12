import React from 'react'
import NewsletterTileDetails from './NewsletterTileDetails'
import EntryFormContainer from '../forms/EntryFormContainer'

const NewsletterDisplayTile = props => {
  let displayItem;

  if (props.showEntryForm) {
    displayItem =
      <EntryFormContainer
        newsletterId={props.id}
        userId={props.userId}
        setMessage={props.setMessage}
      />
  } else if (props.showNewsletterBoolean) {
    displayItem =
      <NewsletterTileDetails
        description={props.description}
        onEntryButtonClick={props.handleClick}
      />
  }

  return (
    <div className='newsletter-display-tile' >
      <div className='opaque-tile row' >
        <h4
          className='news-title'
          onClick={props.showDetails}>
          {props.title}
        </h4>
        {displayItem}
      </div>
    </div>
  )
}

export default NewsletterDisplayTile
