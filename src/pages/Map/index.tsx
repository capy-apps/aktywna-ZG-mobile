import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { MapView } from '../../components/MapView';

const Map: React.FC = () => {
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

        <MapView center={[51.9356214, 15.5061862]} />

      </IonContent>
    </IonPage>
  );
};

export default Map;

