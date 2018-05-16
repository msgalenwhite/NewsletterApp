import React from 'react'
import QRCode from 'qrcode.react'

const PopUp = props => {

  let buttonToClose = "close_on_background_click:false;close_on_esc:false;"

  return(
    <div id="myModal" data-reveal data-options={buttonToClose} aria-labelledby="modalTitle" aria-hidden="true" role="dialog" className="reveal-modal text-center">

      <h3>THIS IS A POPUP!</h3>
      <QRCode value="https://familynewsletter.herokuapp.com/users/sign_in" />

      <button className='general-button' onClick={props.closeFunc}>
        Back to Newsletters
      </button>
    </div>
  )
}

export default PopUp
