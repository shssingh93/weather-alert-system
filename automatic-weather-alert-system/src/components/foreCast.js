import React, { useEffect, useState } from "react";
import { Select, Menu, Dropdown, Space, Tooltip, message } from "antd";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
const ForeCast = (props) => {
  const relurl = window.location.pathname;
  const res = relurl.slice(1);
  const epochDates = [];
  for (let i = 1; i < 8; i++) {
    const currentDate = new Date();
    console.log(currentDate);
    const dateIncrement = currentDate.setDate(currentDate.getDate() + i);
    console.log(dateIncrement);
    epochDates.push(dateIncrement.toString().slice(0, 10));
    console.log(epochDates);
  }
  const Items = [
    {
      key: `${epochDates[0]}`,
      label: (
        <Link to={`/forecast-${res}?-${props.center[0]},${props.center[1]}`}>
          {props.forecastDates[0]}
        </Link>
      ),
    },
    {
      key: `${epochDates[1]}`,
      label: (
        <Link to={`/forecast-${res}?-${props.center[0]},${props.center[1]}`}>
          {props.forecastDates[1]}
        </Link>
      ),
    },
    {
      key: `${epochDates[2]}`,
      label: (
        <Link to={`/forecast-${res}?-${props.center[0]},${props.center[1]}`}>
          {props.forecastDates[2]}
        </Link>
      ),
    },
    {
      key: `${epochDates[3]}`,
      label: (
        <Link to={`/forecast-${res}?-${props.center[0]},${props.center[1]}`}>
          {props.forecastDates[3]}
        </Link>
      ),
    },
    {
      key: `${epochDates[4]}`,
      label: (
        <Link to={`/forecast-${res}?-${props.center[0]},${props.center[1]}`}>
          {props.forecastDates[4]}
        </Link>
      ),
    },
    {
      key: `${epochDates[5]}`,
      label: (
        <Link to={`/forecast-${res}?-${props.center[0]},${props.center[1]}`}>
          {props.forecastDates[5]}
        </Link>
      ),
    },
    {
      key: `${epochDates[6]}`,
      label: (
        <Link to={`/forecast-${res}?-${props.center[0]},${props.center[1]}`}>
          {props.forecastDates[6]}
        </Link>
      ),
    },
  ];

  var layer, palette, opacity, fDate;
  if (res == "temperature") {
    layer = "TA2";
    opacity = "0.7";
    fDate = "";
    palette =
      "-65:821692; -55:821692; -45:821692; -40:821692; -30:8257DB; -20:208CEC; -10:20C4E8; 0:23DDDD; 10:C2FF28; 20:FFF028; 25:FFC228; 30:FC8014; 40:FC5214; 50:D60606";
  } else if (res == "pressure") {
    layer = "APM";
    opacity = "0.7";
    palette =
      "94000:0073FF; 96000:00AAFF; 98000:4BD0D6; 100000:8DE7C7; 101000:B0F720; 102000:F0B800; 104000:FB5515; 106000:F3363B; 108000:C60000";
  } else if (res == "wind") {
    layer = "WND";
    opacity = "0.1";
    palette =
      "1:ccebff; 5:99d6ff; 15:66c2ff; 25:33adff; 50:0099ff; 100:007acc; 200:005c99;250:003d66";
  } else if (res == "precipitation") {
    layer = "PA0";
    opacity = "0.5";
    palette =
      "0:000000;1:00fa64;2:00d300;4:00a000;6:005a00;10:004600;12:eff800;16:ff9600;24:ff5b00;32:ff0064;60:aa2bc3";
  } else if (res == "clouds") {
    layer = "CL";
    opacity = "0.7";
    palette =
      "0:FFFFFF00; 10:FDFDFF19; 20:FCFBFF26; 30:FAFAFF33; 40:F9F8FF4C; 50:F7F7FF66; 60:F6F5FF8C; 70:F4F4FFBF; 80:E9E9DFCC; 90:DEDEDED8; 100:D2D2D2FF; 200:D2D2D2FF";
  } else if (res == "rain") {
    layer = "PAR0";
    opacity = "0.8";
    palette =
      "5:3b7ca2;10:3b7ea2;20:3a85a2;40:3a99a2;60:32a66f;100:81a23b;150:a2a23b;200:a23c3b";
  }
  const [forLayer, setForLayer] = useState(``);

  // useEffect(() => {
  //   setForLayer(`https://maps.openweathermap.org/maps/2.0/weather/${layer}/{z}/{x}/{y}?&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&fill_bound=true&opacity=${opacity}`)
  // },[])

  const onClick = ({ key }) => {
    props.layerLocation(
      `https://maps.openweathermap.org/maps/2.0/weather/${layer}/{z}/{x}/{y}?date=${key}&appid=9ff0ca2ad5b3a0ebffa218e5fe0ed679&fill_bound=true&opacity=${opacity}`
    );
  };

  const menu = <Menu onClick={onClick} selectable items={Items} />;
  return (
    <MainContainer>
      <Tooltip title="Select Forecast Date" placement="left">
        <Dropdown overlay={menu} trigger={["click"]}>
          <DateDropdown>
            <CalendarOutlined />
          </DateDropdown>
        </Dropdown>
      </Tooltip>
    </MainContainer>
  );
};
export { ForeCast };
export const MainContainer = styled.div`
  position: fixed;
  top: 130px;
  right: 20px;
  z-index: 1000;
`;
export const DateDropdown = styled(Space)`
  cursor: pointer;
  color: #fff;
  background: #001529;
  padding: 6px 8px;
  border-radius: 0px;
`;
