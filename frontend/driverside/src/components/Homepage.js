import React, { useState, useContext, useEffect } from "react";
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

function SetViewOnClick() {
  useMapEvent("click", () => {
    document.getElementById("sidebar").style.width = "0%";
  });

  return null;
}

function Homepage() {
  const [coord, setcoord] = useState([12.986881275665127, 79.97068405146092]);
  const [mark, setmark] = useState([12.9885, 79.97483]);
  const [s, sets] = useState(0);
  const [tr, settr] = useState(true);
  const [inte, setinte] = useState();
  const { selbus, setselbus } = useContext(Appcontext);
  console.log(selbus);
  useEffect(() => {
    if (tr === false) {
      clearInterval(inte);
      Track();
    }
    //eslint-disable-next-line
  }, [selbus]);
  function Track() {
    settr(false);
    const MINUTE_MS = 5000;
    function errors(err) {
      console.log("error", err);
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };
    const interval = setInterval(() => {
      sets(0);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errors, options);
      } else {
        console.log("ok");
        if (MINUTE_MS === 100000) {
          setselbus("100secs detected");
        }
      }
      function showPosition(position) {
        setmark([position.coords.latitude, position.coords.longitude]);
        var k = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        console.log(k);
        const st = async () => {
          axios.defaults.xsrfCookieName = "csrftoken";
          axios.defaults.xsrfHeaderName = "X-CSRFToken";
          console.log(selbus);
          await axios.put("coord/" + selbus + "/", k);
        };
        st();
      }
    }, MINUTE_MS);
    setinte(interval);
  }

  function Stoptrack() {
    clearInterval(inte);
    settr(true);
  }

  function updco() {
    if (s === 1) {
      sets(2);
    } else {
      sets(1);
    }
    setcoord(mark);
  }
  function Nice() {
    if (tr) {
      return (
        <div>
          <button id="track" className="tr" onClick={() => Track()}>
            Track
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button id="stop" className="tr" onClick={() => Stoptrack()}>
            Stop
          </button>
        </div>
      );
    }
  }

  return (
    <div>
      <MapContainer center={mark} zoom={17} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={SVCE}
          position={[12.986881275665127, 79.9705305146092]}
        ></Marker>
        <Marker icon={bus} position={mark}>
          <Popup>{JSON.parse(selbus)}</Popup>
        </Marker>
        <SetViewOnClick />
        <Setview coord={coord} s={s} />
      </MapContainer>

      <div>
        <button
          id="dropdown"
          title="DropDownButton"
          onClick={() =>
            (document.getElementById("sidebar").style.width = "80%")
          }
        >
          <FaUserCircle size={33} />
        </button>
        <div>
          <Nice />
        </div>
        <button id="center" title="Center" onClick={() => updco()}>
          <AiFillCompass size={40} />
        </button>
      </div>
    </div>
  );
}

export default Homepage;
