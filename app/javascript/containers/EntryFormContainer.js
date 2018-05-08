import React, {
  Component
} from 'react'

class EntryFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      photo: null,
      errorMessage: ""
    }
    this.formIsComplete = this.formIsComplete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitEntry = this.submitEntry.bind(this)
  }

  formIsComplete() {
    if (this.state.title === "" || this.state.body === "") {
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
      this.submitEntry()
    } else {
      this.setState({
        errorMessage: 'Please complete the form before submitting!'
      })
    }
  }

  submitEntry() {
    // fetch("/api/v1/entries.json")
    //   .then ( response => {
    //     if ( response.ok ) {
    //       return response;
    //     } else {
    //       let errorMessage = `${response.status} (${response.statusText})`;
    //       let error = new Error(errorMessage);
    //       throw(error);
    //     }
    //   })
    //   .then ( response => response.json() )
    //   .then ( response => {
    //     console.log(response)
    //   })
    //   .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  render() {

    return (
      <div className = 'form-div' >
        <form onSubmit = {this.handleSubmit}>
          <p>{this.state.errorMessage}</p>
          <h3>Submit an Entry</h3>

          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name = 'title'
            value = {this.state.title}
            onChange = {this.handleChange}
          />

          <label htmlFor='body'>Entry Text</label>
          <textarea
            name = 'body'
            value = {this.state.body}
            onChange = {this.handleChange}
          />

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
