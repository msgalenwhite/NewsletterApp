import React from 'react'
import { Link } from 'react-router'

import EntryFormContainer from '../containers/EntryFormContainer'

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
    <div>
      <p className='news-desc'>
        A little about us:
      </p>
      <p className='news-desc'>
        {props.description}
      </p>
      <div className='center button-div'>
        <div className='row'>
          <button
            className='general-button'
            onClick={props.handleClick}>
            Submit an Entry
          </button>
          <Link
            to={`/newsletters/${props.id}`}
            className='general-button'>
            View Newsletter
          </Link>
        </div>
      </div>
    </div>
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
