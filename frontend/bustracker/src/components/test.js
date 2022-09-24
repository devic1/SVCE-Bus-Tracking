import React from "react";

function Test() {
  var map = L.map("map").setView([51.505, -0.09], 13);
  return <div id="map"></div>;
}

export default Test;
