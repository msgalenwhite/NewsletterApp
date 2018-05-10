import React, { Component } from 'react'
import Dropzone from 'react-dropzone'


class EntryFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      errorMessage: '',
      photo: []
    }
    this.formIsComplete = this.formIsComplete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.submitEntry = this.submitEntry.bind(this)
  }

  formIsComplete() {
    if (this.state.title === '' || this.state.body === '') {
      return false
    }
    return true
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.formIsComplete()) {
      let formDataObject = new FormData()

      formDataObject.append("title", this.state.title)
      formDataObject.append("body", this.state.body)
      formDataObject.append("photo", this.state.photo[0])
      formDataObject.append("newsletter_id", this.props.newsletterId)

      this.submitEntry(formDataObject)
    } else {
      this.setState({
        errorMessage: 'Please complete the form before submitting!'
      })
    }
  }

  onDrop(photo) {
    if (this.state.photo.length >= 1) {
      this.props.setMessage("You can only submit 1 picture with your entry.")
    } else {
      this.setState({ photo: photo })
    }
  }

  submitEntry(formDataObject) {
    fetch("/api/v1/entries", {
      credentials: 'same-origin',
      method: 'POST',
      body: formDataObject
    })
      .then ( response => {
        if ( response.ok ) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw(error);
        }
      })
      .then ( response => response.json() )
      .then ( response => {
        if (response["error"]) {
          this.props.setMessage(response["error"])
        } else {
          this.props.setMessage("Success!")
        }
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {
    let preview;

    if (this.state.photo.length > 0) {
      preview = <img className='drop-zone-preview' src={this.state.photo[0].preview} />
    }

    return (
      <div className='form-div' >
        <form onSubmit={this.handleSubmit}>
          <p>{this.state.errorMessage}</p>
          <h3>Submit an Entry</h3>

          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor='body'>Entry Text</label>
          <textarea
            name='body'
            value={this.state.body}
            onChange={this.handleChange}
          />

          <div className="dropzone">
            <Dropzone onDrop={this.onDrop}>
              <p className='dropzone-text'>Only one photo per entry: drag it here or click to upload!</p>
              {preview}
            </Dropzone>
          </div>

          <input
            type='submit'
            value='Submit'
            className='general-button'/>
        </form>
      </div>
    )
  }
}

export default EntryFormContainer
