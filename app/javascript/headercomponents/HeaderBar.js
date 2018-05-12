import React from 'react'
import HeaderLinkBar from './HeaderLinkBar'
import FlashMessage from './FlashMessage'

const HeaderBar = props => {

  return(
    <div>
      <FlashMessage flashMessage={props.flashMessage} />
      <h1 className='page-header'>{props.title}</h1>
      <HeaderLinkBar />
    </div>
  )
}

export default HeaderBar
