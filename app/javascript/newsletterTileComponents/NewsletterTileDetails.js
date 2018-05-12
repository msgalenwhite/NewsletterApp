import React from 'react'
import ButtonBar from './ButtonBar'

const NewsletterTileDetails = props => {

  return(
    <div>
      <p className='news-desc'>
        A little about us:
      </p>
      <p className='news-desc'>
        {props.description}
      </p>
      <ButtonBar
        showFormFunc={props.showFormFunc}
      />
    </div>
  )
}

export default NewsletterTileDetails
