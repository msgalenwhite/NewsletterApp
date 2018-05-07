import React from 'react'
import EntryFormContainer from '../containers/EntryFormContainer'

const NewsletterDisplayTile = props => {
  let entryForm;
  let button;

  if (props.showEntryForm) {
    entryForm = <EntryFormContainer />
  } else {
    button =
      <button
        className='general-button'
        onClick={props.handleClick}>
      Submit an Entry
      </button>
  }

  return(
    <div>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <img src={props.pic_url} alt='Newsletter Thumbnail' />
      {button}
      {entryForm}
    </div>
  )
}

export default NewsletterDisplayTile
