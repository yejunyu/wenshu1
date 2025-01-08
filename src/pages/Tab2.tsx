import {
  CreateAnimation,
  createGesture,
  Gesture,
  GestureDetail,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useRef } from "react";

const Tab2: React.FC = () => {
  const animationRef = useRef<CreateAnimation | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useIonViewDidEnter(() => {
    // animationRef.current?.animation.play();
    const gesture: Gesture = createGesture({
      el: elementRef.current,
      threshold: 0,
      gestureName: "my-gesture",
      onMove: (ev) => onMoveHandler(ev),
    });
    gesture.enable();
  });
  const onMoveHandler = (detail: GestureDetail) => {
    console.log(detail);
    const x = detail.currentX - detail.startX;
    const y = detail.currentY - detail.startY;
    elementRef.current!.style.transform = `translate(${x}px,${y}px)`;
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Page Title2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <CreateAnimation
          ref={animationRef}
          duration={2000}
          iterations={Infinity}
          delay={1000}
          keyframes={[
            { offset: 0, transform: "scale(1)", opacity: "1" },
            { offset: 0.5, transform: "scale(1.5)", opacity: "0.5" },
            { offset: 1, transform: "scale(1)", opacity: "1" },
          ]}
        >
          <IonButton expand="block" color={"success"} className="ion-margin">
            Click Button
          </IonButton>
        </CreateAnimation>
        <div
          ref={elementRef}
          style={{ width: 50, height: 50, background: "red" }}
        ></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
