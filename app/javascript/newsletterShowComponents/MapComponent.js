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
    this.drawMap = this.drawMap.bind(this)
    this.mapLocations = this.mapLocations.bind(this)
  }

  componentDidMount() {
    this.callMap()
  }

  callMap() {
    window.initMap = this.initMap
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyC668sqglnHBxF-VWPbu3FYTzQfdmXzu2k&callback=initMap")
  }

  drawMap() {
    const locations = this.mapLocations()

    let centerStats;
    if (locations.length > 0) {
      centerStats = {
        lat: locations[0].lat,
        lng: locations[0].lng
      }
    } else {
      centerStats = { lat: 33.8366, lng: 117.9143 }
    }

    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: centerStats
    })

    let markers = []

    locations.forEach((place) => {
      let marker = new google.maps.Marker({
        position: { lat: place.lat, lng: place.lng }
      })
      markers.push(marker)
      marker.setMap(this.map)
    })
  }

  initMap() {
    fetch(`/api/v1/newsletters/${this.props.newsletterId}/users.json`, {
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
        this.drawMap()
      })
      .catch ( error => console.error(`Error in fetch: ${error.message}`) );
  }

  mapLocations() {
    const locations = this.state.users.map ((user) => {
      if (user.latitude && user.longitude) {
        return (
          {
            lat: user.latitude,
            lng: user.longitude,
            name: user.first_name
          }
        )
      }
    })
    return locations
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
