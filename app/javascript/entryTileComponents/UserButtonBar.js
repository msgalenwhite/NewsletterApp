import React from 'react'

const UserButtonBar = props => {

  return(
    <div className='row entry-button-bar'>
      <img
        src="https://png.icons8.com/ios/50/000000/waste.png"
        onClick={props.deleteEntryFunc}
        className='delete-button' />
      <img
        src='https://png.icons8.com/metro/50/000000/edit.png'
        onClick={props.editEntryFunc}
        className='edit-button'/>
    </div>
  )
}

export default UserButtonBar
