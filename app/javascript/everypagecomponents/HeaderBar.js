import React from 'react'
import HeaderLinkBar from './HeaderLinkBar'

const HeaderBar = props => {

  return(
    <div>
      <h1 className='page-header'>{props.title}</h1>
      <HeaderLinkBar />
    </div>
  )
}

export default HeaderBar
