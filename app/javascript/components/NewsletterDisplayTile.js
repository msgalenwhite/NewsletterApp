import React from 'react'

const NewsletterDisplayTile = props => {
  return(
    <div className='newsletter-display-tile'>
      <div className='opaque-tile row'>
        <span className='columns small-5'>
          <img src={props.pic_url} alt='Newsletter Thumbnail' />
        </span>
        <span className='columns small-7'>
          <h4>{props.title}</h4>
          <p>{props.description}</p>
        </span>
      </div>
    </div>
  )
}

export default NewsletterDisplayTile
