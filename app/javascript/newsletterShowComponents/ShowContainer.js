import React from 'react'
import InviteFormContainer from '../forms/InviteFormContainer'
import EntryFormContainer from '../forms/EntryFormContainer'
import NewsletterDetails from './NewsletterDetails'

const ShowContainer = props => {
  const closeFormButton =
    <div className='row center'>
      <h3 className='sub-header'>Changed your mind?</h3>
      <button className='general-button' onClick={props.closeAllForms}>Nevermind!</button>
    </div>

  let renderedComponent;
  if (props.showInviteForm) {
    renderedComponent =
      <div>
        <InviteFormContainer
          setMessage={props.setMessage}
          newsletterId={props.newsletterId}
          showFormFunc={props.openInvites} />
        {closeFormButton}
      </div>
  } else if (props.showEntryForm) {
    renderedComponent =
      <div>
        <EntryFormContainer
          newsletterId={props.newsletterId}
          setMessage={props.setMessage}
          showFormFunc={props.openEntry} />
        {closeFormButton}
      </div>
  } else {
    renderedComponent =
    <div>
      <NewsletterDetails
        imageSrc={props.imageSrc}
        description={props.description} />
    </div>
  }

  return(
    <div>
      {renderedComponent}
    </div>
  )
}

export default ShowContainer
