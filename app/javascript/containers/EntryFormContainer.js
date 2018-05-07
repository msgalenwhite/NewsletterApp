import React, {Component} from 'react'

class EntryFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      photo: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    event.preventDefault()
  }

  render() {

    return(
      <div className='form-div'>
        <form onSubmit={this.handleSubmit}>
          <h3>Submit an Entry</h3>

          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange} />

          <label htmlFor='body'>Entry Text</label>
          <textarea
            name='body'
            value={this.state.body}
            onChange={this.handleChange}/>
          <input type='submit' value='Submit' className='general-button'/>
        </form>
      </div>
    )
  }
}

export default EntryFormContainer
