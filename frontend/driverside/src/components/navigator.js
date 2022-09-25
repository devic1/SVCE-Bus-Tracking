import React, { useState } from "react";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("ok");
  }
}
function showPosition(position) {
  console.log(position.coords.latitude, position.coords.longitude);
}
var inter;
function setinter() {
  inter = setInterval(getLocation, 2000);
}
function stop() {
  clearInterval(inter);
}

function Navigator(istrack) {
  const [st, setst] = useState(istrack.istrack);
  if (st) {
    return (
      <button
        className="btn"
        onClick={() => {
          setinter();
          setst(false);
        }}
      >
        TRACK
      </button>
    );
  }
  return (
    <button
      className="btn"
      onClick={() => {
        stop();
        setst(true);
      }}
    >
      STOP
    </button>
  );
}
export default Navigator;
