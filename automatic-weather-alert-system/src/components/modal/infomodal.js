import React, { useState } from "react";
import { Row, Col, Modal } from "antd";
import styled from "styled-components";
import rainy from "../../media/rain.png";
import gauge from "../../media/pressure.png";
import cloud from "../../media/clouds.png";
import tempy from "../../media/temperature.png";
import windy from "../../media/wind.png";
const InfoModal = () => {
  const [clouds, setClouds] = useState("");
  const [temp, setTemp] = useState("");
  const [pressure, setPressure] = useState("");
  const [pre, setPre] = useState("");
  const [wind, setWind] = useState("");
  const [rain, setRain] = useState("");

  return (
    <div>
      <Row>
        <MainCol span={10}>
          <Row>
            <Col span={6}>
              <TempIcon src={tempy} />
            </Col>
            <Col span={2}></Col>
            <Col span={14}>
              <LocationHeader>Temperature</LocationHeader>
              <LocationData>{temp} °C</LocationData>
            </Col>
          </Row>
        </MainCol>
        <Col span={2}></Col>
        <MainCol span={10}>
          <Row>
            <Col span={6}>
              <PressureIcon src={gauge} />
            </Col>
            <Col span={2}></Col>
            <Col span={14}>
              <LocationHeader>Pressure: </LocationHeader>
              {pressure} hPa
            </Col>
          </Row>
        </MainCol>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <MainCol span={10}>
          <Row>
            <Col span={6}>
              <WindIcon src={windy} />
            </Col>
            <Col span={2}></Col>
            <Col span={14}>
              <LocationHeader>Wind: </LocationHeader>
              {wind} kt
            </Col>
          </Row>
        </MainCol>
        <Col span={2}></Col>
        <MainCol span={10}>
          <Row>
            <Col span={6}>
              <CloudIcon src={cloud} />
            </Col>
            <Col span={2}></Col>
            <Col span={14}>
              <LocationHeader>Clouds: </LocationHeader>
              {clouds} mm
            </Col>
          </Row>
        </MainCol>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <MainCol span={10}>
          <Row>
            <Col span={6}>
              <RainIcon src={rainy} />
            </Col>
            <Col span={2}></Col>
            <Col span={14}>
              <LocationHeader>Rain (1h): </LocationHeader>
              {rain} mm
            </Col>
          </Row>
        </MainCol>
      </Row>
    </div>
  );
};
export { InfoModal };
export const MainCol = styled(Col)`
  border: 1px solid #f2f2f2;
  padding: 10px;
  border-radius: 10px;
`;
export const LocationData = styled.span`
  display: flex;
`;
export const LocationHeader = styled.h4`
  margin-right: 20px;
`;
export const TempIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background-color: #ffd11a;
`;
export const PressureIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background-color: #ff8000;
`;
export const WindIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background-color: #0099ff;
`;
export const CloudIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background-color: #cce6ff;
`;
export const RainIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  background-color: #4da6ff;
`;

export const DataModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-header {
    padding: 15px;
    border-radius: 20px 20px 0px 0px;
  }
  .ant-modal-body {
    padding: 20px;
  }
  .ant-modal-content {
    border-radius: 20px;
  }
`;
