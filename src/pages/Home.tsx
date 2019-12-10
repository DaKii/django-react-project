import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem,IonList, IonLabel } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';


const Home: React.FC<RouteComponentProps> = (props) => {

  //Functional Components require hooks for states
  const [userInfo, setUsers] = React.useState([]);

  //A hook which gets the fooddies api --Using Django RestFramework--
  React.useEffect(() => {
    axios.get('https://fooddies.space/api/')
    .then(res =>{
      if(res.data){
        setUsers(res.data.results)
      }
    })
  }, []);

  //Renders the users and their favourite restaurant
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fooddies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonButton expand='block' onClick={() => props.history.push('/find')}>Find restaurants near you</IonButton>
        </IonItem>
        <IonList>
          <h1>Registered Users and their favourite restaurants</h1>         
          {
            Object.keys(userInfo).map((user, key) => {
              return(
                <IonItem>
                  <IonLabel>
                    <h2>{userInfo[key]['username']}</h2>
                    {
                      Object.keys(userInfo[key]['restaurant']).map((restaurant, count) => {
                        return(
                          <h4>{userInfo[key]['restaurant'][count]['name']}</h4>
                        )
                      })
                    }                    
                  </IonLabel>

                </IonItem>
              )
            })
          }

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
