import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
interface UserProps {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    thumbnail: string;
  };
  nat: string;
}
const List: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [presentEle, setPresentEle] = useState<HTMLElement | null>(null);
  const page = useRef(null);

  const [activeSegment, setActiveSegment] = useState("detail");

  useEffect(() => {
    setPresentEle(page.current);
  }, []);
  useIonViewWillEnter(() => {
    (async () => {
      try {
        // 即将进入时
        const users = await getUsers();
        console.log("🚀 ~ useIonViewWillEnter ~ users:", users);
        setUsers(users);
      } catch (error) {
        console.error("获取用户数据失败:", error);
      } finally {
        setLoading(false);
      }
    })();
  });

  const getUsers = async () => {
    const data = await fetch("https://randomuser.me/api?results=10");
    const users = await data.json();
    return users.results;
  };

  const clearList = () => {
    console.log("clearList");
    showAlert({
      header: "Confirm",
      message: "Are you sure?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          handler: () => {
            setUsers([]);
            showToast({
              message: "All users deleted",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (event: CustomEvent) => {
    console.log(event);
    const date = await getUsers();
    setUsers(date);
    event.detail.complete();
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar color={"success"}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon
                slot="icon-only"
                icon={trashBinOutline}
                color={"light"}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="success">
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {loading &&
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    {/* <IonImg src={user.picture.thumbnail}></IonImg> */}
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot="end" color={"primary"}>
                    <IonSkeletonText />
                  </IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        {users.map((user, index) => (
          <IonCard key={index} onClick={() => setSelectedUser(user)}>
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <IonImg src={user.picture.thumbnail}></IonImg>
                </IonAvatar>
                <IonLabel>
                  {user.name.first} {user.name.last}
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip slot="end" color={"primary"}>
                  {user.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}

        <IonModal
          ref={modal}
          isOpen={selectedUser !== null}
          onDidDismiss={() => setSelectedUser(null)}
          breakpoints={[0, 0.5, 0.8, 1]}
          initialBreakpoint={0.5}
        >
          <IonHeader>
            <IonToolbar color={"light"}>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>
                {selectedUser?.name.first}·{selectedUser?.name.last}
              </IonTitle>
            </IonToolbar>
            <IonToolbar color={"light"}>
              <IonSegment
                value={activeSegment}
                onIonChange={(e: CustomEvent) => {
                  console.log(e.detail);

                  setActiveSegment(e.detail.value);
                }}
              >
                <IonSegmentButton value={"detail"}>Details</IonSegmentButton>
                <IonSegmentButton value={"calendar"}>Calendar</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {activeSegment === "detail" && (
              <IonCard>
                <IonCardContent className="ion-no-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonImg src={selectedUser?.picture.thumbnail}></IonImg>
                    </IonAvatar>
                    <IonLabel>
                      {selectedUser?.name.first} {selectedUser?.name.last}
                      <p>{selectedUser?.email}</p>
                    </IonLabel>
                    <IonChip slot="end" color={"primary"}>
                      {selectedUser?.nat}
                    </IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            )}
            {activeSegment === "calendar" && <IonDatetime />}
          </IonContent>
        </IonModal>
      </IonContent>

      <IonModal
        ref={cardModal}
        trigger="card-modal"
        presentingElement={presentEle!}
      >
        <IonHeader>
          <IonToolbar color={"success"}>
            <IonButtons slot="start">
              <IonButton onClick={() => cardModal.current?.dismiss()}>
                Close
              </IonButton>
            </IonButtons>
            <IonTitle>Card Modal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Card Modal</p>
        </IonContent>
      </IonModal>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton id="card-modal">
          <IonIcon icon={addOutline}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default List;
