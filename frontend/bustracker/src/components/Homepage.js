import React, { useState, useRef, useMemo, useEffect } from "react";
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
  const map = useMapEvent("click", (e) => {
    document.getElementById("sidebar").style.width = "0%";
  });

  return null;
}

const bus = new L.icon({
  iconUrl: require("./bus2.png"),
  iconSize: [27, 27],
});

function Homepage() {
  const [coord, setcoord] = useState([12.958055492245812, 80.1441371440888]);
  const [mark, setmark] = useState([12.958055492245812, 80.1441371440888]);
  useEffect(() => {
    const st = async () => {
      const response = await axios.get("/coord/11/");
      setmark([response.data[0]["lat"], response.data[0]["lon"]]);
      sets(0);
    };
    st();
  }, []);
  const [s, sets] = useState(0);
  const MINUTE_MS = 10000;
  useEffect(() => {
    const interval = setInterval(() => {
      const st = async () => {
        const response = await axios.get("/coord/11/");
        setmark([response.data[0]["lat"], response.data[0]["lon"]]);
        sets(0);
      };
      st();
      console.log("Logs every 10 seconds");
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  const [rt, setrt] = useState([]);
  useEffect(() => {
    const ft = async () => {
      const response = await axios.get("/route/3/");
      setrt(response.data[0]["route"]["key"]);
    };
    ft();
  }, []);

  const polyline = rt.slice();

  const markerRef = useRef(null);

  const fillBlueOptions = { fillColor: "blue" };

  function animatebtw(sp, ep) {
    let sp1 = sp[0].toFixed(4);
    let sp2 = sp[1].toFixed(4);
    let ep1 = ep[0].toFixed(4);
    let ep2 = ep[1].toFixed(4);
    //console.log(sp1, sp2, ep1, ep2);
    let cal1 = (parseFloat(sp1) + parseFloat(ep1)) / 2;
    let cal2 = (parseFloat(sp2) + parseFloat(ep2)) / 2;
    //console.log(cal1, cal2);
    return [parseFloat(cal1.toFixed(4)), parseFloat(cal2.toFixed(4))];
  }

  /*function vie() {
    let l = i + 1;
    let f2 = animatebtw(route30[l - 1], route30[l]);
    let f1 = animatebtw(route30[l - 1], f2);
    let f3 = animatebtw(f2, route30[l]);
    updmark([f1, f2, f3, route30[l]]);
    // console.log(route30[l - 1]);
    //console.log(route30[l]);
    setmark(rt[l]);
    seti(l);
  }
  function distance([at, bt]) {
    let s1 = Math.pow(bt[0] - at[0], 2);
    let s2 = Math.pow(bt[1] - at[1], 2);
    let s3 = Math.sqrt(s1 + s2);
    return s3;
  }*/

  function updco() {
    sets(1);
    setcoord(mark);
  }
  return (
    <div className="ma">
      <MapContainer center={coord} zoom={16.4} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline pathOptions={fillBlueOptions} positions={polyline} />
        <Marker icon={bus} position={mark} ref={markerRef}>
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
        <button id="center" onClick={() => updco()}>
          <AiFillCompass size={30} />
        </button>
      </div>
    </div>
  );
}

export default Homepage;
