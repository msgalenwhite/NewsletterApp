import React from 'react'

const EntryTile = props => {
  let button;
  let editEntryFunc;

  if (props.selfSubmitted) {
    editEntryFunc = () => {
      props.editEntry(props)
    }

    button =
    <div className='row'>
      <button className='general-button edit-button' onClick={editEntryFunc}>
        Edit
      </button>
    </div>
  }

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
      {button}
    </div>
  )
}

export default EntryTile
