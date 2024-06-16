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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import Axios from "../../utils/axios";
import { useBikeTrips } from "../../features/BikeTrips/useBikeTrips";
import { URLS } from "../../URLS";
import { usePhotos } from "../../features/BikeTrips/usePhotos";
import { Gallery, Image } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";

export const Admin = () => {
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const { bikeTrips, refetchBikeTrips } = useBikeTrips();
  const { photos, refetchPhotos } = usePhotos();
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (password && password.length > 0 && !isLogged) {
      isAdmin();
    }
  }, [password, isLogged]);

  useEffect(() => {
    const password = sessionStorage.getItem("password");
    if (password) {
      setPassword(password);
    }
  }, []);

  const isAdmin = async () => {
    const isAdmin = await Axios.get<boolean>("/admin", {
      headers: {
        Authorization: password
      }
    });
    if (isAdmin) {
      Axios.defaults.headers.common["Authorization"] = password;
      sessionStorage.setItem("password", password);
      setIsLogged(true);
      refetchBikeTrips();
    }
  };

  const handleImageClick = (index: number, image: Image) => setIndex(index);

  const handleImageSelect = (index: number, image: Image) => {
    const photoId = image.key as string;
    Axios.put(URLS.PUBLIC_PHOTO(photoId)).then(() => {
      refetchPhotos();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Admin</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isLogged && (
          <IonList>
            <h2>Zdjęcia do zatwierdzenia:</h2>
            {photos && photos.length > 0 ? (
              <>
                <Gallery
                  onClick={handleImageClick}
                  onSelect={handleImageSelect}
                  images={photos.map((photo) => ({
                    src: `data:image/jpeg;base64,${photo.photo}`,
                    width: 4,
                    height: 3,
                    key: photo.id
                  }))}
                />
                <Lightbox
                  slides={photos.map((photo) => ({
                    src: `data:image/jpeg;base64,${photo.photo}`
                  }))}
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                />
              </>
            ) : (
              <div>Brak zdjęć do zatwierdzenia</div>
            )}

            <h2>Trasy rowerowe:</h2>
            {bikeTrips &&
              bikeTrips
                .sort((a, b) => (a.public ? 1 : -1))
                .map((trip) => (
                  <IonCard key={trip.id}>
                    <IonCardTitle>{trip.name}</IonCardTitle>
                    <IonCardSubtitle>{trip.description}</IonCardSubtitle>
                    <IonCardSubtitle>{trip.difficulty}</IonCardSubtitle>
                    <IonCardContent>
                      <IonButton routerLink={`/bikeTrips/${trip.id}`}>
                        Zobacz trasę
                      </IonButton>
                      {!trip.public && (
                        <IonButton
                          type="button"
                          color={"success"}
                          onClick={() => {
                            Axios.put(
                              URLS.PUBLIC_BIKE_TRIP(trip.id.toString())
                            ).then(() => {
                              refetchBikeTrips();
                            });
                          }}>
                          Opublikuj
                        </IonButton>
                      )}
                      <IonButton
                        type="button"
                        color="danger"
                        onClick={() => {
                          Axios.delete(
                            URLS.DELETE_BIKE_TRIP(trip.id.toString())
                          ).then(() => {
                            refetchBikeTrips();
                          });
                        }}>
                        Usuń
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
          </IonList>
        )}

        <IonAlert
          isOpen={!isLogged}
          header="Podaj hasło"
          buttons={[
            {
              text: "Zaloguj",
              cssClass: "secondary",
              handler: (data) => {
                setPassword(data.password);
              }
            }
          ]}
          inputs={[
            {
              placeholder: "Password",
              name: "password",
              type: "password"
            }
          ]}></IonAlert>
      </IonContent>
    </IonPage>
  );
};
