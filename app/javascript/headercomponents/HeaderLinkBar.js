import React from 'react'

const HeaderLinkBar = props => {

  const headerLinkList = [
    {
      destination: '/newsletters/new',
      text: 'Create a Newsletter'
    }
  ]

  const links = headerLinkList.map((linkObject) => {
    return(
      <a href={linkObject.destination} key={linkObject.destination}>
        <h3 className='sub-header'>
          {linkObject.text}
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
