import React, { useState, useEffect, useContext } from "react";
import { AiFillCompass } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import Appcontext from "./Appcontext";

function Setview({ coord, s }) {
  const mp = useMap();
  mp.removeControl(mp.zoomControl);
  if (s !== 0) {
    mp.setView(coord, 17, { animate: true });
  }
  return null;
}

function SetViewOnClick() {
  useMapEvent("click", () => {
    document.getElementById("sidebar").style.width = "0%";
  });
  return null;
}

const bus = new L.icon({
  iconUrl: require("./Bus marker.png"),
  iconSize: [45, 45],
  shadowUrl: require("./shadow.png"),
  shadowSize: [48, 48],
  shadowAnchor: [25, 16],
});

const SVCE = new L.icon({
  iconUrl: require("./clg.png"),
  iconSize: [40, 40],
  shadowUrl: require("./clg 2.png"),
  shadowSize: [43, 43],
  shadowAnchor: [23, 19],
});

function Homepage() {
  const [coord, setcoord] = useState([12.986881275665127, 79.97068405146092]);
  const [mark, setmark] = useState([12.9885, 79.97483]);
  const [it, setit] = useState([]);
  const [tr, settr] = useState(false);
  const { selbus, setselbus } = useContext(Appcontext);
  const [s, sets] = useState(0);
  const MINUTE_MS = 5000;

  useEffect(() => {
    if (MINUTE_MS === 10000) {
      setselbus("Error");
    }
    const st = async () => {
      const response = await axios.get("/coord/" + selbus + "/");
      setmark([response.data[0]["lat"], response.data[0]["lon"]]);
    };
    st();
    //eslint-disable-next-line
  }, []);

  function Setcoord() {
    const interval = setInterval(() => {
      const st = async () => {
        const response = await axios.get("coord/" + selbus + "/");
        setmark([response.data[0]["lat"], response.data[0]["lon"]]);
        sets(0);
      };
      st();
    }, MINUTE_MS);
    setit([...it, interval]);
    for (let index = 0; index < it.length; index++) {
      clearInterval(it[index]);
    }
  }
  useEffect(() => {
    if (tr === false) {
      const timer = setTimeout(() => {
        Setcoord();
      }, 5000);
      settr(true);
      return () => clearTimeout(timer);
    } else {
      Setcoord();
    }
    //eslint-disable-next-line
  }, [selbus]);

  function updco() {
    if (s === 1) {
      sets(2);
    } else {
      sets(1);
    }
    setcoord(mark);
  }
  return (
    <div className="ma">
      <MapContainer center={coord} zoom={16.5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={SVCE}
          position={[12.986881275665127, 79.9705305146092]}
        ></Marker>
        <Marker icon={bus} position={mark}>
          <Popup>{selbus}</Popup>
        </Marker>
        <SetViewOnClick />
        <Setview coord={coord} s={s} />
      </MapContainer>
      <div>
        <button
          id="dropdown"
          title="Dropdown"
          onClick={() =>
            (document.getElementById("sidebar").style.width = "80%")
          }
        >
          <FaUserCircle size={33} />
        </button>
        <button id="center" title="Navigator" onClick={() => updco()}>
          <AiFillCompass size={40} />
        </button>
      </div>
    </div>
  );
}

export default Homepage;
