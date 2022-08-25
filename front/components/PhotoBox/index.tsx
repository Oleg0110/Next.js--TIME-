import React from 'react';
import {
  ColumnPhotoBox,
  MainPhotoBox,
  PhotoContainer,
} from '../../styles/home';
import Image from 'next/image';
import BlackHighHeel from '../../assets/img/home/blackHigh-Heel.png';
import WiteWomanShoe from '../../assets/img/home/whiteWomanShoe.png';
import LightSneakers from '../../assets/img/home/lightSneakers.png';
import TimeLogoBrown from '../../assets/img/home/timeLogoBrown.jpg';
import WhiteNike from '../../assets/img/home/whiteNike.png';
import BrownChelsea from '../../assets/img/home/brownChelsea.png';
import BrownManShoe from '../../assets/img/home/brownManShoe.png';

const PhotoBox = () => {
  return (
    <MainPhotoBox>
      <PhotoContainer>
        <ColumnPhotoBox>
          <Image src={BlackHighHeel} width="287px" height="526.5px" />
          <Image src={WiteWomanShoe} width="287.45px" height="273.58px" />
        </ColumnPhotoBox>
        <ColumnPhotoBox>
          <Image src={LightSneakers} width="298px" height="248.71px" />
          <Image src={TimeLogoBrown} width="297.65px" height="299px" />
          <Image src={WhiteNike} width="297.65px" height="251.1px" />
        </ColumnPhotoBox>
        <ColumnPhotoBox>
          <Image src={BrownChelsea} width="287.91px" height="284.69px" />
          <Image src={BrownManShoe} width="287.91px" height="515.31px" />
        </ColumnPhotoBox>
      </PhotoContainer>
    </MainPhotoBox>
  );
};

export default PhotoBox;
