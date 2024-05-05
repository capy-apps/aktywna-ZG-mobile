import { useIonViewDidEnter } from "@ionic/react";
import { LatLngTuple } from "leaflet";
import {
  Circle,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer
} from "react-leaflet";
import { BikePath } from "../../features/BikePaths/types";
import { Fragment } from "react";
import { RepairStation } from "../../features/RepairStations/types";

interface MapViewProps {
  center: LatLngTuple;
  bikePaths?: BikePath[] | undefined;
  repairStations?: RepairStation[] | undefined;
}

export const MapView = ({
  center,
  bikePaths,
  repairStations
}: MapViewProps) => {
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

      <LayersControl position="topright">
        <LayersControl.Overlay name="Ścieżki rowerowe" checked>
          <LayerGroup>
            {bikePaths?.map((bikePath) => {
              const firstLocation = bikePath.locations[0];
              const lastLocation =
                bikePath.locations[bikePath.locations.length - 1];
              const infoLocations = [firstLocation, lastLocation];

              return (
                <Fragment key={bikePath.id}>
                  {infoLocations.map((location) => (
                    <Circle
                      key={location.latitude + location.longitude}
                      center={[location.latitude, location.longitude]}
                      radius={20}
                      fill>
                      <Popup>{bikePath.name}</Popup>
                    </Circle>
                  ))}

                  <Polyline
                    positions={bikePath.locations.map((location) => [
                      location.latitude,
                      location.longitude
                    ])}
                  />
                </Fragment>
              );
            })}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Stacje serwisowe" checked>
          {repairStations?.map((repairStation) => (
            <Marker
              key={repairStation.id}
              position={[repairStation.latitude, repairStation.longitude]}>
              <Popup>{repairStation.name}</Popup>
            </Marker>
          ))}
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
