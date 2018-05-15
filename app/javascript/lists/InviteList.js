import React from 'react'
import InviteTile from '../inviteListComponents/InviteTile'

const InviteList = props => {

  const tiles = props.invites.map((info) => {
    return (
      <div key={info.id}>
        <InviteTile
          id={info.id}
          host={info.host}
          newsletter={info.newsletter.title}
          selected={false}
          />
      </div>
    )

  })

  return(
    <div className='page'>
    <div className='sub-header'>Please click on the letter to join:</div>
    {tiles}
    </div>
  )
}

export default InviteList
