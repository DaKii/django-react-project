import React, { createRef, Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'
import osmtogeojson from 'osmtogeojson'
import { GeoJsonObject } from 'geojson';


//This creates a icon for the leaflet map because the icon given in react-leaflet is broken
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
  iconSize: [25,25]
})

//Class componenet for the Map Initialization
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

  //Initial Variables
  mapRef = createRef<Map>() //References Map Component
  overpassQuery = 'amenity=restaurant' //Restaurant Query


  //Starts when Component successfully mounts
  componentDidMount(){
    //Use GeoLocation API to find User location then set state their location
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
    //Initial Local Variable
    const map = this.mapRef.current
    
    //Gets bound coordinate of users
    if (map != null && this.state.haveUserLocation === true && this.state.bounds === ''){
       map.leafletElement.invalidateSize()
       const bounds = map.leafletElement.getBounds().getSouth() + ',' + map.leafletElement.getBounds().getWest() + ',' + map.leafletElement.getBounds().getNorth() + ',' + map.leafletElement.getBounds().getEast();
      this.setState({
        bounds: bounds
      })
      console.log(this.state.bounds)
    }

    //This creates the OverPass URL
    const APIUrl = this.buildOverpassApiUrl(this.overpassQuery, this.state.bounds)
    
    //If no restaurants are found then look for restaurants in overpass API using AXIOS  
    if(this.state.restaurants == null) {
      axios.get(APIUrl)
      .then((response: { data: any; }) => {
        const resultAsGeojson = osmtogeojson(response.data)
        console.log(resultAsGeojson.features)
        this.setState({
          restaurants : resultAsGeojson.features //Returns geojson features
        })
      })
    }
  }

  //Create the API URL with user's bounds and the query (amenity=restaurant)
  buildOverpassApiUrl(overpassQuery:string, bounds: string) {
    var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
    var query = '?data=[out:json][timeout:15];(' + nodeQuery + ');out;';
    var baseUrl = 'https://lz4.overpass-api.de/api/interpreter';
    var resultUrl = baseUrl + query;
    return resultUrl;
  }


  render() {
    //Initialize the position
    const position: [number, number] = [this.state.location.lat, this.state.location.lng]
    
    //If user location has been found, render the map
    if(this.state.haveUserLocation)
      console.log(this.state.haveUserLocation)
      return (
        //Using react-leaflet library and their componenents
        //Doesn't render GeoJson layer 
        //-- solutions -- Make own componenet to render markers and polygons, search for the problem (key function needed)
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
            ? <GeoJSON key="my_key" data={this.state.restaurants} />
            : <div></div>
          }
        </Map>
      )
  }
}