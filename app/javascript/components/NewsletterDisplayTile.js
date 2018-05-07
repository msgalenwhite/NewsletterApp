import React from 'react'

const NewsletterDisplayTile = props => {
  return(
    <div>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <img src={props.pic_url} alt='Newsletter Thumbnail' />
    </div>
  )
}

export default NewsletterDisplayTile
