import React from 'react'

const ButtonBar = props => {

  return(
    <div className='center button-div'>
      <div className='row'>
        <button
          className='general-button'
          onClick={props.onEntryButtonClick}>
          Submit an Entry
        </button>
        <a href={`/newsletters/${props.id}`}
          className='general-button'>
          View Newsletter
        </a>
      </div>
    </div>
  )
}

export default ButtonBar