import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "./index.css";
import "antd/dist/antd.css";
import { Map } from "./components/map";
import { Navbar } from "./components/navbar";
import { TempLegend } from "./legends/templegend";
import { PresssureLegend } from "./legends/pressurelegend";
import { WindLegend } from "./legends/windlegend";
import { Button, Input, Select } from "antd";
import { CloudLegend } from "./legends/cloudlegend";
import { PanelClock } from "./components/panelclock";
import { RainLegend } from "./legends/rainlegend";
import { Precipitationlegend } from "./legends/precipitationlegend";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const App = () => {
  const relurl = window.location.pathname;
  const res = relurl.slice(1);
  const [infoLocation, setInfoLocation] = useState([
    16.02921048040752, 81.75188003184665,
  ]);

  const [pastDate, setPastDate] = useState();
  const [appLoading, setAppLoading] = useState(true);
  const getLocToNav = (data) => {
    const lat = data.lat;
    const lng = data.lng;
    setInfoLocation([lat, lng]);
    setAppLoading(false);
  };
  const getPastDates = (data) => {
    setPastDate(data);
  };

  const [dateClicked, setDateClicked] = useState();
  const [isLayerStored, setIsLayerStored] = useState("");
  const getLayerLocation = (data) => {
    setIsLayerStored(data);
  };

  const [markerPosition, setMarkerPosition] = useState();
  useEffect(() => {
    const getMarkerPosition = () => {
      const mainurl = window.location.search;
      const transform = mainurl.search("-");
      const co_ordinates = mainurl.slice(transform + 1);
      const loc_array = co_ordinates.split(",");
      setMarkerPosition(loc_array);
      setAppLoading(false);
    };
    getMarkerPosition();
  }, []);

  const [forecastDate, setForecastDate] = useState([]);
  const [epochForecastDate, setEpochForecastDate] = useState();
  useEffect(() => {
    const getForecastDate = async () => {
      for (let i = 1; i < 8; i++) {
        const currentDate = new Date();
        const dateIncrement = currentDate.setDate(currentDate.getDate() + i);
        const epochDates = dateIncrement.toString().slice(0, 10);
        const forecastDates = new Date(epochDates * 1000).toLocaleDateString(
          "gu-IN",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
        setEpochForecastDate(epochDates);
        setForecastDate((current) => [...current, `${forecastDates}`]);
      }
    };
    getForecastDate();
  }, []);
  if (appLoading == true) {
    return <LoadingOutlined />;
  } else {
    return (
      <div className="container">
        <Map
          center={markerPosition}
          func={getLocToNav}
          dateClicked={dateClicked}
          forecastLayer={isLayerStored}
        />
        {/* <Input
          className="search-bar"
          placeholder="Search Location..."
          size="medium"
        /> */}
        {/* <Link to="/login">
          <LoginButton>Login</LoginButton>
        </Link> */}
        <Navbar
          center={markerPosition}
          loc={infoLocation}
          func={getPastDates}
          forecastDates={forecastDate}
        />
        {res == "temperature" ? <TempLegend /> : ""}
        {res == "pressure" ? <PresssureLegend /> : ""}
        {res == "wind" ? <WindLegend /> : ""}
        {res == "clouds" ? <CloudLegend /> : ""}
        {res == "rain" ? <RainLegend /> : ""}
        {res == "precipitation" ? <Precipitationlegend /> : ""}
      </div>
    );
  }
};
export { App };
export const LoginButton = styled(Button)`
  z-index: 1000;
  top: 15px;
  position: fixed;
  right: 150px;
  border-radius: 20px;
  border: none;
`;
