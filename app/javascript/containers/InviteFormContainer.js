import React from 'react'

const InviteFormContainer = props => {
  let emailComponents = props.invitedEmails.map((emailObject) => {
    return (
      <li>{emailObject.name}: {emailObject.email}</li>
    )
  })

  // NEXT - fill out form, link fields with state of newsletter show page, VALIDATE forms of email

  return(
    <div className='row'>
      <div className='columns small-12 medium-6 panel'>
        <h3 className='sub-header'>Invite Someone New</h3>
        <div className='field'>
          <h5>Email</h5>
            <input
              type='email'
              className='email-input'
              name='newEmail'
              value={props.currentEmail}
              onChange={props.handleChange}
            />
          </div>
          <div className='field'>
            <h5>Name</h5>
            <input
              type='text'
              className='email-name-input'
              name='newName'
              value={props.currentName}
              onChange={props.handleChange}
            />
          </div>
        <button className='general-button' onClick={props.addEmail}>Add</button>
      </div>
      <div className='columns small-12 medium-6 panel'>
        <h3 className='sub-header'>Invites to Send:</h3>
        {emailComponents}
      </div>
      <div className='row'>
        <button className='general-button' onClick={props.hideMe}>Nevermind!</button>
      </div>
    </div>
  )
}

export default InviteFormContainer
