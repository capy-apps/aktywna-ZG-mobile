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

export const Admin = () => {
  const { bikeTrips, refetchBikeTrips } = useBikeTrips();

  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

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
            text: "Add",
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
