import {
  IonCard,
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

const Events: React.FC = () => {
  const { events, isEventsPending, eventsError } = useEvents();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wydarzenia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Wydarzenia</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isEventsPending && <div>Ładowanie...</div>}

        {events &&
          events.map((event) => (
            <IonCard>
              <IonHeader>
                <IonCardTitle>{event.name}</IonCardTitle>
                <IonCardSubtitle>{convertTimestamp(event.created_at)}</IonCardSubtitle>
              </IonHeader>

              <IonContent>
                <p>{event.description}</p>
              </IonContent>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Events;
