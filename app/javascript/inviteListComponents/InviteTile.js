import React from 'react'

const InviteTile = props => {
  let icon;

  if (props.selected) {
    icon = <i className="fa fa-envelope-open-o" aria-hidden="true"></i>
  } else {
    icon = <i className="fa fa-envelope-o" aria-hidden="true"></i>
  }

  return(
    <div className='row'>
      <div className='columns small-1'>
        {icon}
      </div>
      <div className='columns small-11'>
        <h3>{props.host} invites you to {props.newsletter}</h3>
      </div>
    </div>
  )
}

export default InviteTile
