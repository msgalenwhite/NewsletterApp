import React from 'react'
import headerLinkList from '../constants/headerLinkList'

const HeaderLinkBar = props => {

  let links = linkList.map((listObject) => {
    return(
      <a href={linkObject.destination} >
        <h3 className='sub-header'>
          {listObject.text}
        </h3>
      </a>
    )
  })

  return(
    <div className='row'>
      {links}
    </div>
  )
}

export default HeaderLinkBar
