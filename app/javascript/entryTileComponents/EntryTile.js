import React from 'react'
import UserButtonBar from './UserButtonBar'

const EntryTile = props => {
  let buttonBar;

  if (props.selfSubmitted) {
    const editEntryFunc = () => {
      props.editEntry(props)
    }
    const deleteEntryFunc = () => {
      props.deleteEntry(props)
    }

    buttonBar =
      <UserButtonBar
        editEntryFunc={editEntryFunc}
        deleteEntryFunc={deleteEntryFunc} />
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
      {buttonBar}
    </div>
  )
}

export default EntryTile
