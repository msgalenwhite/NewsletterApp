import React from 'react'

const EntryTile = props => {
  let image;
  if (props.photo) {
    image =
      <div className='columns small-2' >
        <img src='props.photo' />
      </div>
  }
  
  return(
    <div>
      <div className='row'>
        {image}
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
