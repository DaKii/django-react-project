import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';
import Map from '../components/Map';



// Functional Component with Ionic Framework
const Find: React.FunctionComponent = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Find Restaurant</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <Map/>
      </IonContent>
    </IonPage>
  );
};

export default Find;
