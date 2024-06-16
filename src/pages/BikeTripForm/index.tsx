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
import { caretBack } from "ionicons/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { BikeTripRequest } from "../../features/BikeTrips/types";
import { useBikeTrips } from "../../features/BikeTrips/useBikeTrips";
import { useState } from "react";
import { useHistory } from "react-router";

interface Inputs extends BikeTripRequest {
  file: FileList;
}

export const BikeTripForm = () => {
  const history = useHistory();
  const { addBikeTrip, addBikeTripLocations } = useBikeTrips();

  const [showAlert, setShowAlert] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const bikeTripResponse = await addBikeTrip.mutateAsync(data);
    const file = data.file && data.file[0];
    if (bikeTripResponse && bikeTripResponse.id && file) {
      await addBikeTripLocations.mutateAsync({
        id: bikeTripResponse.id,
        file: file
      });
    }
    setShowAlert(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Powrót" icon={caretBack}></IonBackButton>
          </IonButtons>
          <IonTitle>Dodaj trasę 🚴‍♂️</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dodaj trasę 🚴‍♂️</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem>
            <IonInput label="Nazwa" {...register("name")}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput label="Opis" {...register("description")}></IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              label="Poziom trudności"
              {...register("difficulty")}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <a href="https://gpx.studio/" target="_blank">
                Stwórz trasę w edytorze GPX
              </a>
            </IonLabel>
            <input
              type="file"
              id="file-upload"
              accept=".gpx"
              {...register("file")}
            />
          </IonItem>

          <IonButton
            expand="block"
            routerLink="/bikeTrips"
            onClick={handleSubmit(onSubmit)}>
            Dodaj trasę
          </IonButton>
        </IonList>
      </IonContent>

      <IonAlert
        isOpen={showAlert}
        header="Dziękujemy za dodanie trasy"
        message="Zostanie dodana po zatwierdzeniu przez administratora"
        buttons={["OK"]}
        onDidDismiss={() => {
          setShowAlert(false);
          history.push("/bikeTrips");
        }}></IonAlert>
    </IonPage>
  );
};
