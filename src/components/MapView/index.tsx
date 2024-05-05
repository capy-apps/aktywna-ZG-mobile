import { useIonViewDidEnter } from "@ionic/react";
import { LatLngExpression, LatLngTuple } from "leaflet";
import {
  Circle,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap
} from "react-leaflet";
import { BikePath } from "../../features/BikePaths/types";
import { Fragment, useState } from "react";
import { RepairStation } from "../../features/RepairStations/types";
import { Geolocation } from "@capacitor/geolocation";
import { BikeTripLocations } from "../../features/BikeTrips/types";

interface MapViewProps {
  center: LatLngTuple;
  bikePaths?: BikePath[] | undefined;
  repairStations?: RepairStation[] | undefined;
  bikeTrip?: BikeTripLocations | undefined;
}

export const MapView = ({
  center,
  bikePaths,
  repairStations,
  bikeTrip
}: MapViewProps) => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(
    null
  );

  useIonViewDidEnter(() => {
    window.dispatchEvent(new Event("resize"));

    Geolocation.getCurrentPosition().then((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  });

  function ChangeMapView({ coords }: { coords: LatLngTuple }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LayersControl position="topright">
        <LayersControl.Overlay name="Ścieżki rowerowe" checked>
          {bikePaths && (
            <LayerGroup>
              {bikePaths.map((bikePath) => {
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
          )}
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

      {bikeTrip && (
        <Polyline
          positions={bikeTrip.locations.map((location) => [
            location.latitude,
            location.longitude
          ])}
        />
      )}

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Twoja lokalizacja</Popup>
        </Marker>
      )}

      <ChangeMapView coords={center} />
    </MapContainer>
  );
};
