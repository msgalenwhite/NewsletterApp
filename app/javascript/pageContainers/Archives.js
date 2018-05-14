import React, {Component} from 'react'

class Archives extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Nov", "Dec"]


    return(
      <div className='newsletter-display-tile' >
        <div className='opaque-tile row' >
          <h4
            className='news-title'
            onClick={props.openMe}>
            {props.details.title}
          </h4>
          {displayItem}
        </div>
      </div>
    )
  }
}

export default Archives
