import React from 'react'
import TileButtonBar from './TileButtonBar'

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
          src={props.photo}
          alt='Newsletter Photo' />
      </div>
      <TileButtonBar
        showFormFunc={props.showFormFunc}
        id={props.id}
      />
    </div>
  )
}

export default NewsletterTileDetails
