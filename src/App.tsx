import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bicycle, map, newspaper, personCircle } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "yet-another-react-lightbox/styles.css";

import Map from "./pages/Map";
import Events from "./pages/Events";
import BikeTrips from "./pages/BikeTrips";
import BikeTripDetails from "./pages/BikeTripDetails";
import { Account } from "./pages/Account";
import { BikeTripForm } from "./pages/BikeTripForm";
import { Admin } from "./pages/Admin";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/map">
              <Map />
            </Route>
            <Route exact path="/events">
              <Events />
            </Route>
            <Route exact path="/bikeTrips">
              <BikeTrips />
            </Route>
            <Route exact path="/bikeTrips/:id">
              <BikeTripDetails />
            </Route>
            <Route exact path="/bikeTrips/form">
              <BikeTripForm />
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>

            <Route exact path="/">
              <Redirect to="/map" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="navbar">
            <IonTabButton tab="map" href="/map">
              <IonIcon aria-hidden="true" icon={map} />
              <IonLabel>Mapa</IonLabel>
            </IonTabButton>
            <IonTabButton tab="events" href="/events">
              <IonIcon aria-hidden="true" icon={newspaper} />
              <IonLabel>Wydarzenia</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/bikeTrips">
              <IonIcon aria-hidden="true" icon={bicycle} />
              <IonLabel>Trasy</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/account">
              <IonIcon aria-hidden="true" icon={personCircle} />
              <IonLabel>Konto</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
