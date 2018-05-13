import React from 'react'

const EntryTile = props => {

  return(
    <div>
      <div className='row'>
      <div className='columns small-2' >
        <img src='props.authorPhoto' />
      </div>
        <div className='columns small-10' >
          <h5 className='sub-header'>{props.title}</h5>
        </div>
      </div>
      <div className='row'>
        <p>{props.body}</p>
      </div>
    </div>
  )
}

export default EntryTile
