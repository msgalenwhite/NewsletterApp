import React from 'react'

const EntryTile = props => {

  return(
    <div className='entry-tile'>
      <div className='row'>
          <h5 className='sub-header center'>{props.title}</h5>
      </div>
      <div className='row'>
        <div className='columns small-3'>
          <img src={props.authorPhoto} />
        </div>
        <div className='columns small-9' >
          <p>{props.body}</p>
        </div>
      </div>
      <div className='row author-info'>
        Submitted by: {props.authorName} ( {props.date} )
      </div>
    </div>
  )
}

export default EntryTile
