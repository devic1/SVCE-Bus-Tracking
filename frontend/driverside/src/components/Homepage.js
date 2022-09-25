import React, { useState } from "react";
import { AiFillCompass } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
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
  mp.removeControl(mp.zoomControl);
  if (s !== 0) {
    mp.setView(coord, 16.4, { animate: true });
  }

  return null;
}

function Homepage() {
  const [coord, setcoord] = useState([12.950020262403736, 80.1637905233405]);
  const [mark, setmark] = useState([12.950020262403736, 80.1637905233405]);
  const [s, sets] = useState(0);

  const polyline = [
    [12.950020262403736 + 0.0002, 80.1637905233405],
    [12.950020262403736 + 0.001, 80.1637905233405],
    [12.950020262403736 + 0.002, 80.1637905233405 + 0.001],
    [12.950020262403736 + 0.003, 80.1637905233405 + 0.003],
    [12.950020262403736 + 0.004, 80.1637905233405 + 0.003],
    [12.950020262403736 + 0.005, 80.1637905233405 + 0.004],
    [12.950020262403736 + 0.006, 80.1637905233405 + 0.005],
  ];

  const fillBlueOptions = { fillColor: "blue" };
  const bus = new L.icon({
    iconUrl: require("./bus2.png"),
    iconSize: [17, 17],
  });
  function change() {
    sets(0);
    setmark([mark[0] + 0.00001, mark[1]]);
    console.log("ok");
  }
  function updco() {
    if (s !== 1) {
      sets(1);
    } else {
      sets(2);
    }
    setcoord(mark);
  }

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
        <button id="change" onClick={() => change()} />
        <button id="dropdown">
          <GiHamburgerMenu size={23} />
        </button>
        <button id="center" onClick={() => updco()}>
          <AiFillCompass size={30} />
        </button>
      </div>
    </div>
  );
}

export default Homepage;
