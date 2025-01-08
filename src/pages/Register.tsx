import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  checkmarkDoneOutline,
  logInOutline,
  personCircleOutline,
} from "ionicons/icons";
import React from "react";

const Register: React.FC = () => {
  const router = useIonRouter();

  const doRegister = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("register");
    event.preventDefault();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/">Back</IonBackButton>
          </IonButtons>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
                    <IonInput
                      label="Email"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Enter text"
                      type="email"
                    ></IonInput>
                    <IonInput
                      className="ion-margin-top"
                      label="passwd"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Enter text"
                      type="password"
                    ></IonInput>
                    <IonButton
                      type="submit"
                      expand="block"
                      className="ion-margin-top"
                      color={"secondary"}
                    >
                      注册
                      <IonIcon slot="end" icon={checkmarkDoneOutline}></IonIcon>
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
