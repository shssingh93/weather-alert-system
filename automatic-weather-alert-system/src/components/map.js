import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline,
  GeoJSON,
} from "react-leaflet";
import "../index.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocationFinderDummy } from "./locationfinder";
import axios from "axios";
import {
  Row,
  Col,
  Modal,
  Table,
  Menu,
  Radio,
  Space,
  Checkbox,
  message,
} from "antd";
import { Button, Tooltip } from "antd";
import rainy from "../media/rain.png";
import gauge from "../media/pressure.png";
import cloud from "../media/clouds.png";
import tempy from "../media/temperature.png";
import windy from "../media/wind.png";
import styled from "styled-components";
import CustomMarker from "./customMarker";
import freddyData from "./freddy.json";

delete L.Icon.Default.prototype._getIconUrl;

var LeafletIcon = L.Icon.extend({
  options: {
    shadowUrl: "../media/marker-shadow.png",
    iconSize: [25, 40],
    shadowSize: [30, 30],
  },
});

var greenIcon = new LeafletIcon({
  iconRetinaUrl: require("../media/marker-icon.png"),
  iconUrl: require("../media/marker-icon.png"),
  shadowUrl: require("../media/marker-shadow.png"),
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../media/freddy-icon.png"),
  iconUrl: require("../media/freddy-icon.png"),
  shadowUrl: require("../media/marker-shadow.png"),
  iconSize: [15, 20],
  shadowSize: [10, 10],
  iconAnchor: [2, 10],
});
// const polyline = [
//   [51.505, -0.09],
//   [51.51, -0.1],
//   [51.51, -0.12],
// ];
// const purpleOptions = { color: "purple" };
const coords = [
  { lat: 9.20073165382764, lng: 84.60022 },
  { lat: 9.227409993950051, lng: 84.09478476740489 },
  { lat: 9.292242324981267, lng: 83.67875865537712 },
  { lat: 9.522659531571012, lng: 83.01457661687665 },
  { lat: 9.87518359841182, lng: 82.30660235605748 },
  { lat: 10.21296469697978, lng: 81.80299179939227 },
  { lat: 10.636479095209948, lng: 81.25558902040838 },
  { lat: 11.173994442838508, lng: 80.85780966768003 },
  { lat: 11.5889935805478, lng: 80.5804589263282 },
  { lat: 11.889127160281813, lng: 80.20092633289936 },
  { lat: 11.98552882723823, lng: 79.75570540599249 },
  { lat: 12.135418462571682, lng: 79.12071818237115 },
  { lat: 12.413560615598994, lng: 78.6900946629038 },
  { lat: 12.81242343051054, lng: 78.42004262527173 },
  { lat: 13.075613025763161, lng: 78.28136725459582 },
  { lat: 13.366927711712094, lng: 78.35435429179368 },
  { lat: 13.604692488880886, lng: 78.47843225503001 },
  { lat: 13.742983287400447, lng: 78.63900373686529 },
  { lat: 13.831588371738624, lng: 78.85431549659896 },
  { lat: 13.923701882819211, lng: 79.08422466377219 },
  { lat: 13.990992406925804, lng: 79.3871208681433 },
  { lat: 14.02640057099471, lng: 79.75935475785235 },
  { lat: 13.980368893803503, lng: 80.07319901780312 },
  { lat: 13.895363162404864, lng: 80.28486142567691 },
  { lat: 13.700440926813108, lng: 80.59870568562766 },
  { lat: 13.196444247401347, lng: 81.09866689043295 },
  { lat: 12.908484235624385, lng: 81.31032929830674 },
  { lat: 12.502646212548067, lng: 81.57308263221901 },
  { lat: 11.99623800356445, lng: 81.77744633637302 },
  { lat: 11.588993580547806, lng: 82.08399189260398 },
  { lat: 11.0880576219585, lng: 82.4854205971922 },
  { lat: 10.611371521240011, lng: 83.0802649503547 },
  { lat: 10.277605648475639, lng: 83.52548587726163 },
  { lat: 10.008182033032124, lng: 83.79918726675358 },
  { lat: 9.522659531571012, lng: 84.38673291619631 },
  { lat: 9.20073165382764, lng: 84.60022 },
];

