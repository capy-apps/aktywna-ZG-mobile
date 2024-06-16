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
import { Rating } from "react-simple-star-rating";
import { Gallery, Image } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";

interface ParamTypes {
  id: string;
}

const BikeTripDetails = () => {
  const { id } = useParams<ParamTypes>();
  const { bikeTrip, isBikeTripPending, ratings, rateBikeTrip, addPhoto } =
    useBikeTrips(id);

  const [index, setIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [isPhotoAlertOpen, setIsPhotoAlertOpen] = useState(false);

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

  const handleImageClick = (index: number, image: Image) => setIndex(index);

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

            {bikeTrip.photos.length > 0 && (
              <>
                <Gallery
                  onClick={handleImageClick}
                  enableImageSelection={false}
                  images={bikeTrip.photos.map((photo) => ({
                    src: `data:image/jpeg;base64,${photo.image}`,
                    width: 4,
                    height: 3
                  }))}
                />
                <Lightbox
                  slides={bikeTrip.photos.map((photo) => ({
                    src: `data:image/jpeg;base64,${photo.image}`
                  }))}
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                />
              </>
            )}

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
          </IonCard>
        )}
      </IonContent>

      <IonAlert
        isOpen={isPhotoAlertOpen}
        header="Zdjęcie przesłane"
        message="Zostanie ono dodane po zatwierdzeniu przez administratora"
        buttons={["OK"]}
        onDidDismiss={() => setIsPhotoAlertOpen(false)}></IonAlert>
    </IonPage>
  );
};

export default BikeTripDetails;
