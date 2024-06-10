import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonNavLink,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { convertTimestamp } from "../../utils/date";
import { useBikeTrips } from "../../features/BikeTrips/useBikeTrips";
import "../mainStyles.css";
import { heart, heartDislike } from "ionicons/icons";

const BikeTrips: React.FC = () => {
  const {
    bikeTrips,
    isBikeTripsPending,
    bikeTripsError,
    favourites,
    addFavourite
  } = useBikeTrips();

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="playground">
            {bikeTrips &&
              bikeTrips
                .sort((a, b) => (favourites.includes(b.id) ? 1 : -1))
                .map((trip) => (
                  <IonCard key={trip.id} className="Ion-Card-Photo">
                    <div>
                      <IonIcon
                        onClick={() => addFavourite(trip.id)}
                        icon={
                          favourites.includes(trip.id) ? heartDislike : heart
                        }
                        style={{
                          color: "red",
                          fontSize: "30px",
                          cursor: "pointer",
                          position: "absolute",
                          right: "10px",
                          top: "10px"
                        }}
                      />
                      {trip.image.length > 0 && (
                        <img
                          src={trip.image}
                          alt={trip.name}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover"
                          }}
                        />
                      )}
                    </div>
                    <IonCardHeader className="Ion-Header">
                      <IonCardTitle>{trip.name}</IonCardTitle>
                      <IonCardSubtitle className="Ion-Card-Subtitle">
                        {convertTimestamp(trip.created_at)}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent className="Ion-Card-Content">
                      <p>{trip.description}</p>
                      {trip.difficulty && (
                        <p>Poziom trudności: {trip.difficulty}</p>
                      )}
                      {trip.length && <p>Długość trasy: {trip.length} km</p>}

                      <IonButton
                        routerLink={`/bikeTrips/${trip.id}`}
                        className="Ion-Button">
                        Zobacz trasę
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BikeTrips;
