import React from 'react'
import ButtonBar from './ButtonBar'

const NewsletterTileDetails = props => {

  return(
    <div className='row'>
      <div className='columns small-8'>
        <p className='news-desc'>
          A little about us:
        </p>
        <p className='news-desc'>
          {props.description}
        </p>
      </div>
      <div className='columns small-4'>
        <img
          src={props.photo.url}
          alt='Newsletter Photo' />
      </div>
      <ButtonBar
        showFormFunc={props.showFormFunc}
      />
    </div>
  )
}

export default NewsletterTileDetails
