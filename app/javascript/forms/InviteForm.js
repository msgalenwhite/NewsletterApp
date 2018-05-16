import React from 'react'

const InviteForm = props => {

  return(
    <div>
      <div className='field'>
        <h5>Email</h5>
        <input
          type='email'
          className='email-input'
          name='newEmail'
          value={props.emailValue}
          onChange={props.handleChange}
        />
      </div>
      <div className='field'>
        <h5>Name</h5>
        <input
          type='text'
          className='email-name-input'
          name='newName'
          value={props.nameValue}
          onChange={props.handleChange}
        />
      </div>
    </div>
  )
}

export default InviteForm
