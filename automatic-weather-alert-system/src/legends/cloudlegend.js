import React from "react";
import "../index.css";

const CloudLegend = () => {
  return (
    <div className="legendContainer">
      <p className="legend-title">Clouds %</p>
      <div className="cloud-legend">
        <span>0</span>
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40</span>
        <span>50</span>
        <span>60</span>
      </div>
    </div>
  );
};
export { CloudLegend };
