import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Intro1Svg from "../assets/intro/1.svg";
import Intro2Svg from "../assets/intro/2.svg";
import Intro3Svg from "../assets/intro/3.svg";
import { IonButton, IonText } from "@ionic/react";
import "swiper/css";
import "./Intro.css";

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};

const Intro = ({ onFinish }: ContainerProps) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src={Intro1Svg} alt="intro1" />
        <IonText>
          <h3>svg1</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img src={Intro2Svg} alt="intro2" />
        <IonText>
          <h3>svg2</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img src={Intro3Svg} alt="intro3" />
        <IonText>
          <h3>svg3</h3>
        </IonText>
        <IonButton onClick={() => onFinish()}>Finish</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;
