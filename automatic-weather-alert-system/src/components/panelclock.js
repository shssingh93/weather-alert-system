import React from "react";
import moment from "moment";
import play from "../media/play.png";
import { Row, Col } from "antd";
import up from "../media/up.png";
import down from "../media/down.png";
import next from "../media/next.png";
const PanelClock = () => {
  return (
    <div className="panel-clock">
      <Row style={{ display: "flex" }}>
        <Col span={6} style={{ display: "flex", alignItems: "center" }}>
          <img
            src={play}
            width="20px"
            height="20px"
            style={{
              margin: "0px 0px 0px 10px",
              cursor: "pointer",
            }}
          />
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <img
            src={up}
            height="15px"
            width="15px"
            style={{ marginBottom: "5px", cursor: "pointer" }}
          />
          {moment().format("MMM D")}&nbsp;&nbsp;
          <img
            src={down}
            height="15px"
            width="15px"
            style={{ marginTop: "5px", cursor: "pointer" }}
          />
        </Col>
        <Col
          span={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <img
            src={up}
            height="15px"
            width="15px"
            style={{ marginBottom: "5px", cursor: "pointer" }}
          />
          {moment().format("h")}
          <img
            src={down}
            height="15px"
            width="15px"
            style={{ marginTop: "5px", cursor: "pointer" }}
          />
        </Col>
        <Col
          span={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <img
            src={up}
            height="15px"
            width="15px"
            style={{ marginBottom: "5px", cursor: "pointer" }}
          />{" "}
          {moment().format("mm")}
          <img
            src={down}
            height="15px"
            width="15px"
            style={{ marginTop: "5px", cursor: "pointer" }}
          />{" "}
        </Col>
        <Col
          span={4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={next}
            height="20px"
            width="20px"
            style={{ cursor: "pointer" }}
          />
        </Col>
      </Row>
    </div>
  );
};
export { PanelClock };
