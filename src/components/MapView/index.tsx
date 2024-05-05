import { useIonViewDidEnter } from "@ionic/react";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

interface MapViewProps {
  center: LatLngTuple;
}

export const MapView = ({ center }: MapViewProps) => {
  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event("resize"));
  });

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};
