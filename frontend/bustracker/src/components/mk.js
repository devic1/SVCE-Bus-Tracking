import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";

export default function BusMarker({ data }) {
  const { lat, lng } = data;
  return <LeafletTrackingMarker position={[lat, lng]} duration={3000} />;
}
