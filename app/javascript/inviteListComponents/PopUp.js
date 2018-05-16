import React from 'react'
import QRCode from 'qrcode.react'

const PopUp = props => {

  let buttonToClose = "close_on_background_click:false;close_on_esc:false;"

  return(
    <div id="myModal" data-reveal data-options={buttonToClose} aria-labelledby="modalTitle" aria-hidden="true" role="dialog" className="reveal-modal text-center">

      <h3 className='sub-header center pop-up'>Thank you for inviting your friends to the Family Newsletter!</h3>

      <p>Emailed invitations have already been sent, but you can also share this QR code to help your family find the site.  Just make sure that they create an account with the same email that you entered, and they will be able to join your newsletter.</p>

      <div className='row center qr-code'>
        <QRCode value="https://familynewsletter.herokuapp.com/users/sign_up" />
      </div>

      <button className='general-button center' onClick={props.closeFunc}>
        Back to Newsletters
      </button>
    </div>
  )
}

export default PopUp
