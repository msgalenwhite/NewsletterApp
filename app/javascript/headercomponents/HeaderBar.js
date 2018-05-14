import React from 'react'
import FlashMessage from './FlashMessage'
// <i className="far fa-envelope letter-icon"></i>
// <i className="far fa-envelope-open letter-icon"></i>

const HeaderBar = props => {
  let flash;
  let founder;
  if (props.flashMessage) {
    flash = <FlashMessage flashMessage={props.flashMessage} />
  }
  if (props.founder) {
    founder = <div className='founder-tag'>{props.founder}</div>
  }

  return(
    <div className='header-bar'>
      {flash}
      <h1 className='page-header'>{props.title}</h1>
      {founder}
    </div>
  )
}

export default HeaderBar
