import React from 'react'

const EmailList = props => {

  return(
    <div>
      <h3 className='sub-header center'>Invites to Send:</h3>
      {props.emailComponents}
      <div className='center'>
        <button
          onClick={props.clearEmails}
          className='general-button spaced'>
          Clear
        </button>
      </div>
    </div>
  )
}

export default EmailList
