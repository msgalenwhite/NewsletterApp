import React from 'react'
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
      <p> {props.description} </p>
      <span className='entry-button'>
        <button
          className='general-button'
          onClick={props.handleClick}
        >
          Submit an Entry
        </button>
      </span>
      <a href={`/newsletters/${props.id}`} className='general-button'>
        View Newsletter
      </a>
    </div>
  }

  return (
    <div className='newsletter-display-tile' >
      <div className='opaque-tile row' >
        <span className='columns small-5' >
          <img
          src={props.pic_url}
          alt='Newsletter Thumbnail' />
        </span>

        <span className='columns small-7'>
          <h4 onClick={props.showDetails}>
            {props.title}
          </h4>
        </span>
        <div className='columns small-12'>
          {displayItem}
        </div>
      </div>
    </div>
  )
}

export default NewsletterDisplayTile