const Platlng = [
  { lat: 9.200731653827642, lng: 84.60022 },
  { lat: 9.400628669472423, lng: 84.100342 },
  { lat: 10.199706448567879, lng: 82.898712 },
  { lat: 10.50030134116705, lng: 82.199707 },
  { lat: 11.299600657065398, lng: 81.4911 },
  { lat: 11.918399344390835, lng: 81.1835 },
  { lat: 12.905499346872011, lng: 80.09580067005369 },
];
const Map = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [locationData, setLocationData] = useState();
  const getLocation = (data) => {
    setLocationData(data);
    props.func(data);
  };
  const relurl = window.location.pathname;
  const res = relurl.slice(1);

  const [clouds, setClouds] = useState("");
  const [temp, setTemp] = useState("");
  const [pressure, setPressure] = useState("");
  const [wind, setWind] = useState("");
  useEffect(() => {
    const getCurrentLocationData = () => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${props.center[0]}&lon=${props.center[1]}&units=metric&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679`
        )
        .then((response) => {
          const transform = response.data;
          const currentData = transform.current;
          setClouds(currentData.clouds);
          setTemp(currentData.temp);
          setPressure(currentData.pressure);
          setWind(currentData.wind_speed);
        });
    };
    getCurrentLocationData();

    // const NewLayer = L.geoJSON(Mandous);
    // NewLayer.addTo(Marker);
  }, []);

  const [values, setValues] = useState([]);
  const onChange = (checkedValues) => {
    setValues(checkedValues);
  };

  const multiPolygon = [
    [
      [9.20073165382764, 84.60022],
      [9.4911, 84.299600657065398],
    ],
    [
      [9.20073165382764, 84.00022],
      [9.7911, 84.999600657065398],
    ],
  ];

  return (
    <MapContainer
      id="map"
      center={props.center}
      zoom={5}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Tooltip title="View Cyclones" placement="bottom">
        <Button
          style={{
            position: "fixed",
            zIndex: "999",
            right: "30px",
            top: "140px",
            padding: "5px 10px 10px 10px ",
            borderRadius: "5px",
          }}
          onClick={() => {
            showModal();
          }}
        >
          Events
        </Button>
      </Tooltip>
      {values.includes("A") ? (
        <>
          <Polyline color={"red"} positions={Platlng} />
          <Polygon color={"#00e600"} positions={coords} />
        </>
      ) : (
        <></>
      )}
      {values.includes("B") ? (
        <GeoJSON key="my-geoJson" data={freddyData.data} color="red" />
      ) : (
        <></>
      )}
      <LocationFinderDummy func={getLocation} />
      <TileLayer url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}" />

      {res == "dashboard" ? (
        <TileLayer url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=0zkAH0geR7qOmPQ4XGI4" />
      ) : (
        " "
      )}

      {res == "temperature" ||
      "pressure" ||
      "wind" ||
      "cloud" ||
      "precipitation" ||
      "rain" ||
      "/" ? (
        <>
          <Marker
            icon={greenIcon}
            position={
              locationData == null || locationData == undefined
                ? [19.23, 74.45]
                : [locationData.lat, locationData.lng]
            }
            draggable={true}
            opacity={1}
            eventHandlers={{
              click: () => {
                axios
                  .get(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.lat}&lon=${locationData.lng}&units=metric&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679`
                  )
                  .then((response) => {
                    const cData = response.data.current;
                    setTemp(cData.temp);
                    setPressure(cData.pressure);
                    setWind(cData.wind_speed);
                    setClouds(cData.clouds);
                  });
              },
            }}
          >
            <PopUpModal>
              <>
                <h3>Current Location Data - </h3>
                <Row style={{ margin: "0px 15px" }}>
                  <MainCol span={11}>
                    <Row>
                      <Col span={9}>
                        <TempIcon src={tempy} />
                      </Col>
                      <Col span={14}>
                        <LocationHeader>Temperature</LocationHeader>
                        <LocationData>{temp} °C</LocationData>
                      </Col>
                    </Row>
                  </MainCol>
                  <Col span={2}></Col>
                  <MainCol span={11}>
                    <Row>
                      <Col span={10}>
                        <PressureIcon src={gauge} />
                      </Col>
                      <Col span={14}>
                        <LocationHeader>Pressure </LocationHeader>
                        <LocationData>{pressure} hPa</LocationData>
                      </Col>
                    </Row>
                  </MainCol>
                </Row>
                <Row style={{ margin: "20px 15px 0px 15px" }}>
                  <MainCol span={11}>
                    <Row>
                      <Col span={10}>
                        <WindIcon src={windy} />
                      </Col>
                      <Col span={14}>
                        <LocationHeader>Wind </LocationHeader>
                        <LocationData>{wind} kt</LocationData>
                      </Col>
                    </Row>
                  </MainCol>
                  <Col span={2}></Col>
                  <MainCol span={11}>
                    <Row>
                      <Col span={10}>
                        <CloudIcon src={cloud} />
                      </Col>
                      <Col span={14}>
                        <LocationHeader>Clouds </LocationHeader>
                        <LocationData>{clouds} mm</LocationData>
                      </Col>
                    </Row>
                  </MainCol>
                </Row>
                <Row style={{ margin: "20px 15px 0px 15px" }}>
                  <MainCol span={11}>
                    <Row>
                      <Col span={10}>
                        <RainIcon src={rainy} />
                      </Col>
                      <Col span={14}>
                        <LocationHeader>Rain (1h) </LocationHeader>
                        <LocationData>mm</LocationData>
                      </Col>
                    </Row>
                  </MainCol>
                </Row>
              </>
            </PopUpModal>
          </Marker>
        </>
      ) : (
        ""
      )}

      <Modal
        title="Incidents Data"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={12}>
            <h3>Current Events</h3>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            ></Checkbox.Group>
          </Col>
          <Col span={12}>
            <h3>Historical Events</h3>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Space direction="vertical">
                <Checkbox value="A">Mandous Cyclone</Checkbox>
                <Checkbox value="B">Freddy Cyclone</Checkbox>
              </Space>
            </Checkbox.Group>
          </Col>
        </Row>
      </Modal>

      {/*res == "forecast-pressure" ? (
        <TileLayer url={`${props.forecastLayer}`} />
      ) : (
        ""
      )}
      {res == "forecast-wind" ? (
        <TileLayer url={`${props.forecastLayer}`} />
      ) : (
        ""
      )}
      {res == "forecast-precipitation" ? (
        <TileLayer url={`${props.forecastLayer}`} />
      ) : (
        ""
      )}
      {res == "forecast-clouds" ? (
        <TileLayer url={`${props.forecastLayer}`} />
      ) : (
        ""
      )}
      {res == "forecast-rain" ? (
        <TileLayer url={`${props.forecastLayer}`} />
      ) : (
        ""
      )} */}
      {res == "temperature" ? (
        <TileLayer url="https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&fill_bound=true&opacity=0.7&palette=-65:821692; -55:821692; -45:821692; -40:821692; -30:8257DB; -20:208CEC; -10:20C4E8; 0:23DDDD; 10:C2FF28; 20:FFF028; 25:FFC228; 30:FC8014; 40:FC5214; 50:D60606" />
      ) : (
        ""
      )}
      {res == "pressure" ? (
        <TileLayer url="https://maps.openweathermap.org/maps/2.0/weather/APM/{z}/{x}/{y}?appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&fill_bound=true&opacity=0.7&palette=94000:0073FF; 96000:00AAFF; 98000:4BD0D6; 100000:8DE7C7; 101000:B0F720; 102000:F0B800; 104000:FB5515; 106000:F3363B; 108000:C60000" />
      ) : (
        ""
      )}
      {res == "wind" ? (
        <TileLayer url="https://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&opacity=0.6&arrow_step=32&palette=1:ccebff; 5:99d6ff; 15:66c2ff; 25:33adff; 50:0099ff; 100:007acc; 200:005c99;250:003d66" />
      ) : (
        ""
      )}
      {res == "clouds" ? (
        <TileLayer url="https://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&opacity=0.7&palette=0:FFFFFF00; 10:FDFDFF19; 20:FCFBFF26; 30:FAFAFF33; 40:F9F8FF4C; 50:F7F7FF66; 60:F6F5FF8C; 70:F4F4FFBF; 80:E9E9DFCC; 90:DEDEDED8; 100:D2D2D2FF; 200:D2D2D2FF" />
      ) : (
        ""
      )}
      {res == "precipitation" ? (
        <TileLayer url="https://maps.openweathermap.org/maps/2.0/weather/PA0/{z}/{x}/{y}?appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&opacity=0.5&palette=0:000000;1:00fa64;2:00d300;4:00a000;6:005a00;10:004600;12:eff800;16:ff9600;24:ff5b00;32:ff0064;60:aa2bc3" />
      ) : (
        ""
      )}
      {res == "rain" ? (
        <TileLayer url="https://maps.openweathermap.org/maps/2.0/weather/PAR0/{z}/{x}/{y}?appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&opacity=0.8&palette=5:3b7ca2;10:3b7ea2;20:3a85a2;40:3a99a2;60:32a66f;100:81a23b;150:a2a23b;200:a23c3b" />
      ) : (
        ""
      )}
    </MapContainer>
  );
};
export { Map };
export const LocationData = styled.h4`
  display: flex;
`;
export const LocationHeader = styled.h5``;
export const TempIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  margin-right: 0px;
  display: flex;
  flex-wrap: wrap;
`;
export const PressureIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
`;
export const WindIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
`;
export const CloudIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
`;
export const RainIcon = styled.img`
  padding: 8px;
  border-radius: 10px;
  width: 50px;
  height: 50px;
`;
export const MainCol = styled(Col)`
  border: 1px solid #f2f2f2;
  padding: 6px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
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
    padding: 20px 15px;
  }
  .ant-modal-content {
    border-radius: 20px;
  }
`;
export const DataTable = styled(Table)`
  .ant-table-pagination {
    display: none;
  }
  height: 300px;
  overflow-y: scroll;
`;
export const NavBar = styled(Menu)`
  .ant-menu-inline {
    width: 100%;
  }
  margin: 4px 8px 8px 8px;
  border-radius: 0px 0px 10px 10px;
`;
export const PopUpModal = styled(Popup)`
  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    width: 350px;
  }
`;
