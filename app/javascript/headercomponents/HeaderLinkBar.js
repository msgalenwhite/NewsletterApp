import React from 'react'

const HeaderLinkBar = props => {

  const headerLinkList = [
    {
      destination: '/newsletters/new',
      text: 'Start a Newsletter'
    },
    {
      destination: '/',
      text: 'View Subscriptions'
    }
  ]

  const links = headerLinkList.map((linkObject) => {
    return(
      <a
        className='general-button'
        href={linkObject.destination}
        key={linkObject.destination} >
          {linkObject.text}
      </a>
    )
  })

  return(
    <div className='row header-button-div'>
      {links}
    </div>
  )
}

export default HeaderLinkBar
