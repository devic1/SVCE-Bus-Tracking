import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

function Setview({ coord, s }) {
  const mp = useMap();
  if (s != 0) {
    mp.setView(coord, 16.4, { animate: true });
    console.log(mp.getCenter());
  }

  return null;
}

function Homepage() {
  const [coord, setcoord] = useState([12.950020262403736, 80.1637905233405]);
  const [mark, setmark] = useState([12.950020262403736, 80.1637905233405]);
  const [s, sets] = useState(0);
  const fillBlueOptions = { fillColor: "blue" };

  const polyline = [
    [12.950020262403736, 80.1637905233405],
    [12.950020262403736 + 0.001, 80.1637905233405],
    [12.950020262403736 + 0.002, 80.1637905233405 + 0.001],
    [12.950020262403736 + 0.003, 80.1637905233405 + 0.003],
    [12.950020262403736 + 0.004, 80.1637905233405 + 0.003],
    [12.950020262403736 + 0.005, 80.1637905233405 + 0.004],
    [12.950020262403736 + 0.006, 80.1637905233405 + 0.005],
  ];
  const bus = new L.icon({
    iconUrl: require("./bus.png"),
    iconSize: [17, 17],
  });
  function change() {
    sets(0);
    setmark([mark[0] + 0.00001, mark[1]]);
    console.log("ok");
  }
  function updco() {
    if (s != 1) {
      sets(1);
    } else {
      sets(2);
    }
    setcoord(mark);
  }
  //setInterval(change, 1000);

  return (
    <div>
      <MapContainer center={coord} zoom={16.4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={fillBlueOptions} positions={polyline} />
        <Marker icon={bus} position={mark}>
          <Popup>Bus No 30.</Popup>
        </Marker>

        <Setview coord={coord} s={s} />
      </MapContainer>
      <div>
        <button onClick={() => change()}>move</button>
        <button onClick={() => updco()}>Center</button>
      </div>
    </div>
  );
}

export default Homepage;
