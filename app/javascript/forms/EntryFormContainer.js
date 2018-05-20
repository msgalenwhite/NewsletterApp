import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class EntryFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      errorMessage: '',
      photo: [],
      edit: false,
      id: null
    }
    this.clearForm = this.clearForm.bind(this)
    this.createFormPayload = this.createFormPayload.bind(this)
    this.fillForm = this.fillForm.bind(this)
    this.formIsComplete = this.formIsComplete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.submitEntry = this.submitEntry.bind(this)
  }

  clearForm() {
    this.setState({
      title: '',
      body: '',
      errorMessage: '',
      photo: [],
      edit: false,
      id: null
    })
  }

  componentDidMount() {
    if (this.props.entryToPass) {
      this.fillForm()
    }
  }

  createFormPayload() {
    let formDataObject = new FormData()

    formDataObject.append("title", this.state.title)
    formDataObject.append("body", this.state.body)
    formDataObject.append("photo", this.state.photo[0])
    formDataObject.append("newsletter_id", this.props.newsletterId)
    formDataObject.append("entry_id", this.props.id)

    return formDataObject
  }

  fillForm() {
    this.setState({
      title: this.props.entryToPass.title,
      body: this.props.entryToPass.body,
      edit: true,
      id: this.props.entryToPass.id,
      errorMessage: "Your entry's picture has already been saved.  If you would like to change it, select a new one."
    })
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
    const formDataObject = this.createFormPayload()

    if (this.formIsComplete()) {
      if (this.state.edit === true) {
        this.submitEntry(formDataObject, 'PATCH', `/api/v1/entries/${this.state.id}`)
      } else {
        this.submitEntry(formDataObject, 'POST', "/api/v1/entries")
      }
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

  submitEntry(formDataObject, method, path) {
    fetch(path, {
      credentials: 'same-origin',
      method: method,
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
        debugger
        if (response["error"]) {
          this.props.setMessage(response["error"])
        } else {
          this.clearForm()
          this.props.setMessage("Success!")
          this.props.showFormFunc()
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

      <div className = 'form-div entries-form' >
        <form onSubmit = {this.handleSubmit}>
          <p>{this.state.errorMessage}</p>
          <h3 className='sub-header'>Submit an Entry</h3>

          <label htmlFor='title' className='sub-header'>Title</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor='body' className='sub-header'>Entry Text</label>
          <textarea
            name='body'
            value={this.state.body}
            onChange={this.handleChange}
          />

          <div className='row'>
            <div className='dropzone columns small-6'>
              <Dropzone onDrop={this.onDrop}>
                <p className='dropzone-text'>Only one photo per entry: drag it here or click to upload!</p>

              </Dropzone>
            </div>
            <div className='columns small-6'>
              <h5>Preview:</h5>
              {preview}
            </div>
          </div>

          <div className='row center'>
            <input
              type='submit'
              value='Submit'
              className='general-button'/>
          </div>
        </form>
      </div>
    )
  }
}

export default EntryFormContainer
