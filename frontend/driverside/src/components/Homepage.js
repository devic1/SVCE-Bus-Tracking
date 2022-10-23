import React, { useState, useEffect } from "react";
import { AiFillCompass } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";

function Setview({ coord, s }) {
  const mp = useMap();
  mp.removeControl(mp.zoomControl);
  if (s !== 0) {
    mp.setView(coord, 16.4, { animate: true });
  }

  return null;
}

function SetViewOnClick({ animateRef }) {
  useMapEvent("click", () => {
    document.getElementById("sidebar").style.width = "0%";
  });

  return null;
}

function Homepage() {
  const [coord, setcoord] = useState([12.950020262403736, 80.1637905233405]);
  const [mark, setmark] = useState([12.950020262403736, 80.1637905233405]);
  const [s, sets] = useState(0);
  const [rt, setrt] = useState([]);
  const [tr, settr] = useState(true);
  const [inte, setinte] = useState();

  function Track() {
    settr(false);
    const MINUTE_MS = 5000;
    function errors(err) {
      console.log("error");
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
      }
      function showPosition(position) {
        setmark([position.coords.latitude, position.coords.longitude]);
        var k = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          routeno: '"30/39"',
        };
        console.log(k);
        const st = async () => {
          await axios.put("coord/11/", k);
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
  useEffect(() => {
    const ft = async () => {
      const response = await axios.get("/route/3/");
      setrt(response.data[0]["route"]["key"]);
    };
    ft();
  }, []);

  const polyline = rt.slice();

  const fillBlueOptions = { fillColor: "blue" };
  const bus = new L.icon({
    iconUrl: require("./bus2.png"),
    iconSize: [17, 17],
  });

  function updco() {
    sets(1);
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
      <MapContainer center={coord} zoom={16.4} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={fillBlueOptions} positions={polyline} />
        <Marker icon={bus} position={mark}>
          <Popup>Bus No 30.</Popup>
        </Marker>
        <SetViewOnClick />
        <Setview coord={coord} s={s} />
      </MapContainer>

      <div>
        <button
          id="dropdown"
          onClick={() =>
            (document.getElementById("sidebar").style.width = "80%")
          }
        >
          <FaUserCircle size={23} />
        </button>
        <div>
          <Nice />
        </div>
        <button id="center" onClick={() => updco()}>
          <AiFillCompass size={30} />
        </button>
      </div>
    </div>
  );
}

export default Homepage;
