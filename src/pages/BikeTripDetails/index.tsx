import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { convertTimestamp } from "../../utils/date";
import { useBikeTrips } from "../../features/BikeTrips/useBikeTrips";
import { MapView } from "../../components/MapView";
import { useParams } from "react-router";
import { caretBack } from "ionicons/icons";

interface ParamTypes {
  id: string;
}

const BikeTripDetails = () => {
  const { id } = useParams<ParamTypes>();
  const { bikeTrip, isBikeTripPending, bikeTripError } = useBikeTrips(id);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Powrót" icon={caretBack}></IonBackButton>
          </IonButtons>
          <IonTitle>Trasy rowerowe 🚴‍♂️</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Trasy rowerowe 🚴‍♂️</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isBikeTripPending && <div>Ładowanie...</div>}

        {bikeTrip && (
          <IonCard className="Ion-Card">
            <IonHeader className="Ion-Header">
              <IonCardTitle>{bikeTrip.name}</IonCardTitle>
              <IonCardSubtitle class="Ion-Card-Subtitle">
                {convertTimestamp(bikeTrip.created_at)}
              </IonCardSubtitle>
            </IonHeader>

            <IonCardContent>
              <p>{bikeTrip.description}</p>
              {bikeTrip.difficulty && (
                <p>Poziom trudności: {bikeTrip.difficulty}</p>
              )}
              {bikeTrip.length && <p>Długość trasy: {bikeTrip.length} km</p>}
            </IonCardContent>

            {bikeTrip.locations.length > 0 ? (
              <div className="Map-div">
                <MapView
                  center={[
                    bikeTrip.locations[0].latitude,
                    bikeTrip.locations[0].longitude
                  ]}
                  bikeTrip={bikeTrip}
                />
              </div>
            ) : (
              <div>Brak danych o trasie</div>
            )}

            {bikeTrip.image.length > 0 && (
              <IonImg
                src={bikeTrip.image}
                alt={bikeTrip.name}
                className="Ion-Img"></IonImg>
            )}
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BikeTripDetails;
