import { Camera, CameraResultType } from "@capacitor/camera";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";

const Tab1: React.FC = () => {
  const [image, setImage] = useState<any>("");
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // resultType: CameraResultType.Base64,
      resultType: CameraResultType.Uri,
    });
    // const img = `data:image/jpeg;base64,${image.base64String}`;
    const img = image.webPath;
    console.log(img);

    setImage(img);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tab1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton onClick={takePicture}>take photo</IonButton>
        <img src={image} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
