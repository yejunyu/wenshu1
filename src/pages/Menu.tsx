import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import List from "./List";
import Settings from "./Settings";
import { homeOutline, logOutOutline, newspaperOutline } from "ionicons/icons";

const Menu: React.FC = () => {
  const paths = [
    { name: "Home", path: "/app/list", Icon: homeOutline },
    { name: "Settings", path: "/app/settings", Icon: newspaperOutline },
  ];
  return (
    <IonPage>
      <IonSplitPane contentId="main">
        {/* 先指定一个id */}
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color={"secondary"}>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {paths.map((path, index) => (
              // MenuToggle点击就关闭菜单
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={path.path} routerDirection="none">
                  <IonIcon slot="start" icon={path.Icon}></IonIcon>
                  {path.name}
                </IonItem>
              </IonMenuToggle>
            ))}
            <IonMenuToggle autoHide={false}>
              <IonButton expand="full" routerLink="/" routerDirection="root">
                <IonIcon slot="start" icon={logOutOutline}></IonIcon>
                退出登录
              </IonButton>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>
        {/* 然后路由指向上面定义的id */}
        <IonRouterOutlet id="main">
          <Route exact path="/app/list" component={List}></Route>
          <Route path="/app/settings" component={Settings}></Route>
          <Route exact path="/app">
            <Redirect to="/app/list" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
