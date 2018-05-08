import React from 'react'
import EntryFormContainer from '../containers/EntryFormContainer'

const NewsletterDisplayTile = props => {
  let entryForm;
  let button;

  if (props.showEntryForm) {
    entryForm =
      <EntryFormContainer
        newsletterId={props.id}
        userId={props.userId}
        setMessage={props.setMessage}
      />
  } else {
    button =
      <button
        className='general-button'
        onClick={props.handleClick}>
        Submit an Entry
      </button>
  }

  return (
    <div className = 'newsletter-display-tile' >
      <div className = 'opaque-tile row' >
        <span className = 'columns small-5' >
          <img
          src = {props.pic_url}
          alt = 'Newsletter Thumbnail' />
        </span>

        <span className = 'columns small-7'>
          <h4>{props.title}</h4>
          <p> {props.description} </p>
          <span className='entry-button'>{button}</span>
        </span>
        <div className='columns small-12'>
          {entryForm}
        </div>
      </div>
    </div>
  )
}

export default NewsletterDisplayTile
