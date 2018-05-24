import React from 'react'
import FlashMessage from './FlashMessage'

const HeaderBar = props => {
  let flash;
  if (props.flashMessage) {
    flash = <FlashMessage flashMessage={props.flashMessage} />
  }

  return(
    <div className='header-bar'>
      {flash}
      <h1 className='page-header'>{props.title}</h1>
    </div>
  )
}

export default HeaderBar
