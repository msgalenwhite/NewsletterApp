import React, {Component} from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

class MapComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
    this.initMap = this.initMap.bind(this)
    this.callMap = this.callMap.bind(this)
  }

  componentDidMount() {
    this.callMap()
  }

  callMap() {
    window.initMap = this.initMap
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyC668sqglnHBxF-VWPbu3FYTzQfdmXzu2k&callback=initMap")
    console.log("callMapWorks?!")
  }

  initMap() {
    fetch("/api/v1/users.json", {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
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
        this.setState({ users: response })

        //then create a map

        let boston = {lat: 42.36008, lng: -71.05888}

        this.map = new google.maps.Map(document.getElementById("map"), {
          zoom: 9,
          center: boston
        })

        let locations = this.state.users.map ((user) => {

          return (
            {
              lat: user.latitude,
              lng: user.longitude,
              name: user.first_name
            }
          )
        })

        let markers = []

        locations.forEach((place) => {
          let marker = new google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            label: place.name
          })

          markers.push(marker)
          marker.setMap(this.map)
        })
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }
  render() {

    return(
      <div className='map' id='map'></div>
    )
  }
}

export default MapComponent

function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}
