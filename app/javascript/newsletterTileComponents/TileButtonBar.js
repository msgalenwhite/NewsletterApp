import React from 'react'

const TileButtonBar = props => {

  return(
    <div className='row center button-div'>
      <div className='columns small-6 center'>
        <button
          className='general-button purple'
          onClick={props.showFormFunc}>
          Submit an Entry
        </button>
      </div>
      <div className='columns small-6 center'>
        <a href={`/newsletters/${props.id}`}
          className='general-button purple'>
          View Newsletter
        </a>
      </div>
    </div>
  )
}

export default TileButtonBar
