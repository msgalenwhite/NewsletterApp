import React from 'react'

const EntryTile = props => {

  return(
    <div className='entry-tile'>
      <div className='row'>
        <div className='columns small-3'>
          <img src={props.authorPhoto} />
        </div>
        <div className='columns small-9' >
          <h5 className='sub-header'>{props.title}</h5>
          <p>{props.body}</p>
          {props.authorName}  {props.date}
        </div>
      </div>
    </div>
  )
}

export default EntryTile
