import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonNavLink,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { convertTimestamp } from "../../utils/date";
import { useBikeTrips } from "../../features/BikeTrips/useBikeTrips";
import '../mainStyles.css'

const BikeTrips: React.FC = () => {
  const { bikeTrips, isBikeTripsPending, bikeTripsError } = useBikeTrips();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Trasy rowerowe 🚴‍♂️</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Trasy rowerowe 🚴‍♂️</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isBikeTripsPending && <div>Ładowanie...</div>}

        {bikeTrips &&
          bikeTrips.map((trip) => (
            <IonCard key={trip.id} className="Ion-Card">
              <IonHeader className="Ion-Header">
                <IonCardTitle>{trip.name}</IonCardTitle>
                <IonCardSubtitle className="Ion-Card-Subtitle">
                  {convertTimestamp(trip.created_at)}
                </IonCardSubtitle>
              </IonHeader>

              <IonCardContent className="Ion-Card-Content">
                <p>{trip.description}</p>
                {trip.difficulty && <p>Poziom trudności: {trip.difficulty}</p>}
                {trip.length && <p>Długość trasy: {trip.length} km</p>}

                <IonButton routerLink={`/bikeTrips/${trip.id}`}>
                  Zobacz trasę
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default BikeTrips;
