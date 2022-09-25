import React from "react";

function navigator() {
  if (navigator.geolocation) {
    const l = navigator.geolocation.getCurrentPosition();
    console.log(l);
  } else {
    null;
  }
}
navigator();
return <div>navigator</div>;

export default navigator;
