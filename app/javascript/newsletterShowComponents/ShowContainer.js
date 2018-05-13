import React from 'react'
import InviteFormContainer from '../forms/InviteFormContainer'
import EntryFormContainer from '../forms/EntryFormContainer'
import NewsletterDetails from './NewsletterDetails'

const ShowContainer = props => {
  let renderedComponent;
  if (props.showInviteForm) {
    renderedComponent =
      <InviteFormContainer
        setMessage={props.setMessage} />
  } else if (props.showEntryForm) {
    renderedComponent =
      <EntryFormContainer
        newsletterId={props.id}
        setMessage={props.setMessage} />
  } else {
    renderedComponent =
      <NewsletterDetails
        imageSrc={props.imageSrc}
        description={props.description} />
  }

  // <div className='columns small-6'>
  //   <h3 className='sub-header'>Changed your mind?</h3>
  //   <button className='general-button' onClick={this.props.hideMe}>Nevermind!</button>
  // </div>

  return(
    <div>
      {renderedComponent}
    </div>
  )
}

export default ShowContainer
