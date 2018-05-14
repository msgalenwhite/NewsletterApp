import React from 'react'
import NewsletterTileDetails from './NewsletterTileDetails'
import EntryFormContainer from '../forms/EntryFormContainer'

const NewsletterDisplayTile = props => {
  let displayItem;

  if (props.isOpen && props.showForm) {
    displayItem =
      <EntryFormContainer
        newsletterId={props.details.id}
        setMessage={props.setMessage}
        showFormFunc={props.showFormFunc} />
  } else if (props.isOpen) {
    displayItem =
      <NewsletterTileDetails
        description={props.details.description}
        photo={props.details.photo}
        showFormFunc={props.showFormFunc}
        id={props.id}/>
  }

  return (
    <div className='newsletter-display-tile' >
      <div className='opaque-tile row' >
        <h4
          className='news-title'
          onClick={props.openMe}>
          {props.details.title}
        </h4>
        {displayItem}
      </div>
    </div>
  )
}

export default NewsletterDisplayTile
