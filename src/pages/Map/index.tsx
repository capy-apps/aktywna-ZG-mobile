import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { MapView } from "../../components/MapView";
import { useBikeTrips } from "../../features/BikeTrips/useBikeTrips";
import { useBikePaths } from "../../features/BikePaths/useBikePaths";

const Map: React.FC = () => {
  const { bikeTrips, isBikeTripsPending, bikeTripsError } = useBikeTrips();
  const { bikePaths, isBikePathsPending, bikePathsError } = useBikePaths();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mapa</IonTitle>
          </IonToolbar>
        </IonHeader>

        <MapView center={[51.9356214, 15.5061862]} bikePaths={bikePaths} />
      </IonContent>
    </IonPage>
  );
};

export default Map;