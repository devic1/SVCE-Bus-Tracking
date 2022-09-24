import React, { useState, useRef, } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import L from "leaflet";


function Setview({animateRef,coord}) {
	const map = useMapEvent('click',() => {
		map.setView(coord,map.getZoom(),{
			animate: animateRef.current || false,
		})
	})
	return null;
}

function Homepage() {
	const animateRef = useRef(true);
	const [coord, setcoord] = useState([12.950020262403736, 80.1637905233405]);
  const bus = new L.icon({
    iconUrl: require("./bus.png"),
    iconSize: [25, 25],
  });
  function Set() {
    console.log("Hekki");
    setcoord([coord[0] + 0.0001, coord[1]]);
  }
  return (
    <div>
      <MapContainer center={coord} zoom={40} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={bus} position={coord}>
          <Popup>Bus No 30.</Popup>
        </Marker>
	  <Setview animateRef={animateRef} coord={coord} />
      </MapContainer>
      <div>
        <button onClick={() => Set()}>Hello</button>
      </div>
    </div>
  );
}

export default Homepage;
