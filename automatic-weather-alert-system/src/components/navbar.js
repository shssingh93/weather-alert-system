import React, { useEffect, useState } from "react";
import {
  InfoCircleOutlined,
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  AreaChartOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Modal,
  Row,
  Col,
  Table,
  Tag,
  Space,
  Button,
  Dropdown,
  Divider,
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import rainy from "../media/rain.png";
import gauge from "../media/pressure.png";
import chat from "../media/dailyalert.png";
import cloud from "../media/clouds.png";
import tempy from "../media/temperature.png";
import weather from "../media/precipitation.png";
import forecastdata from "../media/forecastData.png";
import info from "../media/information.png";
import windy from "../media/wind.png";
import LoginIcon from "../media/loginicon.png";
import styled from "styled-components";
import "../index.css";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { TableColumn } from "./constants";

const Navbar = (props) => {
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: `${props.forecastDates[0]}`,
        },
        {
          key: "2",
          label: `${props.forecastDates[1]}`,
        },
        {
          key: "3",
          label: `${props.forecastDates[2]}`,
        },
        {
          key: "4",
          label: `${props.forecastDates[3]}`,
        },
        {
          key: "5",
          label: `${props.forecastDates[4]}`,
        },
        {
          key: "6",
          label: `${props.forecastDates[5]}`,
        },
        {
          key: "7",
          label: `${props.forecastDates[6]}`,
        },
      ]}
    />
  );
  // Fetching Forecast Dates -
  const [forecastDate, setForecastDate] = useState([]);
  const [forecastDataVisible, setForecastDataVisible] = useState(true);
  useEffect(() => {
    const getForecastDate = async () => {
      for (let i = 1; i < 8; i++) {
        const currentDate = new Date();
        const dateIncrement = currentDate.setDate(currentDate.getDate() + i);
        console.log(dateIncrement);
        const epochDates = dateIncrement.toString().slice(0, 10);
        console.log(epochDates);
        const forecastDates = new Date(epochDates * 1000).toLocaleDateString(
          "gu-IN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
        setForecastDate((current) => [...current, `${forecastDates}`]);
        setForecastDataVisible(false);
      }
    };
    getForecastDate();
  }, []);

  // Displaying and Fetching the Current location data (Info Modal)-
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [infoLoading, setInfoLoading] = useState(true);
  const [clouds, setClouds] = useState("");
  const [temp, setTemp] = useState("");
  const [pressure, setPressure] = useState("");
  const [wind, setWind] = useState("");
  const showInfoModal = () => {
    setIsInfoModalVisible(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${props.loc[0]}&lon=${props.loc[1]}&units=metric&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679`
      )
      .then((response) => {
        const transform = response.data;
        const currentData = transform.current;
        setClouds(currentData.clouds);
        setTemp(currentData.temp);
        setPressure(currentData.pressure);
        setWind(currentData.wind_speed);
        setInfoLoading(false);
      });
  };

  //Fetching the 7 Days Forecast Data from Api (Forecast Alert Modal) -
  const [isForecastModalVisible, setIsForecastModalVisible] = useState(false);
  const [forecastTableData, setForecastTableData] = useState([]);
  const [forecastTableVisible, setForecastTableVisible] = useState(true);
  const [avgTemp, setAvgTemp] = useState([]);
  const [forecastPressure, setForecastPressure] = useState([]);
  const [forecastWind, setForecastWind] = useState([]);
  const [forecastRain, setForecastRain] = useState([]);
  const [forecastClouds, setForecastClouds] = useState([]);

  const showForecastModal = () => {
    setIsForecastModalVisible(true);
  };
  const handleForecastCancel = () => {
    setIsForecastModalVisible(false);
  };
  useEffect(() => {
    const getForecastResponse = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${props.center[0]}&lon=${props.center[1]}&cnt=8&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679`
      );
      const resData = response.data.list;
      setForecastTableData(resData);
      for (let i = 0; i < 8; i++) {
        setAvgTemp((currentTemp) => [
          ...currentTemp,
          ((resData[i].temp.min + resData[i].temp.max) / 2 - 273.15).toFixed(2),
        ]);
        setForecastPressure((currentPre) => [
          ...currentPre,
          resData[i].pressure,
        ]);
        setForecastWind((currentWind) => [...currentWind, resData[i].speed]);
        setForecastRain((currentRain) => [...currentRain, resData[i].rain]);
        setForecastClouds((currentClouds) => [
          ...currentClouds,
          resData[i].clouds,
        ]);
      }
    };
    setForecastTableVisible(false);
    getForecastResponse();
  }, []);

  const data = [
    {
      date: `${forecastDate[0]}`,
      temp: `${avgTemp[0]} °C`,
      pressure: `${forecastPressure[0]} hPa`,
      wind: `${forecastWind[0]} kt`,
      rain: `${forecastRain[0]} mm`,
      clouds: `${forecastClouds[0]} mm`,
    },
    {
      date: `${forecastDate[1]}`,
      temp: `${avgTemp[1]} °C`,
      pressure: `${forecastPressure[1]} hPa`,
      wind: `${forecastWind[1]} kt`,
      rain: `${forecastRain[1]} mm`,
      clouds: `${forecastClouds[1]} mm`,
    },
    {
      date: `${forecastDate[2]}`,
      temp: `${avgTemp[2]} °C`,
      pressure: `${forecastPressure[2]} hPa`,
      wind: `${forecastWind[2]} kt`,
      rain: `${forecastRain[2]} mm`,
      clouds: `${forecastClouds[2]} mm`,
    },
    {
      date: `${forecastDate[3]}`,
      temp: `${avgTemp[3]} °C`,
      pressure: `${forecastPressure[3]} hPa`,
      wind: `${forecastWind[3]} kt`,
      rain: `${forecastRain[3]} mm`,
      clouds: `${forecastClouds[3]} mm`,
    },
    {
      date: `${forecastDate[4]}`,
      temp: `${avgTemp[4]} °C`,
      pressure: `${forecastPressure[4]} hPa`,
      wind: `${forecastWind[4]} kt`,
      rain: `${forecastRain[4]} mm`,
      clouds: `${forecastClouds[4]} mm`,
    },
    {
      date: `${forecastDate[5]}`,
      temp: `${avgTemp[5]} °C`,
      pressure: `${forecastPressure[5]} hPa`,
      wind: `${forecastWind[5]} kt`,
      rain: `${forecastRain[5]} mm`,
      clouds: `${forecastClouds[5]} mm`,
    },
    {
      date: `${forecastDate[6]}`,
      temp: `${avgTemp[6]} °C`,
      pressure: `${forecastPressure[6]} hPa`,
      wind: `${forecastWind[6]} kt`,
      rain: `${forecastRain[6]} mm`,
      clouds: `${forecastClouds[6]} mm`,
    },
  ];

  useEffect(() => {
    const getDailyAlert = async () => {
      setDailyAlertVisible(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${props.loc[0]}&lon=${props.loc[1]}&units=metric&exclude=current,daily,minutely,hourly&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679`
      );
      setDailyAlert(response.data);
      setDailyAlertVisible(false);
    };

    getDailyAlert();
  }, []);
  const [collapsed, setCollapsed] = useState(true);

  const [isClicked, setIsClicked] = useState(false);

  const handleCancel = () => {
    setIsInfoModalVisible(false);
  };

  const [dailyAlertVisible, setDailyAlertVisible] = useState(true);
  const [dailyAlert, setDailyAlert] = useState();
  useEffect(() => {
    const getDailyAlert = async () => {
      setDailyAlertVisible(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${props.center[0]}&lon=${props.center[1]}&units=metric&exclude=current,daily,minutely,hourly&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679`
      );
      setDailyAlert(response.data);
      setDailyAlertVisible(false);
    };
    getDailyAlert();
  }, []);
  const [isAlertVisible, setAlertVisible] = useState(false);

  const showAlertModal = () => {
    setAlertVisible(true);
  };

  const handleDailyAlert = () => {
    setAlertVisible(false);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const column = TableColumn;

  const [selectedKey, setSelectedKey] = useState("");
  const [navLoading, setNavLoading] = useState(true);

  useEffect(() => {
    const getMenuKey = () => {
      const menuPath = window.location.pathname.slice(1);
      {
        menuPath == ""
          ? setSelectedKey("temperature")
          : setSelectedKey(menuPath);
      }
      setNavLoading(false);
    };
    getMenuKey();
  }, [selectedKey]);

  const [isDataModalVisible, setIsDataModalVisible] = useState(false);

  const onModalCancel = () => {
    setIsDataModalVisible(false);
  };
  const showForecastLayerModal = () => {
    setIsDataModalVisible(true);
  };
  if (navLoading == true) {
    return <LoadingOutlined />;
  } else {
    return (
      <div className={`navbar ${isClicked ? "bg-active" : ""}`}>
        <Button className="navbutton" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <NavBar
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          inlineCollapsed={collapsed}
        >
          {/* <Menu.Item key="dashboard" icon={<AppstoreOutlined />}>
              <Link to={`/dashboard`}>Dashboard</Link>
            </Menu.Item> */}
          <Menu.Item
            key="temperature"
            icon={<img src={tempy} width="22px" height="22px" />}
          >
            <Link to={`/temperature?-${props.center}`}>Temperature</Link>
          </Menu.Item>

          <Menu.Item
            key="pressure"
            icon={<img src={gauge} width="22px" height="22px" />}
          >
            <Link to={`/pressure?-${props.center}`}>Pressure</Link>
          </Menu.Item>
          <Menu.Item
            key="wind"
            icon={<img src={windy} width="22px" height="22px" />}
          >
            <Link to={`/wind?-${props.center}`}>Wind</Link>
          </Menu.Item>
          <Menu.Item
            key="clouds"
            icon={<img src={cloud} width="22px" height="22px" />}
          >
            <Link to={`/clouds?-${props.center}`}>Clouds</Link>
          </Menu.Item>
          <Menu.Item
            key="precipitation"
            icon={<img src={weather} width="22px" height="22px" />}
          >
            <Link to={`/precipitation?-${props.center}`}>Precipitation</Link>
          </Menu.Item>
          <Menu.Item
            key="rain"
            icon={<img src={rainy} width="22px" height="22px" />}
          >
            <Link to={`/rain?-${props.center}`}>Rain</Link>
          </Menu.Item>

          <Menu.Item
            key="info"
            icon={<img src={info} width="22px" height="22px" />}
            onClick={showInfoModal}
          >
            Info
          </Menu.Item>
          <Menu.Item
            key="forecast"
            icon={<img src={forecastdata} width="22px" height="22px" />}
            onClick={showForecastModal}
          >
            Forecast Alerts
          </Menu.Item>
          <Menu.Item
            key="daily"
            icon={<img src={chat} width="20px" height="20px" />}
            onClick={showAlertModal}
          >
            Daily Alerts
          </Menu.Item>
          <Menu.Item
            key="login"
            icon={<img src={LoginIcon} width="22px" height="22px" />}
          >
            <Link to="/login">Login</Link>
          </Menu.Item>
        </NavBar>
        <DataModal
          title="Forecasted Layers"
          visible={isDataModalVisible}
          onCancel={onModalCancel}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <Space>
              Click me
              <DownOutlined />
            </Space>
          </Dropdown>
        </DataModal>
        <DataModal
          title="Current Location Data"
          visible={isInfoModalVisible}
          onCancel={handleCancel}
        >
          {infoLoading == true ? (
            <Spin />
          ) : (
            <>
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
          )}
        </DataModal>

        {/* Forecast Modal for 7 Days*/}
        <DataModal
          title="Weather Forecast for 7 Days"
          visible={isForecastModalVisible}
          onCancel={handleForecastCancel}
          width={620}
        >
          {forecastTableVisible == true ? (
            <LoadingOutlined />
          ) : (
            <DataTable columns={column} dataSource={data} />
          )}
        </DataModal>
        <DataModal
          title="Daily Alerts"
          visible={isAlertVisible}
          onCancel={handleDailyAlert}
        >
          {dailyAlertVisible == true ? (
            <LoadingOutlined />
          ) : (
            <>
              {dailyAlert.description == null ? (
                "No Alerts for Today"
              ) : (
                <span>
                  <h4>Timezone - {dailyAlert.timezone}</h4>
                  <h4>Description - {dailyAlert.description}</h4>
                </span>
              )}
            </>
          )}
        </DataModal>
      </div>
    );
  }
};
export { Navbar };

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
