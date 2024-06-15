import {
  FirebaseAuthentication,
  User
} from "@capacitor-firebase/authentication";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter
} from "@ionic/react";
import { useState } from "react";
import { useEvents } from "../../features/Events/useEvents";

export const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userEvents } = useEvents(user?.uid);

  useIonViewDidEnter(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      console.log(user);
    });
  });

  const signInWithGoogle = async () => {
    const result = await FirebaseAuthentication.signInWithGoogle();
    const user = result.user;
    setUser(user);
  };

  const getCurrentUser = async () => {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
  };

  const signOut = async () => {
    await FirebaseAuthentication.signOut();
    setUser(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Konto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Konto</IonTitle>
          </IonToolbar>
        </IonHeader>

        {user ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Zalogowany jako</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonThumbnail slot="start">
                    {user.photoUrl && <img src={user.photoUrl} />}
                  </IonThumbnail>
                  <IonLabel>{user.displayName}</IonLabel>
                  <IonButton onClick={signOut}>Wyloguj</IonButton>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Nie jesteś zalogowany</IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{ textAlign: "center" }}>
              <p>Zaloguj się, aby korzystać z dodatkowych funkcji</p>
              <br />
              <IonButton onClick={signInWithGoogle}>
                Zaloguj się kontem Google
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {userEvents && userEvents.length > 0 ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Twoje osiągnięcia</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {userEvents.map((event) => (
                  <IonItem key={event.id}>
                    <IonThumbnail slot="start">
                      <IonImg src={`data:image/jpeg;base64,${event.image}`} />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>{event.name}</h2>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        ) : null}
      </IonContent>
    </IonPage>
  );
};
