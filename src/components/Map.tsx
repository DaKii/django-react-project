import React, { createRef, Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'
import osmtogeojson from 'osmtogeojson'
import { GeoJsonObject } from 'geojson';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
  iconSize: [25,25]
})


export default class initMap extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    haveUserLocation: false,
    restaurants: null as any,
    zoom: 1,
    bounds: ''
  }

  mapRef = createRef<Map>()
  overpassQuery = 'amenity=restaurant'
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUserLocation: true,
        zoom: 10
      })
    }, () => {
      console.log('User did not give permission');
    });

  }

  componentDidUpdate(){
    const map = this.mapRef.current
    if (map != null && this.state.haveUserLocation === true && this.state.bounds === ''){
       map.leafletElement.invalidateSize()
       const bounds = map.leafletElement.getBounds().getSouth() + ',' + map.leafletElement.getBounds().getWest() + ',' + map.leafletElement.getBounds().getNorth() + ',' + map.leafletElement.getBounds().getEast();
      this.setState({
        bounds: bounds
      })
      console.log(this.state.bounds)
    }

    const APIUrl = this.buildOverpassApiUrl(this.overpassQuery, this.state.bounds)
    console.log(APIUrl)
    if(this.state.restaurants == null) {
      axios.get(APIUrl)
      .then(response => {
        const resultAsGeojson = osmtogeojson(response.data)
        console.log(resultAsGeojson)
        return resultAsGeojson
      })
    }
  }

  buildOverpassApiUrl(overpassQuery:string, bounds: string) {
    var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
    var query = '?data=[out:json][timeout:15];(' + nodeQuery + ');out;';
    var baseUrl = 'https://lz4.overpass-api.de/api/interpreter';
    var resultUrl = baseUrl + query;
    return resultUrl;
  }



  render() {
    const position: [number, number] = [this.state.location.lat, this.state.location.lng]
    if(this.state.haveUserLocation)
      console.log(this.state.haveUserLocation)
      return (
        <Map ref={this.mapRef} className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>'
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
            icon={icon}
            position={[this.state.location.lat,this.state.location.lng]}>
            <Popup>
              Your location  <br /> Easily customizable.
            </Popup>
          </Marker>
          {
            this.state.restaurants != null 
            ? <GeoJSON data={this.state.restaurants} />
            : <div></div>
          }
        </Map>
      )
  }
}


