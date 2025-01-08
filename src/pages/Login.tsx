import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";
import Fcc from "../assets/fcc.svg";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
    return () => {
      console.log("cleanup");
    };
  }, []);

  const doLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("login");
    event.preventDefault();
    await present("loading...");
    setTimeout(async () => {
      dismiss();
      router.push("/app", "forward");
    }, 1000);
  };
  const finishIntro = async () => {
    console.log("finish intro");

    setIntroSeen(true);
    Preferences.set({
      key: INTRO_KEY,
      value: "true",
    });
  };

  const seeIntroAgain = async () => {
    console.log("see intro again");
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };
  return (
    <>
      {!introSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar color={"success"}>
              <IonTitle>Login Page</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={false} className="ion-padding">
            <IonGrid>
              {/* 一行最多12列网格 */}
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center ion-padding">
                    <img src={Fcc} alt="" width={"50%"} />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid>
              <IonRow class="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={doLogin}>
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
                        >
                          Login
                          <IonIcon slot="end" icon={logInOutline}></IonIcon>
                        </IonButton>
                        <IonButton
                          type="button"
                          expand="block"
                          className="ion-margin-top"
                          color={"secondary"}
                          routerLink="/register"
                        >
                          CreateAccount
                          <IonIcon
                            slot="end"
                            icon={personCircleOutline}
                          ></IonIcon>
                        </IonButton>
                        <IonButton
                          onClick={seeIntroAgain}
                          fill="clear"
                          size="small"
                          color={"medium"}
                          expand="full"
                        >
                          Watch intro again
                          <IonIcon
                            icon={personCircleOutline}
                            slot="end"
                          ></IonIcon>
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
