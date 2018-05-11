import React from 'react'
import QRCode from 'qrcode.react'

const InviteFormContainer = props => {
  let emailComponents = props.invitedEmails.map((emailObject) => {
    return (
      <li key={emailObject.email}>{emailObject.name} ({emailObject.email})</li>
    )
  })

  const submitEmails = () => {
    props.handleSubmit()
  }

  return(
    <div>
      <div className='row data-equalizer'>
        <div className='columns small-12 obligatory-empty-div data-equalizer-watch'></div>
        <div className='columns small-12 medium-6 data-equalizer-watch'>
          <h3 className='sub-header center'>Invite Someone New</h3>
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
        <div className='columns small-12 medium-6 data-equalizer-watch'>
          <h3 className='sub-header center'>Invites to Send:</h3>
          {emailComponents}
        </div>
      </div>
      <div className='row'>
        <div className='columns small-6'>
          <h3 className='sub-header'>Changed your mind?</h3>
          <button className='general-button' onClick={props.hideMe}>Nevermind!</button>
        </div>
        <div className='columns small-6'>
          <h3 className='sub-header'>Thought of everyone?</h3>
          <button className='general-button' onClick={submitEmails}>Send the Invites!</button>
        </div>
      </div>
    </div>
  )
}

export default InviteFormContainer
