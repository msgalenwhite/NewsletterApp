import React from 'react'

const FlashMessages = props => {

  return(
    <div data-alert className="alert-box">
      {props.flashMessage}
      <a href="#" className="close">&times;</a>
    </div>
  )
}

export default FlashMessages
