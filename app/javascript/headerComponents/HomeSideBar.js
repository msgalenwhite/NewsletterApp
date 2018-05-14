import React from 'react'

const HomeSideBar = props => {

  return(
    <div className='sidebar'>
      <h5>What's next?</h5>
      <a href='/newsletters/new' ><button className='general-button'>
        Start a Newsletter
      </button></a>
    </div>
  )
}

export default HomeSideBar
