import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useEvents } from "../../features/Events/useEvents";
import { convertTimestamp } from "../../utils/date";
import "../mainStyles.css";

const Events: React.FC = () => {
  const { events, isEventsPending, eventsError } = useEvents();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wydarzenia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="Ion-Content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Wydarzenia</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isEventsPending && <div>Ładowanie...</div>}
        <div className="card-container">
        {events &&
        
          events.map((event) => (
            
            <IonCard key={event.id} className="Ion-Card">
              {event.image && (
                <img
                  src={`data:image/jpeg;base64,${event.image}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover"
                  }}
                />
              )}
              <IonHeader className="Ion-Header">
                <IonCardTitle>{event.name}</IonCardTitle>
                <IonCardSubtitle className="Ion-Card-Subtitle">
                  {convertTimestamp(event.created_at)}
                </IonCardSubtitle>
              </IonHeader>

              <IonCardContent className="Ion-Card-Content">
                <p>{event.description}</p>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Events;
