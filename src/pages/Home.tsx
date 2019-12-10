import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonItem,IonList, IonLabel } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';


const Home: React.FC<RouteComponentProps> = (props) => {


  const [userInfo, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/')
    .then(res =>{
      if(res.data){
        setUsers(res.data.results)
      }
    })
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonButton expand='block' onClick={() => props.history.push('/find')}>Find restaurants near you</IonButton>
        </IonItem>
        <IonList>
          <h1>Registered Users and their favourite restaurants with comments</h1>         
          {
            Object.keys(userInfo).map((user, key) => {
              return(
                <IonItem>
                  <IonLabel>
                    <h2>{userInfo[key]['username']}</h2>
                    {
                      Object.keys(userInfo[key]['restaurant']).map((restaurant, count) => {
                        return(
                          <h3>{userInfo[key]['restaurant'][count]['name']}</h3>
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
