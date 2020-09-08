import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import { returnLatLng } from "./geocode";
import Modal from "react-bootstrap/Modal";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
// import ShowMap from "./testMap"

function Map(props) {
  const [selectedRest, setSelectedRest] = useState(null);
  const [longLat, setLongLat] = useState(null)
  React.useEffect(()=>{
    const getCoor = async()=>{
      let result = await props.longLat
      setLongLat(result);
      console.log(parseFloat(result[0]), parseFloat(result[1]))
    }
    getCoor()
  }, [props.longLat])
  if(longLat !== null){
    return (
      <div>
        <GoogleMap 
          defaultZoom={14} 
          defaultCenter={{lat: parseFloat(longLat[0]), lng: parseFloat(longLat[1])}}
        >  
            <Marker 
              key={props.address}
              position={{
                lat: parseFloat(longLat[0]),
                lng: parseFloat(longLat[1])
              }} 
              onClick={() => {
                  setSelectedRest(props.address);
              }}  
           />

          {selectedRest && (
            <InfoWindow
              onCloseClick={() => {
                setSelectedRest(null);
              }}
              position={{
                lat: parseFloat(longLat[0]),
                lng: parseFloat(longLat[1])
              }} 
            >
              <div>
                <h4>{selectedRest.address}</h4>
              </div>
            </InfoWindow> 
          )} 
        </GoogleMap>
      </div>
    );
  } else {
    return(
      <div>
        <h1>No Map Can Be Currently Generated</h1>
      </div>
    )
  }
} 

const WrappedMap = withScriptjs(withGoogleMap(props => <Map{...props}/>));

function Other(props) {
  return (
    <div style={{ width: "100vw", height: "82vh" }}>
      <WrappedMap
        googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }}/>}
        longLat={props.longLat}/>
    </div>
  );
}

const MapView = (props) => {
  const [showMap, handleShowMap] = useState(false);
  const [longLa, setLongLa] = useState([]);
  const [passIn, setPassIn] = useState(null);
  return (
    <Fragment>
      <Button
        style={{
          fontSize: "15px",
          border: "none",
          backgroundColor: "#FAF0CA",
          color: "#0D3B66"
        }}
        onClick={() => {
          handleShowMap(true);
          setLongLa(returnLatLng(props.address));
        }}
      >
        View
      </Button>

      <Modal
        show={showMap}
        onHide={() => {
          handleShowMap(false);
        }}
        style={{marginLeft: "-20%"}}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#FAF0CA", width: "150vh"}}>
          <Modal.Title
            style={{ textAlign: "center", backgroundColor: "#FAF0CA" }}
          >
            Location on Maps
          </Modal.Title>
        </Modal.Header>
        <Other
            longLat={returnLatLng(props.address)}/>
      </Modal>
    </Fragment>
  );
};

export default MapView;
