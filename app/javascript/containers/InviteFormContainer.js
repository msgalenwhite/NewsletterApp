import React from 'react'

const InviteFormContainer = props => {
  let emailComponents = props.invitedEmails.map((emailObject) => {
    <li>{emailObject.name}: {emailObject.email}</li>
  })

  // NEXT - fill out form, link fields with state of newsletter show page, VALIDATE forms of email

  return(
    <div className='form-div'>
      <button className='general-button' onClick={props.hideMe}>Nevermind!</button>
      <h3>Emails to Invite</h3>
    </div>
  )
}

export default InviteFormContainer
