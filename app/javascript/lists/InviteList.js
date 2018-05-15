import React from 'react'
import InviteTile from '../inviteListComponents/InviteTile'

const InviteList = props => {

  const tiles = props.invites.map((info) => {
    const addSubscription = () => {
      props.addToSelectedInvites(info.newsletter.id)
    }

    return (
      <div key={info.newsletter.id}>
        <InviteTile
          id={info.newsletter.id}
          host={info.host}
          newsletter={info.newsletter.title}
          addSubscription={addSubscription}
          />
      </div>
    )
  })

  return(
    <div className='invite-list-div'>
      <div className='sub-header invite-header'>Please select the invitations you would like to accept:</div>
      {tiles}
      <div className='row center'>
        <button className='general-button' onClick={props.sendInvites}>
          Done
        </button>
      </div>
    </div>
  )
}

export default InviteList
