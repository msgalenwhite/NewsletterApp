import React from 'react'
import HeaderLinkBar from './HeaderLinkBar'
import FlashMessage from './FlashMessage'

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
      <HeaderLinkBar />
    </div>
  )
}

export default HeaderBar
