import React from 'react'

const NewsletterDetails = props => {

  return(
    <div className='row' data-equalizer>
      <div className='columns small-6' data-equalizer-watch>
        <img
          className='news-photo'
          src={props.imageSrc}
          alt='Newsletter Photo' />
      </div>
      <div className='columns small-6' data-equalizer-watch>
        <p className='news-desc'>{props.description}</p>
      </div>
    </div>
  )
}

export default NewsletterDetails
