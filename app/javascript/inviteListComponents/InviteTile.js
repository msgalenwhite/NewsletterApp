import React from 'react'

const InviteTile = props => {

  return(
    <div className='invite-div'>
        <button className='general-button accept-button' onClick={props.addSubscription}>
          {props.buttonText}
        </button>
        <h3 className='accept-label'>{props.host} invites you to {props.newsletter}</h3>
    </div>
  )
}

export default InviteTile
