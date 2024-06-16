import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { convertTimestamp } from "../../utils/date";
import { useBikeTrips } from "../../features/BikeTrips/useBikeTrips";
import { MapView } from "../../components/MapView";
import { useParams } from "react-router";
import { camera, caretBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { URLS } from "../../URLS";
import Axios from "../../utils/axios";
import { Rating } from "react-simple-star-rating";

interface ParamTypes {
  id: string;
}

const BikeTripDetails = () => {
  const { id } = useParams<ParamTypes>();
  const { bikeTrip, isBikeTripPending, ratings, rateBikeTrip, addPhoto } =
    useBikeTrips(id);

  const [photo, setPhoto] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [isPhotoAlertOpen, setIsPhotoAlertOpen] = useState(false);

  useEffect(() => {
    if (bikeTrip && bikeTrip.photos.length > 0) {
      const photoID = bikeTrip.photos[0].toString();
      Axios.get<string>(URLS.PHOTOS(photoID)).then((res) => {
        setPhoto(res.data);
      });
    }
  }, [bikeTrip]);

  useEffect(() => {
    if (bikeTrip) {
      setRating(ratings[bikeTrip.id] || 0);
    }
  }, [bikeTrip, ratings]);

  const openFileDialog = () => {
    (document as any).getElementById("file-upload").click();
  };

  const sendPhoto = (_event: any) => {
    const file = _event.target.files![0];
    addPhoto.mutate({ id: bikeTrip!.id, photo: file });
    setIsPhotoAlertOpen(true);
  };

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

              {bikeTrip.rating && (
                <p>Ocena: {Math.round(bikeTrip.rating)} / 5 ⭐️</p>
              )}
              
              <Rating
                initialValue={rating}
                onClick={(rate) => {
                  setRating(rate);
                  rateBikeTrip(bikeTrip.id, rate);
                }}
                readonly={rating !== 0}
              />

              <input
                type="file"
                id="file-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={sendPhoto}
              />

              <IonButton onClick={openFileDialog}>
                <IonIcon slot="icon-only" icon={camera}></IonIcon>
              </IonButton>
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

            {photo && (
              <IonImg
                src={`data:image/jpeg;base64,${photo}`}
                className="Ion-Img"></IonImg>
            )}
          </IonCard>
        )}
      </IonContent>


      <IonAlert
        isOpen={isPhotoAlertOpen}
        header="Zdjęcie przesłane"
        message="Zostanie ono dodane po zatwierdzeniu przez administratora"
        buttons={['OK']}
        onDidDismiss={() => setIsPhotoAlertOpen(false)}
      ></IonAlert>
    </IonPage>
  );
};

export default BikeTripDetails;
