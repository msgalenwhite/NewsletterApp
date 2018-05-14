import React from 'react'

const SideBar = props => {

  return(
    <div className='sidebar'>
      <h5>What's next?</h5>
      <a href='/'><button className='general-button'>
        View Subscriptions
      </button></a>
      <a href='/newsletters/new' ><button className='general-button'>
        Start a Newsletter
      </button></a>
      <button className='general-button' onClick={props.openInvites}>
        Invite some Friends
      </button>
      <button className='general-button' onClick={props.openEntry}>
        Submit an Entry
      </button>
      <button className='general-button' onClick={props.showEntries}>
        View Entries
      </button>
    </div>
  )
}

export default SideBar
